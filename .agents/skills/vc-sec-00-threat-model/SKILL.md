---
name: vc-sec-00-threat-model
description: "Estágio 0 - Threat Modeling & Classificação de Dados"
---

# 🎯 Estágio 0: Threat Modeling & Classificação de Dados

> **Camada:** Estratégia de Risco | **Severidade:** CRÍTICA

## Objetivo
Mapear ativos, atores, ameaças, superfícies de ataque e impacto ANTES de qualquer implementação.

## Risco Mitigado
Construir defesas sem saber o que proteger. Sem threat model, a equipe gasta esforço em áreas irrelevantes e ignora vetores críticos.

## Checklist de Aprovação

- [ ] Ativos críticos identificados (dados de usuário, financeiro, credenciais, PII)
- [ ] Dados classificados: público, interno, sensível, crítico
- [ ] Atores mapeados: usuário anônimo, autenticado, admin, agente IA, integração externa
- [ ] Fluxos sensíveis documentados (login, pagamento, alteração de permissão, chat IA)
- [ ] Endpoints que movimentam dinheiro, permissões ou dados pessoais listados
- [ ] Superfícies de ataque enumeradas (API pública, webhooks, uploads, formulários)
- [ ] Impacto por ativo: financeiro, reputacional, legal (LGPD), operacional
- [ ] Requisitos LGPD mapeados: minimização, retenção, consentimento, exclusão

## Ferramentas Recomendadas
- STRIDE (Microsoft Threat Modeling)
- Diagramas de fluxo de dados (DFD)
- Planilha de classificação de dados

## Evidências Esperadas
- Documento `THREAT_MODEL.md` no repositório
- Matriz de risco atualizada por sprint/release

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
