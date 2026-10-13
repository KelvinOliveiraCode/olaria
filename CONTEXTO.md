# OLARIA — Contexto do projeto (handoff / compactação de sessão)

> Documento de continuidade. Se você é um agente novo neste repositório, leia
> este arquivo antes de tocar em qualquer coisa. Ele resume o que é o app, o
> que já funciona, as armadilhas técnicas que já morderam e o que falta fazer.

## 1. O que é

App desktop **Tauri** (Rust + frontend web) para criar **landing pages**.
Público-alvo: **pessoas não técnicas**. Duas visões do mesmo documento:

- **Editar** — clique seleciona, arrastar move, duplo clique edita texto, painel
  de propriedades à direita.
- **Visualizar** — a página como o visitante vê (links funcionando, sem marcas).
- **Código / Dividido** — editor CodeMirror 6, sempre sincronizado com o canvas.

Regras de produto:
- O **app** é escuro de alto contraste por decisão (ferramenta de trabalho).
- Os **sites criados** podem ter qualquer tema.
- Saída sempre **um arquivo HTML único**, publicável no GitHub Pages.

## 2. Estado atual (13/10/2026)

- Versão **0.3.0**, compilada e testada. Binário:
  `src-tauri/target/release/olaria.exe`
- Instalador e exe copiados na raiz: `Olaria.exe`, `Olaria_0.3.0_x64-setup.exe`
- **12 modelos** (11 + página em branco): Lançamento, Portfólio, Evento,
  Negócio local, Captura de e-mails, Em breve, Página de links, Currículo,
  Produto físico, ONG, Casamento.
- **4 modos**: Editar (F1), Visualizar (F2), Código (F3), Dividido (F4).
- **Editor de ações dos botões** (0.3.0): no modo Editar, clicar num `<a>` ou
  `<button>` abre no topo do painel a seção "O que esse botão faz", com:
  Rolar até um lugar da página (lista as seções reais) / Abrir um site
  (URL + nova aba) / Enviar e-mail / Ligar / Baixar arquivo / Nenhuma ação.
  `<button>` é convertido em `<a>` de verdade ao aplicar um valor, para a
  ação funcionar também no arquivo exportado. No modo Visualizar o clique
  não navega o canvas (só testa).

**Regra reforçada em 0.2.1:** no modo Visualizar, **nada** navega o canvas.
O `onClickCapture` antes interceptava só `a[href]` e fazia `return` sem
`preventDefault` para o resto — `<button>` e outros elementos passavam. Agora:
link com âncora rola na página, link externo vai para o navegador do sistema,
mailto/tel passa, e **todo o resto é prevenido**. Enter/Espaço em `a`/`button`
também são bloqueados nesse modo. Isso vale porque o iframe é `srcdoc`: a URL
base dele é a do app, então qualquer navegação abriria o Olaria dentro do
próprio canvas.

## 3. Mapa de arquivos

```
olaria/
├── index.html               casca da interface (SVGs inline)
├── src/styles.css           tema escuro de alto contraste do APP
├── src/app.js               orquestração (modos, arquivos, sync, publish)
├── src/main.js              entry point
├── src/core/
│   ├── bus.js               emitter minúsculo
│   ├── state.js             estado único (doc, modo, seleção, histórico)
│   ├── store.js             I/O: Tauri + fallback web (para testar no Chrome)
│   ├── ui.js                toasts, modal, confirmDialog
│   ├── docutils.js          injeção dos blocos marcados data-olaria
│   └── assets.js            reescreve URLs relativas para o protocolo Tauri
├── src/modules/
│   ├── preview.js           hospedeiro do iframe + ponte de mensagens
│   ├── code-editor.js       CodeMirror 6 + tema próprio
│   ├── props-panel.js       painel de propriedades
│   ├── insert-panel.js      gaveta de componentes
│   ├── anim-panel.js        gaveta de animações
│   ├── theme-panel.js       gaveta de tema (tokens)
│   ├── templates-panel.js   galeria de modelos
│   ├── publish-panel.js     modal de publicação
│   ├── components.js        biblioteca de componentes (classes o-*)
│   ├── templates.js         agregador + blankPage()
│   ├── templates-a.js       4 modelos
│   └── templates-b.js       3 modelos
├── src/runtime/
│   ├── edit-runtime.js      injetado no iframe; REMOVIDO antes de salvar
│   └── anim-engine.js       motor de animação injetado nas páginas do usuário
├── src-tauri/               backend Rust
│   ├── src/commands.rs      ler/escrever arquivo, imagem→dataURL, publish
│   ├── src/watcher.rs       notify: avisa edição externa
│   └── tauri.conf.json      CSP permite asset: (preview de multi-arquivo)
├── docs/contrato-templates.md   contrato para escrever modelos
└── scripts/
    ├── make-icon.mjs        gera ícones PNG/ICO sem dependências
    └── check-syntax.mjs     verificação de sintaxe de todos os fontes
```

## 4. Armadilhas técnicas já resolvidas (NÃO repita)

1. **iframe srcdoc herda a URL do app.** Um link `#secao` no modo Visualizar
   navegava o iframe para `tauri.localhost/#secao` — ou seja, **o próprio Olaria
   abria dentro do canvas** e a página desaparecia (era o bug "não consigo
   editar os modelos"). Correção em `edit-runtime.js` (`onClickCapture`):
   âncora rola dentro da página, externo vai para o navegador do sistema via
   mensagem `openExternal`, formulário não navega (`formDemo`).

2. **Itens `display:none` não geram caixa de grid.** Com gaveta/painel
   fechados, o palco escorregava para a coluna `auto` (ficou 48px) e o painel
   de código para a linha de 0px. Correção: `grid-column`/`grid-row`
   explícitos em `.rail`, `.drawer`, `.stage`, `.props`, `.stage-wrap`,
   `.code-pane`.

3. **`display:contents` NÃO cria irmandade real para o seletor CSS `~`.**
   Tabs e toggles css-only precisam dos `<input>` como **irmãos diretos** no
   DOM dos elementos controlados. Envelope com `display:contents` não resolve.

4. **CodeMirror mede 0 de altura quando o painel está oculto.** `requestAnimationFrame`
   simples ainda corre antes do layout. Use **duplo rAF + setTimeout(60)**.

5. **`serialize()` precisa limpar o documento.** Remove: o `<script
   data-olaria="runtime">`, todos os `[data-olaria-ignore]` (overlay do
   editor), os `style[data-olaria="anim-css"]` e a classe `olaria-edit`. Sem
   isso o arquivo salvo levava lixo do editor.

6. **IntersectionObserver e requestAnimationFrame não disparam** em janela de
   segundo plano, alguns WebViews e impressão. O motor de animação tem rede de
   segurança (`revealInView`, fallback do contador, guarda `__olariaAnim`,
   re-registro quando a animação do elemento muda).

7. **Seleção é assíncrona** (postMessage). Em teste automatizado, espere entre
   clicar num elemento e executar ação sobre ele.

8. **`setEditorValue` estava no branch errado** do `setMode` (só rodava no
   modo dividido, deixando o modo código vazio). E o painel de propriedades
   reaparecia no modo código por um handler de `selected` sem guarda de modo.

## 5. Comandos

```bash
cd C:\Users\Kelvin\Desktop\olaria
npm install                    # dependências
npm run tauri dev              # desenvolvimento
npm run tauri build            # instalador NSIS
node scripts/check-syntax.mjs  # sintaxe de todos os fontes
```

**Bump de versão** (3 arquivos): `src-tauri/tauri.conf.json`,
`src-tauri/Cargo.toml`, `package.json`.

## 6. Padrão de teste estabelecido

- Não afirmar sem medir. Contraste pelo script da skill antislop-human:
  `python "C:\Users\Kelvin\.config\opencode\skills\antislop-human\contrast-check.py" "#FFFFFF" "#000000"`
- App real/teste de UI: Chrome com `--remote-debugging-port=92XX` +
 CLI `agent-browser`. Medir DOM (getComputedStyle, getBoundingClientRect),
  nunca tirar print e adivinhar.
- `agent-browser open` costuma travar na primeira chamada depois do `connect`
  — repetir o comando resolve.
- No PowerShell, `\"` dentro de string não escapa: use `String.fromCharCode(34)`
  ou seletores sem aspas.

## 7. Navegação de sessões (contexto)

O dono mantém **dois apps** nesta máquina:
- **Olaria** (este repo) — construtor de landing pages.
- **SlideStage** (`C:\Users\Kelvin\Desktop\SlideStage`) — editor de slides HTML
  em Tauri/React. Já teve correções aplicadas (fundo branco do CodeMirror via
  `theme="none"`, hover âmbar no canvas, `makeBox` sem a classe `ss-box`,
  watcher de pasta). Não confundir os dois projetos.

Skills do dono que regem o trabalho:
`C:\Users\Kelvin\Desktop\minhas-skills-unificadas\` (web-design-workflow,
antislop-ui, antislop-human, antislop-layoutmobile, scroll-craft, lean-build).

## 8. PRÓXIMA TAREFA (pendente)

As 3 features aprovadas foram **concluídas na 0.2.0**:

1. ✅ **Mais modelos** — `src/modules/templates-c.js` (currículo, produto,
   ong, casamento), integrado em `templates.js`. Galeria com 12 itens.
2. ✅ **Redimensionar arrastando** — 8 alças em `edit-runtime.js`
   (`startResize`/`onResizeMove`/`onResizeUp`). Armadilha resolvida: ao
   tornar o elemento `absolute` é preciso **congelar width/height antes**,
   senão ele encolhe para shrink-to-fit. Usar `offsetParent` (não `closest`)
   como referência de posicionamento.
3. ✅ **Publicar com um clique** — `publish_github` em `commands.rs` escreve
   os arquivos, faz `git init/add/commit`, roda `gh repo create --source=.
   --push` e ativa o Pages via `gh api`. UI: botão "Publicar agora" no modal.
   **Testado só até o passo do git local** — o `gh repo create` cria repo de
   verdade e não foi executado sem pedido do dono.

Possíveis continuidades: testar o publish real (repo privado temporário),
guias de alinhamento ao arrastar, mais componentes.
