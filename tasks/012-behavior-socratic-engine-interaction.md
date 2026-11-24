# Task 012: Motor Pedagógico Socrático e FSM de Missão

**Tipo:** behavior
**Camada:** api
**Página relacionada:** /missao/[id]
**Prioridade:** P0-crítico
**Depende de:** Task 011

## Descrição
Implementar a Máquina de Estados Finita (FSM) da missão e a orquestração de prompts socráticos. Garantir que a IA nunca dê respostas prontas, forneça até 3 pistas graduais adaptadas ao nível acadêmico e verifique o raciocínio do usuário antes de avançar.

## Critério de Conclusão
- [ ] Endpoint POST /api/missions/[id]/interact processando respostas do aluno e comandos de pista
- [ ] FSM transitando corretamente entre DIAGNOSING, CHALLENGING e HINTING
- [ ] System Prompts socráticos impedindo respostas diretas e estimulando o raciocínio ativo
- [ ] Controle de turnos com persistência na tabela mission_turns e budget de contexto
