# olaria

<div align="center">

**English** · [Português (Brasil)](README.md)

</div>

Desktop application for building landing pages and exporting a single HTML file. The app runs on Tauri (Rust) with a plain JavaScript frontend.

## What it is

Olaria is a visual landing page builder for non-technical people. The user picks a template or starts from scratch, clicks the elements on the page to edit them, drags to move things, opens the code when needed, and publishes. The output is always a self-contained `index.html`, with the CSS inside the file and no external dependency, ready for any static host.

There are four modes, described in [CONTEXTO.md](CONTEXTO.md): Edit, with selection, a properties panel and a tool rail; Preview, where the page behaves the way a visitor would see it; Code; and Split, with both side by side. The code stays in sync with the canvas.

## Status

Version 0.3.0, declared in three places that are bumped together: [package.json](package.json) (line 4), [src-tauri/Cargo.toml](src-tauri/Cargo.toml) (line 3) and [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json) (line 4). The branch is `master` and the tree was clean at the time of this reading.

What is implemented and verifiable in the code:

- Four working modes, three test widths, direct canvas editing with eight resize handles.
- Eleven ready templates plus a blank page, 24 components in 7 groups, 14 animations plus a numeric counter.
- CodeMirror 6 code editor, loaded on demand.
- Open, save, save as, recent files, undo and redo with a 200-entry history.
- Watcher on the open file, with a warning when it changes outside the app.
- Publishing as a single file, folder creation ready for GitHub Pages, and repository creation through the GitHub CLI.

What was not verified end to end: the one-click publish, executed only up to the local commit, as recorded in [CONTEXTO.md](CONTEXTO.md) (lines 180 and 181).

There are prebuilt binaries in the repository root: `Olaria.exe` and `Olaria_0.3.0_x64-setup.exe`.

## Features

### Editing

Four modes, switched by the top bar buttons or the keyboard: Edit (F1), Preview (F2), Code (F3) and Split (F4). The switch lives in [src/app.js](src/app.js) (lines 164 to 176) and the buttons in [index.html](index.html) (lines 26 to 29).

In Edit mode, a click selects, a drag moves, and a double click edits the text in place. The selected element gets eight resize handles, in the `nw`, `n`, `ne`, `e`, `se`, `s`, `sw` and `w` directions, defined in [src/runtime/edit-runtime.js](src/runtime/edit-runtime.js) (line 140).

The panel on the right shows the properties of what is selected, with groups for text, image, embedded content, animation and actions ([src/modules/props-panel.js](src/modules/props-panel.js)).

Shortcuts inside the canvas: Ctrl+Z undoes, Ctrl+Shift+Z and Ctrl+Y redo, Delete removes, Alt+Arrow moves between siblings, Escape deselects ([src/runtime/edit-runtime.js](src/runtime/edit-runtime.js), lines 626 to 666). In the app: Ctrl+S saves, Ctrl+O opens, Ctrl+E saves as, Ctrl+P toggles between Edit and Preview ([src/app.js](src/app.js), lines 150 to 177).

### Components

The Insert drawer brings 24 components in 7 groups ([src/modules/components.js](src/modules/components.js)): Text, Buttons and links, Image and video, Sections, Structure, Form and Extras. Each group is a list of items with id, name and hint, and insertion happens through an event on the bus ([src/modules/insert-panel.js](src/modules/insert-panel.js)).

### Animations

There are 7 entrance animations, 3 hover animations, 4 scroll animations, plus a numeric counter and the smooth scrolling switch ([src/modules/anim-panel.js](src/modules/anim-panel.js)). The engine that runs those animations is injected into the user pages, not only into the preview ([src/runtime/anim-engine.js](src/runtime/anim-engine.js)).

### Theme

The Theme panel edits 8 color tokens (`--olaria-bg`, `--olaria-surface`, `--olaria-text`, `--olaria-muted`, `--olaria-border`, `--olaria-primary`, `--olaria-on-primary`, `--olaria-accent`), 5 font options, the corner radius from 0 to 28 px and the content width from 40 to 96 rem ([src/modules/theme-panel.js](src/modules/theme-panel.js)). The panel computes contrast between text and background and between text and action color, and warns when it drops below 4.5:1.

### Templates

Eleven templates in three files: 4 in `templates-a.js` (Launch, Portfolio, Event, Local business), 3 in `templates-b.js` (Email capture, Coming soon, Links page) and 4 in `templates-c.js` (Resume, Physical product, NGO, Wedding). The gallery adds the blank page card, for 12 cards total ([src/modules/templates-panel.js](src/modules/templates-panel.js)). The contract for writing a new template is in [docs/contrato-templates.md](docs/contrato-templates.md).

### Files and publishing

Open file, save, save as and recent list (10 in local storage, 6 displayed) in [src/app.js](src/app.js). Dragging an `.html` into the window opens it. The app watches the open file and, if it changes from another program, offers to reload from disk or keep the current version ([src/core/store.js](src/core/store.js), [src-tauri/src/watcher.rs](src-tauri/src/watcher.rs)).

The Publish modal has four manual paths and one automatic ([src/modules/publish-panel.js](src/modules/publish-panel.js)): save the single file, create a folder with `index.html`, `.nojekyll` and a `COMO-PUBLICAR.md` with the step by step, open the page in the browser, and publish to GitHub Pages in one click.

### Test widths

Three top bar buttons apply `data-device` to the document body: desktop, tablet and phone ([index.html](index.html), lines 32 to 42).

## Architecture

The app uses no UI framework. The shell is an HTML file with the fixed elements ([index.html](index.html)), the entry point is [src/main.js](src/main.js), and everything else is orchestrated by [src/app.js](src/app.js), which is around 900 lines long and exports the functions the tests use.

The layout is as follows:

```text
index.html (shell, inline SVGs)
   |
   v
src/main.js  ->  src/app.js  (orchestrates modes, files, history, publishing)
   |
   +-- src/core/state.js     single app state
   +-- src/core/bus.js       event bus between modules
   +-- src/core/store.js     I/O: Rust commands in Tauri, fallbacks in the browser
   +-- src/core/ui.js        toasts, modal and confirmation
   +-- src/core/docutils.js  injection of the blocks marked data-olaria
   +-- src/core/assets.js    relative URLs to the asset protocol and back
   |
   +-- src/modules/preview.js      srcdoc iframe and postMessage bridge
   +-- src/modules/code-editor.js  CodeMirror 6
   +-- src/modules/*-panel.js      drawers and properties panel
   +-- src/modules/components.js   component library
   +-- src/modules/templates*.js   templates
   |
   +-- src/runtime/edit-runtime.js  runs inside the iframe, removed before saving
   +-- src/runtime/anim-engine.js   runs inside the user page
   |
   v
src-tauri/src/{lib,commands,watcher}.rs  (Tauri 2)
```

The page being edited lives in an iframe with `srcdoc`. The edit runtime is injected into that iframe and talks to the app through `postMessage`, with events such as `booted`, `selected`, `mutated`, `serialized`, `undo`, `redo` and `vars` ([src/modules/preview.js](src/modules/preview.js), lines 50 to 101). Every mutation on the canvas fires `mutated`, which pushes the previous state into the history and schedules serialization back into the document.

The state is a single mutable object in [src/core/state.js](src/core/state.js). Modules do not know each other directly: they talk through named events on the bus in [src/core/bus.js](src/core/bus.js).

Serialization is the delicate part. Before writing, the document loses the `<script data-olaria="runtime">`, every `[data-olaria-ignore]`, the `style[data-olaria="anim-css"]` and the `olaria-edit` class. What comes out is clean HTML, with nothing left from the editor.

## Stack

| Layer | What it is | Where it is declared |
|---|---|---|
| Backend | Tauri 2, Rust edition 2021, rust-version 1.77 | [src-tauri/Cargo.toml](src-tauri/Cargo.toml) |
| Frontend | JavaScript ES modules, no framework | [package.json](package.json) (`"type": "module"`) |
| Build | Vite `^6.3.5` | [package.json](package.json), [vite.config.js](vite.config.js) |
| Code editor | CodeMirror 6 (`codemirror` `^6.0.1` and `@codemirror/*` packages) | [package.json](package.json) |
| Styling | Plain CSS, one file | [src/styles.css](src/styles.css) |
| Tests | Vitest `^5.0.4` with jsdom `^29.1.1` | [package.json](package.json) |
| Syntax check | esbuild `^0.25.0` | [scripts/check-syntax.mjs](scripts/check-syntax.mjs) |
| Dialogs and opening | Tauri dialog `^2.3.0` and opener `^2.5.0` plugins | [package.json](package.json) |
| File watching | notify crate 7 | [src-tauri/Cargo.toml](src-tauri/Cargo.toml) |
| Publishing | regex crate 1 and the GitHub CLI on the system | [src-tauri/Cargo.toml](src-tauri/Cargo.toml) |

There is no React, TypeScript, Tailwind or Recharts in this repository, despite what the previous README claimed.

## Repository structure

```text
olaria/
├── index.html                  interface shell
├── package.json
├── package-lock.json
├── vite.config.js
├── CONTEXTO.md                 continuity and traps already resolved
├── README.md
├── README.en.md
├── Olaria.exe                  release build
├── Olaria_0.3.0_x64-setup.exe  NSIS installer
├── docs/
│   └── contrato-templates.md   contract for writing templates
├── scripts/
│   ├── check-syntax.mjs        syntax of every source with esbuild
│   └── make-icon.mjs           generates the icons without dependencies
├── src/
│   ├── main.js                 entry point
│   ├── app.js                  orchestration
│   ├── styles.css              dark app theme
│   ├── core/
│   │   ├── bus.js              event bus
│   │   ├── state.js            single state
│   │   ├── store.js            I/O with Tauri and web fallback
│   │   ├── ui.js               toasts, modal, confirmation
│   │   ├── docutils.js         injection of the data-olaria blocks
│   │   ├── assets.js           relative URL rewriting
│   │   └── __tests__/
│   │       ├── assets.test.js
│   │       ├── docutils.test.js
│   │       └── state.test.js
│   ├── modules/
│   │   ├── preview.js          iframe and message bridge
│   │   ├── code-editor.js      CodeMirror 6
│   │   ├── props-panel.js      element properties
│   │   ├── insert-panel.js     component drawer
│   │   ├── anim-panel.js       animation drawer
│   │   ├── theme-panel.js      theme drawer
│   │   ├── templates-panel.js  template gallery
│   │   ├── publish-panel.js    publish modal
│   │   ├── components.js       component library
│   │   ├── templates.js        aggregator and blank page
│   │   ├── templates-a.js      4 templates
│   │   ├── templates-b.js      3 templates
│   │   ├── templates-c.js      4 templates
│   │   └── __tests__/
│   │       └── templates.test.js
│   ├── runtime/
│   │   ├── edit-runtime.js     runs in the iframe, removed before saving
│   │   └── anim-engine.js      animation engine of the generated pages
│   └── __tests__/
│       └── app-integration.test.js
└── src-tauri/
    ├── build.rs
    ├── Cargo.toml
    ├── Cargo.lock
    ├── tauri.conf.json
    ├── capabilities/
    │   └── default.json
    ├── icons/
    │   ├── 32x32.png
    │   ├── 128x128.png
    │   ├── 128x128@2x.png
    │   └── icon.ico
    └── src/
        ├── main.rs
        ├── lib.rs              command registration
        ├── commands.rs         read, write, image, publish
        └── watcher.rs          external edit warning
```

## Prerequisites and installation

Node.js and npm. [package.json](package.json) declares no `engines` field, so the project pins no minimum version. This reading was done with node v24.13.0 and npm 11.6.2.

Rust toolchain. [src-tauri/Cargo.toml](src-tauri/Cargo.toml) declares `edition = "2021"` and `rust-version = "1.77"`. The Tauri CLI ships in the repository as a devDependency (`@tauri-apps/cli` `^2.9.0`), so no global CLI install is needed.

Git and the GitHub CLI (`gh`) only for the one-click publish. Without them, the other publishing paths keep working.

```bash
git clone https://github.com/KelvinOliveiraCode/olaria.git
cd olaria
npm install
```

`npm install` does not install the Rust toolchain or download the Tauri dependencies; that happens on the first `npm run tauri dev`.

## How to run

Interface in the browser, without Tauri, for visual work:

```bash
npm run dev
```

Vite serves on `http://localhost:1420` with `strictPort` on ([vite.config.js](vite.config.js)). In this mode the app warns that it is running in the browser, and the disk operations do not exist: open by path, save by path, choose folder and publish refuse with an error message. Dragging an `.html` into the window works.

Desktop app:

```bash
npm run tauri dev
```

Opens the 1400 by 900 window, with a 1024 by 680 minimum ([src-tauri/tauri.conf.json](src-tauri/tauri.conf.json)).

Installer:

```bash
npm run tauri build
```

The bundle produces NSIS and MSI, the two targets configured in [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json).

Syntax check of every source:

```bash
npm run check
```

The command runs [scripts/check-syntax.mjs](scripts/check-syntax.mjs), which puts the esbuild parser on each `.js`, `.mjs` and `.css` under `src` and on each `.mjs` under `scripts`.

Icons:

```bash
npm run icon
```

Tests:

```bash
npm test
```

## Endpoints (if there is an API)

There is no HTTP API. The only server in the project is the Vite development server, on port 1420, and it serves the frontend files; it exposes no application endpoint.

The programmatic surface is the Tauri IPC command queue, registered in [src-tauri/src/lib.rs](src-tauri/src/lib.rs) (lines 9 to 19):

| Command | Signature | What it does |
|---|---|---|
| `read_text_file` | `(path: String) -> Result<String, String>` | Reads a text file from disk |
| `write_text_file` | `(path: String, contents: String) -> Result<(), String>` | Writes the file, creating the parent folder if needed |
| `image_data_url` | `(path: String) -> Result<String, String>` | Reads an image and returns a data URL, up to 8 MB |
| `publish_package` | `(folder: String, html: String, title: String) -> Result<Vec<String>, String>` | Creates the folder with `index.html`, `.nojekyll` and `COMO-PUBLICAR.md` |
| `publish_github` | `(folder: String, html: String, slug: String) -> Result<PublishReport, String>` | Commits, creates the repository with `gh` and enables Pages |
| `append_log` | `(line: String) -> Result<(), String>` | Writes a line to `temp/olaria-diag/cliques.log` |
| `app_version` | `() -> String` | Returns the Rust package version |
| `watch_file` | `(path: String) -> Result<(), String>` | Watches the folder of the open file |
| `unwatch_file` | `() -> Result<(), String>` | Stops watching |

The backend also emits the `olaria:file-changed` event, with the path in the payload, when the open file changes on disk ([src-tauri/src/watcher.rs](src-tauri/src/watcher.rs)).

Two validations apply to every command that receives a path. The `safe_path` function canonicalizes the path and refuses anything outside the user home directory ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), lines 11 to 51). The publish `slug` must match `^[a-z0-9-]+$` ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), line 183).

## Tests and quality

The suite is Vitest, run with `npm test` (`vitest run`). There are 5 files and 119 test cases, counted one by one:

| File | Cases | What it covers |
|---|---|---|
| [src/core/__tests__/assets.test.js](src/core/__tests__/assets.test.js) | 29 | relative URL rewriting for preview and restoration on save |
| [src/core/__tests__/docutils.test.js](src/core/__tests__/docutils.test.js) | 15 | idempotent injection of the `data-olaria` blocks |
| [src/core/__tests__/state.test.js](src/core/__tests__/state.test.js) | 12 | single state, dirty marking and file name |
| [src/modules/__tests__/templates.test.js](src/modules/__tests__/templates.test.js) | 33 | registry, contract and output of every template |
| [src/__tests__/app-integration.test.js](src/__tests__/app-integration.test.js) | 30 | open, edit, save, history, modes and devices |

The number for `templates.test.js` comes from 22 written cases plus 11 generated in a loop over the known template ids ([src/modules/__tests__/templates.test.js](src/modules/__tests__/templates.test.js), lines 168 to 181).

Measured caveat: 7 of the 30 cases in `app-integration.test.js` are `expect(true).toBe(true)` assertions, which pass without checking anything. There are 3 in the serialization contract block (lines 281 to 291) and 4 in the final block of the file (lines 511 to 516). The other 23 cases in that file exercise real code.

This reading did not run the suite. The `node_modules` directory does not exist in this clone, so the numbers above are a static count of `it()` and `describe()` calls, not an execution result.

The syntax check is independent of the suite and scans every source with the esbuild parser ([scripts/check-syntax.mjs](scripts/check-syntax.mjs)).

The Rust side has no automated test: there is no `#[test]` or `#[cfg(test)]` in any file under [src-tauri/src](src-tauri/src).

## Technical decisions and trade-offs

The iframe with `srcdoc` isolates the page CSS from the app CSS, which lets the user apply any theme without breaking the interface. The cost is that the iframe inherits the app origin, so every link must be intercepted: an anchor scrolls inside the page, an external link goes to the system browser, and everything else is prevented ([src/runtime/edit-runtime.js](src/runtime/edit-runtime.js), `onClickCapture`). The origin used in the bridge is `window.location.origin`, not a fixed value, because Windows Tauri uses `http://tauri.localhost` while Linux and macOS use `tauri://localhost` ([src/modules/preview.js](src/modules/preview.js), lines 13 to 26).

The edit runtime lives only in the iframe and is removed before saving. That keeps the exported file clean, but forces two operations that must stay in sync: inject on open and clean on serialize.

The single-file output is a product decision, and it pushes the rest. Images become data URLs ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), lines 74 to 98), which caps them at 8 MB each, and pages that reference sibling files go through URL rewriting to the Tauri asset protocol on open, with the original path restored on save ([src/core/assets.js](src/core/assets.js)).

The state is a single object with an event bus, without a state library. Simplicity and zero dependencies are the gain; immutability guarantees are the loss, and the discipline of mutating only through the functions in `state.js` falls to whoever writes the code.

CodeMirror is loaded on demand, through a dynamic `import()`, so it stays out of the first load ([src/app.js](src/app.js), lines 47 to 81). When the code panel appears, the editor measures zero height if measured too early, so the refresh uses two `requestAnimationFrame` calls plus a 60 ms `setTimeout` ([src/app.js](src/app.js), lines 259 to 268).

Canvas to document synchronization is scheduled with a 140 ms debounce ([src/app.js](src/app.js), lines 465 to 469), and in Code mode the editor is the source of truth: `syncFromRuntime` does not overwrite the document in that mode ([src/app.js](src/app.js), lines 481 to 487).

The history stores whole documents, capped at 200 entries ([src/app.js](src/app.js), line 525). It is simple and works for a page, but it consumes memory proportional to the HTML size.

Publishing uses the GitHub CLI instead of the GitHub REST API. The app stores no token and asks for no credential, and the `gh` command handles the authentication already present on the machine ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), lines 217 to 246). The created repository is public, an explicit choice in the command.

The file path is restricted to the user home with `strip_prefix` after canonicalizing, which stops a text prefix comparison from letting through a sibling folder with a similar name ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), lines 40 to 48).

The app is dark and high contrast by decision, and the sites it creates can have any theme. The app theme lives in a single `styles.css` ([src/styles.css](src/styles.css)).

## Known limitations

The one-click publish was tested only up to the local commit. Repository creation and Pages activation use real `gh` commands and were not executed without the owner request, as recorded in [CONTEXTO.md](CONTEXTO.md) (lines 180 and 181).

The one-click publish depends on the GitHub CLI installed and authenticated. Without `gh` on the machine, the app returns a message asking for the installation ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), lines 238 to 245).

In the browser, without Tauri, the app does not reach the disk. Open by path, save by path, choose folder, publish and file watching refuse with an error; editing and file dragging remain ([src/core/store.js](src/core/store.js)).

The Rust backend has no automated test.

Seven assertions in the integration suite are placeholders and check nothing.

The repository keeps two binaries in the root (`Olaria.exe` and the installer), which grows the clone on every update.

The bundle is configured for Windows only, with NSIS and MSI targets. There is no macOS or Linux target in [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json).

There is an `append_log` diagnostic command that writes to `temp/olaria-diag`. It is registered and available to the frontend, which is more surface than a production app would need.

There is no interface translation: the texts are in pt-BR.

## License and author

MIT. Copyright (c) 2026 Kelvin Rebelo de Oliveira. Author: [Kelvin Oliveira](https://github.com/KelvinOliveiraCode)

The repository has no `LICENSE` file; the text above is the author license statement.