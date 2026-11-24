# Task 010: Lógica Funcional de Cadastro, Login e Sessões

**Tipo:** behavior
**Camada:** api
**Página relacionada:** /cadastro, /login
**Prioridade:** P0-crítico
**Depende de:** Task 003, Task 005

## Descrição
Implementar os endpoints da API para registro de novos usuários e autenticação. Validar schema Zod de entrada, exigindo obrigatoriamente a aceitação do termo de maioridade (18+) ou autorização do responsável legal, gerando sessão segura via cookies.

## Critério de Conclusão
- [ ] Endpoint POST /api/auth/register validando dados e gravando termo aceito
- [ ] Endpoint POST /api/auth/login emitindo cookies HttpOnly com expiração configurada
- [ ] Bloqueio com erro 400 amigável caso o termo de maioridade não seja marcado
- [ ] Criação automática do registro correspondente em user_profiles
