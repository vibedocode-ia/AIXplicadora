---
name: vc-sec-11-ai-security
description: "Estágio 11 - Segurança de Agentes IA e Tool Use"
---

# 🤖 Estágio 11: Segurança de Agentes IA & Tool Use

> **Camada:** Proteção Econômica e IA | **Severidade:** CRÍTICA

## Objetivo
Proteger contra prompt injection, vazamento de dados via IA, abuso de ferramentas e ações autônomas indevidas.

## Risco Mitigado
Prompt injection (direto e indireto), data leakage entre usuários, tool abuse, exfiltração via resposta da IA, ações destrutivas sem validação.

## Checklist de Aprovação

- [ ] System prompt NUNCA exposto ao usuário (nem via engenharia reversa)
- [ ] Inputs do usuário tratados como NÃO confiáveis (sanitização pré-LLM)
- [ ] Respostas da IA não vazam secrets, logs ou dados de outros usuários
- [ ] Contexto do usuário isolado (User A não vê dados de User B na IA)
- [ ] Agente não executa ação crítica (delete, transfer, admin) sem política explícita
- [ ] Ferramentas (tools) têm permissões mínimas por escopo
- [ ] Ações de escrita exigem validação contextual (confirmação ou double-check)
- [ ] Rate limit e orçamento por usuário/projeto para chamadas de IA
- [ ] Logs registram: ferramenta chamada, usuário, horário, custo, resultado
- [ ] Teste: prompt injection tentando extrair system prompt retorna resposta genérica
- [ ] Filtro de output para PII (dados pessoais) antes de retornar ao client

## Ferramentas Recomendadas
- Guardrails AI / NeMo Guardrails
- Prompt sanitization middleware customizado
- Monitoramento de custo por chamada (LangSmith, Helicone)

## Evidências Esperadas
- Teste de prompt injection documentado e bloqueado
- Logs de chamadas IA com custo por usuário
- Política de tool use documentada

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
