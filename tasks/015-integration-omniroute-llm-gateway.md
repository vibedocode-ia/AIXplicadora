# Task 015: Integração do Gateway OmniRoute com Failover de Modelos

**Tipo:** integration
**Camada:** api
**Página relacionada:** N/A
**Prioridade:** P0-crítico
**Depende de:** Task 012

## Descrição
Configurar o cliente de integração com o OmniRoute Hub (https://omnirouter.vibedocode.pro/v1) para consumo dos modelos GPT Sol 6.2, GPT Astra e Gemini. Implementar fallback automático de rota via Tailscale (100.87.66.97) caso o endpoint público oscile.

## Critério de Conclusão
- [ ] Módulo de serviço integrando com a API do OmniRoute usando bearer token e SNI Traefik
- [ ] Fallback automático para o IP Tailscale do VPS Hostinger em caso de falha de conexão
- [ ] Roteamento dinâmico de tarefas: GPT Sol para raciocínio socrático e Astra para casos complexos
- [ ] Tratamento de timeout e respostas estruturadas em JSON Schema
