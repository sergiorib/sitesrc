# Formato da Spec de Estilos

> Status: **aprovado** (etapa 3 de 4 da padronização das specs).
> Camadas: Spec da página ([notacao-estrutura.md](notacao-estrutura.md)) → Spec de elementos
> ([formato-elementos.md](formato-elementos.md)) → **Spec de estilos** (este formato).

A spec de estilos define **como cada estilo de cada elemento se apresenta**. Ela é única para o
site inteiro; o CSS de cada página é gerado a partir dela.

## 1. Regras

- **R-S01 — Classe de estilo.** Cada estilo vira a classe `.<elemento>--<estilo>`
  (ex.: `.page-title--claro`, `.page-title--escuro`). Todas as classes existem no CSS; o HTML
  recebe a classe do estilo escolhido na página, ou a do estilo padrão quando a página não indica.
  A classe base (`.page-title`) leva o bloco `base`.
- **R-S02 — CSS por página.** O CSS de cada página contém só os elementos e estilos que ela usa,
  gerados desta spec única. Uma página não sobrescreve estilos do catálogo.
- **R-S03 — Sem prefixo de página.** As regras de elementos do catálogo não são prefixadas pela
  raiz da página (`.sobre-page …`): elas são idênticas em todas as páginas, então carregá-las mais
  de uma vez no SPA não gera conflito. Substitui a regra R-01 do catálogo antigo.
- **R-S04 — Só tokens.** Cor, fonte, tamanho, espaçamento e ícones vêm de tokens. Valores
  literais apenas para o que não é escala (`700`, `uppercase`, `0.03em`, `flex`).
- **R-S05 — Breakpoints fixos.** Blocos responsivos usam apenas os breakpoints do `scale.css`:
  `@768`, `@1024`, `@1280` (mobile-first, `min-width`).
- **R-S06 — Configurações da página viram variáveis CSS.** Uma configuração `{chave: …}` da página
  é passada ao HTML como variáveis inline `--<chave>` e `--<chave>-<bp>`; a ficha de estilo do
  elemento lê essas variáveis. Ex.: `{colunas: 1 → 2 @768 → 3 @1280}` →
  `style="--colunas: 1; --colunas-768: 2; --colunas-1280: 3"`.
  Essas variáveis são registradas com `@property … { syntax: '*'; inherits: false; }`, para que
  um elemento aninhado (ex.: grid dentro de grid) não herde a configuração do pai.
- **R-S07 — Base do documento e moldura.** Regras globais (reset, `html`, `body`) existem só na seção
  "Base do documento" da spec de estilos e só no CSS da moldura (`pages/spa/assets/css/spa.css`), que fica
  sempre carregado. Os elementos da moldura têm nomes próprios, que não colidem com os das páginas.

## 2. Tokens

| Arquivo | Conteúdo |
|---|---|
| `pages/spa/assets/css/scale.css` | escala fluida: `--fs-*`, `--space-*`, `--icon-*` (Princípio VI) |
| `pages/spa/assets/css/tokens.css` | cores (`--cor-*`), gradientes (`--gradiente-*`), sombras (`--sombra-*`), raios (`--raio-*`) e fontes (`--fonte-*`); carregado junto com o `scale.css` |

Formato da tabela de tokens na spec:

```
| Token              | Valor                          | Uso                        |
|--------------------|--------------------------------|----------------------------|
| --cor-destaque     | #0381B0                        | bordas, divisores          |
| --cor-titulo-claro | #FFFFFF                        | títulos sobre fundo escuro |
| --cor-titulo-card  | #386312                        | títulos de card            |
| --fonte-titulo     | 'Barlow Condensed', sans-serif | títulos                    |
```

## 3. Ficha de estilo

Propriedades com os nomes do próprio CSS. Tokens escritos sem `var()` (a geração acrescenta).

```
### <elemento>
base:
  <propriedade>: <valor>
partes:                       (partes internas do molde, ex.: header-title)
  <parte>:
    <propriedade>: <valor>
estados:                      (seletor relativo ao elemento)
  <estado>: <propriedade>: <valor>
@<bp>:                        (ajustes responsivos da base)
  <propriedade>: <valor>
estilos:
  <estilo>:                   (só o que muda em relação à base; pode atingir partes)
    <propriedade>: <valor>
    <parte>: <propriedade>: <valor>
    @<bp>: <propriedade>: <valor>
```

Um estilo sem diferenças em relação à base é escrito `padrao: (sem alterações)`; a classe
existe no HTML, mas não gera regra no CSS.

## 4. Exemplos

```
### page-title
base:
  font-family: --fonte-titulo
  font-weight: 700
  font-size: --fs-3xl
  margin: 0 0 --space-lg 0
  text-align: left
estilos:
  claro:   color: --cor-titulo-claro
  escuro:  color: --cor-titulo-escuro
```

```
### header
base:
  display: flex
  flex-direction: var(--direcao, column)
  gap: --space-md
@768:
  flex-direction: var(--direcao-768, var(--direcao, column))
partes:
  header-title:
    font-family: --fonte-titulo
    font-weight: 700
    margin: 0
estilos:
  painel:
    margin-bottom: --space-md
    header-title: font-size: --fs-3xl; color: --cor-titulo-claro
  card:
    margin-bottom: --space-sm
    header-title: font-size: --fs-lg; color: --cor-titulo-card;
                  letter-spacing: 0.03em; text-transform: uppercase
```

```
### grid
base:
  display: grid
  gap: --space-lg
  grid-template-columns: repeat(var(--colunas, 1), 1fr)
@768:
  grid-template-columns: repeat(var(--colunas-768, var(--colunas, 1)), 1fr)
@1280:
  grid-template-columns: repeat(var(--colunas-1280, var(--colunas-768, var(--colunas, 1))), 1fr)
```

```
### skill-item
base:
  display: flex
  align-items: center
  gap: --space-sm
estados:
  [open] > .skill-item-summary: font-weight: 700
  :hover:                       background: --cor-hover
```

Valores de configuração em texto são traduzidos para CSS pela ficha do elemento
(ex.: `direcao: coluna | linha` → `column | row`).
