<!--
Sync Impact Report:
- Version change: 1.0.0 -> 1.1.0 (MINOR: novo princípio adicionado)
- Justificativa: garantir legibilidade e proporção consistentes em qualquer
  resolução/escala de SO, com escala centralizada e respeito à acessibilidade.
- List of modified principles:
  - None (princípios I–V preservados integralmente)
- Added sections:
  - VI. Apresentação Responsiva e Fluida
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check é derivado dinamicamente; sem alteração)
  - ✅ .specify/templates/spec-template.md (sem referência a princípios específicos)
  - ✅ .specify/templates/tasks-template.md (sem referência a princípios específicos)
- Follow-up TODOs:
  - Specs existentes (spec-01 a spec-07) e o CSS atual devem ser auditados quanto
    à conformidade com o Princípio VI (tamanhos fixos em px, ausência de tokens
    globais de escala).

Histórico:
- 1.0.0 (2026-10-29): ratificação inicial (princípios I–V).
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
- **Padrão de Páginas SPA (`pages/spa/`)**: Toda página da Single PageApplication localizada em `pages/spa/<pagina>.astro` DEVE conter explicitamente o elemento contêiner raiz com `id="page-content"` e importar obrigatoriamente a sua respectiva folha de estilos diretamente no **frontmatter do Astro** (ex: `import '../<pagina>/assets/css/<pagina>.css';`), sendo terminantemente proibido o uso de tags HTML `<link>` estáticas no corpo do documento. Isso garante que o Vite processe, agrupe e localize corretamente os estilos durante o build estático e na navegação dinâmica via roteador SPA.
- **Convenção de Resolução de Assets (`pages/<modulo>/`)**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/<modulo>/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../modulo/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/<modulo>/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/<modulo>/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/<modulo>/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.

### III. Arquitetura de Design e UI (Dark Tech Dashboard)
A identidade estética e a arquitetura visual de cada página devem ser configuradas individualmente sob a estética Dark Tech Dashboard:
- Cada página tem a prerrogativa de definir sua arquitetura de design, estilos particulares e disposição de componentes, mantendo consistência conceitual com a temática tecnológica e analítica de Data Science sem violar a regra de CSS3 puro.

### IV. Regras de Workflow, Versionamento e Automação
O ciclo de vida do repositório deve ser transparente, automatizado e rastreável:
- **Versionamento Automatizado**: O versionamento de código e releases deve ocorrer automaticamente segundo as diretrizes estipuladas na especificação de cada tarefa.
- **Ferramental Mandatório**: Devem ser utilizados o Git e o GitHub CLI (`gh`) para todas as operações de automação de versionamento, gerenciamento de branches, commits e sincronização com o repositório remoto.

### V. Convenção de Nomenclatura de Especificações (.specify)
A rastreabilidade dos ciclos de especificação conduzidos via Spec-Kit é obrigatória e padronizada:
- **Padrão de Nomenclatura**: Todos os arquivos de especificação gerados a partir do comando `/speckit.specify` DEVEM obrigatoriamente seguir o padrão de nomenclatura `spec-[numero_sequencial]_[nome_da_feature].md` (exemplo: `spec-01_spa.md`, `spec-02_sobre.md`).
- **Localização Obrigatória**: Todas as especificações devem ser armazenadas estritamente no diretório `.specify/specs/`.

### VI. Apresentação Responsiva e Fluida
O site deve manter boa legibilidade e proporção visual em qualquer combinação de dispositivo, resolução e escala de exibição:
- **Cobertura de Ambientes**: A apresentação DEVE ser legível e proporcional em larguras de viewport desde celulares (~375px) até monitores de 1920px ou mais, em qualquer escala de tela do sistema operacional (100%, 125%, 150%), com o navegador em 100% de zoom.
- **Dimensionamento Fluido com Limites**: Tamanhos de fonte, espaçamentos e larguras de contêineres DEVEM se adaptar à largura disponível, sempre com limites mínimos e máximos explícitos (ex: `clamp(min, preferido, max)`).
- **Proibições**: São PROIBIDOS tamanhos fixos globais (ex: `font-size` em `px` no `html`/`body` ou contêineres principais com largura fixa em `px`) e qualquer redução artificial de escala da página (ex: `zoom`, `transform: scale()` aplicado ao layout, ou manipulação da `meta viewport` para encolher o conteúdo).
- **Fonte Única de Escala**: A escala tipográfica e de espaçamento DEVE ser centralizada em um único ponto ajustável (conjunto de tokens/variáveis CSS globais em `:root`). Alterar esse ponto deve reajustar proporcionalmente todo o site.
- **Adesão Obrigatória**: Toda página e todo componente DEVEM consumir esse sistema de escala; valores ad hoc que o contornem não são permitidos, salvo exceção justificada na spec da respectiva página.
- **Respeito à Acessibilidade**: O dimensionamento DEVE respeitar as preferências do usuário, em especial o tamanho de fonte padrão configurado no navegador. Para isso, as escalas devem usar unidades relativas (`rem`/`em`) como base dos limites, sem sobrescrever o tamanho raiz com valores absolutos.

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

**Version**: 1.1.0 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-11-17
