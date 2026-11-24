---
name: vc-sec-03-supply-chain
description: "Estágio 3 - Supply Chain & CI/CD Seguro"
---

# 📦 Estágio 3: Supply Chain & CI/CD Seguro

> **Camada:** Fundação Segura | **Severidade:** ALTA

## Objetivo
Auditar dependências de terceiros e blindar o pipeline de deploy contra ataques à cadeia de suprimentos.

## Risco Mitigado
Pacotes NPM comprometidos (supply chain attack). Pipeline de deploy manipulado por invasor. Artefatos não verificados em produção.

## Checklist de Aprovação

- [ ] `npm audit` ou `pnpm audit` sem vulnerabilidades críticas/altas
- [ ] Lockfile (`package-lock.json` / `pnpm-lock.yaml`) commitado e íntegro
- [ ] Dependências avaliadas: última atualização, maintainers, downloads
- [ ] Branch principal protegida (merge requer review)
- [ ] CI/CD não expõe secrets em logs de build
- [ ] Deploy com permissões mínimas (least privilege)
- [ ] Separação de chaves por ambiente no CI/CD
- [ ] Auditoria de quem fez deploy (log com autor, hora, commit)
- [ ] Rollback documentado e testado
- [ ] SBOM (Software Bill of Materials) gerado por release

## Ferramentas Recomendadas
- `npm audit`, `snyk`, `socket.dev`
- GitHub Branch Protection / Vercel Deploy Protection
- Dependabot / Renovate

## Evidências Esperadas
- Relatório `npm audit` limpo
- SBOM do último release
- Configuração de branch protection ativa

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
