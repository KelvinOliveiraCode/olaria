// Painel de propriedades do elemento selecionado.
// Todos os controles mandam comandos para o runtime dentro do iframe;
// a página é a fonte da verdade e o código se sincroniza sozinho.

import { send, pageDocument } from './preview.js'
import { bus } from '../core/bus.js'
import { state } from '../core/state.js'
import { io } from '../core/store.js'

const panel = document.getElementById('props')
const crumb = document.getElementById('crumb')
const hint = document.getElementById('hint')

let renderedPath = null

/* ---------------- helpers ---------------- */

function toHex(color) {
  if (!color) return '#000000'
  if (color.startsWith('#')) {
    let c = color.slice(1)
    if (c.length === 3) c = c.split('').map((x) => x + x).join('')
    return `#${c.toLowerCase()}`
  }
  const m = color.match(/rgba?\(([^)]+)\)/)
  if (!m) return '#000000'
  const parts = m[1].split(',').map((p) => parseFloat(p))
  const hex = parts
    .slice(0, 3)
    .map((p) => Math.max(0, Math.min(255, Math.round(p))).toString(16).padStart(2, '0'))
    .join('')
  return `#${hex}`
}

function isTransparent(color) {
  if (!color) return true
  if (color === 'transparent') return true
  const m = color.match(/rgba\(([^)]+)\)/)
  return !!m && parseFloat(m[1].split(',')[3]) === 0
}

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text != null) node.textContent = text
  return node
}

function propRow(label, ...controls) {
  const row = el('div', 'prop-row')
  row.appendChild(el('label', null, label))
  const grow = el('div', 'grow')
  controls.forEach((c) => grow.appendChild(c))
  row.appendChild(grow)
  return row
}

function colorControl(prop, value) {
  const wrap = el('div', 'color-row')
  const input = document.createElement('input')
  input.type = 'color'
  input.value = toHex(isTransparent(value) ? '#000000' : value)
  const hex = document.createElement('input')
  hex.className = 'input hex-text'
  hex.value = input.value
  hex.setAttribute('aria-label', 'cor em hexadecimal')
  const clear = el('button', 'icon-btn', '×')
  clear.style.width = '26px'
  clear.style.height = '26px'
  clear.title = 'Remover esta cor'
  clear.setAttribute('aria-label', 'remover cor')
  input.addEventListener('input', () => {
    hex.value = input.value
    send({ type: 'setStyle', prop, value: input.value })
  })
  hex.addEventListener('change', () => {
    const v = hex.value.trim()
    if (/^#[0-9a-f]{6}$/i.test(v)) {
      input.value = v
      send({ type: 'setStyle', prop, value: v })
    }
  })
  clear.addEventListener('click', () => {
    send({ type: 'setStyle', prop, value: '' })
  })
  wrap.append(input, hex, clear)
  return wrap
}

function rangeControl(prop, value, { min, max, step, unit, fallback = 0 }) {
  const wrap = el('div', 'color-row')
  wrap.style.gap = '10px'
  const input = document.createElement('input')
  input.type = 'range'
  input.min = String(min)
  input.max = String(max)
  input.step = String(step)
  const parsed = parseFloat(value)
  input.value = String(Number.isFinite(parsed) ? parsed : fallback)
  const val = el('span', 'range-val', `${input.value}${unit}`)
  input.addEventListener('input', () => {
    val.textContent = `${input.value}${unit}`
    send({ type: 'setStyle', prop, value: `${input.value}${unit}` })
  })
  wrap.append(input, val)
  return wrap
}

function selectControl(prop, value, options, { clearable = false } = {}) {
  const sel = document.createElement('select')
  sel.className = 'input'
  if (clearable) {
    const o = document.createElement('option')
    o.value = ''
    o.textContent = 'Padrão'
    sel.appendChild(o)
  }
  options.forEach(([v, label]) => {
    const o = document.createElement('option')
    o.value = v
    o.textContent = label
    sel.appendChild(o)
  })
  sel.value = value || ''
  sel.addEventListener('change', () => {
    send({ type: 'setStyle', prop, value: sel.value })
  })
  return sel
}

function group(title, ...children) {
  const g = el('div', 'prop-group')
  g.appendChild(el('h4', null, title))
  children.forEach((c) => g.appendChild(c))
  return g
}

/* ---------------- render ---------------- */

export function renderProps(info) {
  if (!info) {
    renderedPath = null
    panel.innerHTML = ''
    const empty = el('div', 'props-empty')
    empty.innerHTML =
      '<strong>Nenhum elemento selecionado</strong>Clique em qualquer parte da página para editar textos, cores, tamanhos e posições. Arraste para mover. Duplo clique muda o texto.';
    panel.appendChild(empty)
    return
  }

  const key = info.path.join('.')
  const sameElement = key === renderedPath
  renderedPath = key

  // Não reconstroir o painel enquanto a pessoa mexe num campo dele.
  if (sameElement && panel.contains(document.activeElement)) {
    crumb.textContent = info.trail.join(' › ')
    return
  }

  panel.innerHTML = ''

  const head = el('div', 'props-head')
  const tag = el('span', 'el-tag', info.selector)
  head.appendChild(tag)
  head.appendChild(el('div', 'el-sub', `${info.rect.w} × ${info.rect.h} px · clique duas vezes na página para editar o texto no lugar`))
  panel.appendChild(head)

  const body = el('div', 'props-body')

  /* --- ação (botões e links) --- */
  const eBotao = info.tag === 'a' || info.tag === 'button'
  if (eBotao) body.appendChild(secaoAcao(info))

  /* --- texto --- */
  if (info.canText || info.text) {
    const ta = document.createElement('textarea')
    ta.className = 'input'
    ta.value = info.text
    ta.setAttribute('aria-label', 'Texto do elemento')
    let timer = null
    ta.addEventListener('input', () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const escaped = ta.value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>')
        send({ type: 'setText', html: escaped })
      }, 350)
    })
    body.appendChild(group('Texto', ta))
  }

  /* --- tipografia --- */
  body.appendChild(
    group(
      'Tipografia',
      propRow('Tamanho', rangeControl('font-size', info.style?.fontSize, { min: 10, max: 72, step: 1, unit: 'px', fallback: 16 })),
      propRow('Cor do texto', colorControl('color', info.style?.color)),
      propRow('Peso', selectControl('font-weight', info.style?.fontWeight, [
        ['300', 'Leve'],
        ['400', 'Normal'],
        ['500', 'Médio'],
        ['600', 'Seminegrito'],
        ['700', 'Negrito'],
        ['800', 'Extranegrito'],
      ])),
      propRow('Altura da linha', rangeControl('line-height', info.style?.lineHeight, { min: 1, max: 2.4, step: 0.05, unit: '', fallback: 1.5 })),
      propRow('Alinhamento', selectControl('text-align', info.style?.textAlign, [
        ['left', 'Esquerda'],
        ['center', 'Centro'],
        ['right', 'Direita'],
        ['justify', 'Justificado'],
      ]))
    )
  )

  /* --- caixa --- */
  body.appendChild(
    group(
      'Caixa e cor',
      propRow('Fundo', colorControl('background-color', info.style?.background)),
      propRow('Espaço interno', rangeControl('padding', info.style?.padding, { min: 0, max: 96, step: 2, unit: 'px', fallback: 0 })),
      propRow('Cantos', rangeControl('border-radius', info.style?.radius, { min: 0, max: 40, step: 1, unit: 'px', fallback: 0 })),
      propRow('Espaço acima', rangeControl('margin-top', info.style?.margin, { min: -32, max: 96, step: 2, unit: 'px', fallback: 0 })),
      propRow('Largura', selectControl('width', info.style?.width, [
        ['auto', 'Automática'],
        ['100%', 'Largura total'],
        ['80%', '80%'],
        ['60%', '60%'],
        ['50%', 'Metade'],
      ], { clearable: true }))
    )
  )

  /* --- posição --- */
  const posGroup = group(
    'Posição',
    propRow('Modo', selectControl('position', info.position, [
      ['static', 'No fluxo (padrão)'],
      ['relative', 'Relativo'],
      ['absolute', 'Livre na página'],
      ['fixed', 'Fixo na tela'],
    ]))
  )
  if (info.position === 'absolute' || info.position === 'fixed') {
    posGroup.appendChild(propRow('Topo', numberControl('top', 0, -400, 4000)))
    posGroup.appendChild(propRow('Esquerda', numberControl('left', 0, -400, 4000)))
  }
  body.appendChild(posGroup)

  /* --- imagem --- */
  if (info.tag === 'img') {
    const src = document.createElement('input')
    src.className = 'input'
    src.value = info.src.startsWith('data:') ? '' : info.src
    src.placeholder = 'https://... ou escolha um arquivo'
    src.setAttribute('aria-label', 'Endereço da imagem')
    src.addEventListener('change', () => send({ type: 'setAttr', name: 'src', value: src.value.trim() }))

    const pick = el('button', 'btn btn-small', 'Escolher arquivo…')
    pick.addEventListener('click', async () => {
      const img = await io.pickImage()
      if (img) send({ type: 'setAttr', name: 'src', value: img.dataUrl })
    })

    const alt = document.createElement('input')
    alt.className = 'input'
    alt.value = info.alt
    alt.placeholder = 'Descreva a imagem para quem não vê'
    alt.setAttribute('aria-label', 'Texto alternativo da imagem')
    alt.addEventListener('change', () => send({ type: 'setAttr', name: 'alt', value: alt.value }))

    const row1 = propRow('Imagem', src, pick)
    body.appendChild(group('Imagem', row1, propRow('Descrição', alt)))
  }

  /* --- iframe — */
  if (info.tag === 'iframe') {
    const src = document.createElement('input')
    src.className = 'input'
    src.value = info.src
    src.placeholder = 'https://...'
    src.setAttribute('aria-label', 'Endereço do conteúdo incorporado')
    src.addEventListener('change', () => send({ type: 'setAttr', name: 'src', value: src.value.trim() }))
    body.appendChild(group('Incorporado', propRow('Endereço', src)))
  }

  /* --- animação atual --- */
  const animRow = el('div', 'prop-row')
  animRow.appendChild(el('label', null, 'Animação'))
  const animGrow = el('div', 'grow')
  const animValue = el('span', 'range-val', info.anim || 'nenhuma')
  animValue.style.width = 'auto'
  animGrow.appendChild(animValue)
  const changeAnim = el('button', 'btn btn-small', 'Escolher')
  changeAnim.addEventListener('click', () => bus.emit('panel:open', 'animate'))
  animGrow.appendChild(changeAnim)
  animRow.appendChild(animGrow)
  body.appendChild(group('Animação', animRow))

  /* --- ações --- */
  const actions = group('Ações')
  const row1 = el('div', 'btn-row')
  const up = el('button', 'btn btn-small', 'Mover para cima')
  const down = el('button', 'btn btn-small', 'Mover para baixo')
  up.addEventListener('click', () => send({ type: 'moveDir', dir: 'up' }))
  down.addEventListener('click', () => send({ type: 'moveDir', dir: 'down' }))
  const row2 = el('div', 'btn-row')
  const dup = el('button', 'btn btn-small', 'Duplicar')
  const del = el('button', 'btn btn-small btn-danger', 'Remover')
  dup.addEventListener('click', () => send({ type: 'duplicateSelected' }))
  del.addEventListener('click', () => send({ type: 'removeSelected' }))
  row1.append(up, down)
  row2.append(dup, del)
  actions.append(row1, row2)
  body.appendChild(actions)

  panel.appendChild(body)
}

function numberControl(prop, fallback, min, max) {
  const input = document.createElement('input')
  input.type = 'number'
  input.className = 'input'
  input.min = String(min)
  input.max = String(max)
  input.value = String(fallback)
  input.setAttribute('aria-label', prop)
  input.addEventListener('change', () => {
    send({ type: 'setStyle', prop, value: `${input.value}px` })
  })
  return input
}

/* ---------------- ação do botão (modo editar) ---------------- */

const ACOES = [
  { id: 'rolar', nome: 'Rolar até um lugar da página' },
  { id: 'site', nome: 'Abrir um site' },
  { id: 'email', nome: 'Enviar e-mail' },
  { id: 'telefone', nome: 'Ligar' },
  { id: 'baixar', nome: 'Baixar arquivo' },
  { id: 'nenhuma', nome: 'Nenhuma ação' },
]

function acaoAtual(info) {
  const href = info.href || ''
  if (href.indexOf('mailto:') === 0) return 'email'
  if (href.indexOf('tel:') === 0) return 'telefone'
  if (info.download) return 'baixar'
  if (href.charAt(0) === '#' && href.length > 1) return 'rolar'
  if (/^https?:|\/\//i.test(href)) return 'site'
  return 'nenhuma'
}

function secoesDaPagina() {
  const doc = pageDocument()
  if (!doc) return []
  const fora = []
  const todos = doc.querySelectorAll('section[id], header[id], footer[id], div[id], main[id]')
  for (let i = 0; i < todos.length && fora.length < 30; i++) {
    const elDoc = todos[i]
    if (!elDoc.id) continue
    const h = elDoc.querySelector('h1, h2, h3')
    const rotulo = h ? (h.textContent || '').trim().slice(0, 40) : elDoc.tagName.toLowerCase()
    fora.push({ id: elDoc.id, rotulo })
  }
  return fora
}

function secaoAcao(info) {
  const g = group('O que esse botão faz')
  const atual = acaoAtual(info)

  const aviso = el('p', 'prop-note')
  if (info.tag === 'button') {
    aviso.textContent = 'Botões viram links de verdade ao receber uma ação — assim funcionam também no arquivo exportado.'
  } else {
    aviso.textContent = 'Escolha o que acontece quando o visitante clicar. No modo Visualizar você pode testar.'
  }
  g.appendChild(aviso)

  const escolha = el('div', 'acao-opcoes')
  ACOES.forEach((acao) => {
    const b = el('button', 'acao-opcao' + (atual === acao.id ? ' is-on' : ''), acao.nome)
    b.type = 'button'
    b.dataset.acao = acao.id
    if (atual === acao.id) b.setAttribute('aria-pressed', 'true')
    b.addEventListener('click', () => aplicarAcao(acao.id, g))
    escolha.appendChild(b)
  })
  g.appendChild(escolha)

  const campos = el('div', 'acao-campos')
  campos.dataset.acao = atual
  g.appendChild(campos)
  desenharCamposAcao(atual, campos, info)
  return g
}

function desenharCamposAcao(acao, box, info) {
  box.innerHTML = ''
  if (acao === 'rolar') {
    const secoes = secoesDaPagina()
    if (!secoes.length) {
      box.appendChild(el('p', 'prop-note', 'Esta página ainda não tem seções com nome. Crie uma seção primeiro.'))
      return
    }
    const sel = document.createElement('select')
    sel.className = 'input'
    const vazia = document.createElement('option')
    vazia.value = ''
    vazia.textContent = 'Escolha o destino…'
    sel.appendChild(vazia)
    secoes.forEach((s) => {
      const o = document.createElement('option')
      o.value = '#' + s.id
      o.textContent = s.rotulo
      sel.appendChild(o)
    })
    sel.value = (info.href || '').charAt(0) === '#' ? info.href : ''
    sel.addEventListener('change', () => definirHref(sel.value, {}))
    box.appendChild(sel)
    return
  }

  if (acao === 'site' || acao === 'baixar') {
    const input = document.createElement('input')
    input.className = 'input'
    input.type = 'text'
    input.placeholder = 'https://exemplo.com/pagina'
    input.value = /^https?:|\/\//i.test(info.href || '') ? info.href : ''
    input.setAttribute('aria-label', 'Endereço')
    input.addEventListener('change', () => definirHref(input.value.trim(), {}, acao === 'baixar'))
    box.appendChild(input)

    if (acao === 'site') {
      const linha = el('label', 'check')
      const cb = document.createElement('input')
      cb.type = 'checkbox'
      cb.checked = (info.target || '') === '_blank'
      const span = document.createElement('span')
      span.textContent = 'Abrir em nova aba'
      linha.append(cb, span)
      cb.addEventListener('change', () => definirHref(input.value.trim() || info.href, { target: cb.checked ? '_blank' : '' }))
      box.appendChild(linha)
    }
    return
  }

  if (acao === 'email' || acao === 'telefone') {
    const scheme = acao === 'email' ? 'mailto' : 'tel'
    const input = document.createElement('input')
    input.className = 'input'
    input.type = 'text'
    input.placeholder = acao === 'email' ? 'seu@email.com' : '+55 11 99999-9999'
    input.value = (info.href || '').replace(/^(mailto|tel):/, '')
    input.setAttribute('aria-label', acao === 'email' ? 'E-mail' : 'Telefone')
    input.addEventListener('change', () => {
      const bruto = input.value.trim()
      if (!bruto) return
      definirHref(scheme + ':' + bruto, {})
    })
    box.appendChild(input)
    return
  }

  box.appendChild(el('p', 'prop-note', 'O botão fica sem ação. Você pode escolher outra quando quiser.'))
}

/** Marca a opção escolhida e desenha os campos dela.
 *  A conversão de <button> para <a> acontece só quando o valor é
 *  aplicado — assim o usuário pode digitar antes. */
function aplicarAcao(acao, grupo) {
  if (!state.selected) return

  if (acao === 'nenhuma') {
    send({ type: 'setAttr', name: 'href', value: '' })
    send({ type: 'setAttr', name: 'target', value: '' })
    send({ type: 'setAttr', name: 'download', value: '' })
  }

  grupo.querySelectorAll('.acao-opcao').forEach((b) => {
    const on = b.dataset.acao === acao
    b.classList.toggle('is-on', on)
    if (on) b.setAttribute('aria-pressed', 'true')
    else b.removeAttribute('aria-pressed')
  })
  desenharCamposAcao(acao, grupo.querySelector('.acao-campos'), state.selected)
}

function definirHref(href, attrs, download) {
  if (!state.selected) return
  const aplicar = () => {
    send({ type: 'setAttr', name: 'href', value: href })
    Object.entries(attrs).forEach(([k, v]) => send({ type: 'setAttr', name: k, value: v }))
    send({ type: 'setAttr', name: 'download', value: download ? '' : '' })
  }
  if (state.selected.tag === 'button') {
    send({ type: 'convertToLink' })
    setTimeout(aplicar, 280)
    return
  }
  aplicar()
}
/* ---------------- ligação ---------------- */

export function initProps() {
  bus.on('selected', renderProps)
  bus.on('deselected', () => renderProps(null))
  bus.on('vars', () => {})
}

export function propsHint() {
  hint.textContent = 'Delete remove · Alt+setas move entre irmãos · duplo clique edita o texto'
}

export function defaultHint() {
  hint.textContent = 'Clique em um elemento para editar. Arraste para mover. Duplo clique muda o texto.'
}
