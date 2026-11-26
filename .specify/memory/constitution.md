<!--
Sync Impact Report:
- Version change: 2.0.2 -> 2.0.3 (PATCH: Convenção de Resolução de Assets — publicação das imagens
  das páginas no build e validação do site compilado com astro preview)
- Anterior: 2.0.1 -> 2.0.2 (PATCH: exceção do Princípio VII estendida às páginas de artigo
  em pages/artigos/artigos_pages/, com contrato de fragmento e isolamento obrigatórios)
- Anterior: 2.0.0 -> 2.0.1 (PATCH: remoção da cláusula de transição, já cumprida)
- Justificativa: todas as páginas (spec-02 a spec-07) foram convertidas para o modelo em
  camadas e aprovadas (registros em .specify/specs/spec-XX_*/migracao.md). A cláusula de
  transição do Princípio III deixa de ser necessária; o catálogo antigo foi arquivado em
  .specify/catalog/arquivo/.
- List of modified principles:
  - III. Arquitetura de Design e UI (removida a cláusula "Transição")
  - VII. Especificação em Camadas (registrada a exceção das subpáginas em HTML estático legado)
- Added sections:
  - None
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ .specify/templates/spec-template.md (já no modelo em camadas; sem alteração)
  - ✅ .specify/templates/plan-template.md (sem alteração)
  - ✅ .specify/templates/tasks-template.md (sem alteração)
- Follow-up TODOs:
  - Converter as subpáginas de projeto do Portfólio (pages/portfolio/projetos/) e as páginas de artigo
    (pages/artigos/artigos_pages/) quando forem reescritas.

Histórico:
- 1.0.0 (2026-10-29): ratificação inicial (princípios I–V).
- 1.1.0 (2026-11-17): Princípio VI (Apresentação Responsiva e Fluida).
- 2.0.0 (2026-11-18): Princípio VII (Especificação em Camadas); III sem estilos próprios por página.
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
  - `pages/<nome_pagina>/data/`: Arquivos de dados (JSON) referenciados pela seção **Fontes de dados** da spec da página.
- **Encapsulamento Client-Side**: Scripts client-side de uma página devem residir exclusivamente na pasta `assets/js/` de seu respectivo diretório.
- **Recursos Compartilhados do SPA**: O que é usado por várias páginas fica em `pages/spa/`:
  - `pages/spa/components/elementos/`: um componente `.astro` por elemento do catálogo (Princípio VII).
  - `pages/spa/assets/css/scale.css` e `pages/spa/assets/css/tokens.css`: tokens globais (Princípio VI).
- **Arquivos Auxiliares fora do Roteamento**: Como `pages/` é o diretório de roteamento do Astro, módulos auxiliares que não são páginas (ex.: `.js` usados em build) DEVEM ter nome iniciado por `_` (ex.: `_config.js`).
- **Padrão de Páginas SPA (`pages/spa/`)**: Toda página da Single PageApplication localizada em `pages/spa/<pagina>.astro` DEVE conter explicitamente o elemento contêiner raiz com `id="page-content"` e importar obrigatoriamente a sua respectiva folha de estilos diretamente no **frontmatter do Astro** (ex: `import '../<pagina>/assets/css/<pagina>.css';`), sendo terminantemente proibido o uso de tags HTML `<link>` estáticas no corpo do documento. Isso garante que o Vite processe, agrupe e localize corretamente os estilos durante o build estático e na navegação dinâmica via roteador SPA.
- **Convenção de Resolução de Assets (`pages/<modulo>/`)**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/<modulo>/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../modulo/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/<modulo>/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/<modulo>/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/<modulo>/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar e conferindo o site compilado com `astro preview` (o servidor de desenvolvimento entrega qualquer arquivo do projeto e não revela imagens ausentes do build).
  5. **Publicação no build**: o Astro só leva para `dist/` o que está em `public/` ou é importado no código. Por isso, a integração `copiar-imagens-das-paginas` em `astro.config.mjs` copia, ao fim do build, cada `pages/<modulo>/assets/images/` para `dist/pages/<modulo>/assets/images/`, preservando os caminhos absolutos do item 2 (spec-01 FR-013).

### III. Arquitetura de Design e UI (Dark Tech Dashboard)
O site segue a estética Dark Tech Dashboard, com identidade visual consistente entre as páginas:
- **Composição por página**: Cada página define livremente sua composição (quais elementos usa, em que hierarquia e com quais estilos e configurações), mantendo consistência conceitual com a temática tecnológica e analítica de Data Science.
- **Aparência pelo catálogo**: A aparência de um elemento vem exclusivamente dos estilos definidos em `.specify/catalog/estilos.md`. Uma página NÃO DEVE sobrescrever estilos do catálogo; quando precisar de uma aparência nova, ela é criada como um novo estilo do elemento no catálogo e então escolhida na spec da página.
- **CSS por página**: Cada página continua com seu próprio arquivo CSS, contendo apenas os elementos e estilos que ela usa, gerados a partir da spec de estilos.

### IV. Regras de Workflow, Versionamento e Automação
O ciclo de vida do repositório deve ser transparente, automatizado e rastreável:
- **Versionamento Automatizado**: O versionamento de código e releases deve ocorrer automaticamente segundo as diretrizes estipuladas na especificação de cada tarefa.
- **Ferramental Mandatório**: Devem ser utilizados o Git e o GitHub CLI (`gh`) para todas as operações de automação de versionamento, gerenciamento de branches, commits e sincronização com o repositório remoto.

### V. Convenção de Nomenclatura de Especificações (.specify)
A rastreabilidade dos ciclos de especificação conduzidos via Spec-Kit é obrigatória e padronizada:
- **Padrão de Nomenclatura**: Todos os arquivos de especificação gerados a partir do comando `/speckit.specify` DEVEM obrigatoriamente seguir o padrão de nomenclatura `spec-[numero_sequencial]_[nome_da_feature].md` (exemplo: `spec-01_spa.md`, `spec-02_sobre.md`).
- **Localização Obrigatória**: Todas as especificações de feature devem ser armazenadas estritamente no diretório `.specify/specs/`.
- **Specs Transversais**: Especificações compartilhadas por todas as páginas (notação de estrutura, catálogo de elementos, spec de estilos e seus formatos) ficam em `.specify/catalog/`.

### VI. Apresentação Responsiva e Fluida
O site deve manter boa legibilidade e proporção visual em qualquer combinação de dispositivo, resolução e escala de exibição:
- **Cobertura de Ambientes**: A apresentação DEVE ser legível e proporcional em larguras de viewport desde celulares (~375px) até monitores de 1920px ou mais, em qualquer escala de tela do sistema operacional (100%, 125%, 150%), com o navegador em 100% de zoom.
- **Dimensionamento Fluido com Limites**: Tamanhos de fonte, espaçamentos e larguras de contêineres DEVEM se adaptar à largura disponível, sempre com limites mínimos e máximos explícitos (ex: `clamp(min, preferido, max)`).
- **Proibições**: São PROIBIDOS tamanhos fixos globais (ex: `font-size` em `px` no `html`/`body` ou contêineres principais com largura fixa em `px`) e qualquer redução artificial de escala da página (ex: `zoom`, `transform: scale()` aplicado ao layout, ou manipulação da `meta viewport` para encolher o conteúdo).
- **Fonte Única de Escala**: A escala tipográfica e de espaçamento DEVE ser centralizada em um único ponto ajustável (conjunto de tokens/variáveis CSS globais em `:root`). Alterar esse ponto deve reajustar proporcionalmente todo o site.
- **Adesão Obrigatória**: Toda página e todo componente DEVEM consumir esse sistema de escala; valores ad hoc que o contornem não são permitidos, salvo exceção justificada na spec da respectiva página.
- **Tokens Visuais**: Cores, gradientes, sombras, raios e fontes DEVEM ser centralizados como tokens em `pages/spa/assets/css/tokens.css`, carregado junto com o `scale.css`.
- **Breakpoints Fixos**: Ajustes responsivos usam apenas os breakpoints do `scale.css` (768px, 1024px e 1280px, mobile-first).
- **Respeito à Acessibilidade**: O dimensionamento DEVE respeitar as preferências do usuário, em especial o tamanho de fonte padrão configurado no navegador. Para isso, as escalas devem usar unidades relativas (`rem`/`em`) como base dos limites, sem sobrescrever o tamanho raiz com valores absolutos.

### VII. Especificação em Camadas
A especificação das páginas é dividida em três camadas, cada uma com uma única responsabilidade, para tornar leitura e manutenção simples:
- **Spec da página** (seção **Estrutura** do `spec.md` da feature): descreve *o que* a página monta — elementos, hierarquia, textos, configurações e estilos escolhidos — na notação de `.specify/catalog/notacao-estrutura.md`. Textos longos ficam na seção **Textos** e dados na seção **Fontes de dados**.
- **Catálogo de elementos** (`.specify/catalog/elementos.md`): define *o que cada elemento é* — HTML completo, filhos aceitos, configurações, estilos disponíveis e comportamento — no formato de `.specify/catalog/formato-elementos.md`.
- **Spec de estilos** (`.specify/catalog/estilos.md`): define *como cada estilo de cada elemento se apresenta*, usando apenas tokens, no formato de `.specify/catalog/formato-estilos.md`.
- **Fonte única**: Um elemento ou estilo é definido uma única vez e vale para todas as páginas. A classe CSS de um elemento é o seu nome (`.grid`) e a de um estilo é `.<elemento>--<estilo>`.
- **Ordem de alteração**: Mudanças começam pela camada correspondente (página, catálogo ou estilos) e só depois chegam ao código.
- **Exceção — HTML estático legado**: Subpáginas de conteúdo escritas como HTML estático completo (hoje, as páginas de projeto em `pages/portfolio/projetos/` e as páginas de artigo em `pages/artigos/artigos_pages/`) ficam fora do modelo até serem reescritas; quando forem, DEVEM adotá-lo. Mesmo fora do modelo, DEVEM seguir o contrato de fragmento da SPA (`#page-content` com `data-page-id`, `data-page-title`, `data-parent-route`) e não podem alterar a moldura (estilos e scripts restritos à própria página).

## Diretrizes de Qualidade e Desempenho

- **Zero Bloat de Runtime**: Nenhum código deve ser entregue ao cliente sem necessidade estrita. O bundle final de produção deve conter apenas HTML estático compilado, CSS minificado e Vanilla JS estritamente isolado.
- **Desacoplamento e Manutenibilidade**: O isolamento por página (`pages/<nome_pagina>/`) garante que mudanças na composição ou no comportamento de uma página não afetem as demais. Mudanças no catálogo de elementos ou na spec de estilos afetam, por definição, todas as páginas que usam o elemento ou estilo alterado, e devem ser verificadas em cada uma delas.

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

**Version**: 2.0.3 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-11-26
