# Task 003: Sistema de Autenticação e Seed do Super Admin

**Tipo:** setup
**Camada:** api
**Página relacionada:** /login, /admin
**Prioridade:** P0-crítico
**Depende de:** Task 002

## Descrição
Implementar o serviço de autenticação por cookies HttpOnly seguros e hash de senhas com Argon2id. Criar o seed idempotente do Super Admin com o usuário 'VibeDoCode' e a senha inicial de bootstrap 'Entrar2026@' para acesso restrito à rota /admin.

## Critério de Conclusão
- [ ] Módulo de hash e verificação de senhas com Argon2id funcional
- [ ] Seed idempotente executado criando o Super Admin VibeDoCode com papel SUPER_ADMIN
- [ ] Middleware de proteção de rotas validando sessões administrativas no servidor
- [ ] Mecanismo de limitação de tentativas de login contra ataques de força bruta
