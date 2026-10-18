
# olaria

![language: JavaScript/TypeScript](https://img.shields.io/badge/language-JS-TS-yellow?logo=javascript)   ![status: done](https://img.shields.io/badge/status-done-green)   ![license: MIT](https://img.shields.io/badge/license-MIT-blue)

## Summary

Web application in JavaScript/TypeScript. Olaria: Landing page builder for non-technical users. Visual editor + code view, exports single-file HTML for GitHub Pages.

## Problem / why it exists

The project delivers a web interface or utility for a specific scope, with focus on the browser as runtime and no dependency on its own server.

## Architecture

- Presentation layer: components and pages that render the interface.
- Logic layer: functions and hooks that process data and state.
- Communication: HTTP requests to external APIs or local data, when applicable.

The build is done with Vite (or equivalent tool), generating static files ready for hosting.

## Technologies

- JavaScript / TypeScript
- @codemirror/commands
- @codemirror/lang-css
- @codemirror/lang-html
- @codemirror/lang-javascript
- @codemirror/language
- @codemirror/search
- @codemirror/state
- @codemirror/view
- @lezer/highlight
- @tauri-apps/api
- @tauri-apps/plugin-dialog
- @tauri-apps/plugin-opener
- codemirror
- @tauri-apps/cli

- No CI configured in this repository.

The repository contains automated tests.

## What it does

Olaria: Landing page builder for non-technical users. Visual editor + code view, exports single-file HTML for GitHub Pages.

## How to run

Requirements: Node.js and npm (or yarn/pnpm).

```
# install dependencies
npm install

# run in development
vite

# production build
vite build

# run tests
vitest run
```

## Project structure

- src/ (29 arquivo(s))
- src-tauri/ (13 arquivo(s))
- scripts/ (2 arquivo(s))
- docs/ (1 arquivo(s))
- .gitignore, CONTEXTO.md, index.html, Olaria.exe, Olaria_0.3.0_x64-setup.exe, package-lock.json, package.json, README.en.md, README.md, vite.config.js


## Trade-offs and decisions

- Static build: easy to host (GitHub Pages, Vercel, Netlify) without a server.
- Minimal dependencies to reduce maintenance surface.
- Browser as the only runtime required.

## Known limitations

- Runs in the browser; depends on internet connection for external resources.


## Tests

```
vitest run
```

## License

Distributed under the MIT License. See the `LICENSE` file in this repository.

## Author

Kelvin Oliveira, https://github.com/KelvinOliveiraCode
Portfolio: https://kelvinoliveiracode.github.io/portfolio/
