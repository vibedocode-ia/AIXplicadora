---
name: vc-sec-14-incident-response
description: "Estágio 14 - Resposta a Incidentes e Melhoria Contínua"
---

# 🚨 Estágio 14: Resposta a Incidentes & Melhoria Contínua

> **Camada:** Operação e Resiliência | **Severidade:** ALTA

## Objetivo
Definir como agir quando algo dá errado. Conter impacto, preservar evidências, comunicar e aprender.

## Risco Mitigado
Pânico sem protocolo, perda de evidências forenses, comunicação falha com clientes, recorrência de incidentes.

## Checklist de Aprovação

- [ ] Plano de resposta a incidentes documentado (Runbook)
- [ ] Níveis de severidade definidos: P0 (crítico), P1 (alto), P2 (médio), P3 (baixo)
- [ ] Procedimento para revogar tokens e secrets comprometidos
- [ ] Procedimento para bloquear contas suspeitas
- [ ] Procedimento para isolar ambiente comprometido
- [ ] Template de comunicação para clientes afetados
- [ ] Procedimento para preservar evidências (logs, snapshots)
- [ ] Procedimento para restaurar serviço (link com Estágio 13)
- [ ] Post-mortem obrigatório para incidentes P0 e P1
- [ ] Lições aprendidas retroalimentam o framework (melhoria contínua)
- [ ] Simulação de incidente (tabletop exercise) pelo menos 1x por semestre

## Ferramentas Recomendadas
- Runbook template no repositório
- PagerDuty / Opsgenie para on-call
- Notion/Linear para tracking de post-mortems

## Evidências Esperadas
- Documento `INCIDENT_RESPONSE.md` no repositório
- Pelo menos 1 post-mortem documentado (ou simulação)
- Runbook com procedimentos de revogação e bloqueio

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
