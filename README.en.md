# Olaria

![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-f7df1e?logo=javascript) ![Rust](https://img.shields.io/badge/Rust-1.77+-fa4340?logo=rust) ![Tauri](https://img.shields.io/badge/Tauri-2-000?logo=tauri) ![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite) ![vitest](https://img.shields.io/badge/vitest-5-7e6cd6?logo=vitest)

Single-file landing page builder for non-technical people: visual editor with property panels, live preview, synced code editor, and export of a standalone `index.html` ready for GitHub Pages or any static hosting.

## Problem / Why it exists

Non-technical people need a landing page (launch, portfolio, event, local business, email capture) but website builders charge monthly subscriptions, require a custom domain, or expect you to write code. Olaria is a local desktop application that produces a single HTML file, with no subscription, no server, and no platform dependency.

## What it does

- **Ready-made templates** — 12 items (11 templates plus a blank page): Launch, Portfolio, Event, Local Business, Email Capture, Coming Soon, Links Page, Resume, Physical Product, NGO, and Wedding. All in pt-BR, embedded CSS, no mandatory external links.
- **Visual editing** — click to select an element, drag to move (reorders siblings or freely repositions elements marked as free), double click to edit text, right panel for colors, sizes, corners, links, images, and position.
- **Insert components** — headings, paragraphs, intro, quote, list, button, outline button, two buttons, link, image, YouTube video, space, line, new section, two columns, cards, action bar, top menu, footer, anchor point, contact form, email-only field, label, and table. Components use `o-*` classes and `--olaria-*` tokens from the page itself, so they inherit the site theme.
- **Animations** — entrance (fade-up, fade-down, fade-left, fade-right, zoom-in, blur-in, reveal), hover (levitate, grow, underline) and scroll (smooth parallax, parallax, fast parallax, progress bar). Respects `prefers-reduced-motion`.
- **Theme** — one panel edits colors, font, border radius, and max width of the whole page at once, with a contrast warning to avoid accidentally making the site unreadable.
- **Code** — CodeMirror 6 editor (HTML/CSS/JS) on Visual, Code, and Split tabs. Both views stay in sync; Ctrl+S saves.
- **Open any HTML** — pages made in Olaria or in VS Code. If the folder has `style.css` or images, the preview shows everything. External editing (VS Code) is detected and the app reloads the file.
- **Publish** — saves the single `index.html`, or creates a site folder with `index.html`, `.nojekyll`, and `COMO-PUBLICAR.md` with the GitHub Pages step-by-step. Can open directly in the browser, open `github.com/new`, or publish with one click (requires Git and GitHub CLI authenticated).
- **Button actions** — scroll to a page section, open website (new tab), email, phone, download file, or no action. A `<button>` becomes a real `<a>` when a value is applied, so it also works in the exported file.
- **Four modes** — Edit (F1), Visit (F2), Code (F3), Split (F4). Preview on desktop, tablet, and phone.
- **History** — undo/redo (up to 200 states), one shared history for both views.
- **App appearance** — high-contrast dark theme by product decision (work tool, prolonged use). The sites you create can have any color.

## Stack

- Frontend: JavaScript (ES modules), Vite (development server on port 1420, build for `dist/`), CodeMirror 6 (`@codemirror/*`) for the code editor.
- Tests: vitest + jsdom (utility, state, template, and app integration tests).
- Desktop: Tauri 2 with a Rust backend, WebView2 on Windows, dialog and opener plugins.
- Rust backend (`src-tauri/src/commands.rs`): file read/write restricted to the user's home folder (path traversal protection), image to data URL (8 MB limit per image) to keep the file single, folder watcher (`notify`), `publish_package` (writes `index.html`, `.nojekyll`, and `COMO-PUBLICAR.md`) and `publish_github` (`git init/add/commit`, `gh repo create --source=. --push`, enables GitHub Pages).
- Packager: NSIS and MSI installers (`src-tauri/target/release/bundle/`).

## How it works

1. The document lives as HTML text in the app's single state (`state.doc`).
2. The preview is an `iframe` with `srcdoc`; the editing runtime (`edit-runtime.js`) is injected into the iframe, communicates with the app via `postMessage`, and is REMOVED before serialization. What is saved never loads editor code.
3. Every visual change (selection, text, style, attribute, class, insertion, animation) becomes a `postMessage` to the runtime, which mutates the iframe DOM and notifies the app; the app reserializes the HTML and updates the code editor. Every code change repaints the preview. One undo history serves both views.
4. Animations and components enter as marked blocks (`data-olaria="anim"`, `data-olaria="utils"`) and stay on the exported page — the site works on its own, without the app.
5. When opening folder pages (with `style.css` and images), relative URLs are rewritten to the Tauri asset protocol on open and restored on save (`assets.js`).
6. One-click publish writes the files, runs `git init/add/commit`, `gh repo create --source=. --push`, and enables GitHub Pages (branch `main`, root). Requires Git and GitHub CLI (`gh auth login`).

## How to run

Prerequisites: Node.js 20+ and Rust 1.77+. On Windows the app uses WebView2 (included in Windows 11).

```bash
npm install
npm run tauri dev
```

Available scripts:

- `npm run dev` — Vite on `http://localhost:1420` (browser mode, UI test only; no file, folder, or publish access)
- `npm run build` — frontend build for `dist/`
- `npm run preview` — build preview
- `npm run tauri dev` — desktop app in development
- `npm run tauri build` — NSIS and MSI installers in `src-tauri/target/release/bundle/`
- `npm run check` — checks syntax of all sources (`scripts/check-syntax.mjs`)
- `npm test` — `vitest run` (asset, docutils, state, template, and integration tests)
- `npm run icon` — generates PNG/ICO icons (`scripts/make-icon.mjs`)

To generate the installer: `npm run tauri build`. The NSIS installer is in `src-tauri/target/release/bundle/nsis/`. The version bump must be done in 3 files: `package.json`, `src-tauri/Cargo.toml`, and `src-tauri/tauri.conf.json`.

## Project structure

```
index.html                 interface shell (inline SVGs)
src/main.js                entry point
src/app.js                 orchestration: modes, files, visual ↔ code sync, history, publish
src/styles.css             app high-contrast dark theme
src/core/
  state.js                 single state (doc, mode, selection, history)
  store.js                 I/O: Tauri commands + browser fallback
  bus.js                   tiny event emitter
  docutils.js              data-olaria block injection (utility CSS, animation engine)
  assets.js                rewrites/restores relative URLs of folder pages
  ui.js                    toasts, modal, confirmation
src/modules/
  preview.js               iframe host + postMessage bridge + serialization
  code-editor.js           CodeMirror 6
  props-panel.js           selected element property panel
  insert-panel.js          component drawer (components.js)
  anim-panel.js            animation drawer (entrance, hover, scroll)
  theme-panel.js           page theme (tokens --olaria-*, font, radius, contrast)
  templates-panel.js       template gallery
  publish-panel.js         modal: save file, create site folder, open browser, github.com/new, one-click publish
  components.js            component library (classes o-*, utilsCss)
  templates.js             templates aggregator + blank page
  templates-a.js / templates-b.js / templates-c.js   12 templates
src/runtime/
  edit-runtime.js          injected into the iframe (selection, drag, text, resize, serialization); removed before saving
  anim-engine.js           animation engine injected into exported pages
src/__tests__              vitest tests
src-tauri/                 Rust backend: commands.rs (files, image → dataURL, publish), watcher.rs (notify), tauri.conf.json, Cargo.toml
scripts/                   make-icon.mjs, check-syntax.mjs
dist/                      frontend build (generated)
```

## Trade-offs and decisions

- **Single-file output:** images become data URLs, so the page stays self-contained, but large images bloat the HTML (8 MB limit per image in the app).
- **Iframe `srcdoc` inherits app origin:** in Visit mode, anchor links scroll the page, external links open in the system browser, and any other click (button, form) is blocked to avoid navigating the canvas or opening Olaria inside itself.
- **Runtime only in preview:** the editing runtime is injected only into the iframe and removed on serialization; nothing from the editor reaches the saved file.
- **Two views, one state:** visual and code share the same state and history; in Code mode the editor is the source of truth and is not overwritten by the runtime.
- **Dark app, free sites:** the app is high-contrast dark by product decision; the sites you create can have any theme.
- **Path security:** file reading and writing are restricted to the user's home folder.
- **One-click publish:** creates a real repository on GitHub (public by default) and depends on Git and GitHub CLI installed and authenticated; tested up to the local commit — actual repository creation is up to the user to run with intent.
- **WebView2:** on Windows the app depends on the WebView2 Runtime, present on Windows 11.

## Known limitations

- Drag to move reorders sibling elements; free repositioning works only on elements marked as "Free on page".
- Resize with handles works on positioned elements; `static` elements become `absolute` when resized (size is frozen first so nothing jumps visually).
- YouTube video is embedded via iframe; you must change the video ID in the panel.
- Forms use `action="mailto:"` — they open the email client. For real sending, replace with your form service address.
- Opening an unknown HTML page runs its code inside the app. Open only files you trust.
- `IntersectionObserver` and `requestAnimationFrame` do not fire on background windows, some WebViews, and printing; the animation engine has a safety net (re-reveal, counter fallback).
- In browser mode (`npm run dev`, no Tauri) there is no file read/write, folder choice, or publish — UI test only.

## License

There is no `LICENSE` file in this repository and `package.json` is marked as private. If you want to use the code, contact the author first.

## Author

Kelvin
