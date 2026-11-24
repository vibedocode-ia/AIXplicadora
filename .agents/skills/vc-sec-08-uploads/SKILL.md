---
name: vc-sec-08-uploads
description: "Estágio 8 - Uploads, Arquivos e Storage Seguro"
---

# 📁 Estágio 8: Uploads, Arquivos & Storage Seguro

> **Camada:** Superfície de Ataque | **Severidade:** ALTA

## Objetivo
Proteger o sistema contra arquivos maliciosos, path traversal e acesso indevido a storage.

## Risco Mitigado
Upload de malware, execução de scripts via SVG/HTML, path traversal, acesso público a arquivos privados, exfiltração de metadados.

## Checklist de Aprovação

- [ ] Validação de tipo MIME real (magic bytes), não apenas extensão
- [ ] Tamanho máximo definido por tipo de arquivo
- [ ] Renomeação segura (UUID, sem input do usuário no filename)
- [ ] Storage privado por padrão (Supabase Storage policies)
- [ ] URLs assinadas com expiração para download (signed URLs)
- [ ] SVG e HTML bloqueados em upload quando não necessários
- [ ] Metadados EXIF removidos de imagens (privacidade)
- [ ] Proteção contra path traversal (`../` no filename)
- [ ] Arquivos compactados (ZIP) verificados antes de extração
- [ ] Antivírus/scan quando volume justifica (ClamAV / VirusTotal API)

## Ferramentas Recomendadas
- Supabase Storage com RLS policies
- `file-type` (npm) para validação de magic bytes
- `sharp` para processamento seguro de imagens

## Evidências Esperadas
- Teste de upload de arquivo com extensão falsificada retornando erro
- Políticas de storage documentadas

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
