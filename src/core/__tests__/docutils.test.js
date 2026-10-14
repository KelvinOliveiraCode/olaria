import { describe, it, expect } from 'vitest'
import { hasBlock, injectUtils, injectAnim } from '../docutils.js'

const minimalHtml = `<!DOCTYPE html>
<html>
<head></head>
<body></body>
</html>`

const htmlWithHead = `<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>Content</body>
</html>`

const htmlWithBodyOnly = `<!DOCTYPE html>
<html>
<body>Content</body>
</html>`

describe('docutils.js', () => {
  describe('hasBlock', () => {
    it('returns false when marker is absent', () => {
      expect(hasBlock(minimalHtml, 'anim')).toBe(false)
      expect(hasBlock(minimalHtml, 'utils')).toBe(false)
    })

    it('returns true when marker is present', () => {
      const withAnim = injectAnim(minimalHtml, 'const x = 1')
      const withUtils = injectUtils(minimalHtml, 'body { color: red }')
      expect(hasBlock(withAnim, 'anim')).toBe(true)
      expect(hasBlock(withUtils, 'utils')).toBe(true)
    })

    it('distinguishes between different markers', () => {
      const withAnim = injectAnim(minimalHtml, 'const x = 1')
      const withUtils = injectUtils(minimalHtml, 'body { color: red }')
      expect(hasBlock(withAnim, 'anim')).toBe(true)
      expect(hasBlock(withAnim, 'utils')).toBe(false)
      expect(hasBlock(withUtils, 'utils')).toBe(true)
      expect(hasBlock(withUtils, 'anim')).toBe(false)
    })
  })

  describe('injectUtils', () => {
    it('injects utils block when absent', () => {
      const css = 'body { color: red }'
      const result = injectUtils(minimalHtml, css)
      expect(result).toContain('data-olaria="utils"')
      expect(result).toContain(css)
    })

    it('injects before </head> when head exists', () => {
      const css = 'body { color: red }'
      const result = injectUtils(htmlWithHead, css)
      expect(result).toMatch(/<style data-olaria="utils">[\s\S]*<\/style>\s*<\/head>/i)
    })

    it('injects before </body> when head missing but body exists', () => {
      const css = 'body { color: red }'
      const result = injectUtils(htmlWithBodyOnly, css)
      expect(result).toMatch(/<style data-olaria="utils">[\s\S]*<\/style>\s*<\/body>/i)
    })

    it('is idempotent — calling twice does not double-inject', () => {
      const css = 'body { color: red }'
      const once = injectUtils(minimalHtml, css)
      const twice = injectUtils(once, css)
      // Count occurrences of the marker
      const matches = twice.match(/data-olaria="utils"/g)
      expect(matches).toHaveLength(1)
    })

    it('preserves existing utils block content on second inject', () => {
      const css1 = 'body { color: red }'
      const css2 = 'body { color: blue }'
      const once = injectUtils(minimalHtml, css1)
      const twice = injectUtils(once, css2)
      // Should keep the first CSS, not replace with second
      expect(twice).toContain(css1)
      expect(twice).not.toContain(css2)
    })
  })

  describe('injectAnim', () => {
    it('injects anim block when absent', () => {
      const engine = 'const engine = 1'
      const result = injectAnim(minimalHtml, engine)
      expect(result).toContain('data-olaria="anim"')
      expect(result).toContain(engine)
    })

    it('injects before </body> when body exists', () => {
      const engine = 'const engine = 1'
      const result = injectAnim(htmlWithHead, engine)
      expect(result).toMatch(/<script data-olaria="anim">[\s\S]*<\/script>\s*<\/body>/i)
    })

    it('injects before </html> when body missing but html exists', () => {
      const noBody = `<!DOCTYPE html>
<html>
<head></head>
</html>`
      const engine = 'const engine = 1'
      const result = injectAnim(noBody, engine)
      expect(result).toMatch(/<script data-olaria="anim">[\s\S]*<\/script>\s*<\/html>/i)
    })

    it('appends to end when neither body nor html closing tags exist', () => {
      const fragment = '<div>content</div>'
      const engine = 'const engine = 1'
      const result = injectAnim(fragment, engine)
      // insertBeforeClose appends block directly without leading newline when no close tags found
      expect(result).toBe(fragment + `<script data-olaria="anim">\n${engine}\n</script>`)
    })

    it('is idempotent — calling twice does not double-inject', () => {
      const engine = 'const engine = 1'
      const once = injectAnim(minimalHtml, engine)
      const twice = injectAnim(once, engine)
      const matches = twice.match(/data-olaria="anim"/g)
      expect(matches).toHaveLength(1)
    })

    it('preserves existing anim block content on second inject', () => {
      const engine1 = 'const engine = 1'
      const engine2 = 'const engine = 2'
      const once = injectAnim(minimalHtml, engine1)
      const twice = injectAnim(once, engine2)
      expect(twice).toContain(engine1)
      expect(twice).not.toContain(engine2)
    })
  })

  describe('idempotency combined', () => {
    it('injecting both utils and anim twice each does not duplicate', () => {
      const css = 'body { color: red }'
      const engine = 'const engine = 1'
      let html = minimalHtml
      html = injectUtils(html, css)
      html = injectAnim(html, engine)
      html = injectUtils(html, css)
      html = injectAnim(html, engine)
      
      const utilsMatches = html.match(/data-olaria="utils"/g)
      const animMatches = html.match(/data-olaria="anim"/g)
      expect(utilsMatches).toHaveLength(1)
      expect(animMatches).toHaveLength(1)
    })
  })
})