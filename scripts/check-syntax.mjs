// Verifica a sintaxe de todos os arquivos-fonte com o parser do
// esbuild (o mesmo do Vite). Rápido e sem precisar buildar.

import { transform } from 'esbuild'
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (/\.(js|mjs|css)$/.test(entry)) yield full
  }
}

let errors = 0
let checked = 0

for (const file of walk(join(root, 'src'))) {
  checked++
  const code = readFileSync(file, 'utf8')
  const loader = file.endsWith('.css') ? 'css' : 'js'
  try {
    await transform(code, { loader })
  } catch (err) {
    errors++
    console.error(`✗ ${relative(root, file)}`)
    for (const e of err.errors || []) {
      console.error(`   ${e.location?.line}:${e.location?.column} ${e.text}`)
    }
  }
}

for (const file of walk(join(root, 'scripts'))) {
  if (!file.endsWith('.mjs')) continue
  checked++
  const code = readFileSync(file, 'utf8')
  try {
    await transform(code, { loader: 'js' })
  } catch (err) {
    errors++
    console.error(`✗ ${relative(root, file)}`)
    console.error(err.message)
  }
}

console.log(errors ? `${errors} arquivo(s) com erro` : `ok — ${checked} arquivos sem erro de sintaxe`)
process.exit(errors ? 1 : 0)
