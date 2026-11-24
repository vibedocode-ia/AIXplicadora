#!/usr/bin/env python3
"""
Reescritura Universal dos Documentos da AIXplicadora via GPT Sol 6.2 (OmniRoute Hub).
Implementa todas as diretrizes de escopo aberto, múltiplos perfis, multimodalidade,
PostgreSQL no VPS, GitHub e rota /admin do Super Admin.
"""

import sys
import os
import time
import importlib.machinery

# Carregar o cliente OmniRouter
loader = importlib.machinery.SourceFileLoader('omnirouter', '/home/vanderoliver/.local/bin/omnirouter')
omni = loader.load_module()

# Monkeypatch no timeout do OmniRouter para suportar respostas densas
orig_request = omni._request
def patched_request(*args, **kwargs):
    kwargs['timeout'] = 450
    return orig_request(*args, **kwargs)
omni._request = patched_request

PROJ_DIR = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/51- AIxplicadora"
DOCS_DIR = os.path.join(PROJ_DIR, "Docs")

DIRECTIVES = """
DIRETRIZES FUNDAMENTAIS DE PRODUTO E ARQUITETURA (OBRIGATÓRIAS):
1. ABRANGÊNCIA TOTAL (UNIVERSAL):
   - A AIXplicadora NÃO é apenas tutora de matemática ou de ensino fundamental. Ela atende QUALQUER assunto, de QUALQUER matéria/curso e QUALQUER fase escolar ou acadêmica: do Ensino Fundamental I até Pós-Graduação, Mestrado e Doutorado em qualquer área (exatas, humanas, biológicas, tecnologia, direito, medicina, etc.).
   - O usuário é quem define seu nível, matéria e necessidade no cadastro e dinamicamente durante o uso.

2. TRÊS PÚBLICOS-ALVO CENTRAIS:
   - Alunos: de qualquer série/nível (do ensino básico à tese de doutorado).
   - Pais/Responsáveis: que querem aprender para ensinar e explicar seus filhos em casa, além de poderem criar e gerenciar as contas dos dependentes.
   - Professores: que querem uma forma pedagógica e socrática melhor de explicar um conceito ou problema para seus alunos.

3. FLUXO PRINCIPAL E MULTIMODALIDADE (DENTRO DO MVP):
   - O usuário fala sobre o que precisa e adiciona informações contextuais: texto digitado, fotos do caderno, páginas de livros, imagens de exercícios/diagramas, e links externos que deem detalhes do problema.

4. DEFINIÇÃO ESTRITA DE ESCOPO:
   - A ÚNICA coisa que está fora de escopo no momento é a integração nativa com sistemas/instituições escolares externas (LMS como Google Classroom, Canvas, etc.).
   - Multimodalidade (fotos, OCR, links, áudio/turnos) está DENTRO do escopo.

5. TERMO DE MENORES E CONFORMIDADE:
   - Fluxo simplificado e seguro: o cadastro exige obrigatoriamente a declaração de que o usuário é maior de idade (18+) OU que o responsável legal está ciente e gerencia a conta.

6. STACK E INFRAESTRUTURA:
   - Usar o que já funciona no ecossistema VibeDoCode: PostgreSQL direto no servidor VPS Hostinger (srv1359371 / Coolify / Docker Postgres).
   - Backend Next.js 15 (App Router, Fat Server), TypeScript estrito, Tailwind CSS.

7. REPOSITÓRIO GITHUB, DOMÍNIO E ADMIN:
   - Repositório GitHub: 'AIXplicadora'.
   - Domínio de Produção: 'https://aixplicadora.vibedocode.pro/' com Landing Page moderna de alta conversão.
   - Área Administrativa do Super Admin: 'https://aixplicadora.vibedocode.pro/admin'
   - Credenciais do Super Admin (seed obrigatório): Usuário: 'VibeDoCode' | Senha: 'Entrar2026@'.
"""

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

def rewrite_aixplicadora():
    print("\n" + "="*70)
    print("REESCREVENDO Docs/AIXplicadora.md (Visão do Projeto Universal)")
    print("="*70)
    sys_prompt = (
        "Você é o GPT Sol 6.2 (OpenAI Codex), estrategista-chefe de produto educacional e arquiteto de EdTech "
        "para o VibeDoCode. Reescreva o documento oficial Docs/AIXplicadora.md incorporando as novas "
        "diretrizes de escopo universal (qualquer matéria, do fundamental ao doutorado) e os 3 públicos."
    )
    
    parts = []
    
    # Bloco 1: Manifesto Universal, Dor e Proposta de Valor Socrática
    p1 = f"""
{DIRECTIVES}

Escreva a PARTE 1 do documento 'Docs/AIXplicadora.md':
# AIXplicadora — Visão do Projeto, Manifesto e Proposta de Valor Universal

Cubra detalhadamente:
1. O Manifesto da Explicadora Universal: A transposição digital da tradição brasileira da explicadora paciente e socrática para QUALQUER área do saber humano. Por que chatbots genéricos falham ao apenas entregar respostas prontas e como a AIXplicadora ensina a pensar.
2. A Dor Real nos Três Públicos:
   - O Estudante (travado em qualquer fase: de frações no fundamental até cálculo tensorial, estatística multivariada ou hermenêutica jurídica no mestrado/doutorado).
   - Os Pais (que desejam ensinar e apoiar os filhos em casa, mas não dominam o conteúdo ou a pedagogia).
   - Os Professores (que buscam formas didáticas, analogias claras e roteiros socráticos para explicar conceitos difíceis).
3. A Proposta de Valor: Uma explicadora digital universal que nunca dá a resposta de bandeja, mas guia o raciocínio através de perguntas ativas, pistas graduais e verificação de autonomia.
4. O Espectro Completo de Atuação: Educação Básica (Fund I, II, Médio, ENEM), Ensino Superior, Pós-Graduação (Especialização, Mestrado, Doutorado) e Formação Autodidata/Profissional.
"""
    parts.append(query_sol(p1, sys_prompt, max_tokens=1500))

    # Bloco 2: Gamificação Pedagógica, Modos de Estudo e Multimodalidade
    p2 = f"""
{DIRECTIVES}

Escreva a PARTE 2 do documento 'Docs/AIXplicadora.md' (comece no nível H2):

## A Metáfora Gamificada Adaptada a Qualquer Nível
- Como Qualquer Dúvida Vira uma Missão: Início claro, diagnóstico socrático da dificuldade, pistas graduais e conclusão comprovada.
- Como Qualquer Assunto Vira uma Trilha de Domínio Curricular: Decomposição de tópicos complexos em etapas assimiláveis.
- O Registro Visível de Progresso e Autonomia: Separação rigorosa entre recompensas lúdicas (estrelas/badges) e evidências reais de aprendizagem (autonomia comprovada).

## Os Três Modos de Estudo da AIXplicadora
1. Modo 1: Entender um Problema ou Dever (desbloqueio focado no problema trazido, com verificação de autonomia em exercício gêmeo).
2. Modo 2: Preparação para Provas e Exames (simulações, diagnóstico de lacunas e revisão socrática).
3. Modo 3: Aprender um Assunto em Profundidade (trilha passo a passo a partir dos fundamentos conceituais).

## Entrada Multimodal Nativa
- O aluno/usuário traz o problema por texto, fotos de caderno/livro, anexos de imagem ou links da web.
- Acolhimento pedagógico multimodal e transição futura para áudio e voz em tempo real.
"""
    parts.append(query_sol(p2, sys_prompt, max_tokens=1400))

    # Bloco 3: Diálogos Exemplares para os 3 Públicos e Visão de Ecossistema
    p3 = f"""
{DIRECTIVES}

Escreva a PARTE 3 do documento 'Docs/AIXplicadora.md' (comece no nível H2):

## Diálogos Socráticos Exemplares nos 3 Públicos
Apresente 3 diálogos reais, ricos e emblemáticos mostrando a versatilidade da AIXplicadora:
1. Diálogo com Aluno de Pós-Graduação/Mestrado: Aluno travado na interpretação de um modelo de regressão logística / teste de hipóteses. Mostre a condução socrática de alto rigor sem dar o resultado pronto.
2. Diálogo com Pai que quer Ensinar o Filho: Pai de um aluno do 5º ano que quer aprender como explicar frações equivalentes com uma analogia visual de pizza/chocolate para o filho.
3. Diálogo com Professor: Docente de Ensino Médio buscando uma forma inovadora e engajadora de introduzir o conceito de entropia ou termodinâmica na sala de aula.

## Diretrizes de Experiência e Visão de Futuro
- Sensação de estar diante de uma mentora acolhedora, inteligente e paciente.
- Compromisso com a soberania intelectual do usuário e autonomia real.
"""
    parts.append(query_sol(p3, sys_prompt, max_tokens=1500))

    full_content = "\n\n".join(parts) + "\n"
    dest = os.path.join(DOCS_DIR, "AIXplicadora.md")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"\n[✓] Docs/AIXplicadora.md reescrito com sucesso! ({len(full_content)} caracteres)\n")

def rewrite_prd():
    print("\n" + "="*70)
    print("REESCREVENDO Docs/PRD.md (Requisitos e Decisões de Produto Universal)")
    print("="*70)
    sys_prompt = (
        "Você é o GPT Sol 6.2 (OpenAI Codex), Head de Produto da AIXplicadora no VibeDoCode. "
        "Reescreva o PRD oficial com rigor técnico, incorporando escopo universal, 3 personas, "
        "multimodalidade in-scope, somente LMS out-of-scope, e termo de maioridade/responsável."
    )
    
    parts = []

    # Bloco 1: Visão Geral, Escopo Real e Benchmark Amplo
    p1 = f"""
{DIRECTIVES}

Escreva a PARTE 1 do documento 'Docs/PRD.md':
# AIXplicadora — Product Requirements Document (PRD)

## 1. Resumo Executivo e Visão Geral do Produto
- Definição da AIXplicadora como plataforma universal socrática de aprendizagem e didática para qualquer matéria e nível escolar/acadêmico.
- Definição estrita de Escopo do MVP:
  - DENTRO DO ESCOPO: Todas as matérias e fases educacionais (Fundamental I ao Doutorado); Multimodalidade nativa (texto, fotos de caderno/livro, imagens, links da web); Modo estudante, Modo pai-educador e Modo professor; Pistas graduais e exercício de autonomia.
  - FORA DO ESCOPO DO MVP (Única exclusão formal): Integração direta com sistemas escolares/LMS de terceiros (Google Classroom, Canvas, etc.).

## 2. Pesquisa de Mercado & Benchmark Competitivo Abrangente
- Análise de concorrentes no Brasil em múltiplos espectros:
  1. K-12 e Ensino Básico: Khan Academy / Khanmigo, Photomath, Brainly Tutor.
  2. Ensino Superior, Idiomas e Pesquisa: Duolingo Max, Perplexity AI, Claude / ChatGPT Plus.
- Matriz Comparativa em 12 Dimensões: Explicação Passo a Passo, Verificação de Compreensão, Personalização por Nível, Entrada de Texto, Entrada de Fotos/OCR, Entrada de Links da Web, Áudio, Suporte a Nível Superior/Pós, Participação de Pais e Professores, Privacidade/LGPD, Modelo de Preço, Gamificação Pedagógica.
- Identificação dos gaps de mercado e diferenciais competitivos da AIXplicadora.
"""
    parts.append(query_sol(p1, sys_prompt, max_tokens=1500))

    # Bloco 2: Personas, Jornada e Onboarding com Termo de Maioridade
    p2 = f"""
{DIRECTIVES}

Escreva a PARTE 2 do documento 'Docs/PRD.md' (comece no nível H2):

## 3. Personas e Mapeamento da Jornada do Usuário
- Definição das 3 Personas Principais:
  1. Persona Estudante Multidisciplinar (do ensino básico à pós-graduação).
  2. Persona Pai/Mãe Educador(a) (aprende a didática para ensinar o filho e administra a conta familiar).
  3. Persona Professor(a) (busca metodologias ativas e novas formas de explicar problemas complexos).
- Jornada Completa do Usuário:
  - Cadastro Simples com Declaração de Maioridade / Ciência do Responsável (Termo de Adesão simplificado: 'Declaro que sou maior de 18 anos ou que sou o responsável legal pelo usuário menor de idade').
  - Fluxo Principal de Uso: O usuário explica o problema, anexa fotos do caderno/livro ou links da web, seleciona o nível de profundidade e inicia a missão socrática.
  - Ciclo de Sessão: Diagnóstico -> Pista 1 -> Pista 2 -> Verificação de Raciocínio -> Exercício de Autonomia -> Fechamento.
  - Painel Familiar e Relatórios para Pais e Professores.
"""
    parts.append(query_sol(p2, sys_prompt, max_tokens=1400))

    # Bloco 3: Gamificação Pedagógica, Modelos de Oferta e Custos de IA
    p3 = f"""
{DIRECTIVES}

Escreva a PARTE 3 do documento 'Docs/PRD.md' (comece no nível H2):

## 4. Gamificação Pedagógica e Arquitetura de Domínio
- Elementos: Missão (desafio com início e fim), Trilha (jornada estruturada de qualquer tópico) e Progresso de Autonomia.
- Separação entre Pontuação Lúdica (badges, níveis de perseverança) e Evidências Reais de Aprendizagem (capacidade de resolver sem pistas).
- Regras de Retomada e Resiliência (sem penalização por pausas ou erros repetidos).

## 5. Estratégia de Negócio, Modelos de Oferta e Projeção de Custos de IA
- 4 Modelos de Oferta para o Brasil:
  1. Pague por Dever/Dúvida Avulsa (acesso imediato para urgências).
  2. Assinatura Mensal Individual (acesso a qualquer matéria e nível).
  3. Plano Mensal Familiar / Multicontas (acesso para pais e múltiplos dependentes).
  4. Plano Anual Pro (desconto e suporte prioritário).
- Unit Economics de Custos de IA: Custos estimados por sessão e usuário (tokens de texto, visão computacional OCR de cadernos/livros e processamento de links).
"""
    parts.append(query_sol(p3, sys_prompt, max_tokens=1400))

    # Bloco 4: Requisitos Funcionais (RFs), Não-Funcionais (RNFs) e Conformidade
    p4 = f"""
{DIRECTIVES}

Escreva a PARTE 4 do documento 'Docs/PRD.md' (comece no nível H2):

## 6. Requisitos Funcionais do Sistema (RFs)
Especifique de RF-001 a RF-025 com ID estável, Descrição e Critérios de Aceitação Verificáveis (Dado/Quando/Então), cobrindo:
- Gestão de Usuários (Estudante, Pai Educador, Professor, Super Admin)
- Entrada Multimodal (Texto, Fotos de Caderno/Livro/OCR, Links da Web)
- Seleção Dinâmica de Nível Acadêmico (Fundamental I até Doutorado) e Área do Conhecimento
- Motor Socrático e Ciclo de Missão com Exercício de Autonomia
- Termo de Cadastro de Maioridade / Responsável
- Painel Administrativo do Super Admin (`/admin`)

## 7. Requisitos Não-Funcionais (RNFs)
Especifique RNF-001 a RNF-012: Latência (<2s para texto, <4s para OCR), Disponibilidade (99.5%), Segurança, Isolamento Multitenant, Responsividade Mobile-First.

## 8. Conformidade Legal e Segurança de Dados (LGPD)
- Aplicação do Art. 14 da LGPD: Termo de consentimento e responsabilidade no cadastro.
- Proibição de uso de dados de menores para publicidade; retenção e exclusão a pedido.

## 9. Métricas de Sucesso (KPIs) e Matriz de Decisões do MVP
- Métricas de Aprendizagem, Uso e Negócio.
- Tabela de Decisões: [Definida], [Recomendada], [Hipótese], [Futura pós-MVP].
"""
    parts.append(query_sol(p4, sys_prompt, max_tokens=1500))

    full_content = "\n\n".join(parts) + "\n"
    dest = os.path.join(DOCS_DIR, "PRD.md")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"\n[✓] Docs/PRD.md reescrito com sucesso! ({len(full_content)} caracteres)\n")

def rewrite_specs():
    print("\n" + "="*70)
    print("REESCREVENDO Docs/Specs.md (Especificação Técnica para Implementação por IA)")
    print("="*70)
    sys_prompt = (
        "Você é o GPT Sol 6.2 (OpenAI Codex), Principal Software Architect do VibeDoCode. "
        "Reescreva Docs/Specs.md detalhando a arquitetura Next.js 15 Fat Server com PostgreSQL direto no VPS, "
        "rota /admin do Super Admin (VibeDoCode / Entrar2026@), GitHub AIXplicadora e deploy em aixplicadora.vibedocode.pro."
    )
    
    parts = []

    # Bloco 1: Arquitetura, VPS PostgreSQL, GitHub e Deploy
    p1 = f"""
{DIRECTIVES}

Escreva a PARTE 1 do documento 'Docs/Specs.md':
# AIXplicadora — Especificação Técnica para Implementação por IA

## 1. Visão Geral da Arquitetura e Infraestrutura de Produção
- Padrão VibeDoCode: Fat Server / Thin Client (Next.js 15 App Router, TypeScript estrito, Tailwind CSS).
- Banco de Dados: **PostgreSQL direto no Servidor VPS Hostinger** (`srv1359371` / Docker Postgres / Coolify), utilizando conexão direta via `DATABASE_URL` (com pooler Node-Postgres / Drizzle ORM ou Prisma). Zero dependência de tiers gratuitos de terceiros.
- Repositório Git: Cadastrado no GitHub sob o nome `AIXplicadora`.
- Ambientes e Deploy:
  - Produção: `https://aixplicadora.vibedocode.pro/` gerenciado via Traefik e Coolify no VPS.
  - Landing Page: Extremamente funcional, moderna e de alta conversão.
  - Painel Super Admin: `https://aixplicadora.vibedocode.pro/admin`.

## 2. Atores, Permissões e Credenciais do Super Admin
- Papéis de Acesso (`Role`):
  - `STUDENT`: aluno de qualquer nível acadêmico.
  - `PARENT`: pai/mãe que pode aprender didática e gerenciar dependentes.
  - `TEACHER`: professor buscando estratégias pedagógicas e analogias.
  - `SUPER_ADMIN`: administrador supremo da plataforma.
- Credenciais e Seed do Super Admin na rota `/admin`:
  - **Usuário:** `VibeDoCode`
  - **Senha inicial:** `Entrar2026@` (armazenada com hash seguro argon2/bcrypt via seed migration).
  - Permissões: Gestão global de usuários, métricas de missões, telemetria de tokens de IA, faturamento e auditoria.
"""
    parts.append(query_sol(p1, sys_prompt, max_tokens=1500))

    # Bloco 2: Modelo de Dados DDL PostgreSQL no VPS
    p2 = f"""
{DIRECTIVES}

Escreva a PARTE 2 do documento 'Docs/Specs.md' (comece no nível H2):

## 3. Modelo de Dados Relacional DDL (PostgreSQL no Servidor VPS)
Forneça os esquemas SQL completos (DDL PostgreSQL) com tipos UUID, chaves primárias, chaves estrangeiras, constraints e índices otimizados para:
1. `users`: id, email, password_hash, full_name, role (STUDENT, PARENT, TEACHER, SUPER_ADMIN), is_verified, terms_accepted_at, created_at, updated_at
2. `user_profiles`: id, user_id, academic_level (fundamental_1, fundamental_2, ensino_medio, graduacao, pos_graduacao, mestrado_doutorado, livre), default_subject_interest, bio, avatar_url
3. `guardian_students`: tabela de relacionamento N:N entre pais e dependentes
4. `missions`: id, user_id, title, subject, academic_level, mode (problem_solving, exam_prep, deep_study), status (INITIALIZING, DIAGNOSING, CHALLENGING, HINTING, VERIFYING, AUTONOMY_CHECK, COMPLETED, PAUSED), created_at, finished_at
5. `mission_attachments`: id, mission_id, attachment_type (photo_notebook, photo_book, web_link, document), url, extracted_text_ocr, created_at
6. `mission_turns`: id, mission_id, turn_number, role (user, assistant, system), content, hint_level, evidence_evaluated, created_at
7. `learning_evidences`: id, user_id, mission_id, subject, topic, demonstrated_autonomy (boolean), hint_count, verified_at
8. `plans` e `subscriptions`: planos de acesso e controle de saldo/limites no VPS
9. `audit_logs`: registro de segurança e auditoria administrativa
"""
    parts.append(query_sol(p2, sys_prompt, max_tokens=1600))

    # Bloco 3: Máquina de Estados Finita (FSM) Multimodal e Contratos de API
    p3 = f"""
{DIRECTIVES}

Escreva a PARTE 3 do documento 'Docs/Specs.md' (comece no nível H2):

## 4. Máquina de Estados Finita (FSM) da Missão Multimodal
- Estados: `INITIALIZING` -> `DIAGNOSING` -> `CHALLENGING` -> `HINTING` -> `VERIFYING` -> `AUTONOMY_CHECK` -> `COMPLETED` (ou `PAUSED`).
- Como a FSM processa entradas multimodais: texto + imagem de caderno (OCR) + links web antes de disparar o diagnóstico.
- Mecanismo de Idempotência: prevenção contra requisições duplicadas.

## 5. Contratos de API REST (Endpoints, Payloads e Zod Schemas)
Especifique detalhadamente os contratos de API:
1. `POST /api/auth/register`: Cadastro com aceitação obrigatória do termo de maioridade / responsável legal.
2. `POST /api/auth/login-admin`: Autenticação restrita na rota `/admin` para o usuário `VibeDoCode`.
3. `POST /api/missions/create`: Recebe `subject`, `academic_level`, `user_intent`, `text_prompt`, `image_files` e `web_links`.
4. `POST /api/missions/[id]/interact`: Troca de mensagens socráticas e requisição de pistas.
5. `POST /api/missions/[id]/verify-autonomia`: Validação do exercício gêmeo independente.
6. `GET /api/admin/metrics`: Telemetria exclusiva do Super Admin (usuários ativos, custo de tokens e volume de missões).
"""
    parts.append(query_sol(p3, sys_prompt, max_tokens=1500))

    # Bloco 4: Engenharia de Prompts para os 3 Públicos e Fases de Implementação
    p4 = f"""
{DIRECTIVES}

Escreva a PARTE 4 do documento 'Docs/Specs.md' (comece no nível H2):

## 6. Orquestração de IA e Prompts Socráticos Multi-Perfil
Apresente os System Prompts especializados com JSON Schema / Structured Outputs:
1. `PROMPT_SOCRATIC_STUDENT`: Ajusta o tom e o rigor ao nível acadêmico selecionado (de criança a doutorando). Regra de ouro: nunca dar a resposta final.
2. `PROMPT_SOCRATIC_PARENT_EDUCATOR`: Guia o pai ou a mãe ensinando **como eles devem explicar o conceito para o filho**, fornecendo analogias e perguntas guiadas para a família.
3. `PROMPT_SOCRATIC_TEACHER`: Auxilia o professor com metodologias ativas, planos de aula socráticos e formas engajadoras de apresentar o tópico.

## 7. Plano de Fases e Ordem de Implementação por Agentes VibeDoCode
- Fase 1: Fundação do Banco de Dados no VPS Hostinger (PostgreSQL DDL, Migrations, Seed do Super Admin `VibeDoCode`) -> Agente `VC_model-writer`
- Fase 2: Serviços de Backend e APIs (Autenticação, FSM de Missão, Upload/OCR e Rotas `/admin`) -> Agente `VC_api-writer`
- Fase 3: Integração da Inteligência Artificial (Prompts Socráticos Multi-Perfil e Gateway OmniRoute) -> Agente `VC_api-writer`
- Fase 4: Frontend e Landing Page (Landing Page de Alta Conversão em `https://aixplicadora.vibedocode.pro/`, Mesa da Explicadora e Dashboard `/admin`) -> Agente `VC_component-writer`
- Fase 5: Conexão GitHub, Deploy via Coolify/Traefik no VPS e Testes Automatizados E2E -> Agente `VC_quality-guard`
"""
    parts.append(query_sol(p4, sys_prompt, max_tokens=1500))

    full_content = "\n\n".join(parts) + "\n"
    dest = os.path.join(DOCS_DIR, "Specs.md")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"\n[✓] Docs/Specs.md reescrito com sucesso! ({len(full_content)} caracteres)\n")

if __name__ == "__main__":
    arg = sys.argv[1] if len(sys.argv) > 1 else "all"
    if arg in ["1", "aixplicadora", "all"]:
        rewrite_aixplicadora()
    if arg in ["2", "prd", "all"]:
        rewrite_prd()
    if arg in ["3", "specs", "all"]:
        rewrite_specs()
    print("\n[🎉] Reescrita completa finalizada com sucesso pelo GPT Sol 6.2!")
