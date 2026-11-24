---
name: vc-sec-06-rls
description: "Estágio 6 - Banco de Dados Selado com RLS"
---

# 🗄️ Estágio 6: Banco de Dados Selado (RLS)

> **Camada:** Identidade e Acesso | **Severidade:** CRÍTICA

## Objetivo
Blindar dados na camada do banco. RLS é a última linha de defesa lógica — mesmo que todo o backend falhe, o banco protege.

## Risco Mitigado
Vazamento massivo de dados, acesso horizontal entre clientes, bypass de autorização via query direta.

## Checklist de Aprovação

- [ ] RLS habilitado em TODAS as tabelas com dados de usuário
- [ ] Políticas para SELECT, INSERT, UPDATE, DELETE em cada tabela
- [ ] Toda política valida `auth.uid()` + ownership ou role
- [ ] `service_role` key NUNCA usada no frontend ou client-side
- [ ] `service_role` usada APENAS em Server Actions / API Routes protegidas
- [ ] Teste automatizado: usuário A não lê dados do usuário B via Supabase client
- [ ] Teste automatizado: INSERT sem auth retorna erro
- [ ] Multi-tenant: isolamento por `organization_id` quando aplicável
- [ ] Políticas revisadas a cada nova tabela ou migração
- [ ] Documentação das políticas RLS por tabela

## Ferramentas Recomendadas
- Supabase Dashboard > Auth Policies
- pgTAP para testes de RLS no PostgreSQL
- Scripts SQL de validação automatizada

## Evidências Esperadas
- Lista de tabelas + políticas RLS ativas
- Testes de acesso permitido E negado por tabela

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
