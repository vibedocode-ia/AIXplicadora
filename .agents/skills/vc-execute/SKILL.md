---
name: vc-execute
description: Executar uma task baseada no seu plano, ativando o agente correto por camada (Database, API, Frontend). Fase 4 do VibeDoCode.
---

# /vc-execute — Executar Task

$ARGUMENTS

---

## 🎯 Objetivo

Este comando inicia a **Fase 4** do workflow VibeDoCode: a implementação real do código baseada no plano da task.

---

## Task

### Passo 1: Validação do Argumento

Se $ARGUMENTS estiver vazio:
```
❌ ERRO: Você precisa informar o caminho da task.
Exemplo: /vc-execute tasks/001-setup-database.md
```

Acione a ferramenta `view_file` para ler o arquivo da task informado em `$ARGUMENTS`. Confirme se o arquivo possui as listas detalhadas de implementação e a camada alvo (`Camada:` no cabeçalho). Se for um protótipo, não escreva lógica de negócio.

### Passo 2: Roteamento de Inteligência (Agente Correto)

Leia a prop **Camada** no início do arquivo da task e invoque APENAS o agente correspondente:

| Camada no Arquivo | Agente Acionado | Prioridade de regras |
|---|---|---|
| `database` | `VC_model-writer` | migrations, schemas, seeds, segurança |
| `frontend` | `VC_component-writer` | UI, Thin Client, Componentes Reutilizáveis |
| `api` | `VC_api-writer` | Lógica, middlewares, rotas, validações |
| `full-stack` | *(Acionar na Ordem: DB → API → Frontend)* | |

### Passo 3: Execução (Regras)

```
CONTEXTO:
- Task Plan ($ARGUMENTS)
- Modo: ESCRITA DE CÓDIGO (WRITING_CODE)

REGRAS ESTABELECIDAS:
1. Siga estritamente os arquivos a CRIAR e MODIFICAR listados na task. NÃO crie arquivos "surpresa".
2. Não ignore a lista de importações reutilizáveis ("Código a Importar").
3. Finalizada a criação do código, marque a task como `Status: ✅ Concluída` e mude as checkboxes do Checklist.
```

### Passo 4: Resultado

```
✅ Implementação da {Task} concluída!

Ações realizadas:
- [Agente(s) utilizado(s)]
- X arquivos criados
- Y arquivos modificados

📌 Se a execução terminar um comportamento ou fluxo, recomendamos rodar: /vc-validate
```

---

## Exemplos de Uso

```
/vc-execute tasks/003-page-login-ui.md
```
