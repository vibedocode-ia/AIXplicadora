---
name: vc-sec-07-sanitization
description: "Estágio 7 - Sanitização, Validação e Anti-Injection"
---

# 🧹 Estágio 7: Sanitização, Validação & Anti-Injection

> **Camada:** Superfície de Ataque | **Severidade:** CRÍTICA

## Objetivo
Validar entrada, sanitizar contexto e encodar saída para bloquear injeção de código malicioso.

## Risco Mitigado
SQL Injection, XSS (Stored/Reflected/DOM), NoSQL Injection, Command Injection, Template Injection.

## Checklist de Aprovação

- [ ] TODOS os inputs de usuário validados com schema (Zod / Yup)
- [ ] Validação server-side obrigatória (client-side é complementar)
- [ ] Zero uso de `dangerouslySetInnerHTML` sem sanitização prévia (DOMPurify)
- [ ] Queries parametrizadas (nunca concatenação de strings em SQL)
- [ ] Output encoding aplicado em contexto HTML, JS, URL, CSS
- [ ] Campos de texto limitados em tamanho (maxLength)
- [ ] Regex de input não vulnerável a ReDoS
- [ ] Server Actions validam payload antes de processar
- [ ] Webhooks validam assinatura HMAC antes de aceitar
- [ ] Webhooks com proteção contra replay attack (timestamp + nonce)
- [ ] Webhooks com idempotency key para evitar processamento duplicado
- [ ] Jobs assíncronos com retry controlado e backoff exponencial
- [ ] Dead-letter queue configurada para jobs que falharam repetidamente
- [ ] Logs de execução de jobs com resultado, duração e erros

## Ferramentas Recomendadas
- Zod para validação de schema
- DOMPurify para sanitização de HTML
- Parameterized queries (Prisma/Supabase)
- Svix / custom HMAC para webhooks

## Evidências Esperadas
- Schemas Zod em todas as rotas de API e Server Actions
- Zero ocorrências inseguras de `dangerouslySetInnerHTML`
- Webhooks com validação de assinatura HMAC implementada
- Jobs com dead-letter queue configurada

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
