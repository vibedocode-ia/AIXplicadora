---
name: design-reference-analyzer
description: "Skill de análise de referências visuais. Ensina o agente a dissecar sites, imagens e screenshots para extrair Design Tokens, padrões de motion e identidade visual. Base do VC_design-architect."
---

# 🔬 Design Reference Analyzer

> Aprenda a ler um site como um designer profissional, não como um usuário.

---

## FILOSOFIA

> "Você não copia um site. Você o desmonta, entende o porquê de cada decisão e reconstrói com propósito."

Um designer medíocre vê cores. Um design architect vê **sistemas**.

---

## FRAMEWORK DE ANÁLISE: 7 CAMADAS

Ao analisar qualquer referência visual, passe por estas 7 camadas na ordem:

### Camada 1: Atmosfera (0-3 segundos)
Qual é a PRIMEIRA emoção que a página provoca?
- Pergunta: "Se este site fosse uma pessoa, como ela se vestiria?"
- Output: 3 palavras que capturam o mood (ex: "Austero. Confiante. Preciso.")

### Camada 2: Paleta Cromática
Extraia sistematicamente:
```
- Cor de background dominante (fundo)
- Cor de texto primário
- Cor de acento/destaque (botões, links, ícones)
- Cor de superfície (cards, modals)
- Cor de borda sutil
- Gradientes usados (direção, stops)
```
**Ferramenta mental**: "Se eu remover todas as imagens, quais cores sobraram?"

### Camada 3: Sistema Tipográfico
Identifique:
```
- H1: Família, peso, tamanho, letter-spacing, line-height
- H2/H3: Variações
- Body: Família (pode ser diferente do heading), tamanho, line-height
- Mono: Há uso de fonte monospace? Onde?
- Micro copy: Labels, badges, tags
```
**Regra de Ouro**: Sites premium usam no máximo 2 famílias tipográficas.

### Camada 4: Layout e Espaço
```
- Max-width do container: estreito (<800px) / médio (1200px) / largo (>1400px)
- Sistema de grid: 12 colunas / Assimétrico / Masonry
- Espaçamento vertical entre seções: generoso / compacto / drama (muito espaço)
- Alinhamento do texto: centro / esquerda / misto
```

### Camada 5: Componentes Únicos
Liste os componentes que DIFERENCIAM este design de um template genérico:
- Botões (shape, shadow, hover state)
- Cards (borda? shadow? glassmorphism? neumorphism?)
- Navegação (sticky? transparente? morphs no scroll?)
- Hero element (imagem? ilustração? abstrato? vídeo? partículas?)
- Badges e Tags (rounded? square? com emoji?)

### Camada 6: Motion & Micro-interações
Catalogue:
```
- Entrada de página: fade? slide? zoom?
- Scroll: reveal progressivo? parallax? sticky?
- Hover: scale? glow? color shift? underline? lift (shadow)?
- CTA buttons: pulse? shimmer? ripple?
- Loading states: skeleton? spinner? shimmer?
```

### Camada 7: Mobile Adaptation
Observe como o design escala:
```
- Navegação vira hamburger ou bottom bar?
- Cards ficam full-width ou mantêm grid?
- Hero text reduz ou quebra diferente?
- CTAs mudam de posição?
- Imagens hero são cortadas ou substituídas?
```

---

## ESCALAS DE QUALIDADE

### Paleta de Cores ✦ ✦ ✦ ✦ ✦
| Nível | Sinal |
|---|---|
| ⭐ Amador | Cores default do Tailwind (blue-500, red-500) |
| ⭐⭐ Iniciante | Cores de uma paleta (ex: só azuis) |
| ⭐⭐⭐ Intermediário | Paleta customizada com 1 acento |
| ⭐⭐⭐⭐ Avançado | Paleta semantic com Background / Surface / Accent / Danger |
| ⭐⭐⭐⭐⭐ Expert | Paleta adaptativa (dark/light) + tokens CSS + sub-paletas |

### Tipografia ✦ ✦ ✦ ✦ ✦
| Nível | Sinal |
|---|---|
| ⭐ Amador | Font padrão do browser (serif/sans) |
| ⭐⭐ Iniciante | Google Font com 1 peso |
| ⭐⭐⭐ Intermediário | 2 fonts, múltiplos pesos |
| ⭐⭐⭐⭐ Avançado | Type scale sistemático (8pt grid) |
| ⭐⭐⭐⭐⭐ Expert | Variable fonts + optical sizing + fluid typography |

---

## ANTI-PADRÕES A DETECTAR (e evitar na implementação)

```
🚫 "O gradiente azul-roxo de IA" — Clichê absoluto (2022-2024 AI era)
🚫 "O card de features com ícone + título + 2 linhas" — Template puro
🚫 "O hero com headline centralizado e botão abaixo" — Sem diferencial
🚫 "A gradiente mesh de 3 cores que o Figma gerou" — Preguiça visual
🚫 Cores padrão do Tailwind sem customização (blue-600, purple-500)
🚫 Fonts padrão sem sizing customizado (text-2xl default)
🚫 Cards com border-radius default (rounded-lg = 8px, muito comum)
🚫 Box shadows do Tailwind direto (shadow-lg = genérico)
```

---

## TÉCNICAS PREMIUM (Implementar com intenção)

### Dark Mode Premium
```css
/* Não é só inverter cores. É uma atmosfera diferente. */
--bg-primary: #000000;        /* Preto absoluto, não #1a1a1a */
--bg-surface: #050505;        /* Levemente mais claro */
--bg-elevated: #0a0a0a;       /* Cards hover state */
--text-primary: #ffffff;      /* Branco puro */
--text-secondary: #71717a;    /* zinc-500 */
--text-muted: #3f3f46;        /* zinc-700 */
--accent: /* Nunca roxo */;
```

### Noise Texture Premium
```css
/* Dá profundidade orgânica ao fundo */
background-image: url("data:image/svg+xml,...");
opacity: 0.03; /* Sutil, não perceptível conscientemente */
```

### Glassmorphism Correto
```css
/* Versão errada: bg-white/10 backdrop-blur-sm border border-white/20 */
/* Versão correta (Deep-Tech): */
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.06);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

### Glow Intencional (não aleatório)
```css
/* Defina a FONTE de luz. É um acento, não decoração. */
.hero-orb {
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%);
  filter: blur(80px);
  /* Máximo 20% opacity para não poluir */
}
```

---

## CHECKLIST DE QUALIDADE DO DESIGN BRIEF

Antes de entregar o `references/design-brief.md`, verifique:

- [ ] Paleta tem no mínimo 5 tokens definidos (bg, surface, text, accent, muted)
- [ ] Tipografia tem família + peso + tamanho definidos para h1, h2, body
- [ ] Efeitos de motion foram listados por prioridade
- [ ] Decisões de mobile foram documentadas
- [ ] A "emoção alvo" está clara e guiará as decisões de cor
- [ ] Elementos a EVITAR foram registrados
- [ ] Nenhum elemento da "lista de anti-padrões" foi incluído sem intenção clara
