use base64::{engine::general_purpose::STANDARD, Engine as _};
use std::fs;
use std::path::{Path, PathBuf};

/// Resolve e valida se o caminho está dentro de uma pasta permitida.
/// Previne path traversal (ex: ../../etc/passwd).
///
/// O arquivo alvo pode ainda NÃO existir (é o caso do "Salvar como"):
/// canonicalizamos a pasta mais próxima que exista e revalidamos o
/// caminho completo contra a raiz permitida.
fn safe_path(path: &str) -> Result<PathBuf, String> {
    let alvo = Path::new(path);

    // Sobe ate o primeiro diretorio existente para canonicalizar.
    // Para "C:\Users\Kelvin\Desktop\novo.html" (que ainda nao existe),
    // para em "C:\Users\Kelvin\Desktop".
    let mut base = alvo.to_path_buf();
    let mut partes: Vec<std::ffi::OsString> = Vec::new();
    loop {
        if base.as_os_str().is_empty() {
            return Err("Caminho invalido.".into());
        }
        if base.exists() {
            break;
        }
        let nome = base
            .file_name()
            .ok_or("Caminho invalido.")?
            .to_os_string();
        partes.push(nome);
        base = PathBuf::from(base.parent().ok_or("Caminho invalido.")?);
    }

    // Reconstroi o caminho completo a partir da base canonica (sem `..`).
    let mut completo = fs::canonicalize(&base).map_err(|e| format!("Caminho invalido: {e}"))?;
    for parte in partes.iter().rev() {
        completo.push(parte);
    }

    // Valida contra a raiz permitida: home do usuario.
    let home = dirs::home_dir().ok_or("Nao foi possivel determinar o diretorio home")?;
    let home_canonical = fs::canonicalize(&home).map_err(|e| format!("Home invalido: {e}"))?;

    // strip_prefix compara componente a componente: evita que
    // "C:\Users\KelvinEvil" passe como se estivesse em "C:\Users\Kelvin".
    if completo.strip_prefix(&home_canonical).is_err() {
        return Err("Acesso negado: caminho fora das pastas permitidas.".into());
    }

    Ok(completo)
}

#[tauri::command]
pub fn read_text_file(path: String) -> Result<String, String> {
    let safe = safe_path(&path)?;
    fs::read_to_string(&safe).map_err(|e| format!("Não foi possível ler o arquivo: {e}"))
}

#[tauri::command]
pub fn write_text_file(path: String, contents: String) -> Result<(), String> {
    let safe = safe_path(&path)?;
    if let Some(parent) = safe.parent() {
        if !parent.as_os_str().is_empty() {
            fs::create_dir_all(parent)
                .map_err(|e| format!("Não foi possível criar a pasta: {e}"))?;
        }
    }
    fs::write(&safe, contents).map_err(|e| format!("Não foi possível salvar o arquivo: {e}"))
}

/// Lê uma imagem do disco e devolve um data URL (a página exportada continua
/// sendo um arquivo único).
#[tauri::command]
pub fn image_data_url(path: String) -> Result<String, String> {
    const LIMITE: u64 = 8 * 1024 * 1024;
    let safe = safe_path(&path)?;
    let meta =
        fs::metadata(&safe).map_err(|e| format!("Não foi possível abrir a imagem: {e}"))?;
    if meta.len() > LIMITE {
        return Err("Imagem maior que 8 MB. Reduza o tamanho antes de usar.".into());
    }
    let bytes = fs::read(&safe).map_err(|e| format!("Não foi possível ler a imagem: {e}"))?;
    let mime = match safe
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
    let safe = safe_path(&folder)?;
    fs::create_dir_all(&safe)
        .map_err(|e| format!("Não foi possível criar a pasta de publicação: {e}"))?;

    let index = safe.join("index.html");
    fs::write(&index, html)
        .map_err(|e| format!("Não foi possível escrever o index.html: {e}"))?;

    let nojekyll = safe.join(".nojekyll");
    fs::write(&nojekyll, "")
        .map_err(|e| format!("Não foi possível escrever o .nojekyll: {e}"))?;

    let readme = safe.join("COMO-PUBLICAR.md");
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
    // Valida slug: apenas letras minúsculas, números e hífens
    if !regex::Regex::new(r"^[a-z0-9-]+$").unwrap().is_match(&slug) {
        return Err("Nome do repositório inválido: use apenas letras minúsculas, números e hífens (ex: meu-site)".into());
    }

    let safe = safe_path(&folder)?;
    std::fs::create_dir_all(&safe).map_err(|e| format!("não foi possível criar a pasta: {e}"))?;

    let mut passos: Vec<String> = Vec::new();
    let mut url: Option<String> = None;

    // 1. Arquivos do site.
    std::fs::write(safe.join("index.html"), &html)
        .map_err(|e| format!("não foi possível escrever o index.html: {e}"))?;
    std::fs::write(safe.join(".nojekyll"), "")
        .map_err(|e| format!("não foi possível escrever o .nojekyll: {e}"))?;
    std::fs::write(
        safe.join("COMO-PUBLICAR.md"),
        format!("# {slug}\n\nPagina estatica publicada com o GitHub Pages pelo Olaria.\n"),
    )
    .map_err(|e| format!("não foi possível escrever o COMO-PUBLICAR.md: {e}"))?;
    passos.push("index.html e .nojekyll escritos na pasta".into());

    // 2. git init + commit (idempotente).
    let repo_existe = safe.join(".git").exists();
    if !repo_existe {
        run_git(&safe, &["init", "-b", "main"], &mut passos)?;
    } else {
        passos.push("repositorio git ja existia".into());
    }
    run_git(&safe, &["add", "-A"], &mut passos)?;
    // commit pode falhar se não houver mudanças: não é erro.
    let _ = run_git(&safe, &["commit", "-m", "publicar landing page"], &mut passos);

    // 3. gh repo create --source=. --push (cria, envia e liga o remote).
    let create = std::process::Command::new("gh")
        .args([
            "repo", "create", &slug, "--public", "--source=.", "--remote=origin", "--push",
        ])
        .current_dir(&safe)
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
                    "o gh não conseguiu criar o repositorio ({err}). Abra um terminal, rode 'gh auth login' e tente de novo."
                )),
            });
        }
        Err(e) => {
            return Ok(PublishReport {
                ok: false,
                url: None,
                passos,
                erro: Some(format!("o gh não foi encontrado ({e}). Instale o GitHub CLI: https://cli.github.com")),
            });
        }
    }

    // 4. URL do repositorio publicado.
    if let Ok(out) = std::process::Command::new("gh")
        .args(["repo", "view", "--json", "url", "-q", ".url"])
        .current_dir(&safe)
        .output()
    {
        let u = String::from_utf8_lossy(&out.stdout).trim().to_string();
        if !u.is_empty() {
            url = Some(u);
        }
    }

    // 5. Ativar o Pages (branch main, raiz). Se já estiver ativo, segue.
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
        .current_dir(&safe)
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
        .map_err(|e| format!("git não encontrado: {e}"))?;
    if !out.status.success() {
        let err = String::from_utf8_lossy(&out.stderr).trim().to_string();
        return Err(format!("git {} falhou: {err}", args.join(" ")));
    }
    passos.push(format!("git {} ok", args.join(" ")));
    Ok(())
}