// Gaveta de Tema: um painel para mexer nos tokens de cor, fonte e
// forma de toda a página de uma vez. Feito para quem não quer
// escrever CSS — e com aviso de contraste para não deixar o site
// ilegível sem perceber.

import { send, getVars } from './preview.js'
import { bus } from '../core/bus.js'
import { state } from '../core/state.js'

const drawer = document.getElementById('drawer')

const TOKENS = [
  { name: '--olaria-bg', label: 'Fundo da página' },
  { name: '--olaria-surface', label: 'Cartões e faixas' },
  { name: '--olaria-text', label: 'Texto principal' },
  { name: '--olaria-muted', label: 'Texto secundário' },
  { name: '--olaria-border', label: 'Bordas' },
  { name: '--olaria-primary', label: 'Cor de ação' },
  { name: '--olaria-on-primary', label: 'Texto sobre a ação' },
  { name: '--olaria-accent', label: 'Destaque' },
]

const FONTS = [
  ['', 'Padrão do modelo'],
  ['system-ui, "Segoe UI", Roboto, sans-serif', 'Sistema (sem serifa)'],
  ['Georgia, "Times New Roman", serif', 'Serifa'],
  ['ui-monospace, "Cascadia Mono", Consolas, monospace', 'Monoespaçada'],
  ['"Trebuchet MS", Verdana, sans-serif', 'Humanizada'],
]

export const THEME_TOKENS = TOKENS.map((t) => t.name)

function luminance(hex) {
  const c = hex.replace('#', '')
  const rgb = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255)
  const lin = rgb.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
}

function contrast(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

function row(label, control) {
  const r = document.createElement('div')
  r.className = 'prop-row'
  const l = document.createElement('label')
  l.textContent = label
  const g = document.createElement('div')
  g.className = 'grow'
  g.appendChild(control)
  r.append(l, g)
  return r
}

function colorField(token, initial, onChange) {
  const wrap = document.createElement('div')
  wrap.className = 'color-row'
  const input = document.createElement('input')
  input.type = 'color'
  input.value = initial
  const hex = document.createElement('input')
  hex.className = 'input hex-text'
  hex.value = initial
  const apply = (value) => {
    send({ type: 'setVar', name: token, value })
    bus.emit('theme:changed')
    onChange()
  }
  input.addEventListener('input', () => {
    hex.value = input.value
    apply(input.value)
  })
  hex.addEventListener('change', () => {
    const v = hex.value.trim()
    if (/^#[0-9a-f]{6}$/i.test(v)) {
      input.value = v
      apply(v)
    }
  })
  const clear = document.createElement('button')
  clear.className = 'icon-btn'
  clear.style.width = '26px'
  clear.style.height = '26px'
  clear.textContent = '×'
  clear.title = 'Voltar à cor do modelo'
  clear.setAttribute('aria-label', 'voltar à cor do modelo')
  clear.addEventListener('click', () => {
    const original = state.originalTokens[token]
    if (original && /^#[0-9a-f]{6}$/i.test(original)) {
      input.value = original
      hex.value = original
      send({ type: 'setVar', name: token, value: original })
      bus.emit('theme:changed')
      onChange()
    }
  })
  wrap.append(input, hex, clear)
  return { wrap, input, hex }
}

export function renderThemePanel() {
  drawer.innerHTML = ''

  const intro = document.createElement('p')
  intro.className = 'drawer-note'
  intro.innerHTML =
    'Estas cores valem para <strong>a página inteira</strong>. Escolha com calma: o aviso de contraste abaixo mostra se o texto continua fácil de ler.'
  drawer.appendChild(intro)

  const colorsGroup = document.createElement('div')
  colorsGroup.className = 'prop-group'
  const t = document.createElement('h4')
  t.textContent = 'Cores'
  colorsGroup.appendChild(t)
  const fields = {}
  TOKENS.forEach((token) => {
    const f = colorField(token.name, '#000000', updateReadout)
    fields[token.name] = f
    colorsGroup.appendChild(row(token.label, f.wrap))
  })
  drawer.appendChild(colorsGroup)

  const readout = document.createElement('p')
  readout.className = 'drawer-note'
  readout.style.fontFamily = 'var(--mono)'
  drawer.appendChild(readout)

  function updateReadout() {
    const bg = fields['--olaria-bg'].hex.value
    const text = fields['--olaria-text'].hex.value
    const primary = fields['--olaria-primary'].hex.value
    const onPrimary = fields['--olaria-on-primary'].hex.value
    const c1 = contrast(text, bg)
    const c2 = contrast(onPrimary, primary)
    const line1 = c1 >= 4.5 ? `texto ${c1.toFixed(1)}:1 ✓` : `texto ${c1.toFixed(1)}:1 — difícil de ler`
    const line2 = c2 >= 4.5 ? `botão ${c2.toFixed(1)}:1 ✓` : `botão ${c2.toFixed(1)}:1 — difícil de ler`
    readout.textContent = `Contraste — ${line1} · ${line2}`
    readout.style.color = c1 >= 4.5 && c2 >= 4.5 ? 'var(--text-2)' : '#ffb000'
  }

  const typeGroup = document.createElement('div')
  typeGroup.className = 'prop-group'
  const th = document.createElement('h4')
  th.textContent = 'Tipografia e forma'
  typeGroup.appendChild(th)

  const fontSel = document.createElement('select')
  fontSel.className = 'input'
  FONTS.forEach(([value, label]) => {
    const o = document.createElement('option')
    o.value = value
    o.textContent = label
    fontSel.appendChild(o)
  })
  fontSel.addEventListener('change', () => {
    if (fontSel.value) send({ type: 'setVar', name: '--olaria-font', value: fontSel.value })
    bus.emit('theme:changed')
  })
  typeGroup.appendChild(row('Fonte', fontSel))

  const radius = document.createElement('div')
  radius.className = 'color-row'
  radius.style.gap = '10px'
  const radiusRange = document.createElement('input')
  radiusRange.type = 'range'
  radiusRange.min = '0'
  radiusRange.max = '28'
  radiusRange.step = '1'
  const radiusVal = document.createElement('span')
  radiusVal.className = 'range-val'
  radiusRange.addEventListener('input', () => {
    radiusVal.textContent = `${radiusRange.value}px`
    send({ type: 'setVar', name: '--olaria-radius', value: `${radiusRange.value}px` })
    bus.emit('theme:changed')
  })
  radius.append(radiusRange, radiusVal)
  typeGroup.appendChild(row('Cantos', radius))

  const maxRange = document.createElement('input')
  maxRange.type = 'range'
  maxRange.min = '40'
  maxRange.max = '96'
  maxRange.step = '1'
  const maxVal = document.createElement('span')
  maxVal.className = 'range-val'
  maxRange.addEventListener('input', () => {
    maxVal.textContent = `${maxRange.value}rem`
    send({ type: 'setVar', name: '--olaria-max', value: `${maxRange.value}rem` })
    bus.emit('theme:changed')
  })
  typeGroup.appendChild(row('Largura do conteúdo', (() => {
    const w = document.createElement('div')
    w.className = 'color-row'
    w.style.gap = '10px'
    w.append(maxRange, maxVal)
    return w
  })()))
  drawer.appendChild(typeGroup)

  const restore = document.createElement('button')
  restore.className = 'btn'
  restore.style.marginTop = '14px'
  restore.textContent = 'Voltar às cores do modelo'
  restore.addEventListener('click', () => {
    const names = Object.keys(state.originalTokens)
    send({ type: 'removeVars', names })
    bus.emit('theme:changed')
    setTimeout(() => requestVars(), 60)
  })
  drawer.appendChild(restore)

  function requestVars() {
    const names = TOKENS.map((tk) => tk.name).concat(['--olaria-font', '--olaria-radius', '--olaria-max'])
    getVars(names)
    setTimeout(() => {
      if (!varsReceived) getVars(names)
    }, 500)
  }

  let varsReceived = false

  const off = bus.on('vars', (map) => {
    TOKENS.forEach((token) => {
      const v = map[token.name]
      if (v && /^#[0-9a-f]{6}$/i.test(v)) {
        fields[token.name].input.value = v
        fields[token.name].hex.value = v
      }
    })
    if (map['--olaria-font']) {
      const found = FONTS.find(([v]) => v && v.replace(/\s+/g, ' ').trim() === map['--olaria-font'].replace(/\s+/g, ' ').trim())
      fontSel.value = found ? found[0] : ''
    }
    const radiusV = parseInt(map['--olaria-radius'], 10)
    if (Number.isFinite(radiusV)) {
      radiusRange.value = String(radiusV)
      radiusVal.textContent = `${radiusV}px`
    }
    const maxV = parseInt(map['--olaria-max'], 10)
    if (Number.isFinite(maxV)) {
      maxRange.value = String(maxV)
      maxVal.textContent = `${maxV}rem`
    }
    updateReadout()
    off()
  })

  requestVars()
}
