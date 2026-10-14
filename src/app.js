// Olaria — orquestração. Liga interface, editor, pré-visualização,
// arquivos, desfazer/refazer e publicação.

import './styles.css'
import { bus } from './core/bus.js'
import { state, markDirty, setFile } from './core/state.js'
import { io, isTauri, readDroppedFile } from './core/store.js'
import { confirmDialog, openModal, closeModal, toast } from './core/ui.js'
import { hasBlock, injectUtils, injectAnim } from './core/docutils.js'
import { rewriteForPreview, restoreForSave } from './core/assets.js'
import { paint, send, serialize, getVars, isReady, initPreview } from './modules/preview.js'
import { renderProps, initProps, propsHint, defaultHint } from './modules/props-panel.js'
import { renderInsertPanel } from './modules/insert-panel.js'
import { renderAnimPanel } from './modules/anim-panel.js'
import { renderThemePanel, THEME_TOKENS } from './modules/theme-panel.js'
import { renderTemplatesPanel } from './modules/templates-panel.js'
import { openPublishModal } from './modules/publish-panel.js'
import { getTemplate, blankPage } from './modules/templates.js'
import { utilsCss, findComponent } from './modules/components.js'
import animSource from './runtime/anim-engine.js?raw'

/* ---------------- elementos ---------------- */

const $ = (id) => document.getElementById(id)
const app = $('app')
const welcome = $('welcome')
const drawer = $('drawer')
const codePane = $('codePane')
const stage = document.querySelector('.stage')
const stageWrap = $('stageWrap')
const propsPanel = $('props')
const crumb = $('crumb')
const hint = $('hint')
const saveState = $('saveState')
const conflictBar = $('conflictBar')
const recentBox = $('welcomeRecent')
const recentList = $('recentList')

/* ---------------- estado auxiliar ---------------- */

let assetMap = null
let burstActive = false
let syncTimer = null
let readyWaiter = null
let editorChangeTimer = null

// Lazy-loading do CodeMirror
let editorModulePromise = null
let editorModuleLoaded = false
let editorInitPending = null

async function ensureEditorModule() {
  if (editorModuleLoaded) return
  if (!editorModulePromise) {
    editorModulePromise = import('./modules/code-editor.js').then((mod) => {
      editorModuleLoaded = true
      return mod
    })
  }
  return editorModulePromise
}

async function initEditorLazy({ onChange, onSave }) {
  const { initEditor } = await ensureEditorModule()
  return initEditor({ onChange, onSave })
}

async function getEditorValueLazy() {
  const { getEditorValue } = await ensureEditorModule()
  return getEditorValue()
}

async function setEditorValueLazy(text) {
  const { setEditorValue } = await ensureEditorModule()
  setEditorValue(text)
}

async function refreshEditorLazy() {
  const { refreshEditor } = await ensureEditorModule()
  refreshEditor()
}

bus.on('preview:ready', () => {
  if (readyWaiter) {
    const w = readyWaiter
    readyWaiter = null
    w()
  }
})

function waitPreviewReady() {
  return new Promise((resolve) => {
    readyWaiter = resolve
  })
}

function once(event, fn, timeout = 4000) {
  const off = bus.on(event, (payload) => {
    off()
    fn(payload)
  })
  setTimeout(off, timeout)
}

/* ---------------- início ---------------- */

export function init() {
  initProps()
  initPreview()
  initEditorLazy({
    onChange: (value) => {
      state.doc = value
      markDirty(true)
      clearTimeout(editorChangeTimer)
      editorChangeTimer = setTimeout(() => {
        if (state.mode === 'split') paint()
      }, 500)
    },
    onSave: () => save(),
  })

  renderPanel(state.panel)
  wireTopbar()
  wireRail()
  wireModes()
  wireDevices()
  wireWelcome()
  wireConflict()
  wireWatcher()
  wireDragDrop()
  wireBus()
  renderRecent()
  updateUndoButtons()

  if (!isTauri) {
    $('welcomeTip').textContent =
      'Rodando no navegador (modo de teste da interface). Para arquivos, pastas e publicação, use o app Olaria instalado.'
  }
}

/* ---------------- barra superior ---------------- */

function wireTopbar() {
  $('openBtn').addEventListener('click', openFromDialog)
  $('saveBtn').addEventListener('click', save)
  $('publishBtn').addEventListener('click', () => openPublishModal())
  $('undoBtn').addEventListener('click', undo)
  $('redoBtn').addEventListener('click', redo)

  document.addEventListener('keydown', (e) => {
    const mod = e.ctrlKey || e.metaKey
    if (mod && e.key.toLowerCase() === 's') {
      e.preventDefault()
      save()
    } else if (mod && e.key.toLowerCase() === 'o') {
      e.preventDefault()
      openFromDialog()
    } else if (mod && e.key.toLowerCase() === 'e') {
      e.preventDefault()
      saveAs()
    } else if (mod && e.key.toLowerCase() === 'p') {
      e.preventDefault()
      setMode(state.preview ? 'edit' : 'view')
    } else if (e.key === 'F1') {
      e.preventDefault()
      setMode('edit')
    } else if (e.key === 'F2') {
      e.preventDefault()
      setMode('view')
    } else if (e.key === 'F3') {
      e.preventDefault()
      setMode('code')
    } else if (e.key === 'F4') {
      e.preventDefault()
      setMode('split')
    }
  })
}

function wireRail() {
  document.querySelectorAll('.rail-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel
      if (state.panel === panel && !drawer.hidden) {
        drawer.hidden = true
        btn.classList.remove('is-active')
        state.panel = null
      } else {
        state.panel = panel
        renderPanel(panel)
      }
      document.querySelectorAll('.rail-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.panel === state.panel))
    })
  })
}

function renderPanel(panel) {
  if (!panel) {
    drawer.hidden = true
    return
  }
  drawer.hidden = false
  if (panel === 'insert') renderInsertPanel()
  else if (panel === 'animate') renderAnimPanel()
  else if (panel === 'theme') renderThemePanel()
  else if (panel === 'templates') renderTemplatesPanel()
}

bus.on('panel:open', (panel) => {
  state.panel = panel
  renderPanel(panel)
  document.querySelectorAll('.rail-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.panel === panel))
})

/* ---------------- modos e telas ---------------- */

function wireModes() {
  document.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode))
  })
}

function setMode(mode) {
  state.mode = mode
  state.preview = mode === 'view'
  document.querySelectorAll('[data-mode]').forEach((b) => {
    const on = b.dataset.mode === mode
    b.classList.toggle('is-active', on)
    b.setAttribute('aria-selected', String(on))
  })
  const comCodigo = mode === 'code' || mode === 'split'
  stage.classList.toggle('with-code', comCodigo)
  stage.classList.toggle('code-only', mode === 'code')
  stageWrap.classList.toggle('is-hidden', mode === 'code')
  codePane.hidden = !comCodigo

  // Modo visita: o runtime dentro do canvas desliga a edição e os
  // painéis saem de cena para a página ficar como o visitante vê.
  send({ type: 'setEditMode', value: mode !== 'view' })
  showPreviewPill(mode === 'view')
  if (mode === 'view') {
    propsPanel.hidden = true
    drawer.hidden = true
    crumb.textContent = 'modo visita'
    hint.textContent = 'A página funciona como o visitante vê. Volte para Editar para mudar o que quiser.'
  } else if (mode === 'code') {
    propsPanel.hidden = true
    drawer.hidden = true
    crumb.textContent = 'código'
    hint.textContent = 'Editor de código. Ctrl+S salva. Volte para Editar para mexer na página diretamente.'
  } else {
    drawer.hidden = !state.panel
    propsPanel.hidden = !state.selected
    crumb.textContent = state.selected ? state.selected.trail.join(' › ') : 'body'
    if (state.selected) propsHint()
    else defaultHint()
  }

  if (comCodigo) {
    // Inicializa o editor se ainda não foi feito; setEditorValueLazy
    // já aguarda o módulo carregar antes de escrever.
    setEditorValueLazy(state.doc)
    // O CodeMirror mede o tamanho ao virar visível: rAF simples ainda
    // corre antes do layout do painel recém-mostrado. Duplo rAF + um
    // fallback garantem a remediação em qualquer navegador/WebView.
    requestAnimationFrame(() => requestAnimationFrame(refreshEditorLazy))
    setTimeout(refreshEditorLazy, 60)
  }
}

function wireDevices() {
  document.querySelectorAll('[data-device]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.device = btn.dataset.device
      document.body.dataset.device = state.device
      document.querySelectorAll('[data-device]').forEach((b) => b.classList.toggle('is-active', b === btn))
    })
  })
  document.body.dataset.device = 'desktop'
  document.querySelector('[data-device="desktop"]').classList.add('is-active')
}

function setPreview(on) {
  setMode(on ? 'view' : 'edit')
}

let previewPill = null
function showPreviewPill(on) {
  if (on && !previewPill) {
    previewPill = document.createElement('div')
    previewPill.className = 'preview-pill'
    previewPill.textContent = 'Modo visita — clique no olho para editar'
    stageWrap.appendChild(previewPill)
  }
  if (previewPill) previewPill.hidden = !on
}

/* ---------------- boas-vindas ---------------- */

function wireWelcome() {
  $('welcomeTemplate').addEventListener('click', () => {
    state.panel = 'templates'
    renderPanel('templates')
    document.querySelectorAll('.rail-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.panel === 'templates'))
    loadDoc(blankPage(), null)
  })
  $('welcomeOpen').addEventListener('click', openFromDialog)
  $('welcomeBlank').addEventListener('click', () => loadDoc(blankPage(), null))
}

function renderRecent() {
  try {
    state.recent = JSON.parse(localStorage.getItem('olaria:recent') || '[]')
  } catch {
    state.recent = []
  }
  if (!state.recent.length) {
    recentBox.hidden = true
    return
  }
  recentBox.hidden = false
  recentList.innerHTML = ''
  state.recent.slice(0, 6).forEach((item) => {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.className = 'recent-item'
    const name = document.createElement('span')
    name.className = 'r-name'
    name.textContent = item.name
    const path = document.createElement('span')
    path.className = 'r-path'
    path.textContent = item.path
    path.title = item.path
    btn.append(name, path)
    btn.addEventListener('click', () => openFile(item.path))
    li.appendChild(btn)
    recentList.appendChild(li)
  })
}

function addRecent(path) {
  state.recent = state.recent.filter((r) => r.path !== path)
  state.recent.unshift({ path, name: path.replace(/\\/g, '/').split('/').pop(), at: Date.now() })
  state.recent = state.recent.slice(0, 10)
  localStorage.setItem('olaria:recent', JSON.stringify(state.recent))
  renderRecent()
}

/* ---------------- documentos ---------------- */

function showApp() {
  app.hidden = false
  welcome.hidden = true
}

async function loadDoc(html, path) {
  state.doc = html
  state.filePath = path || null
  state.history = []
  state.future = []
  state.selected = null
  state.dirty = false
  assetMap = null
  setFile(path)
  markDirty(false)
  renderProps(null)
  crumb.textContent = 'body'
  defaultHint()
  state.smoothScroll = /scroll-behavior:\s*smooth/i.test(html)
  setMode('edit')
  paint()
  showApp()
  updateUndoButtons()
  updateSaveState()

  if (path) {
    addRecent(path)
    try {
      await io.watchFile(path)
    } catch (err) {
      console.warn('observação de arquivo indisponível', err)
    }
  }
  once('preview:ready', captureTokens)
  toast(path ? 'Página aberta.' : 'Página criada.', 'ok')
}

function captureTokens() {
  once('vars', (map) => {
    state.originalTokens = map
  })
  getVars(THEME_TOKENS.concat(['--olaria-font', '--olaria-radius', '--olaria-max']))
}

async function openFile(path) {
  try {
    const raw = await io.readText(path)
    const { html, map } = rewriteForPreview(raw, path)
    assetMap = map
    await loadDoc(html, path)
  } catch (err) {
    toast(`Não foi possível abrir: ${err.message}`, 'error', 6000)
  }
}

async function openFromDialog() {
  const picked = await io.openDialog()
  if (!picked) return
  if (typeof picked === 'string') {
    await openFile(picked)
  } else {
    const text = await picked.text()
    await loadDoc(text, null)
  }
}

async function currentDoc() {
  const noCanvas = state.mode === 'code'
  if (!noCanvas && isReady()) {
    try {
      const html = await serialize()
      if (html) return html
    } catch (err) {
      console.warn('serialize falhou, usando editor como fallback:', err)
    }
  }
  // O editor de código está sempre sincronizado; ele serve de reserva.
  return getEditorValueLazy()
}

async function save() {
  if (!state.filePath) return saveAs()
  try {
    let html = await currentDoc()
    html = restoreForSave(html, assetMap)
    await io.writeText(state.filePath, html)
    state.doc = html
    markDirty(false)
    updateSaveState()
    toast('Página salva.', 'ok')
    try {
      await io.watchFile(state.filePath)
    } catch {}
  } catch (err) {
    toast(`Não foi possível salvar: ${err.message}`, 'error', 6000)
  }
}

async function saveAs() {
  const suggested = state.filePath ? state.filePath.replace(/\\/g, '/').split('/').pop() : 'index.html'
  const path = await io.saveDialog(suggested)
  if (!path) return
  state.filePath = path
  setFile(path)
  await save()
}

function titleOfDoc() {
  const m = state.doc.match(/<title[^>]*>([^<]*)<\/title>/i)
  return (m && m[1].trim()) || 'Minha página'
}

/* ---------------- sincronia visual → documento ---------------- */

bus.on('mutated', () => {
  noteMutation()
  clearTimeout(syncTimer)
  syncTimer = setTimeout(syncFromRuntime, 140)
})

function noteMutation() {
  if (!burstActive) {
    burstActive = true
    pushHistory()
    setTimeout(() => {
      burstActive = false
    }, 600)
  }
}

async function syncFromRuntime() {
  if (state.mode === 'code') {
    // No modo código, o editor é a verdade; não sobrescrever.
    markDirty(true)
    updateSaveState()
    return
  }
  try {
    const html = await serialize()
    state.doc = html
    markDirty(true)
    updateSaveState()
    setEditorValueLazy(html)
  } catch (err) {
    console.warn('syncFromRuntime: serialize falhou:', err)
    // Mantém o state.doc atual; o editor de código tem a versão mais recente
    markDirty(true)
    updateSaveState()
  }
}

bus.on('selected', (info) => {
  crumb.textContent = info.trail.join(' › ')
  if (state.mode === 'edit') {
    propsPanel.hidden = false
    propsHint()
  }
})

bus.on('deselected', () => {
  crumb.textContent = 'body'
  if (!state.preview) {
    propsPanel.hidden = true
    defaultHint()
  }
})

/* ---------------- desfazer / refazer ---------------- */

function pushHistory() {
  state.history.push({
    doc: state.doc,
    selectedPath: state.selected ? state.selected.path : null
  })
  if (state.history.length > 200) state.history.shift()
  state.future = []
  updateUndoButtons()
}

function undo() {
  if (!state.history.length) return
  // O histórico guarda os estados ANTERIORES (pushHistory roda em 'mutated',
  // antes de state.doc receber a mudança), então undo devolve o ultimo item
  // e o estado atual vai para o futuro.
  state.future.push({
    doc: state.doc,
    selectedPath: state.selected ? state.selected.path : null,
  })
  const entry = state.history.pop()
  state.doc = entry.doc
  state.pendingSelectPath = entry.selectedPath
  applyHistoryDoc()
}

function redo() {
  if (!state.future.length) return
  state.history.push({
    doc: state.doc,
    selectedPath: state.selected ? state.selected.path : null,
  })
  const entry = state.future.pop()
  state.doc = entry.doc
  state.pendingSelectPath = entry.selectedPath
  applyHistoryDoc()
}

function applyHistoryDoc() {
  state.selected = null
  renderProps(null)
  markDirty(true)
  updateSaveState()
  paint()
  if (state.mode !== 'edit' && state.mode !== 'view') setEditorValueLazy(state.doc)
  updateUndoButtons()
}

bus.on('edit:undo', undo)
bus.on('edit:redo', redo)

function updateUndoButtons() {
  $('undoBtn').disabled = state.history.length === 0
  $('redoBtn').disabled = state.future.length === 0
}

function updateSaveState() {
  saveState.textContent = state.dirty ? 'não salvo' : state.filePath ? 'salvo' : ''
}

/* ---------------- inserção de componentes ---------------- */

bus.on('insert:component', async ({ id }) => {
  const comp = findComponent(id)
  if (!comp) return
  const html = comp.html()
  let repaint = false
  if (!hasBlock(state.doc, 'utils')) {
    state.doc = injectUtils(state.doc, utilsCss)
    repaint = true
  }
  if (repaint) {
    paint()
    await waitPreviewReady()
    state.pendingInsert = { html, where: comp.where || 'after', path: state.selected ? state.selected.path : null }
  } else if (isReady()) {
    send({ type: 'insert', html, where: comp.where || 'after', path: state.selected ? state.selected.path : null })
  } else {
    state.pendingInsert = { html, where: comp.where || 'after', path: state.selected ? state.selected.path : null }
  }
})

/* ---------------- animações ---------------- */

bus.on('anim:apply', async ({ value, attrs }) => {
  if (value && !state.selected) {
    toast('Selecione um elemento na página primeiro.', 'error')
    return
  }
  if (value && !hasBlock(state.doc, 'anim')) {
    state.doc = injectAnim(state.doc, animSource)
    paint()
    await waitPreviewReady()
  }
  send({ type: 'setAnim', value })
  ;(attrs || []).forEach(([name, v]) => send({ type: 'setAttr', name, value: v }))
  renderAnimPanel()
})

bus.on('doc:smoothScroll', ({ on }) => {
  state.smoothScroll = on
  send({ type: 'setHtmlStyle', prop: 'scroll-behavior', value: on ? 'smooth' : '' })
  renderAnimPanel()
})

bus.on('runtime:openExternal', ({ url }) => {
  if (url) io.openExternal(url)
})

bus.on('runtime:formDemo', () => {
  toast('Formulário de demonstração: no site publicado, o envio funciona pelo endereço configurado no HTML.', 'info', 5000)
})

/* ---------------- modelos ---------------- */

bus.on('template:load', async ({ id }) => {
  let html = null
  if (id === '__blank__') html = blankPage()
  else html = getTemplate(id)?.build()
  if (!html) return

  if (state.dirty) {
    const choice = await askSaveDiscard()
    if (choice === 'cancel') return
    if (choice === 'save') {
      await save()
      if (state.dirty) return
    }
  }
  await loadDoc(html, null)
  state.panel = 'insert'
  renderPanel('insert')
  document.querySelectorAll('.rail-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.panel === 'insert'))
})

function askSaveDiscard() {
  return new Promise((resolve) => {
    const wrap = document.createElement('div')
    const p = document.createElement('p')
    p.style.cssText = 'font-size:14px;line-height:1.6;color:var(--text-2);margin-bottom:20px;max-width:52ch'
    p.textContent = 'A página atual tem alterações não salvas. O que fazer antes de trocar?'
    const row = document.createElement('div')
    row.className = 'btn-row'
    const saveBtn = document.createElement('button')
    saveBtn.className = 'btn btn-primary'
    saveBtn.textContent = 'Salvar'
    const noBtn = document.createElement('button')
    noBtn.className = 'btn'
    noBtn.textContent = 'Continuar sem salvar'
    const cancelBtn = document.createElement('button')
    cancelBtn.className = 'btn btn-danger'
    cancelBtn.textContent = 'Cancelar'
    row.append(saveBtn, noBtn, cancelBtn)
    wrap.append(p, row)
    openModal('Alterações não salvas', wrap)
    const done = (v) => {
      closeModal()
      resolve(v)
    }
    saveBtn.onclick = () => done('save')
    noBtn.onclick = () => done('discard')
    cancelBtn.onclick = () => done('cancel')
  })
}

/* ---------------- publicação ---------------- */

bus.on('publish:export', async () => {
  closeModal()
  await saveAs()
})

bus.on('publish:package', async () => {
  let folder = null
  try {
    folder = await io.pickFolder()
  } catch (err) {
    toast(err.message, 'error')
    return
  }
  if (!folder) return
  try {
    let html = await currentDoc()
    html = restoreForSave(html, assetMap)
    const files = await io.publishPackage(folder, html, titleOfDoc())
    closeModal()
    toast('Pasta do site criada. Siga o arquivo COMO-PUBLICAR.md.', 'ok', 7000)
    const first = files[0]
    if (first) io.revealInDir(first)
  } catch (err) {
    toast(`Não foi possível criar a pasta: ${err.message}`, 'error', 6000)
  }
})

bus.on('publish:browser', async () => {
  try {
    if (!state.filePath) {
      closeModal()
      await saveAs()
    }
    if (state.filePath) await io.openPath(state.filePath)
  } catch (err) {
    toast(`Não foi possível abrir no navegador: ${err.message}`, 'error')
  }
})

bus.on('publish:github', () => {
  io.openExternal('https://github.com/new')
})

bus.on('publish:oneclick', () => void publishOneClick())

/** Publica de verdade: escolhe a pasta, commita, cria o repo e ativa o Pages. */
async function publishOneClick() {
  let folder = null
  try {
    folder = await io.pickFolder()
  } catch (err) {
    toast(err.message, 'error')
    return
  }
  if (!folder) return

  let html = await currentDoc()
  html = restoreForSave(html, assetMap)

  const base = state.filePath
    ? state.filePath.replace(/\\/g, '/').split('/').pop().replace(/\.html?$/i, '')
    : 'minha-landing'
  const slug = (window.prompt('Nome do repositório no GitHub (sem espaços):', base) || '').trim()
  if (!slug) return

  toast('Publicando... isso pode levar alguns segundos.', '', 6000)
  let report = null
  try {
    report = await io.publishGithub(folder, html, slug)
  } catch (err) {
    toast(`Não foi possível publicar: ${err.message}`, 'error', 8000)
    return
  }

  if (!report.ok) {
    toast(report.erro || 'Não foi possível publicar.', 'error', 12000)
    return
  }

  const url = report.url ? `${report.url.replace(/\.git$/, '').replace(/\/$/, '')}` : null
  const siteUrl = url ? `${url}/` : null
  closeModal()
  openModal('Publicado', renderPublishResult(siteUrl, folder, report.passos))
  if (siteUrl) io.openExternal(siteUrl)
}

function renderPublishResult(siteUrl, folder, passos) {
  const wrap = document.createElement('div')
  const p = document.createElement('p')
  p.style.cssText = 'font-size:14px;line-height:1.65;color:var(--text-2);margin-bottom:16px;max-width:56ch'
  if (siteUrl) {
    p.innerHTML = `Sua página está no ar em <strong style="color:var(--accent)">${siteUrl}</strong> (leva ~1 minuto para ficar visível na primeira vez).`
  } else {
    p.textContent = 'Página publicada. O GitHub leva ~1 minuto para disponibilizar na primeira vez.'
  }
  wrap.appendChild(p)

  const ol = document.createElement('ol')
  ol.style.cssText = 'margin:0 0 18px 20px;color:var(--text-2);font-size:13px;line-height:1.8'
  passos.forEach((passo) => {
    const li = document.createElement('li')
    li.textContent = passo
    ol.appendChild(li)
  })
  wrap.appendChild(ol)

  const row = document.createElement('div')
  row.className = 'btn-row'
  if (siteUrl) {
    const open = document.createElement('button')
    open.className = 'btn btn-primary'
    open.textContent = 'Abrir meu site'
    open.addEventListener('click', () => io.openExternal(siteUrl))
    row.appendChild(open)
  }
  const reveal = document.createElement('button')
  reveal.className = 'btn'
  reveal.textContent = 'Mostrar pasta'
  reveal.addEventListener('click', () => io.revealInDir(folder))
  row.appendChild(reveal)
  wrap.appendChild(row)
  return wrap
}

/* ---------------- conflito com edição externa ---------------- */

function wireConflict() {
  $('conflictReload').addEventListener('click', async () => {
    conflictBar.hidden = true
    state.externalChange = false
    if (state.filePath) await openFile(state.filePath)
  })
  $('conflictIgnore').addEventListener('click', () => {
    conflictBar.hidden = true
    state.externalChange = false
  })
}

function wireWatcher() {
  io.onFileChanged(async (path) => {
    if (!state.filePath || path !== state.filePath) return
    if (state.dirty) {
      state.externalChange = true
      conflictBar.hidden = false
      return
    }
    try {
      const raw = await io.readText(path)
      const { html, map } = rewriteForPreview(raw, path)
      // Só reseta histórico se o conteúdo realmente mudou
      if (html !== state.doc) {
        assetMap = map
        state.doc = html
        state.history = []
        state.future = []
        state.selected = null
        renderProps(null)
        paint()
        updateUndoButtons()
        toast('O arquivo mudou fora do Olaria e foi recarregado.', '', 3000)
      }
    } catch (err) {
      console.warn('recarga externa falhou', err)
    }
  })
}

/* ---------------- arrastar arquivo ---------------- */

function wireDragDrop() {
  if (isTauri) {
    import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
      getCurrentWindow().onDragDropEvent(async (event) => {
        if (event.payload.type !== 'drop') return
        const paths = event.payload.paths || []
        const html = paths.find((p) => /\.html?$/i.test(p))
        if (html) await openFile(html)
        else if (paths.length) toast('Só consigo abrir arquivos .html por aqui.', 'error')
      })
    })
    return
  }
  document.addEventListener('dragover', (e) => e.preventDefault())
  document.addEventListener('drop', async (e) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    if (!file) return
    if (!/\.html?$/i.test(file.name)) {
      toast('Só consigo abrir arquivos .html por aqui.', 'error')
      return
    }
    const text = await readDroppedFile(file)
    await loadDoc(text, null)
  })
}

function wireBus() {
  bus.on('vars', () => {})
}

/* ---------------- exports para testes ---------------- */

export {
  loadDoc,
  setMode,
  currentDoc,
  save,
  pushHistory,
  undo,
  redo,
  applyHistoryDoc,
  wireDevices,
  syncFromRuntime,
  getEditorValueLazy,
  initEditorLazy,
  ensureEditorModule,
}
