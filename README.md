# olaria

<div align="center">

[English](README.en.md) · **Português (Brasil)**

</div>

Aplicativo desktop para montar landing pages e exportar um arquivo HTML único. O app roda em Tauri (Rust) com frontend em JavaScript puro.

## O que é

Olaria é um construtor visual de landing pages para pessoas não técnicas. A pessoa escolhe um modelo ou começa do zero, clica nos elementos da página para editar, arrasta para mudar de lugar, abre o código quando quer e publica. A saída é sempre um arquivo `index.html` autocontido, com CSS no próprio arquivo e sem dependência externa, que pode ir para qualquer hospedagem estática.

São quatro modos, descritos em [CONTEXTO.md](CONTEXTO.md): Editar, com seleção, painel de propriedades e grade de ferramentas; Visualizar, em que a página se comporta como o visitante a veria; Código; e Dividido, com os dois lado a lado. O código fica sempre sincronizado com o canvas.

## Status

Versão 0.3.0, declarada em três lugares que sobem juntos: [package.json](package.json) (linha 4), [src-tauri/Cargo.toml](src-tauri/Cargo.toml) (linha 3) e [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json) (linha 4). A branch é `master` e a árvore estava limpa no momento desta leitura.

O que está implementado e verificável no código:

- Quatro modos de trabalho, três larguras de teste, edição direta no canvas com oito alças de redimensionamento.
- Onze modelos prontos mais página em branco, 24 componentes em 7 grupos, 14 animações mais contador numérico.
- Editor de código CodeMirror 6 com carregamento sob demanda.
- Abrir, salvar, salvar como, recentes, desfazer e refazer com histórico de 200 estados.
- Observação do arquivo aberto, com aviso quando ele muda fora do app.
- Publicação em arquivo único, criação de pasta pronta para GitHub Pages e criação de repositório com o GitHub CLI.

O que ainda não foi verificado inteiro: a publicação com um clique, executada só até o commit local, conforme registrado em [CONTEXTO.md](CONTEXTO.md) (linhas 180 e 181).

Há binários pré-compilados na raiz do repositório: `Olaria.exe` e `Olaria_0.3.0_x64-setup.exe`.

## Funcionalidades

### Edição

Quatro modos, alternados pelos botões do topo ou pelo teclado: Editar (F1), Visualizar (F2), Código (F3) e Dividido (F4). A troca está em [src/app.js](src/app.js) (linhas 164 a 176) e os botões em [index.html](index.html) (linhas 26 a 29).

No modo Editar, o clique seleciona, o arrastar move e o duplo clique edita o texto no lugar. O elemento selecionado ganha oito alças de redimensionamento, nas direções `nw`, `n`, `ne`, `e`, `se`, `s`, `sw` e `w`, definidas em [src/runtime/edit-runtime.js](src/runtime/edit-runtime.js) (linha 140).

O painel da direita mostra as propriedades do que está selecionado, com grupos para texto, imagem, conteúdo incorporado, animação e ações ([src/modules/props-panel.js](src/modules/props-panel.js)).

Atalhos dentro do canvas: Ctrl+Z desfaz, Ctrl+Shift+Z e Ctrl+Y refazem, Delete remove, Alt+Seta move entre irmãos, Escape desseleciona ([src/runtime/edit-runtime.js](src/runtime/edit-runtime.js), linhas 626 a 666). No app: Ctrl+S salva, Ctrl+O abre, Ctrl+E salva como, Ctrl+P alterna entre Editar e Visualizar ([src/app.js](src/app.js), linhas 150 a 177).

### Componentes

A gaveta Inserir traz 24 componentes em 7 grupos ([src/modules/components.js](src/modules/components.js)): Texto, Botões e links, Imagem e vídeo, Seções, Estrutura, Formulário e Extras. Cada grupo é uma lista de itens com id, nome e dica, e a inserção acontece por um evento no barramento ([src/modules/insert-panel.js](src/modules/insert-panel.js)).

### Animações

São 7 animações de entrada, 3 de hover, 4 de rolagem, mais contador numérico e o interruptor de rolagem suave ([src/modules/anim-panel.js](src/modules/anim-panel.js)). O motor que executa essas animações é injetado nas páginas do usuário, inclusive no preview ([src/runtime/anim-engine.js](src/runtime/anim-engine.js)).

### Tema

O painel Tema edita 8 tokens de cor (`--olaria-bg`, `--olaria-surface`, `--olaria-text`, `--olaria-muted`, `--olaria-border`, `--olaria-primary`, `--olaria-on-primary`, `--olaria-accent`), 5 opções de fonte, o raio dos cantos de 0 a 28 px e a largura do conteúdo de 40 a 96 rem ([src/modules/theme-panel.js](src/modules/theme-panel.js)). O painel calcula o contraste entre texto e fundo e entre texto e cor de ação, e avisa quando cai abaixo de 4.5:1.

### Modelos

Onze modelos em três arquivos: 4 em `templates-a.js` (Lançamento, Portfólio, Evento, Negócio local), 3 em `templates-b.js` (Captura de e-mails, Em breve, Página de links) e 4 em `templates-c.js` (Currículo, Produto físico, ONG, Casamento). A galeria acrescenta o cartão de página em branco, totalizando 12 cartões ([src/modules/templates-panel.js](src/modules/templates-panel.js)). O contrato para escrever um modelo novo está em [docs/contrato-templates.md](docs/contrato-templates.md).

### Arquivos e publicação

Abrir arquivo, salvar, salvar como e lista de recentes (10 no armazenamento local, 6 exibidos) em [src/app.js](src/app.js). Arrastar um `.html` para a janela abre o arquivo. O app observa o arquivo aberto e, se ele mudar por outro programa, oferece recarregar do disco ou manter a versão atual ([src/core/store.js](src/core/store.js), [src-tauri/src/watcher.rs](src-tauri/src/watcher.rs)).

O modal Publicar tem quatro caminhos manuais e um automático ([src/modules/publish-panel.js](src/modules/publish-panel.js)): salvar o arquivo único, criar uma pasta com `index.html`, `.nojekyll` e um `COMO-PUBLICAR.md` com o passo a passo, abrir a página no navegador, e publicar no GitHub Pages com um clique.

### Larguras de teste

Três botões no topo aplicam `data-device` no corpo do documento: desktop, tablet e phone ([index.html](index.html), linhas 32 a 42).

## Arquitetura

O app não usa framework de interface. A casca é um HTML com os elementos fixos ([index.html](index.html)), o ponto de entrada é [src/main.js](src/main.js) e todo o resto é orquestrado por [src/app.js](src/app.js), que tem cerca de 900 linhas e exporta as funções usadas pelos testes.

O desenho é o seguinte:

```text
index.html (casca, SVGs inline)
   |
   v
src/main.js  ->  src/app.js  (orquestra modos, arquivos, histórico, publicação)
   |
   +-- src/core/state.js     estado único do app
   +-- src/core/bus.js       barramento de eventos entre módulos
   +-- src/core/store.js     I/O: comandos Rust no Tauri, alternativas no navegador
   +-- src/core/ui.js        avisos, modal e confirmação
   +-- src/core/docutils.js  injeção dos blocos marcados data-olaria
   +-- src/core/assets.js    URLs relativas para o protocolo de assets e volta
   |
   +-- src/modules/preview.js      iframe srcdoc e ponte postMessage
   +-- src/modules/code-editor.js  CodeMirror 6
   +-- src/modules/*-panel.js      gavetas e painel de propriedades
   +-- src/modules/components.js   biblioteca de componentes
   +-- src/modules/templates*.js   modelos
   |
   +-- src/runtime/edit-runtime.js  roda dentro do iframe, sai antes de salvar
   +-- src/runtime/anim-engine.js   roda dentro da página do usuário
   |
   v
src-tauri/src/{lib,commands,watcher}.rs  (Tauri 2)
```

A página em edição vive num iframe com `srcdoc`. O runtime de edição é injetado nesse iframe e conversa com o app por `postMessage`, com eventos como `booted`, `selected`, `mutated`, `serialized`, `undo`, `redo` e `vars` ([src/modules/preview.js](src/modules/preview.js), linhas 50 a 101). Cada mutação no canvas dispara `mutated`, que empurra o estado anterior para o histórico e agenda a serialização de volta para o documento.

O estado é um único objeto mutável em [src/core/state.js](src/core/state.js). Os módulos não se conhecem diretamente: conversam por eventos nomeados no barramento de [src/core/bus.js](src/core/bus.js).

A serialização é o ponto delicado. Antes de gravar, o documento perde o `<script data-olaria="runtime">`, todos os `[data-olaria-ignore]`, os `style[data-olaria="anim-css"]` e a classe `olaria-edit`. O que sai é HTML limpo, sem nada do editor.

## Stack

| Camada | O que é | Onde está declarado |
|---|---|---|
| Backend | Tauri 2, Rust edition 2021, rust-version 1.77 | [src-tauri/Cargo.toml](src-tauri/Cargo.toml) |
| Frontend | JavaScript ES modules, sem framework | [package.json](package.json) (`"type": "module"`) |
| Build | Vite `^6.3.5` | [package.json](package.json), [vite.config.js](vite.config.js) |
| Editor de código | CodeMirror 6 (`codemirror` `^6.0.1` e pacotes `@codemirror/*`) | [package.json](package.json) |
| Estilo | CSS puro, um arquivo | [src/styles.css](src/styles.css) |
| Testes | Vitest `^5.0.4` com jsdom `^29.1.1` | [package.json](package.json) |
| Checagem de sintaxe | esbuild `^0.25.0` | [scripts/check-syntax.mjs](scripts/check-syntax.mjs) |
| Diálogos e abertura | plugins Tauri dialog `^2.3.0` e opener `^2.5.0` | [package.json](package.json) |
| Observação de arquivo | crate notify 7 | [src-tauri/Cargo.toml](src-tauri/Cargo.toml) |
| Publicação | crate regex 1 e o GitHub CLI no sistema | [src-tauri/Cargo.toml](src-tauri/Cargo.toml) |

Não há React, TypeScript, Tailwind nem Recharts neste repositório, apesar de o README anterior afirmar o contrário.

## Estrutura do repositório

```text
olaria/
├── index.html                  casca da interface
├── package.json
├── package-lock.json
├── vite.config.js
├── CONTEXTO.md                 continuidade e armadilhas já resolvidas
├── README.md
├── README.en.md
├── Olaria.exe                  build de release
├── Olaria_0.3.0_x64-setup.exe  instalador NSIS
├── docs/
│   └── contrato-templates.md   contrato para escrever modelos
├── scripts/
│   ├── check-syntax.mjs        sintaxe de todos os fontes com esbuild
│   └── make-icon.mjs           gera os ícones sem dependências
├── src/
│   ├── main.js                 ponto de entrada
│   ├── app.js                  orquestração
│   ├── styles.css              tema escuro do app
│   ├── core/
│   │   ├── bus.js              barramento de eventos
│   │   ├── state.js            estado único
│   │   ├── store.js            I/O com Tauri e fallback web
│   │   ├── ui.js               avisos, modal, confirmação
│   │   ├── docutils.js         injeção dos blocos data-olaria
│   │   ├── assets.js           reescrita de URLs relativas
│   │   └── __tests__/
│   │       ├── assets.test.js
│   │       ├── docutils.test.js
│   │       └── state.test.js
│   ├── modules/
│   │   ├── preview.js          iframe e ponte de mensagens
│   │   ├── code-editor.js      CodeMirror 6
│   │   ├── props-panel.js      propriedades do elemento
│   │   ├── insert-panel.js     gaveta de componentes
│   │   ├── anim-panel.js       gaveta de animações
│   │   ├── theme-panel.js      gaveta de tema
│   │   ├── templates-panel.js  galeria de modelos
│   │   ├── publish-panel.js    modal de publicação
│   │   ├── components.js       biblioteca de componentes
│   │   ├── templates.js        agregador e página em branco
│   │   ├── templates-a.js      4 modelos
│   │   ├── templates-b.js      3 modelos
│   │   ├── templates-c.js      4 modelos
│   │   └── __tests__/
│   │       └── templates.test.js
│   ├── runtime/
│   │   ├── edit-runtime.js     roda no iframe, removido antes de salvar
│   │   └── anim-engine.js      motor de animação das páginas geradas
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
        ├── lib.rs              registro dos comandos
        ├── commands.rs         ler, escrever, imagem, publicar
        └── watcher.rs          aviso de edição externa
```

## Pré-requisitos e instalação

Node.js e npm. O [package.json](package.json) não declara campo `engines`, então não há versão mínima fixada pelo projeto. Esta leitura foi feita com node v24.13.0 e npm 11.6.2.

Rust toolchain. O [src-tauri/Cargo.toml](src-tauri/Cargo.toml) declara `edition = "2021"` e `rust-version = "1.77"`. O Tauri CLI está no repositório como devDependency (`@tauri-apps/cli` `^2.9.0`), então não é preciso instalar o CLI globalmente.

Git e GitHub CLI (`gh`) apenas para a publicação com um clique. Sem eles, os outros caminhos de publicação continuam funcionando.

```bash
git clone https://github.com/KelvinOliveiraCode/olaria.git
cd olaria
npm install
```

O `npm install` não instala a toolchain Rust nem baixa as dependências do Tauri; isso acontece no primeiro `npm run tauri dev`.

## Como executar

Interface no navegador, sem Tauri, para mexer no visual:

```bash
npm run dev
```

O Vite sobe em `http://localhost:1420` com `strictPort` ligado ([vite.config.js](vite.config.js)). Nesse modo o app avisa que está no navegador e as operações de disco não existem: abrir por caminho, salvar por caminho, escolher pasta e publicar recusam com mensagem de erro. Arrastar um `.html` para a janela funciona.

App desktop:

```bash
npm run tauri dev
```

Abre a janela de 1400 por 900, com mínimo de 1024 por 680 ([src-tauri/tauri.conf.json](src-tauri/tauri.conf.json)).

Instalador:

```bash
npm run tauri build
```

O bundle gera NSIS e MSI, os dois alvos configurados em [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json).

Checagem de sintaxe de todos os fontes:

```bash
npm run check
```

O comando executa [scripts/check-syntax.mjs](scripts/check-syntax.mjs), que passa o parser do esbuild em cada `.js`, `.mjs` e `.css` de `src` e em cada `.mjs` de `scripts`.

Ícones:

```bash
npm run icon
```

Testes:

```bash
npm test
```

## Endpoints (se houver API)

Não há API HTTP. O único servidor do projeto é o Vite de desenvolvimento, na porta 1420, e ele serve os arquivos do frontend; não expõe endpoint de aplicação.

A superfície programática é a fila de comandos IPC do Tauri, registrada em [src-tauri/src/lib.rs](src-tauri/src/lib.rs) (linhas 9 a 19):

| Comando | Assinatura | O que faz |
|---|---|---|
| `read_text_file` | `(path: String) -> Result<String, String>` | Lê um arquivo de texto do disco |
| `write_text_file` | `(path: String, contents: String) -> Result<(), String>` | Escreve o arquivo, criando a pasta pai se preciso |
| `image_data_url` | `(path: String) -> Result<String, String>` | Lê uma imagem e devolve data URL, até 8 MB |
| `publish_package` | `(folder: String, html: String, title: String) -> Result<Vec<String>, String>` | Cria a pasta com `index.html`, `.nojekyll` e `COMO-PUBLICAR.md` |
| `publish_github` | `(folder: String, html: String, slug: String) -> Result<PublishReport, String>` | Commita, cria o repositório com `gh` e ativa o Pages |
| `append_log` | `(line: String) -> Result<(), String>` | Grava uma linha em `temp/olaria-diag/cliques.log` |
| `app_version` | `() -> String` | Devolve a versão do pacote Rust |
| `watch_file` | `(path: String) -> Result<(), String>` | Observa a pasta do arquivo aberto |
| `unwatch_file` | `() -> Result<(), String>` | Para de observar |

O backend também emite o evento `olaria:file-changed`, com o caminho no payload, quando o arquivo aberto muda no disco ([src-tauri/src/watcher.rs](src-tauri/src/watcher.rs)).

Duas validações valem para todos os comandos que recebem caminho. A função `safe_path` canonicaliza o caminho e recusa qualquer coisa fora do diretório home do usuário ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), linhas 11 a 51). O `slug` da publicação precisa casar com `^[a-z0-9-]+$` ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), linha 183).

## Testes e qualidade

A suíte é Vitest, executada com `npm test` (`vitest run`). São 5 arquivos e 119 casos de teste, contados um a um:

| Arquivo | Casos | O que cobre |
|---|---|---|
| [src/core/__tests__/assets.test.js](src/core/__tests__/assets.test.js) | 29 | reescrita de URLs relativas para preview e restauração ao salvar |
| [src/core/__tests__/docutils.test.js](src/core/__tests__/docutils.test.js) | 15 | injeção idempotente dos blocos `data-olaria` |
| [src/core/__tests__/state.test.js](src/core/__tests__/state.test.js) | 12 | estado único, marcação de alteração e nome do arquivo |
| [src/modules/__tests__/templates.test.js](src/modules/__tests__/templates.test.js) | 33 | registro, contrato e saída de cada modelo |
| [src/__tests__/app-integration.test.js](src/__tests__/app-integration.test.js) | 30 | abrir, editar, salvar, histórico, modos e dispositivos |

O número de `templates.test.js` vem de 22 casos escritos mais 11 gerados num laço sobre os ids de modelo conhecidos ([src/modules/__tests__/templates.test.js](src/modules/__tests__/templates.test.js), linhas 168 a 181).

Ressalva medida: 7 dos 30 casos de `app-integration.test.js` são asserções `expect(true).toBe(true)`, que passam sem verificar nada. São 3 no bloco de contrato de serialização (linhas 281 a 291) e 4 no bloco final do arquivo (linhas 511 a 516). Os outros 23 casos desse arquivo exercitam código de verdade.

Esta leitura não executou a suíte. O diretório `node_modules` não existe neste clone, então os números acima são contagem estática de chamadas `it()` e `describe()`, não resultado de execução.

A checagem de sintaxe é independente da suíte e varre todos os fontes com o parser do esbuild ([scripts/check-syntax.mjs](scripts/check-syntax.mjs)).

O lado Rust não tem teste automatizado: não há `#[test]` nem `#[cfg(test)]` em nenhum arquivo de [src-tauri/src](src-tauri/src).

## Decisões técnicas e trade-offs

O iframe com `srcdoc` isola o CSS da página do CSS do app, o que permite que o usuário use qualquer tema sem quebrar a interface. O custo é que o iframe herda a origem do app, então todo link precisa ser interceptado: âncora rola dentro da página, link externo vai para o navegador do sistema e o resto é prevenido ([src/runtime/edit-runtime.js](src/runtime/edit-runtime.js), `onClickCapture`). A origem usada na ponte é `window.location.origin`, e não um valor fixo, porque o Windows Tauri usa `http://tauri.localhost` e o Linux e o macOS usam `tauri://localhost` ([src/modules/preview.js](src/modules/preview.js), linhas 13 a 26).

O runtime de edição vive apenas no iframe e é removido antes de salvar. Isso mantém o arquivo exportado limpo, mas obriga a duas operações que precisam estar sincronizadas: injetar ao abrir e limpar ao serializar.

A saída em arquivo único é uma decisão de produto, e ela empurra o resto. Imagens viram data URL ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), linhas 74 a 98), o que tem limite de 8 MB por imagem, e páginas que referenciam arquivos vizinhos passam por reescrita de URL para o protocolo de assets do Tauri ao abrir, com a restauração do caminho original ao salvar ([src/core/assets.js](src/core/assets.js)).

O estado é um objeto único com um barramento de eventos, sem biblioteca de gerenciamento. Ganha-se simplicidade e zero dependência; perde-se a garantia de imutabilidade, e a disciplina de mutar só pelas funções de `state.js` fica por conta de quem escreve o código.

O CodeMirror é carregado sob demanda, por `import()` dinâmico, para não entrar no primeiro carregamento ([src/app.js](src/app.js), linhas 47 a 81). Quando o painel de código aparece, o editor mede zero de altura se for medido cedo demais, então a atualização usa dois `requestAnimationFrame` mais um `setTimeout` de 60 ms ([src/app.js](src/app.js), linhas 259 a 268).

A sincronização do canvas para o documento é agendada com debounce de 140 ms ([src/app.js](src/app.js), linhas 465 a 469), e no modo Código o editor é a fonte da verdade: `syncFromRuntime` não sobrescreve o documento nesse modo ([src/app.js](src/app.js), linhas 481 a 487).

O histórico guarda documentos inteiros, limitado a 200 entradas ([src/app.js](src/app.js), linha 525). É simples e funciona para uma página, mas consome memória proporcional ao tamanho do HTML.

A publicação usa o GitHub CLI em vez da API REST do GitHub. O app não guarda token e não pede credencial, e o comando `gh` cuida da autenticação que já existe na máquina ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), linhas 217 a 246). O repositório criado é público, por escolha explícita no comando.

O caminho de arquivos é restrito ao home do usuário com `strip_prefix` após canonicalizar, o que evita que uma comparação por prefixo de texto deixe passar uma pasta irmã de nome parecido ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), linhas 40 a 48).

O app é escuro de alto contraste por decisão, e os sites criados podem ter qualquer tema. O tema do app vive num único `styles.css` ([src/styles.css](src/styles.css)).

## Limitações conhecidas

A publicação com um clique foi testada só até o commit local. A criação do repositório e a ativação do Pages usam comandos reais do `gh` e não foram executadas sem pedido do dono, conforme [CONTEXTO.md](CONTEXTO.md) (linhas 180 e 181).

A publicação com um clique depende do GitHub CLI instalado e autenticado. Sem `gh` na máquina, o app devolve a mensagem pedindo a instalação ([src-tauri/src/commands.rs](src-tauri/src/commands.rs), linhas 238 a 245).

No navegador, sem Tauri, o app não acessa o disco. Abrir por caminho, salvar por caminho, escolher pasta, publicar e observar arquivo recusam com erro; sobra a edição e o arrastar arquivo ([src/core/store.js](src/core/store.js)).

O backend Rust não tem teste automatizado.

Sete asserções da suíte de integração são placeholder e não verificam nada.

O repositório guarda dois binários na raiz (`Olaria.exe` e o instalador), o que aumenta o tamanho do clone a cada atualização.

O bundle está configurado só para Windows, com alvos NSIS e MSI. Não há alvo para macOS ou Linux em [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json).

Existe um comando `append_log` de diagnóstico que grava em `temp/olaria-diag`. Ele está registrado e disponível para o frontend, o que é mais superfície do que um app de produção precisaria.

Não há tradução da interface: os textos estão em pt-BR.

## Licença e autor

MIT. Copyright (c) 2026 Kelvin Rebelo de Oliveira. Autor: [Kelvin Oliveira](https://github.com/KelvinOliveiraCode)

O repositório não tem arquivo `LICENSE`; o texto acima é a declaração de licença do autor.