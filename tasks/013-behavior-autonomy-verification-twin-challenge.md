# Task 013: Validação de Compreensão e Exercício Gêmeo de Autonomia

**Tipo:** behavior
**Camada:** api
**Página relacionada:** /missao/[id]
**Prioridade:** P0-crítico
**Depende de:** Task 012

## Descrição
Implementar a geração e avaliação do desafio gêmeo de autonomia. Quando o usuário resolve o problema com pistas, o sistema cria uma questão similar para testar se ele consegue resolver sozinho sem ajuda, gravando a evidência de aprendizagem real.

## Critério de Conclusão
- [ ] Endpoint POST /api/missions/[id]/verify-autonomia avaliando a resolução independente
- [ ] Geração de exercício gêmeo com mesma estrutura lógica mas dados inéditos
- [ ] Registro da evidência na tabela learning_evidences marcando demonstrated_autonomy
- [ ] Transição do estado da missão para COMPLETED com feedback pedagógico final
