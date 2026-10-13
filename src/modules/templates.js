// Modelos: agrega as duas levas e oferece a página em branco.

import { templatesA } from './templates-a.js'
import { templatesB } from './templates-b.js'
import { templatesC } from './templates-c.js'

export const templates = [...templatesA, ...templatesB, ...templatesC]

export function getTemplate(id) {
  return templates.find((t) => t.id === id) || null
}

export function blankPage() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Minha página</title>
<style>
:root{
  --olaria-bg:#0c0c0e;
  --olaria-surface:#141416;
  --olaria-text:#f5f5f5;
  --olaria-muted:#a3a3ad;
  --olaria-border:#26262c;
  --olaria-primary:#ffb000;
  --olaria-on-primary:#1c1400;
  --olaria-accent:#ffb000;
  --olaria-font:system-ui,"Segoe UI",sans-serif;
  --olaria-radius:10px;
  --olaria-max:72rem;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--olaria-font);background:var(--olaria-bg);color:var(--olaria-text);line-height:1.5}
.wrap{width:100%;max-width:var(--olaria-max);margin:0 auto;padding:0 24px}
a{color:var(--olaria-primary)}
:focus-visible{outline:2px solid var(--olaria-primary);outline-offset:2px}
header.site{padding:18px 0;border-bottom:1px solid var(--olaria-border)}
nav.site{display:flex;gap:22px;align-items:center;flex-wrap:wrap}
nav.site strong{font-size:1.05rem}
section.hero{padding:96px 0 72px}
h1{font-size:clamp(2rem,5vw,3.2rem);line-height:1.1;margin-bottom:16px;max-width:20ch}
.hero p{color:var(--olaria-muted);font-size:1.15rem;max-width:56ch;margin-bottom:26px}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:13px 24px;border-radius:var(--olaria-radius);background:var(--olaria-primary);color:var(--olaria-on-primary);font-weight:650;text-decoration:none}
.btn:hover{filter:brightness(1.08)}
.btn.ghost{background:transparent;color:var(--olaria-text);border:1px solid var(--olaria-border)}
#secao{padding:24px 0 88px}
#secao h2{font-size:1.6rem;margin-bottom:12px}
#secao p{color:var(--olaria-muted);max-width:62ch}
footer.site{padding:36px 0;border-top:1px solid var(--olaria-border);color:var(--olaria-muted);font-size:.9rem}
@media (prefers-reduced-motion:reduce){.btn{transition:none}}
</style>
</head>
<body>
<header class="site"><nav class="wrap site" aria-label="Menu"><strong>Sua marca</strong><a href="#inicio">Início</a><a href="#secao">Seção</a></nav></header>
<main>
<section class="hero" id="inicio"><div class="wrap"><h1>O título da sua página</h1><p>Explique em uma ou duas frases o que você oferece e para quem.</p><div class="hero-actions"><a class="btn" href="#secao">Ação principal</a><a class="btn ghost" href="#secao">Ver mais</a></div></div></section>
<section id="secao"><div class="wrap"><h2>Nova seção</h2><p>Use a aba Inserir para montar esta parte da página.</p></div></section>
</main>
<footer class="site"><div class="wrap">Sua marca — todos os direitos reservados.</div></footer>
</body>
</html>`
}
