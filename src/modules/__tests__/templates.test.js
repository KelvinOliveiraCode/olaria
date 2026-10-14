import { describe, it, expect } from 'vitest'
import { templates, getTemplate, blankPage } from '../templates.js'

describe('templates.js', () => {
  describe('templates registry', () => {
    it('has at least one template', () => {
      expect(templates.length).toBeGreaterThan(0)
    })

    it('every template has required properties', () => {
      for (const t of templates) {
        expect(t).toHaveProperty('id')
        expect(t).toHaveProperty('name')
        expect(t).toHaveProperty('summary')
        expect(t).toHaveProperty('tags')
        expect(t).toHaveProperty('build')
        expect(typeof t.id).toBe('string')
        expect(t.id.length).toBeGreaterThan(0)
        expect(typeof t.name).toBe('string')
        expect(t.name.length).toBeGreaterThan(0)
        expect(typeof t.build).toBe('function')
        expect(Array.isArray(t.tags)).toBe(true)
      }
    })

    it('every template id is unique', () => {
      const ids = templates.map(t => t.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('getTemplate', () => {
    it('returns template for every registered id', () => {
      for (const t of templates) {
        const found = getTemplate(t.id)
        expect(found).not.toBeNull()
        expect(found.id).toBe(t.id)
      }
    })

    it('returns null for unknown id', () => {
      expect(getTemplate('non-existent-id')).toBeNull()
      expect(getTemplate('')).toBeNull()
    })
  })

  describe('template build() output', () => {
    it('every template build() returns a string', () => {
      for (const t of templates) {
        const html = t.build()
        expect(typeof html).toBe('string')
        expect(html.length).toBeGreaterThan(0)
      }
    })

    it('every template build() produces valid-ish HTML with doctype or html tag', () => {
      for (const t of templates) {
        const html = t.build()
        const hasDoctype = /<!doctype html>/i.test(html)
        const hasHtmlTag = /<html/i.test(html)
        expect(hasDoctype || hasHtmlTag).toBe(true)
      }
    })

    it('every template build() produces HTML containing a <title>', () => {
      for (const t of templates) {
        const html = t.build()
        expect(/<title>/i.test(html)).toBe(true)
        // Title should have content
        expect(/<title>[\s\S]*<\/title>/i.test(html)).toBe(true)
      }
    })

    it('every template build() produces HTML with at least one <section> or semantic element', () => {
      for (const t of templates) {
        const html = t.build()
        const hasSection = /<section/i.test(html)
        const hasMain = /<main/i.test(html)
        const hasArticle = /<article/i.test(html)
        const hasHeader = /<header/i.test(html)
        const hasFooter = /<footer/i.test(html)
        const hasNav = /<nav/i.test(html)
        const hasAside = /<aside/i.test(html)
        expect(hasSection || hasMain || hasArticle || hasHeader || hasFooter || hasNav || hasAside).toBe(true)
      }
    })

    it('no template build() throws', () => {
      for (const t of templates) {
        expect(() => t.build()).not.toThrow()
      }
    })

    it('template output contains olaria CSS variables', () => {
      for (const t of templates) {
        const html = t.build()
        expect(html).toContain('--olaria-')
      }
    })

    it('template output contains viewport meta tag', () => {
      for (const t of templates) {
        const html = t.build()
        expect(/<meta name="viewport"/i.test(html)).toBe(true)
      }
    })

    it('template output contains charset meta tag', () => {
      for (const t of templates) {
        const html = t.build()
        expect(/<meta charset=/i.test(html)).toBe(true)
      }
    })
  })

  describe('blankPage', () => {
    it('returns a string', () => {
      const html = blankPage()
      expect(typeof html).toBe('string')
      expect(html.length).toBeGreaterThan(0)
    })

    it('produces valid minimal document with doctype', () => {
      const html = blankPage()
      expect(/<!doctype html>/i.test(html)).toBe(true)
    })

    it('contains html, head, and body tags', () => {
      const html = blankPage()
      expect(/<html/i.test(html)).toBe(true)
      expect(/<head>/i.test(html)).toBe(true)
      expect(/<body>/i.test(html)).toBe(true)
    })

    it('contains title with default text', () => {
      const html = blankPage()
      expect(/<title>Minha p[áa]gina<\/title>/i.test(html)).toBe(true)
    })

    it('contains viewport meta tag', () => {
      const html = blankPage()
      expect(/<meta name="viewport"/i.test(html)).toBe(true)
    })

    it('contains charset meta tag', () => {
      const html = blankPage()
      expect(/<meta charset=/i.test(html)).toBe(true)
    })

    it('contains olaria CSS variables', () => {
      const html = blankPage()
      expect(html).toContain('--olaria-')
    })

    it('contains at least one section element', () => {
      const html = blankPage()
      expect(/<section/i.test(html)).toBe(true)
    })

    it('does not throw', () => {
      expect(() => blankPage()).not.toThrow()
    })
  })

  describe('specific template smoke checks', () => {
    // Test a few known templates by id to ensure they're properly registered
    const knownIds = ['lancamento', 'portfolio', 'evento', 'negocio-local', 'captura', 'em-breve', 'links', 'curriculo', 'produto', 'ong', 'casamento']
    
    for (const id of knownIds) {
      it(`template "${id}" exists and builds`, () => {
        const t = getTemplate(id)
        expect(t).not.toBeNull()
        if (t) {
          const html = t.build()
          expect(html).toContain('<!DOCTYPE html>')
          expect(html).toContain('<title>')
          expect(/<section|<main|<article/i.test(html)).toBe(true)
        }
      })
    }
  })
})