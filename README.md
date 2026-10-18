# olaria

![JavaScript/TypeScript](https://img.shields.io/badge/JS-TS-yellow?logo=javascript)   ![status: concluido](https://img.shields.io/badge/status-concluido-green)   ![licenca: MIT](https://img.shields.io/badge/licenca-MIT-blue)

## Resumo

Aplicacao web em JavaScript/TypeScript. Olaria: Landing page builder for non-technical users. Visual editor + code view, exports single-file HTML for GitHub Pages.

## Problema / por que existe

O projeto entrega uma interface ou utilitario web para um recorte especifico, com foco em navegador como ambiente de execucao e sem dependencia de servidor proprio.

## Arquitetura

- Camada de apresentacao: componentes e paginas que renderizam a interface.
- Camada de logica: funcoes e hooks que processam dados e estado.
- Comunicacao: requisicoes HTTP a APIs externas ou dados locais, quando aplicavel.

O build e feito com Vite (ou ferramenta equivalente), gerando arquivos estaticos prontos para hospedagem.

## Tecnologias

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

- Sem CI configurado neste repositorio.

O repositorio contem testes automatizados.

## O que faz

Olaria: Landing page builder for non-technical users. Visual editor + code view, exports single-file HTML for GitHub Pages.

## Como rodar

Requisitos: Node.js e npm (ou yarn/pnpm).

```
# instalar dependencias
npm install

# rodar em desenvolvimento
vite

# build para producao
vite build

# rodar testes
vitest run
```

## Estrutura do projeto

- src/ (29 arquivo(s))
- src-tauri/ (13 arquivo(s))
- scripts/ (2 arquivo(s))
- docs/ (1 arquivo(s))
- .gitignore, CONTEXTO.md, index.html, Olaria.exe, Olaria_0.3.0_x64-setup.exe, package-lock.json, package.json, README.en.md, README.md, vite.config.js


## Trade-offs e decisões

- Build estatico: facil de hospedar (GitHub Pages, Vercel, Netlify) sem servidor.
- Dependencias minimas para reduzir superficie de manutencao.
- Navegador como unico ambiente de execucao necessario.

## Limitações conhecidas

- Funciona no navegador; depende de conexao a internet para recursos externos.


## Testes

```
vitest run
```

## Licença

Distribuído sob a licenca MIT. Consulte o arquivo `LICENSE` do repositorio.

## Autor

Kelvin Oliveira, https://github.com/KelvinOliveiraCode
Portfolio: https://kelvinoliveiracode.github.io/portfolio/
