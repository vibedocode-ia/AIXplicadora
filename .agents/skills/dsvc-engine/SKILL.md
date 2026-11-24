---
name: dsvc-engine
description: Motor de geração de Design System VibeDoCode. Converte imagens de referência em tokens, CSS, componentes React e Landing Pages de alto impacto visual. Ativar quando usuário pedir /novodesign, criação de design system, geração de componentes premium ou Landing Page.
skills:
  - dsvc-engine
---

# DsVc Engine — Design System VibeDoCode

## Quando Usar Esta Skill
- Usuário pede `/novodesign`
- Usuário envia uma imagem e pede para criar um design system
- Usuário pede componentes React de alto impacto visual
- Usuário pede uma Landing Page premium

## Como Funciona o Motor

O motor DsVc tem **12 agentes** que operam em sequência. Eles estão em `DsVc_Agentes/`.

### Fluxo Padrão
```
1. DsVc_StyleExtractor → Extrai tokens da imagem
2. DsVc_TokenBuilder → Cria DsVc_Tokens.json
3. DsVc_TailwindBuilder → Gera tailwind.config.js + DsVc_Global.css
4. [APROVAÇÃO DO USUÁRIO]
5. DsVc_ComponentGenerator → Gera componentes React/TSX
6. DsVc_DesignValidator → Valida qualidade (rejeita flat UI)
7. DsVc_PageBuilder → Monta página completa
8. DsVc_HTMLExporter → Exporta HTML standalone
```

## Regras Absolutas (NUNCA Quebrar)

### ❌ PROIBIDO
- Flat UI genérica (parece Shadcn puro)
- Emojis como elemento de design principal
- Apenas 1-2 cores nos componentes
- Fundo preto sólido sem mesh gradients
- Bordas sólidas sem gradiente ou transparência
- Hover states sem resposta visual

### ✅ OBRIGATÓRIO
- Paleta `brand` de 7 cores: blue, indigo, violet, pink, coral, orange, gold
- Background: `night-950` (#06070B) com mesh radial layers
- Bordas: usar `.border-gradient` (mask-composite: exclude)
- Cards: glassmorphism (backdrop-blur + bg-night-800/70)
- Botões: gradiente multi-cor + shadow-glow + hover lift

## Tokens de Referência (Use Estes Valores)

```js
// Cores
night-950: '#06070B'  // Background principal
brand-pink: '#FF4FA3' // Glow primário  
brand-blue: '#3AA0FF' // Acentos técnicos
brand-gold: '#FFB21E' // Sucesso/premium

// Sombras
shadow-glow: '0 0 40px rgba(255,79,163,0.18)'

// Gradiente principal
'linear-gradient(90deg, #3AA0FF 0%, #A65CFF 30%, #FF4FA3 55%, #FF8A2B 80%, #FFB21E 100%)'
```

## Documentação Completa
- Contexto IA: `_docs/IA/CONTEXT.md`
- Arquitetura: `_docs/IA/ARCHITECTURE.md`
- Tokens: `_docs/IA/TOKENS_REFERENCE.md`
- Manual de Agentes: `_docs/IA/AGENTS_MANUAL.md`

## Nível Atual Ativo
**v1-html-vanilla** — HTML + Tailwind CDN, zero build step, portátil.
v2-motion-elite está em roadmap (`v2-motion-elite/ROADMAP.md`).
