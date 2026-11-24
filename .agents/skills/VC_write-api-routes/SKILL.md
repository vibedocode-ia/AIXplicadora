---
name: VC_write-api-routes
description: "Regras para escrita de rotas de API. Fat Server enforced, validação obrigatória, tratamento de erros padronizado."
allowed-tools: Read, Write, Edit, Glob, Grep
---

# ⚡ VC_write-api-routes — Padrões de Escrita de API

> **VibeDoCode · Skill de Camada API · Vanderson Oliveira**

---

## Regra #1: Fat Server (Não Negociável)

```
A API DEVE conter:
  ✅ TODA lógica de negócio (cálculos, decisões, regras)
  ✅ TODA validação de dados (nunca confiar no frontend)
  ✅ TODA autenticação e autorização
  ✅ TODAS as queries ao banco (via ORM ou query builder)
  ✅ TODO tratamento de erro com mensagens claras

A API NÃO DEVE:
  ❌ Expor stack traces ou detalhes internos
  ❌ Retornar mais dados do que o necessário
  ❌ Ter secrets hardcoded
  ❌ Confiar em dados do frontend sem revalidar
```

---

## Padrão de Resposta (Obrigatório em toda rota)

```typescript
// ✅ Sucesso
return Response.json({
  success: true,
  data: { user: { id: '...', name: '...' } },
  meta: { page: 1, total: 50 } // se paginado
}, { status: 200 });

// ❌ Erro
return Response.json({
  success: false,
  error: {
    code: 'VALIDATION_ERROR',      // código máquina
    message: 'Email is required',  // mensagem humana
    details: [{ field: 'email', issue: 'required' }] // opcional
  }
}, { status: 400 });
```

### Códigos de Erro Padrão

| Código | HTTP | Quando |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Input inválido |
| `UNAUTHORIZED` | 401 | Não autenticado |
| `FORBIDDEN` | 403 | Sem permissão |
| `NOT_FOUND` | 404 | Recurso inexistente |
| `CONFLICT` | 409 | Duplicata (email já existe) |
| `RATE_LIMITED` | 429 | Muitas requisições |
| `INTERNAL_ERROR` | 500 | Erro inesperado |

---

## Template de Rota

```typescript
import { validateInput } from '@/lib/validate';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/response';

export async function POST(request: Request) {
  try {
    // 1. Autenticação (se rota protegida)
    const session = await getSession(request);
    if (!session) return errorResponse('UNAUTHORIZED', 'Login required', 401);

    // 2. Validação de input (OBRIGATÓRIA)
    const body = await request.json();
    const validation = validateInput(body, {
      email: { required: true, type: 'email' },
      name: { required: true, minLength: 2 },
    });
    if (!validation.ok) return errorResponse('VALIDATION_ERROR', validation.message, 400);

    // 3. Lógica de negócio
    const result = await createUser(validation.data);

    // 4. Resposta formatada
    return successResponse(result, 201);

  } catch (error) {
    // 5. Log interno + resposta segura
    console.error('[POST /api/users]', error);
    return errorResponse('INTERNAL_ERROR', 'Something went wrong', 500);
  }
}
```

---

## Helpers Reutilizáveis (criar em `src/lib/`)

```typescript
// src/lib/response.ts
export function successResponse(data: unknown, status = 200, meta?: object) {
  return Response.json({ success: true, data, ...(meta && { meta }) }, { status });
}

export function errorResponse(code: string, message: string, status: number, details?: unknown) {
  return Response.json({
    success: false,
    error: { code, message, ...(details && { details }) }
  }, { status });
}
```

---

## Checklist antes de commit

- [ ] Validação server-side em TODA rota com input
- [ ] Auth middleware em rotas protegidas
- [ ] Try/catch em toda rota async
- [ ] Log interno sem expor detalhes ao cliente
- [ ] Resposta no formato padrão (success/error)
- [ ] Nenhum secret hardcoded
- [ ] Rate limiting em endpoints sensíveis
