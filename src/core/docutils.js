// Manipulação do documento como texto: injeção dos blocos marcados
// data-olaria (utils CSS e motor de animação). O runtime de edição
// NÃO entra aqui — ele é injetado só no iframe e removido sozinho
// antes de serializar.

export function hasBlock(doc, attr) {
  return doc.includes(`data-olaria="${attr}"`)
}

function insertBeforeClose(html, closeTag, block, fallbackTag) {
  const re = new RegExp(`</${closeTag}>`, 'i')
  if (re.test(html)) return html.replace(re, `${block}\n</${closeTag}>`)
  const re2 = new RegExp(`</${fallbackTag}>`, 'i')
  if (re2.test(html)) return html.replace(re2, `${block}\n</${fallbackTag}>`)
  return html + block
}

export function injectUtils(doc, css) {
  // Idempotent: não injeta duas vezes o mesmo bloco
  if (hasBlock(doc, 'utils')) return doc
  const block = `<style data-olaria="utils">\n${css}\n</style>`
  return insertBeforeClose(doc, 'head', block, 'body')
}

export function injectAnim(doc, engineSource) {
  // Idempotent: não injeta duas vezes o mesmo bloco
  if (hasBlock(doc, 'anim')) return doc
  // Só o script: o estilo é criado pelo próprio motor quando roda.
  // (Um style vazio aqui só sujava o documento exportado.)
  const js = `<script data-olaria="anim">\n${engineSource}\n</script>`
  return insertBeforeClose(doc, 'body', js, 'html')
}
