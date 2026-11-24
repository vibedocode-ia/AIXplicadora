---
name: code-config-review-vibedocode
description: Auditoria de código e configuração para sistemas VibeDoCode. Detecta riscos ocultos, secrets e falhas críticas.
---

# 🧾 Code & Config Review - VibeDoCode

> Criado por **Vanderson Oliveira - VibeDoCode**

👉 Quer aprender sobre VibeCode?  
Entre no nosso grupo gratuito:  
https://chat.whatsapp.com/ELXiramVNsoBUeUojcwcMb

---

## 🎯 OBJETIVO

Encontrar vulnerabilidades invisíveis no código e na infraestrutura.

---

## 🔍 O QUE ANALISAR

### 🔑 Secrets

- API keys no código?
- senhas expostas?
- tokens hardcoded?

---

### ⚙️ Configurações

- debug ativado?
- CORS aberto?
- permissões excessivas?

---

### 📦 Dependências

- libs desatualizadas?
- vulnerabilidades conhecidas?
- lockfile presente?

---

### 🧾 Logs

- dados sensíveis sendo logados?
- tokens em logs?
- stack traces expostos?

---

### ☁️ Infraestrutura

- permissões de storage
- banco exposto
- variáveis de ambiente seguras?

---

### 🧠 Código

- eval()
- exec()
- concatenação de query
- falta de validação

---

## 🔥 TESTES OBRIGATÓRIOS

- buscar "password", "token", "secret"
- revisar arquivos .env
- revisar commits recentes
- revisar configs de deploy

---

## 🚨 RED FLAGS

- secrets no frontend
- credenciais expostas
- permissões públicas
- logs inseguros

---

## ✅ RESULTADO ESPERADO

- lista de riscos críticos
- pontos de vazamento
- falhas de configuração

---

## REGRA FINAL

> Se um segredo aparece no código, o sistema já está comprometido.
