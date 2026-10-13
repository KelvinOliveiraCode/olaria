// Gaveta de inserção: biblioteca de componentes.

import { componentGroups } from './components.js'
import { bus } from '../core/bus.js'
import { state } from '../core/state.js'

const drawer = document.getElementById('drawer')

export function renderInsertPanel() {
  drawer.innerHTML = ''

  const intro = document.createElement('p')
  intro.className = 'drawer-note'
  intro.innerHTML =
    'Clique para inserir na página. O item entra <strong>depois do elemento selecionado</strong> (ou no fim da página). Depois é só editar tudo no painel da direita.'
  drawer.appendChild(intro)

  componentGroups.forEach((group) => {
    const title = document.createElement('h3')
    title.className = 'group-title'
    title.textContent = group.name
    drawer.appendChild(title)

    const grid = document.createElement('div')
    grid.className = 'comp-grid'
    group.items.forEach((item) => {
      const btn = document.createElement('button')
      btn.className = 'comp-btn'
      btn.type = 'button'
      const name = document.createElement('span')
      name.className = 'c-name'
      name.textContent = item.name
      const hint = document.createElement('span')
      hint.className = 'c-hint'
      hint.textContent = item.hint
      btn.append(name, hint)
      btn.addEventListener('click', () => {
        bus.emit('insert:component', { id: item.id })
      })
      grid.appendChild(btn)
    })
    drawer.appendChild(grid)
  })

  const note = document.createElement('p')
  note.className = 'drawer-note'
  note.innerHTML =
    'Falta algo? Mude para a aba <strong>Código</strong> e escreva HTML à mão — a página aceita qualquer código, inclusive páginas feitas fora do Olaria.'
  drawer.appendChild(note)
}
