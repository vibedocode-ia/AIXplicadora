# Spec: AIXplicadora

> Plataforma universal de tutoria socrática ativa e didática para qualquer matéria e nível escolar/acadêmico.

## Visão Geral

- **Tipo:** Web Application Responsiva (Mobile-First).
- **Stack:** Next.js 15 (App Router, Fat Server), TypeScript estrito, Tailwind CSS, PostgreSQL no VPS Hostinger (Docker/Coolify).
- **Domínio:** https://aixplicadora.vibedocode.pro/
- **Usuários:** Estudante (qualquer nível), Pai Educador / Gestor Familiar, Professor e Super Admin. Os três primeiros são públicos pedagógicos; Super Admin é um papel administrativo, não selecionável no cadastro público.
- **Escopo pedagógico:** qualquer matéria, do Ensino Fundamental I ao Doutorado. O nível orienta o vocabulário, a complexidade das perguntas e a evidência de aprendizagem esperada; não restringe a escolha de matéria.
- **MVP:** Landing Page de alta conversão, Onboarding com termo de maioridade/responsável, Mesa da Explicadora Multimodal, Modos de Estudo, Painel Familiar e Área do Super Admin (`/admin`).
- **Convenções desta parte:** toda ação principal deve ser operável por toque e teclado. Erros devem identificar a ação necessária sem depender apenas de cor. Autorização de acesso, persistência e validação de entradas são responsabilidades do servidor; ocultar um componente não substitui uma verificação de permissão.

---

## Páginas

### 1. Página: Landing Page Institucional & Conversão

**Rota:** `/` — https://aixplicadora.vibedocode.pro/

**Descrição:** página pública que permite ao visitante entender o método e decidir se deseja criar uma conta. A primeira tela deve responder a três perguntas: para quem é a plataforma, como a tutoria difere de um gerador de respostas e como começar. O CTA principal é **“Começar agora”**; **“Entrar”** é a ação secundária para quem já tem conta.

#### Componentes

| Componente | Descrição |
|---|---|
| Cabeçalho responsivo | Marca AIXplicadora, âncoras “Como funciona” e “Para quem”, acesso a `/login` e CTA de cadastro. Em telas estreitas, agrupa a navegação sem ocultar a ação principal. |
| Hero institucional | Apresenta a proposta “aprenda explicando seu raciocínio”, o alcance do Fundamental I ao Doutorado e o CTA “Começar agora”. |
| Demonstração do método | Exemplo identificado como ilustrativo: dúvida inicial, pergunta da Explicadora, tentativa do estudante e pista. Não solicita dados nem abre uma missão real. |
| Bloco “Como funciona” | Explica o percurso: trazer uma dúvida por texto, foto ou link; investigar com perguntas e pistas; testar autonomia em um novo exercício. Distingue a leitura de uma foto por OCR do texto digitado pelo estudante. |
| Seletor de público | Três opções: Estudante, Pai Educador / Gestor Familiar e Professor. Mostra um exemplo de uso para o público selecionado e um CTA contextual de cadastro. |
| FAQ e rodapé | Esclarece níveis atendidos, modalidades de entrada e participação do responsável no cadastro de menores. Oferece acesso aos termos e ao aviso de privacidade. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_LAN_01 | Visitante aciona “Começar agora” no hero. | Abre `/cadastro` sem presumir perfil, nível ou aceite de termos. | Happy Path |
| B_LAN_02 | Seleciona um público e aciona o CTA contextual. | Exibe o exemplo correspondente e, ao abrir `/cadastro`, leva o perfil como sugestão editável, não como permissão concedida. | Happy Path |
| B_LAN_03 | Aciona “Como funciona” pelo menu móvel. | Fecha o menu, leva o foco ao bloco correspondente e mantém a demonstração legível sem rolagem horizontal. | Happy Path |
| B_LAN_04 | Aciona “Entrar”. | Abre `/login`; não inicia novo cadastro. | Happy Path |
| B_LAN_05 | Acessa a página com sessão válida e aciona o CTA principal. | Oferece continuidade na área autorizada do perfil autenticado, sem solicitar outra conta. | Edge Case |
| B_LAN_06 | Tenta visualizar a demonstração quando sua mídia não carrega. | Apresenta a sequência socrática em texto; os CTAs permanecem disponíveis. | Erro |

### 2. Página: Cadastro & Onboarding

**Rota:** `/cadastro`

**Descrição:** cria a conta e configura o contexto inicial de aprendizagem. O formulário distingue **quem utilizará a plataforma** de **quem declara ser maior de idade e aceita os termos**. No cadastro de estudante menor, a etapa de aceite deve ser concluída pelo responsável legal. Selecionar “Professor” ou “Pai Educador” não autoriza, por si só, acesso às missões de terceiros.

#### Componentes

| Componente | Descrição |
|---|---|
| Indicador de etapas | Identifica “Perfil”, “Dados e contexto” e “Revisão e aceite”, com ações de avançar e voltar. |
| Seletor de perfil | Estudante, Pai Educador / Gestor Familiar ou Professor. Permite alterar a sugestão recebida da landing page. |
| Dados de acesso | Nome de exibição, e-mail, senha e confirmação de senha. Exibe os requisitos da senha antes do envio e permite alternar sua visibilidade. |
| Contexto pedagógico | Solicita nível de estudo do estudante ou nível que o adulto pretende acompanhar/ensinar. A matéria de interesse é opcional e não limita futuras missões. |
| Identificação do declarante | Distingue adulto em nome próprio de responsável legal cadastrando estudante menor. No segundo caso, identifica o responsável separadamente e solicita seu contato para o registro do aceite. |
| Termo de maioridade / responsável legal | Checkbox obrigatório, inicialmente desmarcado, com texto correspondente ao declarante: “Declaro ser maior de idade e aceito os Termos de Uso” ou “Declaro ser maior de idade, responsável legal pelo estudante identificado e aceito os Termos de Uso em seu nome”. Disponibiliza os termos e o aviso de privacidade antes da confirmação. |
| Revisão e conclusão | Resume perfil, nível, e-mail e condição do declarante, sem exibir a senha. Oferece “Criar conta”, indicação de envio em curso e acesso a `/login`. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_CAD_01 | Escolhe um dos três perfis e avança. | Solicita os dados aplicáveis ao perfil; não oferece criação de Super Admin. | Happy Path |
| B_CAD_02 | Informa que o estudante é menor. | Explica que o responsável deve assumir a etapa, apresenta os campos do declarante e exige o aceite específico antes da criação da conta. | Happy Path |
| B_CAD_03 | Tenta concluir sem aceite ou sem identificação obrigatória do responsável. | Não cria a conta; posiciona o foco na primeira pendência e explica quem deve concluir a etapa. | Edge Case |
| B_CAD_04 | Altera a condição do declarante após marcar o checkbox. | Atualiza o texto, desmarca o aceite anterior e exige nova confirmação; preserva os demais dados ainda aplicáveis. | Edge Case |
| B_CAD_05 | Avança com e-mail inválido ou senhas divergentes. | Identifica o campo incorreto e mantém os demais dados para correção. | Erro |
| B_CAD_06 | Conclui um cadastro válido. | Registra conta, perfil, contexto inicial e evidência do aceite — declarante, condição, versão dos termos e data/hora — em uma única conclusão. Confirma o cadastro e oferece “Entrar” em `/login`. | Happy Path |
| B_CAD_07 | Envia o formulário com e-mail já associado a uma conta. | Não duplica nem altera a conta existente. Apresenta orientação neutra para entrar ou recuperar acesso, sem confirmar publicamente o vínculo do e-mail. | Edge Case |
| B_CAD_08 | Toca em “Criar conta” repetidamente ou perde a conexão durante o envio. | Evita conclusões duplicadas. Sem confirmação do servidor, não anuncia sucesso; oferece nova tentativa que não cria uma segunda conta nem um segundo aceite para a mesma conclusão. | Erro |

### 3. Página: Login e Recuperação de Senha

**Rota:** `/login`

**Descrição:** autentica contas existentes e reúne, na mesma rota, os estados de solicitação de recuperação e definição de nova senha. O destino após o login deve respeitar o perfil e a autorização sobre o recurso solicitado. Credenciais administrativas não são exibidas, sugeridas ou pré-preenchidas.

#### Componentes

| Componente | Descrição |
|---|---|
| Formulário de entrada | E-mail, senha, controle de visibilidade, botão “Entrar” e link de cadastro. |
| Solicitação de recuperação | Ação “Esqueci minha senha”, campo de e-mail, envio de solicitação e retorno ao login. |
| Formulário de nova senha | Exibido após validação do link de recuperação; solicita nova senha e confirmação, com os mesmos requisitos do cadastro. |
| Mensagens de estado | Comunica envio, falha de autenticação, espera temporária, link inválido e conclusão de redefinição. Não revela se um e-mail possui conta. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_LOG_01 | Envia credenciais válidas após ter sido encaminhado de uma missão. | Estabelece a sessão e retoma `/missao/[id]` somente se o destino for interno e a conta continuar autorizada. Na ausência de destino válido, abre a área inicial do perfil. | Happy Path |
| B_LOG_02 | Faz login para acessar `/admin`. | Permite o destino administrativo somente ao Super Admin; para os demais perfis, mantém a área restrita e oferece retorno à área pedagógica. | Edge Case |
| B_LOG_03 | Envia e-mail ou senha incorretos. | Não inicia sessão. Exibe “Não foi possível entrar com esses dados” e oferece recuperação, sem indicar qual credencial falhou. | Erro |
| B_LOG_04 | Solicita recuperação para um e-mail de formato válido. | Responde “Se houver uma conta para este e-mail, você receberá as instruções”. Para conta elegível, envia link temporário de uso único. | Happy Path |
| B_LOG_05 | Abre link válido e confirma uma nova senha compatível com os requisitos. | Atualiza a senha, invalida o link e as sessões anteriores e solicita novo login. | Happy Path |
| B_LOG_06 | Abre link expirado, inválido ou já utilizado. | Não apresenta formulário utilizável; oferece solicitar outro link, sem revelar dados da conta. | Erro |
| B_LOG_07 | Repete tentativas de entrada ou recuperação acima do limite. | Limita temporariamente a operação e orienta tentar depois, sem distinguir e-mails cadastrados dos demais. | Edge Case |

### 4. Página: Mesa da Explicadora / Sessão Socrática Multimodal

**Rota:** `/missao/[id]`

**Descrição:** espaço autenticado de uma missão de estudo. A Explicadora parte do que o estudante já tentou, usa perguntas adequadas ao nível e oferece a menor pista útil para o próximo passo. A sessão aceita texto, fotos de caderno/livro com OCR e links web. Ao final, um **exercício gêmeo** verifica se o estudante consegue aplicar o mesmo conceito em uma situação diferente, sem copiar a solução anterior. Participar como familiar ou professor exige autorização para aquela missão; o perfil isolado não concede leitura do histórico.

#### Componentes

| Componente | Descrição |
|---|---|
| Cabeçalho da missão | Identifica objetivo, matéria, nível e modo de estudo ativo. Diferencia investigação, prática com apoio e verificação de autonomia. |
| Histórico socrático | Conversa cronológica com autoria, tentativas, referências aos anexos e feedback. Distingue o que foi escrito pelo estudante, extraído de uma fonte ou sugerido pela Explicadora. |
| Compositor multimodal | Campo de mensagem e ações “Adicionar foto”, “Adicionar link” e “Enviar”. Permite revisar ou remover materiais antes do envio. |
| Foto e revisão de OCR | Captura pela câmera ou seleção de arquivo, prévia da página e texto reconhecido editável. A imagem permanece consultável para conferir símbolos, fórmulas e diagramas que o OCR possa ter interpretado mal. |
| Anexador de links | Recebe endereço web público, mostra domínio, estado de leitura e trecho disponível para confirmação. Distingue conteúdo lido de mero endereço informado. |
| Balão de pistas graduais | Revela uma pista por solicitação: primeiro uma pergunta de orientação, depois o conceito relevante e, por fim, um passo parcial. Mostra o grau de apoio já usado na tentativa. |
| Cartão de exercício gêmeo | Apresenta problema inédito de mesmo objetivo e dificuldade comparável, com dados, texto ou contexto diferentes. Solicita resposta e justificativa compatíveis com a disciplina. |
| Resumo de aprendizagem | Registra o conceito praticado, a evidência observada e o próximo passo. Distingue “em investigação”, “resolvido com apoio” e “autonomia demonstrada neste objetivo”. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_MIS_01 | Abre uma missão autorizada. | Carrega objetivo, nível, histórico e etapa persistidos. Em missão nova, pergunta o que o estudante quer compreender e o que já tentou. | Happy Path |
| B_MIS_02 | Abre a rota sem sessão válida. | Encaminha a `/login` com retorno interno; não exibe título, mensagens ou anexos antes da autenticação e da autorização. | Edge Case |
| B_MIS_03 | Acessa identificador inexistente ou missão sem permissão. | Exibe o mesmo estado de missão indisponível em ambos os casos, sem expor a existência do recurso ou dados de terceiros. | Erro |
| B_MIS_04 | Envia uma dúvida em texto. | Registra a dúvida e faz uma pergunta diagnóstica específica. Ajusta linguagem e profundidade ao nível sem pressupor que o estudante conhece o procedimento. | Happy Path |
| B_MIS_05 | Pede somente a resposta final durante a investigação. | Reconhece a dificuldade e propõe um primeiro passo executável. Se o estudante não souber começar, oferece a primeira pista em vez de repetir a mesma pergunta. | Edge Case |
| B_MIS_06 | Fotografa ou seleciona uma página de caderno/livro. | Mostra prévia e estado de processamento. Ao concluir o OCR, apresenta a transcrição para conferência antes de usá-la como enunciado. | Happy Path |
| B_MIS_07 | Corrige um sinal, palavra ou fórmula na transcrição e confirma. | Usa a versão confirmada na conversa e mantém a referência à foto; não substitui a correção por nova leitura automática. | Happy Path |
| B_MIS_08 | Envia foto ilegível ou com diagrama que não pôde ser transcrito. | Indica o trecho incerto; solicita nova foto, descrição do diagrama ou digitação manual. Não inventa o conteúdo ausente. | Edge Case |
| B_MIS_09 | Seleciona arquivo incompatível ou acima do limite informado no seletor. | Rejeita o anexo com o motivo e orienta escolher arquivo compatível; preserva o texto da mensagem e os demais anexos válidos. | Erro |
| B_MIS_10 | Adiciona um link público legível. | Mostra domínio e trecho recuperado. Após confirmação, associa a fonte à mensagem e distingue citação da explicação produzida pela tutora. | Happy Path |
| B_MIS_11 | Adiciona endereço inválido, privado, bloqueado ou que exige autenticação. | Não acessa destinos não permitidos nem pede credenciais. Informa que não leu o material e permite colar o trecho relevante ou remover o link. | Erro |
| B_MIS_12 | Envia texto, foto e link com enunciados divergentes. | Expõe a divergência concreta e pergunta qual fonte ou trecho deve orientar a missão antes de propor um caminho de resolução. | Edge Case |
| B_MIS_13 | Apresenta uma tentativa parcialmente correta. | Identifica um avanço verificável e pergunta sobre o primeiro ponto que precisa de revisão, sem descartar todo o raciocínio nem antecipar a solução. | Happy Path |
| B_MIS_14 | Abre “Preciso de uma pista”. | Revela somente o próximo grau, registra o apoio recebido e devolve a iniciativa ao estudante com uma ação curta. Reabrir pista já vista não consome outro grau. | Happy Path |
| B_MIS_15 | Continua sem avançar após a última pista. | Oferece revisar o pré-requisito ou trabalhar um exemplo mais simples. Mantém a tentativa como assistida, sem registrar autonomia. | Edge Case |
| B_MIS_16 | Conclui o problema inicial e aceita “Testar sem ajuda”. | Apresenta um exercício gêmeo centrado no mesmo conceito, inicialmente sem pistas reveladas; não reutiliza o enunciado apenas com a resposta anterior ocultada. | Happy Path |
| B_MIS_17 | Responde ao gêmeo sem ajuda e justifica o procedimento ou interpretação. | Avalia a resposta e o raciocínio conforme o objetivo. Se ambos forem consistentes, registra autonomia **neste objetivo**, explica qual evidência sustentou o resultado e oferece concluir a missão. | Happy Path |
| B_MIS_18 | Fornece resposta plausível ao gêmeo, mas sem evidência suficiente de raciocínio. | Solicita uma justificativa neutra, sem sugerir o passo que falta; mantém a verificação em aberto em vez de aprovar ou reprovar por suposição. | Edge Case |
| B_MIS_19 | Solicita uma pista durante o gêmeo. | Avisa que revelar a pista converterá a tentativa em prática assistida. Se o estudante confirmar, revela a pista e permite nova verificação posterior com outro gêmeo; se cancelar, preserva a tentativa independente. | Edge Case |
| B_MIS_20 | Entrega um gêmeo com erro conceitual. | Não registra autonomia. Indica o conceito a revisitar, retoma a investigação guiada e oferece outro exercício equivalente após a revisão. | Happy Path |
| B_MIS_21 | Perde a conexão durante o envio ou a geração do feedback. | Distingue mensagem não confirmada de mensagem já salva com resposta pendente. Permite tentar novamente sem duplicar turno, pista ou avaliação. | Erro |
| B_MIS_22 | Sai e volta à missão. | Após verificar novamente o acesso, restaura turnos confirmados, fontes associadas, pistas reveladas e estado do gêmeo. Não transforma atividade interrompida em exercício concluído. | Happy Path |

### 5. Página: Histórico & Trilhas de Aprendizagem

**Rota:** `/trilhas`  
**Acesso:** `STUDENT`, limitado ao próprio histórico.

**Descrição:** O aluno consulta seu percurso por competência e pode abrir a missão que sustenta cada evidência de aprendizagem. O mapa distingue três situações: ainda não há evidência, houve prática com apoio e houve demonstração de autonomia. Concluir uma missão ou receber poucas pistas não basta para registrar domínio: é necessário demonstrá-lo em um teste de autonomia da competência.

#### Componentes

| ID | Componente | Especificação visual e funcional |
|---|---|---|
| C_TRI_01 | Filtros do histórico | Seletores de período, competência e situação da missão, com ação para limpar filtros. O período se refere à data da atividade, não à data de criação da competência. |
| C_TRI_02 | Mapa de competências | Exibe nome, estado e data da última evidência de cada competência. Usa rótulos textuais além de cores. O domínio registrado não desaparece quando a evidência está fora do período filtrado. |
| C_TRI_03 | Detalhe da competência | Lista as evidências em ordem cronológica inversa, com missão de origem, data, pistas utilizadas durante a prática e resultado do teste de autonomia, quando realizado. |
| C_TRI_04 | Histórico de missões | Lista objetivo, competência, última atividade e situação de cada missão. Oferece “Retomar” para missões em andamento e “Ver evidências” para missões encerradas. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_TRI_01 | Abrir a trilha. | Carrega o mapa e as missões do aluno autenticado. Se for o primeiro acesso sem atividade, apresenta o mapa como “Sem evidência” e oferece iniciar uma missão. | Happy Path |
| B_TRI_02 | Selecionar uma competência dominada. | Identifica a missão e o teste sem pistas que fundamentam o estado “Autonomia demonstrada”. Mostra separadamente as pistas usadas na preparação. | Happy Path |
| B_TRI_03 | Consultar uma competência praticada sem teste concluído. | Exibe as tentativas e o estado “Autonomia ainda não demonstrada”, sem classificar ausência de teste como reprovação. | Edge Case |
| B_TRI_04 | Aplicar filtros que não retornam missões. | Informa “Nenhuma missão neste recorte” e oferece limpar os filtros; não altera o mapa de domínio acumulado. | Edge Case |
| B_TRI_05 | Retomar uma missão em andamento. | Abre a missão existente na última etapa persistida, sem criar uma nova entrada no histórico. | Happy Path |
| B_TRI_06 | Abrir um detalhe que não pode ser carregado. | Distingue falha de carregamento de ausência de evidência, preserva os filtros e oferece tentar novamente. Para recurso fora do escopo, nega acesso sem revelar dados da missão. | Erro |

### 6. Página: Painel da Família / Portal dos Pais

**Rota:** `/familia`  
**Acesso:** `PARENT`, limitado aos dependentes com vínculo autorizado e ativo.

**Descrição:** O responsável gerencia os vínculos familiares, acompanha o esforço e a autonomia de cada dependente e usa o modo pai-educador para conduzir conversas de estudo. O relatório descreve o que foi observado: tentativas, retomadas, uso de pistas e resultados dos testes. Não interpreta a quantidade de pistas como nota nem compara dependentes entre si.

#### Componentes

| ID | Componente | Especificação visual e funcional |
|---|---|---|
| C_FAM_01 | Gestão de dependentes | Lista vínculos ativos e pendentes; oferece solicitar e encerrar vínculo. Um vínculo pendente não oferece acesso ao relatório. |
| C_FAM_02 | Cabeçalho de contexto | Seletor de dependente e período. Mantém o nome do dependente visível no relatório e no modo pai-educador. |
| C_FAM_03 | Relatório pedagógico | Separa esforço observado (missões praticadas, tentativas e retomadas) de autonomia (competências testadas com e sem ajuda). Exibe período e quantidade de observações que sustentam cada resumo. |
| C_FAM_04 | Modo pai-educador | Apresenta o objetivo da conversa, uma pergunta de abertura, pistas graduais e uma pergunta final para o dependente explicar seu raciocínio. Não permite responder ao teste em nome do aluno. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_FAM_01 | Solicitar vínculo com um dependente. | Registra a solicitação como pendente até a validação do vínculo. A solicitação, por si só, não libera dados pedagógicos. | Happy Path |
| B_FAM_02 | Selecionar outro dependente ativo. | Remove o relatório e as orientações anteriores antes de exibir dados do novo contexto; mantém o período selecionado. | Happy Path |
| B_FAM_03 | Consultar um período sem teste de autonomia. | Mostra o esforço observado e identifica a autonomia como “Sem teste no período”, não como desempenho zero. | Edge Case |
| B_FAM_04 | Ativar o modo pai-educador para uma competência. | Sugere perguntas adequadas à evidência disponível. Se não houver histórico, começa por uma pergunta diagnóstica, sem presumir dificuldade. | Happy Path |
| B_FAM_05 | Confirmar o encerramento de um vínculo. | Revoga o acesso daquele responsável ao dependente, retira-o do seletor e preserva o histórico do aluno. | Happy Path |
| B_FAM_06 | Atualizar um relatório após revogação do vínculo em outra sessão. | Revalida a autorização, não retorna dados e remove o contexto revogado da tela. | Erro |

### 7. Página: Modo Professor / Laboratório Didático

**Rota:** `/professor`  
**Acesso:** `TEACHER`.

**Descrição:** O professor prepara material de mediação a partir de um objetivo pedagógico e do nível da turma. O laboratório gera um roteiro socrático, analogias com limites explícitos e dúvidas prováveis com perguntas de acompanhamento. O resultado é material de planejamento para revisão docente, não uma missão realizada nem uma evidência de aprendizagem de alunos.

#### Componentes

| ID | Componente | Especificação visual e funcional |
|---|---|---|
| C_PRO_01 | Contexto da aula | Campos para competência ou tema, objetivo observável, nível da turma e contexto opcional. Indica quais campos são obrigatórios antes da geração. |
| C_PRO_02 | Roteiro socrático | Organiza o material em diagnóstico, exploração, pistas graduais e teste final sem ajuda. Cada etapa identifica a pergunta e o raciocínio que o professor deve observar. |
| C_PRO_03 | Analogias didáticas | Para cada analogia, explicita o conceito, a correspondência com uma situação familiar e o ponto em que a comparação deixa de valer. |
| C_PRO_04 | Antecipação de dúvidas | Relaciona dúvida provável, indício observável e pergunta que permite investigar o entendimento. Diferencia hipótese pedagógica de dificuldade efetivamente observada. |
| C_PRO_05 | Controles de revisão | Permite editar e regenerar uma seção identificada sem substituir silenciosamente as demais. Sinaliza geração em andamento e falha de geração. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_PRO_01 | Gerar material com objetivo e nível definidos. | Apresenta roteiro, analogias e dúvidas alinhados ao contexto; encerra o roteiro com uma tarefa nova para aplicação autônoma. | Happy Path |
| B_PRO_02 | Solicitar geração sem objetivo pedagógico. | Identifica o campo ausente, mantém os demais valores e não inicia a geração. | Edge Case |
| B_PRO_03 | Rever uma analogia. | Exibe lado a lado a correspondência útil e seu limite, para que o professor possa decidir se a comparação serve à turma. | Happy Path |
| B_PRO_04 | Regenerar uma seção já editada. | Solicita confirmação antes de substituir a edição. Mantém a versão anterior disponível até que a nova seção seja gerada com sucesso. | Happy Path |
| B_PRO_05 | Pedir uma resposta pronta para entregar ao aluno. | Reformula a solicitação como sequência de perguntas e pistas, sem produzir gabarito para a atividade proposta. | Edge Case |
| B_PRO_06 | Solicitar geração durante indisponibilidade do serviço de IA. | Informa a falha, preserva o contexto e as seções existentes e permite repetir a solicitação. Não apresenta material parcial como roteiro concluído. | Erro |

### 8. Página: Painel do Super Admin

**Rota:** `/admin`  
**URL:** `https://aixplicadora.vibedocode.pro/admin`  
**Acesso:** exclusivo da conta administrativa designada **VibeDoCode**, autenticada e autorizada como `SUPER_ADMIN`. Nome de exibição, isoladamente, não comprova identidade.

**Descrição:** O painel apresenta consumo de tokens de IA, volume de missões, usuários ativos e eventos de auditoria. Todos os indicadores identificam o intervalo consultado, o fuso horário e a última atualização. Antes da autorização, a página exibe apenas o acesso restrito, sem carregar métricas ou logs.

#### Componentes

| ID | Componente | Especificação visual e funcional |
|---|---|---|
| C_ADM_01 | Acesso administrativo | Entrada restrita e indicação da sessão administrativa após autenticação. Não oferece cadastro público ou elevação de papel. |
| C_ADM_02 | Filtro do painel | Seleção de período comum aos indicadores e logs, com fuso visível e validação dos limites inicial e final. |
| C_ADM_03 | Consumo de IA | Tokens de entrada, de saída e total por período e modelo. Distingue consumo medido de chamadas sem informação de uso. |
| C_ADM_04 | Volume de missões | Exibe missões distintas criadas e concluídas, pela data do respectivo evento. Uma retomada não conta como criação. |
| C_ADM_05 | Usuários ativos | Conta usuários distintos com ao menos uma ação pedagógica registrada no período. Exclui consultas administrativas e renovação automática de sessão. |
| C_ADM_06 | Auditoria | Lista paginada e somente leitura, com data/hora, identificador do ator, ação, recurso, resultado e identificador de correlação. Permite filtrar por ação e resultado. |

#### Comportamentos

| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B_ADM_01 | Acessar `/admin` sem sessão. | Exibe o login restrito. Não entrega dados administrativos na página nem nas consultas associadas. | Happy Path |
| B_ADM_02 | Autenticar-se com a conta designada VibeDoCode. | Verifica identidade e papel no servidor, registra o acesso e abre o painel no período indicado pelo filtro inicial. | Happy Path |
| B_ADM_03 | Tentar abrir o painel com outra conta ou sem o papel exigido. | Nega acesso, registra a tentativa e apresenta mensagem genérica, sem expor métricas, logs ou detalhes da conta autorizada. | Erro |
| B_ADM_04 | Aplicar um período válido. | Atualiza tokens, missões, usuários ativos e logs no mesmo intervalo. Exibe zero para uma contagem válida sem eventos e “Indisponível” para medição ausente. | Happy Path |
| B_ADM_05 | Informar data final anterior à inicial. | Destaca o intervalo inválido, não executa a consulta e mantém os resultados identificados pelo último período válido. | Edge Case |
| B_ADM_06 | Filtrar ou paginar a auditoria. | Revalida a sessão privilegiada e retorna apenas eventos do recorte, do mais recente ao mais antigo. Sem resultados, informa ausência de eventos; com sessão expirada, remove os dados da tela e exige novo login. | Happy Path / Edge Case |

---

## Regras Globais

### Autenticação e sessão

- As quatro rotas são protegidas. O servidor valida a sessão antes de retornar dados e revalida a autorização a cada leitura ou alteração protegida; ocultar um componente não substitui essa verificação.
- A sessão deve trafegar apenas por conexão segura. Credenciais e segredos de sessão não podem aparecer em URLs, relatórios, mensagens de erro ou logs.
- Expiração, revogação ou logout invalidam o acesso no servidor. A interface remove dados protegidos da tela e exige nova autenticação. O retorno à rota anterior depende de nova verificação de permissão.

### Permissão RBAC

| Papel | Escopo autorizado nesta parte | Restrição obrigatória |
|---|---|---|
| `STUDENT` | `/trilhas`: histórico, evidências e retomada das próprias missões. | Não pode consultar outro aluno alterando o identificador da missão ou competência. |
| `PARENT` | `/familia`: gestão dos próprios vínculos e consulta pedagógica de dependentes ativos. | Não pode consultar dependente pendente ou revogado, realizar teste pelo aluno ou alterar evidências. |
| `TEACHER` | `/professor`: geração e revisão de material didático. | O papel não concede acesso automático a históricos individuais ou relatórios familiares. |
| `SUPER_ADMIN` | `/admin`: indicadores operacionais e leitura de auditoria, exclusivamente para a conta designada. | O painel não permite editar logs, alterar resultados pedagógicos ou assumir a identidade de um usuário. |

A permissão depende de **papel, ação e recurso**. Toda operação não prevista é negada por padrão. A troca de contexto visual não muda o papel da sessão.

### Motor Socrático

1. **Sem resposta pronta:** diante de um exercício, o motor pede que o aluno exponha sua hipótese ou identifique o primeiro passo. Não entrega o resultado, gabarito ou resolução para cópia, inclusive quando o enunciado vier por imagem ou link.
2. **Pistas graduais:** oferece uma pista por vez, ajustada à tentativa observada, e aguarda nova manifestação do aluno. Registra as pistas efetivamente apresentadas, distinguindo-as das apenas disponíveis.
3. **Teste obrigatório de autonomia:** antes de registrar domínio ou concluir a missão com êxito, propõe uma aplicação equivalente, mas não idêntica, sem pistas. Registra a competência avaliada, a tentativa e o resultado.
4. **Ajuda durante o teste:** se o aluno solicitar uma pista, a atividade volta à prática assistida. A tentativa permanece como evidência de prática, mas não comprova autonomia; a validação exige outro teste sem ajuda. Abandono ou interrupção não equivalem a reprovação.

### Multimodalidade

| Entrada ou etapa | Regra de aceitação e tratamento |
|---|---|
| Validação de imagens | Validar formato real, tamanho e dimensões antes do processamento. Rejeitar arquivo incompatível, corrompido ou acima dos limites configurados, indicando como substituí-lo sem perder o texto já informado. |
| Compressão | Reduzir o arquivo preservando a legibilidade de enunciados, diagramas e símbolos. Se a imagem continuar ilegível, solicitar novo envio em vez de inferir o conteúdo. |
| OCR | Exibir o texto extraído para revisão antes de usá-lo como enunciado. Destacar trechos incertos e permitir correção, especialmente de números, sinais e fórmulas. |
| Links | Aceitar somente endereços web públicos permitidos; validar também o destino de redirecionamentos. Não acessar recursos privados ou que exijam credenciais. Se a leitura falhar, solicitar o trecho relevante e não alegar que o conteúdo foi lido. |
| Conteúdo importado | Tratar texto, OCR e conteúdo de links como material de estudo, nunca como instrução para alterar permissões ou contornar as regras socráticas. |

### Banco de dados no VPS

- **Fonte de verdade:** o serviço da aplicação persiste diretamente no PostgreSQL do VPS. O navegador não recebe credenciais de banco. Estado local e respostas do serviço de IA não substituem a persistência da missão, do vínculo ou da evidência.
- **Idempotência de missões:** cada solicitação lógica de criação possui uma chave estável vinculada ao aluno. Duplo clique, repetição após timeout ou reenvio concorrente com a mesma chave e os mesmos dados retornam a mesma missão. Reutilização da chave com dados incompatíveis é rejeitada, sem sobrescrever a missão existente.
- **Consistência pedagógica:** a gravação do teste, da evidência e da transição correspondente de estado deve ser atômica. Repetir a confirmação de uma etapa já persistida não duplica evidências, conclusões ou contagens de missões.
- **Falha de persistência:** a interface só confirma a operação após a gravação. Em falha ou resultado incerto, oferece nova tentativa com a mesma chave da operação, sem exibir domínio ou conclusão não confirmados.
- **Auditoria e métricas:** os indicadores usam eventos persistidos e identificadores distintos conforme a definição de cada métrica. Uma nova chamada efetiva de IA pode consumir tokens mesmo quando não gera nova missão; seu consumo não deve ser apagado pela deduplicação da missão. Os logs registram o mínimo necessário para rastreabilidade, sem credenciais, enunciados completos ou imagens dos alunos.
