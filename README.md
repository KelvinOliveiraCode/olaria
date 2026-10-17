# Olaria — Construtor de Landing Pages para Não-Técnicos

<<<<<<< HEAD
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-f7df1e?logo=javascript) ![Rust](https://img.shields.io/badge/Rust-1.77+-fa4340?logo=rust) ![Tauri](https://img.shields.io/badge/Tauri-2-000?logo=tauri) ![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite) ![vitest](https://img.shields.io/badge/vitest-5-7e6cd6?logo=vitest)

Construtor de landing pages de arquivo único para pessoas não técnicas: editor visual com painéis de propriedades, pré-visualização ao vivo, editor de código sincronizado e exportação de um `index.html` pronto para GitHub Pages ou qualquer hospedagem estática.

## Problema / Por que existe

Pessoas não técnicas precisam de uma landing page (lançamento, portfólio, evento, negócio local, captura de e-mails) mas construtores de site cobram assinatura mensal, pedem domínio próprio ou exigem saber escrever código. Olaria é um aplicativo desktop local que produz um único arquivo HTML, sem assinatura, sem servidor e sem dependência de plataforma.

## O que faz

- **Modelos prontos** — 12 itens (11 modelos mais página em branco): Lançamento, Portfólio, Evento, Negócio local, Captura de e-mails, Em breve, Página de links, Currículo, Produto físico, ONG e Casamento. Todos em pt-BR, CSS embutido, nenhum link externo obrigatório.
- **Edição visual** — clique para selecionar um elemento, arraste para mover (reordena irmãos ou reposiciona livre elementos marcados), duplo clique para editar o texto, painel à direita para cores, tamanhos, cantos, links, imagens e posição.
- **Inserir componentes** — títulos, parágrafos, introdução, citação, lista, botão, botão contorno, dois botões, link, imagem, vídeo do YouTube, espaço, linha, nova seção, duas colunas, cartões, faixa de ação, menu do topo, rodapé, ponto de âncora, formulário de contato, só e-mail, etiqueta e tabela. Os componentes usam classes `o-*` com tokens `--olaria-*` da própria página, então herdam o tema do site.
- **Animações** — entrada (fade-up, fade-down, fade-left, fade-right, zoom-in, blur-in, reveal), hover (levitar, crescer, sublinhado) e rolagem (parallax suave, parallax, parallax rápido, barra de progresso). Respeita `prefers-reduced-motion`.
- **Tema** — um painel edita as cores, fonte, raio e largura máxima de toda a página de uma vez, com aviso de contraste para não deixar o site ilegível sem querer.
- **Código** — editor CodeMirror 6 (HTML/CSS/JS) nas abas Visual, Código e Dividido. As duas visões ficam sempre sincronizadas; Ctrl+S salva.
- **Abre qualquer HTML** — páginas feitas no Olaria ou no VS Code. Se a pasta tiver `style.css` ou imagens, a pré-visualização mostra tudo. Edição externa (VS Code) é detectada e o app recarrega o arquivo.
- **Publicar** — salva o `index.html` único, ou cria uma pasta do site com `index.html`, `.nojekyll` e `COMO-PUBLICAR.md` com o passo a passo do GitHub Pages. Pode abrir direto no navegador, abrir `github.com/new`, ou publicar com um clique (requer Git e GitHub CLI autenticados).
- **Ações de botão** — rolar até uma seção da página, abrir site (nova aba), e-mail, telefone, baixar arquivo ou nenhuma ação. Um `<button>` vira `<a>` de verdade ao aplicar um valor, para funcionar também no arquivo exportado.
- **Quatro modos** — Editar (F1), Visita (F2), Código (F3), Dividido (F4). Pré-visualização em desktop, tablet e phone.
- **Histórico** — desfazer/refazer (até 200 estados), um único histórico para as duas visões.
- **Aparência do app** — tema escuro de alto contraste por decisão de produto (ferramenta de trabalho, uso prolongado). Os sites que você cria podem ter qualquer cor.

## Stack

- Frontend: JavaScript (módulos ES), Vite (servidor de desenvolvimento na porta 1420, build para `dist/`), CodeMirror 6 (`@codemirror/*`) para o editor de código.
- Testes: vitest + jsdom (testes de utilitários, estado, modelos e integração do app).
- Desktop: Tauri 2 com backend em Rust, WebView2 no Windows, plugins dialog e opener.
- Backend Rust (`src-tauri/src/commands.rs`): leitura/escrita de arquivo restrita à pasta home do usuário (proteção contra path traversal), imagem → data URL (limite 8 MB por imagem) para manter o arquivo único, watcher de pasta (`notify`), `publish_package` (escreve `index.html`, `.nojekyll` e `COMO-PUBLICAR.md`) e `publish_github` (`git init/add/commit`, `gh repo create --source=. --push`, ativa GitHub Pages).
- Empacotador: instaladores NSIS e MSI (`src-tauri/target/release/bundle/`).

## Como funciona

1. O documento vive como texto HTML no estado único do app (`state.doc`).
2. A pré-visualização é um `iframe` com `srcdoc`; o runtime de edição (`edit-runtime.js`) é injetado no iframe, se comunica com o app por `postMessage` e é REMOVIDO antes de serializar. O que é salvo nunca carrega código do editor.
3. Toda mudança visual (seleção, texto, estilo, atributo, classe, inserção, animação) vira `postMessage` para o runtime, que muta o DOM do iframe e avisa o app; o app reserializa o HTML e atualiza o editor de código. Toda mudança no código repinta a pré-visualização. Um único histórico de desfazer serve às duas visões.
4. Animações e componentes entram como blocos marcados (`data-olaria="anim"`, `data-olaria="utils"`) e ficam na página exportada — o site funciona sozinho, sem o app.
5. Ao abrir páginas de pasta (com `style.css` e imagens), URLs relativas são reescritas para o protocolo de assets do Tauri ao abrir e restauradas ao salvar (`assets.js`).
6. Publicar com um clique escreve os arquivos, roda `git init/add/commit`, `gh repo create --source=. --push` e ativa o GitHub Pages (branch `main`, raiz). Requer Git e GitHub CLI (`gh auth login`).

## Como rodar

Pré-requisitos: Node.js 20+ e Rust 1.77+. No Windows o app usa WebView2 (já incluído no Windows 11).
=======
![linguagem: JavaScript](https://img.shields.io/badge/linguagem-JavaScript-blue)  
![status: concluido](https://img.shields.io/badge/status-concluido-green)  
![licenca: MIT](https://img.shields.io/badge/licenca-MIT-blue)

### Descrição
Construtor de landing pages para pessoas não-técnicas. Monta a página clicando nos elementos e, quando quiser, abre o código. A saída é sempre um arquivo HTML único, pronto para publicar de graça no GitHub Pages.

### O que faz
Construtor de landing pages para pessoas não-técnicas. Monta a página clicando nos elementos e, quando quiser, abre o código. A saída é sempre um arquivo HTML único, pronto para publicar de graça no GitHub Pages.

### Tecnologias
- JavaScript
- HTML
- CSS

### Como usar
Instale as dependências e execute os testes: `npm install && npm test`

### Estrutura
Consulte a árvore do repositório para a organização exata de pastas e arquivos.
>>>>>>> 1151869cbd77b243a4ee656138ac2e9622672a40

### Testes
Não há contagem de testes registrada nesta metadata. Adicione e execute testes apropriados à linguagem (pytest para Python, ./mvnw test para Java, npm test para JavaScript/TypeScript).

<<<<<<< HEAD
Scripts disponíveis:

- `npm run dev` — Vite em `http://localhost:1420` (modo navegador, apenas teste de interface; sem acesso a arquivos, pastas ou publicação)
- `npm run build` — build do frontend para `dist/`
- `npm run preview` — prévia do build
- `npm run tauri dev` — app desktop em desenvolvimento
- `npm run tauri build` — instaladores NSIS e MSI em `src-tauri/target/release/bundle/`
- `npm run check` — verifica sintaxe de todos os fontes (`scripts/check-syntax.mjs`)
- `npm test` — `vitest run` (testes de assets, docutils, state, templates e integração)
- `npm run icon` — gera ícones PNG/ICO (`scripts/make-icon.mjs`)

Para gerar o instalador: `npm run tauri build`. O instalador NSIS fica em `src-tauri/target/release/bundle/nsis/`. O bumpe de versão deve ser feito em 3 arquivos: `package.json`, `src-tauri/Cargo.toml` e `src-tauri/tauri.conf.json`.

## Estrutura do projeto

```
index.html                 casca da interface (SVGs inline)
src/main.js                ponto de entrada
src/app.js                 orquestração: modos, arquivos, sincronia visual ↔ código, histórico, publicação
src/styles.css             tema escuro de alto contraste do app
src/core/
  state.js                 estado único (doc, modo, seleção, histórico)
  store.js                 I/O: comandos Tauri + fallback navegador
  bus.js                   emissor de eventos minúsculo
  docutils.js              injeção dos blocos data-olaria (CSS utilitário, motor de animação)
  assets.js                reescreve/restaura URLs relativas de páginas de pasta
  ui.js                    toasts, modal, confirmação
src/modules/
  preview.js               hospedeiro do iframe + ponte postMessage + serialização
  code-editor.js           CodeMirror 6
  props-panel.js           painel de propriedades do elemento selecionado
  insert-panel.js          gaveta de componentes (componentes.js)
  anim-panel.js            gaveta de animações (entrada, hover, rolagem)
  theme-panel.js           tema da página (tokens --olaria-*, fonte, raio, contraste)
  templates-panel.js       galeria de modelos
  publish-panel.js         modal: salvar arquivo, criar pasta do site, abrir navegador, github.com/new, um clique
  components.js            biblioteca de componentes (classes o-*, utilsCss)
  templates.js             agregador de modelos + página em branco
  templates-a.js / templates-b.js / templates-c.js   12 modelos
src/runtime/
  edit-runtime.js          injetado no iframe (seleção, arrastar, texto, redimensionar, serialização); removido antes de salvar
  anim-engine.js           motor de animação injetado nas páginas exportadas
src/__tests__              testes vitest
src-tauri/                 backend Rust: commands.rs (arquivos, imagem → dataURL, publish), watcher.rs (notify), tauri.conf.json, Cargo.toml
scripts/                   make-icon.mjs, check-syntax.mjs
dist/                      build do frontend (gerado)
```

## Trade-offs e decisões

- **Saída em arquivo único:** imagens viram data URL, então a página continua autônoma, mas imagens grandes incham o HTML (limite de 8 MB por imagem no app).
- **Iframe `srcdoc` herda a origem do app:** no modo Visita, links âncora rolam na página, externos abrem no navegador do sistema e qualquer outro clique (botão, formulário) é travado para não navegar o canvas nem abrir o Olaria dentro de si mesmo.
- **Runtime só no preview:** o runtime de edição é injetado apenas no iframe e removido na serialização; nada do editor chega ao arquivo salvo.
- **Duas visões, um estado:** visual e código compartilham o mesmo estado e histórico; no modo Código o editor é a verdade e não é sobrescrito pelo runtime.
- **App escuro, sites livres:** o app é escuro de alto contraste por decisão de produto; os sites criados podem ter qualquer tema.
- **Segurança de caminho:** leitura e escrita de arquivo são restritas à pasta home do usuário.
- **Publicar com um clique:** cria um repositório de verdade no GitHub (público por padrão) e depende de Git e GitHub CLI instalados e autenticados; testado até o commit local — a criação real do repositório cabe ao usuário executar com intenção.
- **WebView2:** no Windows o app depende do WebView2 Runtime, presente no Windows 11.

## Limitações conhecidas

- Arrastar para mover reordena elementos irmãos; reposicionamento livre funciona apenas em elementos marcados como "Livre na página".
- Redimensionar com alças funciona em elementos posicionados; elementos `static` viram `absolute` ao redimensionar (o tamanho é congelado antes para não pular visualmente).
- Vídeo do YouTube é incorporado por iframe; é preciso trocar o ID do vídeo no painel.
- Formulários usam `action="mailto:"` — abrem o cliente de e-mail. Para envio de verdade, troque pelo endereço do seu serviço de formulário.
- Abrir uma página HTML desconhecida executa o código dela dentro do app. Abra apenas arquivos em que você confia.
- `IntersectionObserver` e `requestAnimationFrame` não disparam em janela de segundo plano, alguns WebViews e impressão; o motor de animação tem rede de segurança (re-revelar, fallback do contador).
- Em modo navegador (`npm run dev`, sem Tauri) não há leitura/escrita de arquivo, escolha de pasta nem publicação — apenas teste de interface.

## Licença

Não há arquivo `LICENSE` neste repositório e o `package.json` está marcado como privado. Se quiser usar o código, entre em contato com o autor antes.

## Autor

Kelvin
=======
### Licença
MIT

### Autor
Kelvin Oliveira — github.com/KelvinOliveiraCode

---

# Olaria — Landing Page Builder for Non-Technical Users

![language: JavaScript](https://img.shields.io/badge/language-JavaScript-blue)  
![status: concluido](https://img.shields.io/badge/status-concluido-green)  
![license: MIT](https://img.shields.io/badge/license-MIT-blue)

### Description
Landing page builder for non-technical users. Build the page by clicking elements and open the code whenever you want. Output is always a single HTML file, ready to publish for free on GitHub Pages.

### What it does
Landing page builder for non-technical users. Build the page by clicking elements and open the code whenever you want. Output is always a single HTML file, ready to publish for free on GitHub Pages.

### Technologies
- JavaScript
- HTML
- CSS

### How to use
Install dependencies and run tests: `npm install && npm test`

### Structure
Check the repository tree for the exact folder and file organization.

### Tests
No test count recorded in this metadata. Add and run tests appropriate for the language (pytest for Python, ./mvnw test for Java, npm test for JavaScript/TypeScript).

### License
MIT

### Author
Kelvin Oliveira — github.com/KelvinOliveiraCode
>>>>>>> 1151869cbd77b243a4ee656138ac2e9622672a40
