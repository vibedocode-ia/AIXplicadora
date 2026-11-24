# Task 002: Setup do Banco de Dados PostgreSQL no VPS e Migrations

**Tipo:** setup
**Camada:** database
**Página relacionada:** N/A
**Prioridade:** P0-crítico
**Depende de:** Task 001

## Descrição
Configurar a conexão com o PostgreSQL em Docker no VPS Hostinger (srv1359371) via Drizzle ORM ou Node-Postgres. Executar as migrações DDL das 9 tabelas canônicas: users, user_profiles, missions, mission_attachments, mission_turns, learning_evidences, guardian_students, plans e audit_logs.

## Critério de Conclusão
- [ ] Conexão bem-sucedida com o PostgreSQL do VPS via DATABASE_URL segura
- [ ] Scripts de migração executados criando todas as 9 tabelas com UUIDs, chaves estrangeiras e índices
- [ ] Tabela missions suportando academic_level universal e modos de estudo
- [ ] Tabela mission_attachments preparada para fotos, OCR e links externos
