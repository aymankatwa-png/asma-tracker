/* ============================================================
   مرسم أسماء — living ink
   A small GPU fluid simulation (stable fluids) behind the header.
   Pigment is stored as absorbance and rendered subtractively on the paper,
   so strokes behave like watercolour dropped into water: they bloom, swirl,
   soften and slowly dry away. The mouse (or a finger) drags pigment through
   the water; drops fall on their own every few seconds.
   Falls back silently (the SVG ink around the portrait keeps running)
   when WebGL2 isn't available or the user prefers reduced motion.
   ============================================================ */
(function () {
'use strict';

var hero = document.querySelector('.hero');
if (!hero) return;
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

var canvas = document.createElement('canvas');
canvas.className = 'ink-water';
canvas.setAttribute('aria-hidden', 'true');
hero.insertBefore(canvas, hero.firstChild);

var gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false, powerPreference: 'low-power' });
if (!gl || !gl.getExtension('EXT_color_buffer_float')) { canvas.remove(); return; }
gl.getExtension('OES_texture_float_linear');

var CFG = {
  SIM: 128, DYE: 640,
  DENSITY_DISSIPATION: 0.32, VELOCITY_DISSIPATION: 1.1,
  PRESSURE: 0.8, PRESSURE_ITER: 18, CURL: 20,
  RADIUS: 0.00075, FORCE: 4200, INK: 0.075, MAX: 0.62
};
window.__inkCFG = CFG;   /* handy for live tuning from the console */

/* pigments as absorbance: exp(-a) gives back the paint colour on white paper */
function absorb(hex) {
  var n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  return [-Math.log(Math.max(r, .02)), -Math.log(Math.max(g, .02)), -Math.log(Math.max(b, .02))];
}
var PIGMENTS = ['#D9798B', '#D9A441', '#2F8C8C', '#4A63B5', '#8A6BB0', '#B8603E', '#6E9A52'].map(absorb);
var PIG_HEX = ['#D9798B', '#D9A441', '#2F8C8C', '#4A63B5', '#8A6BB0', '#B8603E', '#6E9A52'];

/* ---------- shaders ---------- */
var VERT = '#version 300 es\nprecision highp float;\nin vec2 aPosition;\nout vec2 vUv,vL,vR,vT,vB;\nuniform vec2 texelSize;\n' +
  'void main(){vUv=aPosition*.5+.5;vL=vUv-vec2(texelSize.x,0.);vR=vUv+vec2(texelSize.x,0.);vT=vUv+vec2(0.,texelSize.y);vB=vUv-vec2(0.,texelSize.y);gl_Position=vec4(aPosition,0.,1.);}';
var HEAD = '#version 300 es\nprecision highp float;\nprecision highp sampler2D;\nin vec2 vUv,vL,vR,vT,vB;\nout vec4 o;\n';
var NOISE = 'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}' +
  'float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}';

var FRAG = {
  clear: HEAD + 'uniform sampler2D uTexture;uniform float value;void main(){o=value*texture(uTexture,vUv);}',
  splat: HEAD + NOISE + 'uniform sampler2D uTarget;uniform float aspectRatio,radius,seed,ragged;uniform vec3 color;uniform vec2 point;' +
    'void main(){vec2 p=vUv-point;p.x*=aspectRatio;float n=vnoise(vUv*vec2(aspectRatio,1.)*18.+seed)*.7+vnoise(vUv*vec2(aspectRatio,1.)*46.+seed*1.7)*.3;' +
    'float r=radius*mix(1.,.45+n*1.1,ragged);float d=exp(-dot(p,p)/r);vec3 base=texture(uTarget,vUv).xyz;o=vec4(base+d*color,1.);}',
  advection: HEAD + 'uniform sampler2D uVelocity,uSource;uniform vec2 velTexel;uniform float dt,dissipation;' +
    'void main(){vec2 c=vUv-dt*texture(uVelocity,vUv).xy*velTexel;vec4 r=texture(uSource,c);o=r/(1.+dissipation*dt);}',
  divergence: HEAD + 'uniform sampler2D uVelocity;void main(){float L=texture(uVelocity,vL).x,R=texture(uVelocity,vR).x,T=texture(uVelocity,vT).y,B=texture(uVelocity,vB).y;vec2 C=texture(uVelocity,vUv).xy;' +
    'if(vL.x<0.)L=-C.x;if(vR.x>1.)R=-C.x;if(vT.y>1.)T=-C.y;if(vB.y<0.)B=-C.y;o=vec4(.5*(R-L+T-B),0.,0.,1.);}',
  curl: HEAD + 'uniform sampler2D uVelocity;void main(){float L=texture(uVelocity,vL).y,R=texture(uVelocity,vR).y,T=texture(uVelocity,vT).x,B=texture(uVelocity,vB).x;o=vec4(.5*(R-L-T+B),0.,0.,1.);}',
  vorticity: HEAD + 'uniform sampler2D uVelocity,uCurl;uniform float curl,dt;void main(){float L=texture(uCurl,vL).x,R=texture(uCurl,vR).x,T=texture(uCurl,vT).x,B=texture(uCurl,vB).x,C=texture(uCurl,vUv).x;' +
    'vec2 f=.5*vec2(abs(T)-abs(B),abs(R)-abs(L));f/=length(f)+.0001;f*=curl*C;f.y*=-1.;vec2 v=texture(uVelocity,vUv).xy+f*dt;o=vec4(clamp(v,-1000.,1000.),0.,1.);}',
  pressure: HEAD + 'uniform sampler2D uPressure,uDivergence;void main(){float L=texture(uPressure,vL).x,R=texture(uPressure,vR).x,T=texture(uPressure,vT).x,B=texture(uPressure,vB).x;' +
    'o=vec4((L+R+B+T-texture(uDivergence,vUv).x)*.25,0.,0.,1.);}',
  gradient: HEAD + 'uniform sampler2D uPressure,uVelocity;void main(){float L=texture(uPressure,vL).x,R=texture(uPressure,vR).x,T=texture(uPressure,vT).x,B=texture(uPressure,vB).x;' +
    'vec2 v=texture(uVelocity,vUv).xy-vec2(R-L,T-B);o=vec4(v,0.,1.);}',
  /* paper + pigment: subtractive colour, darker rims where the wash dries, a little granulation */
  display: HEAD + NOISE + 'uniform sampler2D uTexture;uniform vec2 dyeTexel;uniform vec4 calm;uniform float maxA;' +
    'void main(){vec3 c=max(texture(uTexture,vUv).rgb,0.);vec2 e=dyeTexel*1.6;' +
    'vec3 l=texture(uTexture,vUv-vec2(e.x,0.)).rgb,r=texture(uTexture,vUv+vec2(e.x,0.)).rgb,t=texture(uTexture,vUv+vec2(0.,e.y)).rgb,b=texture(uTexture,vUv-vec2(0.,e.y)).rgb;' +
    'vec3 rim=abs(r-l)+abs(t-b);float g=hash(floor(gl_FragCoord.xy*.7));float paper=vnoise(gl_FragCoord.xy*.035);' +
    'vec3 a=c*(.85+.25*g+.2*paper)+rim*1.1;a=maxA*(1.-exp(-a*1.25));' +
    'vec2 q=smoothstep(calm.xy-.06,calm.xy+.02,vUv)*(1.-smoothstep(calm.zw-.02,calm.zw+.06,vUv));a*=1.-.55*q.x*q.y;' +
    'o=vec4(exp(-a),1.);}'
};

function compile(type, src) {
  var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}
var vs;
function program(fsrc) {
  vs = vs || compile(gl.VERTEX_SHADER, VERT);
  var p = gl.createProgram();
  gl.attachShader(p, vs); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fsrc));
  gl.bindAttribLocation(p, 0, 'aPosition'); gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < n; i++) { var name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
  return { p: p, u: u };
}

var P;
try {
  P = {};
  Object.keys(FRAG).forEach(function (k) { P[k] = program(FRAG[k]); });
} catch (e) { canvas.remove(); return; }

/* full-screen quad */
var vao = gl.createVertexArray(); gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0); gl.enableVertexAttribArray(0);

function blit(t) {
  if (t) { gl.viewport(0, 0, t.w, t.h); gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo); }
  else { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}
function fbo(w, h, ifmt, fmt) {
  gl.activeTexture(gl.TEXTURE0);
  var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, ifmt, w, h, 0, fmt, gl.HALF_FLOAT, null);
  var f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error('fbo');
  gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
  return { tex: tex, fbo: f, w: w, h: h, tx: 1 / w, ty: 1 / h,
    bind: function (id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, tex); return id; } };
}
function dbl(w, h, ifmt, fmt) {
  var a = fbo(w, h, ifmt, fmt), b = fbo(w, h, ifmt, fmt);
  return { get read() { return a; }, get write() { return b; }, swap: function () { var t = a; a = b; b = t; }, w: w, h: h, tx: 1 / w, ty: 1 / h };
}
function res(base) {
  var ar = gl.drawingBufferWidth / gl.drawingBufferHeight; if (ar < 1) ar = 1 / ar;
  var mn = Math.round(base), mx = Math.round(base * ar);
  return gl.drawingBufferWidth > gl.drawingBufferHeight ? { w: mx, h: mn } : { w: mn, h: mx };
}

var dye, vel, div, crl, prs;
function initFBOs() {
  var s = res(CFG.SIM), d = res(CFG.DYE);
  dye = dbl(d.w, d.h, gl.RGBA16F, gl.RGBA);
  vel = dbl(s.w, s.h, gl.RG16F, gl.RG);
  div = fbo(s.w, s.h, gl.R16F, gl.RED);
  crl = fbo(s.w, s.h, gl.R16F, gl.RED);
  prs = dbl(s.w, s.h, gl.R16F, gl.RED);
}
function sizeCanvas() {
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var w = Math.max(2, Math.round(canvas.clientWidth * dpr)), h = Math.max(2, Math.round(canvas.clientHeight * dpr));
  if (canvas.width === w && canvas.height === h) return false;
  canvas.width = w; canvas.height = h; return true;
}
try { sizeCanvas(); initFBOs(); } catch (e) { canvas.remove(); return; }

/* ---------- simulation ---------- */
function use(pr) { gl.useProgram(pr.p); return pr.u; }

function splat(x, y, dx, dy, col, rad, ragged) {
  var ar = canvas.width / canvas.height;
  var u = use(P.splat);
  gl.uniform1i(u.uTarget, vel.read.bind(0));
  gl.uniform1f(u.aspectRatio, ar);
  gl.uniform2f(u.point, x, y);
  gl.uniform3f(u.color, dx, dy, 0);
  var r = (rad || CFG.RADIUS) * (ar > 1 ? ar : 1);
  gl.uniform1f(u.radius, r); gl.uniform1f(u.seed, Math.random() * 100); gl.uniform1f(u.ragged, 0);
  blit(vel.write); vel.swap();
  if (col) {
    gl.uniform1i(u.uTarget, dye.read.bind(0));
    gl.uniform3f(u.color, col[0], col[1], col[2]);
    gl.uniform1f(u.ragged, ragged == null ? 0.8 : ragged);
    blit(dye.write); dye.swap();
  }
}

function step(dt) {
  gl.disable(gl.BLEND);
  var u;
  u = use(P.curl); gl.uniform2f(u.texelSize, vel.tx, vel.ty); gl.uniform1i(u.uVelocity, vel.read.bind(0)); blit(crl);
  u = use(P.vorticity); gl.uniform2f(u.texelSize, vel.tx, vel.ty); gl.uniform1i(u.uVelocity, vel.read.bind(0)); gl.uniform1i(u.uCurl, crl.bind(1));
  gl.uniform1f(u.curl, CFG.CURL); gl.uniform1f(u.dt, dt); blit(vel.write); vel.swap();
  u = use(P.divergence); gl.uniform2f(u.texelSize, vel.tx, vel.ty); gl.uniform1i(u.uVelocity, vel.read.bind(0)); blit(div);
  u = use(P.clear); gl.uniform1i(u.uTexture, prs.read.bind(0)); gl.uniform1f(u.value, CFG.PRESSURE); blit(prs.write); prs.swap();
  u = use(P.pressure); gl.uniform2f(u.texelSize, vel.tx, vel.ty); gl.uniform1i(u.uDivergence, div.bind(0));
  for (var i = 0; i < CFG.PRESSURE_ITER; i++) { gl.uniform1i(u.uPressure, prs.read.bind(1)); blit(prs.write); prs.swap(); }
  u = use(P.gradient); gl.uniform2f(u.texelSize, vel.tx, vel.ty); gl.uniform1i(u.uPressure, prs.read.bind(0)); gl.uniform1i(u.uVelocity, vel.read.bind(1)); blit(vel.write); vel.swap();
  u = use(P.advection); gl.uniform2f(u.texelSize, vel.tx, vel.ty); gl.uniform2f(u.velTexel, vel.tx, vel.ty);
  gl.uniform1i(u.uVelocity, vel.read.bind(0)); gl.uniform1i(u.uSource, vel.read.bind(0));
  gl.uniform1f(u.dt, dt); gl.uniform1f(u.dissipation, CFG.VELOCITY_DISSIPATION); blit(vel.write); vel.swap();
  gl.uniform1i(u.uVelocity, vel.read.bind(0)); gl.uniform1i(u.uSource, dye.read.bind(1));
  gl.uniform1f(u.dissipation, CFG.DENSITY_DISSIPATION); blit(dye.write); dye.swap();
}
function render() {
  var u = use(P.display);
  gl.uniform2f(u.texelSize, 1 / canvas.width, 1 / canvas.height);
  gl.uniform2f(u.dyeTexel, dye.read.tx, dye.read.ty);
  gl.uniform1i(u.uTexture, dye.read.bind(0));
  gl.uniform4f(u.calm, calm[0], calm[1], calm[2], calm[3]); gl.uniform1f(u.maxA, CFG.MAX);
  blit(null);
}

/* the text column gets a calmer, paler wash so it always stays readable */
var calm = [2, 2, 2, 2];
function updateCalm() {
  var t = document.querySelector('.hero-copy'); if (!t) return;
  var r = t.getBoundingClientRect(), c = canvas.getBoundingClientRect();
  calm = [(r.left - c.left) / c.width, 1 - (r.bottom - c.top) / c.height, (r.right - c.left) / c.width, 1 - (r.top - c.top) / c.height];
}
updateCalm(); window.addEventListener('resize', updateCalm); setTimeout(updateCalm, 1500);

/* ---------- pigment that drifts from colour to colour, wet-in-wet ---------- */
var hueT = Math.random() * PIGMENTS.length;
function pigment(t, k) {
  var i = Math.floor(t) % PIGMENTS.length, j = (i + 1) % PIGMENTS.length, f = t - Math.floor(t);
  f = f * f * (3 - 2 * f);
  var a = PIGMENTS[i], b = PIGMENTS[j];
  return [(a[0] + (b[0] - a[0]) * f) * k, (a[1] + (b[1] - a[1]) * f) * k, (a[2] + (b[2] - a[2]) * f) * k];
}
function pigHex(t) { return PIG_HEX[Math.round(t) % PIG_HEX.length]; }

/* a drop falling into the water: a ragged bloom pushed outward by a ring of small currents */
function drop(x, y, k, size) {
  var col = pigment(hueT, 0.55 * (k || 1)), s = size || 1;
  splat(x, y, 0, 0, col, CFG.RADIUS * 3.4 * s, 1);
  var n = 7, ar = canvas.width / canvas.height, off = 0.014 * s;
  for (var i = 0; i < n; i++) {
    var an = i / n * 6.283 + Math.random() * .6, cx = Math.cos(an), cy = Math.sin(an);
    splat(x + cx * off / ar, y + cy * off, cx * 380 * s, cy * 380 * s, i % 2 ? pigment(hueT + .5, .14) : null, CFG.RADIUS * 1.1 * s, 1);
  }
  hueT += 0.9 + Math.random() * 0.6;
}

/* ---------- input ---------- */
var pointer = { x: 0, y: 0, px: 0, py: 0, moved: false, inside: false, speed: 0 };
var cursor = document.createElement('div');
cursor.className = 'ink-cursor';
document.body.appendChild(cursor);
var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

function toUv(cx, cy) {
  var r = canvas.getBoundingClientRect();
  return { x: (cx - r.left) / r.width, y: 1 - (cy - r.top) / r.height, inside: cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom };
}
function move(cx, cy) {
  var p = toUv(cx, cy);
  if (!p.inside) { pointer.inside = false; cursor.classList.remove('on'); return; }
  if (!pointer.inside) { pointer.px = p.x; pointer.py = p.y; }
  pointer.inside = true; pointer.x = p.x; pointer.y = p.y; pointer.moved = true;
  if (fine) {
    cursor.classList.add('on');
    cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    cursor.style.setProperty('--c', pigHex(hueT));
  }
}
window.addEventListener('pointermove', function (e) { move(e.clientX, e.clientY); }, { passive: true });
window.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
hero.addEventListener('pointerleave', function () { pointer.inside = false; cursor.classList.remove('on'); });
hero.addEventListener('click', function (e) {
  if (e.target.closest('a,button,input,.week-card')) return;
  var p = toUv(e.clientX, e.clientY); if (!p.inside) return;
  drop(p.x, p.y, 1.4, 1.25);
  cursor.classList.add('pop'); setTimeout(function () { cursor.classList.remove('pop'); }, 400);
});
/* the portrait asks for ink too */
var portrait = document.getElementById('heroPortrait');
if (portrait) portrait.addEventListener('click', function (e) {
  e.stopPropagation();
  var r = portrait.getBoundingClientRect();
  [[r.left - 10, r.top + r.height * .55], [r.right + 10, r.top + r.height * .45], [r.left + r.width * .5, r.bottom + 6]].forEach(function (pt, i) {
    setTimeout(function () { var p = toUv(pt[0], pt[1]); drop(p.x, p.y, 1.2, 1.1); }, i * 160);
  });
});

function applyInput() {
  if (!pointer.moved) return;
  pointer.moved = false;
  var ar = canvas.width / canvas.height;
  var dx = pointer.x - pointer.px, dy = pointer.y - pointer.py;
  if (ar < 1) dx *= ar; if (ar > 1) dy /= ar;
  var sp = Math.min(1, Math.hypot(dx, dy) * 40);
  pointer.px = pointer.x; pointer.py = pointer.y;
  if (sp < 0.002) return;
  hueT += 0.006 + sp * 0.02;
  splat(pointer.x, pointer.y, dx * CFG.FORCE, dy * CFG.FORCE, pigment(hueT, CFG.INK * (0.45 + sp * 1.4)), CFG.RADIUS * (0.75 + sp * .9), .65);
}

/* ---------- ambient life: an opening bloom, then a drop every few seconds ---------- */
function rel(el, fx, fy) {
  var r = el.getBoundingClientRect(), c = canvas.getBoundingClientRect();
  return { x: (r.left + r.width * fx - c.left) / c.width, y: 1 - (r.top + r.height * fy - c.top) / c.height };
}
function opening() {
  var seq = [];
  if (portrait) seq.push(rel(portrait, -0.08, 0.6), rel(portrait, 1.06, 0.4), rel(portrait, 0.5, 1.02));
  var title = document.querySelector('.hero-title');
  if (title) seq.push(rel(title, 1.02, 0.15), rel(title, -0.04, 0.9));
  seq.forEach(function (p, i) { setTimeout(function () { drop(p.x, p.y, 1.25, 1.15); }, 350 + i * 420); });
}
var lastAmbient = 0;
function ambient(now) {
  if (now - lastAmbient < 3600) return;
  lastAmbient = now;
  if (pointer.inside && Date.now() - lastMove < 2500) return;
  var spots = [];
  if (portrait) spots.push(rel(portrait, -0.1, .3 + Math.random() * .5), rel(portrait, 1.1, .3 + Math.random() * .5), rel(portrait, .2 + Math.random() * .6, 1.04));
  spots.push({ x: Math.random() < .5 ? .03 + Math.random() * .1 : .87 + Math.random() * .1, y: .2 + Math.random() * .6 });
  var p = spots[(Math.random() * spots.length) | 0];
  drop(p.x, p.y, 0.95, 0.9);
}
var lastMove = 0;
window.addEventListener('pointermove', function () { lastMove = Date.now(); }, { passive: true });

/* ---------- loop: runs only while the header is on screen ---------- */
var visible = true, running = false, last = 0, raf = 0;
function frame(now) {
  if (!running) return;
  var dt = Math.min((now - last) / 1000, 1 / 40); last = now;
  if (sizeCanvas()) initFBOs();
  applyInput();
  ambient(now);
  step(dt);
  render();
  raf = requestAnimationFrame(frame);
}
function update() {
  var should = visible && !document.hidden;
  if (should && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  else if (!should && running) { running = false; cancelAnimationFrame(raf); }
}
if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; update(); }, { threshold: 0 }).observe(hero);
document.addEventListener('visibilitychange', update);
update();
setTimeout(opening, 250);
document.documentElement.classList.add('has-ink-water');
})();
