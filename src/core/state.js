// Estado único do app. Mutação só por funções daqui ou do app.js.

import { bus } from './bus.js'

export const state = {
  /** Documento HTML verdade (sem o runtime de edição dentro). */
  doc: '',
  /** Caminho no disco, ou null quando nunca salvo. */
  filePath: null,
  /** Alterações não salvas. */
  dirty: false,
  /** visual | code | split */
  mode: 'visual',
  /** desktop | tablet | phone */
  device: 'desktop',
  /** Moda olho: página como o visitante vê. */
  preview: false,
  /** Info do elemento selecionado (vinda do runtime). */
  selected: null,
  /** Painel aberto na gaveta: insert | animate | theme | templates | null */
  panel: 'insert',
  /** Rolagem suave ligada no documento. */
  smoothScroll: false,
  /** Tokens do documento quando carregado (para o botão restaurar). */
  originalTokens: {},
  /** Pilhas de desfazer/refazer (documentos serializados). */
  history: [],
  future: [],
  /** Inserção pendente para depois do próximo ready do runtime. */
  pendingInsert: null,
  /** Caminho a reselecionar depois de repintar. */
  pendingSelectPath: null,
  /** Recarrega do disco pendente de confirmação. */
  externalChange: false,
  recent: [],
}

export function markDirty(v = true) {
  state.dirty = v
  document.getElementById('dirtyDot').hidden = !v
  document.getElementById('saveBtn').textContent = v ? 'Salvar' : 'Salvar'
  bus.emit('dirty', v)
}

export function setFile(path) {
  state.filePath = path
  const name = path ? path.replace(/\\/g, '/').split('/').pop() : 'Sem título'
  document.getElementById('fileName').textContent = name
  document.getElementById('fileName').title = path || 'Documento sem nome'
}
