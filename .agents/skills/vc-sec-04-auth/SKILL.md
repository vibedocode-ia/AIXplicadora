---
name: vc-sec-04-auth
description: "Estágio 4 - Autenticação Forte"
---

# 🔐 Estágio 4: Autenticação Forte

> **Camada:** Identidade e Acesso | **Severidade:** CRÍTICA

## Objetivo
Proteger a identidade do usuário e a integridade da sessão contra falsificação, roubo e força bruta.

## Risco Mitigado
Session hijacking, brute force, credential stuffing, session fixation, token theft.

## Checklist de Aprovação

- [ ] Cookies com flags: `HttpOnly`, `Secure`, `SameSite=Lax` ou `Strict`
- [ ] Sessão expira por tempo de inatividade (max 30min para admin)
- [ ] Refresh token não acessível via JavaScript (HttpOnly cookie)
- [ ] Rotas privadas exigem validação server-side (não apenas client redirect)
- [ ] MFA disponível e obrigatório para contas administrativas
- [ ] Recuperação de senha com token de uso único + expiração curta (15min)
- [ ] Rate limit no login (max 5 tentativas / minuto / IP)
- [ ] Rate limit no reset de senha
- [ ] Logs para: login falho, login suspeito (novo IP/device), troca de senha
- [ ] OAuth configurado com state parameter para prevenir CSRF
- [ ] Logout invalida sessão no servidor (não apenas apaga cookie local)

## Ferramentas Recomendadas
- Supabase Auth / NextAuth.js / Clerk
- Upstash Rate Limit para proteção de brute force
- Authy / Google Authenticator para MFA

## Evidências Esperadas
- Teste automatizado de login com credenciais inválidas retornando 401
- Teste de sessão expirada retornando redirect
- Configuração de MFA documentada

## Status
`[ ] APROVADO` / `[ ] REPROVADO`
