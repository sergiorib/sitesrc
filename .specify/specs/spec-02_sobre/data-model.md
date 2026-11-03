# Data Model: Estrutura da Página "Sobre mim" (`sobre.astro`)

**Feature**: `02-sobre` (Página "Sobre mim")  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Visão Geral das Entidades

Este modelo de dados descreve as estruturas de configuração, entidades de conteúdo, modelos de componentes e propriedades de interface da página "Sobre mim".

---

## 2. Entidades Principais

### 2.1 `AboutPageConfig` (Configuração Global da Página)

| Atributo | Tipo | Descrição | Valor Contratual |
|---|---|---|---|
| `pageId` | `string` | Identificador único de rota | `"sobre"` |
| `pageTitle` | `string` | Rótulo para Breadcrumbs e cabeçalhos | `"Sobre"` |
| `backgroundGradient` | `string` | Gradiente vertical do contêiner da página | `linear-gradient(to bottom, #16222A, #3A6073)` |
| `minHeight` | `string` | Ocupação mínima da viewport | `100%` |

---

### 2.2 `PanelStyleConfig` (Padrão Visual dos Painéis)

Compartilhado entre o Painel "Sobre mim" e o Painel "Habilidades".

| Atributo | Tipo | Descrição | Valor Contratual |
|---|---|---|---|
| `backgroundGradient` | `string` | Gradiente vertical do fundo | `linear-gradient(to bottom, #DAEBF2, #A8CCD9)` |
| `borderColor` | `string` | Cor da linha contínua da borda | `"#0381B0"` |
| `borderRadius` | `string` | Raio dos cantos arredondados | `"10px"` |
| `padding` | `string` | Espaçamento interno | `"10px"` |
| `marginBottom` | `string` | Espaçamento entre painéis | `"10px"` |
| `boxShadow` | `string` | Efeito encastrado de profundidade | `inset 0 2px 4px rgba(0,0,0,0.15)` |

---

### 2.3 `ExecutiveBio` (Dados do Painel Superior)

| Atributo | Tipo | Descrição | Valor |
|---|---|---|---|
| `title` | `string` | Título da seção | `"Sobre mim"` |
| `titleTypography` | `string` | Tipografia do título | `Barlow Condensed, Bold 700, 32px, #000000` |
| `content` | `string` | Texto biográfico oficial | Texto integral justificado em fonte monoespaçada |
| `contentTypography`| `string` | Tipografia do texto | `Consolas, Courier New, 20px, #4A5B61, line-height 1.5` |

---

### 2.4 `SkillItem` (Item de Habilidade Técnica)

Representa uma linha individual de tecnologia dentro de um card de categoria.

| Atributo | Tipo | Descrição | Validação |
|---|---|---|---|
| `name` | `string` | Nome da ferramenta ou linguagem | Obrigatório (ex: "TensorFlow", "Python") |
| `iconPath` | `string` | Caminho do ícone da ferramenta | Obrigatório (dimensão 18x18px) |
| `stars` | `number` | Quantidade de estrelas ativas | Inteiro entre 0 e 5 |
| `maxStars` | `number` | Total de estrelas exibidas | Fixo em 5 |

**Regras de Apresentação**:
- As estrelas ativas (`stars`) recebem preenchimento verde-escuro militar (`#2D4A22`).
- As estrelas inativas (`5 - stars`) são renderizadas vazadas com contorno cinza claro (`#CCCCCC`).
- O bloco de estrelas é fixado na margem direita via `margin-left: auto`.

---

### 2.5 `SkillCategory` (Card de Categoria de Habilidades)

Representa uma coluna do grid de habilidades.

| Atributo | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | `string` | Identificador único da categoria | `"ml-dl"`, `"programming"`, `"additional"` |
| `title` | `string` | Título da categoria | `"MACHINE LEARNING & DEEP LEARNING"` |
| `titleColor` | `string` | Cor do título da categoria | `"#386312"` |
| `backgroundGradient` | `string` | Gradiente horizontal do card | `linear-gradient(to right, #FFEFBA, #FFFFFF)` |
| `items` | `SkillItem[]` | Lista das ferramentas da categoria | Array de ferramentas mapeadas |

**Mapeamento Pré-definido dos Cards**:

1. **Card 1 (`ml-dl`)**:
   - TensorFlow: 4 ativas / 1 inativa
   - PyTorch: 3 ativas / 2 inativas
   - Scikit-Learn: 5 ativas / 0 inativas
   - XGBoost: 3 ativas / 2 inativas
2. **Card 2 (`programming`)**:
   - Python: 5 ativas / 0 inativas
   - SQL: 5 ativas / 0 inativas
   - R: 3 ativas / 2 inativas
   - DAX: 3 ativas / 2 inativas
   - JavaScript: 2 ativas / 3 inativas
3. **Card 3 (`additional`)**:
   - Espaço reservado de grid para categorias futuras.
