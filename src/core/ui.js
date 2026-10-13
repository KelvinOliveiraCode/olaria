// UI auxiliar: avisos, modal e confirmação.

const toastsEl = document.getElementById('toasts')
const modalLayer = document.getElementById('modalLayer')
const modalTitle = document.getElementById('modalTitle')
const modalBody = document.getElementById('modalBody')
const modalClose = document.getElementById('modalClose')

export function toast(message, kind = '', ms = 3600) {
  const el = document.createElement('div')
  el.className = `toast ${kind ? `is-${kind}` : ''}`
  el.innerHTML = `<span class="dot"></span><span></span>`
  el.lastElementChild.textContent = message
  toastsEl.appendChild(el)
  setTimeout(() => {
    el.classList.add('is-out')
    setTimeout(() => el.remove(), 220)
  }, ms)
}

export function openModal(title, bodyNode) {
  modalTitle.textContent = title
  modalBody.innerHTML = ''
  if (typeof bodyNode === 'string') modalBody.innerHTML = bodyNode
  else if (bodyNode) modalBody.appendChild(bodyNode)
  modalLayer.hidden = false
  modalClose.focus()
}

export function closeModal() {
  modalLayer.hidden = true
}

modalClose.addEventListener('click', closeModal)
modalLayer.addEventListener('mousedown', (e) => {
  if (e.target === modalLayer) closeModal()
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalLayer.hidden) closeModal()
})

export function confirmDialog({ title = 'Confirma?', message, okLabel = 'Continuar', cancelLabel = 'Cancelar', danger = false }) {
  return new Promise((resolve) => {
    const wrap = document.createElement('div')
    const p = document.createElement('p')
    p.style.cssText = 'font-size:14px;line-height:1.6;color:var(--text-2);margin-bottom:20px;max-width:52ch'
    p.textContent = message
    const row = document.createElement('div')
    row.className = 'btn-row'
    const ok = document.createElement('button')
    ok.className = `btn ${danger ? 'btn-danger' : 'btn-primary'}`
    ok.textContent = okLabel
    const no = document.createElement('button')
    no.className = 'btn'
    no.textContent = cancelLabel
    row.append(no, ok)
    wrap.append(p, row)
    openModal(title, wrap)
    const done = (v) => {
      closeModal()
      resolve(v)
    }
    ok.onclick = () => done(true)
    no.onclick = () => done(false)
  })
}
