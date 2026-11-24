# Auditoria técnica — VibeDoCode

**Veredito:** pelos achados relatados, o VibeDoCode tem uma interface navegável, mas não demonstra um produto operacional de ponta a ponta. O defeito central não é apenas a ausência de uma chave de IA: **a interface consegue sinalizar sucesso sem que o serviço responsável pela operação tenha sido chamado**. Corrigir o provedor, isoladamente, não fará a missão deixar de responder sobre `2x + 5 = 15`.

Esta auditoria se baseia nos arquivos e comportamentos descritos, sem inspeção independente do repositório, do banco ou dos logs. A distinção importa especialmente para segurança: há evidência de uma falha no login do admin, mas não há informação suficiente para afirmar que as APIs administrativas estejam expostas.

## 1. Confrontação: o que existe e o que foi simulado

| Área | O que existe | O que isso não entrega |
|---|---|---|
| **Aluno — missão** | Tela de interação, endpoint `/api/missions/[id]/interact` e serviço socrático identificados. | A tela usa `setTimeout` e devolve uma resposta fixa de álgebra. A existência do endpoint não significa que uma conversa passe por ele, considere o nível do aluno ou avance a FSM. |
| **Professor — Laboratório Didático** | Tela que recebe uma solicitação e exibe um plano. | O plano de “Entropia / Quarto Bagunçado” é fixo. O tempo de espera simula processamento; não há geração de plano a partir da matéria solicitada nesse fluxo. |
| **Família — Pai-Educador** | Visualização de dependentes. | O array em `useState` não representa vínculos persistidos. Ver um aluno na lista não comprova que o responsável tenha vínculo com ele ou acesso autorizado ao seu progresso. |
| **Super Admin** | Formulário de entrada e dashboard renderizado. | O identificador esperado é rejeitado pela comparação com `'vibedocode'`. Os dados do painel são locais; entrar na tela não comprova identidade, papel administrativo nem acesso a dados reais. |
| **Backend e IA** | Há rota de criação, serviços socrático e de autonomia e um módulo OmniRoute descrito como configurado. | A rota tenta gravar identificadores incompatíveis com o schema. Os dois serviços de IA usam outro caminho, que depende de uma credencial ausente. Código presente não equivale a integração operacional. |

**Quanto ao PRD:** as três personas estão representadas na interface, mas seus ciclos de trabalho não estão comprovados. A cobertura do Ensino Fundamental ao Doutorado, as cinco fases socráticas, o Desafio Gêmeo e a multimodalidade também não foram demonstrados em execução. A classificação correta para esses requisitos é **“não verificado de ponta a ponta”**, e não “inexistente”: os achados identificam mocks específicos, não um inventário completo do sistema.

## 2. Causa raiz: o critério de sucesso está na camada errada

O fluxo esperado para uma missão é: **aluno envia interação → API valida identidade e missão → motor aplica a fase pedagógica → provedor responde → backend valida e persiste → tela exibe o resultado confirmado**.

O fluxo observado é: **aluno envia interação → temporizador termina → estado local muda → tela exibe texto fixo**.

Essa substituição explica por que o produto *parece* pronto: a espera, a mensagem e a mudança visual acontecem mesmo quando o banco e a IA não participam. Explica também por que os defeitos coexistem sem se denunciarem: **o mock mascara a falha de integração; a falha de integração não é a causa do mock**. Há uma segunda ruptura, independente, na criação: sem missão persistida, a tela de interação não tem um registro válido sobre o qual operar.

O teste decisivo não é “apareceu uma resposta?”. É: **“a ação produziu o efeito correto na camada responsável, e esse efeito continua observável em uma nova sessão?”**

## 3. Diagnóstico das quatro grandes falhas

### A. Desconexão frontend–backend

Em `app/missao/[id]/page.tsx` e `app/professor/page.tsx`, a lógica de demonstração ocupa o lugar da chamada de negócio. Em `app/familia/page.tsx` e `app/admin/page.tsx`, estado local ocupa o lugar da fonte de dados. `useState` não é o problema: ele é apropriado para rascunhos, carregamento e dados já retornados pela API. O erro é torná-lo **autoridade sobre fatos de negócio**.

**Correção:** ligar a missão à rota de interação existente; definir ou confirmar os contratos de geração de plano, consulta de dependentes e métricas administrativas. As telas devem distinguir carregamento, resultado vazio, sucesso confirmado e erro. Uma falha real nunca deve acionar um conteúdo fixo como se fosse uma resposta válida.

### B. Integração com LLM: OpenAI direta versus OmniRoute

`services/socratic-service.ts` e `services/autonomy-service.ts` chamam diretamente `https://api.openai.com/v1/chat/completions` e dependem de `OPENAI_API_KEY`, ausente no ambiente descrito. Assim, quando executados, esses serviços não utilizam a configuração do `lib/omniroute.ts` e não dispõem da credencial exigida pelo caminho escolhido. Sem logs, não cabe afirmar qual status HTTP chegou ao cliente.

**Correção:** fazer ambos os serviços usarem um adaptador único sobre OmniRoute. Validar configuração, timeout e formato de resposta; distinguir falha do provedor de resposta pedagógica inválida. Adicionar uma chave direta poderia resolver a autenticação daquele caminho, mas **não corrigiria a divergência arquitetural nem conectaria o frontend**.

### C. UUID inválido no PostgreSQL

Valores como `m-123456` e `guest-123456` não são UUIDs. Ao tentar convertê-los para uma coluna `uuid`, o PostgreSQL rejeita a escrita. Tecnicamente, trata-se de **representação inválida para o tipo**, não de erro na gramática da instrução SQL. O banco não falha silenciosamente; se o usuário não vê a falha, é preciso localizar onde o erro deixa de ser propagado ou exibido.

**Correção:** deixar o banco gerar o UUID da missão e retornar o valor gravado, ou gerar um UUID válido no servidor. Para o proprietário, usar o identificador de uma identidade real: inventar um UUID com formato correto não cria um usuário nem satisfaz necessariamente uma chave estrangeira. Se convidados forem requisito, modelá-los explicitamente. A rota só deve retornar sucesso depois da gravação confirmada.

### D. Autenticação e RBAC no Super Admin

Há três questões distintas: **identificador aceito**, **autenticação da pessoa** e **autorização da operação**. A comparação com `'vibedocode'` explica a rejeição de `vibedocode@gmail.com`; trocar a string corrige apenas esse sintoma. Uma comparação no navegador não constitui autenticação, e esconder a página não constitui RBAC.

**Correção:** autenticar por sessão validada no servidor, obter o papel a partir de uma fonte confiável e verificar a permissão em **cada operação administrativa**, não apenas na navegação. Auditar as rotas antes de concluir se existe acesso indevido. O aceite deve demonstrar três casos: requisição sem sessão é recusada; usuário autenticado sem papel adequado é recusado; super admin autorizado recebe dados reais.

## 4. Plano de ação e critérios de aceite

| Ordem | Trabalho necessário | Evidência exigida para concluir |
|---|---|---|
| **1 — Contratos, identidade e persistência** | Conferir schema, chaves estrangeiras e modelo de convidados. Corrigir a criação de missão. Definir contratos de sucesso e erro. Estabelecer sessão, papéis e regras de propriedade antes de conectar telas a dados reais. | Criar missão pela API, obter o UUID gravado e consultá-la em nova sessão autorizada. Uma escrita rejeitada não retorna sucesso. Outro usuário não consegue ler a missão sem permissão. |
| **2 — Primeira jornada vertical: Aluno** | Integrar os serviços ao OmniRoute; ligar `app/missao/[id]/page.tsx` ao endpoint real; persistir histórico e fase. O backend deve controlar as transições da FSM, sem delegar ao texto livre do modelo a decisão final sobre o estado. | Criar, interagir e retomar uma missão após recarga. O histórico e a fase coincidem com o banco. Se o provedor falhar, a UI informa erro e a missão não avança indevidamente. |
| **3 — Professor, Família e Admin** | Substituir o plano fixo por geração contextualizada e persistida. Modelar vínculos responsável–aluno e ações do Pai-Educador previstas no PRD. Alimentar o dashboard com consultas administrativas autorizadas. | O professor recupera o plano criado para sua solicitação; duas famílias com vínculos diferentes veem apenas seus alunos; uma alteração conhecida no banco aparece na métrica administrativa correspondente. |
| **4 — Requisitos pedagógicos e multimodais** | Especificar entradas, saídas e condições de transição das cinco fases. Implementar o Desafio Gêmeo com avaliação de autonomia. Para cada modalidade prevista, conectar entrada, validação, processamento e uso pedagógico do conteúdo. | Casos de teste percorrem as cinco fases, rejeitam transições inválidas e avaliam o desafio. Uma amostra por faixa acadêmica verifica adequação de linguagem e dificuldade. Nos testes multimodais, o resultado depende do conteúdo enviado, não apenas da presença de um arquivo. |
| **5 — Bloqueio de regressão e liberação** | Isolar fixtures em testes ou demonstração explícita. Executar testes de integração com PostgreSQL e uma verificação controlada do OmniRoute no ambiente de implantação. Correlacionar chamadas da UI, API, banco e provedor sem registrar conteúdo sensível desnecessário. | As jornadas críticas passam em ambiente equivalente ao de produção. Falhas induzidas de banco, autorização e provedor são observáveis e nunca produzem sucesso fictício. |

O requisito **“sem alucinação”** merece um aceite próprio: não é tecnicamente honesto prometer taxa zero para saída livre de um LLM. É possível exigir conteúdo de referência validado quando aplicável, recusa quando faltar base, validações determinísticas para respostas verificáveis e avaliação pedagógica por nível. A garantia deve dizer **o que é verificado, como e o que o sistema faz quando não consegue verificar**.

**Decisão recomendada:** não reescrever toda a interface nem declarar o produto pronto após corrigir login e chave. A primeira entrega deve ser **uma missão real, do login à retomada em nova sessão**, com UUID persistido, interação via OmniRoute, fase controlada pelo backend e erro visível quando uma dependência falhar. Esse é o primeiro marco que distingue software operacional de uma demonstração convincente.