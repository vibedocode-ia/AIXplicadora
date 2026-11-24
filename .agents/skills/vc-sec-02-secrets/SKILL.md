---
name: vc-sec-02-secrets
description: "Estágio 2 - Secrets, Envs e Configuração Segura"
---

# 🔑 Estágio 2: Secrets, Envs & Configuração Segura

> **Camada:** Fundação Segura | **Severidade:** CRÍTICA

## Objetivo
Impedir vazamento de chaves, tokens e senhas. Garantir segregação de configuração por ambiente.

## Risco Mitigado
Credenciais expostas em repositórios públicos ou logs. Ambientes de teste com dados reais.

## Checklist de Aprovação

- [ ] Zero hardcoded secrets no código (grep por padrões: `sk-`, `key=`, `password=`, `token=`)
- [ ] `.gitignore` bloqueia `.env`, `.env.local`, `.env.production`
- [ ] Variáveis validadas com schema (Zod / T3 Env) no boot da aplicação
- [ ] Chaves segregadas por ambiente: dev, staging, production
- [ ] Nenhum `.env` commitado no histórico do Git (`git log --all -p -- '*.env*'`)
- [ ] Preview deploys usam variáveis próprias (nunca produção)
- [ ] `NEXT_PUBLIC_*` contém apenas valores seguros para exposição client-side
- [ ] Rotação de secrets documentada com frequência definida

## Ferramentas Recomendadas
- `git-secrets`, `trufflehog`, `gitleaks`
- Zod + T3 Env para validação
- Vault / Doppler / Infisical para gestão

## Evidências Esperadas
- Scan limpo do `gitleaks` ou `trufflehog`
- Schema de validação de envs no código

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
