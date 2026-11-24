---
name: vc-design
description: Ativa o VC_design-architect para conduzir a entrevista visual socrática do projeto antes de qualquer trabalho de frontend.
---

# /vc-design — Ativar Design Architect

$ARGUMENTS

---

## 🎯 Objetivo

Ativar o **VC_design-architect** para conduzir a entrevista visual socrática do projeto antes de qualquer trabalho de frontend.

Este comando é **obrigatório antes de `/vc-execute` em qualquer task de camada `frontend`** quando não há um `references/design-brief.md` no projeto.

---

## Task

### Passo 1: Verificar Design Brief Existente

```
Se references/design-brief.md existir:
  → Resumir o brief existente e perguntar se o usuário quer atualizar ou seguir em frente
  
Se NÃO existir:
  → Ativar VC_design-architect e iniciar a entrevista visual
```

### Passo 2: Ativar o Agente

```
CONTEXTO:
- Agente: VC_design-architect
- Modo: ENTREVISTA VISUAL (NO CODE WRITING)
- Output: references/design-brief.md

REGRAS:
1. Seguir OBRIGATORIAMENTE o fluxo do VC_design-architect
2. Solicitar referência visual (URL ou imagem)
3. Analisar referência com detalhe máximo
4. Aplicar o Índice de Fidelidade
5. Gerar o Design Brief no arquivo references/design-brief.md
```

### Passo 3: Resultado

```
✅ Design Brief gerado!

📋 Brief: references/design-brief.md
🎨 Tokens de design definidos
📱 Decisões mobile documentadas

📌 Próximo passo: /vc-break ou /vc-plan [task de frontend]
```

---

## Exemplos de Uso

```
/vc-design
/vc-design tasks/011-page-home-ui.md
```

---

## ⚠️ Integração com o Fluxo VibeDoCode

Este comando é **Fase 2.5** — executado APÓS `/vc-spec` e ANTES de `/vc-execute` para tasks de frontend:

```
/vc-spec → /vc-break → /vc-design → /vc-plan → /vc-execute
```

Se o usuário tentar executar `/vc-execute` em uma task de frontend sem `references/design-brief.md`, o agente deve avisar e sugerir rodar `/vc-design` primeiro.
