---
name: vc-sec-01-sast
description: "Estágio 1 - SAST, Linting Estrito e Code Quality"
---

# 🔍 Estágio 1: SAST, Linting Estrito & Code Quality

> **Camada:** Fundação Segura | **Severidade:** ALTA

## Objetivo
Garantir que o código base é limpo, fortemente tipado e livre de padrões perigosos antes de qualquer execução.

## Risco Mitigado
Erros de programação que viram vulnerabilidades em produção. Tipagens soltas que permitem bypass de validação.

## Checklist de Aprovação

- [ ] TypeScript `strict: true` habilitado no `tsconfig.json`
- [ ] Todo uso de `any`, `unknown`, bypass de tipos ou `// @ts-ignore` deve ter justificativa escrita e revisão por par
- [ ] ESLint configurado com `eslint-plugin-security` ativo
- [ ] Prettier configurado e integrado ao CI
- [ ] Nenhum `eval()`, `Function()`, `document.write()` no código
- [ ] Nenhum `// @ts-expect-error` sem justificativa documentada no mesmo bloco
- [ ] Regras de complexidade ciclomática definidas (max 10)
- [ ] Build sem warnings de tipo

## Ferramentas Recomendadas
- ESLint + eslint-plugin-security
- TypeScript strict mode
- SonarQube / SonarCloud (opcional)

## Evidências Esperadas
- Output do linter com zero erros de segurança
- `tsconfig.json` com strict habilitado

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
