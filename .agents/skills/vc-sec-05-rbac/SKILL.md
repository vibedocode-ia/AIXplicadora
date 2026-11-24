---
name: vc-sec-05-rbac
description: "Estágio 5 - Autorização RBAC/ABAC & Anti-IDOR"
---

# 🛂 Estágio 5: Autorização RBAC/ABAC & Anti-IDOR

> **Camada:** Identidade e Acesso | **Severidade:** CRÍTICA

## Objetivo
Garantir que cada usuário acessa APENAS o que lhe é permitido, validando papel, recurso e contexto.

## Risco Mitigado
Privilege Escalation, IDOR (Insecure Direct Object Reference), acesso horizontal entre tenants.

## Checklist de Aprovação

- [ ] Toda rota protegida valida role/permissão no SERVER (não no client)
- [ ] IDs de recursos validados contra ownership (`resource.user_id === session.user.id`)
- [ ] Nenhum endpoint aceita `role` ou `is_admin` vindo do body/query do client
- [ ] Papéis definidos: user, admin, super_admin, suporte, auditor, agente_ia, serviço
- [ ] Cada papel tem escopo mínimo documentado
- [ ] Middleware centralizado de autorização (não lógica espalhada)
- [ ] Teste: usuário A não acessa recurso do usuário B (anti-IDOR)
- [ ] Teste: lead não acessa rota de admin
- [ ] ABAC considerado quando necessário (permissão por tenant, plano, região, horário)
- [ ] Logs de tentativas de acesso negado
- [ ] **Multi-tenant:** toda consulta, mutação, storage path, log e job assíncrono preserva isolamento por `tenant_id`
- [ ] **Multi-tenant:** teste E2E confirma que Tenant A não acessa dados de Tenant B

## Ferramentas Recomendadas
- Middleware Next.js customizado
- Supabase RLS (complementar)
- CASL.js para ABAC avançado

## Evidências Esperadas
- Teste E2E de IDOR retornando 403
- Matriz de permissões documentada
- Teste de isolamento entre tenants passando

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
