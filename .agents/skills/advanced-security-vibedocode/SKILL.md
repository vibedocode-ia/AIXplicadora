---
name: advanced-security-vibedocode
description: Extensão avançada para o Agente de Segurança VibeDoCode. Foco em testes dinâmicos (DAST), Rate Limiting (Anti-DDoS e Denial of Wallet), Red Teaming de Infraestrutura e Automação E2E.
---

# Advanced Security VibeDoCode (Extension)

> **Status:** Módulo de Defesa em Profundidade (Defense in Depth).
> **Integração:** Projetado para atuar como uma expansão natural do fluxo `/vc-security` ou via acionamento isolado pelo agente `security-vibedocode`.

## 🎯 Objetivo da Skill
Elevar a segurança do sistema para o nível "Red Team / Enterprise", não apenas lendo o código estático (SAST), mas validando o comportamento do sistema sob stress, ataques dinâmicos e exploração de infraestrutura.

---

## 🛠️ 1. Vetores de Ataque Adicionados ao Escopo

Ao usar esta skill, o Agente de Segurança deve adicionar as seguintes validações à sua heurística de análise:

### A. Denial of Wallet (Proteção de IA e APIs)
Avaliar se endpoints que consomem recursos pagos (Supabase, OpenAI, Resend, n8n) estão blindados contra rajadas de requisições maliciosas.
- **Validação:** Existem middlewares de *Rate Limiting* (ex: Redis/Upstash)? 
- **Validação:** As chamadas de LLM (ex: Sofia) possuem um teto diário de requisições por usuário/IP?
- **Simulação:** Propor scripts que simulam requisições simultâneas massivas contra as rotas públicas e observar como o Next.js lida com as filas de conexão.

### B. Dynamic Application Security Testing (DAST) Simulado
Procurar por brechas que só aparecem em tempo de execução.
- **Validação:** Autenticação de estado (Session Hijacking).
- **Validação:** Cross-Site Request Forgery (CSRF). As Server Actions ou API Routes possuem verificação de origem (`origin` ou `referer` header checks)?
- **Simulação:** Geração de *Fuzzing payloads* nas rotas que esperam `JSON` para verificar se elas quebram e retornam *Stack Traces* contendo informações sensíveis.

### C. Red Teaming de Infraestrutura (Cloud Audit)
Avaliar como a aplicação está distribuída e isolada.
- **Validação:** As chaves expostas no lado do cliente (`NEXT_PUBLIC_*`) permitem alguma extração de dados caso um atacante faça engenharia reversa no frontend?
- **Validação:** Política de Segurança de Conteúdo (CSP Headers) no `next.config.js` para mitigar domínios maliciosos.
- **Validação:** Regras de Cors (Cross-Origin Resource Sharing) no Next.js e no Supabase.

### D. E2E Security Tests (Testes de Regressão)
Garantir que a segurança nunca seja quebrada em atualizações futuras.
- **Validação:** O projeto possui scripts E2E (como Playwright) focados especificamente em segurança? (Ex: tentar navegar para a URL `/dashboard/ia` sem os cookies corretos).
- **Ação Recomendada:** Escrever relatórios orientando o desenvolvedor a criar testes E2E para o caminho crítico do sistema.

---

## 🚀 2. Como Utilizar Junto ao `/vc-security`

Sempre que a skill `advanced-security-vibedocode` estiver ativa durante o workflow `/vc-security`, o agente deve alterar sua saída para incluir o **Estágio 7 e Estágio 8** do fluxo de auditoria:

### Modificação do Workflow `/vc-security`:
* **Estágio 1 a 6:** Auditoria Tradicional (Arquitetura, Config, SAST, Business Logic).
* **Estágio 7 (Advanced Rate Limit & DoS):** Análise de consumo, proteções de API e integridade financeira (Denial of Wallet).
* **Estágio 8 (Infra & Edge Security):** Auditoria de Headers do Next.js, regras CORS e arquitetura de implantação.

---

## 💻 3. Ações de Remediação (Remediation Plays)

Quando uma vulnerabilidade avançada for encontrada, o agente deve sugerir a implementação rápida destes padrões VibeDoCode:

1. **Implementar Rate Limiting:** Criar um middleware usando Upstash/Redis ou `@upstash/ratelimit` no `middleware.ts` para limitar IPs.
2. **Hardening de Cabeçalhos:** Atualizar `next.config.js` para aplicar `Strict-Transport-Security`, `X-Content-Type-Options` e `Content-Security-Policy`.
3. **Gerar Testes de Regressão:** Escrever um script de teste unitário/E2E em Node.js focado em validar que a API retorna código HTTP 429 (Too Many Requests) durante simulação de sobrecarga.
