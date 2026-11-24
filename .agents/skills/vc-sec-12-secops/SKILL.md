---
name: vc-sec-12-secops
description: "Estágio 12 - Logs, Auditoria e Observabilidade"
---

# 📡 Estágio 12: Logs, Auditoria & Observabilidade

> **Camada:** Operação e Resiliência | **Severidade:** ALTA

## Objetivo
Enxergar ataques em tempo real, registrar trilhas imutáveis e detectar comportamento anômalo.

## Risco Mitigado
Invasor apaga rastros, admin abusa de privilégios sem detecção, incidentes sem evidência forense.

## Checklist de Aprovação

- [ ] Audit logs (WORM) para ações destrutivas de admin (delete, role change, impersonate)
- [ ] Logs NÃO contêm: senhas, tokens, PII, dados de cartão (mascaramento)
- [ ] Logs contêm: user_id, action, resource, timestamp, IP, user_agent
- [ ] Alertas para login de admin de IP/device desconhecido
- [ ] Alertas para pico de erros 4xx/5xx (possível ataque)
- [ ] Alertas para pico de requisições bloqueadas pelo rate limiter
- [ ] Monitoramento de contas privilegiadas (Super Admin)
- [ ] Dashboard de eventos de segurança (Grafana, Datadog, ou Supabase Logs)
- [ ] Retenção de logs definida (mínimo 90 dias para compliance)
- [ ] Logs protegidos contra alteração (append-only ou external service)

## Ferramentas Recomendadas
- Supabase Logs + Edge Functions
- Sentry para erros
- Grafana / Datadog / Better Stack para observabilidade
- Webhooks para Discord/Slack para alertas

## Evidências Esperadas
- Tabela/serviço de audit logs implementado
- Alerta configurado para pelo menos 3 eventos críticos
- Política de retenção documentada

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
