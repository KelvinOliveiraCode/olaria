import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { JSDOM } from 'jsdom'
import { state, markDirty, setFile } from '../state.js'

describe('state.js', () => {
  let dom
  let document
  let window

  beforeEach(() => {
    // Set up jsdom with the elements that state.js expects
    dom = new JSDOM(`<!DOCTYPE html>
<html>
<body>
  <span id="dirtyDot" hidden></span>
  <button id="saveBtn">Salvar</button>
  <span id="fileName"></span>
</body>
</html>`, {
      url: 'http://localhost',
      pretendToBeVisual: true
    })
    
    document = dom.window.document
    window = dom.window
    
    // Set globals
    global.document = document
    global.window = window
    global.HTMLElement = window.HTMLElement
    global.Element = window.Element
    global.Node = window.Node
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete global.document
    delete global.window
    delete global.HTMLElement
    delete global.Element
    delete global.Node
  })

  describe('initial state', () => {
    it('has expected initial values', () => {
      expect(state.doc).toBe('')
      expect(state.filePath).toBeNull()
      expect(state.dirty).toBe(false)
      expect(state.mode).toBe('visual')
      expect(state.device).toBe('desktop')
      expect(state.preview).toBe(false)
      expect(state.selected).toBeNull()
      expect(state.panel).toBe('insert')
      expect(state.smoothScroll).toBe(false)
      expect(state.originalTokens).toEqual({})
      expect(state.history).toEqual([])
      expect(state.future).toEqual([])
      expect(state.pendingInsert).toBeNull()
      expect(state.pendingSelectPath).toBeNull()
      expect(state.externalChange).toBe(false)
      expect(state.recent).toEqual([])
    })
  })

  describe('markDirty', () => {
    it('sets dirty to true and shows dirtyDot', () => {
      markDirty(true)
      expect(state.dirty).toBe(true)
      expect(document.getElementById('dirtyDot').hidden).toBe(false)
    })

    it('sets dirty to false and hides dirtyDot', () => {
      markDirty(true)
      markDirty(false)
      expect(state.dirty).toBe(false)
      expect(document.getElementById('dirtyDot').hidden).toBe(true)
    })

    it('defaults to true when called without argument', () => {
      markDirty()
      expect(state.dirty).toBe(true)
      expect(document.getElementById('dirtyDot').hidden).toBe(false)
    })

    it('updates saveBtn textContent', () => {
      markDirty(true)
      expect(document.getElementById('saveBtn').textContent).toBe('Salvar')
      markDirty(false)
      expect(document.getElementById('saveBtn').textContent).toBe('Salvar')
    })
  })

  describe('setFile', () => {
    it('sets filePath and updates fileName element', () => {
      setFile('/path/to/file.html')
      expect(state.filePath).toBe('/path/to/file.html')
      expect(document.getElementById('fileName').textContent).toBe('file.html')
      expect(document.getElementById('fileName').title).toBe('/path/to/file.html')
    })

    it('handles Windows paths', () => {
      setFile('C:\\Users\\Name\\project\\page.html')
      expect(state.filePath).toBe('C:\\Users\\Name\\project\\page.html')
      expect(document.getElementById('fileName').textContent).toBe('page.html')
      expect(document.getElementById('fileName').title).toBe('C:\\Users\\Name\\project\\page.html')
    })

    it('shows "Sem título" when path is null', () => {
      setFile(null)
      expect(state.filePath).toBeNull()
      expect(document.getElementById('fileName').textContent).toBe('Sem título')
      expect(document.getElementById('fileName').title).toBe('Documento sem nome')
    })

    it('handles paths with forward slashes', () => {
      setFile('/home/user/project/index.html')
      expect(document.getElementById('fileName').textContent).toBe('index.html')
    })

    it('handles filename with no path', () => {
      setFile('page.html')
      expect(document.getElementById('fileName').textContent).toBe('page.html')
    })
  })

  describe('error handling', () => {
    it('markDirty does not throw when elements are missing', () => {
      // Remove elements
      document.getElementById('dirtyDot').remove()
      document.getElementById('saveBtn').remove()
      
      // Should not throw
      expect(() => markDirty(true)).not.toThrow()
      expect(() => markDirty(false)).not.toThrow()
    })

    it('setFile does not throw when fileName element is missing', () => {
      document.getElementById('fileName').remove()
      
      expect(() => setFile('/path/to/file.html')).not.toThrow()
      expect(() => setFile(null)).not.toThrow()
    })
  })
})