# Task 011: Lógica de Criação de Missão com Ingestão Multimodal

**Tipo:** behavior
**Camada:** full-stack
**Página relacionada:** /missao/[id]
**Prioridade:** P0-crítico
**Depende de:** Task 002, Task 006

## Descrição
Implementar o serviço e endpoint de criação de missões com ingestão multimodal. Suportar recebimento de texto da dúvida, upload de imagens de cadernos/livros (processados via OCR) e extração de metadados de links web enviados pelo usuário.

## Critério de Conclusão
- [ ] Endpoint POST /api/missions/create salvando registro na tabela missions
- [ ] Processamento e armazenamento de imagens de cadernos na tabela mission_attachments
- [ ] Extração de texto via OCR e sanitização de links web fornecidos pelo usuário
- [ ] Inicialização do estado da missão em INITIALIZING com transição para DIAGNOSING
