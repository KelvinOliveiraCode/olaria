# olaria

[![JavaScript/TypeScript](https://img.shields.io/badge/JS-TS-yellow?logo=javascript)](https://www.typescriptlang.org/)   ![status: concluido](https://img.shields.io/badge/status-concluido-green)   ![licenca: MIT](https://img.shields.io/badge/licenca-MIT-blue)

## Resumo

Olaria: Landing page builder for non-technical users. Visual editor + code view, exports single-file HTML for GitHub Pages.
## Problema / Por que existe

O projeto aborda um recorte prático e automatiza uma tarefa que, feita manualmente, é repetitiva e propensa a erro. O foco está em transformar dados ou processos em saída confiável, com código legível, testável e extensível.
## Arquitetura

Arquivos de código (29):
- `app.js`
- `assets.js`
- `bus.js`
- `docutils.js`
- `state.js`
- `store.js`
- `ui.js`
- `assets.test.js`
- `docutils.test.js`
- `state.test.js`
- `main.js`
- `anim-panel.js`
- `code-editor.js`
- `components.js`
- `insert-panel.js`
## Dependências e Bibliotecas Principais

- vite
## O que faz

Olaria: Landing page builder for non-technical users. Visual editor + code view, exports single-file HTML for GitHub Pages.
## Como rodar

Requisitos: Node.js e npm (ou yarn/pnpm).

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# build para produção
npm run build

# rodar testes
npm test
```
## Estrutura do Projeto

- `app.js`
- `assets.js`
- `bus.js`
- `docutils.js`
- `state.js`
- `store.js`
- `ui.js`
- `assets.test.js`
- `docutils.test.js`
- `state.test.js`
- `main.js`
- `anim-panel.js`
- `code-editor.js`
- `components.js`
- `insert-panel.js`
- `preview.js`
- `props-panel.js`
- `publish-panel.js`
- `templates-a.js`
- `templates-b.js`
- `templates-c.js`
- `templates-panel.js`
- `templates.js`
- `theme-panel.js`
- `templates.test.js`
## Trade-offs e Decisões Técnicas

- Single-file component architecture (`App.tsx`): toda a UI, estado e lógica vivem em um arquivo para simplicidade de deploy e ausência de build complexo.
- Estado global via `useState` + `useMemo`: evita Context API desnecessária para escopo pequeno; `useMemo` memoiza agregações custosas (gráficos, insights).
- Dados mock in-line: transações, orçamentos, metas e notificações são constantes TypeScript ,  facilita prototipagem e testes visuais sem backend.
- Tailwind CSS + gradientes customizados: design system inline via classes utilitárias; sem CSS separado, facilita manutenção visual.
- IA financeira baseada em regras (`getAIResponse`): respostas determinísticas por palavras-chave; sem chamada a LLM externo, funciona offline e sem custo.
- Persistência em `localStorage` (planejada): estado sobrevive a reload; sem servidor, sem banco.
## Limitações Conhecidas

- Dados mock fixos; não há integração com API bancária real (Open Banking, Plaid, etc.).
- IA baseada em regras simples (`getAIResponse`); não usa LLM real nem embeddings.
- Persistência apenas em `localStorage` (planejada); dados perdidos ao trocar de navegador/dispositivo.
- Sem autenticação/autorização; aplicação single-user local.
- Gráficos via `recharts` com dados estáticos; não há streaming de dados em tempo real.
## Testes

```bash
npm test
```
Nenhum teste automatizado detectado na varredura.
## Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` do repositório.
## Autor

Kelvin Oliveira ,  https://github.com/KelvinOliveiraCode
Portfolio: https://kelvinoliveiracode.github.io/portfolio/
