---
name: VC_codebase-search
description: "Skill de pesquisa interna na codebase. Ensina a IA a encontrar código reutilizável ANTES de criar algo novo. Previne duplicação."
allowed-tools: Read, Glob, Grep
---

# 🔎 VC_codebase-search — Pesquisa na Codebase

> **VibeDoCode · Skill Anti-Duplicação · Vanderson Oliveira**
> "Se já existe, IMPORTE. Se não existe, CRIE. Mas nunca duplique."

---

## 🎯 PROPÓSITO

Esta skill ensina a IA a **pesquisar sistematicamente na base de código** antes de criar qualquer coisa nova. É o antídoto para o problema #1 do Vibe Coding: duplicação de código.

---

## 📐 PROTOCOLO DE BUSCA (Obrigatório antes de criar qualquer arquivo)

### Nível 1: Busca por Nome

Antes de criar `UserCard.tsx`, busque:

```bash
# Buscar componentes com nome similar
find src/ -name "*User*" -name "*.tsx" -o -name "*user*" -name "*.tsx"
find src/ -name "*Card*" -name "*.tsx"

# Buscar por importações do componente
grep -rn "UserCard\|user-card\|userCard" --include="*.tsx" --include="*.ts" src/
```

### Nível 2: Busca por Funcionalidade

Se precisa de "um formulário de login", busque:

```bash
# Buscar forms existentes
grep -rn "onSubmit\|handleSubmit\|useForm" --include="*.tsx" src/
grep -rn "<form" --include="*.tsx" src/

# Buscar validadores existentes
grep -rn "validate\|isValid\|schema" --include="*.ts" src/lib/
```

### Nível 3: Busca por Padrão

Se precisa de "chamar uma API", busque:

```bash
# Como o projeto faz chamadas API?
grep -rn "fetch\|axios\|api\." --include="*.ts" --include="*.tsx" src/
grep -rn "useSWR\|useQuery\|tanstack" --include="*.ts" src/

# Padrão de tratamento de erro
grep -rn "try.*catch\|\.catch\|onError" --include="*.ts" src/api/
```

### Nível 4: Busca por Tipos/Interfaces

```bash
# Buscar types existentes
grep -rn "interface\|type " --include="*.ts" src/types/ src/lib/
```

---

## 🧠 ÁRVORE DE DECISÃO

```
Preciso criar [X]?
│
├─ Buscar por nome → Encontrou algo idêntico?
│  ├─ SIM → IMPORTAR. Não criar.
│  └─ NÃO → Continuar
│
├─ Buscar por funcionalidade → Encontrou algo similar?
│  ├─ SIM → Pode EXTENDER com props/parâmetros?
│  │  ├─ SIM → Extender. Não criar novo.
│  │  └─ NÃO → Criar novo, mas documentar diferença.
│  └─ NÃO → Continuar
│
├─ Buscar por padrão → O projeto já faz algo parecido?
│  ├─ SIM → SEGUIR o mesmo padrão. Consistência!
│  └─ NÃO → Criar novo padrão, documentar.
│
└─ Nada encontrado → CRIAR do zero. 
   Documentar no plano: "Novo componente, nada similar encontrado."
```

---

## 📊 FORMATO DE RELATO

Ao concluir a busca, documentar no plano da task:

```markdown
## Pesquisa na Codebase

### Componentes encontrados para reutilização
| Componente | Caminho | Ação |
|---|---|---|
| Button | src/components/Button.tsx | IMPORTAR |
| FormField | src/components/FormField.tsx | IMPORTAR |

### Helpers/Utils encontrados
| Helper | Caminho | Ação |
|---|---|---|
| validateEmail | src/lib/validators.ts | IMPORTAR |

### Padrões identificados
| Padrão | Exemplo em | Ação |
|---|---|---|
| API calls via useSWR | src/hooks/useUsers.ts | SEGUIR MESMO PADRÃO |

### Nada encontrado (criar do zero)
| Item | Justificativa |
|---|---|
| LoginForm | Nenhum form de auth existe no projeto |
```

---

## 🚫 REGRAS

- ❌ Nunca criar sem pesquisar primeiro
- ❌ Nunca ignorar um componente existente que resolve o problema
- ❌ Nunca criar "variação" se poder extender com props
- ❌ Se encontrar duplicata, ALERTAR no relatório
