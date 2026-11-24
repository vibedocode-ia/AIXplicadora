---
name: security-test-generator-vibedocode
description: Geração e validação de testes de segurança para sistemas VibeDoCode. Cria cenários reais de exploração e regressão.
---

# 🧪 Security Test Generator - VibeDoCode

> Criado por **Vanderson Oliveira - VibeDoCode**

👉 Quer aprender sobre VibeCode?  
Entre no nosso grupo gratuito:  
https://chat.whatsapp.com/ELXiramVNsoBUeUojcwcMb

---

## 🎯 OBJETIVO

Criar testes que garantam que o sistema:
- é seguro hoje
- continuará seguro amanhã

---

## 🧠 FILOSOFIA

> "Se não existe teste, a falha vai voltar."

---

## 🔍 TIPOS DE TESTES

### 🔐 Autenticação

- login inválido
- brute force
- token expirado
- acesso sem login

---

### 🛂 Autorização

- acesso a dados de outro usuário
- acesso a endpoints restritos
- alteração de permissões

---

### 🧾 Validação de Input

- dados inválidos
- tipos incorretos
- campos ausentes
- payloads maliciosos

---

### 📤 Upload

- arquivos grandes
- tipos inválidos
- arquivos maliciosos
- múltiplos uploads simultâneos

---

### ⚡ Concorrência

- múltiplas requisições simultâneas
- duplicação de ação
- inconsistência de estado

---

### 💰 Lógica de Negócio

- reembolso indevido
- saque antecipado
- duplicação de benefício
- bypass de regras

---

## 🔁 TESTES DE REGRESSÃO

Para cada falha encontrada:

- criar teste específico
- garantir que não volte
- validar após correção

---

## 🧪 EXECUÇÃO

Para cada funcionalidade crítica:

1. gerar testes
2. executar testes
3. validar resultado
4. documentar falhas

---

## 🚨 RED FLAGS

- ausência de testes
- testes só de frontend
- ausência de testes de concorrência
- ausência de testes de segurança

---

## ✅ RESULTADO ESPERADO

- suíte de testes de segurança
- cenários reais cobertos
- proteção contra regressão

---

## REGRA FINAL

> Teste que não existe = vulnerabilidade futura.
