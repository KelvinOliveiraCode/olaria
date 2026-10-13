// Editor de código (CodeMirror 6) com tema escuro de alto contraste.

import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { search, searchKeymap } from '@codemirror/search'

const chrome = EditorView.theme(
  {
    '&': { backgroundColor: '#050506', color: '#fafafa', height: '100%' },
    '.cm-content': {
      caretColor: '#ffb000',
      fontFamily: 'ui-monospace, "Cascadia Mono", Consolas, "Courier New", monospace',
      fontSize: '13px',
      lineHeight: '1.55',
      padding: '10px 0',
      maxWidth: '100%',
    },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#ffb000' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: 'rgba(255,176,0,.22)',
    },
    '.cm-gutters': {
      backgroundColor: '#0b0b0d',
      color: '#5a5a64',
      border: 'none',
      borderRight: '1px solid #1f1f25',
    },
    '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,.028)' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(255,255,255,.05)', color: '#b6b6bf' },
    '.cm-panels': {
      backgroundColor: '#101014',
      color: '#fafafa',
      borderBottom: '1px solid #1f1f25',
    },
    '.cm-panels input, .cm-panels button, .cm-panels label': {
      backgroundColor: '#101014',
      color: '#fafafa',
      border: '1px solid #2e2e37',
      borderRadius: '5px',
      padding: '2px 6px',
    },
    '.cm-panel button': { cursor: 'pointer' },
    '.cm-searchMatch': { backgroundColor: 'rgba(255,176,0,.3)' },
    '.cm-searchMatch-selected': { backgroundColor: 'rgba(255,176,0,.55)' },
  },
  { dark: true }
)

const highlight = HighlightStyle.define([
  { tag: t.comment, color: '#6a6a75', fontStyle: 'italic' },
  { tag: [t.keyword, t.operatorKeyword, t.modifier, t.controlKeyword], color: '#ffb000' },
  { tag: [t.string, t.special(t.string)], color: '#9ee6a0' },
  { tag: [t.number, t.integer, t.float, t.bool, t.null], color: '#e8c07a' },
  { tag: [t.tagName, t.heading], color: '#9ecbff' },
  { tag: [t.attributeName, t.propertyName], color: '#c9c9d4' },
  { tag: [t.variableName, t.definition(t.variableName)], color: '#fafafa' },
  { tag: [t.function(t.variableName), t.definition(t.function(t.variableName))], color: '#7cc7ff' },
  { tag: [t.typeName, t.className, t.namespace], color: '#7cc7ff' },
  { tag: [t.operator, t.punctuation, t.separator], color: '#b6b6bf' },
  { tag: [t.link, t.url], color: '#7cc7ff', textDecoration: 'underline' },
  { tag: [t.meta, t.documentMeta], color: '#8a8a94' },
])

let view = null
let suppress = false
let changeHandler = null
let saveHandler = null

export function initEditor({ onChange, onSave }) {
  changeHandler = onChange
  saveHandler = onSave
  view = new EditorView({
    state: EditorState.create({
      doc: '',
      extensions: [
        basicSetup,
        search(),
        html(),
        chrome,
        syntaxHighlighting(highlight),
        EditorView.lineWrapping,
        keymap.of([
          ...searchKeymap,
          {
            key: 'Mod-s',
            preventDefault: true,
            run: () => {
              saveHandler?.()
              return true
            },
          },
        ]),
        EditorView.updateListener.of((u) => {
          if (u.docChanged && !suppress) changeHandler(view.state.doc.toString())
        }),
      ],
    }),
    parent: document.getElementById('codeEditor'),
  })
}

export function getEditorValue() {
  return view ? view.state.doc.toString() : ''
}

/** Escreve no editor sem disparar o onChange. */
export function setEditorValue(text) {
  if (!view) return
  suppress = true
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } })
  suppress = false
}

export function focusEditor() {
  view?.focus()
}

/** Recalcula o tamanho depois de o painel de código ficar visível. */
export function refreshEditor() {
  view?.requestMeasure()
}
