---
name: vc-plan
description: Planejar uma task específica com busca na codebase e em documentações externas. Fase 3 do VibeDoCode.
---

# /vc-plan — Planejar Task

$ARGUMENTS

---

## 🎯 Objetivo

Este comando inicia a **Fase 3** do workflow VibeDoCode: o planejamento detalhado de uma task (arquivo da pasta `tasks/`).

---

## Task

### Passo 1: Validação do Argumento

Se $ARGUMENTS estiver vazio:
```
❌ ERRO: Você precisa informar o caminho da task.
Exemplo: /vc-plan tasks/001-setup-database.md
```

### Passo 2: Ativar o Agente

Use o agente `VC_task-planner` com este contexto:

```
CONTEXTO:
- Arquivo da Task: $ARGUMENTS
- Modo: PLANEJAMENTO DETALHADO (NO CODE WRITING)

REGRAS:
1. Seguir OBRIGATORIAMENTE o fluxo do VC_task-planner
2. Fazer Busca Interna (VC_codebase-search) na codebase atual
3. Fazer Busca Externa (documentações) se aplicável
4. Validar contra references/architecture.md
5. Sobrescrever o arquivo $ARGUMENTS com o plano formatado (Cenários, Arquivos a Criar, Modificar, etc)
```

### Passo 3: Resultado

```
✅ Planejamento da {Task} concluído!

🔍 Destaques da Pesquisa:
- Código reutilizável encontrado: [Nº de itens ou "Nenhum"]
- Dependências da task: [Lista]

📁 Arquivos envolvidos:
- Criar: X arquivos
- Modificar: Y arquivos

📌 Próximo passo: /vc-execute $ARGUMENTS
```

---

## Exemplos de Uso

```
/vc-plan tasks/001-setup-database.md
/vc-plan tasks/003-page-login-ui.md
```
