---
description: "LLM Advisor: Regras e benchmarks para recomendação inteligente de modelos (Gemini Flash/Pro, Sonnet, Opus) visando eficiência de custo e precisão técnica máxima."
---

# LLM Advisor

**Este documento rege a lógica de recomendação de Inteligência Artificial para cada tipo de contexto no Antigravity e VibeDoCode.**

## 🎯 Objetivo
Evitar o desperdício financeiro (usar Opus para tarefas simples) e prevenir alucinações (usar Flash para arquiteturas complexas). O VibeDoCode Assistant deve, sempre que solicitada uma nova ação, recomendar ativamente o modelo que melhor se encaixa ao prompt atual.

---

## 🧠 Matriz de Decisão de Modelos (2025 Benchmarks)

### 1. Claude 3.5 Sonnet (O "Sparring Partner" Padrão)
*   **Papel**: O "Padrão Ouro" para codificação fluída do dia a dia.
*   **Velocidade**: Alta (ideal para feedback loops iterativos).
*   **Custo**: Moderado (otimizado para produção e geração massiva de arquivos).
*   **Quando usar (Recomendação Padrão)**:
    *   Escrita de componentes React/Next.js UI e estilos Tailwind complexos.
    *   Refatoração de código legado e manutenção técnica.
    *   Criação e correção de APIs do dia a dia (CRUDs).
    *   *Uso recomendado para 80% das tarefas VibeDoCode normais.*

### 2. Gemini 3.1 Pro (High) (O Cérebro Engenheiro)
*   **Papel**: O Pensador Profundo e Planejador Arquitetural. Nível de pensamento alto (alto gasto de tokens por reflexão interna).
*   **Velocidade**: Moderada (Atrasos intencionais por latência de "raciocínio").
*   **Custo**: Relativamente alto/Variável dependendo da complexidade do raciocínio.
*   **Quando usar**:
    *   Design de Sistemas: Planejar tabelas de banco de dados inter-relacionadas complexas.
    *   Pesquisar problemas algorítmicos ou lógica profunda não linear ("Por que esse estado falha em corrida assíncrona").
    *   Geração e revisão de arquivos `spec.md` ou Planos mestres (`PLAN.md`).

### 3. Gemini 3 / 3.1 Flash (Low) (O Veloz e Furioso)
*   **Papel**: Agente executor ultra-rápido de baixo custo. Latência próxima de zero.
*   **Velocidade**: Máxima.
*   **Custo**: Muito Baixo.
*   **Quando usar**:
    *   Pesquisa de arquivos na codebase.
    *   Alterações mecânicas (ex: "Troque a cor de X para Y em 10 arquivos").
    *   Geração de boilerplate ou testes unitários triviais.
    *   "Corrija este erro de digitação/variável".
    *   *Se a tarefa leva <5 segundos de um desenvolvedor humano, peça pro Flash.*

### 4. Claude 3 Opus (A Reconciliação Perfeita)
*   **Papel**: O Auditor Mestre de Alto Risco.
*   **Velocidade**: Baixa (latência notável).
*   **Custo**: Extremamente Caro (Reserved Tier).
*   **Quando usar (Nunca por Padrão)**:
    *   Auditorias de segurança de alto nível (Red-Team).
    *   Reconciliação algorítmica financeira (ex: código de Stripe/Pagamentos ou dados vitais).
    *   *Gatilho de Fallback:* Quando Sonnet ou Pro High tentaram a mesma tarefa 3 vezes e falharam por não conseguirem entender o macro-contexto distribuído do problema.

---

## 🗣️ Protocolo de Comunicação do Advisor

Sempre que a complexidade de um Prompt entregue pelo usuário for discrepante com a LLM atualmente em uso (ou no planejamento de tarefas futuras), o agente orquestrador/planejador DEVE injetar a seguinte mensagem (com a motivação exata).

**Formato da Recomendação:**
```markdown
🤖 **LLM Recommendation**: Mude a LLM para **[Nome do Modelo ideal]** para esta próxima tarefa.
💡 **Motivo**: [Explicação Técnica baseada na Matriz (ex: Opus será um desperdício para esse CSS, use Sonnet; ou Este problema requer raciocínio complexo, suba para Gemini Pro High para evitar bugs)].
```

**Exemplo Prático (Se o usuário usar Opus para mudar cor de botão):**
*"🤖 LLM Recommendation: Mude para **Gemini Flash**. Motivo: Evitar desperdício financeiro; esta é uma alteração CSS tribal e rápida."*
