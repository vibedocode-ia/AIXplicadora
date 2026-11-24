---
name: vc-sec-09-infra-edge
description: "Estágio 9 - Edge, Headers, CORS e Hardening de Infra"
---

# 🌐 Estágio 9: Edge, Headers, CORS & Hardening de Infra

> **Camada:** Superfície de Ataque | **Severidade:** ALTA

## Objetivo
Blindar as bordas da aplicação com headers de segurança, políticas de origem e proteções de transporte.

## Risco Mitigado
XSS via script injection, Clickjacking, MIME sniffing, Man-in-the-Middle, requisições cross-origin maliciosas.

## Checklist de Aprovação

- [ ] `Strict-Transport-Security` (HSTS) com `max-age` >= 1 ano e `includeSubDomains`
- [ ] `X-Frame-Options: DENY` ou `SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Content-Security-Policy` configurado (whitelist de domínios confiáveis)
- [ ] CSP restritiva, sem `unsafe-inline` sempre que possível; quando inevitável (analytics, pixels), uso obrigatório de nonce/hash e justificativa documentada
- [ ] CORS restrito a origens conhecidas (não `*` em produção)
- [ ] CSRF tokens em formulários e Server Actions destrutivas
- [ ] `Permissions-Policy` restringindo câmera, microfone, geolocalização
- [ ] WAF/CDN configurado quando aplicável (Cloudflare, Vercel Firewall)

## Ferramentas Recomendadas
- `next.config.js` headers section
- securityheaders.com para validação
- Mozilla Observatory

## Evidências Esperadas
- Scan do securityheaders.com com nota A ou A+
- Configuração de headers no `next.config.js`

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
