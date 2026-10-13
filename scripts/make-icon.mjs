// Gera os ícones do app (PNG + ICO) sem nenhuma dependência:
// um PNG encoder mínimo com zlib do Node. A marca é o anel de
// cerâmica + base, igual ao da interface.

import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'src-tauri', 'icons')

/* ---------------- png ---------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function encodePng(width, height, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  const raw = Buffer.alloc(height * (width * 4 + 1))
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ---------------- desenho ---------------- */

function mix(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t)
}

function drawIcon(size) {
  const rgba = Buffer.alloc(size * size * 4)
  const SS = 3 // supersample
  const BG = [11, 11, 13]
  const AMBER = [255, 176, 0]

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0
      let g = 0
      let b = 0
      let a = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = (x + (sx + 0.5) / SS) / size
          const py = (y + (sy + 0.5) / SS) / size

          // fundo
          let color = [...BG]

          // anel (aro do pote)
          const cx = 0.5
          const cy = 0.42
          const ringOuter = 0.265
          const ringInner = 0.185
          const d = Math.hypot(px - cx, py - cy)
          if (d <= ringOuter && d >= ringInner) {
            const t = (d - ringInner) / (ringOuter - ringInner)
            const edge = Math.min(t, 1 - t) * 2 // 0 na borda, 1 no centro do traço
            color = mix(color, AMBER, Math.min(1, edge * 6))
          }

          // base
          const baseY = 0.775
          const halfW = 0.175
          const halfH = 0.038
          if (Math.abs(py - baseY) <= halfH && Math.abs(px - cx) <= halfW) {
            const ty = (halfH - Math.abs(py - baseY)) / halfH
            const tx = (halfW - Math.abs(px - cx)) / halfW
            color = mix(color, AMBER, Math.min(1, Math.min(ty, tx) * 6))
          }

          r += color[0]
          g += color[1]
          b += color[2]
          a += 255
        }
      }
      const n = SS * SS
      const i = (y * size + x) * 4
      rgba[i] = Math.round(r / n)
      rgba[i + 1] = Math.round(g / n)
      rgba[i + 2] = Math.round(b / n)
      rgba[i + 3] = Math.round(a / n)
    }
  }
  return rgba
}

function encodeIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)

  let offset = 6 + pngs.length * 16
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e[0] = size >= 256 ? 0 : size
    e[1] = size >= 256 ? 0 : size
    e[2] = 0
    e[3] = 0
    e.writeUInt16LE(1, 4)
    e.writeUInt16LE(32, 6)
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

/* ---------------- main ---------------- */

mkdirSync(outDir, { recursive: true })

const sizes = process.argv.slice(2).map(Number).filter(Boolean)
const wanted = sizes.length ? sizes : [16, 24, 32, 48, 64, 128, 256]

const pngs = []
for (const size of wanted) {
  const data = encodePng(size, size, drawIcon(size))
  pngs.push({ size, data })
}

writeFileSync(join(outDir, '32x32.png'), pngs.find((p) => p.size === 32)?.data ?? pngs[0].data)
writeFileSync(
  join(outDir, '128x128.png'),
  pngs.find((p) => p.size === 128)?.data ?? pngs[0].data
)
writeFileSync(
  join(outDir, '128x128@2x.png'),
  pngs.find((p) => p.size === 256)?.data ?? pngs[0].data
)
writeFileSync(
  join(outDir, 'icon.ico'),
  encodeIco(pngs.filter((p) => [16, 24, 32, 48, 64, 128, 256].includes(p.size)))
)

console.log(`Ícones escritos em ${outDir} (${wanted.join(', ')})`)
