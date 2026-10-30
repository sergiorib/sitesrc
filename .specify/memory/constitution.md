<!--
Sync Impact Report:
- Version change: Template -> 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] -> I. Stack Tecnológica Mandatória (Astro + Vanilla)
  - [PRINCIPLE_2_NAME] -> II. Estrutura de Páginas e Separação de Preocupações
  - [PRINCIPLE_3_NAME] -> III. Arquitetura de Design e UI (Dark Tech Dashboard)
  - [PRINCIPLE_4_NAME] -> IV. Regras de Workflow, Versionamento e Automação
  - [PRINCIPLE_5_NAME] -> V. Convenção de Nomenclatura de Especificações (.specify)
- Added sections:
  - Diretrizes de Qualidade e Desempenho
  - Fluxo de Desenvolvimento e Governança de Código
- Removed sections:
  - None
- Follow-up TODOs:
  - None (All placeholders fully resolved)
-->

# Portfólio de Data Science Constitution

## Core Principles

### I. Stack Tecnológica Mandatória (Astro + Vanilla)
O projeto deve adotar uma base estritamente minimalista, rápida e livre de overhead desnecessário:
- **Framework Estático**: Astro deve ser utilizado EXCLUSIVAMENTE para a estruturação de componentes `.astro`, layouts reutilizáveis, build estático (SSG) e roteamento baseado em arquivos (*file-based routing*).
- **Estilização**: Exclusivamente CSS3 Puro / Vanilla CSS. É expressamente PROIBIDA a instalação ou utilização de utilitários como Tailwind CSS, frameworks como Bootstrap ou bibliotecas de CSS-in-JS.
- **Interatividade no Navegador**: Exclusivamente Vanilla JavaScript puro. É expressamente PROIBIDA a adição ou instalação de frameworks ou bibliotecas de UI reativas client-side (como React, Vue, Svelte, Angular ou similares).

### II. Estrutura de Páginas e Separação de Preocupações
A organização do código fonte deve garantir total isolamento e modularidade por página:
- **Componentes Astro (`.astro`)**: Devem ser restritos a encapsular marcação HTML semântica e esqueleto estrutural.
- **Diretório Raiz de Páginas**: Todas as páginas devem estar obrigatoriamente localizadas na pasta `pages/`.
- **Isolamento de Recursos por Página**: Cada página deve possuir seu próprio subdiretório dedicado (`pages/<nome_pagina>/`), contendo internamente suas próprias pastas de assets e comportamentos:
  - `pages/<nome_pagina>/assets/css/`: Folhas de estilo em CSS puro da respectiva página.
  - `pages/<nome_pagina>/assets/images/`: Imagens e mídias estáticas associadas à página.
  - `pages/<nome_pagina>/assets/js/`: Scripts em Vanilla JS e lógica de UI client-side restritos à página.
- **Encapsulamento Client-Side**: Scripts client-side de uma página devem residir exclusivamente na pasta `assets/js/` de seu respectivo diretório.

### III. Arquitetura de Design e UI (Dark Tech Dashboard)
A identidade estética e a arquitetura visual de cada página devem ser configuradas individualmente sob a estética Dark Tech Dashboard:
- Cada página tem a prerrogativa de definir sua arquitetura de design, estilos particulares e disposição de componentes, mantendo consistência conceitual com a temática tecnológica e analítica de Data Science sem violar a regra de CSS3 puro.

### IV. Regras de Workflow, Versionamento e Automação
O ciclo de vida do repositório deve ser transparente, automatizado e rastreável:
- **Versionamento Automatizado**: O versionamento de código e releases deve ocorrer automaticamente segundo as diretrizes estipuladas na especificação de cada tarefa.
- **Ferramental Mandatório**: Devem ser utilizados o Git e o GitHub CLI (`gh`) para todas as operações de automação de versionamento, gerenciamento de branches, commits e sincronização com o repositório remoto.

### V. Convenção de Nomenclatura de Especificações (.specify)
A rastreabilidade dos ciclos de especificação conduzidos via Spec-Kit é obrigatória e padronizada:
- **Padrão de Nomenclatura**: Todos os arquivos de especificação gerados a partir do comando `/speckit.specify` DEVEM obrigatoriamente seguir o padrão de nomenclatura `spec-[numero_sequencial]_[nome_da_feature].md` (exemplo: `spec-01_pagina_spa.md`, `spec-02_sobre.md`).
- **Localização Obrigatória**: Todas as especificações devem ser armazenadas estritamente no diretório `.specify/specs/`.

## Diretrizes de Qualidade e Desempenho

- **Zero Bloat de Runtime**: Nenhum código deve ser entregue ao cliente sem necessidade estrita. O bundle final de produção deve conter apenas HTML estático compilado, CSS minificado e Vanilla JS estritamente isolado.
- **Desacoplamento e Manutenibilidade**: O isolamento por página (`pages/<nome_pagina>/`) garante que refatorações em uma funcionalidade ou visual não introduzam efeitos colaterais em outras páginas do portfólio.

## Fluxo de Desenvolvimento e Governança de Código

- **Origem via Especificação**: Toda implementação de nova página ou funcionalidade deve obrigatoriamente originar-se de uma especificação criada no diretório `.specify/specs/` seguindo o formato convencionado.
- **Conformidade em Revisão**: Qualquer alteração ou pull request que tente introduzir frameworks reativos (React, Vue, etc.) ou bibliotecas externas de CSS será rejeitada de imediato por violação desta Constituição.

## Governance

- **Autoridade e Supremacia**: Esta Constituição prevalece sobre quaisquer outras práticas, tutoriais ou convenções não documentadas no projeto.
- **Procedimento de Emenda**: Qualquer alteração, inclusão ou revogação de princípios exige:
  1. Justificativa formal documentada;
  2. Incremento da versão constitucional de acordo com o Semantic Versioning (MAJOR para mudanças que quebram princípios existentes, MINOR para novos princípios/seções, PATCH para esclarecimentos e refinamentos textuais);
  3. Atualização das datas de ratificação e emenda.
- **Verificação Contínua**: O Spec-Kit e todos os comandos de planejamento (`/speckit.plan`), tarefas (`/speckit.tasks`) e implementação (`/speckit.implement`) devem validar a conformidade das entregas contra os princípios aqui ratificados.

**Version**: 1.0.0 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29
