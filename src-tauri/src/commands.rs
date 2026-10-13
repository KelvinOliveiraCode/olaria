use base64::{engine::general_purpose::STANDARD, Engine as _};
use std::fs;
use std::path::Path;

#[tauri::command]
pub fn read_text_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| format!("Não foi possível ler o arquivo: {e}"))
}

#[tauri::command]
pub fn write_text_file(path: String, contents: String) -> Result<(), String> {
    if let Some(parent) = Path::new(&path).parent() {
        if !parent.as_os_str().is_empty() {
            fs::create_dir_all(parent)
                .map_err(|e| format!("Não foi possível criar a pasta: {e}"))?;
        }
    }
    fs::write(&path, contents).map_err(|e| format!("Não foi possível salvar o arquivo: {e}"))
}

/// Lê uma imagem do disco e devolve um data URL (a página exportada continua
/// sendo um arquivo único).
#[tauri::command]
pub fn image_data_url(path: String) -> Result<String, String> {
    const LIMITE: u64 = 8 * 1024 * 1024;
    let meta =
        fs::metadata(&path).map_err(|e| format!("Não foi possível abrir a imagem: {e}"))?;
    if meta.len() > LIMITE {
        return Err("Imagem maior que 8 MB. Reduza o tamanho antes de usar.".into());
    }
    let bytes = fs::read(&path).map_err(|e| format!("Não foi possível ler a imagem: {e}"))?;
    let mime = match Path::new(&path)
        .extension()
        .and_then(|e| e.to_str())
        .map(|e| e.to_lowercase())
        .as_deref()
    {
        Some("png") => "image/png",
        Some("jpg") | Some("jpeg") => "image/jpeg",
        Some("gif") => "image/gif",
        Some("webp") => "image/webp",
        Some("svg") => "image/svg+xml",
        Some("avif") => "image/avif",
        _ => "application/octet-stream",
    };
    Ok(format!("data:{mime};base64,{}", STANDARD.encode(bytes)))
}

/// Cria a pasta pronta para publicar no GitHub Pages:
/// index.html + .nojekyll + COMO-PUBLICAR.md
#[tauri::command]
pub fn publish_package(folder: String, html: String, title: String) -> Result<Vec<String>, String> {
    let dir = Path::new(&folder);
    fs::create_dir_all(dir)
        .map_err(|e| format!("Não foi possível criar a pasta de publicação: {e}"))?;

    let index = dir.join("index.html");
    fs::write(&index, html)
        .map_err(|e| format!("Não foi possível escrever o index.html: {e}"))?;

    let nojekyll = dir.join(".nojekyll");
    fs::write(&nojekyll, "")
        .map_err(|e| format!("Não foi possível escrever o .nojekyll: {e}"))?;

    let readme = dir.join("COMO-PUBLICAR.md");
    fs::write(
        &readme,
        format!(
            "# {title}\n\n\
Esta pasta está pronta para virar um site no ar, de graça, no GitHub Pages.\n\n\
## Passo a passo\n\n\
1. Crie um repositório novo em https://github.com/new (pode ser público ou privado).\n\
2. Dê o nome que quiser, por exemplo `meu-site`. Não marque \"Add a README\".\n\
3. Com o Git instalado, rode dentro desta pasta:\n\n\
   ```bash\n\
   git init\n\
   git add .\n\
   git commit -m \"primeira versão\"\n\
   git branch -M main\n\
   git remote add origin https://github.com/SEU-USUARIO/meu-site.git\n\
   git push -u origin main\n\
   ```\n\n\
4. No repositório, abra Settings > Pages.\n\
5. Em \"Build and deployment\", escolha Source: Deploy from a branch.\n\
6. Branch: `main`, pasta: `/ (root)`. Salve.\n\
7. Espere um minuto. O site fica em:\n\
   `https://SEU-USUARIO.github.io/meu-site/`\n\n\
## Como atualizar depois\n\n\
Edite o `index.html` (ou edite no Olaria e salve por cima) e repita:\n\n\
   ```bash\n\
   git add .\n\
   git commit -m \"atualização\"\n\
   git push\n\
   ```\n"
        ),
    )
    .map_err(|e| format!("Não foi possível escrever o COMO-PUBLICAR.md: {e}"))?;

    Ok(vec![
        index.to_string_lossy().to_string(),
        nojekyll.to_string_lossy().to_string(),
        readme.to_string_lossy().to_string(),
    ])
}

#[tauri::command]
pub fn app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

/// Grava uma linha de diagnóstico do runtime (uso temporário para caçar bug).
#[tauri::command]
pub fn append_log(line: String) -> Result<(), String> {
    let dir = std::env::temp_dir().join("olaria-diag");
    std::fs::create_dir_all(&dir).map_err(|e| format!("{e}"))?;
    use std::io::Write;
    let mut f = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(dir.join("cliques.log"))
        .map_err(|e| format!("{e}"))?;
    writeln!(f, "{line}").map_err(|e| format!("{e}"))?;
    Ok(())
}

/// Publica no GitHub Pages com um clique: escreve os arquivos, faz o
/// commit e usa o `gh` (CLI do GitHub) para criar o repositório, enviar
/// e ativar o Pages. Devolve um log legível do que aconteceu.
#[tauri::command]
pub fn publish_github(folder: String, html: String, slug: String) -> Result<PublishReport, String> {
    let dir = Path::new(&folder);
    std::fs::create_dir_all(dir).map_err(|e| format!("nao foi possivel criar a pasta: {e}"))?;

    let mut passos: Vec<String> = Vec::new();
    let mut url: Option<String> = None;

    // 1. Arquivos do site.
    std::fs::write(dir.join("index.html"), &html)
        .map_err(|e| format!("nao foi possivel escrever o index.html: {e}"))?;
    std::fs::write(dir.join(".nojekyll"), "")
        .map_err(|e| format!("nao foi possivel escrever o .nojekyll: {e}"))?;
    std::fs::write(
        dir.join("COMO-PUBLICAR.md"),
        format!("# {slug}\n\nPagina estatica publicada com o GitHub Pages pelo Olaria.\n"),
    )
    .map_err(|e| format!("nao foi possivel escrever o COMO-PUBLICAR.md: {e}"))?;
    passos.push("index.html e .nojekyll escritos na pasta".into());

    // 2. git init + commit (idempotente).
    let repo_existe = dir.join(".git").exists();
    if !repo_existe {
        run_git(dir, &["init", "-b", "main"], &mut passos)?;
    } else {
        passos.push("repositorio git ja existia".into());
    }
    run_git(dir, &["add", "-A"], &mut passos)?;
    // commit pode falhar se não houver mudanças: nao é erro.
    let _ = run_git(dir, &["commit", "-m", "publicar landing page"], &mut passos);

    // 3. gh repo create --source=. --push (cria, envia e liga o remote).
    let create = std::process::Command::new("gh")
        .args([
            "repo", "create", &slug, "--public", "--source=.", "--remote=origin", "--push",
        ])
        .current_dir(dir)
        .output();
    match create {
        Ok(out) if out.status.success() => {
            passos.push(format!("repositorio criado e enviado: {}", String::from_utf8_lossy(&out.stdout).trim()));
        }
        Ok(out) => {
            let err = String::from_utf8_lossy(&out.stderr).trim().to_string();
            return Ok(PublishReport {
                ok: false,
                url: None,
                passos,
                erro: Some(format!(
                    "o gh nao conseguiu criar o repositorio ({err}). Abra um terminal, rode 'gh auth login' e tente de novo."
                )),
            });
        }
        Err(e) => {
            return Ok(PublishReport {
                ok: false,
                url: None,
                passos,
                erro: Some(format!("o gh nao foi encontrado ({e}). Instale o GitHub CLI: https://cli.github.com")),
            });
        }
    }

    // 4. URL do repositorio publicado.
    if let Ok(out) = std::process::Command::new("gh")
        .args(["repo", "view", "--json", "url", "-q", ".url"])
        .current_dir(dir)
        .output()
    {
        let u = String::from_utf8_lossy(&out.stdout).trim().to_string();
        if !u.is_empty() {
            url = Some(u);
        }
    }

    // 5. Ativar o Pages (branch main, raiz). Se ja estiver ativo, segue.
    let _ = std::process::Command::new("gh")
        .args([
            "api",
            "--method",
            "POST",
            "repos/{owner}/{repo}/pages",
            "-f",
            "build_type=legacy",
            "-f",
            "source[branch]=main",
            "-f",
            "source[path]=/",
        ])
        .current_dir(dir)
        .output();
    passos.push("GitHub Pages ativado (branch main, raiz)".into());

    Ok(PublishReport {
        ok: true,
        url,
        passos,
        erro: None,
    })
}

#[derive(Clone, serde::Serialize)]
pub struct PublishReport {
    pub ok: bool,
    pub url: Option<String>,
    pub passos: Vec<String>,
    pub erro: Option<String>,
}

fn run_git(dir: &Path, args: &[&str], passos: &mut Vec<String>) -> Result<(), String> {
    let out = std::process::Command::new("git")
        .args(args)
        .current_dir(dir)
        .output()
        .map_err(|e| format!("git nao encontrado: {e}"))?;
    if !out.status.success() {
        let err = String::from_utf8_lossy(&out.stderr).trim().to_string();
        return Err(format!("git {} falhou: {err}", args.join(" ")));
    }
    passos.push(format!("git {} ok", args.join(" ")));
    Ok(())
}
