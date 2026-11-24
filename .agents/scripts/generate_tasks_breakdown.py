#!/usr/bin/env python3
"""
Gerador de Tarefas Atômicas (tasks/NNN-nome.md) para a Fase 2 do VibeDoCode.
Consome references/spec.md e gera as 16 tasks canônicas com ordem, camadas e dependências.
"""

import os

PROJ_DIR = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/51- AIxplicadora"
TASKS_DIR = os.path.join(PROJ_DIR, "tasks")
os.makedirs(TASKS_DIR, exist_ok=True)

TASKS = [
    {
        "num": "001",
        "slug": "setup-project-nextjs-tailwind",
        "title": "Setup do Projeto Next.js 15 e Tailwind CSS v4",
        "tipo": "setup",
        "camada": "full-stack",
        "pagina": "N/A",
        "prioridade": "P0-crítico",
        "depende": "Nenhuma",
        "descricao": "Inicializar o projeto Next.js 15 App Router com TypeScript estrito, Tailwind CSS v4 e Lucide Icons. Configurar o Dockerfile, variáveis de ambiente e estrutura de pastas seguindo o padrão VibeDoCode (Fat Server / Thin Client).",
        "criterios": [
            "Aplicação Next.js 15 inicializada com sucesso e rodando em modo dev",
            "Tailwind CSS v4 configurado com tokens semânticos de cores e tipografia mobile-first",
            "Dockerfile e docker-compose preparados para implantação no VPS",
            "Estrutura de pastas padronizada (app/, components/, lib/, services/)"
        ]
    },
    {
        "num": "002",
        "slug": "setup-database-schema-migrations",
        "title": "Setup do Banco de Dados PostgreSQL no VPS e Migrations",
        "tipo": "setup",
        "camada": "database",
        "pagina": "N/A",
        "prioridade": "P0-crítico",
        "depende": "Task 001",
        "descricao": "Configurar a conexão com o PostgreSQL em Docker no VPS Hostinger (srv1359371) via Drizzle ORM ou Node-Postgres. Executar as migrações DDL das 9 tabelas canônicas: users, user_profiles, missions, mission_attachments, mission_turns, learning_evidences, guardian_students, plans e audit_logs.",
        "criterios": [
            "Conexão bem-sucedida com o PostgreSQL do VPS via DATABASE_URL segura",
            "Scripts de migração executados criando todas as 9 tabelas com UUIDs, chaves estrangeiras e índices",
            "Tabela missions suportando academic_level universal e modos de estudo",
            "Tabela mission_attachments preparada para fotos, OCR e links externos"
        ]
    },
    {
        "num": "003",
        "slug": "setup-auth-and-superadmin-seed",
        "title": "Sistema de Autenticação e Seed do Super Admin",
        "tipo": "setup",
        "camada": "api",
        "pagina": "/login, /admin",
        "prioridade": "P0-crítico",
        "depende": "Task 002",
        "descricao": "Implementar o serviço de autenticação por cookies HttpOnly seguros e hash de senhas com Argon2id. Criar o seed idempotente do Super Admin com o usuário 'VibeDoCode' e a senha inicial de bootstrap 'Entrar2026@' para acesso restrito à rota /admin.",
        "criterios": [
            "Módulo de hash e verificação de senhas com Argon2id funcional",
            "Seed idempotente executado criando o Super Admin VibeDoCode com papel SUPER_ADMIN",
            "Middleware de proteção de rotas validando sessões administrativas no servidor",
            "Mecanismo de limitação de tentativas de login contra ataques de força bruta"
        ]
    },
    {
        "num": "004",
        "slug": "page-landing-ui",
        "title": "Protótipo de UI da Landing Page Institucional",
        "tipo": "ui-prototype",
        "camada": "frontend",
        "pagina": "/",
        "prioridade": "P0-crítico",
        "depende": "Task 001",
        "descricao": "Construir a interface visual completa e responsiva da Landing Page em https://aixplicadora.vibedocode.pro/. Incluir Hero institucional com proposta socrática, demonstração ilustrativa do método, seletor de público (Estudante, Pais, Professor), bloco de como funciona e rodapé com FAQ.",
        "criterios": [
            "Hero com tipografia de alto impacto e CTA 'Começar agora' responsivo",
            "Demonstração visual do fluxo socrático (dúvida -> pergunta -> pista -> autonomia)",
            "Seletor interativo de público alternando exemplos entre Estudante, Pais e Professor",
            "Design 100% aderente a mobile-first e acessibilidade WCAG"
        ]
    },
    {
        "num": "005",
        "slug": "page-auth-onboarding-ui",
        "title": "Protótipo de UI de Cadastro e Login com Termo de Maioridade",
        "tipo": "ui-prototype",
        "camada": "frontend",
        "pagina": "/cadastro, /login",
        "prioridade": "P0-crítico",
        "depende": "Task 001",
        "descricao": "Desenvolver as telas de Cadastro e Login com fluxo de onboarding guiado em 3 etapas. Incluir seleção de perfil (Estudante, Pai Educador, Professor), contexto de ensino (Fundamental ao Doutorado) e checkbox mandatório de maioridade/responsável legal.",
        "criterios": [
            "Formulário de cadastro em etapas (Perfil, Contexto e Revisão) com validação visual",
            "Checkbox de maioridade de 18 anos ou confirmação de gestão pelo responsável legal",
            "Formulário de login limpo com opção de alternar visibilidade de senha",
            "Feedback visual imediato para campos preenchidos incorretamente"
        ]
    },
    {
        "num": "006",
        "slug": "page-mission-workspace-ui",
        "title": "Protótipo de UI da Mesa da Explicadora (Workspace Socrático)",
        "tipo": "ui-prototype",
        "camada": "frontend",
        "pagina": "/missao/[id]",
        "prioridade": "P0-crítico",
        "depende": "Task 001",
        "descricao": "Criar a interface da Mesa da Explicadora onde a sessão socrática acontece. Incluir painel de chat acolhedor, área de envio multimodal (texto, upload de fotos de caderno/livro e links web), balão de pistas graduais retrátil e card de celebração do exercício gêmeo de autonomia.",
        "criterios": [
            "Interface de chat com balões diferenciados para Explicadora, Usuário e Pistas",
            "Seletor de anexos multimodais permitindo arrastar fotos e colar links da web",
            "Visualizador de progresso da missão exibindo as etapas cumpridas",
            "Card de conclusão destacando se o exercício gêmeo foi resolvido com ou sem pistas"
        ]
    },
    {
        "num": "007",
        "slug": "page-portal-familia-ui",
        "title": "Protótipo de UI do Painel da Família e Modo Pai-Educador",
        "tipo": "ui-prototype",
        "camada": "frontend",
        "pagina": "/familia",
        "prioridade": "P1-importante",
        "depende": "Task 001",
        "descricao": "Desenvolver a interface do Painel da Família para pais e responsáveis. Incluir lista de dependentes cadastrados, relatórios de esforço e autonomia (sem expor notas punitivas) e aba do Modo Pai-Educador com roteiros de como ensinar o conteúdo aos filhos em casa.",
        "criterios": [
            "Dashboard com cards de métricas de estudo dos dependentes (tempo e autonomia)",
            "Visualizador de relatórios com gráficos simples de competências dominadas",
            "Aba do Modo Pai-Educador apresentando dicas pedagógicas e analogias práticas",
            "Modal para adição de novo dependente com seleção de nível escolar"
        ]
    },
    {
        "num": "008",
        "slug": "page-laboratorio-professor-ui",
        "title": "Protótipo de UI do Laboratório Didático do Professor",
        "tipo": "ui-prototype",
        "camada": "frontend",
        "pagina": "/professor",
        "prioridade": "P1-importante",
        "depende": "Task 001",
        "descricao": "Construir a interface do Modo Professor para planejamento de aulas ativas. Incluir gerador de analogias conceituais, sequenciador de perguntas socráticas para engajar turmas e antecipador de concepções equivocadas comuns dos estudantes.",
        "criterios": [
            "Campo de entrada para tópico da aula, nível dos alunos e objetivo pedagógico",
            "Painel de exibição com 3 variações de analogias com limites de aplicação explicados",
            "Roteiro de perguntas socráticas sugeridas em formato de etapas de aula",
            "Exportação amigável do plano de explicação em texto e PDF"
        ]
    },
    {
        "num": "009",
        "slug": "page-admin-dashboard-ui",
        "title": "Protótipo de UI do Painel Super Admin",
        "tipo": "ui-prototype",
        "camada": "frontend",
        "pagina": "/admin",
        "prioridade": "P0-crítico",
        "depende": "Task 001",
        "descricao": "Desenvolver a interface administrativa restrita em https://aixplicadora.vibedocode.pro/admin. Incluir tela de login exclusiva do Super Admin, dashboard com cards de telemetria de tokens de IA, volume de missões ativas, tabela de usuários cadastrados e logs de auditoria.",
        "criterios": [
            "Tela de login dedicada com aviso de acesso restrito ao Super Admin VibeDoCode",
            "Cards de telemetria exibindo consumo de tokens, custo estimado e missões criadas",
            "Tabela com paginação e busca de usuários e papéis atribuídos",
            "Área de visualização de logs recentes de segurança e eventos críticos"
        ]
    },
    {
        "num": "010",
        "slug": "behavior-user-registration-auth",
        "title": "Lógica Funcional de Cadastro, Login e Sessões",
        "tipo": "behavior",
        "camada": "api",
        "pagina": "/cadastro, /login",
        "prioridade": "P0-crítico",
        "depende": "Task 003, Task 005",
        "descricao": "Implementar os endpoints da API para registro de novos usuários e autenticação. Validar schema Zod de entrada, exigindo obrigatoriamente a aceitação do termo de maioridade (18+) ou autorização do responsável legal, gerando sessão segura via cookies.",
        "criterios": [
            "Endpoint POST /api/auth/register validando dados e gravando termo aceito",
            "Endpoint POST /api/auth/login emitindo cookies HttpOnly com expiração configurada",
            "Bloqueio com erro 400 amigável caso o termo de maioridade não seja marcado",
            "Criação automática do registro correspondente em user_profiles"
        ]
    },
    {
        "num": "011",
        "slug": "behavior-mission-multimodal-input",
        "title": "Lógica de Criação de Missão com Ingestão Multimodal",
        "tipo": "behavior",
        "camada": "full-stack",
        "pagina": "/missao/[id]",
        "prioridade": "P0-crítico",
        "depende": "Task 002, Task 006",
        "descricao": "Implementar o serviço e endpoint de criação de missões com ingestão multimodal. Suportar recebimento de texto da dúvida, upload de imagens de cadernos/livros (processados via OCR) e extração de metadados de links web enviados pelo usuário.",
        "criterios": [
            "Endpoint POST /api/missions/create salvando registro na tabela missions",
            "Processamento e armazenamento de imagens de cadernos na tabela mission_attachments",
            "Extração de texto via OCR e sanitização de links web fornecidos pelo usuário",
            "Inicialização do estado da missão em INITIALIZING com transição para DIAGNOSING"
        ]
    },
    {
        "num": "012",
        "slug": "behavior-socratic-engine-interaction",
        "title": "Motor Pedagógico Socrático e FSM de Missão",
        "tipo": "behavior",
        "camada": "api",
        "pagina": "/missao/[id]",
        "prioridade": "P0-crítico",
        "depende": "Task 011",
        "descricao": "Implementar a Máquina de Estados Finita (FSM) da missão e a orquestração de prompts socráticos. Garantir que a IA nunca dê respostas prontas, forneça até 3 pistas graduais adaptadas ao nível acadêmico e verifique o raciocínio do usuário antes de avançar.",
        "criterios": [
            "Endpoint POST /api/missions/[id]/interact processando respostas do aluno e comandos de pista",
            "FSM transitando corretamente entre DIAGNOSING, CHALLENGING e HINTING",
            "System Prompts socráticos impedindo respostas diretas e estimulando o raciocínio ativo",
            "Controle de turnos com persistência na tabela mission_turns e budget de contexto"
        ]
    },
    {
        "num": "013",
        "slug": "behavior-autonomy-verification-twin-challenge",
        "title": "Validação de Compreensão e Exercício Gêmeo de Autonomia",
        "tipo": "behavior",
        "camada": "api",
        "pagina": "/missao/[id]",
        "prioridade": "P0-crítico",
        "depende": "Task 012",
        "descricao": "Implementar a geração e avaliação do desafio gêmeo de autonomia. Quando o usuário resolve o problema com pistas, o sistema cria uma questão similar para testar se ele consegue resolver sozinho sem ajuda, gravando a evidência de aprendizagem real.",
        "criterios": [
            "Endpoint POST /api/missions/[id]/verify-autonomia avaliando a resolução independente",
            "Geração de exercício gêmeo com mesma estrutura lógica mas dados inéditos",
            "Registro da evidência na tabela learning_evidences marcando demonstrated_autonomy",
            "Transição do estado da missão para COMPLETED com feedback pedagógico final"
        ]
    },
    {
        "num": "014",
        "slug": "behavior-admin-telemetry-and-management",
        "title": "Lógica do Painel Administrativo do Super Admin",
        "tipo": "behavior",
        "camada": "api",
        "pagina": "/admin",
        "prioridade": "P0-crítico",
        "depende": "Task 003, Task 009",
        "descricao": "Implementar a rota de login restrito e os endpoints de telemetria do Super Admin em /admin. Acesso exclusivo para o usuário 'VibeDoCode' com validação rigorosa de sessão no servidor, listando métricas de tokens, usuários ativos e logs.",
        "criterios": [
            "Endpoint POST /api/admin/login permitindo acesso apenas ao usuário VibeDoCode",
            "Endpoint GET /api/admin/metrics retornando total de missões, custo de tokens e novos cadastros",
            "Listagem de usuários com filtros por papel (STUDENT, PARENT, TEACHER)",
            "Proteção estrita no servidor bloqueando qualquer tentativa de acesso não autorizada"
        ]
    },
    {
        "num": "015",
        "slug": "integration-omniroute-llm-gateway",
        "title": "Integração do Gateway OmniRoute com Failover de Modelos",
        "tipo": "integration",
        "camada": "api",
        "pagina": "N/A",
        "prioridade": "P0-crítico",
        "depende": "Task 012",
        "descricao": "Configurar o cliente de integração com o OmniRoute Hub (https://omnirouter.vibedocode.pro/v1) para consumo dos modelos GPT Sol 6.2, GPT Astra e Gemini. Implementar fallback automático de rota via Tailscale (100.87.66.97) caso o endpoint público oscile.",
        "criterios": [
            "Módulo de serviço integrando com a API do OmniRoute usando bearer token e SNI Traefik",
            "Fallback automático para o IP Tailscale do VPS Hostinger em caso de falha de conexão",
            "Roteamento dinâmico de tarefas: GPT Sol para raciocínio socrático e Astra para casos complexos",
            "Tratamento de timeout e respostas estruturadas em JSON Schema"
        ]
    },
    {
        "num": "016",
        "slug": "deploy-vps-coolify-and-e2e-review",
        "title": "Deploy no VPS via Coolify, Conexão GitHub e Auditoria Final",
        "tipo": "polish",
        "camada": "full-stack",
        "pagina": "https://aixplicadora.vibedocode.pro/",
        "prioridade": "P0-crítico",
        "depende": "Task 004, Task 010, Task 014, Task 015",
        "descricao": "Conectar o repositório GitHub 'AIXplicadora' ao Coolify no VPS Hostinger (srv1359371). Configurar build de produção, HTTPS via Traefik para o domínio oficial aixplicadora.vibedocode.pro e executar a suíte de testes E2E e checklist de segurança.",
        "criterios": [
            "Repositório GitHub 'AIXplicadora' criado e conectado ao Coolify",
            "Build Next.js em produção rodando em container Docker no VPS",
            "Domínio https://aixplicadora.vibedocode.pro/ ativo com certificado SSL Traefik",
            "Acesso à rota /admin verificado com login VibeDoCode / Entrar2026@",
            "Checklist de qualidade e segurança aprovado sem pendências críticas"
        ]
    }
]

def generate_tasks():
    print(f"Gerando {len(TASKS)} tarefas atômicas na pasta tasks/...")
    
    for t in TASKS:
        filename = f"{t['num']}-{t['slug']}.md"
        filepath = os.path.join(TASKS_DIR, filename)
        
        criterios_md = "\n".join([f"- [ ] {c}" for c in t['criterios']])
        
        content = f"""# Task {t['num']}: {t['title']}

**Tipo:** {t['tipo']}
**Camada:** {t['camada']}
**Página relacionada:** {t['pagina']}
**Prioridade:** {t['prioridade']}
**Depende de:** {t['depende']}

## Descrição
{t['descricao']}

## Critério de Conclusão
{criterios_md}
"""
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [+] Criado: tasks/{filename}")

    print(f"\n[✓] Todas as {len(TASKS)} tasks foram geradas com sucesso!")

if __name__ == "__main__":
    generate_tasks()
