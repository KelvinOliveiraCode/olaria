export const templatesA = [
  {
    id: 'lancamento',
    name: 'Lançamento',
    summary: 'Página de lançamento com proposta clara, três benefícios priorizados e os passos para começar.',
    tags: ['hero', 'beneficios', 'cta'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Método Sem Rótulo — leitura de rótulos de alimentos em três passos</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#FBF6EE;
  --olaria-surface:#FFFFFF;
  --olaria-text:#221A12;
  --olaria-muted:#6B5844;
  --olaria-border:#E7DAC6;
  --olaria-primary:#9A3B1E;
  --olaria-on-primary:#FFFFFF;
  --olaria-accent:#1F6F5C;
  --olaria-font:"Fraunces",Georgia,system-ui,serif;
  --olaria-radius:10px;
  --olaria-max:72rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.6}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.15;margin:0}
p{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-surface);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:600;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text)}
.marca span{color:var(--olaria-primary)}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary)}
.btn{display:inline-block;padding:.8rem 1.4rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:600;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.94}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3.5rem,8vw,6rem);scroll-margin-top:5rem}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:center}
@media(min-width:60rem){.hero-in{grid-template-columns:1.1fr .9fr}}
.hero h1{font-size:clamp(2.1rem,5vw,3.4rem);font-weight:600;letter-spacing:-.01em}
.hero-lider{margin-top:1.25rem;font-size:clamp(1.05rem,1.5vw,1.25rem);color:var(--olaria-muted);max-width:34ch}
.hero-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem;align-items:center}
.nota{margin-top:1rem;font-size:.875rem;color:var(--olaria-muted)}
.painel{background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem)}
.painel h2{font-size:1.125rem}
.painel ol{margin-top:1rem;display:grid;gap:.75rem;font-size:.9375rem;color:var(--olaria-muted)}
.beneficios{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.beneficios h2{font-size:clamp(1.7rem,3.4vw,2.5rem);max-width:26ch}
.beneficios .txt{margin-top:1.25rem;color:var(--olaria-muted);max-width:62ch}
.lista-ben{display:grid;margin-top:clamp(2rem,4vw,3rem)}
@media(min-width:52rem){.lista-ben{grid-template-columns:1fr 1fr;gap:0 clamp(2rem,5vw,4rem)}}
.lista-ben li{border-top:1px solid var(--olaria-border);padding-block:1.5rem}
.lista-ben h3{font-size:1.25rem}
.lista-ben p{margin-top:.5rem;color:var(--olaria-muted)}
.passos-lista{counter-reset:passo;display:grid;gap:clamp(1.5rem,3vw,2.5rem);margin-top:clamp(2rem,4vw,3rem)}
@media(min-width:52rem){.passos-lista{grid-template-columns:repeat(3,1fr)}}
.passos-lista li{border-top:2px solid var(--olaria-border);padding-top:1.25rem}
.passos-lista li::before{counter-increment:passo;content:counter(passo);display:block;font-size:2.5rem;font-weight:600;color:var(--olaria-accent);line-height:1}
.passos-lista h3{margin-top:.75rem;font-size:1.1875rem}
.passos-lista p{margin-top:.5rem;color:var(--olaria-muted);font-size:.9375rem}
.cta{background:var(--olaria-primary);color:var(--olaria-on-primary)}
.cta-in{display:grid;gap:clamp(1.5rem,4vw,3rem);align-items:end}
@media(min-width:56rem){.cta-in{grid-template-columns:1.2fr .8fr}}
.cta h2{font-size:clamp(1.8rem,3.6vw,2.6rem);max-width:24ch}
.cta p{margin-top:1rem;max-width:48ch;opacity:.92}
.cta .nota{opacity:.92}
.btn-inverso{background:var(--olaria-on-primary);color:var(--olaria-primary);border-color:var(--olaria-on-primary)}
.rodape{padding-block:2.5rem;border-top:1px solid var(--olaria-border)}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes subir{from{opacity:0;transform:translateY(.75rem)}to{opacity:1;transform:none}}
.hero-texto > *{animation:subir .5s ease both}
.hero-texto > *:nth-child(2){animation-delay:.08s}
.hero-texto > *:nth-child(3){animation-delay:.16s}
.hero-texto > *:nth-child(4){animation-delay:.24s}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">Método <span>Sem Rótulo</span></a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#beneficios">Benefícios</a></li>
        <li><a href="#como-funciona">Como funciona</a></li>
        <li><a href="#comecar">Começar</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="secao hero" id="inicio">
    <div class="wrap hero-in">
      <div class="hero-texto">
        <h1>Leia qualquer rótulo em 30 segundos, sem decorar tabela nutricional</h1>
        <p class="hero-lider">Um método em três partes para escolher no mercado o que vai para o carrinho — sem dieta, sem aplicativo e sem culpa.</p>
        <div class="hero-acoes">
          <a class="btn" href="#comecar">Quero começar agora</a>
          <a class="btn btn-fantasma" href="#como-funciona">Ver como funciona</a>
        </div>
        <p class="nota">Aula de abertura gratuita. Não pedimos cartão de crédito.</p>
      </div>
      <aside class="painel">
        <h2>O que acontece depois do clique</h2>
        <ol>
          <li>Você assiste à aula de abertura, de 14 minutos.</li>
          <li>Recebe a ficha de bolso em PDF para levar ao mercado.</li>
          <li>Escolhe se continua o método ou para por aí.</li>
        </ol>
      </aside>
    </div>
  </section>

  <section class="secao beneficios" id="beneficios">
    <div class="wrap">
      <h2>Você decide em segundos o que merece entrar no carrinho</h2>
      <p class="txt">Em vez de comparar calorias, o método parte de uma pergunta: essa embalagem facilita ou atrapalha a sua semana? A resposta cabe em três olhares — quantidade, tipo de açúcar e quantos ingredientes você não reconhece.</p>
      <ul class="lista-ben">
        <li>
          <h3>Uma ficha que cabe no bolso</h3>
          <p>Você monta a sua ficha durante a aula e leva para o mercado. Nada de decorar lista: é olhar, anotar e seguir.</p>
        </li>
        <li>
          <h3>Feito para quem tem pressa</h3>
          <p>Cada módulo tem menos de 12 minutos e funciona no celular, no ônibus, entre uma coisa e outra.</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="secao" id="como-funciona">
    <div class="wrap">
      <h2>Como funciona, do começo ao fim</h2>
      <ol class="passos-lista">
        <li>
          <h3>Você responde a seis perguntas</h3>
          <p>Um questionário curto sobre o que costuma comprar e onde faz feira. Leva cinco minutos e define o seu ponto de partida.</p>
        </li>
        <li>
          <h3>A gente monta a lista da semana</h3>
          <p>Com as suas respostas, o método organiza uma lista com o que você já come, apenas reorganizada por seção de mercado.</p>
        </li>
        <li>
          <h3>O plano chega no seu e-mail</h3>
          <p>Você recebe o plano em PDF e usa quantas vezes precisar. Não há assinatura escondida nem renovação automática.</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="secao cta" id="comecar">
    <div class="wrap cta-in">
      <div>
        <h2>A aula de abertura está liberada</h2>
        <p>São 14 minutos com o método aplicado a três embalagens reais. Se não servir, você fecha a aba e não acontece nada.</p>
      </div>
      <div>
        <a class="btn btn-inverso" href="mailto:ola@metodosemrotulo.com.br?subject=Aula%20de%20abertura">Assistir à aula de abertura</a>
        <p class="nota">Enviamos o link por e-mail em alguns minutos. Troque o endereço acima pelo seu.</p>
      </div>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Método Sem Rótulo — curso online de leitura de rótulos.</p>
    <ul>
      <li><a href="#beneficios">Benefícios</a></li>
      <li><a href="#como-funciona">Como funciona</a></li>
      <li><a href="mailto:ola@metodosemrotulo.com.br">ola@metodosemrotulo.com.br</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
  {
    id: 'portfolio',
    name: 'Portfólio',
    summary: 'Portfólio de designer com sobre, projetos em grade assimétrica e contato por e-mail.',
    tags: ['sobre', 'projetos', 'contato'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ana Bezerra — identidade visual e design editorial</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#0E1418;
  --olaria-surface:#151D22;
  --olaria-text:#E8EDF0;
  --olaria-muted:#9AA8B0;
  --olaria-border:#2A343B;
  --olaria-primary:#7FD4C1;
  --olaria-on-primary:#0B1114;
  --olaria-accent:#E8B44A;
  --olaria-font:"Space Grotesk",system-ui,sans-serif;
  --olaria-radius:6px;
  --olaria-max:68rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.6}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.15;margin:0}
p{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-bg);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:700;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text);letter-spacing:.02em}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary)}
.btn{display:inline-block;padding:.8rem 1.4rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:700;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.92}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3rem,7vw,5.5rem);scroll-margin-top:5rem}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:center}
@media(min-width:60rem){.hero-in{grid-template-columns:.85fr 1.15fr}}
.retrato{border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);overflow:hidden}
.hero h1{font-size:clamp(2.2rem,5.5vw,3.8rem);font-weight:700;letter-spacing:-.02em}
.papel{margin-top:.75rem;font-size:1.0625rem;color:var(--olaria-primary);font-weight:500}
.hero-lider{margin-top:1.25rem;font-size:clamp(1rem,1.4vw,1.1875rem);color:var(--olaria-muted);max-width:46ch}
.hero-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem}
.sobre-in{display:grid;gap:clamp(2rem,5vw,4rem)}
@media(min-width:60rem){.sobre-in{grid-template-columns:1.25fr .75fr}}
.sobre h2{font-size:clamp(1.6rem,3.2vw,2.3rem);max-width:22ch}
.sobre p{margin-top:1.25rem;color:var(--olaria-muted)}
.como-trabalho{border-top:1px solid var(--olaria-border)}
.como-trabalho li{border-bottom:1px solid var(--olaria-border);padding-block:1.1rem}
.como-trabalho strong{display:block;font-weight:500}
.como-trabalho span{display:block;margin-top:.25rem;font-size:.9375rem;color:var(--olaria-muted)}
.projetos{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.cabeca{display:grid;gap:1rem;align-items:end}
@media(min-width:52rem){.cabeca{grid-template-columns:1fr auto}}
.cabeca p{color:var(--olaria-muted);max-width:44ch}
.grade{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(1.25rem,2.5vw,2rem);margin-top:clamp(2rem,4vw,3rem)}
.grade li{display:flex}
.grade figure{display:flex;flex-direction:column;gap:.9rem;width:100%}
.grade img{width:100%;height:100%;object-fit:cover;border:1px solid var(--olaria-border);border-radius:var(--olaria-radius)}
.g1{grid-column:span 6}
.g2{grid-column:span 6}
.g3{grid-column:span 6}
.g4{grid-column:span 6}
.g5{grid-column:span 6}
.g6{grid-column:span 6}
@media(min-width:48rem){
  .g1{grid-column:span 4}
  .g2{grid-column:span 2}
  .g3{grid-column:span 3}
  .g4{grid-column:span 3}
  .g5{grid-column:span 2}
  .g6{grid-column:span 4}
}
.g1 img{aspect-ratio:4/3}
.g2 img{aspect-ratio:3/4}
.g3 img{aspect-ratio:1/1}
.g4 img{aspect-ratio:4/3}
.g5 img{aspect-ratio:3/4}
.g6 img{aspect-ratio:16/9}
.grade h3{font-size:1.125rem;font-weight:500}
.meta{margin-top:.2rem;font-size:.875rem;color:var(--olaria-primary)}
.grade p.desc{margin-top:.5rem;font-size:.9375rem;color:var(--olaria-muted)}
.contato-in{display:grid;gap:clamp(2rem,5vw,4rem)}
@media(min-width:60rem){.contato-in{grid-template-columns:1fr 1fr}}
.contato h2{font-size:clamp(1.6rem,3.2vw,2.3rem)}
.contato-txt p{margin-top:1.25rem;color:var(--olaria-muted);max-width:44ch}
.dados{margin-top:2rem;display:grid;gap:.75rem;font-size:.9375rem}
.form{display:grid;gap:1rem;background:var(--olaria-bg);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem)}
.campo{display:grid;gap:.4rem}
.campo label{font-size:.875rem;color:var(--olaria-muted)}
.campo input,.campo textarea{font-family:var(--olaria-font);font-size:1rem;color:var(--olaria-text);background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:.7rem .85rem}
.campo textarea{min-height:7rem;resize:vertical}
.rodape{padding-block:2.5rem;border-top:1px solid var(--olaria-border)}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes aparecer{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}
.retrato{animation:aparecer .5s ease both}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">ANA BEZERRA</a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#projetos">Projetos</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="secao hero" id="inicio">
    <div class="wrap hero-in">
      <figure class="retrato">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiByb2xlPSJpbWciPgogIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMTUxRDIyIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMjMwIiByPSIxMjAiIGZpbGw9IiM3RkQ0QzEiLz4KICA8cGF0aCBkPSJNMTgwIDYwMGMwLTEzMCA5OC0yMTUgMjIwLTIxNXMyMjAgODUgMjIwIDIxNXoiIGZpbGw9IiMyQTM0M0IiLz4KICA8cmVjdCB4PSI2MDAiIHk9IjYwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0U4QjQ0QSIvPgo8L3N2Zz4=" width="800" height="600" alt="Composição geométrica em verde-água e amarelo sobre fundo escuro, usada como retrato ilustrado.">
      </figure>
      <div>
        <h1>Ana Bezerra</h1>
        <p class="papel">Identidade visual e design editorial</p>
        <p class="hero-lider">Trabalho com editoras, marcas de café e projetos culturais em São Paulo. Desenho sistemas visuais que aguentam o uso diário — do cartão de visita ao outdoor.</p>
        <div class="hero-acoes">
          <a class="btn" href="#contato">Falar sobre um projeto</a>
          <a class="btn btn-fantasma" href="#projetos">Ver projetos</a>
        </div>
      </div>
    </div>
  </section>

  <section class="secao sobre" id="sobre">
    <div class="wrap sobre-in">
      <div>
        <h2>Sobre o trabalho</h2>
        <p>Comecei como assistente de arte numa gráfica do centro e aprendi a desenhar com a tinta, o papel e o prazo impressos na régua. Hoje atendo sozinha, com dois colaboradores fixos para fotografia e produção.</p>
        <p>Cada projeto começa por uma conversa de duas horas, sem slides. Depois disso entrego um documento de direção, a família tipográfica, a paleta e um manual curto de uso. Projetos de identidade costumam levar de seis a dez semanas.</p>
      </div>
      <ul class="como-trabalho">
        <li>
          <strong>Identidade visual</strong>
          <span>Marca, tipografia, paleta e aplicações essenciais.</span>
        </li>
        <li>
          <strong>Design editorial</strong>
          <span>Livros, catálogos e publicações periódicas.</span>
        </li>
        <li>
          <strong>Embalagem</strong>
          <span>Rótulos e sistemas para linha de produtos.</span>
        </li>
      </ul>
    </div>
  </section>

  <section class="secao projetos" id="projetos">
    <div class="wrap">
      <div class="cabeca">
        <div>
          <h2>Projetos escolhidos</h2>
        </div>
        <p>Uma seleção de 2023 a 2026. Cada peça abaixo é uma composição de exemplo — troque pelas imagens do seu trabalho.</p>
      </div>
      <ul class="grade">
        <li class="g1">
          <figure>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjMTUxRDIyIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iNDIwIiByPSIyMTAiIGZpbGw9IiM3RkQ0QzEiLz48cmVjdCB4PSIxMjAiIHk9IjcwMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMyQTM0M0IiLz48cmVjdCB4PSIxMjAiIHk9IjcwMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFOEI0NEEiLz48L3N2Zz4=" width="800" height="1000" alt="Capa de cartilha com círculo verde-água e blocos cinza e amarelo sobre fundo escuro.">
            <figcaption>
              <h3>Cartilha Rio Subterrâneo</h3>
              <p class="meta">Identidade editorial · 2026</p>
              <p class="desc">Sistema visual para uma cartilha de leitura sobre os rios cobertos da cidade, em tiragem de três mil exemplares.</p>
            </figcaption>
          </figure>
        </li>
        <li class="g2">
          <figure>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI0U4RURGMCIvPjxwYXRoIGQ9Ik0wIDYwMCBMNDAwIDgwIEw4MDAgNjAweiIgZmlsbD0iIzBFMTQxOCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjEyMCIgcj0iNjAiIGZpbGw9IiNFOEI0NEEiLz48L3N2Zz4=" width="800" height="600" alt="Montanha em tons escuros com sol amarelo, aplicada como marca de torrefação de café.">
            <figcaption>
              <h3>Selo Nordeste</h3>
              <p class="meta">Marca · 2025</p>
              <p class="desc">Marca e rótulos para uma torrefação de café de Recife, com duas linhas de produto.</p>
            </figcaption>
          </figure>
        </li>
        <li class="g3">
          <figure>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgODAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iIzBFMTQxOCIvPjxnIHN0cm9rZT0iIzdGRDRDMSIgc3Ryb2tlLXdpZHRoPSIxOCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIxNTAiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjI2MCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iMzUwIi8+PC9nPjxyZWN0IHg9IjM2MCIgeT0iMTUwIiB3aWR0aD0iODAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRThCNDRBIi8+PC9zdmc+" width="800" height="800" alt="Círculos concêntricos em verde-água com uma faixa amarela vertical, usados em visualização de dados.">
            <figcaption>
              <h3>Mapa das Marés</h3>
              <p class="meta">Visualização de dados · 2025</p>
              <p class="desc">Painel para um observatório costeiro, com séries de maré e alerta de ressaca.</p>
            </figcaption>
          </figure>
        </li>
        <li class="g4">
          <figure>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjIwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYyMCIgZmlsbD0iIzJBMzQzQiIvPjxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiM3RkQ0QzEiLz48cmVjdCB4PSI0MjAiIHk9IjE4MCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFOEI0NEEiLz48cmVjdCB4PSI0MjAiIHk9IjQyMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMxNTFEMjIiLz48L3N2Zz4=" width="800" height="620" alt="Blocos em verde-água, amarelo e cinza escuro, composição de um impresso periódico.">
            <figcaption>
              <h3>Boletim Água Limpa</h3>
              <p class="meta">Redesign de impresso · 2024</p>
              <p class="desc">Nova grade e sistema tipográfico para um boletim trimestral de uma ONG de saneamento.</p>
            </figcaption>
          </figure>
        </li>
        <li class="g5">
          <figure>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNTYwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjU2MCIgZmlsbD0iIzE1MUQyMiIvPjxnIGZpbGw9IiNFOEVERjAiPjxyZWN0IHg9IjgwIiB5PSIxMjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMzIwIi8+PHJlY3QgeD0iMzQwIiB5PSI2MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIzODAiLz48cmVjdCB4PSI1NDAiIHk9IjIwMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyNDAiLz48L2c+PGNpcmNsZSBjeD0iNjMwIiBjeT0iMTIwIiByPSI1MCIgZmlsbD0iIzdGRDRDMSIvPjwvc3ZnPg==" width="800" height="560" alt="Três blocos claros de alturas diferentes sobre fundo escuro, como páginas de um projeto fotográfico.">
            <figcaption>
              <h3>Caderneta de Campo</h3>
              <p class="meta">Projeto fotográfico · 2024</p>
              <p class="desc">Livro de artista com 96 páginas sobre a roça de café da Serra da Mantiqueira.</p>
            </figcaption>
          </figure>
        </li>
        <li class="g6">
          <figure>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgOTAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjkwMCIgZmlsbD0iIzBFMTQxOCIvPjxwYXRoIGQ9Ik0xMDAgODAwIEMgMjUwIDMwMCA1NTAgMzAwIDcwMCA4MDB6IiBmaWxsPSIjN0ZENEMxIi8+PHBhdGggZD0iTTEwMCA4MDAgQyAyNTAgNTAwIDU1MCA1MDAgNzAwIDgwMHoiIGZpbGw9IiNFOEI0NEEiLz48L3N2Zz4=" width="800" height="900" alt="Duas ondas em verde-água e amarelo sobre fundo escuro, base de um sistema de rótulos.">
            <figcaption>
              <h3>Rótulos da Serra</h3>
              <p class="meta">Sistema de embalagem · 2023</p>
              <p class="desc">Família de rótulos para sete produtos de uma pequena fábrica de geleias de Cambuci.</p>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>

  <section class="secao contato" id="contato">
    <div class="wrap contato-in">
      <div class="contato-txt">
        <h2>Vamos conversar</h2>
        <p>Respondo em até dois dias úteis. Para orçamento, me conte o prazo e o que precisa ser entregue — não é vir com o escopo fechado.</p>
        <ul class="dados">
          <li>E-mail: <a href="mailto:ana@anabezerra.com.br">ana@anabezerra.com.br</a></li>
          <li>Telefone e WhatsApp: <a href="tel:+5511987654321">(11) 98765-4321</a></li>
          <li>Estúdio: Rua Harmonia, 480 — Vila Madalena, São Paulo</li>
        </ul>
      </div>
      <!-- Troque o e-mail do action pelo endereço que deve receber as mensagens. -->
      <form class="form" action="mailto:ana@anabezerra.com.br" method="post" enctype="text/plain">
        <div class="campo">
          <label for="nome">Seu nome</label>
          <input id="nome" name="nome" type="text" autocomplete="name" required>
        </div>
        <div class="campo">
          <label for="email">Seu e-mail</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="campo">
          <label for="mensagem">Sobre o projeto</label>
          <textarea id="mensagem" name="mensagem" required></textarea>
        </div>
        <div>
          <button class="btn" type="submit">Enviar mensagem</button>
        </div>
      </form>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Ana Bezerra — identidade visual e design editorial. São Paulo, SP.</p>
    <ul>
      <li><a href="#sobre">Sobre</a></li>
      <li><a href="#projetos">Projetos</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
  {
    id: 'evento',
    name: 'Evento',
    summary: 'Página de evento com data e local em destaque, programação por horário, endereço e inscrição.',
    tags: ['hero', 'programacao', 'inscricao'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Feira de Fotolivros Latino-Americana — 12 a 15 de junho, Pavilhão da Bienal, São Paulo</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#101010;
  --olaria-surface:#181818;
  --olaria-text:#F4F2EF;
  --olaria-muted:#A5A19C;
  --olaria-border:#2E2E2E;
  --olaria-primary:#C8381F;
  --olaria-on-primary:#FFFFFF;
  --olaria-accent:#F0C33C;
  --olaria-font:"Archivo",system-ui,sans-serif;
  --olaria-radius:14px;
  --olaria-max:64rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.6}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.12;margin:0}
p{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
a{color:var(--olaria-accent);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-accent);outline-offset:3px}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-bg);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:700;font-size:1rem;text-decoration:none;color:var(--olaria-text);text-transform:uppercase;letter-spacing:.12em}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-accent)}
.btn{display:inline-block;padding:.8rem 1.4rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:600;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.94}
.btn-fantasma{background:transparent;color:var(--olaria-text);border-color:var(--olaria-border)}
.btn-fantasma:hover{color:var(--olaria-accent);border-color:var(--olaria-accent)}
.secao{padding-block:clamp(3rem,7vw,5.5rem);scroll-margin-top:5rem}
.hero{background:var(--olaria-bg)}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:end}
@media(min-width:60rem){.hero-in{grid-template-columns:1.15fr .85fr}}
.hero h1{font-size:clamp(2.3rem,6vw,4rem);font-weight:700;letter-spacing:-.02em;text-transform:uppercase}
.destaque-data{margin-top:1.75rem;border-top:1px solid var(--olaria-border);padding-top:1.25rem}
.destaque-data .dias{font-size:clamp(1.4rem,3.4vw,2.1rem);font-weight:700;color:var(--olaria-accent);letter-spacing:.01em}
.destaque-data .onde{margin-top:.35rem;font-size:1.0625rem;color:var(--olaria-muted)}
.hero-lider{margin-top:1.5rem;color:var(--olaria-muted);max-width:46ch}
.hero-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem}
.nota{margin-top:1rem;font-size:.875rem;color:var(--olaria-muted)}
.hero-figura{margin-top:clamp(2rem,5vw,3.5rem);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);overflow:hidden}
.programacao{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.cabeca h2{font-size:clamp(1.7rem,3.6vw,2.6rem)}
.cabeca p{margin-top:.75rem;color:var(--olaria-muted);max-width:52ch}
.dia{margin-top:clamp(2rem,4vw,3rem)}
.dia:first-of-type{margin-top:clamp(1.75rem,3vw,2.5rem)}
.dia h3{font-size:1.0625rem;font-weight:600;color:var(--olaria-accent);text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--olaria-border);padding-bottom:.75rem}
.dia li{display:grid;gap:.35rem 1.5rem;padding-block:1.25rem;border-bottom:1px solid var(--olaria-border)}
@media(min-width:48rem){.dia li{grid-template-columns:6rem 1fr}}
.hora{font-weight:600;color:var(--olaria-text);font-variant-numeric:tabular-nums}
.dia li p{color:var(--olaria-muted);font-size:.9375rem;margin-top:.35rem}
.dia li h4{font-size:1.0625rem;font-weight:500;margin:0}
.local-in{display:grid;gap:clamp(2rem,5vw,4rem)}
@media(min-width:60rem){.local-in{grid-template-columns:1fr 1fr}}
.local h2{font-size:clamp(1.7rem,3.6vw,2.6rem)}
.endereco{margin-top:1.5rem;font-style:normal;font-size:1.0625rem;color:var(--olaria-text)}
.endereco span{display:block;color:var(--olaria-muted);font-size:.9375rem;margin-top:.35rem}
.chegar{margin-top:2rem;display:grid;gap:1rem}
.chegar li{border-top:1px solid var(--olaria-border);padding-top:.75rem}
.chegar strong{display:block;font-weight:500}
.chegar span{display:block;margin-top:.2rem;font-size:.9375rem;color:var(--olaria-muted)}
.mapa{background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem);display:grid;gap:1rem;align-content:start}
.mapa h3{font-size:1.0625rem;font-weight:600}
.mapa p{color:var(--olaria-muted);font-size:.9375rem}
.inscricao{background:var(--olaria-primary);color:var(--olaria-on-primary)}
.inscricao-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:start}
@media(min-width:60rem){.inscricao-in{grid-template-columns:1.05fr .95fr}}
.inscricao h2{font-size:clamp(1.7rem,3.6vw,2.5rem)}
.inscricao p{margin-top:1rem;max-width:44ch;opacity:.92}
.form{display:grid;gap:1rem;background:var(--olaria-bg);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem)}
.campo{display:grid;gap:.4rem}
.campo label{font-size:.875rem;color:var(--olaria-muted)}
.campo input,.campo select{font-family:var(--olaria-font);font-size:1rem;color:var(--olaria-text);background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:.7rem .85rem}
.btn-inverso{background:var(--olaria-on-primary);color:var(--olaria-primary);border-color:var(--olaria-on-primary)}
.rodape{padding-block:2.5rem;border-top:1px solid var(--olaria-border)}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes subir{from{opacity:0;transform:translateY(.75rem)}to{opacity:1;transform:none}}
.hero h1,.destaque-data{animation:subir .5s ease both}
.destaque-data{animation-delay:.1s}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">Fotolivros LATAM</a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#programacao">Programação</a></li>
        <li><a href="#local">Local</a></li>
        <li><a href="#inscricao">Inscrição</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="secao hero" id="inicio">
    <div class="wrap">
      <div class="hero-in">
        <div>
          <h1>Feira de Fotolivros Latino-Americana</h1>
          <div class="destaque-data">
            <p class="dias">12 a 15 de junho</p>
            <p class="onde">Pavilhão da Bienal · Parque Ibirapuera, São Paulo</p>
          </div>
          <p class="hero-lider">Quatro dias de feira com 84 editoras independentes, oficinas de encadernação e mesas de conversa sobre publicação autoral. A entrada é gratuita, com inscrição prévia.</p>
          <div class="hero-acoes">
            <a class="btn" href="#inscricao">Quero me inscrever</a>
            <a class="btn btn-fantasma" href="#programacao">Ver a programação</a>
          </div>
          <p class="nota">Inscrições abertas até 10 de junho ou enquanto houver vagas. Troque as datas acima pelas do seu evento.</p>
        </div>
      </div>
      <figure class="hero-figura">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDUwMCIgcm9sZT0iaW1nIj4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMxMDEwMTAiLz4KICA8ZyBmaWxsPSIjRTg0ODJCIj4KICAgIDxyZWN0IHg9IjgwIiB5PSIzMzAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIi8+CiAgICA8cmVjdCB4PSIyMzAiIHk9IjI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxODAiLz4KICAgIDxyZWN0IHg9IjM4MCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjI1MCIvPgogICAgPHJlY3QgeD0iNTMwIiB5PSIxNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMzEwIi8+CiAgICA8cmVjdCB4PSI2ODAiIHk9IjkwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjM2MCIvPgogICAgPHJlY3QgeD0iODMwIiB5PSIxNjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMjkwIi8+CiAgICA8cmVjdCB4PSI5ODAiIHk9IjI1MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyMDAiLz4KICA8L2c+CiAgPGNpcmNsZSBjeD0iMTA0MCIgY3k9IjkwIiByPSI0NiIgZmlsbD0iI0Y0RjJFRiIvPgo8L3N2Zz4=" width="1200" height="500" alt="Barras verticais em vermelho sobre fundo escuro, como uma fileira de fotolivros em exposição.">
      </figure>
    </div>
  </section>

  <section class="secao programacao" id="programacao">
    <div class="wrap">
      <div class="cabeca">
        <h2>Programação</h2>
        <p>Os horários abaixo são um exemplo. Ajuste para a programação real do seu evento, mantendo um item por linha.</p>
      </div>
      <div class="dia">
        <h3>Quinta, 12 de junho</h3>
        <ol>
          <li>
            <span class="hora">14h</span>
            <div>
              <h4>Credenciamento</h4>
              <p>Retirada de crachá na entrada do pavilhão, com fila única para público geral e imprensa.</p>
            </div>
          </li>
          <li>
            <span class="hora">15h</span>
            <div>
              <h4>Abertura com a curadoria</h4>
              <p>Conversa de trinta minutos sobre a seleção de livros desta edição e os critérios de escolha.</p>
            </div>
          </li>
          <li>
            <span class="hora">17h</span>
            <div>
              <h4>Mesa: quem publica em 2026</h4>
              <p>Quatro editoras independentes falam de tiragem, custo e distribuição. Mediação de Marina Alcântara.</p>
            </div>
          </li>
          <li>
            <span class="hora">19h</span>
            <div>
              <h4>Lançamentos</h4>
              <p>Sessão de autógrafos com 12 autoras e autores na área de convivência.</p>
            </div>
          </li>
        </ol>
      </div>
      <div class="dia">
        <h3>Sexta, 13 de junho</h3>
        <ol>
          <li>
            <span class="hora">10h</span>
            <div>
              <h4>Feira abre</h4>
              <p>84 editoras em dois corredores. A feira funciona sem intervalo até as 20h.</p>
            </div>
          </li>
          <li>
            <span class="hora">11h</span>
            <div>
              <h4>Oficina de encadernação</h4>
              <p>Vagas para 20 pessoas, por ordem de chegada. Material incluso.</p>
            </div>
          </li>
          <li>
            <span class="hora">14h</span>
            <div>
              <h4>Roda de conversa: fotolivro e memória</h4>
              <p>Três fotógrafos discutem arquivo familiar como matéria-prima do livro.</p>
            </div>
          </li>
          <li>
            <span class="hora">16h</span>
            <div>
              <h4>Avaliação de portfólio</h4>
              <p>Encontros de 15 minutos com curadores. Inscrição na entrada, sujeita a vagas.</p>
            </div>
          </li>
        </ol>
      </div>
      <div class="dia">
        <h3>Sábado, 14 de junho</h3>
        <ol>
          <li>
            <span class="hora">10h</span>
            <div>
              <h4>Feira abre</h4>
              <p>Programação normal, com área de leitura para crianças liberada.</p>
            </div>
          </li>
          <li>
            <span class="hora">13h</span>
            <div>
              <h4>Palestra: o fotolivro como arquivo</h4>
              <p>Pesquisadora do Museu da Imagem e do Som fala de preservação de acervos editoriais.</p>
            </div>
          </li>
          <li>
            <span class="hora">15h</span>
            <div>
              <h4>Feira de troca</h4>
              <p>Traga um livro fotográfico e leve outro. Não é necessário inscrição.</p>
            </div>
          </li>
          <li>
            <span class="hora">18h</span>
            <div>
              <h4>Retrospectiva da edição</h4>
              <p>Projeção de 20 minutos com os livros selecionados e anúncio da próxima cidade-sede.</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>

  <section class="secao local" id="local">
    <div class="wrap local-in">
      <div>
        <h2>Onde é</h2>
        <address class="endereco">
          Pavilhão da Bienal
          <span>Portão 3 — Rodovia dos Imigrantes, km 1,5, Vila Água Funda, São Paulo, SP</span>
        </address>
        <ul class="chegar">
          <li>
            <strong>Metrô e ônibus</strong>
            <span>Linha 5 do metrô até Santa Cruz e ônibus 509J-10 até o portão do parque. São 12 minutos de caminhada da estação.</span>
          </li>
          <li>
            <strong>Bicicleta</strong>
            <span>Bicicletário gratuito no portão 3, com 40 vagas cobertas.</span>
          </li>
          <li>
            <strong>Estacionamento</strong>
            <span>Conveniado na rua de trás do pavilhão, com 90 vagas e tarifa de R$ 12,00 para o dia.</span>
          </li>
          <li>
            <strong>Acessibilidade</strong>
            <span>Piso tátil, rampa de acesso, elevador e banheiro adaptado em todos os corredores da feira.</span>
          </li>
        </ul>
      </div>
      <div class="mapa">
        <h3>Abrir a rota no Google Maps</h3>
        <p>O link abaixo abre o Maps já com o endereço do evento preenchido. Troque o endereço pela URL do seu local.</p>
        <p><a class="btn" href="https://www.google.com/maps/search/?api=1&amp;query=Pavilh%C3%A3o+da+Bienal%2C+Parque+Ibirapuera%2C+S%C3%A3o+Paulo">Ver trajeto no Google Maps</a></p>
        <p>Domingo, 15 de junho, a feira funciona das 10h às 17h apenas para retirada de encomendas.</p>
      </div>
    </div>
  </section>

  <section class="secao inscricao" id="inscricao">
    <div class="wrap inscricao-in">
      <div>
        <h2>Inscreva-se</h2>
        <p>A inscrição é por dia e dá direito a entrar em qualquer horário da programação daquele dia. Não há cobrança de taxa.</p>
        <p>Você recebe a confirmação por e-mail com o crachá para impressão ou celular.</p>
      </div>
      <!-- Troque o e-mail do action pelo endereço que deve receber as inscrições. -->
      <form class="form" action="mailto:inscricao@fotolivroslatam.com.br" method="post" enctype="text/plain">
        <div class="campo">
          <label for="nome">Nome completo</label>
          <input id="nome" name="nome" type="text" autocomplete="name" required>
        </div>
        <div class="campo">
          <label for="email">E-mail</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="campo">
          <label for="dia">Dia de participação</label>
          <select id="dia" name="dia">
            <option>Quinta, 12 de junho</option>
            <option>Sexta, 13 de junho</option>
            <option>Sábado, 14 de junho</option>
            <option>Domingo, 15 de junho</option>
          </select>
        </div>
        <div>
          <button class="btn btn-inverso" type="submit">Enviar inscrição</button>
        </div>
      </form>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Feira de Fotolivros Latino-Americana — realização Coletiva Chão, São Paulo.</p>
    <ul>
      <li><a href="#programacao">Programação</a></li>
      <li><a href="#local">Local</a></li>
      <li><a href="mailto:inscricao@fotolivroslatam.com.br">inscricao@fotolivroslatam.com.br</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
  {
    id: 'negocio-local',
    name: 'Negócio local',
    summary: 'Página de negócio de bairro com serviços, horários, contato e endereço com link para o Maps.',
    tags: ['servicos', 'horarios', 'endereco'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Padaria e Cafeteria Grão Fino — Vila Madalena, São Paulo</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#F3F6F2;
  --olaria-surface:#FFFFFF;
  --olaria-text:#16241B;
  --olaria-muted:#55685C;
  --olaria-border:#D7E2D8;
  --olaria-primary:#1E6B4F;
  --olaria-on-primary:#FFFFFF;
  --olaria-accent:#B4551F;
  --olaria-font:"DM Sans",system-ui,sans-serif;
  --olaria-radius:10px;
  --olaria-max:76rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.6}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.18;margin:0}
p{margin:0}
ul,ol,dl{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-surface);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:700;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text)}
.marca span{color:var(--olaria-primary)}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary)}
.btn{display:inline-block;padding:.8rem 1.4rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:500;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.93}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3rem,7vw,5rem);scroll-margin-top:5rem}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:center}
@media(min-width:62rem){.hero-in{grid-template-columns:1fr 1fr}}
.hero h1{font-size:clamp(2rem,4.6vw,3.1rem);font-weight:700;letter-spacing:-.01em}
.hero-lider{margin-top:1.25rem;font-size:clamp(1.05rem,1.5vw,1.1875rem);color:var(--olaria-muted);max-width:44ch}
.hero-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem}
.nota{margin-top:1rem;font-size:.9375rem;color:var(--olaria-muted)}
.hero-figura{border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);overflow:hidden}
.cabeca h2{font-size:clamp(1.7rem,3.4vw,2.4rem)}
.cabeca p{margin-top:.75rem;color:var(--olaria-muted);max-width:56ch}
.tabela{margin-top:clamp(2rem,4vw,3rem);border-top:1px solid var(--olaria-border)}
.tabela > div{display:grid;gap:.35rem;padding-block:1.25rem;border-bottom:1px solid var(--olaria-border)}
@media(min-width:48rem){.tabela > div{grid-template-columns:1fr 1.4fr auto;gap:1.5rem;align-items:baseline}}
.tabela dt{font-weight:500;font-size:1.0625rem}
.tabela dd{color:var(--olaria-muted);font-size:.9375rem}
.preco{font-weight:500;color:var(--olaria-accent);white-space:nowrap}
.rodape-informacoes{margin-top:1.5rem;font-size:.9375rem;color:var(--olaria-muted)}
.horarios{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.horarios-in{display:grid;gap:clamp(2rem,5vw,4rem)}
@media(min-width:62rem){.horarios-in{grid-template-columns:1.1fr .9fr}}
.horas{margin-top:1.5rem;border-top:1px solid var(--olaria-border)}
.horas > div{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.5rem 1.5rem;padding-block:.9rem;border-bottom:1px solid var(--olaria-border)}
.horas dt{font-weight:500}
.horas dd{color:var(--olaria-muted);font-variant-numeric:tabular-nums}
.contato-lista{margin-top:1.5rem;display:grid;gap:1rem}
.contato-lista li{border-top:1px solid var(--olaria-border);padding-top:.9rem}
.contato-lista strong{display:block;font-weight:500}
.contato-lista span{display:block;margin-top:.2rem;color:var(--olaria-muted);font-size:.9375rem}
.endereco-in{display:grid;gap:clamp(2rem,5vw,4rem)}
@media(min-width:62rem){.endereco-in{grid-template-columns:1fr 1fr}}
.endereco h2{font-size:clamp(1.7rem,3.4vw,2.4rem)}
.endereco address{margin-top:1.5rem;font-style:normal;font-size:1.0625rem}
.endereco address span{display:block;margin-top:.35rem;color:var(--olaria-muted);font-size:.9375rem}
.chegar{margin-top:2rem;display:grid;gap:1rem}
.chegar li{border-top:1px solid var(--olaria-border);padding-top:.9rem}
.chegar strong{display:block;font-weight:500}
.chegar span{display:block;margin-top:.2rem;color:var(--olaria-muted);font-size:.9375rem}
.mapa{background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem);display:grid;gap:1rem;align-content:start}
.mapa h3{font-size:1.0625rem;font-weight:500}
.mapa p{color:var(--olaria-muted);font-size:.9375rem}
.rodape{padding-block:2.5rem;background:var(--olaria-surface);border-top:1px solid var(--olaria-border)}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes subir{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}
.hero-texto > *{animation:subir .5s ease both}
.hero-texto > *:nth-child(2){animation-delay:.08s}
.hero-texto > *:nth-child(3){animation-delay:.16s}
.hero-figura{animation:subir .5s ease .2s both}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">Padaria <span>Grão Fino</span></a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#horarios">Horários</a></li>
        <li><a href="#endereco">Endereço</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="secao hero" id="inicio">
    <div class="wrap hero-in">
      <div class="hero-texto">
        <h1>Padaria e cafeteria de bairro, na Vila Madalena</h1>
        <p class="hero-lider">Pão de fermentação natural assado duas vezes ao dia, café de torra própria e um balcão para sentar sem pressa. Aberto desde 2011 na mesma esquina.</p>
        <div class="hero-acoes">
          <a class="btn" href="tel:+551133344555">Ligar para a padaria</a>
          <a class="btn btn-fantasma" href="#endereco">Ver o endereço</a>
        </div>
        <p class="nota">Encomendas de cesta pelo WhatsApp até às 18h do dia anterior.</p>
      </div>
      <figure class="hero-figura">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjAwIiByb2xlPSJpbWciPgogIDxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRENFN0REIi8+CiAgPHJlY3QgeD0iMCIgeT0iMzgwIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjIyMCIgZmlsbD0iIzFFNkI0RiIvPgogIDxyZWN0IHg9IjkwIiB5PSIxMjAiIHdpZHRoPSIzMzAiIGhlaWdodD0iMjYwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIvPgogIDxyZWN0IHg9IjQ4MCIgeT0iMTgwIiB3aWR0aD0iMzMwIiBoZWlnaHQ9IjIwMCIgcng9IjgiIGZpbGw9IiNGM0Y2RjIiLz4KICA8Y2lyY2xlIGN4PSI2NDUiIGN5PSIyODAiIHI9IjUyIiBmaWxsPSIjQjQ1NTFGIi8+CiAgPHJlY3QgeD0iMTIwIiB5PSIxNTAiIHdpZHRoPSIyNzAiIGhlaWdodD0iMTQiIHJ4PSI3IiBmaWxsPSIjRDdFMkQ4Ii8+CiAgPHJlY3QgeD0iMTIwIiB5PSIxOTAiIHdpZHRoPSIyMDAgaGVpZ2h0PSIxNCIgcng9IjciIGZpbGw9IiNEN0UyRDgiLz4KICA8cmVjdCB4PSIxMjAiIHk9IjIzMCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNCIgcng9IjciIGZpbGw9IiNEN0UyRDgiLz4KPC9zdmc+" width="900" height="600" alt="Ilustração da fachada da padaria, com balcão claro, faixa verde e letreiro redondo na cor terracota.">
      </figure>
    </div>
  </section>

  <section class="secao" id="servicos">
    <div class="wrap">
      <div class="cabeca">
        <h2>O que a gente faz</h2>
        <p>Lista do que sai do balcão todos os dias. Edite os itens e os preços conforme a sua casa.</p>
      </div>
      <!-- Edite os serviços e os preços abaixo conforme o seu negócio. -->
      <dl class="tabela">
        <div>
          <dt>Pão de fermentação natural</dt>
          <dd>Massa-mãe de 12 anos, assada às 7h e às 16h. Pessoa de 900 g.</dd>
          <dd class="preco">R$ 22,00</dd>
        </div>
        <div>
          <dt>Café coado ou espresso</dt>
          <dd>Torra própria, grão 100% arábica do sul de Minas.</dd>
          <dd class="preco">R$ 8,00 a R$ 12,00</dd>
        </div>
        <div>
          <dt>Pão de queijo</dt>
          <dd>Assado ao longo do dia, com queijo da Serra da Canastra.</dd>
          <dd class="preco">R$ 7,00 a unidade</dd>
        </div>
        <div>
          <dt>Cesta de café da manhã</dt>
          <dd>Para duas a seis pessoas, montada com pão, fruta, geleia e suco. Encomenda com 24h de antecedência.</dd>
          <dd class="preco">a partir de R$ 95,00</dd>
        </div>
        <div>
          <dt>Mesa no balcão</dt>
          <dd>Doze lugares, sem consumo mínimo e sem reserva.</dd>
          <dd class="preco">sem custo</dd>
        </div>
      </dl>
      <p class="rodape-informacoes">Aceitamos Pix, cartão de débito e crédito. Não trabalhamos com vale-refeição.</p>
    </div>
  </section>

  <section class="secao horarios" id="horarios">
    <div class="wrap horarios-in">
      <div>
        <h2>Horários</h2>
        <dl class="horas">
          <div>
            <dt>Segunda a sexta</dt>
            <dd>7h às 19h</dd>
          </div>
          <div>
            <dt>Sábado</dt>
            <dd>7h às 15h</dd>
          </div>
          <div>
            <dt>Domingo</dt>
            <dd>8h às 14h</dd>
          </div>
          <div>
            <dt>Feriado</dt>
            <dd>8h às 13h</dd>
          </div>
        </dl>
      </div>
      <div>
        <h2>Contato</h2>
        <ul class="contato-lista">
          <li>
            <strong>Telefone</strong>
            <span><a href="tel:+551133344555">(11) 3334-4555</a> — pedidos e encomendas</span>
          </li>
          <li>
            <strong>WhatsApp</strong>
            <span><a href="https://wa.me/5511987654321?text=Ol%C3%A1%2C%20quero%20fazer%20uma%20encomenda">(11) 98765-4321</a> — cesta e reserva de mesa</span>
          </li>
          <li>
            <strong>E-mail</strong>
            <span><a href="mailto:contato@graofino.com.br">contato@graofino.com.br</a> — orçamento para eventos</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="secao endereco" id="endereco">
    <div class="wrap endereco-in">
      <div>
        <h2>Endereço</h2>
        <address>
          Rua Girassol, 1.284 — Vila Madalena
          <span>São Paulo, SP — 05433-002. Na esquina com a Rua Harmonia, em frente à praça.</span>
        </address>
        <ul class="chegar">
          <li>
            <strong>Metrô</strong>
            <span>Linha 2 do metrô, estação Sumaré, e sete minutos a pé pela Rua Girassol.</span>
          </li>
          <li>
            <strong>Ônibus</strong>
            <span>Linhas 177H-10 e 875A-10 param a 200 metros, na Rua Harmonia.</span>
          </li>
          <li>
            <strong>Bicicleta e carro</strong>
            <span>Bicicletário na calçada e estacionamento conveniado ao lado, com 20 vagas.</span>
          </li>
          <li>
            <strong>Acessibilidade</strong>
            <span>Entrada sem degrau, banheiro adaptado e mesa rebaixada no balcão.</span>
          </li>
        </ul>
      </div>
      <div class="mapa">
        <h3>Abrir a rota no Google Maps</h3>
        <p>O link abaixo abre o Maps com o endereço da padaria já preenchido. Troque pelo endereço do seu negócio.</p>
        <p><a class="btn" href="https://www.google.com/maps/search/?api=1&amp;query=Rua+Girassol+1284%2C+Vila+Madalena%2C+S%C3%A3o+Paulo">Ver trajeto no Google Maps</a></p>
        <p>Para quem vem de carro, a rua tem mão única no sentido da Rua Harmonia.</p>
      </div>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Padaria e Cafeteria Grão Fino — Rua Girassol, 1.284, Vila Madalena, São Paulo.</p>
    <ul>
      <li><a href="#servicos">Serviços</a></li>
      <li><a href="#horarios">Horários</a></li>
      <li><a href="#endereco">Endereço</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
]
