# Data Model: Estrutura da Página "Formação" (`formacao.astro`)

**Feature**: `04-formacao` (Página "Formação")  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Visão Geral das Entidades

Este modelo de dados descreve as estruturas de configuração, entidades de conteúdo, modelos de componentes e propriedades de interface da página "Formação".

---

## 2. Entidades Principais

### 2.1 `FormacaoPageConfig` (Configuração Global da Página)

| Atributo | Tipo | Descrição | Valor Contratual |
|---|---|---|---|
| `pageId` | `string` | Identificador único de rota | `"formacao"` |
| `pageTitle` | `string` | Rótulo para Breadcrumbs e cabeçalhos | `"Formação"` |
| `backgroundGradient` | `string` | Gradiente vertical do contêiner da página | `linear-gradient(to bottom, #16222A, #3A6073)` |

---

### 2.2 `SectionConfig` (Configuração de Seção)

| Atributo | Tipo | Descrição | Valor Contratual |
|---|---|---|---|
| `sectionTitle` | `string` | Título da seção ('Acadêmica', 'Idiomas', 'Treinamentos') | `Barlow Condensed`, Bold 700, 28px, `#ffffff` |

---

### 2.3 `FormacaoCard` (Card de Formação / Idioma / Treinamento)

| Atributo | Tipo | Descrição | Valor / Exemplo |
|---|---|---|---|
| `id` | `string` | Identificador único do card | `"acad-1"`, `"lang-1"`, `"train-1"` |
| `logoPath` | `string` | Caminho absoluto da logo | `/pages/formacao/assets/images/...` |
| `courseTitle` | `string` | Nome do curso, instituição ou idioma | `Barlow Condensed`, Bold 700, 24px, `#000000` |
| `badgeText` | `string` (opcional) | Período ou nível em fonte monoespaçada | `Consolas`/`Courier New`, 20px, UPPERCASE |
| `backgroundGradient` | `string` | Gradiente horizontal do card | `linear-gradient(to right, #FFF8D6, #FFFFFF)` |
| `borderColor` | `string` | Cor da borda | `"#0381B0"` |
| `borderRadius` | `string` | Raio dos cantos | `"10px"` |

---

## 3. Mapeamento de Dados das Seções

### 3.1 Seção Acadêmica (Até 2 colunas)
1. **Graduação 1**:
   - Logo: `/pages/formacao/assets/images/logo-estacio.png`
   - Título: `Superior em Ciência de Dados`
   - Badge: `2024 A 2026`
2. **Graduação 2**:
   - Logo: `/pages/formacao/assets/images/logo-estacio-uniradial.png`
   - Título: `Superior em Análise e Desenvolvimento de Sistemas`
   - Badge: `2013 A 2016`

### 3.2 Seção Idiomas (Até 3 colunas)
1. **Idioma 1**:
   - Logo: `/pages/formacao/assets/images/logo_ingles.png`
   - Título: `Inglês - Intermediário`
   - Badge: `Nenhum`
2. **Idioma 2**:
   - Logo: `/pages/formacao/assets/images/logo_espanhol.png`
   - Título: `Espanhol - Avançado`
   - Badge: `Nenhum`

### 3.3 Seção Treinamentos (Até 3 colunas)
1. **Treinamento 1**:
   - Logo: `/pages/formacao/assets/images/logo_enap.png`
   - Título: `Estatística Descritiva, Probabilidades e Técnicas de Amostragem`
   - Badge: `2024`
