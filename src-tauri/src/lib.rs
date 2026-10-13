mod commands;
mod watcher;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .manage(watcher::WatcherState::default())
        .invoke_handler(tauri::generate_handler![
            commands::read_text_file,
            commands::write_text_file,
            commands::image_data_url,
            commands::publish_package,
            commands::publish_github,
            commands::append_log,
            commands::app_version,
            watcher::watch_file,
            watcher::unwatch_file,
        ])
        .run(tauri::generate_context!())
        .expect("falha ao iniciar o Olaria");
}
