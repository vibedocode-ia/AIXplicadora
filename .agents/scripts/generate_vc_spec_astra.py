#!/usr/bin/env python3
"""
Gerador da Especificação VibeDoCode (references/spec.md) via GPT Astra (OmniRoute Hub).
Consome Docs/AIXplicadora.md, Docs/PRD.md e Docs/Specs.md para produzir a Spec canônica
no formato Página → Componente → Comportamento.
"""

import sys
import os
import time
import importlib.machinery

loader = importlib.machinery.SourceFileLoader('omnirouter', '/home/vanderoliver/.local/bin/omnirouter')
omni = loader.load_module()

# Timeout ampliado para raciocínio profundo
orig_request = omni._request
def patched_request(*args, **kwargs):
    kwargs['timeout'] = 450
    return orig_request(*args, **kwargs)
omni._request = patched_request

PROJ_DIR = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/51- AIxplicadora"
DOCS_DIR = os.path.join(PROJ_DIR, "Docs")
REF_DIR = os.path.join(PROJ_DIR, "references")
os.makedirs(REF_DIR, exist_ok=True)

with open(os.path.join(DOCS_DIR, "PRD.md"), "r", encoding="utf-8") as f:
    PRD_CONTENT = f.read()

with open(os.path.join(DOCS_DIR, "Specs.md"), "r", encoding="utf-8") as f:
    SPECS_CONTENT = f.read()

def query_astra(prompt: str, system_prompt: str, max_tokens: int = 2000, retries: int = 2) -> str:
    print(f"[*] Chamando GPT Astra (tokens máx: {max_tokens})...")
    for attempt in range(retries + 1):
        try:
            t0 = time.time()
            res = omni.chat_completion(
                prompt=prompt,
                model="6.2-astra",
                system_prompt=system_prompt,
                max_tokens=max_tokens
            )
            t1 = time.time()
            print(f"[✓] Concluído em {round(t1 - t0, 1)}s ({len(res)} chars).")
            return res.strip()
        except Exception as e:
            print(f"[!] Erro na tentativa {attempt+1}: {e}")
            if attempt < retries:
                time.sleep(4)
            else:
                raise

def generate_spec_file():
    print("\n" + "="*70)
    print("GERANDO references/spec.md com GPT Astra (VibeDoCode Fase 1)")
    print("="*70)

    sys_prompt = (
        "Você é o GPT Astra (OpenAI Codex), atuando como o agente VC_spec-writer do ecossistema VibeDoCode. "
        "Sua missão é gerar a especificação formal definitiva em references/spec.md no formato canônico: "
        "Página → Componente → Comportamento. NUNCA escreva código de implementação (TypeScript/React); "
        "apenas especifique rotas, componentes visuais e tabelas de comportamentos com ID, Ação do Usuário, "
        "Resposta do Sistema e Cenário (Happy Path, Edge Case, Erro)."
    )

    # Bloco 1: Visão Geral e Páginas 1 a 4
    p1 = f"""
Baseie-se nas diretrizes dos documentos PRD e Specs:
- Escopo universal: Qualquer matéria, Fundamental I ao Doutorado.
- 3 Públicos: Estudantes, Pais Educadores e Professores.
- Multimodal: Texto, Fotos de Caderno/Livro, OCR, Links web.
- Stack: Next.js 15 Fat Server, Tailwind CSS, PostgreSQL no VPS Hostinger.
- Domínio: https://aixplicadora.vibedocode.pro/ e Admin em /admin (Super Admin: VibeDoCode / Entrar2026@).

Escreva a PARTE 1 do arquivo 'references/spec.md':
# Spec: AIXplicadora

> Plataforma universal de tutoria socrática ativa e didática para qualquer matéria e nível escolar/acadêmico.

## Visão Geral
- **Tipo:** Web Application Responsiva (Mobile-First)
- **Stack:** Next.js 15 (App Router, Fat Server), TypeScript estrito, Tailwind CSS, PostgreSQL no VPS Hostinger (Docker/Coolify).
- **Usuários:** Estudante (qualquer nível), Pai Educador / Gestor Familiar, Professor, Super Admin.
- **MVP:** Landing Page de alta conversão, Onboarding com termo de maioridade/responsável, Mesa da Explicadora Multimodal, Modos de Estudo, Painel Familiar e Área do Super Admin (/admin).

---

## Páginas

Especifique em detalhes as primeiras 4 páginas:
1. Página: Landing Page Institucional & Conversão
   - Rota: `/` (https://aixplicadora.vibedocode.pro/)
   - Descrição
   - Tabela de Componentes (Componente | Descrição)
   - Tabela de Comportamentos (ID | Ação do Usuário | Resposta do Sistema | Cenário: Happy Path, Edge Case, Erro)
2. Página: Cadastro & Onboarding
   - Rota: `/cadastro`
   - Descrição (com checkbox de maioridade / responsável legal)
   - Tabela de Componentes
   - Tabela de Comportamentos
3. Página: Login e Recuperação de Senha
   - Rota: `/login`
   - Descrição
   - Tabela de Componentes
   - Tabela de Comportamentos
4. Página: Mesa da Explicadora / Sessão Socrática Multimodal
   - Rota: `/missao/[id]`
   - Descrição (chat socrático, upload de fotos de caderno/livro, anexador de links, balão de pistas graduais, verificação de autonomia em exercício gêmeo)
   - Tabela de Componentes
   - Tabela de Comportamentos detalhados (B_MIS_01, B_MIS_02, etc.)
"""
    part1 = query_astra(p1, sys_prompt, max_tokens=2200)

    # Bloco 2: Páginas 5 a 8 e Regras Globais
    p2 = f"""
Baseie-se nas diretrizes dos documentos PRD e Specs.
Escreva a PARTE 2 do arquivo 'references/spec.md' (continuação direta, comece com a Página 5):

Especifique em detalhes as páginas 5 a 8:
5. Página: Histórico & Trilhas de Aprendizagem
   - Rota: `/trilhas`
   - Descrição (mapa de competências dominadas, evidências de autonomia vs pistas, histórico de missões)
   - Tabela de Componentes
   - Tabela de Comportamentos
6. Página: Painel da Família / Portal dos Pais
   - Rota: `/familia`
   - Descrição (gestão de dependentes, relatórios pedagógicos de esforço e autonomia, modo pai-educador)
   - Tabela de Componentes
   - Tabela de Comportamentos
7. Página: Modo Professor / Laboratório Didático
   - Rota: `/professor`
   - Descrição (geração de roteiros socráticos, analogias didáticas e antecipação de dúvidas)
   - Tabela de Componentes
   - Tabela de Comportamentos
8. Página: Painel do Super Admin
   - Rota: `/admin` (https://aixplicadora.vibedocode.pro/admin)
   - Descrição (login restrito de Super Admin para usuário VibeDoCode, métricas de tokens de IA, volume de missões, usuários ativos e logs de auditoria)
   - Tabela de Componentes
   - Tabela de Comportamentos (B_ADM_01 a B_ADM_06)

---

## Regras Globais
- Regras de Autenticação e Sessão
- Regras de Permissão RBAC (STUDENT, PARENT, TEACHER, SUPER_ADMIN)
- Regras do Motor Socrático (Proibição de resposta pronta, condução por pistas, obrigatoriedade do teste de autonomia)
- Regras de Multimodalidade (Validação de imagens, compressão, OCR e tratamento de links)
- Regras de Banco de Dados no VPS (Persistência direta no PostgreSQL, idempotência de missões)
"""
    part2 = query_astra(p2, sys_prompt, max_tokens=2200)

    full_spec = part1 + "\n\n" + part2 + "\n"
    spec_path = os.path.join(REF_DIR, "spec.md")
    with open(spec_path, "w", encoding="utf-8") as f:
        f.write(full_spec)

    print(f"\n[✓] Spec gerada com sucesso em: {spec_path} ({len(full_spec)} caracteres)")
    return spec_path

if __name__ == "__main__":
    generate_spec_file()
