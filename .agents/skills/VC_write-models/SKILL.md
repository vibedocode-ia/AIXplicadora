---
name: VC_write-models
description: "Regras e padrões para escrita de código de banco de dados. Naming, segurança, migrations, seeds."
allowed-tools: Read, Write, Edit, Glob, Grep
---

# 🗄️ VC_write-models — Padrões de Escrita de Models

> **VibeDoCode · Skill de Camada Database · Vanderson Oliveira**

---

## Padrões de Naming

| Elemento | Convenção | Exemplo |
|---|---|---|
| Tabelas | snake_case, plural | `users`, `order_items` |
| Colunas | snake_case | `created_at`, `user_id` |
| Foreign Keys | tabela_singular_id | `user_id`, `order_id` |
| Indices | idx_tabela_coluna | `idx_users_email` |
| Enums | PascalCase | `UserRole`, `OrderStatus` |
| Types (TS) | PascalCase com sufixo | `UserModel`, `OrderRow` |

---

## Colunas Obrigatórias em Toda Tabela

```sql
id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL
```

Para tabelas com soft delete:
```sql
deleted_at  TIMESTAMPTZ DEFAULT NULL
```

---

## Checklist de Segurança para Models

- [ ] RLS (Row Level Security) ativado
- [ ] Policies de acesso definidas (read, write, delete)
- [ ] Passwords SEMPRE com hash (bcrypt/argon2, nunca MD5/SHA)
- [ ] Dados sensíveis encriptados at rest quando necessário
- [ ] Foreign keys com ON DELETE definido (CASCADE, SET NULL, RESTRICT)
- [ ] Indexes em colunas de busca frequente
- [ ] UNIQUE constraints onde aplicável (email, username)
- [ ] NOT NULL em campos obrigatórios
- [ ] CHECK constraints para validar dados no banco

---

## Migration Pattern

```sql
-- Migration: NNN_descricao.sql
-- Direção: UP

CREATE TABLE IF NOT EXISTS users (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  name        VARCHAR(255) NOT NULL,
  role        VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_users_email ON users(email);

-- Ativar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: usuário só vê próprios dados
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

```sql
-- Migration: NNN_descricao.sql
-- Direção: DOWN (Rollback)

DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP INDEX IF EXISTS idx_users_email;
DROP TABLE IF EXISTS users;
```

---

## Seed Pattern

```typescript
// Idempotente: rodar 2x não duplica dados
async function seed() {
  const existing = await db.query('SELECT COUNT(*) FROM users');
  if (existing.count > 0) {
    console.log('Seed: users already seeded, skipping');
    return;
  }

  await db.insert('users', [
    { email: 'admin@test.com', name: 'Admin', role: 'admin' },
    { email: 'user@test.com', name: 'User', role: 'user' },
  ]);
}
```
