export const templatesB = [
  {
    id: 'captura',
    name: 'Captura de e-mails',
    summary: 'Para quem escreve uma newsletter: proposta, formulário que chega no seu e-mail e dúvidas respondidas.',
    tags: ['captura', 'newsletter', 'formulario', 'faq'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Carta do Forno: uma carta por semana sobre cerâmica, forno e esmalte. Assine com seu e-mail.">
<title>Carta do Forno — uma carta por semana sobre cerâmica</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,400..700&display=swap" rel="stylesheet">
<style>
:root {
  --olaria-bg: #14110e;
  --olaria-surface: #1e1a16;
  --olaria-text: #f6f1e9;
  --olaria-muted: #a89f94;
  --olaria-border: #6b6055;
  --olaria-primary: #e8621f;
  --olaria-on-primary: #1c0d03;
  --olaria-accent: #f5b942;
  --olaria-font: "Archivo", system-ui, sans-serif;
  --olaria-radius: 10px;
  --olaria-max: 72rem;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--olaria-font);
  background: var(--olaria-bg);
  color: var(--olaria-text);
  line-height: 1.6;
  -webkit-text-size-adjust: 100%;
}

.shell { width: 100%; padding-inline: clamp(1.15rem, 4vw, 2.75rem); }
.inner { max-width: var(--olaria-max); margin-inline: auto; }

h1, h2, h3 { line-height: 1.15; letter-spacing: -0.015em; }

a { color: var(--olaria-primary); }
a:focus-visible,
button:focus-visible,
input:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--olaria-primary);
  outline-offset: 3px;
}

.hero { border-bottom: 1px solid var(--olaria-border); }
.hero .inner {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  padding-block: clamp(3rem, 8vw, 5.5rem);
}
@media (min-width: 62rem) {
  .hero .inner { grid-template-columns: 1.1fr 0.9fr; align-items: start; gap: clamp(3rem, 5vw, 5rem); }
}

.hero h1 { font-size: clamp(2rem, 4.6vw, 3.15rem); font-weight: 700; max-width: 22ch; }
.hero-sub { margin-top: 1.25rem; color: var(--olaria-muted); font-size: clamp(1.02rem, 1.4vw, 1.15rem); max-width: 46ch; }
.hero-nota { margin-top: 1.6rem; color: var(--olaria-muted); font-size: .92rem; }

.form-card {
  background: var(--olaria-surface);
  border: 1px solid var(--olaria-border);
  border-radius: var(--olaria-radius);
  padding: clamp(1.4rem, 3vw, 2rem);
}
.form-titulo { font-size: 1.15rem; font-weight: 700; }
.form-dica { margin-top: .4rem; color: var(--olaria-muted); font-size: .92rem; }
.campo { margin-top: 1.35rem; }
.campo label { display: block; font-size: .88rem; font-weight: 600; margin-bottom: .4rem; }
.campo input {
  width: 100%;
  padding: .8rem .9rem;
  font: inherit;
  font-size: 1rem;
  color: var(--olaria-text);
  background: var(--olaria-bg);
  border: 1px solid var(--olaria-border);
  border-radius: var(--olaria-radius);
}
.campo input::placeholder { color: var(--olaria-muted); }

.btn {
  margin-top: 1.1rem;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .85rem 1.4rem;
  font: inherit;
  font-size: 1rem;
  font-weight: 700;
  color: var(--olaria-on-primary);
  background: var(--olaria-primary);
  border: 1px solid var(--olaria-primary);
  border-radius: var(--olaria-radius);
  cursor: pointer;
  text-decoration: none;
  transition: background-color .18s ease, border-color .18s ease, transform .18s ease;
}
.btn:hover { background: var(--olaria-accent); border-color: var(--olaria-accent); }
.btn:active { transform: translateY(1px); }
@media (min-width: 26rem) { .btn { width: auto; } }

.secao { padding-block: clamp(3rem, 7vw, 5rem); }
.secao-cabeca { max-width: 48ch; }
.secao-cabeca h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
.secao-cabeca p { margin-top: .75rem; color: var(--olaria-muted); }

.entregas-lista { list-style: none; margin-top: clamp(2rem, 4vw, 3rem); border-top: 1px solid var(--olaria-border); }
.entregas-lista li { display: grid; gap: .45rem; padding-block: 1.5rem; border-bottom: 1px solid var(--olaria-border); }
.entregas-lista h3 { font-size: 1.05rem; font-weight: 700; }
.entregas-lista p { color: var(--olaria-muted); }
@media (min-width: 48rem) {
  .entregas-lista li { grid-template-columns: 13rem 1fr; gap: 2.5rem; align-items: start; }
  .entregas-lista li:first-child { grid-template-columns: 1fr; gap: .6rem; }
  .entregas-lista li:first-child h3 { font-size: clamp(1.3rem, 2.6vw, 1.7rem); }
  .entregas-lista li:first-child p { color: var(--olaria-text); font-size: 1.05rem; max-width: 60ch; }
}

.faq { background: var(--olaria-surface); border-block: 1px solid var(--olaria-border); }
.faq-grade { display: grid; gap: clamp(1.5rem, 4vw, 3.5rem); }
@media (min-width: 62rem) { .faq-grade { grid-template-columns: 0.85fr 1.15fr; gap: 4rem; } }
.faq-lista { border-top: 1px solid var(--olaria-border); }
.faq details { border-bottom: 1px solid var(--olaria-border); }
.faq summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.15rem;
  font-weight: 600;
}
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after { content: "+"; color: var(--olaria-accent); font-size: 1.35rem; line-height: 1; }
.faq details[open] summary::after { content: "−"; }
.faq details > p { padding-bottom: 1.25rem; color: var(--olaria-muted); max-width: 62ch; }

.cta { background: var(--olaria-primary); color: var(--olaria-on-primary); }
.cta .inner { display: grid; gap: 1.35rem; align-items: center; padding-block: clamp(2.5rem, 6vw, 4rem); }
@media (min-width: 48rem) { .cta .inner { grid-template-columns: 1fr auto; gap: 2.5rem; } }
.cta h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); }
.cta p { margin-top: .5rem; max-width: 46ch; color: var(--olaria-on-primary); }
.btn-invertido { margin-top: 0; background: var(--olaria-on-primary); border-color: var(--olaria-on-primary); color: var(--olaria-primary); }
.btn-invertido:hover { background: var(--olaria-accent); border-color: var(--olaria-accent); color: var(--olaria-on-primary); }

.rodape .inner {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem 1.5rem;
  justify-content: space-between;
  padding-block: 2.25rem;
  color: var(--olaria-muted);
  font-size: .88rem;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
</head>
<body>
<main>
  <section class="hero" id="assinar">
    <div class="shell"><div class="inner">
      <div>
        <h1>Uma carta por semana sobre cerâmica, forno e esmalte.</h1>
        <p class="hero-sub">Toda quinta eu escrevo sobre uma peça que fiz e o que ela me ensinou. Sem patrocínio escondido, sem curso para vender no meio do texto.</p>
        <p class="hero-nota">A primeira carta sai nesta quinta, às 8h.</p>
      </div>
      <form class="form-card" action="mailto:seu@email.com" method="post" enctype="text/plain">
        <!-- Troque seu@email.com acima pelo endereço que deve receber os e-mails. -->
        <p class="form-titulo">Assinar a carta</p>
        <p class="form-dica">Um e-mail por semana. O link para sair da lista está no fim de cada edição.</p>
        <div class="campo">
          <label for="email">Seu e-mail</label>
          <input id="email" name="E-mail" type="email" placeholder="voce@exemplo.com" autocomplete="email" required>
        </div>
        <button class="btn" type="submit">Quero receber</button>
      </form>
    </div></div>
  </section>

  <section class="secao">
    <div class="shell"><div class="inner">
      <header class="secao-cabeca">
        <h2>O que chega no seu e-mail</h2>
        <p>Três partes, sempre na mesma ordem, para você saber o que vai abrir.</p>
      </header>
      <ul class="entregas-lista">
        <li>
          <h3>A carta de quinta</h3>
          <p>O texto principal: uma peça, o problema que ela deu e o que eu aprendi no caminho. Leitura de dez minutos, com fotos do processo.</p>
        </li>
        <li>
          <h3>Os erros da semana</h3>
          <p>Uma lista curta do que rachou, empenou ou saiu torto no ateliê.</p>
        </li>
        <li>
          <h3>As respostas</h3>
          <p>As dúvidas que chegaram por e-mail na semana anterior, respondidas sem rodeio.</p>
        </li>
      </ul>
    </div></div>
  </section>

  <section class="faq secao">
    <div class="shell"><div class="inner faq-grade">
      <header class="secao-cabeca">
        <h2>Perguntas frequentes</h2>
        <p>Se sobrar dúvida, responda qualquer carta da lista — eu leio todas.</p>
      </header>
      <div class="faq-lista">
        <details>
          <summary>Com que frequência a carta chega?</summary>
          <p>Toda quinta, às 8h. Não existe edição extra no meio da semana e não existe reenvio para quem não abriu.</p>
        </details>
        <details>
          <summary>Vou receber propaganda ou ofertas?</summary>
          <p>Não. Se um dia eu indicar algum produto ou serviço, vai estar escrito "apoio" na primeira linha, antes do texto.</p>
        </details>
        <details>
          <summary>Como faço para sair da lista?</summary>
          <p>O link de saída está no fim de cada carta. Um clique e o endereço é removido, sem pergunta.</p>
        </details>
        <details>
          <summary>O que vocês fazem com o meu e-mail?</summary>
          <p>Ele fica com o serviço de envio que eu uso, apenas para entregar a carta. Não é vendido nem trocado.</p>
        </details>
      </div>
    </div></div>
  </section>

  <section class="cta">
    <div class="shell"><div class="inner">
      <div>
        <h2>Próxima carta: esta quinta.</h2>
        <p>Assine antes das 8h de quinta e a primeira edição chega junto com as outras.</p>
      </div>
      <a class="btn btn-invertido" href="#assinar">Quero receber</a>
    </div></div>
  </section>
</main>
<footer class="rodape">
  <div class="shell"><div class="inner">
    <p>Carta do Forno — página de exemplo.</p>
    <p>Edite os textos e troque o e-mail do formulário.</p>
  </div></div>
</footer>
</body>
</html>`,
  },
  {
    id: 'em-breve',
    name: 'Em breve',
    summary: 'Uma frase, uma contagem regressiva e um formulário de aviso. Para quem ainda vai abrir.',
    tags: ['em-breve', 'contagem', 'formulario', 'minimal'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="O ateliê de cerâmica abre em breve. Deixe seu e-mail e avisamos no dia da abertura.">
<title>Em breve — ateliê de cerâmica</title>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400&display=swap" rel="stylesheet">
<style>
:root {
  --olaria-bg: #f7f3ec;
  --olaria-surface: #fffdf9;
  --olaria-text: #1b1917;
  --olaria-muted: #6a6257;
  --olaria-border: #c9bfaf;
  --olaria-primary: #1b1917;
  --olaria-on-primary: #f7f3ec;
  --olaria-accent: #a8442a;
  --olaria-font: "Newsreader", system-ui, sans-serif;
  --olaria-radius: 10px;
  --olaria-max: 72rem;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--olaria-font);
  background: var(--olaria-bg);
  color: var(--olaria-text);
  line-height: 1.6;
  -webkit-text-size-adjust: 100%;
}

.shell { width: 100%; padding-inline: clamp(1.15rem, 4vw, 2.75rem); }
.inner { max-width: var(--olaria-max); margin-inline: auto; }

h1, h2, h3 { line-height: 1.12; letter-spacing: -0.01em; }

a { color: var(--olaria-accent); }
a:focus-visible,
button:focus-visible,
input:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--olaria-primary);
  outline-offset: 3px;
}

.selo { color: var(--olaria-accent); font-size: .95rem; }

.abertura .inner {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  padding-block: clamp(3.25rem, 9vw, 6.5rem);
}
@media (min-width: 64rem) {
  .abertura .inner { grid-template-columns: 1.05fr 0.95fr; align-items: center; gap: clamp(3rem, 6vw, 5rem); }
}

.abertura h1 { margin-top: 1rem; font-size: clamp(2.15rem, 5.4vw, 3.5rem); font-weight: 600; max-width: 24ch; }
.abertura-texto { margin-top: 1.35rem; color: var(--olaria-muted); font-size: clamp(1.02rem, 1.5vw, 1.18rem); max-width: 44ch; }

.contador-legenda { color: var(--olaria-muted); font-size: .88rem; margin-bottom: .75rem; }
.contador-lista { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--olaria-border); border-bottom: 1px solid var(--olaria-border); }
.contador-celula { padding: 1.1rem .75rem 1.2rem; }
.contador-celula + .contador-celula { border-left: 1px solid var(--olaria-border); }
.contador-celula dd {
  font-size: clamp(1.85rem, 5.5vw, 2.6rem);
  font-weight: 600;
  line-height: 1;
  color: var(--olaria-accent);
  font-variant-numeric: tabular-nums;
}
.contador-celula dt { margin-top: .45rem; font-size: .8rem; color: var(--olaria-muted); }
.contador-aviso {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 600;
  color: var(--olaria-accent);
  border-top: 1px solid var(--olaria-border);
  border-bottom: 1px solid var(--olaria-border);
  padding-block: 1.1rem;
}

.form-avise { margin-top: 1.9rem; max-width: 30rem; }
.form-avise label { display: block; font-size: .88rem; font-weight: 600; margin-bottom: .35rem; }
.form-linha { display: grid; gap: .9rem; }
@media (min-width: 30rem) { .form-linha { grid-template-columns: 1fr auto; align-items: end; } }
.form-linha input {
  width: 100%;
  padding: .7rem .3rem;
  font: inherit;
  font-size: 1.05rem;
  color: var(--olaria-text);
  background: transparent;
  border: 0;
  border-bottom: 1.5px solid var(--olaria-text);
  border-radius: 0;
}
.form-linha input::placeholder { color: var(--olaria-muted); }
.form-nota { margin-top: .95rem; color: var(--olaria-muted); font-size: .88rem; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .8rem 1.6rem;
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  color: var(--olaria-on-primary);
  background: var(--olaria-primary);
  border: 1px solid var(--olaria-primary);
  border-radius: var(--olaria-radius);
  cursor: pointer;
  text-decoration: none;
  transition: background-color .18s ease, border-color .18s ease, transform .18s ease;
}
.btn:hover { background: var(--olaria-accent); border-color: var(--olaria-accent); }
.btn:active { transform: translateY(1px); }

.secao { padding-block: clamp(3rem, 7vw, 5rem); border-top: 1px solid var(--olaria-border); }
.secao h2 { font-size: clamp(1.4rem, 2.6vw, 1.75rem); font-weight: 600; }
.depois-lista { list-style: none; margin-top: clamp(1.75rem, 4vw, 2.5rem); display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }
@media (min-width: 48rem) { .depois-lista { grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); } }
.depois-lista h3 { font-size: clamp(1.2rem, 2.2vw, 1.5rem); font-weight: 600; }
.depois-lista p { margin-top: .6rem; color: var(--olaria-muted); max-width: 42ch; }

.rodape { border-top: 1px solid var(--olaria-border); }
.rodape .inner {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem 1.5rem;
  justify-content: space-between;
  padding-block: 2.25rem;
  color: var(--olaria-muted);
  font-size: .88rem;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
</head>
<body>
<main>
  <section class="abertura">
    <div class="shell"><div class="inner">
      <div>
        <p class="selo">Ateliê de cerâmica</p>
        <h1>Estamos queimando a primeira fornada.</h1>
        <p class="abertura-texto">O ateliê abre para vendas e aulas em breve. Deixe seu e-mail: mandamos uma única mensagem no dia da abertura, com a data e o endereço.</p>
        <form class="form-avise" action="mailto:seu@email.com" method="post" enctype="text/plain">
          <!-- Troque seu@email.com acima pelo endereço que deve receber os avisos. -->
          <label for="email-aviso">Seu e-mail</label>
          <div class="form-linha">
            <input id="email-aviso" name="E-mail" type="email" placeholder="voce@exemplo.com" autocomplete="email" required>
            <button class="btn" type="submit">Me avise</button>
          </div>
          <p class="form-nota">Só mandamos um e-mail: no dia da abertura.</p>
        </form>
      </div>
      <div class="contador" id="contador">
        <p class="contador-legenda">Abertura em</p>
        <p class="contador-aviso" id="contador-aviso" hidden>Chegou o dia.</p>
        <dl class="contador-lista" id="contador-lista">
          <div class="contador-celula">
            <dt>dias</dt>
            <dd id="c-dias">0</dd>
          </div>
          <div class="contador-celula">
            <dt>horas</dt>
            <dd id="c-horas">0</dd>
          </div>
          <div class="contador-celula">
            <dt>min</dt>
            <dd id="c-minutos">0</dd>
          </div>
          <div class="contador-celula">
            <dt>seg</dt>
            <dd id="c-segundos">0</dd>
          </div>
        </dl>
      </div>
    </div></div>
  </section>

  <section class="secao">
    <div class="shell"><div class="inner">
      <h2>No dia da abertura</h2>
      <ul class="depois-lista">
        <li>
          <h3>Peças à venda</h3>
          <p>Canecas, tigelas e pratos para o uso diário. A primeira fornada é pequena e nenhuma peça repete.</p>
        </li>
        <li>
          <h3>Aulas de modelagem</h3>
          <p>Turmas de quatro pessoas, duas vezes por semana, no próprio ateliê. Todo o material está incluído.</p>
        </li>
      </ul>
    </div></div>
  </section>
</main>
<footer class="rodape">
  <div class="shell"><div class="inner">
    <p>Página de exemplo — edite os textos e a data de abertura.</p>
    <p>Feito com Olaria.</p>
  </div></div>
</footer>
<script>
  // TROQUE A DATA E A HORA ABAIXO pela data de abertura.
  // Formato: ano-mês-diaThora:minuto, por exemplo 2027-04-08T10:00:00 (10h da manhã).
  var alvo = new Date('2027-04-08T10:00:00');

  function doisDigitos(numero) {
    if (numero < 10) {
      return '0' + numero;
    }
    return '' + numero;
  }

  function atualizarContador() {
    var agora = new Date().getTime();
    var falta = alvo.getTime() - agora;
    var aviso = document.getElementById('contador-aviso');
    var lista = document.getElementById('contador-lista');
    if (falta <= 0) {
      aviso.hidden = false;
      lista.hidden = true;
      return;
    }
    var total = Math.floor(falta / 1000);
    var dias = Math.floor(total / 86400);
    var horas = Math.floor((total % 86400) / 3600);
    var minutos = Math.floor((total % 3600) / 60);
    var segundos = total % 60;
    document.getElementById('c-dias').textContent = '' + dias;
    document.getElementById('c-horas').textContent = doisDigitos(horas);
    document.getElementById('c-minutos').textContent = doisDigitos(minutos);
    document.getElementById('c-segundos').textContent = doisDigitos(segundos);
  }

  atualizarContador();
  setInterval(atualizarContador, 1000);
</script>
</body>
</html>`,
  },
  {
    id: 'links',
    name: 'Página de links',
    summary: 'Avatar, nome e uma lista de botões para os seus endereços. Para bio de redes sociais.',
    tags: ['links', 'bio', 'catalogo', 'redes-sociais'],
    build: () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Marina Vieira — cerâmica utilitária queimada a lenha. Links para loja, aulas e redes.">
<title>Marina Vieira — cerâmica utilitária</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&display=swap" rel="stylesheet">
<style>
:root {
  --olaria-bg: #0f2b29;
  --olaria-surface: #173b37;
  --olaria-text: #f5efe2;
  --olaria-muted: #a6c4bb;
  --olaria-border: #4a8a80;
  --olaria-primary: #f0b429;
  --olaria-on-primary: #10241f;
  --olaria-accent: #7ecfbd;
  --olaria-font: "Bricolage Grotesque", system-ui, sans-serif;
  --olaria-radius: 10px;
  --olaria-max: 72rem;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--olaria-font);
  background: var(--olaria-bg);
  color: var(--olaria-text);
  line-height: 1.6;
  -webkit-text-size-adjust: 100%;
}

.shell { width: 100%; padding-inline: clamp(1.15rem, 4vw, 2.75rem); }
.inner { max-width: var(--olaria-max); margin-inline: auto; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--olaria-primary);
  outline-offset: 3px;
}

.pagina { padding-block: clamp(2.5rem, 8vw, 5rem); }

.cartao {
  max-width: 36rem;
  margin-inline: auto;
  background: var(--olaria-surface);
  border: 1px solid var(--olaria-border);
  border-radius: calc(var(--olaria-radius) * 2);
  padding: clamp(1.75rem, 5vw, 2.75rem);
}

.perfil { text-align: center; }
.avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-inline: auto;
  display: grid;
  place-items: center;
  background: var(--olaria-primary);
  color: var(--olaria-on-primary);
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1;
}
.perfil h1 { margin-top: 1.25rem; font-size: clamp(1.6rem, 5vw, 2.1rem); letter-spacing: -0.015em; }
.usuario { margin-top: .3rem; color: var(--olaria-accent); font-size: .98rem; }
.bio { margin-top: 1rem; color: var(--olaria-muted); max-width: 40ch; margin-inline: auto; }

.links ul { list-style: none; margin-top: 1.85rem; display: grid; gap: .7rem; }
.links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: .95rem 1.15rem;
  background: var(--olaria-bg);
  border: 1px solid var(--olaria-border);
  border-radius: var(--olaria-radius);
  color: var(--olaria-text);
  text-decoration: none;
  transition: border-color .18s ease, transform .18s ease, background-color .18s ease;
}
.links a:hover { border-color: var(--olaria-primary); transform: translateY(-2px); }
.links a strong { display: block; font-size: 1.02rem; font-weight: 600; }
.links a small { display: block; margin-top: .15rem; font-size: .85rem; color: var(--olaria-muted); }
.links a.destaque { background: var(--olaria-primary); border-color: var(--olaria-primary); color: var(--olaria-on-primary); }
.links a.destaque small { color: var(--olaria-on-primary); }

.redes {
  margin-top: 1.85rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--olaria-border);
  display: flex;
  justify-content: center;
  gap: .4rem;
}
.redes a {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 1px solid transparent;
  color: var(--olaria-muted);
  transition: color .18s ease, border-color .18s ease;
}
.redes a:hover { color: var(--olaria-accent); border-color: var(--olaria-border); }

.rodape { border-top: 1px solid var(--olaria-border); }
.rodape .inner {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem 1.5rem;
  justify-content: space-between;
  padding-block: 1.85rem;
  color: var(--olaria-muted);
  font-size: .85rem;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
</head>
<body>
<main class="pagina">
  <div class="shell"><div class="inner">
    <article class="cartao">
      <header class="perfil">
        <p class="avatar" aria-hidden="true">M</p>
        <h1>Marina Vieira</h1>
        <p class="usuario">@marinavieira</p>
        <p class="bio">Cerâmica utilitária queimada a lenha. Peças para o dia a dia e aulas de modelagem em São Paulo.</p>
      </header>

      <section class="links" aria-labelledby="tit-links">
        <h2 id="tit-links" class="sr-only">Links</h2>
        <ul>
          <li>
            <a class="destaque" href="https://wa.me/5511987654321" target="_blank" rel="noopener">
              <span><strong>Encomendar pelo WhatsApp</strong><small>Peças sob encomenda, prazo de três semanas</small></span>
              <span class="sr-only">(abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a href="https://www.elo7.com.br/marinavieira" target="_blank" rel="noopener">
              <span><strong>Loja no Elo7</strong><small>Pronta entrega, com envio para todo o Brasil</small></span>
              <span class="sr-only">(abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/marinavieira/" target="_blank" rel="noopener">
              <span><strong>Instagram</strong><small>Fotos das peças saindo do forno</small></span>
              <span class="sr-only">(abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@marinavieira" target="_blank" rel="noopener">
              <span><strong>Canal no YouTube</strong><small>Vídeos de modelagem e de queima</small></span>
              <span class="sr-only">(abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a href="https://cal.com/marinavieira" target="_blank" rel="noopener">
              <span><strong>Agenda de aulas</strong><small>Turmas de sábado e horários disponíveis</small></span>
              <span class="sr-only">(abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a href="https://marinavieira.com.br" target="_blank" rel="noopener">
              <span><strong>Site e portfólio</strong><small>O processo todo, do barro à peça final</small></span>
              <span class="sr-only">(abre em nova aba)</span>
            </a>
          </li>
        </ul>
      </section>

      <section class="redes" aria-labelledby="tit-redes">
        <h2 id="tit-redes" class="sr-only">Redes sociais</h2>
        <a href="mailto:marina@exemplo.com">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <rect x="2.5" y="5" width="19" height="14" rx="3"></rect>
            <path d="M3.8 7.2 12 13l8.2-5.8"></path>
          </svg>
          <span class="sr-only">E-mail</span>
        </a>
        <a href="https://www.instagram.com/marinavieira/" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none"></circle>
          </svg>
          <span class="sr-only">Instagram (abre em nova aba)</span>
        </a>
        <a href="https://wa.me/5511987654321" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M20.5 11.7c0 4-3.6 7.3-8 7.3-1 0-2-.2-2.9-.5L4.6 20l1.3-3.5c-.9-1.2-1.4-2.6-1.4-4.1 0-4 3.6-7.3 8-7.3s8.1 3.3 8.1 7.6Z"></path>
            <circle cx="9.2" cy="11.7" r=".85" fill="currentColor" stroke="none"></circle>
            <circle cx="12.5" cy="11.7" r=".85" fill="currentColor" stroke="none"></circle>
            <circle cx="15.8" cy="11.7" r=".85" fill="currentColor" stroke="none"></circle>
          </svg>
          <span class="sr-only">WhatsApp (abre em nova aba)</span>
        </a>
        <a href="https://www.youtube.com/@marinavieira" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <rect x="2.5" y="5.5" width="19" height="13" rx="4"></rect>
            <path d="M10.4 9.3 15.8 12l-5.4 2.7Z" fill="currentColor" stroke="none"></path>
          </svg>
          <span class="sr-only">YouTube (abre em nova aba)</span>
        </a>
      </section>
    </article>
  </div></div>
</main>
<footer class="rodape">
  <div class="shell"><div class="inner">
    <p>Página de exemplo — troque os links acima pelos seus.</p>
    <p>Feito com Olaria.</p>
  </div></div>
</footer>
</body>
</html>`,
  },
]
