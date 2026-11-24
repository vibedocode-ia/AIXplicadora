#!/usr/bin/env python3
"""
Gerador Modular de Documentos AIXplicadora via GPT Sol 6.2 (OmniRoute).
Gera com máxima profundidade e sem risco de timeout:
1. Docs/AIXplicadora.md (Concluído)
2. Docs/PRD.md (Concluído)
3. Docs/Specs.md (Em execução)
"""

import sys
import os
import time
import importlib.machinery

# Carregar o cliente OmniRouter
loader = importlib.machinery.SourceFileLoader('omnirouter', '/home/vanderoliver/.local/bin/omnirouter')
omni = loader.load_module()

# Monkeypatch no timeout do OmniRouter para suportar raciocínios densos
orig_request = omni._request
def patched_request(*args, **kwargs):
    kwargs['timeout'] = 450
    return orig_request(*args, **kwargs)
omni._request = patched_request

PROJ_DIR = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/51- AIxplicadora"
DOCS_DIR = os.path.join(PROJ_DIR, "Docs")

with open(os.path.join(DOCS_DIR, "Prompt_Inicial.md"), "r", encoding="utf-8") as f:
    PROMPT_INICIAL = f.read()

def query_sol(prompt: str, system_prompt: str, max_tokens: int = 1500, retries: int = 2) -> str:
    print(f"[*] Chamando GPT Sol 6.2 (tokens máx: {max_tokens})...")
    for attempt in range(retries + 1):
        try:
            t0 = time.time()
            res = omni.chat_completion(
                prompt=prompt,
                model="6.2-sol",
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

def generate_specs():
    print("\n" + "="*70)
    print("GERANDO Docs/Specs.md (Especificação Técnica para Implementação por IA)")
    print("="*70)
    sys_prompt = (
        "Você é o GPT Sol 6.2 (OpenAI Codex), atuando como Principal Software Architect e Engenheiro-Chefe "
        "no padrão VibeDoCode. Sua missão é gerar a especificação técnica definitiva `Docs/Specs.md` "
        "para que agentes autônomos de IA possam implementar o sistema AIXplicadora com precisão cirúrgica."
    )
    
    parts = []

    # Bloco 1: Arquitetura, Stack VibeDoCode e Atores/RLS
    p1 = f"""
Diretrizes: Docs/Prompt_Inicial.md (AIXplicadora).
Escreva o Bloco 1 do documento 'Docs/Specs.md':
# AIXplicadora — Especificação Técnica para Implementação por IA

## 1. Visão Geral da Arquitetura e Stack Tecnológica
- Padrão Arquitetural VibeDoCode: Fat Server / Thin Client (toda a lógica de negócios, validações pedagógicas, orquestração de IA e regras de segurança residem no backend; o frontend Next.js é estritamente de apresentação e reação ao estado do servidor).
- Stack Tecnológica Recomendada:
  - Framework Fullstack: Next.js 15 (App Router, Server Actions e Route Handlers em TypeScript estrito)
  - Estilização & UI: Tailwind CSS v4, Lucide Icons e Radix UI / Shadcn
  - Banco de Dados & Autenticação: Supabase (PostgreSQL 16, Supabase Auth, Storage para fotos de deveres, Row Level Security)
  - Provedor de IA: LLM Gateway (OpenAI / Google Gemini / OmniRoute) com fallback inteligente
  - Faturamento: Stripe / Asaas (Pix e Cartão recorrente para o mercado brasileiro)

## 2. Atores, Permissões e Segurança Multitenant
- Atores do Sistema:
  - `Guardian` (Responsável Legal): gerencia a assinatura, adiciona/remove dependentes, visualiza relatórios pedagógicos e define limites.
  - `Student` (Aluno Dependente): acessa as missões, envia dúvidas (texto/foto/áudio), interage com a explicadora, não tem acesso a faturamento ou configurações de conta.
  - `Admin`: visualiza métricas de saúde da plataforma e logs de auditoria.
- Modelo de Isolamento e RLS (Row Level Security):
  - Diretrizes rígidas de isolamento no Supabase garantindo que nenhum estudante ou responsável possa acessar dados ou tarefas de outra família.
"""
    parts.append(query_sol(p1, sys_prompt, max_tokens=1500))

    # Bloco 2: Modelo de Dados e Esquema DDL SQL Completo
    p2 = f"""
Diretrizes: Docs/Prompt_Inicial.md (AIXplicadora).
Escreva o Bloco 2 do documento 'Docs/Specs.md' (comece no nível H2):

## 3. Modelo de Dados Relacional e Schemas SQL (Supabase / PostgreSQL)
Forneça os esquemas DDL SQL completos e profissionais (PostgreSQL), incluindo tipos UUID, chaves primárias, chaves estrangeiras, índices, timestamps automáticos e constraints para as seguintes tabelas:
1. `guardians`: id, user_id (auth.users), full_name, phone, created_at, updated_at
2. `students`: id, guardian_id, display_name, school_grade (ex: 6_ano, 7_ano), avatar_url, birth_year, created_at, updated_at
3. `plans`: id, slug, name, price_cents, billing_cycle, mission_quota, audio_minutes_quota, is_active
4. `subscriptions`: id, guardian_id, plan_id, status (active, past_due, canceled), current_period_end, quota_balance
5. `usage_ledgers`: id, student_id, mission_id, tokens_input, tokens_output, audio_seconds, cost_estimated_cents, created_at
6. `tracks`: id, subject, topic, grade_level, title, description, order_index
7. `missions`: id, student_id, track_id, mode (homework, exam_prep, deep_study), status, current_step, started_at, concluded_at
8. `mission_steps`: id, mission_id, step_number, step_type (diagnosis, challenge, hint, verification, autonomy_check), prompt_sent, student_response, ai_evaluation, created_at
9. `learning_evidences`: id, student_id, mission_id, subject, topic_code, demonstrated_autonomy (boolean), hint_count, mastery_level, verified_at
10. `achievements` e `student_achievements`: gamificação lúdica separada das evidências de aprendizagem
11. `audit_logs`: registro de segurança e conformidade LGPD
Inclua políticas essenciais de RLS (CREATE POLICY) para `missions` e `learning_evidences`.
"""
    parts.append(query_sol(p2, sys_prompt, max_tokens=1600))

    # Bloco 3: Máquina de Estados Finita (FSM) da Missão
    p3 = f"""
Diretrizes: Docs/Prompt_Inicial.md (AIXplicadora).
Escreva o Bloco 3 do documento 'Docs/Specs.md' (comece no nível H2):

## 4. Máquina de Estados Finita (FSM) da Missão Pedagógica
- Estados Formais:
  1. `INITIALIZING` (Recebimento do enunciado/foto e criação da missão)
  2. `DIAGNOSING` (Análise socrática da dúvida: onde o aluno travou)
  3. `CHALLENGING` (Apresentação do desafio focado no ponto de bloqueio)
  4. `HINTING` (Fornecimento de pista progressiva de nível 1, 2 ou 3)
  5. `VERIFYING` (Validação da resposta e do raciocínio explicado pelo aluno)
  6. `AUTONOMY_CHECK` (Desafio gêmeo sem pistas para comprovar autonomia)
  7. `COMPLETED` (Missão finalizada com sucesso, registro de evidência e recompensa lúdica)
  8. `PAUSED` (Missão interrompida pelo aluno ou por expiração de tempo)
  9. `FAILED_LIMIT` (Bloqueio gracioso por cota esgotada com possibilidade de upgrade)
- Tabela de Transições de Estado: Estado Atual, Evento/Ação, Condição de Guarda (Guard), Próximo Estado e Efeitos Colaterais.
- Mecanismo de Idempotência: prevenção contra duplo clique, reenvio de mensagem em conexões 4G instáveis e transições inválidas.
"""
    parts.append(query_sol(p3, sys_prompt, max_tokens=1400))

    # Bloco 4: Contratos de API REST Detalhados
    p4 = f"""
Diretrizes: Docs/Prompt_Inicial.md (AIXplicadora).
Escreva o Bloco 4 do documento 'Docs/Specs.md' (comece no nível H2):

## 5. Contratos de API REST (Endpoints, Payloads e Respostas)
Especifique detalhadamente os contratos de API no padrão JSON:
1. `POST /api/missions/start`:
   - Request Body: `student_id`, `mode`, `subject`, `homework_text`, `material_image_url`
   - Response Body: `mission_id`, `state`, `initial_guidance`, `step_number`
2. `POST /api/missions/[id]/interact`:
   - Request Body: `student_response`, `response_type` (text, audio_transcript), `request_hint` (boolean)
   - Response Body: `state`, `ai_message`, `hint_level`, `step_status`, `next_action`
3. `POST /api/missions/[id]/autonomy-check`:
   - Submissão da resposta do exercício gêmeo independente.
4. `POST /api/materials/upload`:
   - Upload de foto do caderno/livro, validação MIME type, compressão e acionamento de OCR.
5. `GET /api/guardians/dashboard`:
   - Retorno estruturado para o painel dos pais (tempo de estudo, missões concluídas, taxa de autonomia, conquistas).
6. `POST /api/webhooks/stripe`:
   - Tratamento idempotente de eventos `checkout.session.completed`, `invoice.payment_succeeded`, etc.
Para cada endpoint, especifique Schema Zod de validação e códigos HTTP (200, 400, 401, 403, 422, 429, 500).
"""
    parts.append(query_sol(p4, sys_prompt, max_tokens=1500))

    # Bloco 5: Orquestração de IA e Prompts Socráticos
    p5 = f"""
Diretrizes: Docs/Prompt_Inicial.md (AIXplicadora).
Escreva o Bloco 5 do documento 'Docs/Specs.md' (comece no nível H2):

## 6. Orquestração de IA e Engenharia de Prompts Socráticos
- Pipeline de Prompts Especializados:
  1. `SYSTEM_PROMPT_DIAGNOSIS`: prompt para identificar onde o aluno travou sem resolver a questão. Formato de saída em JSON Schema estruturado (`concept_identified`, `student_misconception`, `suggested_first_step`).
  2. `SYSTEM_PROMPT_SOCRATIC_TUTOR`: prompt da explicadora amigável brasileira. Regras estritas: NUNCA dar a resposta final; usar tom acolhedor e incentivador; fazer perguntas curtas que guiem o olhar do aluno; adaptar o vocabulário à faixa etária do Fundamental II.
  3. `SYSTEM_PROMPT_COMPREHENSION_VALIDATOR`: avalia se o aluno entendeu a lógica ou se apenas chutou.
  4. `SYSTEM_PROMPT_TWIN_EXERCISE_GENERATOR`: gera uma questão com a mesma estrutura matemática/lógica, mas com dados diferentes, para o teste de autonomia.
- Formato de I/O Estruturado com JSON Schema / Structured Outputs.
- Estratégia de Janela de Contexto e Budget de Tokens (manter as últimas 6 mensagens + resumo de diagnóstico para economizar custo e evitar perda de instruções).
"""
    parts.append(query_sol(p5, sys_prompt, max_tokens=1500))

    # Bloco 6: Resiliência, Edge Cases e Plano de Implementação
    p6 = f"""
Diretrizes: Docs/Prompt_Inicial.md (AIXplicadora).
Escreva o Bloco 6 do documento 'Docs/Specs.md' (comece no nível H2):

## 7. Tratamento de Falhas, Resiliência e Casos de Borda (Edge Cases)
- Imagem de Caderno Ilegível, Cortada ou com Sombra: fluxo de detecção no OCR e mensagem humanizada solicitando nova foto com dicas práticas (enquadramento e iluminação).
- Enunciado Incompleto ou Faltando Dados da Questão: como a IA detecta e pergunta ao aluno antes de alucinar.
- Método Ensinado pelo Professor Divergente da Norma Comum: priorização do método do caderno do aluno para não gerar conflito pedagógico em sala.
- Indisponibilidade de Provedor de IA: Circuit Breaker, fila de retentativas e failover de rota no OmniRoute.
- Esgotamento de Quota durante a Missão: congelamento do estado da missão sem perda de progresso, com aviso claro e link direto para o responsável liberar nova recarga.

## 8. Plano de Fases e Ordem de Implementação por Agentes VibeDoCode
- Fase 1: Fundação de Dados (Supabase DDL, Migrations, Seed de Trilhas e RLS Policies) -> Agente `VC_model-writer`
- Fase 2: Backend e Fat Server (Route Handlers, FSM da Missão, Zod Schemas e Serviços de Domínio) -> Agente `VC_api-writer`
- Fase 3: Motor de IA Socrático (Integração OmniRoute, Prompts Estruturados e OCR) -> Agente `VC_api-writer`
- Fase 4: Frontend e Thin Client (Telas de Onboarding, Mesa da Explicadora Gamificada e Painel dos Pais) -> Agente `VC_component-writer`
- Fase 5: Validação de Qualidade, Segurança e Testes Automatizados (Playwright E2E, Cobertura de Testes e Auditoria Bank-Grade) -> Agente `VC_quality-guard`
"""
    parts.append(query_sol(p6, sys_prompt, max_tokens=1500))

    full_content = "\n\n".join(parts) + "\n"
    dest = os.path.join(DOCS_DIR, "Specs.md")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"\n[✓] Docs/Specs.md gerado e salvo com sucesso! ({len(full_content)} caracteres)\n")

if __name__ == "__main__":
    generate_specs()
