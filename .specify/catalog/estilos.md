# Spec de Estilos

> Formato: [formato-estilos.md](formato-estilos.md) · Elementos: [elementos.md](elementos.md)
>
> Spec única do site. O CSS de cada página contém só os elementos e estilos que ela usa (R-S02).
> Tokens escritos sem `var()`; a geração acrescenta.

## 1. Tokens

Escala (`--fs-*`, `--space-*`, `--icon-*`, `--page-header-h`): `pages/spa/assets/css/scale.css`.
Os tokens abaixo ficam em `pages/spa/assets/css/tokens.css`, que também carrega as fontes Barlow e Barlow Condensed (pesos 400 e 600) do Google Fonts. Os tokens de imagem usam caminhos relativos a `tokens.css`.

| Token                        | Valor                                                                 | Uso |
|------------------------------|-----------------------------------------------------------------------|-----|
| --cor-branco                 | #FFFFFF                                                               | textos claros |
| --cor-preto                  | #000000                                                               | textos escuros |
| --cor-azul-noite             | #041E2F                                                               | textos sobre fundo claro |
| --cor-destaque               | #0381B0                                                               | bordas, divisores, setas |
| --cor-destaque-suave         | rgba(3, 129, 176, 0.3)                                                | borda de grupo |
| --cor-destaque-sutil         | rgba(3, 129, 176, 0.2)                                                | trilho de sub-itens |
| --cor-titulo-subsecao        | #FFF1C3                                                               | título de sub-seção |
| --cor-titulo-card            | #386312                                                               | título de card |
| --cor-verde-escuro           | #2D4A22                                                               | estrelas ativas, legenda |
| --cor-texto-grupo            | #1F382B                                                               | resumo de grupo |
| --cor-texto-legenda          | #263238                                                               | itens de legenda |
| --cor-borda-legenda          | #C5E1A5                                                               | divisória da legenda |
| --cor-estrela-inativa        | #CCCCCC                                                               | estrelas inativas |
| --cor-fundo-legenda          | rgba(255, 255, 255, 0.85)                                             | fundo da legenda |
| --cor-fundo-grupo            | rgba(255, 255, 255, 0.4)                                              | fundo de grupo |
| --gradiente-pagina-petroleo  | linear-gradient(to bottom, #16222A 0%, #3A6073 100%)                  | fundo de página |
| --gradiente-painel-escuro    | linear-gradient(to right, #041E2F 0%, #607D8B 100%)                   | fundo de painel escuro |
| --gradiente-painel-claro     | linear-gradient(to right, #E0EAFC 0%, #CFDEF3 100%)                   | fundo de painel claro |
| --gradiente-card-amarelo     | linear-gradient(to right, #FFEFBA 0%, #FFFFFF 100%)                   | fundo de card |
| --gradiente-card-verde       | linear-gradient(to right, #C6E9BC 0%, #FFFFFF 100%)                   | fundo de card |
| --sombra-painel-interna      | inset 0 2px 4px rgba(0, 0, 0, 0.25), inset 0 -2px 4px rgba(0, 0, 0, 0.15) | profundidade de painel |
| --raio-md                    | 0.625rem                                                              | cantos de painel e card |
| --raio-sm                    | 0.375rem                                                              | cantos de legenda e grupo |
| --raio-lg                    | 0.8125rem                                                             | cantos de link-card |
| --raio-icone                 | 0.75rem                                                               | moldura de ícone do link-card |
| --cor-ciano                  | #19C6E6                                                               | destaque ciano (hover) |
| --cor-ciano-suave            | #8EDDEB                                                               | seta do link-card |
| --cor-ciano-rotulo           | #81D3E7                                                               | rótulo do link-card |
| --cor-ciano-borda            | rgba(102, 218, 238, 0.44)                                             | borda do link-card |
| --cor-ciano-borda-suave      | rgba(102, 218, 238, 0.25)                                             | borda da moldura de ícone |
| --cor-ciano-fundo            | rgba(102, 218, 238, 0.1)                                              | fundo da moldura de ícone |
| --cor-texto-gelo             | #F2FBFD                                                               | valor do link-card |
| --cor-texto-nevoa            | #A9C4CE                                                               | detalhe do link-card |
| --gradiente-card-ciano       | linear-gradient(135deg, rgba(3, 28, 42, 0.82) 0%, rgba(5, 37, 52, 0.64) 100%) | fundo do link-card |
| --gradiente-card-ciano-hover | linear-gradient(135deg, rgba(4, 35, 52, 0.92) 0%, rgba(7, 46, 64, 0.78) 100%) | fundo do link-card no hover |
| --gradiente-badge-claro      | linear-gradient(to bottom, #FFFFFF 0%, #EFEFEF 100%)                  | fundo da badge pílula |
| --sombra-badge               | 0 2px 4px rgba(0, 0, 0, 0.15)                                         | profundidade da badge |
| --raio-pilula                | 1.25rem                                                               | cantos da badge pílula |
| --raio-tag                   | 0.75rem                                                               | cantos das badges ardósia e turquesa |
| --cor-ardosia                | #5E718D                                                               | badge de habilidade hard |
| --cor-turquesa               | #3CA296                                                               | badge de habilidade soft |
| --cor-ciano-neon             | #00E5FF                                                               | ciano de destaque (artigos) |
| --cor-ciano-borda-fraca      | rgba(0, 229, 255, 0.15)                                               | bordas sutis ciano |
| --cor-ciano-borda-media      | rgba(0, 229, 255, 0.25)                                               | borda do accordion vidro |
| --cor-ciano-borda-forte      | rgba(0, 229, 255, 0.45)                                               | borda do accordion vidro no hover |
| --cor-ciano-divisoria        | rgba(0, 229, 255, 0.1)                                                | divisória interna do accordion |
| --cor-ciano-trilho           | rgba(0, 229, 255, 0.2)                                                | trilho do accordion pílula |
| --cor-vidro                  | rgba(10, 25, 38, 0.75)                                                | fundo do accordion vidro |
| --cor-vidro-interno          | rgba(4, 12, 18, 0.3)                                                  | fundo do conteúdo do accordion vidro |
| --cor-vidro-hover            | rgba(20, 48, 70, 0.85)                                                | hover do cabeçalho pílula |
| --cor-pilula-fundo           | rgba(12, 30, 44, 0.6)                                                 | fundo do link-item |
| --cor-pilula-hover           | rgba(20, 50, 72, 0.9)                                                 | fundo do link-item no hover |
| --cor-texto-azulado          | #E2F1F8                                                               | títulos sobre vidro |
| --cor-texto-acinzentado      | #88A9BC                                                               | textos secundários sobre vidro |
| --cor-texto-ciano-palido     | #B0D3E5                                                               | texto do link-item |
| --cor-selecao                | #DBEAF0                                                               | fundo do link-item selecionado |
| --cor-texto-selecao          | #091A24                                                               | texto do link-item selecionado |
| --sombra-vidro               | 0 4px 20px rgba(0, 0, 0, 0.3)                                         | profundidade do accordion vidro |
| --sombra-vidro-aberto        | 0 0 15px rgba(0, 229, 255, 0.15)                                      | brilho do accordion vidro aberto |
| --sombra-selecao             | 0 0 12px rgba(255, 255, 255, 0.3)                                     | brilho do link-item selecionado |
| --raio-vidro                 | 1.125rem                                                              | cantos do accordion vidro |
| --raio-total                 | 999em                                                                 | cantos totalmente arredondados (pílulas) |
| --raio-card                  | 0.75rem                                                               | cantos do media-card |
| --cor-ciano-claro            | #22D3EE                                                               | link ativo da anchor-nav |
| --cor-ciano-claro-fundo      | rgba(34, 211, 238, 0.2)                                               | fundo do link ativo da anchor-nav |
| --cor-branco-10              | rgba(255, 255, 255, 0.1)                                              | fundo dos links da anchor-nav |
| --cor-branco-18              | rgba(255, 255, 255, 0.18)                                             | fundo dos links da anchor-nav no hover |
| --cor-branco-20              | rgba(255, 255, 255, 0.2)                                              | borda dos links da anchor-nav |
| --cor-branco-40              | rgba(255, 255, 255, 0.4)                                              | borda dos links da anchor-nav no hover |
| --cor-fundo-imagem           | #1E333D                                                               | fundo da capa do media-card |
| --cor-texto-grafite          | #333333                                                               | resumo do media-card |
| --gradiente-cabecalho-claro  | linear-gradient(to bottom, #DAEBF2, #CFE4EE)                          | fundo do page-header |
| --gradiente-barra-escura     | linear-gradient(to bottom, #2C4855, #1E333D)                          | fundo da anchor-nav |
| --gradiente-card-amarelo-vertical | linear-gradient(to bottom, #FFEFBA, #FFFFFF)                          | fundo do media-card |
| --sombra-cabecalho           | 0 4px 10px rgba(30, 51, 61, 0.15)                                     | sombra do page-header |
| --sombra-ativo               | 0 0 8px rgba(34, 211, 238, 0.4)                                       | brilho do link ativo da anchor-nav |
| --sombra-card                | 0 4px 8px rgba(0, 0, 0, 0.1)                                          | sombra do media-card |
| --sombra-card-hover          | 0 10px 20px rgba(0, 0, 0, 0.16)                                       | sombra do media-card no hover |
| --cor-fundo-app              | #061B2A                                                               | fundo do documento e da moldura; texto do item de menu ativo |
| --cor-fundo-menu             | #16222A                                                               | fundo do menu |
| --cor-borda-moldura          | #69C4CE                                                               | bordas da moldura; links dos breadcrumbs |
| --cor-item-ativo             | #B3CBDB                                                               | fundo do item de menu ativo |
| --cor-item-hover             | #0C2B42                                                               | fundo do item de menu no hover |
| --cor-texto-moldura          | #EDF2EE                                                               | texto da moldura |
| --cor-moldura-escura         | #25797F                                                               | barras de rolagem da moldura |
| --cor-faixa-identidade       | rgba(6, 27, 42, 0.85)                                                 | faixa atrás do nome e do cargo |
| --cor-fundo-breadcrumbs      | rgba(6, 27, 42, 0.95)                                                 | fundo da régua de breadcrumbs |
| --cor-borda-breadcrumbs      | rgba(105, 196, 206, 0.2)                                              | borda da régua de breadcrumbs |
| --cor-separador-breadcrumbs  | rgba(179, 203, 219, 0.4)                                              | separador dos breadcrumbs |
| --cor-breadcrumb-atual       | rgba(237, 242, 238, 0.7)                                              | nível atual dos breadcrumbs |
| --gradiente-moldura-foto     | linear-gradient(to bottom, #3893BA, #25797F)                          | moldura da foto de perfil |
| --sombra-foto                | 0 4px 12px rgba(0, 0, 0, 0.4)                                         | sombra da moldura da foto |
| --sombra-item-ativo          | 0 2px 8px rgba(105, 196, 206, 0.25)                                   | brilho do item de menu ativo |
| --raio-faixa                 | 0.5rem                                                                | cantos da faixa de identidade |
| --raio-xs                    | 0.25rem                                                               | cantos das barras de rolagem |
| --imagem-identidade          | url('../images/profile-bg.png')                                       | fundo do identity-card |
| --imagem-menu                | url('../images/menu-bg.png')                                          | fundo do nav-menu |
| --fonte-titulo               | 'Barlow Condensed', sans-serif                                        | títulos e rótulos |
| --fonte-texto                | 'Barlow', sans-serif                                                  | texto corrido |
| --fonte-mono                 | 'Consolas', 'Courier New', monospace                                  | legenda |

## 1.1 Base do documento (só a moldura)

Regras globais aplicadas pelo CSS da moldura (`pages/spa/assets/css/spa.css`), sempre carregado (R-S07).

```
*, *::before, *::after:
  box-sizing: border-box
  margin: 0
  padding: 0
html, body:
  width: 100%
  height: 100vh
  overflow: hidden
  background-color: --cor-fundo-app
  font-family: --fonte-titulo
  color: --cor-texto-moldura
  -webkit-font-smoothing: antialiased
```

## 2. Layout

### page-root
base:
  min-height: 100%
  padding: --space-xl
  display: flex
  flex-direction: column
  box-sizing: border-box
  animation: fadeIn 0.3s ease-in-out
  (@keyframes fadeIn: from opacity 0, translateY(4px) → to opacity 1, translateY(0))
estilos:
  petroleo:  background: --gradiente-pagina-petroleo

### grid
base:
  display: grid
  gap: --space-lg
  grid-template-columns: repeat(var(--colunas, 1), 1fr)
@768:
  grid-template-columns: repeat(var(--colunas-768, var(--colunas, 1)), 1fr)
@1024:
  grid-template-columns: repeat(var(--colunas-1024, var(--colunas-768, var(--colunas, 1))), 1fr)
@1280:
  grid-template-columns: repeat(var(--colunas-1280, var(--colunas-1024, var(--colunas-768, var(--colunas, 1)))), 1fr)
estilos:
  padrao: (sem alterações)

### vertical-list
base:
  display: flex
  flex-direction: column
estilos:
  normal:    gap: --space-sm
  amplo:     gap: --space-md
  compacto:  gap: --space-xs

### subsection
base:
  margin-bottom: --space-xl
partes:
  subsection-title:
    font-family: --fonte-titulo
    font-weight: 700
    font-size: --fs-xl
    text-transform: uppercase
    letter-spacing: 0.03em
    margin: --space-lg 0 0 0
    padding-bottom: --space-xs
estados:
  [id]: scroll-margin-top: calc(var(--page-header-h, 0px) + 2.1875rem)     (sub-seção com âncora)
estilos:
  destaque:
    subsection-title: color: --cor-titulo-subsecao
  escuro:
    subsection-title: color: --cor-azul-noite

### container
base:
  width: 100%
  box-sizing: border-box
estilos:
  centralizado:
    max-width: --container-max
    margin: 0 auto

### page-header
base:
  position: sticky
  top: 0
  z-index: 100
  margin: calc(--space-xl * -1) calc(--space-xl * -1) --space-sm
  padding: --space-lg --space-xl --space-md
  box-sizing: border-box
estilos:
  claro:
    background: --gradiente-cabecalho-claro
    box-shadow: --sombra-cabecalho

### page-footer
base:
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: flex-start
  gap: --space-md
  margin-top: calc(--space-2xl * 1.2)
  padding-top: --space-xl
  border-top: 1px solid
@768:
  flex-direction: row
  align-items: center
partes:
  page-footer-text, page-footer-motto:
    margin: 0
    font-family: --fonte-texto
    font-size: calc(--fs-sm * 0.86)
  page-footer-sep:
    margin: 0 --space-xs
    font-weight: bold
estilos:
  ciano:
    border-top-color: --cor-ciano-borda-fraca
    page-footer-text, page-footer-motto: color: --cor-texto-acinzentado
    page-footer-sep: color: --cor-ciano-neon

## 3. Títulos

### page-title
base:
  font-family: --fonte-titulo
  font-weight: 700
  font-size: --fs-3xl
  margin: 0 0 --space-lg 0
  text-align: left
estilos:
  claro:   color: --cor-branco
  escuro:  color: --cor-preto

### header
base:
  display: flex
  flex-direction: var(--direcao, column)
  align-items: var(--alinhamento, var(--card-alinhamento, flex-start))
  justify-content: space-between
  flex-wrap: wrap
  gap: --space-md
@768:
  flex-direction: var(--direcao-768, var(--direcao, column))
  align-items: var(--alinhamento-768, var(--alinhamento, var(--card-alinhamento, flex-start)))
partes:
  header-title:
    font-family: --fonte-titulo
    font-weight: 700
    text-align: var(--card-alinhamento, left)
    margin: 0
estilos:
  painel:
    margin-bottom: --space-md
    header-title: font-size: --fs-3xl; color: --cor-branco
  painel-escuro:
    margin-bottom: --space-md
    header-title: font-size: --fs-3xl; color: --cor-azul-noite
  card:
    margin-bottom: --space-sm
    header-title: font-size: --fs-lg; color: --cor-titulo-card;
                  letter-spacing: 0.03em; text-transform: uppercase

## 4. Containers

### panel
base:
  border: 1px solid --cor-destaque
  border-radius: --raio-md
  padding: --space-lg
  margin-bottom: --space-lg
estilos:
  escuro:
    background: --gradiente-painel-escuro
    box-shadow: --sombra-painel-interna
  claro:
    background: --gradiente-painel-claro
    box-shadow: --sombra-painel-interna

### card
base:
  border: 1px solid --cor-destaque
  border-radius: --raio-md
  padding: --space-md
  display: flex
  flex-direction: column
  box-sizing: border-box
  min-width: 0
estilos:
  amarelo:  background: --gradiente-card-amarelo
  verde:    background: --gradiente-card-verde

### link-card
base:
  display: flex
  align-items: flex-start
  gap: --space-lg
  padding: --space-xl
  border: 1px solid
  border-radius: --raio-lg
  text-decoration: none
  color: inherit
  position: relative
  box-sizing: border-box
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease
partes:
  link-card-icon:
    flex-shrink: 0
    width: --icon-lg
    height: --icon-lg
    display: flex
    align-items: center
    justify-content: center
    border: 1px solid
    border-radius: --raio-icone
    box-sizing: border-box
  link-card-body:
    flex-grow: 1
    min-width: 0
  link-card-label:
    font-family: --fonte-titulo
    font-weight: 600
    font-size: --fs-xl
    text-transform: uppercase
    letter-spacing: 0.03em
  link-card-value:
    font-family: --fonte-titulo
    font-weight: 600
    font-size: --fs-3xl
    line-height: 1.15
    word-break: break-all
  link-card-detail:
    font-family: --fonte-texto
    font-weight: 400
    font-size: --fs-sm
    margin-top: calc(--space-xs / 2)
  link-card-action:
    margin-left: auto
    align-self: center
    flex-shrink: 0
    font-size: --fs-lg
    transition: transform 0.2s ease, color 0.2s ease
estados:
  :hover:                     transform: translateY(-3px)
  :hover .link-card-action:   transform: translate(2px, -2px)
estilos:
  ciano:
    background: --gradiente-card-ciano
    border-color: --cor-ciano-borda
    link-card-icon: background: --cor-ciano-fundo; border-color: --cor-ciano-borda-suave
    link-card-label: color: --cor-ciano-rotulo
    link-card-value: color: --cor-texto-gelo
    link-card-detail: color: --cor-texto-nevoa
    link-card-action: color: --cor-ciano-suave
    :hover: border-color: --cor-ciano; background: --gradiente-card-ciano-hover
    :hover .link-card-action: color: --cor-ciano

### media-card
base:
  display: flex
  flex-direction: column
  min-width: 0
  overflow: hidden
  border: 1px solid
  border-radius: --raio-card
  transition: transform 0.25s ease, box-shadow 0.25s ease
partes:
  media-card-image:
    display: block
    aspect-ratio: 16 / 9
    overflow: hidden
    cursor: pointer
  media-card-image img:
    display: block
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 0.3s ease
  media-card-body:
    flex: 1
    padding: --space-md --space-lg --space-sm
  media-card-title:
    margin: 0 0 --space-sm
    font-family: --fonte-titulo
    font-weight: 700
    font-size: --fs-md
    line-height: 1.2
  media-card-title a:
    color: inherit
    text-decoration: none
  media-card-summary:
    margin: 0
    font-family: --fonte-texto
    font-size: --fs-sm
    line-height: 1.5
    display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden
  media-card-extra:
    padding: --space-sm --space-lg --space-lg
estados:
  :hover:                          transform: translateY(-4px)
  .media-card-image:hover img:     transform: scale(1.02)
estilos:
  amarelo:
    background: --gradiente-card-amarelo-vertical
    border-color: --cor-destaque
    box-shadow: --sombra-card
    :hover: box-shadow: --sombra-card-hover
    media-card-image: background: --cor-fundo-imagem
    media-card-title: color: --cor-preto
    .media-card-title a:hover: color: --cor-destaque
    media-card-summary: color: --cor-texto-grafite

### accordion
base:
  overflow: hidden
  border: 1px solid transparent
  transition: border-color 0.2s ease, box-shadow 0.2s ease
partes:
  accordion-summary:
    display: flex
    align-items: center
    gap: --space-sm
    cursor: pointer
    list-style: none
  accordion-icon:
    flex-shrink: 0
    text-align: center
  accordion-chevron:
    margin-left: auto
    font-size: --fs-md
    line-height: 1
    transition: transform 0.2s ease, color 0.2s ease
estados:
  .accordion-summary::-webkit-details-marker:     display: none
  .accordion-summary:focus-visible:               outline: 2px solid --cor-ciano-neon; outline-offset: 2px
  [open] > .accordion-summary .accordion-chevron: transform: rotate(90deg)
estilos:
  vidro:
    background: --cor-vidro
    backdrop-filter: blur(8px)
    border-color: --cor-ciano-borda-media
    border-radius: --raio-vidro
    box-shadow: --sombra-vidro
    :hover: border-color: --cor-ciano-borda-forte
    [open]: border-color: --cor-ciano-neon; box-shadow: --sombra-vidro-aberto
    accordion-summary: min-height: calc(--nav-item-height * 1.08); padding: --space-md --space-lg
    accordion-icon: width: --icon-md; font-size: --fs-md; color: --cor-ciano-neon
    accordion-title: font-family: --fonte-titulo; font-weight: 500;
                     font-size: calc(--fs-md * 0.945); color: --cor-texto-azulado
    accordion-chevron: color: --cor-texto-acinzentado
    [open] > .accordion-summary .accordion-chevron: color: --cor-ciano-neon
    accordion-content: background: --cor-vidro-interno; border-top: 1px solid --cor-ciano-divisoria;
                       padding: --space-xs --space-md --space-md --space-lg
  pilula:
    overflow: visible
    margin-top: --space-xs
    accordion-summary: margin: --space-xs 0; padding: --space-sm --space-lg;
                       border: 1px solid --cor-ciano-borda-fraca; border-radius: --raio-total;
                       font-family: --fonte-texto; font-size: --fs-sm; color: --cor-texto-acinzentado;
                       transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease
    .accordion-summary:hover: background: --cor-vidro-hover; color: --cor-texto-azulado;
                              border-color: --cor-ciano-borda-media
    accordion-icon: color: --cor-ciano-neon
    [open] > .accordion-summary .accordion-chevron: color: --cor-ciano-neon
    accordion-content: margin-top: --space-xs; margin-left: --space-md; padding-left: --space-md;
                       border-left: 2px solid --cor-ciano-trilho

### link-item
base:
  display: flex
  align-items: center
  gap: --space-sm
  padding: --space-sm --space-lg
  border: 1px solid
  border-radius: --raio-total
  font-family: --fonte-texto
  font-size: --fs-sm
  letter-spacing: 0.02em
  text-decoration: none
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease
partes:
  link-item-check:
    margin-left: auto
    font-weight: bold
estados:
  :focus-visible: outline: 2px solid --cor-ciano-neon; outline-offset: 2px
  :hover:         transform: translateX(3px)
estilos:
  ciano:
    background: --cor-pilula-fundo
    border-color: --cor-ciano-borda-fraca
    color: --cor-texto-ciano-palido
    link-item-bullet: color: --cor-ciano-neon
    :hover: background: --cor-pilula-hover; border-color: --cor-ciano-neon; color: --cor-branco
    .is-selecionado: background: --cor-selecao; border-color: --cor-branco; color: --cor-texto-selecao;
                     font-weight: 700; box-shadow: --sombra-selecao
    .is-selecionado .link-item-bullet: color: --cor-texto-selecao

## 5. Texto

### paragraph
base:
  margin: 0
estilos:
  claro:
    font-family: --fonte-texto
    font-size: --fs-lg
    color: --cor-branco
    line-height: 1.4
    text-align: justify
    @768: line-height: 1.5
  escuro:
    font-family: --fonte-texto
    font-size: --fs-lg
    color: --cor-azul-noite
    line-height: 1.4
    text-align: justify
    @768: line-height: 1.5

## 6. Listas e itens

### legend
base:
  border: 1px solid --cor-destaque
  border-radius: --raio-sm
  padding: --space-xs --space-md
  font-family: --fonte-titulo
  font-size: --fs-sm
  width: 100%
@768:
  width: auto
  max-width: 20rem
partes:
  legend-summary:
    cursor: pointer
    font-weight: 700
    user-select: none
  legend-content:
    margin-top: --space-sm
    padding-top: --space-xs
    border-top: 1px solid
estilos:
  claro:
    background: --cor-fundo-legenda
    legend-summary: color: --cor-verde-escuro
    legend-content: border-top-color: --cor-borda-legenda

### legend-item
base:
  display: flex
  align-items: center
  gap: --space-xs
  font-family: --fonte-mono
  font-size: --fs-sm
partes:
  legend-item-stars:
    font-weight: bold
estilos:
  padrao:
    color: --cor-texto-legenda
    legend-item-stars: color: --cor-verde-escuro

### skill-item
partes:
  skill-item-leaf:
    display: flex
    align-items: center
    padding: calc(--space-xs / 2) 0
  skill-item-group:
    border: 1px dashed --cor-destaque-suave
    border-radius: --raio-sm
    padding: --space-xs --space-sm
    background: --cor-fundo-grupo
  skill-item-summary:
    display: flex
    align-items: center
    cursor: pointer
    font-family: --fonte-titulo
    font-weight: 600
    font-size: --fs-md
    color: --cor-texto-grupo
    user-select: none
    list-style: none
  skill-item-icon:
    width: --icon-md
    height: --icon-md
    object-fit: contain
    display: inline-block
    vertical-align: middle
    margin-right: --space-sm
    flex-shrink: 0
  skill-item-fallback:
    text-align: center
    line-height: --icon-md
    color: --cor-verde-escuro
    font-size: --fs-md
  skill-item-name:
    font-family: --fonte-titulo
    font-weight: 600
    font-size: --fs-md
    color: --cor-preto
    margin-left: --space-xs
    min-width: 0
    overflow: hidden
    text-overflow: ellipsis
  skill-item-children:
    padding-left: --space-lg
    margin-top: --space-xs
    border-left: 2px solid --cor-destaque-sutil
estados:
  .skill-item-summary::-webkit-details-marker:  display: none
  .skill-item-summary::before:                  content: '▶'; font-size: 0.55em;
                                                margin-right: --space-xs;
                                                transition: transform 0.2s ease;
                                                color: --cor-destaque
  [open] > .skill-item-summary::before:         transform: rotate(90deg)
estilos:
  padrao: (sem alterações)

### star-rating
base:
  margin-left: auto
  display: inline-flex
  align-items: center
  gap: calc(--space-xs / 2)
  flex-shrink: 0
partes:
  star-rating-star:
    width: --icon-sm
    height: --icon-sm
estados:
  .star-rating-star.is-ativa polygon:    fill: --cor-verde-escuro; stroke: --cor-verde-escuro
  .star-rating-star.is-inativa polygon:  fill: transparent; stroke: --cor-estrela-inativa;
                                         stroke-width: 1.5
estilos:
  padrao: (sem alterações)

### badge
base:
  display: inline-block
  align-self: var(--card-alinhamento, flex-start)
  margin-top: auto
  padding: --space-xs --space-md
  border: 1px solid
  font-family: --fonte-mono
  font-weight: 600
  font-size: --fs-base
  text-transform: uppercase
@768:
  padding: --space-xs --space-lg
estilos:
  pilula:
    background: --gradiente-badge-claro
    border-color: --cor-destaque
    border-radius: --raio-pilula
    box-shadow: --sombra-badge
    color: --cor-preto
  ardosia:
    background: --cor-ardosia
    border-color: transparent
    border-radius: --raio-tag
    color: --cor-branco
    font-size: calc(--fs-lg * 0.91)
    text-transform: none
    @768: padding: --space-xs --space-md
  turquesa:
    background: --cor-turquesa
    border-color: transparent
    border-radius: --raio-tag
    color: --cor-branco
    font-size: calc(--fs-lg * 0.91)
    text-transform: none
    @768: padding: --space-xs --space-md

### anchor-nav
base:
  display: flex
  flex-wrap: nowrap
  overflow-x: auto
  align-items: center
  gap: --space-sm
  padding: --space-sm --space-md
  border-radius: --raio-md
@768:
  flex-wrap: wrap
  overflow-x: visible
partes:
  anchor-nav-link:
    display: inline-flex
    align-items: center
    min-height: 2.4em
    padding: --space-xs --space-md
    border: 1px solid
    border-radius: --raio-total
    font-family: --fonte-texto
    font-size: --fs-sm
    line-height: 1.2
    text-decoration: none
    white-space: nowrap
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease
estilos:
  escuro:
    background: --gradiente-barra-escura
    anchor-nav-link: background: --cor-branco-10; border-color: --cor-branco-20; color: --cor-branco
    .anchor-nav-link:hover: background: --cor-branco-18; border-color: --cor-branco-40
    .anchor-nav-link:focus-visible: outline: 2px solid --cor-ciano-claro; outline-offset: 2px
    .anchor-nav-link.is-ativo: color: --cor-ciano-claro; font-size: --fs-base; background: --cor-ciano-claro-fundo;
                               border-color: --cor-ciano-claro; box-shadow: --sombra-ativo

### tag-list
base:
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: --space-sm
estilos:
  padrao: (sem alterações)

## 7. Separadores

### divider
base:
  border: 0
  margin: 0 0 --space-md 0
estilos:
  sublinhado:  border-top: 2px solid --cor-destaque

## 8. Mídia

### logo
base:
  width: 100%
  display: flex
  align-items: center
  justify-content: center
partes:
  logo-image:
    max-width: 100%
    max-height: 100%
    object-fit: contain
estilos:
  faixa:
    height: calc(--logo-h * 0.6)
    margin-bottom: --space-md

## 9. Moldura da SPA

### app-layout
base:
  display: flex
  flex-direction: column
  width: 100%
  height: 100vh
  overflow: hidden
@1024:
  flex-direction: row
estilos:
  escuro: (sem alterações — o fundo vem da base do documento)

### sidebar
base:
  width: --sidebar-width
  flex-shrink: 0
  display: flex
  flex-direction: column
  border-bottom: 2px solid
  overflow: hidden
  user-select: none
  z-index: 10
@1024:
  min-width: --sidebar-width
  height: 100vh
  border-bottom: none
  border-right: 2px solid
estilos:
  escuro:
    background-color: --cor-fundo-app
    border-color: --cor-borda-moldura

### identity-card
base:
  min-height: --identity-header-height
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start
  gap: --space-md
  padding: --space-sm --space-lg
  position: relative
  border-bottom: 2px solid
  background-size: cover
  background-position: center
@1024:
  flex-direction: column
  gap: 0
  padding: --space-lg --space-xs --space-sm
partes:
  identity-card-frame:
    width: calc(--profile-photo-size * 1.05); height: calc(--profile-photo-size * 1.05)
    flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center
  identity-card-photo:
    width: --profile-photo-size; height: --profile-photo-size; border-radius: 50%; object-fit: cover; display: block
  identity-card-strip:
    min-width: 0; border-radius: --raio-faixa; padding: --space-xs --space-sm; text-align: left; backdrop-filter: blur(2px)
    @1024: width: 100%; margin-top: --space-sm; padding: --space-xs; text-align: center
  identity-card-name:
    font-family: --fonte-titulo; font-weight: 600; font-size: --fs-2xl; line-height: 1.1; letter-spacing: 0.03em
    white-space: normal; text-wrap: balance
    @1024: letter-spacing: 0.02em
  identity-card-role:
    font-family: --fonte-titulo; font-weight: 600; font-size: --fs-xl; line-height: 1.1
    margin-top: calc(--space-xs / 2); letter-spacing: 0.03em
    @1024: letter-spacing: 0.02em
estilos:
  moldura:
    background-image: --imagem-identidade
    border-bottom-color: --cor-borda-moldura
    identity-card-frame: background: --gradiente-moldura-foto; box-shadow: --sombra-foto
    identity-card-strip: background-color: --cor-faixa-identidade
    identity-card-name, identity-card-role: color: --cor-branco

### nav-menu
base:
  display: flex
  padding: --space-sm --space-lg
  overflow-x: auto
  overflow-y: hidden
  scrollbar-width: thin
  background-size: cover
  background-position: center
@1024:
  flex: 1
  flex-direction: column
  padding: --space-xl 0
  overflow-x: hidden
  overflow-y: auto
partes:
  nav-menu-items:
    display: flex; flex-direction: row; gap: --space-sm; align-items: center; width: max-content
    @1024: flex-direction: column; gap: --space-lg; width: 100%
  nav-menu-item:
    width: auto; height: --nav-item-height; border-radius: --raio-pilula; display: flex; align-items: center
    padding: 0 --space-lg; gap: --space-sm; text-decoration: none; white-space: nowrap; border: 1px solid
    font-family: --fonte-titulo; font-weight: 600; font-size: --fs-lg; letter-spacing: 0.03em
    cursor: pointer; transition: all 0.2s ease-in-out
    @1024: width: 93%; padding: 0 --space-xl; gap: --space-lg
  nav-menu-icon:
    display: flex; align-items: center; justify-content: center; width: --icon-md; height: --icon-md; flex-shrink: 0
  nav-menu-icon-light, nav-menu-icon-dark:
    width: --icon-md; height: --icon-md; object-fit: contain
  nav-menu-label:
    flex: 1; text-align: left
estados:
  .nav-menu-item:not(.is-ativo) .nav-menu-icon-dark:  display: none
  .nav-menu-item.is-ativo .nav-menu-icon-light:       display: none
  ::-webkit-scrollbar:                                width: 4px; height: 4px
  @1024 .nav-menu-item:not(.is-ativo):hover:          transform: translateX(2px)
estilos:
  escuro:
    background-color: --cor-fundo-menu
    background-image: --imagem-menu
    ::-webkit-scrollbar-thumb: background: --cor-moldura-escura; border-radius: --raio-xs
    .nav-menu-item:not(.is-ativo): background-color: --cor-fundo-app; border-color: --cor-borda-moldura; color: --cor-texto-moldura
    .nav-menu-item:not(.is-ativo):hover: background-color: --cor-item-hover
    .nav-menu-item.is-ativo: background-color: --cor-item-ativo; border-color: --cor-borda-moldura;
                             color: --cor-fundo-app; box-shadow: --sombra-item-ativo

### main-area
base:
  flex: 1
  min-height: 0
  min-width: 0
  display: flex
  flex-direction: column
  overflow: hidden
  position: relative
estilos:
  escuro:
    background-color: --cor-fundo-app

### breadcrumbs
base:
  width: 100%
  padding: --space-md --space-2xl
  display: flex
  align-items: center
  overflow-x: auto
  font-family: --fonte-titulo
  font-size: --fs-base
  font-weight: 400
  letter-spacing: 0.03em
  user-select: none
  border-bottom: 1px solid
partes:
  breadcrumbs-list:
    display: flex; align-items: center; list-style: none; margin: 0; padding: 0; gap: --space-sm; white-space: nowrap
  breadcrumbs-item:
    display: inline-flex; align-items: center; gap: --space-sm
  breadcrumbs-link:
    text-decoration: none; transition: color 0.15s ease
  breadcrumbs-sep:
    font-size: --fs-sm
  breadcrumbs-current:
    cursor: default
estados:
  .breadcrumbs-link:hover: text-decoration: underline
estilos:
  discreto:
    background-color: --cor-fundo-breadcrumbs
    border-bottom-color: --cor-borda-breadcrumbs
    breadcrumbs-link: color: --cor-borda-moldura
    .breadcrumbs-link:hover: color: --cor-branco
    breadcrumbs-sep: color: --cor-separador-breadcrumbs
    breadcrumbs-current: color: --cor-breadcrumb-atual

### content-host
base:
  flex: 1
  min-height: 0
  overflow-y: auto
  overflow-x: hidden
  padding: --space-2xl
  position: relative
  outline: none
estados:
  :has(.page-header): padding-top: 0      (página com cabeçalho fixo começa colada no topo)
  ::-webkit-scrollbar: width: 8px
estilos:
  padrao:
    ::-webkit-scrollbar-track: background: --cor-fundo-app
    ::-webkit-scrollbar-thumb: background: --cor-fundo-menu; border: 1px solid --cor-borda-moldura; border-radius: --raio-xs
    ::-webkit-scrollbar-thumb:hover: background: --cor-moldura-escura
