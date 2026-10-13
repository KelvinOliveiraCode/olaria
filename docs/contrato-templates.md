# Contrato dos templates do Olaria

Cada template é uma **página HTML completa, arquivo único**, toda o CSS dentro de
um único `<style>` no `<head>`. Nada de CSS/JS externo. É permitido (e
recomendado) um `<link>` do Google Fonts com famílias reais.

## Formato do arquivo JS

Escreva em UTF-8. O arquivo exporta exatamente:

```js
export const templatesA = [
  {
    id: 'lancamento',
    name: 'Lançamento',
    summary: 'Uma frase curta dizendo o que é e para quem.',
    tags: ['hero', 'recursos', 'cta'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
... página completa ...
</html>`,
  },
  // ... next
]
```

Regras do literal:

- Cada template é **um** template literal (crase envolvendo tudo).
- Dentro do literal NÃO pode haver crase nem `${`. Se precisar de `$` antes de
  `{`, escape: `\${`. Sem exceções.
- Nada de `</script>` dentro do literal.
- Use `\n` reais (escreva o HTML em múltiplas linhas normalmente).

## Tokens obrigatórios (o painel Tema do app edita esses valores)

Todo template DEVE declarar em `:root` exatamente estas variáveis, e **todas** as
cores, fontes e raios da página devem referenciá-las (nada de cor literal
solta, salvo preto/branco puro em overrides de foco):

```css
:root {
  --olaria-bg: #...;          /* fundo da página */
  --olaria-surface: #...;     /* cartões, header, footer */
  --olaria-text: #...;        /* texto principal */
  --olaria-muted: #...;       /* texto secundário */
  --olaria-border: #...;      /* bordas */
  --olaria-primary: #...;     /* cor de ação (botões, links) */
  --olaria-on-primary: #...;  /* texto sobre a cor primária */
  --olaria-accent: #...;      /* um único acento de destaque */
  --olaria-font: "...", system-ui, sans-serif;
  --olaria-radius: 10px;      /* raio base */
  --olaria-max: 72rem;        /* medida do conteúdo */
}
```

Contraste obrigatório: texto normal >= 4.5:1 contra o fundo; texto grande
(títulos) >= 3:1. `--olaria-on-primary` sobre `--olaria-primary` >= 4.5:1.

## Regras de layout (leis do dono, não negociáveis)

- **Full-bleed**: seções, fundos e grids ocupam 100% da largura da viewport.
  NUNCA uma página que fluta como coluna central estreita com margas mortas
  dos lados. A medida (`--olaria-max`) é largura **interna** do conteúdo, com
  padding interno como gutter.
- Tags semânticas: `header`, `nav`, `main`, `section`, `footer`, `h1` uma vez,
  `h2` por seção, `alt` em imagens, `lang="pt-BR"`.
- Links de navegação apontam para ids de seção que EXISTEM na página. Nenhum
  link morto. Nenhum botão sem destino real (formulário com
  `action="mailto:..."` é aceitável e explicado abaixo).

## Regras anti-slop (proibido)

- Gradiente roxo/índigo, glow neon, glassmorphism por padrão, grade de fundo
  decorativa, cartões com faixa colorida na esquerda, badge pílula acima do
  h1, "confiado por" com logos genéricos, terminal falso, estatísticas
  inventadas, depoimentos inventados, emoji como ícone, setinha `→` em todo
  botão, `transition: all`, animar width/height/top/left (só transform e
  opacity), loop infinito de pulse, contador com número inventado.
- Sem lorem ipsum. O texto de exemplo é pt-BR natural, escrito como o usuário
  final editaria. Números só onde fazem sentido serem exemplo honesto (ex.:
  horários de funcionamento, preços de plano exemplo claramente editáveis).

## Obrigatório em todos

- `@media (prefers-reduced-motion: reduce)` desligando animações.
- `:focus-visible` visível (outline de 2px usando `--olaria-primary`).
- Responsivo: funciona em 360px de largura.
- `scroll-behavior: smooth` no html.
- Cada template com paleta e ritmo de seções **diferentes** entre si — não é o
  mesmo esqueleto reciclado com outra cor. Varie alinhamentos, tamanhos,
  ordem e densidade.

## Formulário (onde houver)

```html
<form action="mailto:seu@email.com" method="post" enctype="text/plain">
```
com rótulos reais e um comentário HTML curto dizendo para trocar o e-mail.

## Identidade dos 7 templates (cada um é um arquétipo distinto)

| id | nome | arquétipo | must have |
|---|---|---|---|
| lancamento | Lançamento | Decide/Learn | hero com proposta clara + 3 benefícios priorizados (não 3 cartões iguais) + como funciona (passos reais, 2 ou 3) + CTA + footer enxuto |
| portfolio | Portfólio | Explore | sobre, projetos em grid assimétrico, contato; navegação por âncoras |
| evento | Evento | Story/Scroll | hero de data/local, programação (lista real de horários), local, CTA de inscrição |
| negocio-local | Negócio local | Operate/decidir | hero, serviços (lista não-cartão), horários + contato, endereço com link real para maps |
| captura | Captura de e-mails | Configure | proposta, formulário mailto funcional, perguntas frequentes, CTA |
| em-breve | Em breve | Story | hero minimal, contagem regressiva em JS inline (data editável, comentada), formulário de aviso |
| links | Página de links | Catalog | avatar (círculo, inicial), nome, lista de botões-link largos, ícones sociais em SVG inline |

Navegação fixa no topo só onde faz sentido (lancamento, portfolio, evento,
negocio-local). `captura`, `em-breve` e `links` são páginas curtas sem nav.

Cada página precisa se sustentar sozinha quando aberta no navegador, sem o app.
