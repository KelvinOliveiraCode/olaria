// Camada de I/O. Dentro do Tauri usa os comandos Rust; no navegador
// (usado só para desenvolvimento/teste da interface) cai em alternativas.

export const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

function fail(msg) {
  return () => Promise.reject(new Error(msg))
}

async function tauriCore() {
  return import('@tauri-apps/api/core')
}

async function dialogPlugin() {
  return import('@tauri-apps/plugin-dialog')
}

async function openerPlugin() {
  return import('@tauri-apps/plugin-opener')
}

async function eventApi() {
  return import('@tauri-apps/api/event')
}

export const io = {
  isTauri,

  async readText(path) {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('read_text_file', { path })
    }
    throw new Error('No navegador, abra arquivos arrastando para a janela.')
  },

  async writeText(path, contents) {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('write_text_file', { path, contents })
    }
    const blob = new Blob([contents], { type: 'text/html;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = path || 'index.html'
    a.click()
    URL.revokeObjectURL(a.href)
  },

  /** Diálogo de abrir. Devolve o caminho ou null. */
  async openDialog() {
    if (isTauri) {
      const d = await dialogPlugin()
      return d.open({
        multiple: false,
        filters: [{ name: 'Página HTML', extensions: ['html', 'htm'] }],
      })
    }
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.html,.htm,text/html'
      input.onchange = () => {
        const file = input.files?.[0]
        if (file) resolve(file)
      }
      input.click()
    })
  },

  /** Diálogo de salvar. Devolve o caminho ou null. */
  async saveDialog(defaultName) {
    if (isTauri) {
      const d = await dialogPlugin()
      return d.save({ defaultPath: defaultName || 'index.html' })
    }
    return defaultName || 'index.html'
  },

  /** Escolhe uma imagem e devolve um data URL (arquivo único garantido). */
  async pickImage() {
    if (isTauri) {
      const d = await dialogPlugin()
      const path = await d.open({
        multiple: false,
        filters: [{ name: 'Imagem', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'] }],
      })
      if (!path) return null
      const core = await tauriCore()
      const dataUrl = await core.invoke('image_data_url', { path })
      return { name: path.replace(/\\/g, '/').split('/').pop(), dataUrl }
    }
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = () => {
        const file = input.files?.[0]
        if (!file) return resolve(null)
        const reader = new FileReader()
        reader.onload = () => resolve({ name: file.name, dataUrl: String(reader.result) })
        reader.readAsDataURL(file)
      }
      input.click()
    })
  },

  async pickFolder() {
    if (isTauri) {
      const d = await dialogPlugin()
      return d.open({ directory: true })
    }
    throw new Error('Escolher pasta só existe no app instalado.')
  },

  async publishPackage(folder, html, title) {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('publish_package', { folder, html, title })
    }
    throw new Error('Publicar só existe no app instalado.')
  },

  /** Um clique: commit + gh repo create + push + ativar Pages. */
  async publishGithub(folder, html, slug) {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('publish_github', { folder, html, slug })
    }
    throw new Error('Publicar só existe no app instalado.')
  },

  async watchFile(path) {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('watch_file', { path })
    }
  },

  async unwatchFile() {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('unwatch_file')
    }
  },

  /** Aviso quando o arquivo mudou no disco (edição no VS Code, etc). */
  onFileChanged(fn) {
    if (!isTauri) return () => {}
    let un = () => {}
    eventApi()
      .then(({ listen }) => listen('olaria:file-changed', (e) => fn(e.payload?.path || '')))
      .then((unlisten) => {
        un = unlisten
      })
    return () => un()
  },

  async openExternal(url) {
    if (isTauri) {
      const o = await openerPlugin()
      return o.openUrl(url)
    }
    window.open(url, '_blank', 'noopener')
  },

  async openPath(path) {
    if (isTauri) {
      const o = await openerPlugin()
      return o.openPath(path)
    }
  },

  async revealInDir(path) {
    if (isTauri) {
      const o = await openerPlugin()
      return o.revealItemInDir(path)
    }
  },

  async appVersion() {
    if (isTauri) {
      const core = await tauriCore()
      return core.invoke('app_version')
    }
    return 'web'
  },
}

/** Lê um arquivo vindo de arrastar-e-soltar (Tauri) ou do input web. */
export async function readDroppedFile(fileOrPath) {
  if (typeof fileOrPath === 'string') return io.readText(fileOrPath)
  return fileOrPath.text()
}
