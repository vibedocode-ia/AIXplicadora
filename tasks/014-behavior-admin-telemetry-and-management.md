# Task 014: Lógica do Painel Administrativo do Super Admin

**Tipo:** behavior
**Camada:** api
**Página relacionada:** /admin
**Prioridade:** P0-crítico
**Depende de:** Task 003, Task 009

## Descrição
Implementar a rota de login restrito e os endpoints de telemetria do Super Admin em /admin. Acesso exclusivo para o usuário 'VibeDoCode' com validação rigorosa de sessão no servidor, listando métricas de tokens, usuários ativos e logs.

## Critério de Conclusão
- [ ] Endpoint POST /api/admin/login permitindo acesso apenas ao usuário VibeDoCode
- [ ] Endpoint GET /api/admin/metrics retornando total de missões, custo de tokens e novos cadastros
- [ ] Listagem de usuários com filtros por papel (STUDENT, PARENT, TEACHER)
- [ ] Proteção estrita no servidor bloqueando qualquer tentativa de acesso não autorizada
