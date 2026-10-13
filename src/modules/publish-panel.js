// Modal de publicação: um clique no GitHub Pages ou o caminho manual.

import { openModal, closeModal, toast } from '../core/ui.js'
import { bus } from '../core/bus.js'
import { io } from '../core/store.js'

export function openPublishModal() {
  const wrap = document.createElement('div')

  const intro = document.createElement('p')
  intro.style.cssText = 'font-size:14px;line-height:1.65;color:var(--text-2);margin-bottom:18px;max-width:60ch'
  intro.innerHTML =
    'Sua página é <strong>um arquivo HTML único</strong>: pode ser enviada para qualquer hospedagem. O caminho gratuito mais simples é o GitHub Pages — e o Olaria faz isso por você.'
  wrap.appendChild(intro)

  // Caminho rápido: um clique.
  const destaque = document.createElement('div')
  destaque.style.cssText =
    'padding:18px;background:var(--panel-2);border:1px solid var(--accent);border-radius:12px;margin-bottom:16px'
  const dt = document.createElement('strong')
  dt.textContent = 'Publicar com um clique'
  dt.style.cssText = 'display:block;font-size:15px;margin-bottom:6px'
  const dd = document.createElement('span')
  dd.style.cssText = 'font-size:13px;color:var(--text-2);line-height:1.6;display:block;margin-bottom:14px'
  dd.textContent =
    'O Olaria salva o arquivo, cria o repositório no GitHub, envia tudo e ativa o Pages. Em cerca de um minuto o site está no ar. Precisa do GitHub CLI instalado e conectado (gh auth login).'
  destaque.append(dt, dd)
  const btnUmClique = document.createElement('button')
  btnUmClique.className = 'btn btn-primary'
  btnUmClique.textContent = 'Publicar agora no GitHub Pages'
  btnUmClique.addEventListener('click', () => bus.emit('publish:oneclick'))
  destaque.appendChild(btnUmClique)
  wrap.appendChild(destaque)

  const separador = document.createElement('p')
  separador.style.cssText = 'font-size:12px;color:var(--text-3);margin:4px 0 14px'
  separador.textContent = 'Ou faça na mão:'
  wrap.appendChild(separador)

  const grid = document.createElement('div')
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px'

  wrap.appendChild(actionCard({
    title: '1. Salvar o arquivo único',
    text: 'Guarde o index.html no computador. É ele que vai para o ar.',
    button: 'Salvar arquivo HTML…',
    primary: true,
    onClick: () => bus.emit('publish:export'),
  }))

  wrap.appendChild(actionCard({
    title: '2. Criar a pasta do site',
    text: 'Cria uma pasta com index.html, .nojekyll e um passo a passo escrito.',
    button: 'Escolher pasta e criar…',
    onClick: () => bus.emit('publish:package'),
  }))

  wrap.appendChild(actionCard({
    title: '3. Ver no navegador',
    text: 'Abra a página salva no Chrome, Edge ou Firefox do jeito que o visitante vai ver.',
    button: 'Abrir no navegador',
    onClick: () => bus.emit('publish:browser'),
  }))

  wrap.appendChild(actionCard({
    title: '4. Subir no GitHub',
    text: 'Crie o repositório e siga o arquivo COMO-PUBLICAR.md que ficou na pasta.',
    button: 'Abrir github.com/new',
    onClick: () => bus.emit('publish:github'),
  }))

  wrap.appendChild(grid)

  const note = document.createElement('p')
  note.style.cssText = 'font-size:12.5px;color:var(--text-3);line-height:1.6'
  note.textContent =
    'Qualquer hospedagem estática serve (Netlify Drop, Vercel, Cloudflare Pages). O GitHub Pages é o exemplo aqui porque é gratuito e não pede cartão.'
  wrap.appendChild(note)

  openModal('Publicar sua página', wrap)
}

function actionCard({ title, text, button, primary, onClick }) {
  const card = document.createElement('div')
  card.style.cssText =
    'display:flex;flex-direction:column;gap:8px;padding:16px;background:var(--panel-2);border:1px solid var(--line);border-radius:12px'
  const h = document.createElement('strong')
  h.textContent = title
  h.style.fontSize = '13.5px'
  const p = document.createElement('span')
  p.textContent = text
  p.style.cssText = 'font-size:12.5px;color:var(--text-2);line-height:1.5;flex:1'
  const btn = document.createElement('button')
  btn.className = `btn ${primary ? 'btn-primary' : ''}`
  btn.textContent = button
  btn.addEventListener('click', onClick)
  card.append(h, p, btn)
  return card
}

export { closeModal, toast }
