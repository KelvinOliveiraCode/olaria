import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { rewriteForPreview, restoreForSave } from '../assets.js'

// Mock the Tauri API and store
vi.mock('@tauri-apps/api/core', () => ({
  convertFileSrc: vi.fn((path) => `asset://localhost/${path}`)
}))

vi.mock('../store.js', () => ({
  isTauri: true
}))

import { convertFileSrc } from '@tauri-apps/api/core'
import { isTauri } from '../store.js'

describe('assets.js', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock behavior
    convertFileSrc.mockImplementation((path) => `asset://localhost/${path}`)
  })

  describe('rewriteForPreview', () => {
    it('returns original html and null map when filePath is null', async () => {
      const html = '<img src="./image.png">'
      const result = rewriteForPreview(html, null)
      
      expect(result.html).toBe(html)
      expect(result.map).toBeNull()
    })

    it('rewrites relative src paths', async () => {
      const html = '<img src="./image.png">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toContain('asset://localhost/')
      expect(result.html).not.toContain('./image.png')
      expect(result.map).not.toBeNull()
      expect(result.map.size).toBeGreaterThan(0)
    })

    it('rewrites relative href paths', async () => {
      const html = '<a href="../style.css">Link</a>'
      const result = rewriteForPreview(html, '/project/sub/page.html')
      
      expect(result.html).toContain('asset://localhost/')
      expect(result.map).not.toBeNull()
    })

    it('rewrites relative poster paths', async () => {
      const html = '<video poster="./poster.jpg"></video>'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toContain('asset://localhost/')
      expect(result.map).not.toBeNull()
    })

    it('rewrites url() in CSS', async () => {
      const html = '<style>body { background: url("./bg.png") }</style>'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toContain('asset://localhost/')
      expect(result.map).not.toBeNull()
    })

    it('does NOT rewrite http:// URLs', async () => {
      const html = '<img src="http://example.com/image.png">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite https:// URLs', async () => {
      const html = '<img src="https://example.com/image.png">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite data: URLs', async () => {
      const html = '<img src="data:image/png;base64,abc123">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite blob: URLs', async () => {
      const html = '<img src="blob:https://example.com/abc123">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite #anchor URLs', async () => {
      const html = '<a href="#section">Link</a>'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite mailto: URLs', async () => {
      const html = '<a href="mailto:test@example.com">Email</a>'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite tel: URLs', async () => {
      const html = '<a href="tel:+5511999999999">Call</a>'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite absolute paths starting with /', async () => {
      const html = '<img src="/images/logo.png">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('does NOT rewrite ftp:// URLs', async () => {
      const html = '<img src="ftp://server/img.png">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map.size).toBe(0)
    })

    it('handles multiple relative URLs in one document', async () => {
      const html = `
        <img src="./img1.png">
        <a href="../style.css">Style</a>
        <video poster="./poster.jpg"></video>
        <style>body { background: url("./bg.png") }</style>
      `
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.map.size).toBeGreaterThan(0)
      // All should be rewritten to asset:// protocol
      expect(result.html).not.toContain('./img1.png')
      expect(result.html).not.toContain('../style.css')
      expect(result.html).not.toContain('./poster.jpg')
      expect(result.html).not.toContain('./bg.png')
    })

    it('handles nested relative paths correctly', async () => {
      const html = '<img src="../../images/photo.jpg">'
      const result = rewriteForPreview(html, '/project/deep/nested/page.html')
      
      expect(result.html).toContain('asset://localhost/')
      expect(result.map).not.toBeNull()
      // The map should contain the original relative path
      const rewrittenUrl = Array.from(result.map.keys())[0]
      expect(result.map.get(rewrittenUrl)).toBe('../../images/photo.jpg')
    })

    it('handles Windows-style file paths', async () => {
      const html = '<img src="./image.png">'
      const result = rewriteForPreview(html, 'C:\\project\\page.html')
      
      expect(result.html).toContain('asset://localhost/')
      expect(result.map).not.toBeNull()
    })

    it('returns empty map (not null) when no relative URLs found in Tauri', async () => {
      const html = '<img src="https://example.com/image.png">'
      const result = rewriteForPreview(html, '/project/page.html')
      
      expect(result.html).toBe(html)
      expect(result.map).not.toBeNull()
      expect(result.map.size).toBe(0)
    })
  })

  describe('restoreForSave', () => {
    it('returns original html when map is null', () => {
      const html = '<img src="asset://localhost/image.png">'
      const result = restoreForSave(html, null)
      expect(result).toBe(html)
    })

    it('returns original html when map is empty', () => {
      const html = '<img src="asset://localhost/image.png">'
      const result = restoreForSave(html, new Map())
      expect(result).toBe(html)
    })

    it('restores rewritten URLs to original relative paths', () => {
      const map = new Map()
      map.set('asset://localhost/project/image.png', './image.png')
      map.set('asset://localhost/project/style.css', '../style.css')
      
      const html = '<img src="asset://localhost/project/image.png"><link href="asset://localhost/project/style.css">'
      const result = restoreForSave(html, map)
      
      expect(result).toContain('./image.png')
      expect(result).toContain('../style.css')
      expect(result).not.toContain('asset://localhost/')
    })

    it('handles round-trip: rewrite then restore', async () => {
      const originalHtml = '<img src="./photo.jpg"><a href="../style.css">Link</a>'
      const filePath = '/project/sub/page.html'
      
      const rewritten = rewriteForPreview(originalHtml, filePath)
      const restored = restoreForSave(rewritten.html, rewritten.map)
      
      expect(restored).toBe(originalHtml)
    })

    it('handles round-trip with CSS url()', async () => {
      const originalHtml = '<style>body { background: url("./bg.png") }</style>'
      const filePath = '/project/page.html'
      
      const rewritten = rewriteForPreview(originalHtml, filePath)
      const restored = restoreForSave(rewritten.html, rewritten.map)
      
      expect(restored).toBe(originalHtml)
    })

    it('restores both rewritten and HTML-entity-encoded versions when both in map', () => {
      const map = new Map()
      // rewriteForPreview adds both the raw URL and the HTML-entity-encoded version (& -> &)
      map.set('asset://localhost/project/image.png', './image.png')
      map.set('asset://localhost/project/image.png&', './image.png')
      
      const html = 'src="asset://localhost/project/image.png" src="asset://localhost/project/image.png&"'
      const result = restoreForSave(html, map)
      
      expect(result).toBe('src="./image.png" src="./image.png"')
    })

    it('does not affect non-matching URLs', () => {
      const map = new Map()
      map.set('asset://localhost/project/image.png', './image.png')
      
      const html = '<img src="asset://localhost/project/image.png"><img src="https://other.com/img.png">'
      const result = restoreForSave(html, map)
      
      expect(result).toContain('./image.png')
      expect(result).toContain('https://other.com/img.png')
    })
  })

  describe('isRelative helper (indirectly tested)', () => {
    it('treats ./ as relative', async () => {
      const result = rewriteForPreview('<img src="./img.png">', '/project/page.html')
      expect(result.map.size).toBeGreaterThan(0)
    })

    it('treats ../ as relative', async () => {
      const result = rewriteForPreview('<img src="../img.png">', '/project/page.html')
      expect(result.map.size).toBeGreaterThan(0)
    })

    it('treats bare filename as relative', async () => {
      const result = rewriteForPreview('<img src="img.png">', '/project/page.html')
      expect(result.map.size).toBeGreaterThan(0)
    })

    it('treats ftp:// as absolute (not relative)', async () => {
      const result = rewriteForPreview('<img src="ftp://server/img.png">', '/project/page.html')
      expect(result.map.size).toBe(0)
    })
  })
})