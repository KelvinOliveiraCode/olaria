# Olaria

Construidor de landing pages para pessoas **não técnicas**. Você monta a página
clicando nos elementos, e quando quiser, abre o código. A saída é sempre
**um arquivo HTML único**, pronto para publicar de graça no GitHub Pages.

O app em si é escuro de alto contraste, por decisão de produto: é uma
ferramenta de trabalho, e o usuário passa horas nela. O tema escuro é do app —
os sites que você cria podem ter qualquer cor.

## O que ele faz

- **Modelos prontos** — lançamento, portfólio, evento, negócio local, captura
  de e-mails, em breve e página de links. Todos em pt-BR, um arquivo só.
- **Edição visual** — clique para selecionar, arraste para mover, duplo clique
  para mudar o texto, painel à direita para cores, tamanhos, cantos, links,
  imagens e posição.
- **Inserir componentes** — títulos, botões, imagens, vídeos, seções, menus,
  formulários, tabelas. Os componentes se vestem com o tema da página.
- **Animações** — entrada ao rolar (fade, zoom, blur), hover (levantar,
  crescer, sublinhado), rolagem (parallax, barra de progresso, contador).
  Tudo respeita `prefers-reduced-motion`.
- **Tema** — um painel mexe nas cores, fonte, cantos e largura da página
  inteira, com aviso de contraste para não deixar o site ilegível.
- **Código** — editor HTML/CSS/JS completo (CodeMirror) nas abas Visual,
  Código e Dividido. As duas visões ficam sempre sincronizadas.
- **Abre qualquer HTML** — criado no Olaria ou no VS Code. Se a pasta tiver
  `style.css` ou imagens, a pré-visualização mostra tudo. Se você salvar o
  arquivo no VS Code enquanto o Olaria está aberto, o app percebe e recarrega.
- **Publicar** — exporta o `index.html`, ou cria a pasta do site com
  `.nojekyll` e um `COMO-PUBLICAR.md` com o passo a passo do GitHub Pages.

## Rodar em desenvolvimento

Precisa de [Node.js](https://nodejs.org) 20+ e [Rust](https://rustup.rs) 1.77+.

```bash
npm install
npm run tauri dev
```

No Windows, o app usa o WebView2 (já vem no Windows 11).

## Gerar o instalador

```bash
npm run tauri build
```

O instalador NSIS fica em `src-tauri/target/release/bundle/nsis/`.

## Estrutura

```
index.html                  casca da interface
src/styles.css              tema escuro de alto contraste do app
src/app.js                  orquestração (arquivos, modos, histórico, publicação)
src/core/                   estado, I/O (Tauri + fallback web), ativos, modal
src/modules/                editor de código, pré-visualização, painéis, componentes
src/runtime/edit-runtime.js runtime injetado no iframe (seleção, arrastar, texto)
src/runtime/anim-engine.js  motor de animação injetado nas páginas do usuário
src/modules/templates-*.js  modelos de página
src-tauri/                  backend Rust: arquivos, watcher, empacotador
scripts/                    gerador de ícones e verificador de sintaxe
```

## Como a mágica funciona

1. O documento vive como texto em `state.doc`.
2. A pré-visualização é um `iframe` (`srcdoc`) com um runtime de edição
   injetado. O runtime é removido antes de serializar, então o que é salvo
   nunca carrega código do editor.
3. Toda mudança visual volta como HTML serializado e atualiza o editor de
   código. Toda mudança no código repinta a página. Um único histórico de
   desfazer serve às duas visões.
4. Animações e componentes inseridos entram como blocos marcados
   (`data-olaria="anim"`, `data-olaria="utils"`) e ficam na página exportada —
   o site funciona sozinho, sem o app.

## Limitações honestas

- Arrastar para mover reordena entre elementos irmãos, ou reposiciona livre
  elementos que você marcou como "Livre na página" no painel.
- Vídeo do YouTube é incorporado por iframe; o ID precisa ser trocado.
- Formulários usam `action="mailto:"` — funcionam abrindo o cliente de e-mail.
  Para envio de verdade, troque pelo endereço do seu serviço de formulário.
- Abrir uma página HTML desconhecida é rodar o código dela dentro do app.
  Só abra arquivos em que você confia.
