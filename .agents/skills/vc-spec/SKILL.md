---
name: vc-spec
description: Gerar especificação completa do projeto no formato Página → Componente → Comportamento. Fase 1 do VibeDoCode.
---

# /vc-spec — Gerar Especificação do Projeto

$ARGUMENTS

---

## 🎯 Objetivo

Este comando inicia a **Fase 1** do workflow VibeDoCode: a criação da Spec.

---

## Task

### Passo 1: Ativar o Agente

Use o agente `VC_spec-writer` com este contexto:

```
CONTEXTO:
- Descrição do usuário: $ARGUMENTS
- Modo: GERAÇÃO DE SPEC
- Saída: references/spec.md

REGRAS:
1. Seguir o fluxo do VC_spec-writer (Escuta Ativa → Geração → Revisão → Salvar)
2. Se a descrição for vaga (menos de 3 frases), PERGUNTE antes de gerar
3. Formato obrigatório: Página → Componentes → Comportamentos
4. Salvar em references/spec.md
5. Apresentar resumo ao usuário após gerar
```

### Passo 2: Confirmar com Usuário

Após gerar a spec, apresentar:

```
✅ Spec gerada: references/spec.md

📊 Resumo:
- X páginas identificadas
- Y componentes totais
- Z comportamentos mapeados

📌 Próximo passo: /vc-break references/spec.md
```

---

## Exemplos de Uso

```
/vc-spec App de delivery de comida com login, catálogo e carrinho
/vc-spec Dashboard de analytics com gráficos e filtros
/vc-spec Blog com CMS, categorias e comentários
```
