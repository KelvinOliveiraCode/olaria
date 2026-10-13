/* ============================================================
   Olaria — motor de animação.
   Este arquivo é injetado dentro das páginas do usuário
   (blocos marcados data-olaria="anim"). Funciona sozinho,
   sem o app. Nada de loop infinito: tudo dispara uma vez
   quando o elemento entra na tela ou por hover do usuário.
   ============================================================ */
(function () {
  'use strict';
  if (window.__olariaAnim) return;
  window.__olariaAnim = true;

  var doc = document;
  var root = doc.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var CSS = [
    '[data-olaria-anim]{transition:opacity .75s ease,transform .75s cubic-bezier(.22,.61,.36,1),filter .75s ease,box-shadow .25s ease}',
    'html.oa-js [data-olaria-anim]:not(.oa-in){opacity:0}',
    'html.oa-js [data-olaria-anim="fade-up"]:not(.oa-in){transform:translateY(28px)}',
    'html.oa-js [data-olaria-anim="fade-down"]:not(.oa-in){transform:translateY(-28px)}',
    'html.oa-js [data-olaria-anim="fade-left"]:not(.oa-in){transform:translateX(36px)}',
    'html.oa-js [data-olaria-anim="fade-right"]:not(.oa-in){transform:translateX(-36px)}',
    'html.oa-js [data-olaria-anim="zoom-in"]:not(.oa-in){transform:scale(.92)}',
    'html.oa-js [data-olaria-anim="blur-in"]:not(.oa-in){filter:blur(10px)}',
    'html.oa-js [data-olaria-anim="reveal"]:not(.oa-in){transform:translateY(14px) scale(.975)}',
    'html.oa-reduce [data-olaria-anim]{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}',
    '[data-olaria-anim="hover-lift"]{transition:transform .22s ease,box-shadow .22s ease}',
    '[data-olaria-anim="hover-lift"]:hover{transform:translateY(-4px);box-shadow:0 14px 28px rgba(0,0,0,.22)}',
    '[data-olaria-anim="hover-grow"]{transition:transform .22s ease}',
    '[data-olaria-anim="hover-grow"]:hover{transform:scale(1.035)}',
    '[data-olaria-anim="hover-underline"]{position:relative}',
    '[data-olaria-anim="hover-underline"]::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:2px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .25s ease}',
    '[data-olaria-anim="hover-underline"]:hover::after{transform:scaleX(1)}',
    '[data-olaria-anim="parallax"],[data-olaria-anim="parallax-slow"],[data-olaria-anim="parallax-fast"]{will-change:transform}',
    '[data-olaria-anim="progress-bar"]{position:fixed;top:0;left:0;height:4px;width:0;background:var(--olaria-primary,#ffb000);z-index:2147483000;border-radius:0 2px 2px 0}'
  ].join('\n');

  function boot() {
    // Documento repintado pelo editor já pode vir com o estilo pronto
    // (ele foi serializado junto): não duplicar.
    var existing = doc.querySelector('style[data-olaria="anim-css"]');
    if (existing && existing.textContent.indexOf('oa-in') >= 0) {
      root.classList.add('oa-js');
    } else {
      var style = doc.createElement('style');
      style.setAttribute('data-olaria', 'anim-css');
      style.textContent = CSS;
      (doc.head || doc.body).appendChild(style);
      root.classList.add('oa-js');
    }
    if (reduce) {
      root.classList.add('oa-reduce');
      return;
    }
    var io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('oa-in');
                io.unobserve(entry.target);
              });
            },
            { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
          )
        : null;

    var counters = [];
    var co =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                runCounter(entry.target);
                co.unobserve(entry.target);
              });
            },
            { threshold: 0.4 }
          )
        : null;

    function runCounter(el) {
      var target = parseFloat(el.getAttribute('data-olaria-count') || '0');
      var prefix = el.getAttribute('data-olaria-prefix') || '';
      var suffix = el.getAttribute('data-olaria-suffix') || '';
      var dur = parseFloat(el.getAttribute('data-olaria-duration') || '1200');
      var decimals = (String(el.getAttribute('data-olaria-count') || '').split('.')[1] || '').length;
      var fmt;
      try {
        fmt = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      } catch (e) {
        fmt = { format: function (n) { return String(n); } };
      }
      if (reduce || !isFinite(target) || target === 0) {
        el.textContent = prefix + fmt.format(target) + suffix;
        return;
      }
      var t0 = null;
      var concluido = false;
      // Em janela de segundo plano (ou WebView sem render) o rAF não roda:
      // o fallback garante o valor final se a animação não concluir.
      var fallback = window.setTimeout(function () {
        if (!concluido) el.textContent = prefix + fmt.format(target) + suffix;
      }, dur + 900);
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + fmt.format(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else {
          concluido = true;
          window.clearTimeout(fallback);
        }
      }
      requestAnimationFrame(step);
    }

    var speed = { 'parallax-slow': 46, parallax: 92, 'parallax-fast': 150 };
    var parallaxEls = [];
    var ticking = false;

    function applyParallax() {
      ticking = false;
      var vh = window.innerHeight || 1;
      for (var i = 0; i < parallaxEls.length; i++) {
        var el = parallaxEls[i];
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (p * (speed[el.getAttribute('data-olaria-anim')] || 92)).toFixed(1) + 'px,0)';
      }
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    }

    var bars = [];
    function applyBars() {
      var h = doc.documentElement;
      var max = (h.scrollHeight || 0) - window.innerHeight;
      var p = max > 0 ? (window.pageYOffset || h.scrollTop || 0) / max : 0;
      for (var i = 0; i < bars.length; i++) bars[i].style.width = (p * 100).toFixed(2) + '%';
    }
    var barTicking = false;
    function onScrollBar() {
      if (!barTicking) {
        barTicking = true;
        requestAnimationFrame(function () {
          barTicking = false;
          applyBars();
        });
      }
    }

    function register(el) {
      var v = el.getAttribute('data-olaria-anim');
      if (!v) return;
      // Re-registro (o elemento trocou de animação): sai das listas
      // anteriores antes de entrar na nova.
      parallaxEls = parallaxEls.filter(function (x) { return x !== el });
      bars = bars.filter(function (x) { return x !== el });
      counters = counters.filter(function (x) { return x !== el });
      if (v === 'counter') {
        counters.push(el);
        if (co) co.observe(el);
        else runCounter(el);
        return;
      }
      if (v === 'progress-bar') {
        el.classList.add('oa-in');
        bars.push(el);
        applyBars();
        return;
      }
      if (v === 'parallax' || v === 'parallax-slow' || v === 'parallax-fast') {
        el.classList.add('oa-in');
        parallaxEls.push(el);
        applyParallax();
        return;
      }
      if (v === 'hover-lift' || v === 'hover-grow' || v === 'hover-underline') {
        el.classList.add('oa-in');
        return;
      }
      if (io) io.observe(el);
      else el.classList.add('oa-in');
    }

    var nodes = doc.querySelectorAll('[data-olaria-anim]');
    for (var i = 0; i < nodes.length; i++) register(nodes[i]);

    /* Rede de segurança. O IntersectionObserver não dispara em algumas
       situações reais: aba em segundo plano, janela minimizada, alguns
       WebViews e na impressão. Sem isso o elemento ficaria invisível para
       sempre. A rede registra quem ainda não foi e revela o que está
       dentro da tela — a transição continua valendo, então a animação
       de entrada acontece igual. */
    function finishIfVisible(el) {
      var vh = window.innerHeight || 1;
      var r = el.getBoundingClientRect();
      if (!(r.width > 0 && r.top < vh * 0.94 && r.bottom > 0)) return false;
      el.classList.add('oa-in');
      // Contador e parallax têm observadores próprios que podem não
      // disparar (aba em segundo plano, WebView): resolvem aqui.
      var a = el.getAttribute('data-olaria-anim');
      if (a === 'counter') runCounter(el);
      if (a === 'parallax' || a === 'parallax-slow' || a === 'parallax-fast') applyParallax();
      return true;
    }

    function revealInView() {
      var list = doc.querySelectorAll('[data-olaria-anim]');
      for (var k = 0; k < list.length; k++) {
        var el = list[k];
        if (!el.__oaReg) {
          el.__oaReg = true;
          register(el);
        }
        finishIfVisible(el);
      }
    }
    window.setTimeout(revealInView, 250);
    window.setTimeout(revealInView, 1400);
    doc.addEventListener('visibilitychange', function () {
      if (!doc.hidden) revealInView();
    });
    window.addEventListener('load', function () {
      window.setTimeout(revealInView, 120);
    });

    if (parallaxEls.length) window.addEventListener('scroll', onScroll, { passive: true });
    if (bars.length) window.addEventListener('scroll', onScrollBar, { passive: true });
    window.addEventListener('resize', function () {
      applyParallax();
      applyBars();
    });

    // O editor adiciona animações sem recarregar a página.
    doc.addEventListener('olaria:anim', function (e) {
      var el = e.target;
      if (el && el.getAttribute && el.getAttribute('data-olaria-anim')) {
        if (!el.__oaReg) {
          el.__oaReg = true;
          register(el);
        } else {
          // A animação do elemento mudou: re-registra no tipo novo.
          register(el);
        }
        // Recém-animado: se está na tela, resolve já (os observadores
        // podem não disparar em aba de segundo plano ou WebView).
        finishIfVisible(el);
      }
    });
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
