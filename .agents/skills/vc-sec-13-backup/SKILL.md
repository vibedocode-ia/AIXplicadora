---
name: vc-sec-13-backup
description: "Estágio 13 - Backup, Restore e Continuidade"
---

# 💾 Estágio 13: Backup, Restore & Continuidade

> **Camada:** Operação e Resiliência | **Severidade:** ALTA

## Objetivo
Garantir recuperação de dados e continuidade do serviço em caso de falha, ataque ou exclusão acidental.

## Risco Mitigado
Perda total de dados, ransomware lógico, exclusão acidental por admin, corrupção de banco.

## Checklist de Aprovação

- [ ] Backup automático do banco configurado (frequência definida)
- [ ] Backup testado com restauração bem-sucedida (não apenas "configurado")
- [ ] Point-in-Time Recovery (PITR) habilitado quando disponível
- [ ] RPO (Recovery Point Objective) definido: máximo de dados perdidos aceitável
- [ ] RTO (Recovery Time Objective) definido: tempo máximo para restaurar serviço
- [ ] Proteção contra exclusão acidental (soft delete ou confirmação dupla)
- [ ] Storage de arquivos com versionamento ativo
- [ ] Backup armazenado em localização separada (não no mesmo servidor)
- [ ] Plano de Disaster Recovery documentado
- [ ] Teste de restauração executado pelo menos 1x por trimestre

## Ferramentas Recomendadas
- Supabase Backups (Pro plan: PITR)
- pg_dump para backups manuais
- Vercel/Cloudflare para redundância de CDN

## Evidências Esperadas
- Documento de Disaster Recovery Plan
- Log do último teste de restauração
- RPO e RTO definidos e documentados

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
