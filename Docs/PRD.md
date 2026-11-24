# AIXplicadora — Product Requirements Document (PRD)

## 1. Resumo Executivo e Visão Geral do Produto

### 1.1 Visão do produto

A AIXplicadora é uma plataforma universal de aprendizagem e didática socrática. Atende qualquer matéria, curso ou área do conhecimento, do Ensino Fundamental I ao Doutorado. A plataforma ajuda estudantes a compreender e aplicar conceitos, pais e responsáveis a ensiná-los em casa e professores a preparar explicações que façam os alunos pensar.

O usuário define seu nível, matéria e objetivo no cadastro e pode alterá-los durante o uso. Essas escolhas orientam o vocabulário, a profundidade, os exemplos e a sequência de perguntas. Não limitam o acesso a uma disciplina ou etapa de ensino. Uma sessão sobre frações no Fundamental I, uma discussão sobre interpretação de precedentes em Direito e uma revisão de pressupostos estatísticos no Doutorado usam o mesmo fluxo de aprendizagem, com exigências diferentes de rigor e conhecimento prévio.

O objetivo não é maximizar a quantidade de respostas entregues, mas aumentar a capacidade de o aprendiz **explicar o que entendeu e aplicar a ideia em um novo contexto**. A abordagem socrática não impede explicações diretas: quando falta um pré-requisito ou as pistas deixam de ajudar, a plataforma explica o conceito e retoma a verificação de compreensão.

### 1.2 Públicos e modos de uso

| Público | Necessidade | Comportamento esperado |
|---|---|---|
| **Estudante** | Entender um conceito, resolver um problema, revisar um raciocínio ou discutir material acadêmico. | O **Modo Estudante** identifica a dúvida, oferece pistas graduais e verifica a compreensão com uma justificativa, reformulação ou aplicação em outro caso. |
| **Pais ou responsáveis** | Aprender um assunto para explicá-lo em casa e, quando responsáveis legais, criar e gerenciar contas de dependentes. | O **Modo Pai-Educador** explica o conteúdo ao adulto e propõe uma sequência didática para usar com o dependente, incluindo perguntas e pistas adequadas ao nível dele. |
| **Professor** | Encontrar uma forma mais clara e participativa de ensinar um conceito ou discutir um problema. | O **Modo Professor** adapta a explicação ao público, propõe perguntas socráticas, antecipa erros comuns e sugere formas de verificar a compreensão. Não depende de integração com a escola. |

O modo pedagógico define **para quem e com qual finalidade** a explicação é construída. Ele não concede permissões de conta: selecionar o Modo Pai-Educador, por exemplo, não basta para vincular ou gerenciar um dependente.

### 1.3 Fluxo principal de aprendizagem

1. **Apresentar a necessidade.** O usuário digita ou fala sobre o que quer aprender ou ensinar. Pode combinar a pergunta com fotos de caderno, páginas de livros, imagens de exercícios ou diagramas e links externos.
2. **Confirmar o contexto.** A plataforma interpreta os materiais, usa OCR quando aplicável e identifica o que pode ser lido, ouvido ou consultado. Se um trecho ilegível, uma transcrição ambígua ou um link inacessível comprometer a orientação, pede confirmação ou que o usuário forneça o trecho relevante. Não apresenta conteúdo inacessível como se tivesse sido consultado.
3. **Identificar o ponto de partida.** A plataforma ajusta a próxima intervenção ao objetivo, ao nível declarado e ao que o usuário demonstra já compreender. Quando necessário, faz uma pergunta diagnóstica antes de explicar.
4. **Orientar com apoio gradual.** A plataforma oferece uma pista por vez quando isso favorece a autonomia. Pode recorrer a um exemplo ou a uma explicação direta se o usuário estiver bloqueado ou precisar de um pré-requisito.
5. **Verificar compreensão.** O aprendiz explica com as próprias palavras, justifica um passo ou aplica o conceito a uma situação semelhante. Nos modos Pai-Educador e Professor, a plataforma também sugere como o adulto pode conduzir essa verificação com o aprendiz.

Texto e áudio podem ser alternados entre turnos sem reiniciar a sessão. O contexto inclui os materiais já fornecidos e as correções feitas pelo usuário ao longo da conversa.

### 1.4 Escopo do MVP

**Dentro do escopo**

- **Cobertura universal:** qualquer matéria, área ou curso, do Fundamental I ao Doutorado, com nível, matéria e objetivo editáveis durante o uso.
- **Multimodalidade nativa:** texto, fotos de cadernos e livros, imagens de exercícios e diagramas, OCR, links da web e interação por áudio em turnos. São entradas do fluxo principal, não funcionalidades reservadas para uma fase posterior.
- **Três modos pedagógicos:** Estudante, Pai-Educador e Professor.
- **Aprendizagem socrática:** diagnóstico, perguntas orientadoras, pistas graduais, explicações quando necessárias e verificação de compreensão com foco na autonomia.
- **Contas de dependentes:** criação e gerenciamento pelo responsável legal, com declaração obrigatória no cadastro.

A universalidade é um requisito de cobertura, não uma garantia de precisão em todo assunto. Quando a resposta depender de um material não verificado, de dados ausentes ou de uma interpretação incerta, a plataforma deve explicitar a limitação em vez de preencher a lacuna com uma afirmação não sustentada.

**Fora do escopo do MVP — única exclusão formal:** integração direta ou nativa com sistemas escolares, instituições de ensino ou plataformas LMS de terceiros, como Google Classroom e Canvas. Receber um link inserido pelo usuário ou interpretar um material que ele enviou não equivale a integrar-se ao sistema de origem.

### 1.5 Cadastro, menores e proteção de dados

O cadastro exige uma das seguintes declarações para prosseguir:

- **Maior de idade:** o usuário declara ter 18 anos ou mais.
- **Menor de idade:** o responsável legal declara estar ciente do uso e gerencia a conta vinculada do dependente.

O produto deve registrar a modalidade declarada, a data e a versão do termo aceito, distinguindo a identidade do responsável da do dependente. A declaração não substitui os demais requisitos de proteção de dados. O desenho do fluxo deve observar o melhor interesse de crianças e adolescentes, limitar a coleta ao necessário, aplicar controle de acesso às contas vinculadas e definir regras de retenção e exclusão para conversas, imagens e áudio. Os termos, as bases legais aplicáveis e os controles devem ser validados antes do lançamento.

### 1.6 Premissas de implementação e operação

- **Repositório:** `AIXplicadora`, no GitHub.
- **Aplicação:** Next.js 15 com App Router e lógica de negócio no servidor (*Fat Server*), TypeScript em modo estrito e Tailwind CSS.
- **Banco de dados:** PostgreSQL no VPS Hostinger `srv1359371`, operado via Coolify e Docker, conforme a infraestrutura do VibeDoCode.
- **Produção:** [aixplicadora.vibedocode.pro](https://aixplicadora.vibedocode.pro/), com landing page dedicada à conversão dos três públicos.
- **Super Admin:** área em [`/admin`](https://aixplicadora.vibedocode.pro/admin), com autorização no servidor e seed obrigatório do usuário `VibeDoCode`. A credencial inicial deve ser provisionada por segredo de implantação, armazenada apenas como hash no banco e trocada no primeiro acesso. A senha fornecida no briefing não deve ser reutilizada em produção nem versionada no PRD ou no código.

## 2. Pesquisa de Mercado & Benchmark Competitivo Abrangente

### 2.1 Recorte competitivo para o Brasil

A AIXplicadora concorre tanto com tutores especializados quanto com ferramentas que o usuário já utiliza para resolver exercícios, estudar idiomas, pesquisar ou conversar com uma IA. O benchmark compara a **jornada de aprendizagem**, e não apenas a capacidade de gerar uma resposta.

| Segmento | Produto | Força competitiva | O que comparar com a AIXplicadora |
|---|---|---|---|
| Ensino básico | **Khan Academy / Khanmigo** | Conteúdo curricular estruturado e tutoria orientada por perguntas no Khanmigo. | É a referência mais próxima em pedagogia. Comparar a adaptação a níveis distintos, o uso de materiais próprios e a passagem entre aprender e preparar uma explicação. Khan Academy e Khanmigo têm ofertas e condições de acesso distintas. |
| Ensino básico e matemática | **Photomath** | Jornada rápida de foto para resolução matemática passo a passo. | Comparar o desempenho com fotos reais e a passagem da demonstração de um procedimento para a justificativa ou aplicação independente. |
| Ensino básico e dever de casa | **Brainly / Brainly Tutor** | Entrada pelo enunciado e acesso a explicações ligadas a dúvidas escolares. | Comparar a rapidez para começar e a progressão após a primeira resposta. Não presumir que os recursos da plataforma Brainly estejam disponíveis na oferta Tutor no Brasil. |
| Idiomas | **Duolingo Max** | Prática recorrente, progressão gamificada e recursos conversacionais vinculados ao aprendizado de idiomas. | Comparar a qualidade dos turnos de voz e do feedback. O recorte de idiomas faz do produto uma referência de interação, não de cobertura universal. |
| Ensino superior e pesquisa | **Perplexity AI** | Busca orientada por perguntas, síntese e referências para consulta. | Comparar como a ferramenta distingue o que veio de uma fonte do que foi inferido e se ajuda o estudante a avaliar a evidência, em vez de apenas resumi-la. |
| Ensino superior, pesquisa e uso geral | **Claude** | Conversa aberta e análise de textos, imagens e documentos, conforme a oferta. | Comparar o rigor com material acadêmico e o esforço necessário para manter uma prática pedagógica consistente sem o usuário ter de escrever instruções detalhadas. |
| Ensino básico a pós-graduação e uso geral | **ChatGPT Plus** | Assistência generalista e multimodal, com recursos de estudo guiado conforme produto e disponibilidade. | Comparar a experiência de estudo guiado e multimodal em condições equivalentes. A diferenciação da AIXplicadora precisa aparecer nos três modos e na gestão de dependentes, não na simples presença de chat, voz ou perguntas socráticas. |

### 2.2 Matriz comparativa — 12 dimensões

A matriz é uma **avaliação qualitativa preliminar**, não uma auditoria de funcionalidades nem de conformidade. Para a AIXplicadora, as células descrevem requisitos do MVP; para os concorrentes, descrevem o posicionamento ou capacidades conhecidas, sujeitas a plano, região, idioma e dispositivo. **A validar** significa que não há confirmação suficiente para a oferta brasileira avaliada; **não central** indica que a capacidade não é o foco do produto, não que necessariamente esteja ausente.

| Dimensão | AIXplicadora — MVP | Khan Academy / Khanmigo | Photomath | Brainly / Brainly Tutor | Duolingo Max | Perplexity AI | Claude | ChatGPT Plus |
|---|---|---|---|---|---|---|---|---|
| **1. Explicação passo a passo** | Pistas e etapas ajustadas à dificuldade | Exercícios guiados e tutoria socrática no Khanmigo | Forte em procedimentos matemáticos | Explicações de tarefas; variam por oferta | Feedback em atividades de idiomas | Sob demanda; foco em pesquisa | Sob demanda | Sob demanda e em estudo guiado |
| **2. Verificação de compreensão** | Justificativa, reformulação ou exercício de transferência | Exercícios, feedback e perguntas de acompanhamento | Verificação de compreensão não central | A validar na oferta Tutor | Prática e feedback estruturados | Sob demanda; não central | Pode ser conduzida na conversa | Disponível em fluxos de estudo guiado; varia com o contexto |
| **3. Personalização por nível** | Nível, matéria e objetivo editáveis durante a sessão | Progressão curricular e adaptação no diálogo | Centrada no exercício e no método | Centrada na pergunta; adaptação a validar | Progressão por curso de idioma | Dirigida pelo pedido do usuário | Dirigida pelo contexto e pelas instruções | Ajustável pela conversa e por recursos de estudo |
| **4. Entrada de texto** | Digitação e trechos de materiais | Busca, atividades e chat, conforme produto | Inserção de expressões | Perguntas digitadas | Respostas e diálogos no contexto do curso | Consultas em linguagem natural | Conversa e documentos | Conversa e documentos |
| **5. Entrada de fotos/OCR** | Fotos, imagens e OCR; confirmação de trechos ambíguos | A validar por recurso | Captura e leitura de expressões matemáticas | Busca por foto na plataforma; validar na oferta Tutor | Não central | Entrada de imagem conforme interface e plano | Imagens e leitura visual conforme oferta | Imagens e leitura visual conforme oferta |
| **6. Entrada de links da web** | URLs como contexto; aviso quando a fonte não puder ser consultada | Não central; a validar no tutor | Não central | A validar na oferta Tutor | Não central | Busca e consulta de fontes web; acesso à URL pode variar | Depende de acesso à web e da fonte | Depende de navegação e do acesso à fonte |
| **7. Áudio** | Entrada falada e interação por voz em turnos | A validar por dispositivo, oferta e idioma | Não central | A validar na oferta Tutor | Escuta, fala e conversação em recursos compatíveis | Voz conforme interface e disponibilidade | Voz conforme interface e disponibilidade | Voz conforme aplicativo e limites da oferta |
| **8. Suporte a nível superior/pós** | Cobertura explícita até o Doutorado | Conteúdo além do básico, sem foco amplo em pós | Matemática avançada em tópicos suportados | Foco escolar; cobertura de pós a validar | Idiomas, sem cobertura disciplinar de pós | Pesquisa e exploração de literatura | Análise e discussão acadêmica generalista | Análise e estudo acadêmico generalista |
| **9. Participação de pais e professores** | Três modos dedicados; responsável gerencia dependentes | Recursos para pais e educadores, conforme produto e região | Uso como apoio, sem gestão de dependentes como foco | Recursos e permissões a validar por oferta | Não central na experiência Max individual | Não central na oferta individual | Não central na oferta individual | Controles parentais e ofertas educacionais variam; não equivalem aos três modos |
| **10. Privacidade/LGPD** | Declaração obrigatória, vínculo com responsável, minimização e controles; validação antes do lançamento | Validar termos, idade e tratamentos para a oferta regional | Validar tratamento de imagens, idade e retenção | Validar dados de menores e distinções entre ofertas | Validar voz, idade e retenção por recurso | Validar uso de consultas, arquivos e controles por plano | Validar termos, idade, uso de dados e retenção por plano | Validar termos, idade, controles e retenção na oferta aplicável |
| **11. Modelo de preço** | A definir; testar disposição a pagar por público | Khan Academy gratuita; acesso ao Khanmigo varia por oferta e região | Modelo freemium, com recursos pagos | Acesso gratuito e ofertas pagas conforme mercado; validar Tutor no Brasil | Max por assinatura em mercados e cursos compatíveis | Acesso gratuito e planos pagos | Acesso gratuito e planos pagos | Plus por assinatura; plano gratuito separado |
| **12. Gamificação pedagógica** | Progressão por autonomia demonstrada; recompensas não são requisito da jornada | Metas, progresso e elementos de domínio | Resolução assistida; gamificação não central | Pontos e reputação comunitária; não equivalem a domínio | Sequências, metas, ligas e feedback frequente | Não central | Não central | Não central na oferta Plus |

A linha de privacidade indica **o que precisa ser verificado**; não classifica nenhum fornecedor como conforme ou não conforme à LGPD. Antes de decisões de posicionamento ou preço, o benchmark deve ser atualizado com data, plano, dispositivo, idioma e disponibilidade no Brasil, separando documentação oficial de comportamento observado em teste.

### 2.3 Lacunas de mercado e diferenciais a validar

O diferencial proposto não depende de um recurso isolado. Tutores especializados já oferecem explicação passo a passo; assistentes generalistas já recebem vários tipos de mídia; produtos educacionais já usam perguntas guiadas. A hipótese da AIXplicadora é que há valor em **combinar essas capacidades em uma jornada que parte do material real do usuário, adapta a didática ao público e termina com evidência de compreensão**.

| Lacuna observada no recorte | Diferencial proposto | Como validar |
|---|---|---|
| Um bom resultado em uma disciplina não implica uma jornada igualmente útil em outras áreas ou níveis. | Um mesmo fluxo pedagógico com adaptação de vocabulário, profundidade e rigor, sem restringir o usuário a um currículo. | Testar tarefas em português do Brasil em exatas, humanas e biológicas, do Fundamental I à pós-graduação. Avaliar correção, adequação ao nível e reconhecimento de incertezas. |
| Entregar o passo a passo não demonstra que o aprendiz consegue raciocinar sozinho. | Pistas graduais seguidas de justificativa ou aplicação em um problema novo. | Comparar, com tarefas equivalentes, uma sessão socrática e uma sessão de resposta direta. Medir se o aprendiz consegue resolver e justificar um novo caso sem ajuda. |
| Ferramentas multimodais podem ler um material sem integrar essa leitura à conversa pedagógica. | Combinar foto, texto, link e áudio na mesma sessão, pedindo confirmação quando o material puder mudar a interpretação. | Testar fotos parcialmente ilegíveis, diagramas, links inacessíveis e alternância entre texto e áudio. Verificar continuidade do contexto e se o sistema distingue leitura confirmada de inferência. |
| Ajudar alguém a aprender e ajudá-lo a ensinar são tarefas diferentes. | Modos próprios para pais e professores, com perguntas, pistas e explicações que o adulto possa usar com outro aprendiz. | Observar responsáveis e professores preparando e conduzindo uma explicação. Medir tempo de preparação, necessidade de reescrita e adequação ao público. |
| O uso por dependentes exige mais do que adaptar a linguagem por idade. | Cadastro com declaração obrigatória e vínculo de gerenciamento pelo responsável legal. | Testar criação e gerenciamento de dependentes, entendimento do termo e bloqueio de acesso entre contas sem vínculo autorizado. |

A principal hipótese de valor do MVP é que **o aprendiz sai da sessão mais capaz de explicar ou aplicar o conceito sem ajuda adicional**. Esse resultado deve orientar a avaliação do produto mais do que a quantidade de respostas, o tempo de conversa ou o volume de anexos processados.

## 3. Personas e Mapeamento da Jornada do Usuário

A AIXplicadora ajuda o usuário a compreender um assunto e a construir seu próprio raciocínio, em vez de apenas receber uma resposta pronta. O produto atende qualquer disciplina ou curso, do Ensino Fundamental I ao doutorado, incluindo áreas como exatas, humanas, biológicas, tecnologia, direito e medicina. O usuário define seu nível, assunto e objetivo no cadastro e pode alterá-los a cada sessão. O nível cadastrado é um ponto de partida, não uma restrição de uso.

Texto, fotos, OCR, links externos e turnos de voz fazem parte do MVP. **A única exclusão de escopo é a integração nativa com sistemas ou instituições escolares externas**, como Google Classroom e Canvas. Usar um link como referência de estudo não equivale a integrar-se ao sistema que o hospeda.

### 3.1 Personas principais

| Persona | Necessidade central | Como usa a AIXplicadora | O que caracteriza sucesso |
|---|---|---|---|
| **Estudante Multidisciplinar** | Compreender um conceito, identificar onde travou ou desenvolver um argumento no nível de seu curso. | Apresenta uma dúvida, um exercício ou um trecho de pesquisa por texto, voz, foto ou link. Escolhe a profundidade da explicação e testa seu entendimento ao longo da sessão. | Explica o raciocínio com suas próprias palavras e o aplica a uma tarefa nova. Isso pode significar resolver um problema semelhante, interpretar uma fonte ou justificar uma escolha metodológica. |
| **Pai/Mãe Educador(a)** | Aprender a explicar um assunto em casa e administrar as contas dos dependentes sob sua responsabilidade. | Inicia uma sessão no modo **“Quero aprender para ensinar”**, informa o nível do filho e pratica perguntas, exemplos e pistas adequados. No Painel Familiar, cria e gerencia contas de dependentes e acompanha seu progresso. | Consegue conduzir a explicação sem fazer a tarefa pelo filho e identifica, pelo relatório, um próximo passo concreto para apoiá-lo. |
| **Professor(a)** | Encontrar metodologias ativas e novas formas de explicar conceitos ou problemas complexos para uma turma. | Informa o nível da turma, os conhecimentos prévios e o objetivo de aprendizagem. Usa a missão para testar perguntas diagnósticas, pistas graduais, representações alternativas e atividades de autonomia. | Sai da sessão com uma sequência didática aplicável e com critérios observáveis para verificar se os alunos compreenderam o conceito. |

### 3.2 Cadastro e primeiro acesso

1. **Identificar a finalidade inicial.** O usuário indica se pretende estudar, aprender para ensinar um dependente ou preparar uma explicação para alunos. A finalidade pode mudar durante o uso, sem exigir uma nova conta.
2. **Registrar a declaração obrigatória.** Antes de concluir o cadastro, o titular aceita explicitamente o Termo de Adesão simplificado, sem opção pré-marcada:  
   > Declaro que sou maior de 18 anos ou que sou o responsável legal pelo usuário menor de idade
3. **Vincular o dependente à conta do responsável.** Quando o usuário final é menor de idade, o responsável legal realiza o aceite e cria ou gerencia a conta vinculada no Painel Familiar. O menor não pode concluir o cadastro por conta própria marcando a declaração destinada ao titular. O sistema registra a versão do termo, a data do aceite e a conta que o realizou.
4. **Definir o contexto inicial.** O usuário informa nível de ensino, matéria ou área e objetivo. No modo familiar ou docente, pode indicar separadamente o próprio nível de conhecimento e o nível de quem receberá a explicação.

### 3.3 Fluxo principal: da dúvida à missão socrática

1. **Apresentar a necessidade.** O usuário digita ou fala sobre o que quer entender, resolver ou ensinar. Pode dizer o que já tentou e em qual ponto ficou em dúvida.
2. **Acrescentar contexto multimodal.** O usuário pode combinar texto, fotos de cadernos ou páginas de livros, imagens de exercícios e diagramas, links externos e turnos de voz. O OCR auxilia na extração de texto das imagens. Quando uma fórmula, legenda ou transcrição estiver ambígua, a AIXplicadora pede confirmação antes de usá-la no raciocínio. Se um link não puder ser consultado, informa a limitação e solicita o trecho relevante.
3. **Ajustar a profundidade.** O usuário escolhe o nível de aprofundamento — por exemplo, introdutório, intermediário ou avançado — e pode pedir uma mudança durante a sessão. Profundidade e etapa acadêmica são independentes: um doutorando pode pedir uma introdução a outra área, e um estudante do ensino básico pode explorar um conceito além do currículo.
4. **Iniciar a missão.** A AIXplicadora confirma o objetivo em linguagem adequada ao público e começa com uma pergunta diagnóstica, em vez de apresentar a solução de imediato. O usuário pode alternar entre texto e voz e adicionar novos materiais sem reiniciar a sessão.

### 3.4 Ciclo da sessão socrática

**Diagnóstico → Pista 1 → Pista 2 → Verificação de Raciocínio → Exercício de Autonomia → Fechamento**

| Etapa | Comportamento esperado |
|---|---|
| **Diagnóstico** | Identifica o que o usuário já compreende, o que tentou e onde surgiu o bloqueio. Em tarefas abertas, explicita o objetivo e os critérios de uma boa resposta. |
| **Pista 1** | Faz uma pergunta ou oferece uma observação curta que ajude o usuário a encontrar o próximo passo sem entregá-lo. |
| **Pista 2** | Se o bloqueio persistir, oferece apoio mais concreto: divide o problema, muda a representação ou usa um exemplo análogo. Se o usuário avançar com a primeira pista, passa à verificação sem acrescentar ajuda desnecessária. |
| **Verificação de Raciocínio** | Pede ao usuário que explique por que a estratégia, interpretação ou conclusão faz sentido. Uma resposta correta, sem justificativa, não basta para demonstrar compreensão. |
| **Exercício de Autonomia** | Propõe uma tarefa nova, adequada ao objetivo, para verificar se o usuário consegue aplicar a ideia com menos ajuda. Se surgir uma lacuna, retoma a etapa pertinente. |
| **Fechamento** | Resume o que o usuário demonstrou compreender, registra dúvidas pendentes e recomenda um próximo passo. Se a sessão terminar antes do exercício de autonomia, sinaliza que a aplicação independente ainda não foi verificada. |

No modo familiar ou docente, o exercício de autonomia pode consistir em **ensinar o conceito**: o usuário ensaia uma explicação, formula uma pergunta diagnóstica e decide que pista ofereceria diante de um erro provável.

### 3.5 Painel Familiar e relatórios pedagógicos

- **Painel Familiar:** permite ao responsável criar e gerenciar as contas vinculadas, alternar entre dependentes e acompanhar objetivos, temas estudados, dificuldades observadas e próximos passos. As sessões em que o responsável pratica como ensinar ficam separadas do histórico de aprendizagem do dependente.
- **Relatório para responsáveis:** resume o progresso em linguagem clara e sugere formas de apoiar o estudo em casa. Distingue o que o dependente realizou com pistas do que conseguiu aplicar de forma autônoma e indica quando ainda não há evidência suficiente.
- **Relatório para professores:** resume a estratégia elaborada na sessão de preparação: objetivo de aprendizagem, pré-requisitos, perguntas diagnósticas, sequência de pistas, erros prováveis e proposta de atividade de autonomia. Se houver compartilhamento de um resumo de aprendizagem por um estudante ou responsável autorizado, ele é explícito e limitado ao material selecionado. O perfil de professor não concede acesso automático a contas, históricos ou anexos.
- **Privacidade e acesso:** o MVP aplica permissões com base no vínculo familiar ou no compartilhamento explícito. Relatórios usam apenas as informações necessárias à finalidade pedagógica e não incluem, por padrão, transcrições integrais, áudios ou imagens originais. O painel e os relatórios funcionam na própria AIXplicadora, sem depender de integração com LMS.

## 4. Gamificação Pedagógica e Arquitetura de Domínio

A AIXplicadora recompensa a perseverança sem confundi-la com aprendizagem. O objetivo pedagógico é reduzir, ao longo do tempo, a ajuda necessária para o usuário resolver, explicar ou aplicar um conceito. Esse princípio vale para qualquer área e nível, do Ensino Fundamental I ao doutorado. O nível, a matéria e o objetivo informados no cadastro podem ser atualizados durante o uso, sem apagar o histórico.

### 4.1. Missão, Trilha e Progresso de Autonomia

| Elemento | Definição | Regra de produto |
|---|---|---|
| **Missão** | Desafio com início, objetivo observável e encerramento explícito. | Pode nascer de uma dúvida avulsa ou integrar uma trilha. Registra o objetivo, o critério de conclusão e o próximo passo recomendado. Concluir a missão não implica demonstrar autonomia. |
| **Trilha** | Jornada estruturada de qualquer tópico, organizada em missões e pontos de revisão. | Adapta a sequência ao conhecimento prévio, aos objetivos e às evidências do usuário. Permite pular uma etapa, revisá-la ou retomá-la sem perda do progresso anterior. |
| **Progresso de Autonomia** | Histórico da capacidade demonstrada de realizar tarefas com graus diferentes de ajuda. | É registrado por objetivo e contexto. Não deve ser convertido em uma nota global nem extrapolado para tópicos ainda não avaliados. |

A missão começa com a necessidade expressa pelo usuário, que pode ser contextualizada com texto, fotos de cadernos, páginas de livros, imagens de exercícios ou diagramas, links externos e áudio em turnos. Quando o OCR ou a transcrição estiverem ambíguos, a tutoria confirma o trecho relevante antes de usá-lo como base pedagógica.

- **Alunos:** resolvem, explicam ou aplicam conceitos no nível e no contexto que definirem, de um exercício escolar à discussão de um método de pesquisa.
- **Pais e responsáveis:** têm seu próprio espaço para aprender como ensinar em casa. Podem criar e gerenciar contas de dependentes, mantendo separados o histórico e o progresso de cada pessoa.
- **Professores:** podem criar e testar sequências socráticas, perguntas diagnósticas e formas alternativas de explicar um conceito. Testar uma atividade como professor não gera evidência de aprendizagem para alunos.

### 4.2. Pontuação lúdica não é evidência de aprendizagem

**Pontuação lúdica.** Badges e níveis de perseverança reconhecem comportamentos como retomar uma missão, revisar uma estratégia ou tentar outra abordagem. Esses eventos não liberam níveis acadêmicos, não alteram o progresso de autonomia e não geram penalidades por uso de ajuda.

**Evidência de aprendizagem.** Cada registro associa um objetivo a uma tarefa observável, à resposta ou ação do usuário, aos critérios aplicados e ao grau de ajuda recebido naquela tentativa:

| Estado | Critério |
|---|---|
| **Ainda não observado** | Não houve tentativa avaliável, ou o contexto disponível não permite concluir. Não equivale a erro. |
| **Com apoio** | O usuário atingiu o objetivo após receber pistas, exemplos ou orientação parcial. |
| **Autonomia observada** | O usuário atingiu os critérios em tentativa própria, sem pistas de conteúdo nem solução prévia para aquela tarefa. |
| **Transferência observada** | O usuário aplicou o conceito sem pistas em uma tarefa nova e materialmente diferente. |

Recursos de acessibilidade, como leitura em voz alta, transcrição e ampliação de imagem, não contam como pistas. Repetir a solução que a IA acabou de mostrar também não comprova autonomia: nesse caso, a tutoria pode oferecer uma tarefa equivalente, mas nova. Quando a avaliação for inconclusiva, o sistema registra a incerteza em vez de inferir domínio ou dificuldade.

### 4.3. Retomada e resiliência

1. **Pausar sem penalidade.** A missão salva o objetivo, a última tentativa, as pistas já apresentadas e o próximo passo. Pausas não reduzem pontuação nem alteram evidências.
2. **Retomar com contexto.** Ao voltar, o usuário recebe um resumo breve e pode continuar, revisar um pré-requisito ou mudar de objetivo.
3. **Adaptar após erros repetidos.** Em vez de repetir a mesma pergunta ou bloquear a sessão, a tutoria muda a abordagem: divide o problema, verifica um pré-requisito, usa outra representação ou oferece um exemplo análogo.
4. **Reavaliar sem apagar o histórico.** Se uma tentativa posterior exigir mais ajuda, ela é registrada no próprio contexto. Evidências anteriores são preservadas, e a interface indica o que vale revisar.

### 4.4. Modelo de domínio e critérios de aceite

O backend usa **Next.js 15 App Router**, com regras de domínio no servidor (*Fat Server*), **TypeScript estrito** e **PostgreSQL** no ambiente VibeDoCode (VPS Hostinger `srv1359371`, Coolify e Docker Postgres). Tailwind CSS é a base da interface. O servidor valida permissões, transições de estado e gravações; a interface não concede recompensas nem atribui evidências diretamente.

| Entidades | Responsabilidade |
|---|---|
| `User`, `LearningProfile`, `GuardianLink`, `AgeDeclaration` | Identidade, contexto pedagógico editável, vínculo de responsabilidade e versão da declaração de cadastro. |
| `Mission`, `Trail`, `TrailStep`, `Session`, `Turn`, `ContextAsset` | Objetivos, sequência pedagógica, conversa e referências a materiais multimodais. |
| `Attempt`, `HintEvent`, `LearningEvidence` | Tentativas, ajuda recebida e avaliação do objetivo. |
| `GameEvent`, `BadgeAward` | Eventos lúdicos e conquistas, persistidos separadamente das evidências. |

**Critérios de aceite do MVP:**

- O cadastro só é concluído mediante declaração obrigatória de que o usuário tem **18 anos ou mais**, ou de que **o responsável legal está ciente e gerencia a conta**. Para dependentes, o fluxo registra o vínculo de gestão e a versão do termo aceito. A declaração não é apresentada como verificação documental.
- Histórico, anexos e evidências são segregados por perfil. O servidor verifica o vínculo do responsável antes de autorizar operações de gestão. Metadados de custo e progresso não precisam duplicar fotos, áudios ou transcrições.
- Retentativas técnicas não duplicam conquistas nem evidências. O registro usa identificadores idempotentes para cada evento persistido.
- Texto, fotos, OCR, links externos e áudio em turnos estão **dentro do MVP**. A única exclusão de escopo é a **integração nativa com sistemas e instituições escolares externas**, incluindo LMS como Google Classroom e Canvas. O uso de links como contexto não constitui integração nativa.

## 5. Estratégia de Negócio, Modelos de Oferta e Projeção de Custos de IA

As ofertas atendem necessidades diferentes — urgência, recorrência, gestão familiar e compromisso anual — sem restringir a AIXplicadora a uma disciplina ou fase acadêmica. Todas mantêm os canais multimodais do MVP. O que varia é a unidade contratada, a quantidade de perfis e o nível de suporte.

### 5.1. Quatro modelos de oferta para o Brasil

| Oferta | Proposta de valor | Regra comercial |
|---|---|---|
| **Pague por Dever/Dúvida Avulsa** | Acesso imediato após a confirmação do pagamento, para uma necessidade pontual. | A compra habilita uma missão com objetivo delimitado, não uma única mensagem. A janela de retomada e as condições de uso são informadas antes do pagamento. |
| **Assinatura Mensal Individual** | Tutoria recorrente em qualquer matéria ou nível, para um perfil. | Inclui histórico, missões e trilhas. A franquia ou a política de uso justo, se adotada, deve ser exibida antes da contratação. |
| **Plano Mensal Familiar / Multicontas** | Um responsável contrata para si e para múltiplos dependentes, com perfis independentes. | O responsável gerencia os perfis e acompanha o consumo da conta. O número de perfis e a forma de compartilhar a franquia devem ser explícitos. Progresso e evidências nunca são agregados como se pertencessem a uma só pessoa. |
| **Plano Anual Pro** | Desconto frente a 12 mensalidades da oferta individual equivalente e suporte prioritário. | O preço anual, as condições de renovação e a meta de atendimento prioritário devem ser informados na contratação. O plano não é exclusivo para professores. |

Para preços no Brasil, a validação comercial deve testar valores em reais, conversão do avulso para o mensal, adesão familiar e retenção. O checkout deve mostrar o valor total, a periodicidade, as condições de renovação e como cancelar. Uma pausa pedagógica não consome uma nova compra; na oferta avulsa, a retomada segue a janela comunicada no checkout.

### 5.2. Custo estimado por sessão

Para fins de projeção, **sessão** é uma unidade de atividade pedagógica que pode conter vários turnos. Ela não é, necessariamente, a unidade vendida: uma missão avulsa pode exigir mais de uma sessão. A estimativa soma as chamadas de IA e o processamento variável de mídia e links realizados ao longo de todos os turnos.

**Premissas ilustrativas para planejamento.** Os valores abaixo não são cotações de fornecedores. Consideram **US$ 1,00 por milhão de tokens de entrada**, **US$ 4,00 por milhão de tokens de saída** e câmbio de **R$ 5,50/US$**. A sessão textual usa 8 mil tokens de entrada e 2 mil de saída no total, incluindo contexto reenviado e instruções. Os adicionais estimam o custo apenas quando o recurso é usado.

| Componente | Premissa por sessão | Custo estimado |
|---|---|---:|
| Texto e tutoria | 8 mil tokens de entrada e 2 mil de saída | US$ 0,016 |
| Visão e OCR | Duas imagens de caderno ou livro, 2 mil tokens de visão equivalentes e US$ 0,003 de OCR dedicado | + US$ 0,005 |
| Processamento de link | Uma extração de página a US$ 0,001 e 2 mil tokens adicionais de conteúdo | + US$ 0,003 |
| Áudio em turnos | 4 min de transcrição a US$ 0,006/min e 2 min de voz sintetizada a US$ 0,015/min | + US$ 0,054 |

O cenário com imagens supõe que OCR e visão sejam ambos acionados. Em produção, cada etapa é contabilizada somente se for executada. Tokens derivados de OCR, transcrição ou links entram no custo do modelo quando usados, sem contabilizar novamente o que já estiver incluído nos tokens de entrada medidos. Links inacessíveis devem gerar um pedido para o usuário trazer o trecho relevante, em vez de tentativas ilimitadas.

| Perfil de sessão | Custo unitário | Participação inicial hipotética |
|---|---:|---:|
| Texto | US$ 0,016 | 50% |
| Texto + visão/OCR | US$ 0,021 | 25% |
| Texto + visão/OCR + link | US$ 0,024 | 15% |
| Texto + áudio | US$ 0,070 | 10% |
| **Média ponderada** | **US$ 0,02385** | **100%** |

Com **15% de contingência** para variação operacional, essa média equivale a aproximadamente **R$ 0,15 por sessão**. A contingência não substitui a medição de cauda: uma sessão com todos os canais, usando os volumes acima, já custa aproximadamente **R$ 0,49** com a mesma reserva, antes de qualquer aumento no número de turnos.

### 5.3. Projeção por usuário e por conta

| Referência de uso | Volume hipotético | Custo variável estimado |
|---|---:|---:|
| Avulso, por missão | 1 a 3 sessões | R$ 0,15 a R$ 0,45 |
| Mensal Individual, por usuário | 20 sessões/mês | R$ 3,02/mês |
| Familiar, por dependente ativo | 20 sessões/mês | R$ 3,02/mês |
| Familiar, por conta pagante | 60 sessões/mês somadas entre os perfis | R$ 9,05/mês |
| Anual Pro, por usuário | 35 sessões/mês | R$ 5,28/mês ou R$ 63,36/ano |

Os valores usam a média sem arredondamento intermediário e representam **IA e processamento variável de contexto**, não o custo total de servir. Taxas de pagamento, tributos, estornos, suporte, VPS, armazenamento e tráfego devem ser contabilizados separadamente. A decisão de preço deve considerar o custo por missão no avulso, por conta pagante no familiar e ao longo dos 12 meses no Pro. Como teste de sensibilidade, 60 sessões compostas apenas por texto e áudio custariam cerca de **R$ 26,57** nas mesmas condições, contra **R$ 9,05** no cenário médio familiar.

### 5.4. Medição e decisão de preço

- **Medir uso real:** registrar por sessão e conta pagante os tokens, páginas e imagens processadas, minutos de áudio, extrações de links, falhas e retentativas. A telemetria financeira guarda metadados operacionais sem replicar conteúdo pedagógico sensível.
- **Avaliar a distribuição de custos:** acompanhar P50, P90 e P95 por oferta e modalidade, além de sessões por missão e perfis ativos por conta familiar. Conciliar as estimativas com as faturas dos fornecedores.
- **Controlar custo sem comprometer a tutoria:** redimensionar imagens preservando legibilidade, reaproveitar extrações da mesma sessão, selecionar trechos relevantes de links e resumir contexto longo sem perder o objetivo ou o histórico de ajuda. Avisar antes de atingir limites de uso; preservar a missão e seu ponto de retomada.
- **Validar margem de contribuição:** subtrair da receita líquida de tributos e estornos os custos de IA e processamento, taxas de pagamento e demais custos variáveis atribuíveis. Aprovar os preços após o piloto, comparando margem, conversão, retenção e qualidade pedagógica — inclusive se usuários continuam conseguindo resolver tarefas novas sem pistas.

## 6. Requisitos Funcionais do Sistema (RFs)

A AIXplicadora atende três públicos: **estudantes**, **pais/responsáveis educadores** e **professores**. O Super Admin é um papel operacional, não uma persona pedagógica. A plataforma atende qualquer assunto, curso ou área, do Ensino Fundamental I ao Doutorado. O nível, a área e a necessidade são definidos pelo usuário no cadastro e podem mudar durante o uso. Texto, fotos com OCR, links e áudio em turnos fazem parte do MVP. **A única exclusão de escopo é a integração nativa com sistemas ou instituições escolares externas**, como Google Classroom e Canvas; isso não impede o uso de links externos como contexto.

| ID | Descrição | Critérios de aceitação verificáveis |
|---|---|---|
| RF-001 | **Cadastro e perfil pedagógico.** Permitir cadastro como Estudante, Pai Educador ou Professor, com nível, área e necessidade inicial. O papel de Super Admin não pode ser solicitado pelo cadastro público. | **Dado** um visitante na página de cadastro, **quando** concluir os campos e o fluxo de maioridade ou responsabilidade, **então** a conta é ativada no papel escolhido e o perfil pedagógico é salvo. **Dado** um pedido de cadastro com papel administrativo, **quando** o servidor o validar, **então** deve rejeitá-lo sem conceder privilégios. |
| RF-002 | **Declaração obrigatória de maioridade ou gestão por responsável.** Exigir declaração de 18 anos ou mais, ou confirmação de ciência e gestão por responsável legal, sem opções pré-marcadas. | **Dado** um cadastro sem declaração, **quando** for enviado, **então** a ativação é bloqueada. **Dado** um cadastro pelo fluxo de menor, **quando** a confirmação exigida do responsável estiver pendente, **então** a conta permanece pendente e não inicia missões. **Quando** a confirmação válida ocorrer, **então** o sistema registra versão do termo, data, vínculo e evidência do aceite aplicável. |
| RF-003 | **Gestão de dependentes.** Permitir ao Pai Educador legalmente autorizado criar contas de dependentes, gerir o acesso e consultar indicadores de progresso dos dependentes vinculados. | **Dado** um responsável com vínculo válido, **quando** criar ou suspender o acesso de um dependente, **então** a ação é aplicada somente à conta selecionada e fica registrada. **Dado** um dependente sem vínculo válido com o solicitante, **quando** este consultar seu progresso ou tentar alterar seu acesso, **então** a operação é negada. |
| RF-004 | **Autenticação e ciclo de sessão.** Permitir entrada, saída e recuperação de acesso pelos fluxos autorizados para cada papel. | **Dado** um usuário com conta ativa, **quando** autenticar-se, **então** recebe uma sessão para seu papel. **Quando** encerrar a sessão ou concluir a redefinição de senha, **então** a sessão encerrada ou as sessões anteriores, respectivamente, deixam de autorizar chamadas protegidas. |
| RF-005 | **Contexto acadêmico dinâmico.** Permitir selecionar ou descrever nível, área, curso e assunto no cadastro e durante uma missão, sem restringir o usuário a um catálogo fechado. | **Dado** um usuário em uma missão de Matemática do Fundamental I, **quando** alterar o contexto para Filosofia do Direito no Doutorado, **então** o próximo turno usa o novo contexto, com linguagem e profundidade correspondentes, sem reescrever os turnos anteriores. **Dado** um assunto ausente das sugestões, **quando** for informado em texto livre, **então** deve ser aceito. |
| RF-006 | **Entrada por texto.** Aceitar perguntas, enunciados, tentativas de resolução e informações complementares no primeiro turno e nos turnos seguintes. | **Dado** um usuário com uma missão aberta, **quando** enviar texto não vazio, **então** o turno é registrado e considerado pelo motor pedagógico. **Quando** enviar um turno sem texto nem outra modalidade válida, **então** o sistema não o registra e informa como completá-lo. |
| RF-007 | **Entrada por fotos e imagens.** Aceitar fotos de cadernos e páginas de livros, além de imagens de exercícios e diagramas, com prévia e remoção antes do envio. | **Dado** um arquivo de imagem válido, **quando** for anexado, **então** a interface exibe a prévia e permite removê-lo. **Dado** um formato inválido ou arquivo acima do limite informado, **quando** for enviado, **então** o servidor o rejeita e a interface preserva os demais dados do turno. |
| RF-008 | **OCR revisável e interpretação visual.** Extrair texto de imagens, preservar a imagem como contexto visual e permitir revisão da transcrição. | **Dada** uma imagem de teste com texto legível e um diagrama, **quando** o processamento terminar, **então** a transcrição fica editável e o diagrama permanece disponível como contexto visual. **Dado** um trecho ilegível ou uma extração incerta, **quando** isso for detectado, **então** o sistema sinaliza a limitação e solicita revisão ou nova foto, sem tratar o trecho como confirmado. |
| RF-009 | **Links externos como contexto.** Interpretar conteúdo de páginas públicas acessíveis e identificar sua origem, sem contornar autenticação, paywall ou restrições de acesso. | **Dado** um URL público permitido, **quando** seu conteúdo for obtido, **então** o turno identifica a fonte e usa o trecho relevante como contexto. **Dado** um link indisponível, restrito ou bloqueado por segurança, **quando** a leitura falhar, **então** o sistema informa a limitação, aceita um trecho colado pelo usuário e não afirma ter lido a página. |
| RF-010 | **Áudio em turnos.** Aceitar gravação de uma pergunta ou tentativa, transcrevê-la para revisão e oferecer reprodução em áudio da resposta pedagógica. Não exigir chamada contínua. | **Dado** um dispositivo compatível com permissão de microfone, **quando** o usuário gravar e confirmar a transcrição, **então** ela integra o turno e a resposta pode ser reproduzida em áudio. **Dada** uma permissão negada ou falha na transcrição, **quando** isso ocorrer, **então** o usuário pode repetir a gravação ou continuar por texto sem perder os demais anexos. |
| RF-011 | **Composição multimodal.** Combinar texto, imagem, OCR revisado, link e áudio transcrito na mesma missão, sem obrigar o usuário a fornecer todas as modalidades. | **Dado** um turno com pergunta digitada, foto, link e transcrição de áudio, **quando** for confirmado, **então** cada fonte permanece identificável no contexto da missão. **Quando** uma fonte falhar, **então** seu estado fica explícito e o usuário pode tentar novamente ou prosseguir com as fontes válidas. |
| RF-012 | **Abertura e retomada de missão.** Registrar objetivo, contexto acadêmico e estado pedagógico, permitindo retomar uma missão interrompida. | **Dado** um tema ou problema informado, **quando** o usuário iniciar a missão, **então** o objetivo é registrado ou o tutor faz uma pergunta de esclarecimento antes de avançar. **Dada** uma missão em andamento, **quando** for reaberta pelo titular, **então** ela retoma os turnos salvos, a etapa atual e o contexto vigente. |
| RF-013 | **Diagnóstico socrático.** Investigar o ponto de partida e a dificuldade do usuário antes de sugerir o passo seguinte. | **Dado** um exercício com uma tentativa incorreta, **quando** o motor responder, **então** faz uma pergunta específica sobre a etapa em que surgiu a dificuldade, adequada ao nível informado, sem iniciar pela solução integral. **Dado** um pedido conceitual sem tentativa prévia, **quando** a missão começar, **então** o tutor propõe uma pergunta, comparação ou exemplo diagnóstico pertinente. |
| RF-014 | **Orientação adaptativa.** Progredir de perguntas a pistas, exemplos análogos e síntese, conforme as respostas do usuário, com explicação direta quando necessária para destravar a aprendizagem. | **Dado** que o usuário ficou bloqueado após uma pista, **quando** pedir mais ajuda, **então** recebe apoio mais explícito, seguido de uma oportunidade de aplicar a ideia. **Dado** que demonstrou compreender a etapa, **quando** avançar, **então** o tutor não repete a mesma pista como se a dificuldade persistisse. |
| RF-015 | **Modos de atuação por persona.** Adaptar a condução ao objetivo: aprender como Estudante, preparar uma explicação em casa como Pai Educador ou planejar uma intervenção pedagógica como Professor. | **Dado** o mesmo conceito nos três modos, **quando** forem iniciadas missões equivalentes, **então** o Estudante recebe orientação para raciocinar; o Pai Educador recebe uma forma de explicar e verificar entendimento em casa; e o Professor recebe uma sequência de perguntas e dificuldades esperadas para o público indicado. **Quando** um Professor tentar acessar dados de outro usuário sem autorização, **então** o acesso é negado. |
| RF-016 | **Exercício de autonomia.** Propor, após a etapa guiada, uma tarefa nova que avalie a mesma habilidade ou objetivo sem repetir a solução trabalhada. | **Dada** uma missão que alcançou a etapa de verificação, **quando** o exercício de autonomia for apresentado, **então** ele difere do exemplo guiado, explicita o que fazer e não inclui gabarito na apresentação. **Quando** o usuário solicitar apoio antes de responder, **então** a tentativa não é classificada como independente. |
| RF-017 | **Feedback e encerramento da missão.** Avaliar a tentativa por critérios ligados ao objetivo, oferecer devolutiva e registrar o desfecho. | **Dado** um exercício de autonomia respondido, **quando** for avaliado, **então** o usuário recebe feedback sobre o raciocínio e o próximo passo, e a missão registra o desempenho e se houve apoio. **Dado** um exercício não respondido, **quando** o usuário sair ou dispensá-lo, **então** a missão não é contabilizada como autonomia demonstrada. |
| RF-018 | **Histórico e progresso.** Exibir ao usuário suas missões, etapas, exercícios e resultados. Exibir ao responsável vinculado apenas os indicadores de acompanhamento autorizados, sem liberar conversas ou anexos por padrão. | **Dado** um usuário com missões em diferentes estados, **quando** abrir o histórico, **então** pode distinguir missões em andamento, concluídas e encerradas sem demonstração de autonomia. **Dado** um responsável vinculado, **quando** abrir o acompanhamento, **então** vê os indicadores do dependente autorizado; uma tentativa de abrir conteúdo não autorizado é negada pelo servidor. |
| RF-019 | **Direitos do titular.** Receber solicitações de acesso, correção, revogação de consentimento e exclusão, com protocolo e verificação proporcional de identidade ou representação. | **Dado** um titular ou responsável com representação verificada, **quando** enviar uma solicitação, **então** recebe protocolo e pode acompanhar o estado. **Quando** uma exclusão aprovada for executada, **então** a conta é desativada, o conteúdo sai dos sistemas ativos conforme a política de retenção e eventuais exceções legais são informadas. |
| RF-020 | **Landing page pública.** Disponibilizar em `https://aixplicadora.vibedocode.pro/` uma página responsiva que apresente as três personas, a abrangência acadêmica, as modalidades e o fluxo de cadastro. | **Dado** um visitante em dispositivo móvel ou desktop, **quando** acessar a raiz do domínio, **então** encontra proposta de valor, modalidades, aviso de privacidade e chamada para cadastro. **Quando** acionar a chamada, **então** chega ao fluxo correto sem precisar autenticar-se antes. |
| RF-021 | **Acesso seguro do Super Admin e seed obrigatório.** Proteger `/admin` e suas operações no servidor. Criar por seed idempotente o usuário `VibeDoCode`, sem permitir sua criação por cadastro público. | **Dado** um banco limpo de desenvolvimento isolado, **quando** o seed de teste for executado, **então** o usuário `VibeDoCode` com a senha de fixture `Entrar2026@` é criado uma única vez. **Dado** um ambiente público, **quando** o bootstrap for executado, **então** usa um segredo inicial exclusivo injetado pelo Coolify, com troca obrigatória e MFA antes do acesso operacional; a senha de fixture não é aceita. **Dado** um usuário sem o papel administrativo, **quando** acessar `/admin` ou chamar diretamente uma ação administrativa, **então** não recebe dados nem executa a ação. |
| RF-022 | **Operação de contas pelo Super Admin.** Buscar contas por identificador, consultar metadados operacionais e suspender ou restaurar acessos com justificativa, sem acesso rotineiro ao conteúdo pedagógico. | **Dado** um Super Admin autenticado, **quando** suspender uma conta com justificativa, **então** suas sessões são revogadas e a ação é auditada. **Quando** restaurar uma conta, **então** ela só volta a operar se continuar atendendo aos requisitos de ativação, inclusive o vínculo de responsável quando aplicável. |
| RF-023 | **Auditoria administrativa.** Registrar alterações de acesso, papéis, vínculos e tratamento de solicitações de titulares em trilha restrita e protegida contra alterações pela interface. | **Dada** uma ação administrativa bem-sucedida, **quando** seu registro for consultado, **então** constam ator, ação, alvo, data em UTC, resultado e justificativa quando exigida; não constam senhas, tokens ou conteúdo pedagógico bruto. **Quando** houver tentativa de alteração ou exclusão do registro pela interface, **então** ela é negada. |
| RF-024 | **Painel operacional do Super Admin.** Exibir indicadores agregados de ativação, missões, disponibilidade, latência e falhas por modalidade, além da fila de solicitações LGPD. | **Dado** um período com eventos conhecidos, **quando** um Super Admin aplicar o filtro correspondente, **então** os totais e taxas coincidem com a fonte de referência e mostram período, denominador e horário de atualização. **Quando** um recorte tiver volume insuficiente para evitar identificação, **então** o painel suprime o valor conforme a política de agregação. |
| RF-025 | **Controle de qualidade e segurança pedagógica.** Tratar anexos e páginas externas como fontes de contexto, não como instruções do sistema. Sinalizar informação insuficiente ou não verificada e distinguir explicação educacional de orientação profissional individualizada em temas sensíveis. | **Dado** um anexo que contenha comandos para o assistente, **quando** ele for analisado, **então** esses comandos não alteram permissões nem as regras da sessão. **Dada** uma imagem ilegível ou uma fonte inacessível, **quando** faltar informação para orientar o usuário, **então** o tutor pede o trecho necessário em vez de inventá-lo. |

## 7. Requisitos Não-Funcionais (RNFs)

| ID | Requisito | Verificação |
|---|---|---|
| RNF-001 | **Latência de texto:** p95 **< 2 s** entre o recebimento de um turno somente de texto pelo servidor e o envio do primeiro conteúdo pedagógico útil. Confirmações de recebimento, indicadores de digitação e saudações genéricas não contam. | Medir em teste de carga representativo e em produção, incluindo despacho, fila e provedor. Acompanhar separadamente o tempo até a resposta completa. Reportar erros e timeouts junto à latência para que falhas não mascarem o indicador. |
| RNF-002 | **Latência de OCR:** p95 **< 4 s** entre a conclusão do recebimento de uma imagem elegível e a disponibilização da transcrição revisável, incluindo fila e processamento. | Testar com corpus versionado de fotos de caderno, páginas impressas e exercícios, dentro dos limites publicados de formato, resolução e tamanho. Medir separadamente o tempo de upload e a taxa de falhas; validar a legibilidade da saída no corpus de referência. |
| RNF-003 | **Disponibilidade mensal de 99,5%.** Considerar as jornadas críticas de produção: autenticar, abrir missão, obter resposta textual e concluir processamento OCR. Falhas de dependências ou manutenções que impeçam o uso contam como indisponibilidade. | Monitorar externamente as jornadas a cada minuto. Calcular `minutos em que todas as jornadas críticas estão disponíveis ÷ minutos do mês`. Em um mês de 30 dias, o orçamento de indisponibilidade é de 216 minutos. |
| RNF-004 | **Autenticação e proteção de segredos.** Usar TLS, cookies de sessão protegidos, hash de senha com Argon2id, limitação de tentativas e MFA obrigatório para Super Admin. Não versionar senhas, chaves ou tokens de produção. | Pipeline verifica segredos no repositório. Testes verificam atributos de cookies, limitação de tentativas, revogação de sessão e bloqueio de operações administrativas sem MFA. O deploy público falha se receber a senha de fixture do seed. |
| RNF-005 | **Isolamento multitenant por padrão.** Toda consulta ou ação sobre missões, progresso, vínculos e mídia deve ser escopada à conta ou ao espaço autorizado, com checagem no servidor e proteção equivalente no armazenamento. | Testes com duas contas sem vínculo e uma dupla responsável–dependente verificam que a troca de identificadores não permite listar, ler, alterar ou excluir dados de terceiros. URLs de mídia devem ser temporárias, emitidas após autorização e não reutilizáveis fora das condições para as quais foram emitidas. |
| RNF-006 | **Segurança de mídia e leitura de URLs.** Validar tipo real e tamanho no servidor, armazenar mídia de forma privada e impedir que a leitura de links alcance serviços internos. | Testes incluem conteúdo incompatível com a extensão, arquivos acima dos limites e destinos de rede não permitidos. O leitor aceita apenas HTTP(S), bloqueia endereços privados, locais e de metadados e revalida o destino em cada redirecionamento. |
| RNF-007 | **Mobile-first e acessibilidade.** Implementar as jornadas essenciais em Tailwind CSS, sem depender de hover nem de um único método de entrada. Adotar WCAG 2.2 AA nas jornadas essenciais. | Validar cadastro, câmera/anexo, áudio e missão a partir de 320 px de largura, sem rolagem horizontal indevida. Executar verificação manual de teclado, foco, contraste, rótulos e leitor de tela, além de testes automatizados em mobile e desktop. |
| RNF-008 | **Stack e implantação.** Usar o repositório GitHub `AIXplicadora`, Next.js 15 com App Router e TypeScript em modo estrito. Concentrar regras de negócio e autorização no servidor (*Fat Server*). Usar PostgreSQL no Docker/Coolify do VPS Hostinger `srv1359371`, sem expor sua porta à internet. | A CI aprova checagem de tipos, testes e build. O deploy de homologação aplica migrações e confirma comunicação privada entre a aplicação e o PostgreSQL. As rotas públicas de produção respondem sob o domínio definido. |
| RNF-009 | **Privacidade e minimização.** Criptografar tráfego, dados persistidos e backups; limitar os dados enviados a subprocessadores ao necessário para cada tarefa. Não registrar anexos, transcrições, prompts ou credenciais em logs operacionais. | Revisar permissões, configurações de armazenamento, contratos de subprocessadores e amostras de logs. Validar que telemetria de produto não contém conteúdo pedagógico bruto e que provedores não usam os dados para treinamento ou publicidade no MVP. |
| RNF-010 | **Observabilidade e alertas.** Instrumentar latência, indisponibilidade, falhas e filas por modalidade, com correlação técnica sem expor conteúdo do usuário. | Uma simulação em homologação de falha no OCR ou na geração textual dispara alerta e permite identificar a etapa afetada a partir de métricas e identificadores de correlação, sem consultar anexos ou conversas. |
| RNF-011 | **Backups e recuperação.** Manter backups criptografados fora do VPS. Adotar, no MVP, RPO de até 24 horas e RTO de até 8 horas para PostgreSQL e artefatos necessários à restauração. | Realizar restauração em ambiente isolado antes do lançamento e, depois, trimestralmente. Registrar o ponto recuperado, o tempo total e a reaplicação dos registros de exclusão e revogação antes de liberar acesso. |
| RNF-012 | **Resiliência multimodal.** Isolar falhas de OCR, transcrição, síntese de áudio e leitura de links. Limitar filas, aplicar timeouts e tornar novas tentativas idempotentes para o mesmo envio. | Em teste com provedor indisponível, o usuário recebe estado explícito, não perde o rascunho já preenchido e consegue continuar pelas modalidades disponíveis. Repetir a mesma operação não duplica o turno nem a missão. |

## 8. Conformidade Legal e Segurança de Dados (LGPD)

### 8.1 Cadastro, menores de idade e Art. 14

O **melhor interesse da criança e do adolescente** orienta o tratamento de seus dados. A regra de produto é única para todo menor de 18 anos: a conta só é ativada após confirmação de ciência e gestão pelo responsável legal. Uma declaração feita apenas pelo menor não substitui a confirmação do responsável.

- **Maior de idade:** o titular declara ter 18 anos ou mais e recebe o aviso de privacidade no cadastro. A declaração de idade não é apresentada como consentimento genérico para todos os tratamentos.
- **Menor de idade:** o responsável confirma o vínculo e aceita o termo de responsabilidade por fluxo autenticado. Para crianças, quando o consentimento for a base legal aplicável, ele deve ser **específico e em destaque**, prestado por pelo menos um dos pais ou pelo responsável legal. O controlador deve empregar esforços razoáveis para verificar que a confirmação veio de quem possui essa condição. Confirmar um e-mail comprova o controle do endereço, mas não comprova, sozinho, a representação legal.
- **Registro e transparência:** guardar versão do termo, data e hora, conta, vínculo, finalidade e evidência do aceite, coletando apenas o necessário. Disponibilizar informação simples e acessível, adequada também à compreensão de crianças e adolescentes. Manter inventário das finalidades, bases legais, categorias de dados, subprocessadores e transferências internacionais, quando houver.
- **Revogação e perda de vínculo:** disponibilizar canal para revogação de consentimento e contestação da representação. Se a autorização necessária à conta deixar de ser válida, suspender o acesso do menor até a regularização e cessar os tratamentos cuja base deixou de existir.

### 8.2 Publicidade, dados enviados e acesso

É **proibido usar dados de menores para publicidade**, inclusive segmentação, perfilamento comercial, remarketing, criação de audiências ou compartilhamento com redes de anúncios. A proibição abrange dados derivados, como nível escolar, dificuldades e desempenho. Os fluxos autenticados não devem carregar pixels publicitários. Métricas de produto devem usar dados minimizados, com agregação e supressão de grupos pequenos.

Fotos, links e áudios podem conter dados de terceiros ou informações sensíveis. Antes do envio, orientar o usuário a omitir nomes, rostos, documentos e outros identificadores desnecessários. Transmitir aos provedores apenas o contexto necessário à operação contratada. O papel de Super Admin não dá acesso rotineiro a conversas ou anexos; qualquer acesso excepcional de suporte, incidente ou obrigação legal exige finalidade documentada, autorização, prazo e auditoria.

### 8.3 Retenção, exclusão e incidentes

- **Retenção por finalidade:** manter uma tabela versionada para cada categoria de dado, com finalidade, base legal, prazo, evento de início e rotina de descarte. Publicar os critérios no aviso de privacidade. Por padrão, descartar temporários de OCR após o processamento e áudio bruto após a transcrição, salvo falha com necessidade de nova tentativa dentro de prazo curto e documentado. Antes do lançamento, aprovar e configurar os prazos de histórico, anexos, auditoria e backups.
- **Exclusão a pedido:** receber solicitações do titular ou representante legal, verificar sua legitimidade, fornecer protocolo e responder nos prazos aplicáveis. Executar a exclusão nos sistemas ativos e propagar aos subprocessadores, ressalvadas hipóteses legais de conservação. Se houver retenção obrigatória, informar a categoria, a justificativa e o prazo aplicável, com acesso restrito.
- **Backups:** manter cópias isoladas e sujeitas a expiração documentada. Em caso de restauração, reaplicar exclusões e revogações antes de disponibilizar o ambiente, para que contas e dados removidos não voltem a ficar acessíveis.
- **Incidentes:** manter procedimento de detecção, contenção, avaliação de risco e comunicação à ANPD e aos titulares quando exigido, nos prazos aplicáveis. O lançamento depende da validação do termo, do aviso de privacidade, do fluxo de representação e dos contratos de tratamento com provedores.

## 9. Métricas de Sucesso (KPIs) e Matriz de Decisões do MVP

### 9.1 Métricas de aprendizagem, uso e negócio

A métrica primária de aprendizagem é a **taxa de autonomia na primeira tentativa**. Ela deve ser lida junto com a cobertura da avaliação: medir apenas quem respondeu pode superestimar a aprendizagem. Os resultados observados em missões não demonstram, isoladamente, ganho educacional causal.

| Dimensão | KPI | Definição operacional |
|---|---|---|
| Aprendizagem | **Autonomia na primeira tentativa** | Exercícios de autonomia com primeira resposta que atende à rubrica, sem pista ou explicação após a apresentação do exercício, ÷ exercícios com primeira resposta avaliável. Uma tentativa com ajuda permanece no denominador e não entra no numerador. |
| Aprendizagem | **Cobertura da verificação de autonomia** | Missões guiadas com primeira tentativa de autonomia avaliável ÷ missões que iniciaram orientação. Reportar separadamente exercício não apresentado, apresentado sem resposta e respondido. |
| Aprendizagem | **Transferência do aprendizado** | Em missões com diagnóstico inicial e tarefa final comparável, proporção que melhora na mesma habilidade segundo rubrica versionada. Auditar amostras por nível e área; não comparar pontuações brutas de rubricas diferentes. |
| Uso | **Ativação em 24 horas** | Contas elegíveis que iniciam uma missão e recebem um primeiro turno pedagógico útil em até 24 horas ÷ contas ativadas da coorte. Para menores, o relógio começa após a ativação pelo fluxo do responsável. |
| Uso | **Retenção D7** | Contas ativadas que realizam uma ação pedagógica no sétimo dia após a ativação ÷ contas ativadas da coorte com janela completa. Login sem ação pedagógica não conta. |
| Uso | **Sucesso por modalidade** | Entradas aceitas e prontas para uso ÷ tentativas iniciadas, reportadas separadamente para texto, fotos/OCR, links e áudio. Separar erro técnico, bloqueio por segurança, cancelamento e falha de permissão ou acesso externo. |
| Negócio | **Conversão da landing em ativação** | Sessões elegíveis da landing atribuídas de forma privativa a uma conta ativada em até sete dias ÷ sessões elegíveis da landing. Remover tráfego automatizado conhecido e explicitar a cobertura de atribuição. |
| Negócio | **Custo variável por missão concluída** | Soma dos custos de inferência, OCR, áudio e leitura de links no período ÷ missões efetivamente concluídas no mesmo período. Apurar também o custo por missão iniciada para tornar visível o custo dos abandonos. |
| Negócio | **Conversão paga, quando aplicável** | Contas elegíveis com primeiro pagamento confirmado ÷ contas elegíveis expostas à oferta na mesma coorte. Sem oferta ativa, reportar como “não aplicável”, e não como 0%. |

Usar eventos versionados e deduplicados, com coortes por persona, faixa acadêmica ampla e modalidade. Exibir janela, denominador e tamanho da amostra em cada recorte, sem conteúdo bruto nem recortes que permitam identificar menores. Estabelecer metas de aprendizagem, uso e conversão após a linha de base do piloto; as metas técnicas da seção 7 são requisitos do MVP desde o lançamento.

### 9.2 Matriz de decisões do MVP

| Status | Decisão | Implicação ou forma de validação |
|---|---|---|
| [Definida] | Produto universal para Estudante, Pai Educador e Professor, com nível e área dinâmicos. | Validar o fluxo com cenários do Fundamental I ao Doutorado em áreas distintas. Catálogos sugerem opções, mas não bloqueiam temas, cursos ou áreas em texto livre. |
| [Definida] | Texto, fotos com OCR, links e áudio em turnos dentro do MVP. | Cada modalidade tem critérios de aceite, tratamento de falha e telemetria próprios. Uma falha em um canal não impede continuar pelos demais. |
| [Definida] | Missão socrática com diagnóstico, orientação e exercício de autonomia. | Entregar feedback e distinguir conclusão de missão de demonstração de autonomia; tentativas apoiadas não contam como independentes. |
| [Definida] | Declaração de maioridade ou gestão confirmada por responsável; vedação ao uso de dados de menores para publicidade. | Impedir ativação de menores sem confirmação e verificar privacidade, retenção e exclusão antes da abertura pública. |
| [Definida] | Stack VibeDoCode, repositório `AIXplicadora`, domínio de produção e `/admin` com seed seguro. | Manter PostgreSQL no VPS/Coolify, validar isolamento e exigir bootstrap de produção com segredo exclusivo e MFA. A credencial de fixture é restrita a ambiente de teste isolado. |
| [Recomendada] | Revisar a qualidade pedagógica com rubricas por objetivo e amostragem humana. | Usar casos de teste de diferentes áreas, níveis e personas e comparar a avaliação automatizada com revisão humana antes de interpretar indicadores de aprendizagem. |
| [Recomendada] | Liberar o MVP de forma gradual, com baseline por modalidade. | Verificar latência, falhas, custo e qualidade no piloto, sem retirar do escopo nenhuma modalidade prevista. |
| [Hipótese] | A sequência socrática aumenta a autonomia em relação à explicação direta usada isoladamente. | Avaliar com tarefas equivalentes, critérios definidos previamente e comparação apropriada; não inferir causalidade a partir de retenção ou satisfação. |
| [Hipótese] | Reduzir o esforço de digitação por foto e áudio melhora a ativação em mobile. | Medir sucesso no primeiro turno por modalidade e controlar diferenças de público e de complexidade da tarefa antes de atribuir efeito à entrada multimodal. |
| [Futura pós-MVP] | Integrações nativas com LMS, sistemas e instituições escolares externas. | **Única exclusão de escopo atual.** Reavaliar após o MVP, incluindo contratos, governança institucional e permissões. Links públicos usados como contexto continuam dentro do MVP. |
