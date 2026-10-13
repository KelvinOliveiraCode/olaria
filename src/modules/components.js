/* ============================================================
   Olaria — componentes inseríveis.
   Cada componente é HTML autocontido que usa as classes o-*
   definidas em `utilsCss`. As classes leem os tokens
   --olaria-* da própria página (com valores de reserva),
   então um componente inserido se veste com o tema do site.
   ============================================================ */

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect width='1200' height='675' fill='%23222a30'/%3E%3Ctext x='600' y='344' font-family='system-ui,sans-serif' font-size='44' fill='%2390a0aa' text-anchor='middle'%3Esua imagem aqui%3C/text%3E%3C/svg%3E";

let seq = 0;
const uid = (p) => `${p}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

export const utilsCss = `/* Olaria — camada de utilitários dos componentes inseridos.
   Usa os tokens de tema da própria página. */
.o-section{padding:72px 24px}
.o-wrap{width:100%;max-width:var(--olaria-max,72rem);margin:0 auto}
.o-h2{font-size:clamp(1.6rem,3.4vw,2.2rem);line-height:1.15;margin:0 0 14px;font-weight:700;color:var(--olaria-text,#f5f5f5)}
.o-h3{font-size:1.1rem;margin:0 0 8px;font-weight:650;color:var(--olaria-text,#f5f5f5)}
.o-p{margin:0 0 14px;color:var(--olaria-muted,#a3a3ad);line-height:1.65;max-width:62ch}
.o-lead{margin:0 0 18px;font-size:1.15rem;line-height:1.6;color:var(--olaria-muted,#a3a3ad);max-width:58ch}
.o-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:var(--olaria-radius,10px);background:var(--olaria-primary,#ffb000);color:var(--olaria-on-primary,#1c1400);font-weight:650;font-size:15px;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:filter .15s ease,transform .15s ease}
.o-btn:hover{filter:brightness(1.08)}
.o-btn:active{transform:translateY(1px)}
.o-btn--ghost{background:transparent;color:var(--olaria-text,#f5f5f5);border-color:var(--olaria-border,#2e2e37)}
.o-btn--ghost:hover{border-color:var(--olaria-primary,#ffb000);filter:none}
.o-btn:focus-visible,.o-input:focus-visible,.o-link:focus-visible{outline:2px solid var(--olaria-primary,#ffb000);outline-offset:2px}
.o-btn-row{display:flex;gap:12px;flex-wrap:wrap}
.o-link{color:var(--olaria-primary,#ffb000);text-decoration:underline;text-underline-offset:3px}
.o-quote{margin:0;padding:22px 26px;background:var(--olaria-surface,#141416);border:1px solid var(--olaria-border,#26262c);border-radius:var(--olaria-radius,10px);font-size:1.05rem;line-height:1.6}
.o-quote p{margin:0 0 8px}
.o-quote footer{color:var(--olaria-muted,#a3a3ad);font-size:.9rem}
.o-list{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.o-list li{position:relative;padding-left:26px;color:var(--olaria-muted,#a3a3ad);line-height:1.55}
.o-list li::before{content:"";position:absolute;left:2px;top:.55em;width:8px;height:8px;border-radius:2px;background:var(--olaria-primary,#ffb000)}
.o-img{width:100%;display:block;border-radius:var(--olaria-radius,10px)}
.o-figure{margin:0}
.o-figure figcaption{margin-top:8px;font-size:.85rem;color:var(--olaria-muted,#a3a3ad)}
.o-embed{width:100%;aspect-ratio:16/9;border:0;border-radius:var(--olaria-radius,10px)}
.o-cols{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center}
.o-cta{padding:64px 24px;background:var(--olaria-surface,#141416);border-top:1px solid var(--olaria-border,#26262c);border-bottom:1px solid var(--olaria-border,#26262c)}
.o-form{display:grid;gap:12px;max-width:440px}
.o-label{font-size:.85rem;color:var(--olaria-muted,#a3a3ad)}
.o-input{width:100%;padding:11px 13px;border-radius:var(--olaria-radius,10px);border:1px solid var(--olaria-border,#2e2e37);background:var(--olaria-bg,#0c0c0e);color:var(--olaria-text,#f5f5f5);font-size:15px}
.o-spacer{height:48px}
.o-hr{border:0;border-top:1px solid var(--olaria-border,#26262c);margin:24px 0}
.o-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}
.o-card{padding:22px;border:1px solid var(--olaria-border,#26262c);border-radius:var(--olaria-radius,10px);background:var(--olaria-surface,#141416)}
.o-card p{margin:0;color:var(--olaria-muted,#a3a3ad);font-size:.95rem;line-height:1.55}
.o-tag{display:inline-block;padding:3px 10px;border-radius:999px;border:1px solid var(--olaria-border,#2e2e37);color:var(--olaria-muted,#a3a3ad);font-size:.78rem}
.o-nav{position:sticky;top:0;z-index:50;padding:14px 24px;background:var(--olaria-bg,#0c0c0e);border-bottom:1px solid var(--olaria-border,#26262c)}
.o-nav .o-wrap{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.o-nav strong{font-size:1.05rem;color:var(--olaria-text,#f5f5f5)}
.o-footer{padding:40px 24px;border-top:1px solid var(--olaria-border,#26262c)}
.o-anchor{scroll-margin-top:84px}
@media (max-width:640px){.o-cols{grid-template-columns:1fr}.o-section{padding:52px 20px}}
@media (prefers-reduced-motion:reduce){.o-btn{transition:none}}`;

export const componentGroups = [
  {
    name: 'Texto',
    items: [
      {
        id: 'titulo',
        name: 'Título',
        hint: 'Cabeçalho de uma seção',
        html: () => '<h2 class="o-h2">Título da seção</h2>',
      },
      {
        id: 'paragrafo',
        name: 'Parágrafo',
        hint: 'Um texto comum',
        html: () =>
          '<p class="o-p">Escreva aqui. Conte o que a pessoa precisa saber nesta parte da página.</p>',
      },
      {
        id: 'lead',
        name: 'Introdução',
        hint: 'Texto maior, logo após o título',
        html: () =>
          '<p class="o-lead">Uma frase de abertura, em destaque, que resume a ideia desta seção.</p>',
      },
      {
        id: 'citacao',
        name: 'Citação',
        hint: 'Fala de alguém, com autoria',
        html: () =>
          '<blockquote class="o-quote"><p>“Uma frase que merece destaque.”</p><footer>Nome da pessoa, cargo</footer></blockquote>',
      },
      {
        id: 'lista',
        name: 'Lista',
        hint: 'Itens com marcador',
        html: () =>
          '<ul class="o-list"><li>Primeiro item</li><li>Segundo item</li><li>Terceiro item</li></ul>',
      },
    ],
  },
  {
    name: 'Botões e links',
    items: [
      {
        id: 'botao',
        name: 'Botão',
        hint: 'Ação principal',
        html: () => {
          const id = uid('acao');
          return `<a class="o-btn" href="#${id}">Começar agora</a>`;
        },
      },
      {
        id: 'botao-contorno',
        name: 'Botão contorno',
        hint: 'Ação secundária',
        html: () => '<a class="o-btn o-btn--ghost" href="#saiba-mais">Saber mais</a>',
      },
      {
        id: 'botoes-par',
        name: 'Dois botões',
        hint: 'Principal e secundário lado a lado',
        html: () => {
          const id = uid('ir');
          return `<div class="o-btn-row"><a class="o-btn" href="#${id}">Ação principal</a><a class="o-btn o-btn--ghost" href="#saiba-mais">Ver detalhes</a></div>`;
        },
      },
      {
        id: 'link',
        name: 'Link',
        hint: 'Link dentro de um texto',
        html: () => '<a class="o-link" href="https://exemplo.com">texto do link</a>',
      },
    ],
  },
  {
    name: 'Imagem e vídeo',
    items: [
      {
        id: 'imagem',
        name: 'Imagem',
        hint: 'Escolha a imagem no painel',
        html: () =>
          `<figure class="o-figure"><img class="o-img" src="${PLACEHOLDER_IMG}" alt="Descreva a imagem aqui"><figcaption>Legenda opcional</figcaption></figure>`,
      },
      {
        id: 'video',
        name: 'Vídeo do YouTube',
        hint: 'Troque o ID do vídeo no painel',
        html: () =>
          '<iframe class="o-embed" src="https://www.youtube-nocookie.com/embed/ID-DO-VIDEO" title="Título do vídeo" loading="lazy" allowfullscreen></iframe>',
      },
      {
        id: 'espacador',
        name: 'Espaço',
        hint: 'Respiro entre elementos',
        html: () => '<div class="o-spacer" aria-hidden="true"></div>',
      },
      {
        id: 'linha',
        name: 'Linha',
        hint: 'Separação discreta',
        html: () => '<hr class="o-hr">',
      },
    ],
  },
  {
    name: 'Seções',
    items: [
      {
        id: 'secao',
        name: 'Nova seção',
        hint: 'Título e texto, largura total',
        where: 'end',
        html: () => {
          const id = uid('secao');
          return `<section class="o-section o-anchor" id="${id}"><div class="o-wrap"><h2 class="o-h2">Título da seção</h2><p class="o-p">Explique esta parte. Uma seção nova conta uma ideia nova da página.</p></div></section>`;
        },
      },
      {
        id: 'secao-duas-colunas',
        name: 'Duas colunas',
        hint: 'Texto de um lado, imagem do outro',
        where: 'end',
        html: () => {
          const id = uid('secao');
          return `<section class="o-section o-anchor" id="${id}"><div class="o-wrap"><div class="o-cols"><div><h2 class="o-h2">Um título que conversa com a imagem</h2><p class="o-p">Do lado direito entra uma imagem que mostra o que você está descrevendo.</p></div><div><img class="o-img" src="${PLACEHOLDER_IMG}" alt="Descreva a imagem aqui"></div></div></div></section>`;
        },
      },
      {
        id: 'secao-cartoes',
        name: 'Cartões',
        hint: 'Dois ou três itens comparáveis',
        where: 'end',
        html: () => {
          const id = uid('secao');
          return `<section class="o-section o-anchor" id="${id}"><div class="o-wrap"><h2 class="o-h2">Título dos cartões</h2><div class="o-grid" style="margin-top:26px"><article class="o-card"><h3 class="o-h3">Primeiro</h3><p>Uma linha explicando este item.</p></article><article class="o-card"><h3 class="o-h3">Segundo</h3><p>Uma linha explicando este item.</p></article><article class="o-card"><h3 class="o-h3">Terceiro</h3><p>Uma linha explicando este item.</p></article></div></div></section>`;
        },
      },
      {
        id: 'faixa-cta',
        name: 'Faixa de ação',
        hint: 'Chamada final com botão',
        where: 'end',
        html: () => {
          const id = uid('ir');
          return `<section class="o-cta"><div class="o-wrap"><h2 class="o-h2">Pronto para dar o próximo passo?</h2><p class="o-p">Explique o que acontece quando a pessoa clica.</p><div class="o-btn-row"><a class="o-btn" href="#${id}">Quero começar</a></div></div></section>`;
        },
      },
    ],
  },
  {
    name: 'Estrutura',
    items: [
      {
        id: 'nav',
        name: 'Menu do topo',
        hint: 'Fixo no alto, com links',
        where: 'end',
        html: () => {
          const s1 = uid('secao');
          return `<header class="o-nav"><nav class="o-wrap" aria-label="Menu"><strong>Sua marca</strong><a class="o-link" href="#${s1}">Seção 1</a><a class="o-link" href="#secao-2">Seção 2</a></nav></header>`;
        },
      },
      {
        id: 'rodape',
        name: 'Rodapé',
        hint: 'Fim da página',
        where: 'end',
        html: () =>
          '<footer class="o-footer"><div class="o-wrap"><p class="o-p">Sua marca — todos os direitos reservados.</p></div></footer>',
      },
      {
        id: 'ancora',
        name: 'Ponto de link',
        hint: 'Alvo para os links do menu',
        html: () => {
          const id = uid('destino');
          return `<div class="o-anchor" id="${id}"></div>`;
        },
      },
    ],
  },
  {
    name: 'Formulário',
    items: [
      {
        id: 'form-contato',
        name: 'Contato',
        hint: 'Envia por e-mail — troque o endereço',
        html: () => {
          const n = uid('campo');
          return `<form class="o-form" action="mailto:seu@email.com" method="post" enctype="text/plain"><label class="o-label" for="${n}-nome">Seu nome</label><input class="o-input" id="${n}-nome" name="nome" type="text" required><label class="o-label" for="${n}-email">Seu e-mail</label><input class="o-input" id="${n}-email" name="email" type="email" required><label class="o-label" for="${n}-msg">Mensagem</label><textarea class="o-input" id="${n}-msg" name="mensagem" rows="4"></textarea><button class="o-btn" type="submit">Enviar mensagem</button></form>`;
        },
      },
      {
        id: 'form-newsletter',
        name: 'Só e-mail',
        hint: 'Captura de e-mail, envia por e-mail',
        html: () => {
          const n = uid('news');
          return `<form class="o-form" action="mailto:seu@email.com" method="post" enctype="text/plain" style="grid-template-columns:1fr auto;max-width:none"><label class="o-label" for="${n}" style="grid-column:1/-1">Receba as novidades</label><input class="o-input" id="${n}" name="email" type="email" placeholder="seu@email.com" required><button class="o-btn" type="submit">Avise-me</button></form>`;
        },
      },
    ],
  },
  {
    name: 'Extras',
    items: [
      {
        id: 'etiqueta',
        name: 'Etiqueta',
        hint: 'Marcador pequeno',
        html: () => '<span class="o-tag">Novo</span>',
      },
      {
        id: 'tabela',
        name: 'Tabela',
        hint: 'Dados em linhas',
        html: () =>
          '<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:10px 12px;border-bottom:1px solid var(--olaria-border,#26262c)">Coluna 1</th><th style="text-align:left;padding:10px 12px;border-bottom:1px solid var(--olaria-border,#26262c)">Coluna 2</th></tr></thead><tbody><tr><td style="padding:10px 12px;border-bottom:1px solid var(--olaria-border,#1c1c22)">Valor</td><td style="padding:10px 12px;border-bottom:1px solid var(--olaria-border,#1c1c22)">Valor</td></tr></tbody></table>',
      },
    ],
  },
]

export const placeholderImage = PLACEHOLDER_IMG

export function findComponent(id) {
  for (const group of componentGroups) {
    for (const item of group.items) {
      if (item.id === id) return item
    }
  }
  return null
}
