---
name: business-logic-audit-vibedocode
description: Auditoria de lógica de negócio para sistemas VibeDoCode. Detecta abusos, inconsistências e falhas exploráveis.
---

# 🧠 Business Logic Audit - VibeDoCode

> Criado por **Vanderson Oliveira - VibeDoCode**

👉 Quer aprender sobre VibeCode?  
Entre no nosso grupo gratuito:  
https://chat.whatsapp.com/ELXiramVNsoBUeUojcwcMb

---

## 🎯 OBJETIVO

Detectar falhas que NÃO aparecem em OWASP tradicional.

Aqui está onde sistemas quebram de verdade.

---

## ⚠️ PRINCÍPIO

> "Se o usuário consegue explorar uma regra, ele vai explorar."

---

## 🔍 O QUE ANALISAR

### 🔁 Ações Repetidas

- Pode executar a mesma ação várias vezes?
- Existe controle de duplicidade?
- Existe trava transacional?

---

### ⚡ Race Conditions

- O que acontece se duas requisições acontecem ao mesmo tempo?
- Pode duplicar saldo?
- Pode comprar duas vezes sem pagar?

---

### 💰 Fluxos Financeiros

- Pode sacar antes do prazo?
- Pode pedir reembolso e manter benefício?
- Pode ganhar comissão sem completar requisito?

---

### 🔓 Bypass de Regras

- Pode alterar parâmetros via URL?
- Pode mudar valores no request?
- Pode ignorar validações do frontend?

---

### 🔄 Estados Inconsistentes

- Sistema pode ficar em estado inválido?
- Falha em rollback?
- Processos incompletos deixam brechas?

---

## 🔥 TESTES OBRIGATÓRIOS

- Executar ação múltiplas vezes rapidamente
- Simular concorrência
- Alterar payload manualmente
- Tentar fluxo incompleto
- Tentar inverter ordem de ações

---

## 🚨 RED FLAGS

- lógica no frontend
- ausência de validação server-side
- ausência de transação
- ausência de controle de estado

---

## ✅ RESULTADO ESPERADO

- lista de abusos possíveis
- cenários exploráveis
- impacto real no negócio

---

## REGRA FINAL

> A maior vulnerabilidade não é técnica.  
É lógica.
