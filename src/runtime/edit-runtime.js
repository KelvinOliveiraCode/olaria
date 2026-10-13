/* ============================================================
   Olaria — runtime de edição.
   Este arquivo é injetado no iframe de pré-visualização (bloco
   marcado data-olaria="runtime") e REMOVIDO antes de salvar.
   Fala com o app por postMessage. Não depende de bibliotecas.
   ============================================================ */
(function () {
  'use strict';
  if (window.__olariaRT) return;
  window.__olariaRT = true;

  var PARENT = window.parent;
  var editMode = true;
  var selected = null;
  var hoverEl = null;
  var overlay = null;
  var label = null;
  var dropLine = null;
  var handles = [];
  var editingText = false;

  var TEXT_TAGS = ['H1','H2','H3','H4','H5','H6','P','A','BUTTON','SPAN','LI','BLOCKQUOTE','FIGCAPTION','TD','TH','LABEL','STRONG','EM','SMALL','LEGEND','DIV'];

  function post(msg) {
    try {
      msg.src = 'olaria-runtime';
      PARENT.postMessage(msg, '*');
    } catch (e) {}
  }

  /* ---------------- posição e identidade ---------------- */

  function shortName(el) {
    var s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      var c = el.className.trim().split(/\s+/)[0];
      if (c) s += '.' + c;
    }
    return s;
  }

  function pathOf(el) {
    var path = [];
    var node = el;
    while (node && node !== document.body) {
      var parent = node.parentElement;
      if (!parent) break;
      path.unshift(Array.prototype.indexOf.call(parent.children, node));
      node = parent;
    }
    return path;
  }

  function elByPath(path) {
    var node = document.body;
    for (var i = 0; i < path.length; i++) {
      if (!node.children || !node.children[path[i]]) return null;
      node = node.children[path[i]];
    }
    return node === document.body ? null : node;
  }

  function trailOf(el) {
    var t = [];
    var n = el;
    while (n && n.nodeType === 1 && n !== document.documentElement) {
      t.unshift(shortName(n));
      n = n.parentElement;
    }
    return t.slice(-6);
  }

  function canEditText(el) {
    if (!el || !el.tagName) return false;
    if (TEXT_TAGS.indexOf(el.tagName) >= 0 && el.children.length === 0) return true;
    if (TEXT_TAGS.indexOf(el.tagName) >= 0 && (el.textContent || '').trim()) return true;
    return false;
  }

  function textTarget(el) {
    if (canEditText(el)) return el;
    var kids = el.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,span,li,blockquote,figcaption,label,strong,em');
    for (var i = 0; i < kids.length; i++) {
      if (kids[i].children.length === 0 && (kids[i].textContent || '').trim()) return kids[i];
    }
    return el;
  }

  function describe(el) {
    if (!el) return null;
    var cs = getComputedStyle(el);
    var info = {
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      classes:
        typeof el.className === 'string' && el.className.trim()
          ? el.className.trim().split(/\s+/).filter(Boolean)
          : [],
      selector: shortName(el),
      text: (el.textContent || '').trim().slice(0, 120),
      href: el.getAttribute('href') || '',
      target: el.getAttribute('target') || '',
      download: el.hasAttribute('download'),
      src: el.getAttribute('src') || '',
      alt: el.getAttribute('alt') || '',
      anim: el.getAttribute('data-olaria-anim') || '',
      position: cs.position,
      hasChildren: el.children.length > 0,
      canText: canEditText(el),
      path: pathOf(el),
      trail: trailOf(el),
      rect: (function () {
        var r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      })(),
    };
    return info;
  }

  /* ---------------- marcação visual ---------------- */

  function ensureChrome() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.setAttribute('data-olaria-ignore', '');
    overlay.style.cssText =
      'position:fixed;pointer-events:none;z-index:2147483640;border:2px solid #ffb000;border-radius:2px;display:none;';
    label = document.createElement('div');
    label.setAttribute('data-olaria-ignore', '');
    label.style.cssText =
      'position:fixed;pointer-events:none;z-index:2147483641;background:#ffb000;color:#1c1400;font:600 11px/1.5 ui-monospace,Consolas,monospace;padding:2px 7px;border-radius:4px;display:none;white-space:nowrap;';
    dropLine = document.createElement('div');
    dropLine.setAttribute('data-olaria-ignore', '');
    dropLine.style.cssText =
      'position:fixed;pointer-events:none;z-index:2147483642;height:3px;background:#ffb000;border-radius:2px;display:none;box-shadow:0 0 0 1px rgba(0,0,0,.4);';
    // Alças de redimensionar: filhos do overlay, acompanham o contorno.
    handles = [];
    var DIRS = ['nw','n','ne','e','se','s','sw','w'];
    var base = 'position:absolute;width:11px;height:11px;background:#0b0d10;border:2px solid #ffb000;border-radius:2px;pointer-events:auto;';
    for (var i = 0; i < DIRS.length; i++) {
      var h = document.createElement('div');
      h.setAttribute('data-olaria-ignore', '');
      h.setAttribute('data-olaria-handle', DIRS[i]);
      var d = DIRS[i];
      var css = base;
      if (d.indexOf('n') >= 0) css += 'top:-6px;';
      if (d.indexOf('s') >= 0) css += 'bottom:-6px;';
      if (d.indexOf('w') >= 0) css += 'left:-6px;';
      if (d.indexOf('e') >= 0) css += 'right:-6px;';
      if (d === 'n' || d === 's') css += 'left:calc(50% - 5px);';
      if (d === 'w' || d === 'e') css += 'top:calc(50% - 5px);';
      if (d === 'nw' || d === 'se') css += 'cursor:nwse-resize;';
      if (d === 'ne' || d === 'sw') css += 'cursor:nesw-resize;';
      if (d === 'n' || d === 's') css += 'cursor:ns-resize;';
      if (d === 'e' || d === 'w') css += 'cursor:ew-resize;';
      h.style.cssText = css;
      handles.push(h);
      overlay.appendChild(h);
    }
    document.documentElement.appendChild(overlay);
    document.documentElement.appendChild(label);
    document.documentElement.appendChild(dropLine);
  }

  function placeOverlay() {
    if (!overlay || !selected) return;
    var r = selected.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) {
      overlay.style.display = 'none';
      label.style.display = 'none';
      return;
    }
    overlay.style.display = 'block';
    overlay.style.top = r.top + 'px';
    overlay.style.left = r.left + 'px';
    overlay.style.width = r.width + 'px';
    overlay.style.height = r.height + 'px';
    label.style.display = 'block';
    label.textContent = shortName(selected) + '  ' + Math.round(r.width) + '×' + Math.round(r.height);
    label.style.top = Math.max(2, r.top - 22) + 'px';
    label.style.left = Math.max(2, r.left) + 'px';
  }

  function placeHover() {
    if (!overlay || !hoverEl || hoverEl === selected || !editMode || dragging || resizing) return;
    var r = hoverEl.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    overlay.style.display = 'block';
    overlay.style.top = r.top + 'px';
    overlay.style.left = r.left + 'px';
    overlay.style.width = r.width + 'px';
    overlay.style.height = r.height + 'px';
    overlay.style.borderColor = 'rgba(255,176,0,.45)';
    if (label) label.style.display = 'none';
  }

  function clearOverlay() {
    if (overlay) overlay.style.display = 'none';
    if (label) label.style.display = 'none';
  }

  function showSelectedChrome() {
    if (!overlay) return;
    overlay.style.borderColor = '#ffb000';
    placeOverlay();
  }

  /* ---------------- seleção ---------------- */

  function pick(el) {
    while (el && el !== document.body) {
      if (el.nodeType === 1 && !el.hasAttribute('data-olaria-ignore')) return el;
      el = el.parentNode;
    }
    return null;
  }

  function select(el, quiet) {
    if (!el || el === document.documentElement || el === document.body) {
      deselect();
      return;
    }
    selected = el;
    hoverEl = null;
    ensureChrome();
    showSelectedChrome();
    if (!quiet) post({ type: 'selected', info: describe(el) });
  }

  function deselect() {
    selected = null;
    clearOverlay();
    post({ type: 'deselected' });
  }

  /* ---------------- mutação ---------------- */

  function afterMutate(reason) {
    post({ type: 'mutated', reason: reason || 'edit' });
    if (selected && selected.isConnected) post({ type: 'selected', info: describe(selected) });
    placeOverlay();
  }

  /* ---------------- comandos do app ---------------- */

  function insertHtml(html, where, path) {
    var target = path ? elByPath(path) : null;
    var tmp = document.createElement('div');
    tmp.innerHTML = String(html || '').trim();
    var nodes = [];
    while (tmp.firstChild) nodes.push(tmp.removeChild(tmp.firstChild));

    var host = null;
    var appendToHost = false;
    if (!target || where === 'end') {
      host = document.body;
      appendToHost = true;
    } else if (where === 'endOfSection') {
      var sec = target.closest
        ? target.closest('section,header,footer,main,aside,div')
        : null;
      host = sec || document.body;
      appendToHost = true;
    } else {
      host = target.parentElement || document.body;
    }

    var firstEl = null;
    if (appendToHost) {
      for (var i = 0; i < nodes.length; i++) {
        host.appendChild(nodes[i]);
        if (!firstEl && nodes[i].nodeType === 1) firstEl = nodes[i];
      }
    } else {
      var ref = target.nextSibling;
      for (var j = 0; j < nodes.length; j++) {
        host.insertBefore(nodes[j], ref);
        if (!firstEl && nodes[j].nodeType === 1) firstEl = nodes[j];
      }
    }
    if (firstEl) select(firstEl);
    afterMutate('insert');
  }

  function moveSibling(dir) {
    if (!selected) return;
    var el = selected;
    if (dir === 'up' && el.previousElementSibling) {
      el.parentElement.insertBefore(el, el.previousElementSibling);
    } else if (dir === 'down' && el.nextElementSibling) {
      el.parentElement.insertBefore(el, el.nextElementSibling.nextSibling);
    } else {
      return;
    }
    afterMutate('move');
  }

  function setAnim(value) {
    if (!selected) return;
    if (value) {
      selected.setAttribute('data-olaria-anim', value);
      selected.dispatchEvent(new CustomEvent('olaria:anim', { bubbles: true }));
    } else {
      selected.removeAttribute('data-olaria-anim');
    }
    afterMutate('anim');
  }

  /* ---------------- edição de texto no lugar ---------------- */

  function startTextEdit(el) {
    var node = textTarget(el);
    if (!node) return;
    editingText = true;
    var original = node.innerHTML;
    node.setAttribute('contenteditable', 'true');
    node.style.outline = '2px solid #ffb000';
    node.style.outlineOffset = '2px';
    node.focus();
    try {
      var range = document.createRange();
      range.selectNodeContents(node);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}

    function finish(commit) {
      node.removeAttribute('contenteditable');
      node.style.outline = '';
      editingText = false;
      if (commit) afterMutate('text');
      else node.innerHTML = original;
      node.removeEventListener('blur', onBlur);
      node.removeEventListener('keydown', onKey);
    }
    function onBlur() {
      finish(true);
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        finish(false);
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        finish(true);
        node.blur();
      } else if (e.key === 'Enter' && !e.shiftKey && TEXT_TAGS.indexOf(node.tagName) < 0) {
        e.preventDefault();
        finish(true);
      }
    }
    node.addEventListener('blur', onBlur);
    node.addEventListener('keydown', onKey);
  }

  /* ---------------- arrastar (mover / reordenar) ---------------- */

  var drag = null;
  var dragging = false;

  function onPointerDown(e) {
    if (!editMode || editingText || e.button !== 0) return;
    // Alça de redimensionar tem prioridade sobre mover/reordenar.
    var handle = e.target && e.target.getAttribute ? e.target.getAttribute('data-olaria-handle') : null;
    if (handle && selected) {
      startResize(selected, e, handle);
      return;
    }
    var el = pick(e.target);
    drag = { el: el, x: e.clientX, y: e.clientY, moved: false, free: false, grabX: 0, grabY: 0, candidate: null };
    document.addEventListener('pointermove', onPointerMove, true);
    document.addEventListener('pointerup', onPointerUp, true);
  }

  function onPointerMove(e) {
    if (!drag || editingText) return;
    var dx = e.clientX - drag.x;
    var dy = e.clientY - drag.y;
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
    if (!drag.moved) {
      var el = drag.el;
      if (!el) {
        drag = null;
        return;
      }
      drag.moved = true;
      var cs = getComputedStyle(el);
      if (cs.position === 'absolute' || cs.position === 'fixed') {
        drag.free = true;
        var r = el.getBoundingClientRect();
        drag.grabX = drag.x - r.left;
        drag.grabY = drag.y - r.top;
      } else {
        ensureChrome();
        clearOverlay();
      }
      document.body.style.userSelect = 'none';
      dragging = true;
    }
    e.preventDefault();

    if (drag.free) {
      var pageX = e.clientX + (window.pageXOffset || 0);
      var pageY = e.clientY + (window.pageYOffset || 0);
      drag.el.style.left = (pageX - drag.grabX).toFixed(0) + 'px';
      drag.el.style.top = (pageY - drag.grabY).toFixed(0) + 'px';
      placeOverlay();
      return;
    }

    // reordenar: achar o irmão de referência sob o ponteiro
    dropLine.style.display = 'none';
    drag.candidate = null;
    var under = document.elementFromPoint(e.clientX, e.clientY);
    under = pick(under);
    if (!under || under === drag.el || drag.el.contains(under) || under.contains(drag.el)) return;
    if (under.tagName === 'HTML' || under.tagName === 'BODY') return;
    var up = under.parentElement;
    if (!up) return;
    var ref = under;
    while (ref.parentElement && ref.parentElement !== up) ref = ref.parentElement;
    if (ref === drag.el || ref.contains(drag.el) || drag.el.contains(ref)) return;
    var rr = ref.getBoundingClientRect();
    var before = e.clientY < rr.top + rr.height / 2;
    drag.candidate = { parent: up, ref: ref, before: before };
    dropLine.style.display = 'block';
    dropLine.style.left = rr.left + 'px';
    dropLine.style.width = rr.width + 'px';
    dropLine.style.top = (before ? rr.top - 2 : rr.bottom - 1) + 'px';
  }

  /* ---------------- redimensionar (alças) ---------------- */

  var resize = null;
  var resizing = false;

  function startResize(el, ev, dir) {
    // Alças 'w'/'n' precisam de posicionamento para manter o canto oposto.
    // offsetParent é o ancestral posicionado real — calcular contra um
    // ancestral static colocaria o elemento no lugar errado.
    var host = el.offsetParent || document.body;
    var hRect = host.getBoundingClientRect();
    if ((dir.indexOf('w') >= 0 || dir.indexOf('n') >= 0) && getComputedStyle(el).position === 'static') {
      var r0 = el.getBoundingClientRect();
      // Congela o tamanho antes: absoluto com width auto vira shrink-to-fit
      // e o elemento saltaria visualmente.
      el.style.width = Math.round(r0.width) + 'px';
      el.style.height = Math.round(r0.height) + 'px';
      el.style.position = 'absolute';
      el.style.margin = '0';
      el.style.left = Math.round(r0.left - hRect.left) + 'px';
      el.style.top = Math.round(r0.top - hRect.top) + 'px';
    }
    var r = el.getBoundingClientRect();
    resize = {
      el: el,
      dir: dir,
      x0: ev.clientX,
      y0: ev.clientY,
      w0: r.width,
      h0: r.height,
      l0: r.left - hRect.left,
      t0: r.top - hRect.top,
      min: 24,
    };
    document.body.style.userSelect = 'none';
    resizing = true;
    document.addEventListener('pointermove', onResizeMove, true);
    document.addEventListener('pointerup', onResizeUp, true);
    ev.preventDefault();
    ev.stopPropagation();
  }

  function onResizeMove(e) {
    if (!resize) return;
    e.preventDefault();
    var d = resize;
    var el = d.el;
    var dx = e.clientX - d.x0;
    var dy = e.clientY - d.y0;
    var w = d.w0;
    var h = d.h0;
    if (d.dir.indexOf('e') >= 0) w = d.w0 + dx;
    if (d.dir.indexOf('s') >= 0) h = d.h0 + dy;
    if (d.dir.indexOf('w') >= 0) w = d.w0 - dx;
    if (d.dir.indexOf('n') >= 0) h = d.h0 - dy;
    w = Math.max(d.min, w);
    h = Math.max(d.min, h);
    el.style.width = Math.round(w) + 'px';
    el.style.height = Math.round(h) + 'px';
    if (d.dir.indexOf('w') >= 0) el.style.left = Math.round(d.l0 + (d.w0 - w)) + 'px';
    if (d.dir.indexOf('n') >= 0) el.style.top = Math.round(d.t0 + (d.h0 - h)) + 'px';
    placeOverlay();
  }

  function onResizeUp() {
    document.removeEventListener('pointermove', onResizeMove, true);
    document.removeEventListener('pointerup', onResizeUp, true);
    var d = resize;
    resize = null;
    resizing = false;
    document.body.style.userSelect = '';
    if (d) afterMutate('resize');
  }

  function onPointerUp(e) {
    document.removeEventListener('pointermove', onPointerMove, true);
    document.removeEventListener('pointerup', onPointerUp, true);
    var d = drag;
    drag = null;
    if (dragging) dragging = false;
    if (dropLine) dropLine.style.display = 'none';
    document.body.style.userSelect = '';

    if (!d || !d.moved) {
      if (!editMode || editingText) return;
      var el = pick(e.target);
      if (el) select(el);
      else deselect();
      return;
    }

    if (d.free) {
      afterMutate('move');
      return;
    }

    var c = d.candidate;
    if (c && c.parent && c.ref) {
      var el = d.el;
      var sameParent = el.parentElement === c.parent;
      var sameSpot =
        sameParent &&
        ((c.before && c.ref.previousElementSibling === el) ||
          (!c.before && c.ref.nextElementSibling === el));
      if (!sameSpot) {
        if (c.before) c.parent.insertBefore(el, c.ref);
        else c.parent.insertBefore(el, c.ref.nextSibling);
        afterMutate('move');
      }
    }
  }

  /* ---------------- eventos de entrada ---------------- */

  function onClickCapture(e) {
    if (editMode) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    /* Modo visita. O iframe de preview e um srcdoc: a URL base dele e a
       do proprio app. Se qualquer coisa navegasse aqui, abriria o Olaria
       dentro do canvas e a pagina desapareceria. Entao a visita e
       simulada: link com ancora rola dentro da pagina, link externo vai
       para o navegador do sistema (via o app), e TODO o resto — botão,
       formulário, qualquer clique — não navega. */
    var alvo = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (alvo) {
      var href = alvo.getAttribute('href') || '';
      if (href.charAt(0) === '#' && href.length > 1) {
        e.preventDefault();
        var destino = document.getElementById(href.slice(1));
        if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (/^(https?:)?\/\//i.test(href) || href.indexOf('blob:') === 0) {
        e.preventDefault();
        post({ type: 'openExternal', url: alvo.href });
        return;
      }
      if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      e.preventDefault();
      return;
    }
    // Qualquer outro elemento (botão, div, imagem): nada navega no canvas.
    e.preventDefault();
  }

  function onDblClick(e) {
    if (!editMode || editingText) return;
    var el = pick(e.target);
    if (el && (el === selected || (selected && selected.contains(el)))) {
      e.preventDefault();
      e.stopPropagation();
      startTextEdit(selected || el);
    }
  }

  function onMouseOver(e) {
    if (!editMode || editingText || dragging) return;
    var el = pick(e.target);
    if (el && el !== hoverEl) {
      hoverEl = el;
      if (el !== selected) placeHover();
    }
  }

  function onMouseOut(e) {
    if (!editMode) return;
    if (!e.relatedTarget) {
      hoverEl = null;
      if (selected) showSelectedChrome();
    }
  }

  function onDragStart(e) {
    if (editMode) e.preventDefault();
  }

  function onSubmit(e) {
    if (editMode) {
      e.preventDefault();
      return;
    }
    // Visita: o formulario nao navega o iframe. No site publicado o
    // action (mailto ou servico) funciona normalmente.
    e.preventDefault();
    post({ type: 'formDemo' });
  }

  function onKeyDown(e) {
    if (editingText) return;

    // Modo visita: Enter e Espaço acionam links e botões, e isso também
    // navegaria o canvas. Bloqueia os dois quando o foco está num
    // elemento acionável.
    if (!editMode) {
      var t = e.target;
      var tag = t && t.tagName ? t.tagName : '';
      if ((e.key === 'Enter' || e.key === ' ') && (tag === 'A' || tag === 'BUTTON' || (t && t.closest && t.closest('a[href],button')))) {
        e.preventDefault();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      post({ type: e.shiftKey ? 'redo' : 'undo' });
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      post({ type: 'redo' });
      return;
    }
    if (e.key === 'Escape') {
      deselect();
      return;
    }
    if (!selected) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      var el = selected;
      deselect();
      el.remove();
      post({ type: 'mutated', reason: 'delete' });
      return;
    }
    if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      moveSibling(e.key === 'ArrowUp' ? 'up' : 'down');
    }
  }

  /* ---------------- serialização ---------------- */

  function serialize() {
    var self = document.querySelector('script[data-olaria="runtime"]');
    var removed = null;
    if (self) {
      removed = self;
      self.remove();
    }
    // O arquivo salvo não deve carregar nem a marca do editor, nem a
    // interface do editor (contornos, rótulo, linha de soltar), nem o
    // estilo que o motor de animação injeta em tempo de execução —
    // todos se recriam sozinhos quando a página é aberta de novo.
    var editClass = document.documentElement.classList.contains('olaria-edit');
    if (editClass) document.documentElement.classList.remove('olaria-edit');
    var chromeEls = document.querySelectorAll('[data-olaria-ignore]');
    var animStyles = document.querySelectorAll('style[data-olaria="anim-css"]');
    var detached = [];
    var i;
    for (i = 0; i < chromeEls.length; i++) {
      detached.push(chromeEls[i]);
      chromeEls[i].remove();
    }
    for (i = 0; i < animStyles.length; i++) {
      detached.push(animStyles[i]);
      animStyles[i].remove();
    }
    var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    for (i = 0; i < detached.length; i++) document.documentElement.appendChild(detached[i]);
    if (editClass) document.documentElement.classList.add('olaria-edit');
    if (removed) {
      document.documentElement.appendChild(removed);
    }
    post({ type: 'serialized', html: html });
  }

  /* ---------------- mensagens do app ---------------- */

  function applyMode() {
    document.documentElement.classList.toggle('olaria-edit', editMode);
    if (!editMode) {
      clearOverlay();
      if (dropLine) dropLine.style.display = 'none';
      hoverEl = null;
    }
  }

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.src !== 'olaria-app') return;
    switch (d.type) {
      case 'init':
        editMode = d.editMode !== false;
        applyMode();
        if (editMode) ensureChrome();
        post({ type: 'ready' });
        if (d.path) {
          var el = elByPath(d.path);
          if (el) select(el);
        }
        break;
      case 'setEditMode':
        editMode = !!d.value;
        applyMode();
        if (editMode) ensureChrome();
        break;
      case 'setStyle':
        if (selected) {
          if (d.value === '' || d.value == null) selected.style.removeProperty(d.prop);
          else selected.style.setProperty(d.prop, d.value);
          afterMutate('style');
        }
        break;
      case 'setAttr':
        if (selected) {
          if (d.value === '' || d.value == null) selected.removeAttribute(d.name);
          else selected.setAttribute(d.name, d.value);
          if (d.name === 'data-olaria-anim' && d.value) {
            selected.dispatchEvent(new CustomEvent('olaria:anim', { bubbles: true }));
          }
          afterMutate('attr');
        }
        break;
      // Transforma um <button> em <a> de verdade, preservando classes,
      // atributos e conteúdo — assim a ação funciona também no arquivo
      // exportado (button não tem href nativo).
      case 'convertToLink':
        if (selected && selected.tagName === 'BUTTON') {
          var a = document.createElement('a');
          for (var i = 0; i < selected.attributes.length; i++) {
            var at = selected.attributes[i];
            if (at.name === 'type') continue;
            a.setAttribute(at.name, at.value);
          }
          a.innerHTML = selected.innerHTML;
          selected.parentElement.insertBefore(a, selected);
          selected.remove();
          select(a);
          afterMutate('convert');
          post({ type: 'converted', tag: 'a' });
        }
        break;
      case 'setText':
        if (selected) {
          textTarget(selected).innerHTML = d.html == null ? '' : String(d.html);
          afterMutate('text');
        }
        break;
      case 'toggleClass':
        if (selected) {
          selected.classList.toggle(d.name, !!d.on);
          afterMutate('class');
        }
        break;
      case 'insert':
        insertHtml(d.html, d.where || 'after', d.path);
        break;
      case 'removeSelected':
        if (selected) {
          var el2 = selected;
          deselect();
          el2.remove();
          post({ type: 'mutated', reason: 'delete' });
        }
        break;
      case 'duplicateSelected':
        if (selected) {
          var clone = selected.cloneNode(true);
          selected.parentElement.insertBefore(clone, selected.nextSibling);
          select(clone);
          afterMutate('duplicate');
        }
        break;
      case 'moveDir':
        moveSibling(d.dir);
        break;
      case 'setAnim':
        setAnim(d.value);
        break;
      case 'setVar':
        document.documentElement.style.setProperty(d.name, d.value == null ? '' : d.value);
        afterMutate('var');
        break;
      case 'removeVars':
        (d.names || []).forEach(function (n) {
          document.documentElement.style.removeProperty(n);
        });
        afterMutate('var');
        break;
      case 'setHtmlStyle':
        if (d.value === '' || d.value == null) document.documentElement.style.removeProperty(d.prop);
        else document.documentElement.style.setProperty(d.prop, d.value);
        post({ type: 'mutated', reason: 'var' });
        break;
      case 'getVars': {
        var cs2 = getComputedStyle(document.documentElement);
        var map = {};
        (d.names || []).forEach(function (n) {
          map[n] = cs2.getPropertyValue(n).trim();
        });
        post({ type: 'vars', map: map });
        break;
      }
      case 'selectPath': {
        var found = elByPath(d.path || []);
        if (found) select(found);
        else deselect();
        break;
      }
      case 'serialize':
        serialize();
        break;
      case 'ping':
        post({ type: 'pong' });
        break;
    }
  });

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('click', onClickCapture, true);
  document.addEventListener('dblclick', onDblClick, true);
  document.addEventListener('mouseover', onMouseOver, true);
  document.addEventListener('mouseout', onMouseOut, true);
  document.addEventListener('dragstart', onDragStart, true);
  document.addEventListener('submit', onSubmit, true);
  document.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('scroll', function () {
    if (selected) placeOverlay();
  }, true);
  window.addEventListener('resize', function () {
    if (selected) placeOverlay();
  });

  post({ type: 'booted' });
})();
