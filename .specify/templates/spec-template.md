# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`

**Created**: [DATE]

**Status**: Draft

**Input**: User description: "$ARGUMENTS"

---

## 1. Objetivo

<!--
  Um parágrafo dizendo o que este documento define. Para páginas no modelo em camadas,
  deixar claro que o HTML e a aparência dos elementos vêm do catálogo
  (.specify/catalog/elementos.md) e da spec de estilos (.specify/catalog/estilos.md).
  Modelo de referência: .specify/specs/spec-02_sobre/spec.md
-->

Este documento define de forma unificada a página "[Nome]": o roteamento e a organização de arquivos na SPA, a composição da página (elementos, hierarquia, textos e fontes de dados), os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4.

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

<!--
  Como a página é alcançada na SPA (rotas, item de menu ativo, ponto de entrada em
  pages/spa/<pagina>.astro) e se possui subpáginas aninhadas. Se houver subpáginas,
  acrescentar subseções com o contrato de reconhecimento pelo roteador
  (id="page-content", data-page-id, data-page-title, data-parent-route).
-->

[Descrição das rotas e do roteamento da página]

### 2.1 Árvore Hierárquica de Páginas da [Nome]

```text
pages/<pagina>/
├── <pagina>.astro
├── assets/
│   ├── css/
│   │   └── <pagina>.css
│   ├── images/
│   │   └── <arquivo>
│   └── js/
│       └── <pagina>.js
└── data/
    └── <arquivo>.json
```

Recursos compartilhados usados pela página (fora de `pages/<pagina>/`):

```text
pages/spa/
├── <pagina>.astro                   ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala
│   └── tokens.css                   ← tokens visuais
└── components/elementos/            ← componentes dos elementos do catálogo
```

---

## 3. User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently

  Numeração: cada User Story é uma subseção 3.N; Edge Cases é a última subseção.
-->

### 3.1 User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### 3.2 User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### 3.3 User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### 3.4 Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

---

## 4. Estrutura *(mandatory para páginas)*

<!--
  Árvore de elementos da página na notação de .specify/catalog/notacao-estrutura.md.
  Use apenas elementos e estilos existentes em .specify/catalog/elementos.md e
  .specify/catalog/estilos.md; um elemento ou estilo novo é criado primeiro no catálogo.
-->

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root] <pagina>
  [page-title] '<Título>'
  ...
```

## 5. Textos *(se houver textos longos)*

@textos.<nome>
  - <parágrafo>

## 6. Fontes de dados *(se houver)*

| Referência     | Origem                                     | Campos usados |
|----------------|--------------------------------------------|---------------|
| @dados.<nome>  | pages/<pagina>/data/<arquivo>.json#<chave> | <campos>      |

---

## 7. Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
  Requisitos visuais (cores, tamanhos, colunas) NÃO entram aqui: estão na seção 4 e em estilos.md.
-->

### 7.1 Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### 7.2 Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

---

## 8. Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### 8.1 Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]

---

## 9. Assumptions

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right assumptions based on reasonable defaults
  chosen when the feature description did not specify certain details.
-->

- [Assumption about target users, e.g., "Users have stable internet connectivity"]
- [Assumption about scope boundaries, e.g., "Mobile support is out of scope for v1"]
- [Assumption about data/environment, e.g., "Existing authentication system will be reused"]
- [Dependency on existing system/service, e.g., "Requires access to the existing user profile API"]

---

## 10. Asset Resolution Convention (SPA Pages)

<!--
  MANDATORY RULE FOR SPA MODULES (`pages/<modulo>/`):
  When adding images, logos, icons, or static media in page modules:
  1. DO NOT use relative paths (e.g., `./assets/...` or `../modulo/assets/...`), as they fail when resolved dynamically by the SPA router in nested routes (e.g., `/spa/<modulo>/`).
  2. ALWAYS use absolute paths based on the Astro static server root: `/pages/<modulo>/assets/images/<filename>`.
  3. Ensure the asset file physically exists in `pages/<modulo>/assets/images/`.
  4. Validate rendering and bundling by running `npm run build` upon completion.
-->
