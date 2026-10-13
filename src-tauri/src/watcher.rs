//! Observa o arquivo aberto para perceber edições feitas fora do Olaria
//! (por exemplo no VS Code) e avisa o front-end.

use notify::{EventKind, RecommendedWatcher, Watcher};
use std::sync::Mutex;
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter, State};

pub struct WatcherState(pub Mutex<Option<RecommendedWatcher>>);

impl Default for WatcherState {
    fn default() -> Self {
        WatcherState(Mutex::new(None))
    }
}

#[derive(Clone, serde::Serialize)]
struct FileChanged {
    path: String,
}

fn canon(p: &std::path::Path) -> Option<std::path::PathBuf> {
    std::fs::canonicalize(p).ok()
}

#[tauri::command]
pub fn watch_file(app: AppHandle, state: State<WatcherState>, path: String) -> Result<(), String> {
    let target = canon(std::path::Path::new(&path)).ok_or("arquivo não encontrado")?;
    let dir = target
        .parent()
        .ok_or("arquivo sem diretório")?
        .to_path_buf();

    let mut last_emit = Instant::now() - Duration::from_secs(10);
    let emit_path = path.clone();

    let mut watcher = notify::recommended_watcher(
        move |res: Result<notify::Event, notify::Error>| {
            let Ok(event) = res else { return };
            let interessa = event
                .paths
                .iter()
                .any(|p| canon(p).map(|c| c == target).unwrap_or(false));
            if !interessa {
                return;
            }
            let relevante = matches!(
                event.kind,
                EventKind::Modify(_) | EventKind::Create(_) | EventKind::Remove(_)
            );
            if !relevante {
                return;
            }
            let agora = Instant::now();
            if agora.duration_since(last_emit) < Duration::from_millis(250) {
                return;
            }
            last_emit = agora;
            let _ = app.emit(
                "olaria:file-changed",
                FileChanged {
                    path: emit_path.clone(),
                },
            );
        },
    )
    .map_err(|e| format!("não foi possível observar a pasta: {e}"))?;

    watcher
        .watch(&dir, notify::RecursiveMode::NonRecursive)
        .map_err(|e| format!("não foi possível observar a pasta: {e}"))?;

    *state.0.lock().unwrap() = Some(watcher);
    Ok(())
}

#[tauri::command]
pub fn unwatch_file(state: State<WatcherState>) -> Result<(), String> {
    *state.0.lock().unwrap() = None;
    Ok(())
}
