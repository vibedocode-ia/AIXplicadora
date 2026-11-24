---
name: VC_write-components
description: "Regras para escrita de componentes frontend. Thin Client enforced, anti-duplicação, design system compliance."
allowed-tools: Read, Write, Edit, Glob, Grep
---

# 🎨 VC_write-components — Padrões de Escrita de Componentes

> **VibeDoCode · Skill de Camada Frontend · Vanderson Oliveira**

---

## Regra #1: Thin Client (Não Negociável)

```
O componente PODE:
  ✅ Renderizar dados que recebeu via props ou API
  ✅ Capturar interações do usuário (clicks, inputs, gestos)
  ✅ Chamar funções que fazem fetch para API
  ✅ Gerenciar estado LOCAL de UI (modal, loading, toggle)
  ✅ Validação visual (campo vazio em tempo real — apenas UX)

O componente NÃO PODE:
  ❌ Acessar banco de dados diretamente
  ❌ Calcular regras de negócio (preço, desconto, permissão)
  ❌ Ter chaves de API hardcoded
  ❌ Decidir autorização (quem pode ver/editar)
  ❌ Fazer queries SQL
```

---

## Regra #2: Anti-Duplicação

Antes de criar QUALQUER componente:

1. Use a skill `VC_codebase-search` para verificar se já existe
2. Se existe → IMPORTAR
3. Se existe similar → EXTENDER com props
4. Se não existe → CRIAR e registrar

---

## Regra #3: Componente vs. Página

| Tipo | Onde fica | Quando usar |
|---|---|---|
| Componente Global | `src/components/` | Usado em 2+ páginas |
| Componente Local | `src/pages/[pagina]/components/` | Usado apenas nessa página |
| Página | `src/pages/[pagina]/page.tsx` | Monta layout com componentes |
| Behavior | `src/pages/[pagina]/behaviors/[nome]/` | Lógica de interação isolada |

---

## Estrutura de Componente (Pattern)

```typescript
// 1. Imports
import type { ComponentProps } from './types';
import { Button } from '@/components/Button'; // Global = importar!

// 2. Types (sempre tipados, nunca 'any')
interface UserCardProps {
  name: string;
  avatar: string;
  role: string;
  onEdit?: () => void;
}

// 3. Componente (function declaration, não arrow)
export function UserCard({ name, avatar, role, onEdit }: UserCardProps) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <span>{role}</span>
      {onEdit && <Button onClick={onEdit}>Editar</Button>}
    </div>
  );
}
```

---

## Estrutura de Behavior (Pattern)

```
behaviors/
└── sign-in/
    ├── useSignIn.ts        # Hook: lógica de chamada API
    ├── SignInFlow.tsx       # Componente: fluxo visual
    └── types.ts            # Types específicos do behavior
```

```typescript
// useSignIn.ts — Hook do behavior
export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error.message);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { signIn, loading, error };
}
```

---

## Checklist antes de commit

- [ ] Zero lógica de negócio no componente
- [ ] Componente não duplica algo existente
- [ ] Types definidos (sem 'any')
- [ ] Props com interface clara
- [ ] Design system seguido (referências/design-system.md)
- [ ] Acessibilidade básica (alt em imagens, labels em forms)
