// Gaveta de animações: entrada, hover e rolagem.

import { send } from './preview.js'
import { bus } from '../core/bus.js'
import { state } from '../core/state.js'

const drawer = document.getElementById('drawer')

const ENTRADA = [
  ['fade-up', 'Surgir de baixo', 'O elemento aparece subindo suavemente.'],
  ['fade-down', 'Surgir de cima', 'O elemento aparece descendo.'],
  ['fade-left', 'Surgir da direita', 'Entra pelo lado direito.'],
  ['fade-right', 'Surgir da esquerda', 'Entra pelo lado esquerdo.'],
  ['zoom-in', 'Aproximar', 'Começa menor e chega ao tamanho.'],
  ['blur-in', 'Nitidez', 'Começa desfocado e ganha foco.'],
  ['reveal', 'Revelar', 'Combinação discreta de fade e escala.'],
]

const HOVER = [
  ['hover-lift', 'Levitar', 'Sobe um pouco quando o mouse passa.'],
  ['hover-grow', 'Crescer', 'Aumenta de tamanho no hover.'],
  ['hover-underline', 'Sublinhado', 'Uma linha cresce por baixo no hover.'],
]

const ROLAGEM = [
  ['parallax-slow', 'Parallax suave', 'Move devagar contra a rolagem.'],
  ['parallax', 'Parallax', 'Move contra a rolagem.'],
  ['parallax-fast', 'Parallax rápido', 'Move rápido contra a rolagem.'],
  ['progress-bar', 'Barra de progresso', 'Mostra o quanto a pessoa já rolou.'],
]

function animButton(value, name, hint) {
  const btn = document.createElement('button')
  btn.className = 'comp-btn'
  btn.type = 'button'
  const n = document.createElement('span')
  n.className = 'c-name'
  n.textContent = name
  const h = document.createElement('span')
  h.className = 'c-hint'
  h.textContent = hint
  btn.append(n, h)
  if (state.selected?.anim === value) btn.style.borderColor = 'var(--accent)'
  btn.addEventListener('click', () => bus.emit('anim:apply', { value }))
  return btn
}

export function renderAnimPanel() {
  drawer.innerHTML = ''

  if (!state.selected) {
    const note = document.createElement('p')
    note.className = 'drawer-note'
    note.innerHTML =
      'Selecione um elemento na página (clique nele) e depois escolha aqui o que ele faz. Sem seleção, a animação não tem onde entrar.'
    drawer.appendChild(note)
  }

  const current = document.createElement('p')
  current.className = 'drawer-note'
  current.innerHTML = state.selected
    ? `Elemento: <strong>${escapeHtml(state.selected.selector)}</strong> · animação atual: <strong>${state.selected.anim || 'nenhuma'}</strong>`
    : 'Nenhum elemento selecionado.'
  drawer.appendChild(current)

  const addSection = (title, items) => {
    const h = document.createElement('h3')
    h.className = 'group-title'
    h.textContent = title
    drawer.appendChild(h)
    const grid = document.createElement('div')
    grid.className = 'comp-grid'
    items.forEach(([value, name, hint]) => grid.appendChild(animButton(value, name, hint)))
    drawer.appendChild(grid)
  }

  addSection('Quando entra na tela', ENTRADA)
  addSection('Quando o mouse passa', HOVER)
  addSection('Rolagem da página', ROLAGEM)

  /* --- contador --- */
  const h = document.createElement('h3')
  h.className = 'group-title'
  h.textContent = 'Contador de número'
  drawer.appendChild(h)

  const form = document.createElement('div')
  form.className = 'drawer-note'
  form.style.display = 'grid'
  form.style.gap = '8px'

  const numInput = document.createElement('input')
  numInput.className = 'input'
  numInput.type = 'number'
  numInput.placeholder = 'Número final (use um número real)'
  numInput.setAttribute('aria-label', 'número final')

  const pre = document.createElement('input')
  pre.className = 'input'
  pre.placeholder = 'Antes do número (ex.: R$)'
  pre.setAttribute('aria-label', 'prefixo')

  const suf = document.createElement('input')
  suf.className = 'input'
  suf.placeholder = 'Depois do número (ex.: +)'
  suf.setAttribute('aria-label', 'sufixo')

  const apply = document.createElement('button')
  apply.className = 'btn btn-primary'
  apply.textContent = 'Aplicar contador'
  apply.addEventListener('click', () => {
    const n = numInput.value.trim()
    if (!n) {
      numInput.focus()
      return
    }
    bus.emit('anim:apply', {
      value: 'counter',
      attrs: [
        ['data-olaria-count', n],
        ['data-olaria-prefix', pre.value.trim()],
        ['data-olaria-suffix', suf.value.trim()],
      ],
    })
  })

  form.append(numInput, pre, suf, apply)
  drawer.appendChild(form)

  /* --- remover --- */
  const h2 = document.createElement('h3')
  h2.className = 'group-title'
  h2.textContent = 'Limpar'
  drawer.appendChild(h2)
  const removeBtn = document.createElement('button')
  removeBtn.className = 'comp-btn wide'
  removeBtn.type = 'button'
  const rn = document.createElement('span')
  rn.className = 'c-name'
  rn.textContent = 'Remover animação'
  const rh = document.createElement('span')
  rh.className = 'c-hint'
  rh.textContent = 'O elemento fica parado.'
  removeBtn.append(rn, rh)
  removeBtn.addEventListener('click', () => bus.emit('anim:apply', { value: '' }))
  drawer.appendChild(removeBtn)

  /* --- rolagem suave --- */
  const h3 = document.createElement('h3')
  h3.className = 'group-title'
  h3.textContent = 'Página inteira'
  drawer.appendChild(h3)
  const smooth = document.createElement('button')
  smooth.className = 'comp-btn wide'
  smooth.type = 'button'
  const sn = document.createElement('span')
  sn.className = 'c-name'
  sn.textContent = 'Rolagem suave'
  const sh = document.createElement('span')
  sh.className = 'c-hint'
  sh.textContent = 'Links do menu deslizam em vez de pular.'
  smooth.append(sn, sh)
  smooth.addEventListener('click', () => bus.emit('doc:smoothScroll', { on: !state.smoothScroll }))
  if (state.smoothScroll) smooth.style.borderColor = 'var(--accent)'
  drawer.appendChild(smooth)
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
