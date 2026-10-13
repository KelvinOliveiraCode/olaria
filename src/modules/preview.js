// Hospedeiro do iframe: injeta o runtime, faz a ponte de mensagens
// e serializa o documento de volta.

import runtimeSource from '../runtime/edit-runtime.js?raw'
import { state } from '../core/state.js'
import { bus } from '../core/bus.js'

const iframe = document.getElementById('preview')

let serializeResolve = null
let ready = false

export function initPreview() {
  window.addEventListener('message', onMessage)
}

function injectRuntime(html) {
  const tag = `<script data-olaria="runtime">\n${runtimeSource}\n</script>`
  if (/<\/body>/i.test(html)) return html.replace(/<\/body>/i, `${tag}\n</body>`)
  return html + tag
}

/** Recria o iframe com o documento atual. */
export function paint() {
  ready = false
  state.pendingSelectPath = state.selected ? state.selected.path : null
  iframe.srcdoc = injectRuntime(state.doc)
}

export function send(msg) {
  const w = iframe.contentWindow
  if (w) w.postMessage({ src: 'olaria-app', ...msg }, '*')
}

function onMessage(e) {
  const d = e.data
  if (!d || d.src !== 'olaria-runtime') return
  switch (d.type) {
    case 'booted':
      ready = true
      send({ type: 'init', editMode: !state.preview, path: state.pendingSelectPath })
      state.pendingSelectPath = null
      bus.emit('preview:ready')
      break
    case 'ready':
      if (state.pendingInsert) {
        const ins = state.pendingInsert
        state.pendingInsert = null
        send({ type: 'insert', ...ins })
      }
      break
    case 'selected':
      state.selected = d.info
      bus.emit('selected', d.info)
      break
    case 'deselected':
      state.selected = null
      bus.emit('deselected')
      break
    case 'mutated':
      bus.emit('mutated', d.reason)
      break
    case 'undo':
      bus.emit('edit:undo')
      break
    case 'redo':
      bus.emit('edit:redo')
      break
    case 'serialized':
      if (serializeResolve) {
        const r = serializeResolve
        serializeResolve = null
        r(d.html)
      }
      break
    case 'openExternal':
      bus.emit('runtime:openExternal', { url: String(d.url || '') })
      break
    case 'formDemo':
      bus.emit('runtime:formDemo')
      break
    case 'vars':
      bus.emit('vars', d.map)
      break
  }
}

export function serialize() {
  return new Promise((resolve) => {
    serializeResolve = resolve
    send({ type: 'serialize' })
  })
}

export function isReady() {
  return ready
}

/** Pede os tokens de tema atuais do documento. */
export function getVars(names) {
  send({ type: 'getVars', names })
}

/** Acesso ao documento da página (same-origin do srcdoc). */
export function pageDocument() {
  try {
    return iframe.contentDocument
  } catch {
    return null
  }
}
