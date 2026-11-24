---
name: vc-sec-10-rate-limit
description: "Estágio 10 - Rate Limit, Quotas e Denial of Wallet"
---

# 💸 Estágio 10: Rate Limit, Quotas & Denial of Wallet

> **Camada:** Proteção Econômica e IA | **Severidade:** CRÍTICA

## Objetivo
Proteger a saúde financeira do sistema limitando consumo abusivo de recursos pagos (IA, email, SMS, storage).

## Risco Mitigado
Denial of Wallet (estouro de fatura), DDoS na camada de aplicação, abuso de APIs onerosas.

## Checklist de Aprovação

- [ ] Rate limit por IP em rotas públicas (login, registro, contato)
- [ ] Rate limit por `user.id` em rotas autenticadas custosas (chat IA, envio de email)
- [ ] Cotas de uso por tenant/plano (ex: max 100 msgs IA/dia no plano free)
- [ ] Resposta `429 Too Many Requests` com header `Retry-After`
- [ ] Rotas de webhook protegidas contra replay attack (idempotency key)
- [ ] APIs de IA (OpenAI, Anthropic) com orçamento máximo por usuário/mês
- [ ] Alertas quando uso atinge 80% da cota
- [ ] Filas para operações pesadas (não processamento síncrono)
- [ ] Teste: script enviando 100 requests/segundo é bloqueado
- [ ] Custo estimado por endpoint documentado

## Ferramentas Recomendadas
- Upstash Rate Limit / Redis
- Vercel Edge Middleware
- Cloudflare Rate Limiting Rules

## Evidências Esperadas
- Middleware de rate limit ativo nas rotas críticas
- Teste de stress retornando 429 após limite

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
