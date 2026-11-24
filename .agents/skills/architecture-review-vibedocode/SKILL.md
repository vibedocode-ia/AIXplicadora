---
name: architecture-review-vibedocode
description: Análise de arquitetura de segurança para sistemas VibeDoCode. Avalia autenticação, autorização e estrutura crítica.
---

# 🧱 Architecture Review - VibeDoCode

> Criado por **Vanderson Oliveira - VibeDoCode**

👉 Quer aprender sobre VibeCode?  
Entre no nosso grupo gratuito:  
https://chat.whatsapp.com/ELXiramVNsoBUeUojcwcMb

---

## 🎯 OBJETIVO

Analisar se a base do sistema é segura.

Se a arquitetura estiver errada, todo o resto estará vulnerável.

---

## 🔍 O QUE ANALISAR

### 🔐 Autenticação

- Existe login seguro?
- Usa token ou sessão?
- Tem proteção contra brute force?
- Tokens expiram?

---

### 🛂 Autorização

- Existe separação de usuários?
- Existe controle por role?
- Backend valida permissões?
- Evita acesso direto via ID?

---

### 🔄 Fluxo de Dados

- Onde entra input do usuário?
- Como ele é processado?
- Para onde vai?

---

### 🌐 Superfície de Ataque

- APIs expostas
- Upload de arquivos
- Integrações externas
- Webhooks

---

### 💰 Fluxos Críticos

- pagamentos
- saldo
- recompensas
- afiliados

---

## ⚠️ RED FLAGS

- validação só no frontend
- permissões só visuais
- endpoints públicos sensíveis
- falta de controle de acesso

---

## ✅ RESULTADO ESPERADO

- mapa de risco da arquitetura
- pontos críticos identificados
- falhas estruturais listadas

---

## REGRA

> Arquitetura fraca = sistema vulnerável, independente do código.
