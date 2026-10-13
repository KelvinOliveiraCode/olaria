export const templatesC = [
  {
    id: 'curriculo',
    name: 'Currículo',
    summary: 'Currículo e portfólio profissional com linha do tempo de experiência, formação, habilidades e contato.',
    tags: ['curriculo', 'experiencia', 'contato'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Currículo de Helena Braga, arquiteta e urbanista com dez anos de experiência em projetos residenciais e reabilitação de edifícios.">
<title>Helena Braga — arquiteta e urbanista, currículo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#FBFAF8;
  --olaria-surface:#FFFFFF;
  --olaria-text:#1F2328;
  --olaria-muted:#5B6470;
  --olaria-border:#E2E0DB;
  --olaria-primary:#2F5D50;
  --olaria-on-primary:#FFFFFF;
  --olaria-accent:#A4552B;
  --olaria-font:"Source Serif 4",Georgia,"Times New Roman",serif;
  --olaria-radius:4px;
  --olaria-max:68rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.6}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.2;margin:0}
p{margin:0}
ul,ol,dl{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.faixa{width:100%;scroll-margin-top:5rem}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-surface);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:600;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text)}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary);text-decoration:underline}
.btn{display:inline-block;padding:.75rem 1.35rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:600;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.92}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3rem,7vw,5rem)}
.secao.media{border-top:1px solid var(--olaria-border)}
.secao.fundo{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.secao h2{font-size:clamp(1.55rem,3vw,2.15rem);max-width:26ch}
.secao h2 + p{margin-top:1rem;color:var(--olaria-muted);max-width:64ch}
.hero{padding-block:clamp(3rem,7vw,5.5rem)}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:center}
@media(min-width:60rem){.hero-in{grid-template-columns:1.15fr .85fr}}
.hero h1{font-size:clamp(2.4rem,6vw,4rem);font-weight:600;letter-spacing:-.02em}
.cargo{margin-top:.75rem;font-size:1.1875rem;color:var(--olaria-primary);font-weight:600}
.resumo{margin-top:1.5rem;color:var(--olaria-muted);max-width:52ch}
.hero-contatos{margin-top:1.75rem;display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;font-size:.9375rem;color:var(--olaria-muted)}
.hero-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem;align-items:center}
.retrato{border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);overflow:hidden}
.sobre-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:60rem){.sobre-in{grid-template-columns:1.35fr .65fr}}
.sobre-texto p{color:var(--olaria-muted)}
.sobre-texto p + p{margin-top:1rem}
.como-trabalho{border-top:2px solid var(--olaria-border);padding-top:1.25rem;display:grid;gap:1.25rem}
.como-trabalho dt{font-weight:600;font-size:.9375rem}
.como-trabalho dd{margin-top:.25rem;color:var(--olaria-muted);font-size:.9375rem}
.linha{margin-top:2.25rem;border-left:1px solid var(--olaria-border);display:grid;gap:clamp(2rem,4vw,2.75rem)}
.linha li{position:relative;padding-left:clamp(1.5rem,3vw,2.25rem)}
.linha li::before{content:"";position:absolute;left:0;top:.45rem;width:.5rem;height:.5rem;border-radius:50%;background:var(--olaria-primary)}
.periodo{font-size:.875rem;color:var(--olaria-muted);font-variant-numeric:tabular-nums}
.linha h3{margin-top:.35rem;font-size:1.1875rem}
.empresa{margin-top:.15rem;font-size:.9375rem;color:var(--olaria-accent);font-weight:600}
.linha p.desc{margin-top:.75rem;color:var(--olaria-muted);font-size:.9375rem;max-width:62ch}
.formacao-in{display:grid;gap:clamp(1.5rem,4vw,3rem);margin-top:2rem}
@media(min-width:52rem){.formacao-in{grid-template-columns:1.1fr .9fr}}
.formacao-in li{border-top:1px solid var(--olaria-border);padding-top:1rem}
.formacao-in h3{font-size:1.0625rem}
.formacao-in p{margin-top:.4rem;color:var(--olaria-muted);font-size:.9375rem}
.hab-grupos{margin-top:2rem;display:grid;gap:clamp(1.5rem,3vw,2.5rem)}
@media(min-width:56rem){.hab-grupos{grid-template-columns:repeat(3,1fr)}}
.hab-grupos h3{font-size:.9375rem;color:var(--olaria-muted);font-weight:600}
.hab-grupos ul{margin-top:.75rem;display:grid;gap:.4rem;font-size:.9375rem}
.hab-grupos li{padding-left:1rem;position:relative}
.hab-grupos li::before{content:"";position:absolute;left:0;top:.6em;width:.375rem;height:1px;background:var(--olaria-accent)}
.contato-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:60rem){.contato-in{grid-template-columns:1fr 1fr}}
.dados{display:grid;gap:1rem;font-size:.9375rem;align-content:start}
.dados dt{font-weight:600;font-size:.875rem;color:var(--olaria-muted)}
.dados dd{margin-top:.2rem}
.form{display:grid;gap:1rem;background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem)}
.campo{display:grid;gap:.4rem}
.campo label{font-size:.875rem;font-weight:600}
.campo input,.campo textarea{font-family:var(--olaria-font);font-size:1rem;color:var(--olaria-text);background:var(--olaria-bg);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:.7rem .85rem}
.campo textarea{min-height:7rem;resize:vertical}
.rodape{border-top:1px solid var(--olaria-border);padding-block:2.25rem}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes subir{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}
.hero-texto > *{animation:subir .5s ease both}
.hero-texto > *:nth-child(2){animation-delay:.07s}
.hero-texto > *:nth-child(3){animation-delay:.14s}
.hero-texto > *:nth-child(4){animation-delay:.21s}
.hero-texto > *:nth-child(5){animation-delay:.28s}
.retrato{animation:subir .5s ease .15s both}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">Helena Braga</a>
    <nav aria-label="Seções do currículo">
      <ul class="menu">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#experiencia">Experiência</a></li>
        <li><a href="#formacao">Formação</a></li>
        <li><a href="#habilidades">Habilidades</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="faixa secao hero" id="inicio">
    <div class="wrap hero-in">
      <div class="hero-texto">
        <h1>Helena Braga</h1>
        <p class="cargo">Arquiteta e urbanista</p>
        <p class="resumo">Dez anos entre escritório de projeto e obra. Trabalho com reabilitação de edifícios ocupados e projeto residencial, do estudo preliminar ao detalhamento executivo.</p>
        <ul class="hero-contatos">
          <li>Campinas, São Paulo</li>
          <li><a href="mailto:helena.braga@exemplo.com.br">helena.braga@exemplo.com.br</a></li>
          <li><a href="tel:+5519998765432">(19) 99876-5432</a></li>
        </ul>
        <div class="hero-acoes">
          <a class="btn" href="mailto:helena.braga@exemplo.com.br?subject=Contato%20pelo%20curr%C3%ADculo">Falar comigo</a>
          <a class="btn btn-fantasma" href="#experiencia">Ver experiência</a>
        </div>
      </div>
      <figure class="retrato">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgOTAwIiByb2xlPSJpbWciPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iOTAwIiBmaWxsPSIjRURFQUUzIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzE4IiByPSIxNDAiIGZpbGw9IiMxRjNBNUYiLz48cGF0aCBkPSJNMTcwIDkwMGMwLTE1NSAxMDMtMjYwIDIzMC0yNjBzMjMwIDEwNSAyMzAgMjYweiIgZmlsbD0iIzJFNEM3MyIvPjxyZWN0IHg9IjU2NiIgeT0iMTE4IiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzk2NTAyRiIvPjxjaXJjbGUgY3g9IjY0MSIgY3k9IjE5MyIgcj0iNDIiIGZpbGw9IiNFREVBRTMiLz48cmVjdCB4PSI4MCIgeT0iMTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRENEOENGIi8+PHJlY3QgeD0iODAiIHk9IjE0NiIgd2lkdGg9IjgwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRENEOENGIi8+PC9zdmc+" width="800" height="900" alt="Composição geométrica de exemplo no lugar da sua foto de perfil: círculo e bloco em verde sobre fundo claro, com um quadrado terracota.">
      </figure>
    </div>
  </section>

  <section class="faixa secao fundo" id="sobre">
    <div class="wrap">
      <h2>Sobre</h2>
      <div class="sobre-in">
        <div class="sobre-texto">
          <p>Comecei no escritório Prado &amp; Lima, em Campinas, desenhando detalhe de esquadria e aprendendo que obra é feita de gente antes de ser feita de desenho. Em 2018 mudei para Santos, onde passei três anos reabilitando edifícios ocupados no centro histórico, com laudo de patologia, projeto de reforço e acompanhamento semanal do canteiro.</p>
          <p>Hoje coordeno uma equipe de quatro pessoas no Estúdio Térreo, em São Paulo. Assino projetos residenciais de 80 a 400 metros quadrados e consultorias de reabilitação. Prefiro começar pelo que já existe no terreno: luz, vento, árvore, vizinho. Gosto de obra que respeita o desenho até o último dia.</p>
        </div>
        <dl class="como-trabalho">
          <div>
            <dt>Como eu trabalho</dt>
            <dd>Estudo preliminar, anteprojeto e executivo em ciclos curtos, com aprovação por escrito em cada etapa.</dd>
          </div>
          <div>
            <dt>Onde eu atuo</dt>
            <dd>São Paulo, Campinas, Santos e Baixada Santista. Para outras cidades, avalio o deslocamento.</dd>
          </div>
          <div>
            <dt>Disponibilidade</dt>
            <dd>Novos projetos a partir de janeiro. Consultorias pontuais eu encaixo antes.</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <section class="faixa secao media" id="experiencia">
    <div class="wrap">
      <h2>Experiência</h2>
      <p>O que eu fiz, em ordem, do mais recente para o mais antigo. Troque cada item pela sua própria história.</p>
      <ol class="linha">
        <li>
          <p class="periodo">março de 2021 — atual</p>
          <h3>Arquiteta coordenadora</h3>
          <p class="empresa">Estúdio Térreo · São Paulo, SP</p>
          <p class="desc">Coordenação de seis projetos residenciais por ano, do primeiro croqui à entrega das pranchas de execução. Conduzo a relação com o cliente, organizo o cronograma de consultores e reviso cada entrega antes de sair do escritório.</p>
        </li>
        <li>
          <p class="periodo">janeiro de 2018 — fevereiro de 2021</p>
          <h3>Arquiteta projetista</h3>
          <p class="empresa">Fundação Viva Obra · Santos, SP</p>
          <p class="desc">Reabilitação de três edifícios ocupados no centro de Santos, com laudo de patologia, projeto de reforço estrutural e acompanhamento de obra. Aprendi a projetar com o prédio em uso, sem parar a vida de quem morava.</p>
        </li>
        <li>
          <p class="periodo">fevereiro de 2016 — dezembro de 2017</p>
          <h3>Arquiteta júnior</h3>
          <p class="empresa">Escritório Prado &amp; Lima · Campinas, SP</p>
          <p class="desc">Detalhamento de esquadrias, compatibilização de projetos complementares e levantamento de campo para reforma. Foi onde aprendi a ler uma obra antes de desenhá-la.</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="faixa secao fundo" id="formacao">
    <div class="wrap">
      <h2>Formação</h2>
      <ul class="formacao-in">
        <li>
          <h3>Mestrado em Arquitetura e Urbanismo</h3>
          <p>Universidade de São Paulo, 2023. Dissertação sobre reabilitação de edifícios ocupados no litoral paulista, com estudo de três casos em Santos.</p>
        </li>
        <li>
          <h3>Bacharelado em Arquitetura e Urbanismo</h3>
          <p>Universidade Estadual de Campinas, 2015. Trabalho final de curso sobre iluminação natural em habitação de interesse social.</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="faixa secao media" id="habilidades">
    <div class="wrap">
      <h2>Habilidades</h2>
      <p>O que eu sei fazer, em lista simples. Sem estrela e sem porcentagem: quem contrata quer saber o que existe, não o que eu acho de mim.</p>
      <div class="hab-grupos">
        <div>
          <h3>Projeto e obra</h3>
          <ul>
            <li>Estudo preliminar e anteprojeto</li>
            <li>Projeto executivo e detalhamento</li>
            <li>Compatibilização de disciplinas</li>
            <li>Acompanhamento e medição de obra</li>
            <li>Laudo de patologia e viabilidade</li>
          </ul>
        </div>
        <div>
          <h3>Ferramentas</h3>
          <ul>
            <li>Revit e AutoCAD</li>
            <li>SketchUp e Enscape</li>
            <li>QGIS para análise de terreno</li>
            <li>ArchiCAD, nível básico</li>
          </ul>
        </div>
        <div>
          <h3>Normas e prática</h3>
          <ul>
            <li>NBR 9050 de acessibilidade</li>
            <li>NBR 15575 de desempenho</li>
            <li>Planejamento de canteiro</li>
            <li>Inglês avançado, espanhol intermediário</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="faixa secao fundo" id="contato">
    <div class="wrap">
      <h2>Contato</h2>
      <div class="contato-in">
        <dl class="dados">
          <div>
            <dt>E-mail</dt>
            <dd><a href="mailto:helena.braga@exemplo.com.br">helena.braga@exemplo.com.br</a></dd>
          </div>
          <div>
            <dt>Telefone e WhatsApp</dt>
            <dd><a href="tel:+5519998765432">(19) 99876-5432</a></dd>
          </div>
          <div>
            <dt>Onde estou</dt>
            <dd>Campinas, SP — atendimento presencial com hora marcada</dd>
          </div>
          <div>
            <dt>Portfólio completo</dt>
            <dd>Peça o arquivo em PDF por e-mail que eu envio no mesmo dia.</dd>
          </div>
        </dl>
        <!-- Troque o e-mail do action pelo endereço que deve receber as mensagens. -->
        <form class="form" action="mailto:helena.braga@exemplo.com.br" method="post" enctype="text/plain">
          <div class="campo">
            <label for="nome">Seu nome</label>
            <input id="nome" name="nome" type="text" autocomplete="name" required>
          </div>
          <div class="campo">
            <label for="email">Seu e-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="campo">
            <label for="assunto">Assunto</label>
            <input id="assunto" name="assunto" type="text" placeholder="Proposta de projeto, consultoria, vaga" required>
          </div>
          <div class="campo">
            <label for="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" required></textarea>
          </div>
          <div>
            <button class="btn" type="submit">Enviar mensagem</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Helena Braga — arquiteta e urbanista. Campinas, SP.</p>
    <ul>
      <li><a href="#sobre">Sobre</a></li>
      <li><a href="#experiencia">Experiência</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
  {
    id: 'produto',
    name: 'Produto físico',
    summary: 'Página de produto físico com benefício principal em destaque, especificações em tabela e compra por e-mail.',
    tags: ['produto', 'especificacoes', 'compra'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Moedor de café Cônico M2 da Casa Ferrão: cones de aço temperado, trinta pontos de moagem e reparo garantido por cinco anos.">
<title>Moedor Cônico M2 — Casa Ferrão</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#101413;
  --olaria-surface:#17201C;
  --olaria-text:#F2F4F1;
  --olaria-muted:#A7B3AD;
  --olaria-border:#2B3733;
  --olaria-primary:#E8B44A;
  --olaria-on-primary:#1A1408;
  --olaria-accent:#6FBFA8;
  --olaria-font:"Barlow",system-ui,-apple-system,sans-serif;
  --olaria-radius:10px;
  --olaria-max:74rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.6}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.15;margin:0}
p{margin:0}
ul,ol,dl{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.faixa{width:100%;scroll-margin-top:5rem}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-surface);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:700;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text);letter-spacing:.01em}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary);text-decoration:underline}
.btn{display:inline-block;padding:.85rem 1.5rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:700;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.93}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3rem,7vw,5.5rem)}
.secao.fundo{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.secao h2{font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;letter-spacing:-.01em;max-width:24ch}
.secao h2 + p{margin-top:1rem;color:var(--olaria-muted);max-width:60ch}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:center;padding-block:clamp(3rem,7vw,5.5rem)}
@media(min-width:62rem){.hero-in{grid-template-columns:1.05fr .95fr}}
.hero h1{font-size:clamp(2.2rem,5.2vw,3.6rem);font-weight:700;letter-spacing:-.02em}
.proposta{margin-top:1.25rem;font-size:clamp(1.05rem,1.6vw,1.25rem);color:var(--olaria-muted);max-width:46ch}
.preco{margin-top:2rem;display:flex;flex-wrap:wrap;align-items:baseline;gap:.5rem 1rem}
.preco .valor{font-size:clamp(2rem,4vw,2.75rem);font-weight:700;color:var(--olaria-primary);line-height:1}
.preco .parcela{font-size:.9375rem;color:var(--olaria-muted)}
.hero-acoes{margin-top:1.75rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem;align-items:center}
.nota{margin-top:1rem;font-size:.875rem;color:var(--olaria-muted)}
.produto-fig{border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);overflow:hidden}
.destaque{margin-top:clamp(2rem,4vw,3rem);background:var(--olaria-bg);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.75rem,4vw,3rem)}
.destaque h3{font-size:clamp(1.5rem,3vw,2.1rem);font-weight:700;max-width:30ch}
.destaque p{margin-top:1rem;color:var(--olaria-muted);max-width:66ch}
.apoio{margin-top:clamp(1.75rem,3.5vw,2.75rem);display:grid;gap:clamp(1.5rem,3vw,2.5rem)}
@media(min-width:56rem){.apoio{grid-template-columns:1fr 1fr;gap:clamp(1.5rem,3vw,3.5rem)}}
.apoio li{border-top:2px solid var(--olaria-border);padding-top:1.25rem}
.apoio h3{font-size:1.125rem}
.apoio p{margin-top:.6rem;color:var(--olaria-muted);font-size:.9375rem;max-width:48ch}
.tabela{margin-top:clamp(2rem,4vw,3rem);width:100%;border-collapse:collapse;font-size:.9375rem}
.tabela caption{text-align:left;color:var(--olaria-muted);font-size:.875rem;padding-bottom:1rem}
.tabela th,.tabela td{text-align:left;padding:.85rem .75rem;border-bottom:1px solid var(--olaria-border);vertical-align:top}
.tabela thead th{font-size:.8125rem;color:var(--olaria-muted);font-weight:600;white-space:nowrap}
.tabela tbody th{font-weight:500;color:var(--olaria-muted);width:44%}
.fala{margin-top:2.25rem;border-left:3px solid var(--olaria-primary);padding-left:clamp(1.25rem,3vw,2rem)}
.fala p{font-size:clamp(1.15rem,2.4vw,1.6rem);line-height:1.45;max-width:58ch}
.fala cite{display:block;margin-top:1rem;font-style:normal;font-size:.9375rem;color:var(--olaria-muted)}
.compra-in{display:grid;gap:clamp(2rem,5vw,3.5rem);align-items:start}
@media(min-width:60rem){.compra-in{grid-template-columns:1fr 1fr}}
.compra-lista{margin-top:1.5rem;display:grid;gap:1rem;font-size:.9375rem}
.compra-lista li{border-top:1px solid var(--olaria-border);padding-top:.75rem;color:var(--olaria-muted)}
.compra-lista strong{display:block;color:var(--olaria-text);font-weight:600;margin-bottom:.2rem}
.form{display:grid;gap:1rem;background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem)}
.campo{display:grid;gap:.4rem}
.campo label{font-size:.875rem;font-weight:600}
.campo input,.campo textarea{font-family:var(--olaria-font);font-size:1rem;color:var(--olaria-text);background:var(--olaria-bg);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:.7rem .85rem}
.campo textarea{min-height:6rem;resize:vertical}
.rodape{border-top:1px solid var(--olaria-border);padding-block:2.25rem}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes subir{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}
.hero-texto > *{animation:subir .5s ease both}
.hero-texto > *:nth-child(2){animation-delay:.07s}
.hero-texto > *:nth-child(3){animation-delay:.14s}
.hero-texto > *:nth-child(4){animation-delay:.21s}
.produto-fig{animation:subir .5s ease .15s both}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">Casa Ferrão</a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#por-que">Por este</a></li>
        <li><a href="#especificacoes">Especificações</a></li>
        <li><a href="#comprar">Comprar</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="faixa hero" id="inicio">
    <div class="wrap hero-in">
      <div class="hero-texto">
        <h1>Moedor Cônico M2</h1>
        <p class="proposta">Café moído na hora, com o grão que você escolheu. Gire o anel até o ponto que a sua receita pede, sem escorregar no meio do caminho.</p>
        <p class="preco">
          <span class="valor">R$ 690,00</span>
          <span class="parcela">em até 10x de R$ 69,00 sem juros</span>
        </p>
        <div class="hero-acoes">
          <a class="btn" href="#comprar">Quero comprar</a>
          <a class="btn btn-fantasma" href="#especificacoes">Ver especificações</a>
        </div>
        <p class="nota">Envio para todo o Brasil em até três dias úteis. Frete grátis acima de R$ 350,00.</p>
      </div>
      <figure class="produto-fig">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNzAwIiByb2xlPSJpbWciPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNzAwIiBmaWxsPSIjMTcxQzFFIi8+PGVsbGlwc2UgY3g9IjQwMCIgY3k9IjM1MCIgcng9IjI1MCIgcnk9IjI1MCIgZmlsbD0iIzMzM0IzRSIvPjxlbGxpcHNlIGN4PSI0MDAiIGN5PSIzNTAiIHJ4PSIyMDUiIHJ5PSIyMDUiIGZpbGw9IiMyMzJBMkQiLz48ZWxsaXBzZSBjeD0iNDAwIiBjeT0iMzUwIiByeD0iMjA1IiByeT0iMjA1IiBmaWxsPSJub25lIiBzdHJva2U9IiM0QTU1NUIiIHN0cm9rZS13aWR0aD0iOCIvPjxyZWN0IHg9IjYxOCIgeT0iMzI2IiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjQ2IiByeD0iMjMiIGZpbGw9IiNFOEEzM0QiIHRyYW5zZm9ybT0icm90YXRlKC0xNCA2MTggMzI2KSIvPjxjaXJjbGUgY3g9IjYxOCIgY3k9IjM0OSIgcj0iMjciIGZpbGw9IiNGMEMyNEEiLz48cmVjdCB4PSIyNTAiIHk9IjYwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyNiIgcng9IjEzIiBmaWxsPSIjMjMyQTJEIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTQwIiByPSI0NiIgZmlsbD0iIzFFMjQyNyIvPjwvc3ZnPg==" width="900" height="700" alt="Ilustração de exemplo do moedor: corpo circular escuro visto de cima com cabo âmbar na lateral, sobre fundo grafite.">
      </figure>
    </div>
  </section>

  <section class="faixa secao fundo" id="por-que">
    <div class="wrap">
      <h2>Por que este moedor</h2>
      <p>Uma razão principal e duas que sustentam ela. Nada de lista de vantagens genérica.</p>
      <div class="destaque">
        <h3>O ponto de moagem não escorrega no meio do caminho</h3>
        <p>O ajuste é travado por um anel externo rosqueado, não por borracha que cede. Você marca onde quer o expresso, gira com uma mão enquanto a outra segura o porta-filtro, e o ponto continua ali na semana que vem. São trinta cliques por volta, do mais fino para prensa francesa ao mais grosso para moka.</p>
      </div>
      <ul class="apoio">
        <li>
          <h3>Copo de vidro com tampa que veda</h3>
          <p>Guarda até 30 gramas de moído e fecha de verdade. Pode deixar na bancada sem o café perder aroma nem a tampa cair na primeira vez que você move o pote.</p>
        </li>
        <li>
          <h3>Base de silicone que não marca a bancada</h3>
          <p>Uma peça só, encaixada no fundo, que segura o moedor no mármore durante a moagem. Sai para lavar e volta sem presilha para perder.</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="faixa secao" id="especificacoes">
    <div class="wrap">
      <h2>Especificações</h2>
      <table class="tabela">
        <caption>Dados do Moedor Cônico M2. Troque pelas medidas do seu produto.</caption>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Cones de moagem</th>
            <td>Aço temperado, cônicos, 38 mm</td>
          </tr>
          <tr>
            <th scope="row">Pontos de ajuste</th>
            <td>30 por volta, com trava externa a cada 5 cliques</td>
          </tr>
          <tr>
            <th scope="row">Capacidade do copo</th>
            <td>30 g de café moído, com tampa de encaixe</td>
          </tr>
          <tr>
            <th scope="row">Altura total</th>
            <td>21,5 cm com o cabo recolhido</td>
          </tr>
          <tr>
            <th scope="row">Peso</th>
            <td>890 g</td>
          </tr>
          <tr>
            <th scope="row">Material do corpo</th>
            <td>Aço inoxidável escovado e silicone</td>
          </tr>
          <tr>
            <th scope="row">Garantia</th>
            <td>5 anos contra defeito de fabricação, incluindo reparo</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="faixa secao fundo" id="posicionamento">
    <div class="wrap">
      <h2>Quem está por trás</h2>
      <p>A Casa Ferrão conserta moedor desde 1998. Antes de vender o M2, a gente passou dois anos consertando o moedor dos outros e anotando o que quebrava primeiro.</p>
      <blockquote class="fala">
        <p>Se o seu moedor parar de moer por defeito de fabricação, a gente conserta. Se não tiver conserto, a gente troca. Não tem departamento de troca: você escreve para o mesmo e-mail que respondeu quando você comprou.</p>
        <cite>Casa Ferrão — oficina própria em Belo Horizonte desde 1998</cite>
      </blockquote>
    </div>
  </section>

  <section class="faixa secao" id="comprar">
    <div class="wrap compra-in">
      <div>
        <h2>Comprar</h2>
        <p>Pedido por e-mail, com nota fiscal e envio em até três dias úteis. Se preferir tirar dúvida antes, escreva também: respondemos em um dia útil.</p>
        <ul class="compra-lista">
          <li>
            <strong>Formas de pagamento</strong>
            Pix, boleto e cartão em até 10x sem juros.
          </li>
          <li>
            <strong>Troca e devolução</strong>
            Sete dias após a entrega, sem precisar justificar.
          </li>
          <li>
            <strong>Reparo</strong>
            Envie para a oficina em Belo Horizonte com frete pago por nós nos cinco primeiros anos.
          </li>
        </ul>
      </div>
      <!-- Troque o e-mail do action pelo endereço que deve receber os pedidos. -->
      <form class="form" action="mailto:pedidos@casaferrao.com.br" method="post" enctype="text/plain">
        <div class="campo">
          <label for="nome">Seu nome</label>
          <input id="nome" name="nome" type="text" autocomplete="name" required>
        </div>
        <div class="campo">
          <label for="email">Seu e-mail</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="campo">
          <label for="quantidade">Quantidade</label>
          <input id="quantidade" name="quantidade" type="number" min="1" value="1" required>
        </div>
        <div class="campo">
          <label for="mensagem">Endereço de entrega</label>
          <textarea id="mensagem" name="mensagem" required></textarea>
        </div>
        <div>
          <button class="btn" type="submit">Enviar pedido</button>
        </div>
      </form>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Casa Ferrão — oficina e reparo de moedores. Belo Horizonte, MG.</p>
    <ul>
      <li><a href="#por-que">Por este</a></li>
      <li><a href="#especificacoes">Especificações</a></li>
      <li><a href="mailto:pedidos@casaferrao.com.br">pedidos@casaferrao.com.br</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
  {
    id: 'ong',
    name: 'ONG ou projeto social',
    summary: 'Página de projeto social com missão, o que a organização faz, três caminhos reais para ajudar e prestação de contas.',
    tags: ['causa', 'voluntariado', 'transparencia'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Casa Acolhe: projeto social de Belo Horizonte que apoia famílias em situação de rua com acolhimento, documentação e encaminhamento.">
<title>Casa Acolhe — projeto social em Belo Horizonte</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#FDF8F2;
  --olaria-surface:#FFFFFF;
  --olaria-text:#1F1B16;
  --olaria-muted:#6B5F52;
  --olaria-border:#EBDFCF;
  --olaria-primary:#B8431F;
  --olaria-on-primary:#FFFFFF;
  --olaria-accent:#2E6B54;
  --olaria-font:"Karla",system-ui,-apple-system,sans-serif;
  --olaria-radius:14px;
  --olaria-max:68rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.65}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.2;margin:0}
p{margin:0}
ul,ol,dl{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.faixa{width:100%;scroll-margin-top:5rem}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-surface);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:4rem}
.marca{font-weight:700;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text)}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary);text-decoration:underline}
.btn{display:inline-block;padding:.8rem 1.4rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:700;text-decoration:none;border:1px solid var(--olaria-primary);transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.93}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3rem,7vw,5rem)}
.secao.fundo{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.secao h2{font-size:clamp(1.65rem,3.2vw,2.3rem);max-width:28ch}
.secao h2 + p{margin-top:1rem;color:var(--olaria-muted);max-width:60ch}
.missao{padding-block:clamp(3.5rem,9vw,6.5rem)}
.missao-in{display:grid;gap:clamp(2rem,5vw,3.5rem);align-items:center}
@media(min-width:62rem){.missao-in{grid-template-columns:1.15fr .85fr}}
.missao h1{font-size:clamp(2.2rem,5.4vw,3.6rem);font-weight:700;letter-spacing:-.015em;max-width:22ch}
.missao-lider{margin-top:1.5rem;font-size:clamp(1.05rem,1.6vw,1.25rem);color:var(--olaria-muted);max-width:50ch}
.missao-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem}
.missao-fig{border-radius:var(--olaria-radius);overflow:hidden;border:1px solid var(--olaria-border)}
.problema-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:60rem){.problema-in{grid-template-columns:1fr 1fr}}
.problema-in p{color:var(--olaria-muted)}
.problema-in p + p{margin-top:1rem}
.aviso{margin-top:2rem;background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:1.25rem 1.5rem}
.aviso h3{font-size:.9375rem;font-weight:700;color:var(--olaria-text)}
.aviso p{margin-top:.4rem;color:var(--olaria-muted);font-size:.9375rem;max-width:70ch}
.fazemos{margin-top:2rem;display:grid;gap:clamp(1.5rem,3vw,2.5rem)}
@media(min-width:56rem){.fazemos{grid-template-columns:1fr 1fr;gap:clamp(1.5rem,3vw,3.5rem)}}
.fazemos li{border-top:1px solid var(--olaria-border);padding-top:1.25rem}
.fazemos .grande{grid-column:1 / -1;border-top:3px solid var(--olaria-accent);padding-top:1.5rem}
.fazemos h3{font-size:1.25rem}
.fazemos .grande h3{font-size:clamp(1.4rem,2.8vw,1.875rem)}
.fazemos p{margin-top:.6rem;color:var(--olaria-muted);font-size:.9375rem;max-width:58ch}
.fazemos .grande p{font-size:1.0625rem;max-width:66ch}
.fazemos .periodo{display:block;margin-top:.75rem;font-size:.875rem;color:var(--olaria-accent);font-weight:700}
.caminhos{margin-top:2rem;display:grid;gap:clamp(1.5rem,3vw,2.5rem)}
@media(min-width:56rem){.caminhos{grid-template-columns:1fr 1fr;gap:clamp(1.5rem,3vw,3.5rem)}}
.caminhos > li{border-top:1px solid var(--olaria-border);padding-top:1.25rem}
.caminhos .largo{grid-column:1 / -1;border-top:3px solid var(--olaria-primary);padding-top:1.5rem}
.caminhos h3{font-size:1.25rem}
.caminhos .largo h3{font-size:clamp(1.4rem,2.8vw,1.875rem)}
.caminhos p{margin-top:.6rem;color:var(--olaria-muted);font-size:.9375rem;max-width:62ch}
.caminhos .largo p{font-size:1.0625rem;max-width:66ch}
.caminhos .dado{display:block;margin-top:.75rem;font-size:.875rem;color:var(--olaria-text);font-weight:600}
.transp-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:60rem){.transp-in{grid-template-columns:1.1fr .9fr}}
.transp-texto p{color:var(--olaria-muted)}
.transp-texto p + p{margin-top:1rem}
.contas{margin-top:1.5rem;display:grid;gap:1rem}
.contas li{border-top:1px solid var(--olaria-border);padding-top:.9rem}
.contas strong{display:block;font-weight:700;font-size:.9375rem}
.contas span{display:block;margin-top:.25rem;color:var(--olaria-muted);font-size:.9375rem}
.rodape{border-top:1px solid var(--olaria-border);padding-block:2.25rem}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.875rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.875rem}
@keyframes subir{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}
.missao-texto > *{animation:subir .5s ease both}
.missao-texto > *:nth-child(2){animation-delay:.07s}
.missao-texto > *:nth-child(3){animation-delay:.14s}
.missao-fig{animation:subir .5s ease .15s both}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#missao">Casa Acolhe</a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#problema">O problema</a></li>
        <li><a href="#o-que-fazemos">O que fazemos</a></li>
        <li><a href="#como-ajudar">Como ajudar</a></li>
        <li><a href="#transparencia">Transparência</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="faixa missao" id="missao">
    <div class="wrap missao-in">
      <div class="missao-texto">
        <h1>Ninguém deveria dormir na rua por falta de um endereço para receber correspondência</h1>
        <p class="missao-lider">A Casa Acolhe é um projeto de Belo Horizonte que acompanha famílias em situação de rua até que elas tenham documento, endereço e uma rede de gente por perto.</p>
        <div class="missao-acoes">
          <a class="btn" href="#como-ajudar">Quero ajudar</a>
          <a class="btn btn-fantasma" href="#o-que-fazemos">Ver o que fazemos</a>
        </div>
      </div>
      <figure class="missao-fig">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjIwIiByb2xlPSJpbWciPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNjIwIiBmaWxsPSIjRjRFOURBIi8+PGNpcmNsZSBjeD0iMjM1IiBjeT0iMjQ4IiByPSI3NCIgZmlsbD0iI0I1NEExRiIvPjxwYXRoIGQ9Ik0xMjAgNTYwYzAtMTEyIDUyLTE4NiAxMTUtMTg2czExNSA3NCAxMTUgMTg2eiIgZmlsbD0iI0M5NTUyQSIvPjxjaXJjbGUgY3g9IjQ1NSIgY3k9IjIxNiIgcj0iODYiIGZpbGw9IiMyQzZFNDkiLz48cGF0aCBkPSJNMzI1IDU2MGMwLTEyNCA1OC0yMDYgMTMwLTIwNnMxMzAgODIgMTMwIDIwNnoiIGZpbGw9IiMzNTgwNUEiLz48Y2lyY2xlIGN4PSI2ODgiIGN5PSIyNTYiIHI9IjcwIiBmaWxsPSIjOEE2QTNFIi8+PHBhdGggZD0iTTU4NSA1NjBjMC0xMDYgNDYtMTc4IDEwMy0xNzhzMTAzIDcyIDEwMyAxNzh6IiBmaWxsPSIjOUM3QTRCIi8+PHJlY3QgeD0iMTEwIiB5PSI1MTYiIHdpZHRoPSI2OTAiIGhlaWdodD0iNDQiIHJ4PSIyMiIgZmlsbD0iI0U4REFDQSIvPjxyZWN0IHg9IjM3MiIgeT0iNDg2IiB3aWR0aD0iMTY3IiBoZWlnaHQ9IjM1IiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==" width="900" height="620" alt="Ilustração de exemplo: três figuras geométricas em terracota, verde e ocre em volta de uma mesa clara, representando as pessoas atendidas.">
      </figure>
    </div>
  </section>

  <section class="faixa secao fundo" id="problema">
    <div class="wrap">
      <h2>O problema, sem número</h2>
      <div class="problema-in">
        <div>
          <p>Quem vive na rua em Belo Horizonte costuma perder o documento antes de perder a casa. Sem RG não abre conta, não assina contrato, não entra em vaga de trabalho formal e não se inscreve na maioria dos programas habitacionais. A pessoa sai da rua e continua sem endereço para receber carta.</p>
          <p>O segundo obstáculo é mais silencioso: a burocracia pede comprovante de residência para emitir o documento, e o documento para conseguir comprovante de residência. Empata. E enquanto empata, a pessoa dorme onde der.</p>
        </div>
        <div>
          <p>Nós não vamos colocar número nesta página. Número de atendimento sem metodologia clara vira slogan, e quem trabalha na rua sabe que dado mal usado atrai verba e afasta confiança. Se você tem os números do seu próprio trabalho, troque estes parágrafos pelos dados que você pode comprovar, com a data da coleta.</p>
        </div>
      </div>
      <div class="aviso">
        <h3>Nota para quem vai editar esta página</h3>
        <p>Os textos acima são exemplo. Se a sua organização tem números reais de atendimento, coloque aqui com o período exato da coleta e a fonte. Número inventado enfraquece a causa.</p>
      </div>
    </div>
  </section>

  <section class="faixa secao" id="o-que-fazemos">
    <div class="wrap">
      <h2>O que fazemos</h2>
      <p>Quatro frentes de trabalho, com pesos diferentes. A primeira sustenta as outras três.</p>
      <ul class="fazemos">
        <li class="grande">
          <h3>Acompanhamento de rua, duas vezes por semana</h3>
          <p>Uma equipe de quatro pessoas percorre os mesmos pontos da região central de Belo Horizonte nas noites de terça e sábado. Leva água, comida, cobertor e, acima de tudo, caderneta: anota o nome que a pessoa usa, onde costuma dormir, se tem documento, se tem família procurando. O vínculo leva meses e é o que faz o resto funcionar.</p>
          <span class="periodo">Terças e sábados, das 20h à meia-noite</span>
        </li>
        <li>
          <h3>Emissão de documento</h3>
          <p>Pagamento de segunda via de RG e CPF, com agendamento no posto e acompanhamento da pessoa até a retirada.</p>
        </li>
        <li>
          <h3>Endereço postal</h3>
          <p>Usamos o endereço da Casa Acolhe como endereço de correspondência para quem não tem, com conferência semanal da caixa.</p>
        </li>
        <li>
          <h3>Encaminhamento</h3>
          <p>Encaminhamos para vagas de acolhimento institucional, tratamento de dependência e programas habitacionais, e acompanhamos até a pessoa entrar.</p>
        </li>
        <li>
          <h3>Banho e roupa lavada</h3>
          <p>Duas manhãs por semana, com toalha, roupa limpa e uma conversa sem pressa.</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="faixa secao fundo" id="como-ajudar">
    <div class="wrap">
      <h2>Como ajudar</h2>
      <p>Três caminhos reais. Os três são necessários, mas não são iguais em urgência.</p>
      <ul class="caminhos">
        <li class="largo">
          <h3>Doar</h3>
          <p>Doação financeira é o que mantém a equipe na rua nas terças e sábados. Cobrimos transporte, alimentação, água, cobertor e o custo das segundas vias de documento. Doação mensal recorrente vale mais que doação pontual porque permite planejar o mês.</p>
          <span class="dado">Pix: doacao@casaacolhe.org.br — CNPJ 12.345.678/0001-90</span>
        </li>
        <li>
          <h3>Ser voluntário</h3>
          <p>Precisamos de gente para sair na rua com a equipe e para receber doações de roupa e alimento. Há formação de um dia antes da primeira saída.</p>
          <span class="dado">Escreva para voluntario@casaacolhe.org.br</span>
        </li>
        <li>
          <h3>Divulgar</h3>
          <p>Compartilhe a página e fale do projeto no seu trabalho, na sua igreja, no seu grupo de mensagens. É assim que chega doação de roupa e gente disposta a sair na rua.</p>
          <span class="dado">Basta indicar o endereço desta página</span>
        </li>
      </ul>
    </div>
  </section>

  <section class="faixa secao" id="transparencia">
    <div class="wrap">
      <h2>Transparência</h2>
      <div class="transp-in">
        <div class="transp-texto">
          <p>Somos uma associação sem fins lucrativos registrada desde 2016, com diretoria eleita em assembleia anual e contabilidade terceirizada. Publicamos relatório semestral com receita, despesa por categoria e número de atendimentos de rua realizados.</p>
          <p>Nenhum diretor recebe salário. As duas pessoas da equipe fixa são contratadas com carteira assinada e o restante do trabalho é voluntário. Se você quiser conferir um número antes de doar, peça o relatório: mandamos por e-mail no mesmo dia.</p>
        </div>
        <ul class="contas">
          <li>
            <strong>Prestação de contas</strong>
            <span>Relatório semestral com receita e despesa por categoria, enviado por e-mail a quem pedir.</span>
          </li>
          <li>
            <strong>Quem responde pela Casa</strong>
            <span>Diretoria de cinco pessoas, eleita em assembleia, com mandato de dois anos.</span>
          </li>
          <li>
            <strong>Contato para dúvida</strong>
            <span><a href="mailto:transparencia@casaacolhe.org.br">transparencia@casaacolhe.org.br</a> — respondemos em até três dias úteis.</span>
          </li>
          <li>
            <strong>Doação de bens</strong>
            <span>Roupas, alimentos e produtos de higiene são recebidos na sede, com recibo quando pedido.</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Casa Acolhe — associação sem fins lucrativos. Belo Horizonte, MG.</p>
    <ul>
      <li><a href="#o-que-fazemos">O que fazemos</a></li>
      <li><a href="#como-ajudar">Como ajudar</a></li>
      <li><a href="mailto:contato@casaacolhe.org.br">contato@casaacolhe.org.br</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
  {
    id: 'casamento',
    name: 'Casamento ou celebração',
    summary: 'Página de casamento ou celebração com nomes e data, história, programação do dia, local e confirmação de presença.',
    tags: ['celebração', 'programacao', 'presenca'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Mariana e Rafael se casam em 17 de abril de 2027 no Sítio Boa Sina, em São Lourenço da Serra. Confirme sua presença.">
<title>Mariana e Rafael — 17 de abril de 2027</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
:root{
  --olaria-bg:#FCFAF7;
  --olaria-surface:#FFFFFF;
  --olaria-text:#24211D;
  --olaria-muted:#6A6259;
  --olaria-border:#E9E2D8;
  --olaria-primary:#7D4A5C;
  --olaria-on-primary:#FFFFFF;
  --olaria-accent:#4A6B7D;
  --olaria-font:"Cormorant Garamond",Georgia,"Times New Roman",serif;
  --olaria-radius:2px;
  --olaria-max:62rem;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--olaria-bg);color:var(--olaria-text);font-family:var(--olaria-font);line-height:1.65;font-size:1.0625rem}
img{display:block;max-width:100%;height:auto}
h1,h2,h3{line-height:1.15;margin:0;font-weight:600}
p{margin:0}
ul,ol,dl{margin:0;padding:0;list-style:none}
a{color:var(--olaria-primary);text-decoration-thickness:1px;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:3px}
.faixa{width:100%;scroll-margin-top:5rem}
.wrap{width:100%;max-width:var(--olaria-max);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.topo{position:sticky;top:0;z-index:10;background:var(--olaria-surface);border-bottom:1px solid var(--olaria-border)}
.topo-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem 1.5rem;min-height:3.75rem}
.marca{font-weight:600;font-size:1.0625rem;text-decoration:none;color:var(--olaria-text);letter-spacing:.02em}
.menu{display:flex;flex-wrap:wrap;gap:1rem 1.5rem}
.menu a{color:var(--olaria-muted);text-decoration:none;font-size:.9375rem}
.menu a:hover{color:var(--olaria-primary);text-decoration:underline}
.btn{display:inline-block;padding:.7rem 1.5rem;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:600;text-decoration:none;border:1px solid var(--olaria-primary);letter-spacing:.02em;transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px);opacity:.93}
.btn-fantasma{background:transparent;color:var(--olaria-primary)}
.secao{padding-block:clamp(3rem,7vw,5rem)}
.secao.fundo{background:var(--olaria-surface);border-block:1px solid var(--olaria-border)}
.secao h2{font-size:clamp(1.75rem,3.4vw,2.4rem);font-weight:400;letter-spacing:.01em;max-width:26ch}
.secao h2 + p{margin-top:1rem;color:var(--olaria-muted);max-width:58ch}
.hero{padding-block:clamp(3.5rem,9vw,6.5rem)}
.hero-in{display:grid;gap:clamp(2rem,5vw,4rem);align-items:center}
@media(min-width:58rem){.hero-in{grid-template-columns:1.1fr .9fr}}
.hero h1{font-size:clamp(2.75rem,8vw,4.75rem);font-weight:400;letter-spacing:-.01em;line-height:1.05}
.hero h1 span{display:block;font-size:.42em;color:var(--olaria-primary);margin-block:.1em;letter-spacing:.02em}
.data{margin-top:1.75rem;font-size:clamp(1.125rem,2.4vw,1.5rem);color:var(--olaria-accent);letter-spacing:.04em}
.local-hero{margin-top:.4rem;color:var(--olaria-muted)}
.traco{margin-top:2rem;width:4rem;height:1px;background:var(--olaria-border)}
.hero-acoes{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem 1rem}
.nota{margin-top:1.25rem;font-size:.9375rem;color:var(--olaria-muted);max-width:44ch}
.hero-fig{border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);overflow:hidden}
.historia-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:58rem){.historia-in{grid-template-columns:1fr .55fr}}
.historia p{color:var(--olaria-muted)}
.historia p + p{margin-top:1rem}
.destaque-hist{border-top:2px solid var(--olaria-primary);padding-top:1.25rem;align-content:start;display:grid;gap:1.25rem}
.destaque-hist dt{font-weight:600;font-size:.9375rem;color:var(--olaria-muted)}
.destaque-hist dd{font-size:1.0625rem}
.programacao{margin-top:2rem}
.programacao li{display:grid;gap:.25rem 2rem;padding-block:1.15rem;border-bottom:1px solid var(--olaria-border)}
@media(min-width:48rem){.programacao li{grid-template-columns:6.5rem 1fr;align-items:baseline}}
.hora{font-weight:600;color:var(--olaria-accent);font-variant-numeric:tabular-nums;letter-spacing:.02em}
.programacao h3{font-size:1.1875rem;font-weight:600}
.programacao p{margin-top:.3rem;color:var(--olaria-muted);font-size:.9375rem;max-width:52ch}
.local-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:58rem){.local-in{grid-template-columns:1fr 1fr}}
.endereco{font-style:normal;font-size:1.1875rem}
.endereco span{display:block;margin-top:.35rem;font-size:.9375rem;color:var(--olaria-muted)}
.chegar{margin-top:1.75rem;display:grid;gap:1rem}
.chegar li{border-top:1px solid var(--olaria-border);padding-top:.85rem}
.chegar strong{display:block;font-weight:600;font-size:.9375rem}
.chegar span{display:block;margin-top:.2rem;color:var(--olaria-muted);font-size:.9375rem}
.mapa{background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem);display:grid;gap:1rem;align-content:start}
.mapa h3{font-size:1.0625rem;font-weight:600}
.mapa p{color:var(--olaria-muted);font-size:.9375rem}
.presenca-in{display:grid;gap:clamp(2rem,5vw,3.5rem);margin-top:2rem}
@media(min-width:58rem){.presenca-in{grid-template-columns:.95fr 1.05fr}}
.presenca-info p{color:var(--olaria-muted)}
.presenca-info p + p{margin-top:1rem}
.presenca-info ul{margin-top:1.5rem;display:grid;gap:.75rem;font-size:.9375rem}
.presenca-info li{border-top:1px solid var(--olaria-border);padding-top:.75rem}
.presenca-info strong{display:block;font-weight:600}
.presenca-info span{color:var(--olaria-muted)}
.form{display:grid;gap:1rem;background:var(--olaria-bg);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:clamp(1.5rem,3vw,2rem)}
.campo{display:grid;gap:.4rem}
.campo label{font-size:.9375rem;font-weight:600}
.campo input,.campo select,.campo textarea{font-family:var(--olaria-font);font-size:1.0625rem;color:var(--olaria-text);background:var(--olaria-surface);border:1px solid var(--olaria-border);border-radius:var(--olaria-radius);padding:.65rem .8rem}
.campo textarea{min-height:6rem;resize:vertical}
.presentes{margin-top:2rem;display:grid;gap:clamp(1.5rem,3vw,2.5rem)}
@media(min-width:56rem){.presentes{grid-template-columns:1fr 1fr;gap:clamp(1.5rem,3vw,3.5rem)}}
.presentes li{border-top:1px solid var(--olaria-border);padding-top:1.25rem}
.presentes .largo{grid-column:1 / -1;border-top:3px solid var(--olaria-accent);padding-top:1.5rem}
.presentes h3{font-size:1.1875rem}
.presentes .largo h3{font-size:clamp(1.4rem,2.8vw,1.75rem)}
.presentes p{margin-top:.6rem;color:var(--olaria-muted);font-size:.9375rem;max-width:58ch}
.presentes .largo p{font-size:1.0625rem;max-width:66ch}
.rodape{border-top:1px solid var(--olaria-border);padding-block:2.25rem}
.rodape-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;justify-content:space-between;align-items:center}
.rodape p{font-size:.9375rem;color:var(--olaria-muted)}
.rodape ul{display:flex;flex-wrap:wrap;gap:1.25rem;font-size:.9375rem}
@keyframes subir{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}
.hero-texto > *{animation:subir .5s ease both}
.hero-texto > *:nth-child(2){animation-delay:.08s}
.hero-texto > *:nth-child(3){animation-delay:.16s}
.hero-texto > *:nth-child(4){animation-delay:.24s}
.hero-fig{animation:subir .5s ease .2s both}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
</style>
</head>
<body>
<header class="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio">Mariana &amp; Rafael</a>
    <nav aria-label="Seções da página">
      <ul class="menu">
        <li><a href="#historia">A história</a></li>
        <li><a href="#programacao">Programação</a></li>
        <li><a href="#local">Local</a></li>
        <li><a href="#presenca">Presença</a></li>
        <li><a href="#presentes">Presentes</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>
  <section class="faixa hero" id="inicio">
    <div class="wrap hero-in">
      <div class="hero-texto">
        <h1>Mariana<span>&amp;</span>Rafael</h1>
        <p class="data">17 de abril de 2027</p>
        <p class="local-hero">Sítio Boa Sina · São Lourenço da Serra, São Paulo</p>
        <div class="traco" aria-hidden="true"></div>
        <div class="hero-acoes">
          <a class="btn" href="#presenca">Confirmar presença</a>
          <a class="btn btn-fantasma" href="#programacao">Ver a programação</a>
        </div>
        <p class="nota">Confirme até 28 de fevereiro de 2027. É o que nos ajuda a contar certinho as cadeiras e o prato de cada um.</p>
      </div>
      <figure class="hero-fig">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjIwIiByb2xlPSJpbWciPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNjIwIiBmaWxsPSIjRjZGMUU4Ii8+PHBhdGggZD0iTTQ1MCA1NzBDNDUwIDQwMCA0MzIgMjY4IDM4MiAxNTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRFNkU1RCIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNDQ2IDQzMEMzNzYgNDEwIDMyMiAzNTYgMzEyIDI5MkMzODggMzAyIDQ0MiAzNTYgNDQ2IDQzMFoiIGZpbGw9IiM2RThFNzciLz48cGF0aCBkPSJNNDU2IDM0NEM1MjQgMzIyIDU3OCAyNjggNTkwIDIwNEM1MTYgMjE0IDQ2MiAyNjggNDU2IDM0NFoiIGZpbGw9IiM1RjdGNjkiLz48Y2lyY2xlIGN4PSIzODIiIGN5PSIxNDYiIHI9IjI4IiBmaWxsPSIjOTY2MDNGIi8+PGNpcmNsZSBjeD0iMzUwIiBjeT0iMTgwIiByPSIxOSIgZmlsbD0iI0I0ODQ2QSIvPjxjaXJjbGUgY3g9IjQxNCIgY3k9IjE4MiIgcj0iMTkiIGZpbGw9IiNCNDg0NkEiLz48cGF0aCBkPSJNNDUyIDU3MEM0NTIgNDMwIDQ3NiAzMDAgNTI2IDIwNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTY2MDNGIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMDAgNTYwaDMwMCIgc3Ryb2tlPSIjRTZERkQ0IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==" width="900" height="620" alt="Ilustração de exemplo: ramo botânico desenhado com traços finos em verde e bronze sobre fundo marfim, usado como enfeite da página.">
      </figure>
    </div>
  </section>

  <section class="faixa secao fundo" id="historia">
    <div class="wrap">
      <h2>A história</h2>
      <div class="historia-in">
        <div class="historia">
          <p>A gente se conheceu numa fila de banco, em 2019, esperando um atendimento que no fim não aconteceu porque o sistema caiu. Ficamos meia hora conversando sobre fila de banco e rimos muito mais do que a situação merecia.</p>
          <p>Nos quatro anos seguintes vieram a república dividida em Higienópolis, dois gatos, uma mudança para Atibaia e a pandemia no meio. O pedido de casamento foi numa trilha qualquer da Serra da Mantiqueira, com a Mariana de botas e o Rafael sem fôlego.</p>
          <p>Vamos casar no sítio onde passamos os últimos três aniversários de namoro. A cerimônia é à tarde, embaixo da jabuticabeira, e a festa vai até de manhã. Queremos as pessoas que a gente ama no mesmo lugar, nesse dia.</p>
        </div>
        <dl class="destaque-hist">
          <div>
            <dt>Desde</dt>
            <dd>2019</dd>
          </div>
          <div>
            <dt>Noivos</dt>
            <dd>Mariana e Rafael</dd>
          </div>
          <div>
            <dt>Padrinhos</dt>
            <dd>Doze, escolhidos um por um</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <section class="faixa secao" id="programacao">
    <div class="wrap">
      <h2>Programação do dia</h2>
      <p>Os horários abaixo são um exemplo. Ajuste para a programação real da sua celebração, mantendo um item por linha.</p>
      <ol class="programacao">
        <li>
          <p class="hora">15h30</p>
          <div>
            <h3>Recepção dos convidados</h3>
            <p>O portão do sítio abre às 15h30. Tem estacionamento, sombra e café com bolo na varanda para quem chega mais cedo.</p>
          </div>
        </li>
        <li>
          <p class="hora">16h30</p>
          <div>
            <h3>Cerimônia</h3>
            <p>Ao ar livre, embaixo da jabuticabeira. Leve óculos de sol e um casaquinho para o fim da tarde, porque esfria quando o sol baixa.</p>
          </div>
        </li>
        <li>
          <p class="hora">17h30</p>
          <div>
            <h3>Fotos e tempo livre</h3>
            <p>Enquanto a gente tira foto, o sítio é todo seu: rede, balanço, lago e um campo de baixo para as crianças.</p>
          </div>
        </li>
        <li>
          <p class="hora">19h00</p>
          <div>
            <h3>Jantar</h3>
            <p>Servido no salão, em mesas grandes. Tem opção sem glúten e sem lactose, e um prato vegetariano para quem pedir na confirmação.</p>
          </div>
        </li>
        <li>
          <p class="hora">20h30</p>
          <div>
            <h3>Brinde e primeira dança</h3>
            <p>Discurso curto dos pais, brinde com espumante e a primeira dança. Depois a pista abre e não para mais.</p>
          </div>
        </li>
        <li>
          <p class="hora">23h00</p>
          <div>
            <h3>Bolo e doces</h3>
            <p>Mesa de doces liberada, com bolo de três andares cortado na hora.</p>
          </div>
        </li>
        <li>
          <p class="hora">02h00</p>
          <div>
            <h3>Encerramento</h3>
            <p>A festa acaba às 3h. Tem van de volta para São Paulo saindo do portão do sítio, com retorno a combinar no dia.</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="faixa secao fundo" id="local">
    <div class="wrap">
      <h2>O local</h2>
      <div class="local-in">
        <div>
          <address class="endereco">
            Sítio Boa Sina
            <span>Estrada do Meio, km 4 — São Lourenço da Serra, SP</span>
          </address>
          <ul class="chegar">
            <li>
              <strong>De carro</strong>
              <span>68 km de São Paulo, cerca de 1h20 pela Rodovia Régis Bittencourt. Estacionamento no portão do sítio, com 40 vagas.</span>
            </li>
            <li>
              <strong>De ônibus</strong>
              <span>Linha São Lourenço saindo do Terminal Celso Daniel, em Santo Amaro. A parada fica a 2 km do sítio; combinamos traslado de volta, é só avisar na confirmação.</span>
            </li>
            <li>
              <strong>Onde ficar</strong>
              <span>Duas pousadas parceiras a dez minutos do sítio. Peça a lista pelo e-mail do casamento.</span>
            </li>
            <li>
              <strong>Acessibilidade</strong>
              <span>O salão e o banheiro são adaptados. A cerimônia é no gramado, e temos cadeiras sem braço para quem precisar.</span>
            </li>
          </ul>
        </div>
        <div class="mapa">
          <h3>Abrir a rota no Google Maps</h3>
          <p>O link abaixo abre o Maps já com o endereço do sítio. Troque a URL pelo endereço do seu local.</p>
          <p><a class="btn" href="https://www.google.com/maps/search/?api=1&amp;query=S%C3%ADtio+Boa+Sina%2C+Estrada+do+Meio%2C+S%C3%A3o+Louren%C3%A7o+da+Serra%2C+SP">Ver trajeto no Google Maps</a></p>
          <p>Não é permitido dormir no sítio. A van de volta para São Paulo sai às 3h, com parada em Santo Amaro.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="faixa secao" id="presenca">
    <div class="wrap">
      <h2>Confirmação de presença</h2>
      <div class="presenca-in">
        <div class="presenca-info">
          <p>Responda até 28 de fevereiro de 2027. Se não vier, avise também: assim a gente libera o lugar para outro convidado sem constrangimento.</p>
          <p>Cada confirmação é por adulto. Criança até 12 anos vem junto e não precisa de formulário separado.</p>
          <ul>
            <li>
              <strong>Restrição alimentar</strong>
              <span>Escreva no campo de mensagem se você tem alguma. Temos opção sem glúten, sem lactose e vegetariana.</span>
            </li>
            <li>
              <strong>Van de volta</strong>
              <span>Avise na confirmação se você quer lugar na van das 3h.</span>
            </li>
            <li>
              <strong>Dúvida</strong>
              <span>Escreva para <a href="mailto:casamento@marianaerafael.com.br">casamento@marianaerafael.com.br</a> ou chame no WhatsApp (11) 97654-3210.</span>
            </li>
          </ul>
        </div>
        <!-- Troque o e-mail do action pelo endereço que deve receber as confirmações. -->
        <form class="form" action="mailto:casamento@marianaerafael.com.br" method="post" enctype="text/plain">
          <div class="campo">
            <label for="nome">Seu nome completo</label>
            <input id="nome" name="nome" type="text" autocomplete="name" required>
          </div>
          <div class="campo">
            <label for="email">Seu e-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="campo">
            <label for="vai">Você vai ao casamento?</label>
            <select id="vai" name="vai">
              <option>Sim, com prazer</option>
              <option>Não, dessa vez</option>
            </select>
          </div>
          <div class="campo">
            <label for="acompanhantes">Quantos adultos vêm com você</label>
            <input id="acompanhantes" name="acompanhantes" type="number" min="0" max="4" value="0">
          </div>
          <div class="campo">
            <label for="mensagem">Mensagem, restrição alimentar e se quer lugar na van</label>
            <textarea id="mensagem" name="mensagem"></textarea>
          </div>
          <div>
            <button class="btn" type="submit">Enviar confirmação</button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <section class="faixa secao fundo" id="presentes">
    <div class="wrap">
      <h2>Lista de presentes</h2>
      <p>A gente não quer pote de vidro. Se você quiser presentear, tem três caminhos, e nenhum deles é obrigatório.</p>
      <ul class="presentes">
        <li class="largo">
          <h3>Sua presença é o presente</h3>
          <p>A gente vai casar num sítio, com as pessoas que a gente gosta, num dia que a gente escolheu. Não tem nada nessa lista que valha mais do que você estar lá. Se ainda assim quiser dar algo, os caminhos abaixo existem para facilitar.</p>
        </li>
        <li>
          <h3>Lista em loja</h3>
          <p>Você pode acessar a nossa lista em uma loja de casamento online. Escreva para <a href="mailto:casamento@marianaerafael.com.br">casamento@marianaerafael.com.br</a> que a gente manda o link.</p>
        </li>
        <li>
          <h3>Lua de mel e casa nova</h3>
          <p>Vamos passar dez dias na Chapada Diamantina e estamos montando a casa em Atibaia. O valor é você quem escolhe, pelo Pix ou pelo link da lista de cotas.</p>
        </li>
      </ul>
    </div>
  </section>
</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <p>Mariana &amp; Rafael — 17 de abril de 2027 · Sítio Boa Sina, Atibaia.</p>
    <ul>
      <li><a href="#historia">A história</a></li>
      <li><a href="#local">Local</a></li>
      <li><a href="mailto:casamento@marianaerafael.com.br">casamento@marianaerafael.com.br</a></li>
    </ul>
  </div>
</footer>
</body>
</html>`,
  },
]
