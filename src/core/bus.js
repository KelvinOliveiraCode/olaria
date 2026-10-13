// Barramento de eventos minúsculo — os módulos não se conhecem diretamente.

const listeners = new Map()

export const bus = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set())
    listeners.get(event).add(fn)
    return () => bus.off(event, fn)
  },
  off(event, fn) {
    listeners.get(event)?.delete(fn)
  },
  emit(event, payload) {
    listeners.get(event)?.forEach((fn) => {
      try {
        fn(payload)
      } catch (err) {
        console.error(`[olaria] erro no ouvinte de ${event}`, err)
      }
    })
  },
}
