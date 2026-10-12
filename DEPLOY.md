# مرسم أسماء — Asma's Studio

Personal growth tracker for Asma (Moomken Media Center), Oct–Dec 2026.
Static site: `index.html` + `app.css` + `app.js` + `assets/`. No build step.

- **Live:** https://aymankatwa-png.github.io/asma-tracker/
- **Hosting:** GitHub Pages (branch `main`, root).
- **Progress:** saved in the browser, and synced through a private GitHub Gist
  (file `asma-progress.json`). Gist ID + token are entered once from «إعدادات الحفظ».
- **Manager view:** «تبديل» → «أنا المشرف» → PIN.
- **Reading (drying lines):** PDFs live in OneDrive → `Asma Studio`; the file names
  in `PAINTINGS` (app.js) must match the files in that folder.

Editing content: everything editable sits at the top of `app.js`
(`CHAPTERS`, `PAINTINGS`, `LINES`, `SWATCHES`, `LATER`, `QUOTES`).
After editing CSS/JS, bump `?v=` in `index.html` so browsers fetch the new file.
