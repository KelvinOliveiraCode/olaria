// Páginas abertas de fora do Olaria podem referenciar arquivos
// vizinhos (style.css, img/foto.jpg). A pré-visualização roda num
// srcdoc, onde caminhos relativos não existem — então reescrevemos
// para o protocolo de assets do Tauri ao abrir, e desfazemos a
// reescrita ao salvar. Páginas de arquivo único não passam por aqui.

import { convertFileSrc } from '@tauri-apps/api/core'
import { isTauri } from '../core/store.js'

const ATTR_RE = /(href|src|poster)="([^"]+)"/g
const URL_RE = /url\((['"]?)([^'")]+)\1\)/g

function isRelative(value) {
  if (!value) return false
  return !/^([a-z][a-z0-9+.-]*:)?\/\//i.test(value) &&
    !value.startsWith('data:') &&
    !value.startsWith('blob:') &&
    !value.startsWith('#') &&
    !value.startsWith('mailto:') &&
    !value.startsWith('tel:') &&
    !value.startsWith('/')
}

function resolveUrl(value, dir) {
  const parts = dir.split('/')
  value.split('/').forEach((seg) => {
    if (seg === '.' || seg === '') return
    if (seg === '..') parts.pop()
    else parts.push(seg)
  })
  return parts.join('/')
}

export function rewriteForPreview(html, filePath) {
  if (!isTauri || !filePath) return { html, map: null }
  const dir = filePath.replace(/\\/g, '/').split('/').slice(0, -1).join('/')
  let prefix
  try {
    prefix = convertFileSrc(dir + '/')
  } catch {
    return { html, map: null }
  }
  if (!prefix.endsWith('/')) prefix += '/'

  const map = new Map()
  const convert = (value) => {
    if (!isRelative(value)) return value
    const absolute = resolveUrl(value.replace(/^\.\//, ''), dir)
    const rewritten = prefix + encodeURI(absolute).replace(/^\/+/, '')
    map.set(rewritten, value)
    map.set(rewritten.replace(/&/g, '&amp;'), value)
    return rewritten
  }

  const out = html
    .replace(ATTR_RE, (m, attr, value) => `${attr}="${convert(value)}"`)
    .replace(URL_RE, (m, q, value) => `url(${q}${convert(value)}${q})`)

  return { html: out, map }
}

export function restoreForSave(html, map) {
  if (!map || map.size === 0) return html
  let out = html
  for (const [rewritten, original] of map) {
    out = out.split(rewritten).join(original)
  }
  return out
}
