// Gaveta de Modelos: ponto de partida.

import { templates, blankPage } from './templates.js'
import { bus } from '../core/bus.js'

const drawer = document.getElementById('drawer')

export function renderTemplatesPanel() {
  drawer.innerHTML = ''

  const intro = document.createElement('p')
  intro.className = 'drawer-note'
  intro.innerHTML =
    'Um modelo é uma página completa que depois vira <strong>sua</strong>: todo texto, cor e imagem pode ser mudado. Escolher um modelo substitui a página atual.'
  drawer.appendChild(intro)

  const grid = document.createElement('div')
  grid.style.display = 'grid'
  grid.style.gap = '10px'

  const blank = card({
    name: 'Página em branco',
    summary: 'Começa com o essencial: menu, uma seção e rodapé. Você monta o resto.',
    tags: ['do zero'],
  })
  blank.addEventListener('click', () => bus.emit('template:load', { id: '__blank__' }))
  grid.appendChild(blank)

  templates.forEach((tpl) => {
    const cardEl = card(tpl)
    cardEl.addEventListener('click', () => bus.emit('template:load', { id: tpl.id }))
    grid.appendChild(cardEl)
  })

  drawer.appendChild(grid)
}

function card(tpl) {
  const btn = document.createElement('button')
  btn.className = 'tpl-card'
  btn.type = 'button'
  const h = document.createElement('h3')
  h.textContent = tpl.name
  const p = document.createElement('p')
  p.textContent = tpl.summary
  const tags = document.createElement('div')
  tags.className = 'tags'
  ;(tpl.tags || []).forEach((tag) => {
    const s = document.createElement('span')
    s.className = 'tag'
    s.textContent = tag
    tags.appendChild(s)
  })
  const use = document.createElement('span')
  use.className = 'use'
  use.textContent = 'Usar este modelo'
  btn.append(h, p, tags, use)
  return btn
}

export { blankPage }
