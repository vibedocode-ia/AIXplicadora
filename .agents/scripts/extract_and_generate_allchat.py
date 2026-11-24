import os
import glob
import json
import re
from datetime import datetime

# Configurações de caminhos
WORKSPACE_DIR = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento"
BRAIN_DIR = "/home/vanderoliver/.gemini/antigravity/brain"

def get_project_folders():
    folders = []
    for name in os.listdir(WORKSPACE_DIR):
        path = os.path.join(WORKSPACE_DIR, name)
        if os.path.isdir(path) and name != ".agent" and name != ".shared":
            folders.append(name)
    # Ordenar numericamente / alfabeticamente
    folders.sort()
    return folders

def clean_text(text):
    if not text:
        return ""
    # Remove marcações HTML redundantes de metadados se necessário
    return text.strip()

def parse_overview_file(filepath):
    conversation = {
        "id": "",
        "created_at": "",
        "messages": [],
        "files_modified": set(),
        "agents_used": set(),
        "llms_used": set(),
        "tools_used": set(),
        "raw_text_for_matching": ""
    }
    
    conv_id = filepath.split("/")[-4]
    conversation["id"] = conv_id
    
    if not os.path.exists(filepath):
        return None
        
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    raw_content_accumulator = []
    
    for line in lines:
        try:
            data = json.loads(line)
        except Exception:
            continue
            
        source = data.get("source", "")
        msg_type = data.get("type", "")
        created_at = data.get("created_at", "")
        content = data.get("content", "")
        tool_calls = data.get("tool_calls", [])
        
        if not conversation["created_at"] and created_at:
            conversation["created_at"] = created_at
            
        # Accumulate raw text for matching projects later
        if content:
            raw_content_accumulator.append(content)
        
        # Track tools, files modified and agents
        if tool_calls:
            for tc in tool_calls:
                name = tc.get("name", "")
                conversation["tools_used"].add(name)
                args = tc.get("args", {})
                
                # Check for files modified or viewed
                for key in ["TargetFile", "AbsolutePath", "TargetFile", "Cwd"]:
                    val = args.get(key, "")
                    if val:
                        raw_content_accumulator.append(str(val))
                        # Extract file path
                        if key in ["TargetFile", "AbsolutePath"]:
                            conversation["files_modified"].add(os.path.basename(val.replace("\"", "")))
        
        # Parse messages
        if source == "USER_EXPLICIT" and msg_type == "USER_INPUT":
            # Extract request
            req_text = content
            if "<USER_REQUEST>" in content:
                parts = content.split("<USER_REQUEST>")
                if len(parts) > 1:
                    req_text = parts[1].split("</USER_REQUEST>")[0].strip()
            
            conversation["messages"].append({
                "role": "user",
                "timestamp": created_at,
                "content": req_text
            })
            
        elif source == "MODEL" and content:
            # Extract model/agent applied annotations
            agent_applied = "assistant"
            llm_model = "Gemini"
            
            agent_match = re.search(r"🤖 \*\*Applying knowledge of `?@([^`\s]+)`?\*\*", content)
            if agent_match:
                agent_applied = agent_match.group(1)
                conversation["agents_used"].add(agent_applied)
                
            conversation["messages"].append({
                "role": "assistant",
                "timestamp": created_at,
                "content": content,
                "agent": agent_applied
            })
            
    conversation["raw_text_for_matching"] = "\n".join(raw_content_accumulator)
    return conversation

def map_conversation_to_projects(conversation, project_folders):
    matched_projects = []
    text = conversation["raw_text_for_matching"]
    
    # Clean text to search easily
    text_upper = text.upper()
    
    for folder in project_folders:
        # Match folder name directly (e.g., "04 - Sistema OMD")
        if folder.upper() in text_upper:
            matched_projects.append(folder)
            continue
            
        # Match folder number (e.g., "04" or "/04 ")
        num_prefix_match = re.match(r"^(\d+)\s*-\s*(.*)$", folder)
        if num_prefix_match:
            num = num_prefix_match.group(1)
            name_part = num_prefix_match.group(2)
            
            # Match number as subdirectory path like "/04 - " or "/04-" or "/04/"
            patterns = [
                f"/{num} -", f"/{num}-", f"/{num}/", f"PASTAS/{num}", f"PASTA {num}"
            ]
            if any(p.upper() in text_upper for p in patterns):
                matched_projects.append(folder)
                continue
                
            # Match unique name part (e.g., "FocusFlowPro", "mini-crm", "BjjOss")
            clean_name = name_part.replace(" - Finalizado", "").strip()
            if len(clean_name) > 4 and clean_name.upper() in text_upper:
                matched_projects.append(folder)
                continue
        else:
            # Folder without number prefix, try direct match
            if folder.upper() in text_upper:
                matched_projects.append(folder)
                
    return list(set(matched_projects))

def generate_markdown(project, conversations):
    now_str = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    
    md = []
    md.append(f"# 📋 AllChat — {project}")
    md.append("")
    md.append(f"> **Contexto do Projeto:** Histórico completo de conversas e decisões.")
    md.append(f"> **Última atualização:** {now_str}")
    md.append(f"> **Total de conversas salvas:** {len(conversations)}")
    md.append("")
    md.append("---")
    md.append("")
    md.append("## 🗂️ Índice de Conversas")
    md.append("")
    md.append("| # | Data | Título / Solicitação Inicial | Agente | ID da Conversa |")
    md.append("|---|------|-----------------------------|--------|----------------|")
    
    for idx, conv in enumerate(conversations, 1):
        # Format date
        date_str = conv["created_at"]
        if date_str:
            try:
                dt = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                date_str = dt.strftime("%d/%m/%Y")
            except Exception:
                pass
                
        # First request content as snippet
        snippet = "Conversa sem requisições explícitas"
        for msg in conv["messages"]:
            if msg["role"] == "user":
                snippet = msg["content"].replace("\n", " ").replace("|", "\\|")
                if len(snippet) > 80:
                    snippet = snippet[:80] + "..."
                break
                
        agents = ", ".join(conv["agents_used"]) if conv["agents_used"] else "default"
        md.append(f"| {idx} | {date_str} | {snippet} | `{agents}` | `{conv['id']}` |")
        
    md.append("")
    md.append("---")
    md.append("")
    
    for idx, conv in enumerate(conversations, 1):
        date_str = conv["created_at"]
        if date_str:
            try:
                dt = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                date_str = dt.strftime("%d/%m/%Y %H:%M")
            except Exception:
                pass
                
        md.append(f"## 💬 Conversa {idx}: {conv['id']}")
        md.append("")
        md.append(f"- **Data:** {date_str}")
        md.append(f"- **ID da Conversa:** `{conv['id']}`")
        if conv["agents_used"]:
            md.append(f"- **Agente(s) Aplicado(s):** " + ", ".join(f"`@{a}`" for a in conv["agents_used"]))
        if conv["tools_used"]:
            md.append(f"- **Ferramentas Utilizadas:** " + ", ".join(f"`{t}`" for t in conv["tools_used"]))
        if conv["files_modified"]:
            md.append(f"- **Arquivos Envolvidos:** " + ", ".join(f"`{f}`" for f in conv["files_modified"]))
        md.append("")
        md.append("### Diálogo")
        md.append("")
        
        for msg in conv["messages"]:
            role = "🧑 **Usuário**" if msg["role"] == "user" else "🤖 **Antigravity**"
            md.append(f"{role}:")
            md.append(f"> {msg['content'].strip().replace(chr(10), chr(10) + '> ')}")
            md.append("")
            
        md.append("---")
        md.append("")
        
    return "\n".join(md)

def main():
    print("Iniciando extração de conversas...")
    project_folders = get_project_folders()
    print(f"Encontrados {len(project_folders)} projetos em {WORKSPACE_DIR}.")
    
    # Scan all overview.txt logs
    log_files = glob.glob(os.path.join(BRAIN_DIR, "*", ".system_generated", "logs", "overview.txt"))
    print(f"Encontrados {len(log_files)} arquivos de log overview.txt.")
    
    parsed_conversations = []
    for filepath in log_files:
        conv = parse_overview_file(filepath)
        if conv and conv["messages"]:
            parsed_conversations.append(conv)
            
    print(f"Processadas {len(parsed_conversations)} conversas com diálogos válidos.")
    
    # Map conversations to projects
    project_mappings = {folder: [] for folder in project_folders}
    project_mappings["Geral"] = []
    
    for conv in parsed_conversations:
        matched = map_conversation_to_projects(conv, project_folders)
        if matched:
            for folder in matched:
                project_mappings[folder].append(conv)
                print(f"Mapeada conversa {conv['id']} -> {folder}")
        else:
            project_mappings["Geral"].append(conv)
            print(f"Mapeada conversa {conv['id']} -> Geral")
            
    # Generate allchat files
    generated_count = 0
    for project, convs in project_mappings.items():
        if not convs:
            # Create empty file with template if no conversations mapped
            # This ensures every project directory has an allchat file as requested
            convs = []
            
        if project == "Geral":
            if not convs:
                continue
            # Write to a general log in the workspace root
            dest_path = os.path.join(WORKSPACE_DIR, "allchat-Geral.md")
        else:
            filename = f"allchat-{project}.md"
            dest_path = os.path.join(WORKSPACE_DIR, project, filename)
            
        print(f"Gerando {dest_path} com {len(convs)} conversas...")
        md_content = generate_markdown(project, convs)
        
        try:
            with open(dest_path, "w", encoding="utf-8") as f:
                f.write(md_content)
            generated_count += 1
        except Exception as e:
            print(f"Erro ao salvar arquivo para {project}: {e}")
            
    print(f"Concluído! Gerados {generated_count} arquivos allchat.")

if __name__ == "__main__":
    main()
