# Formato do Catálogo de Elementos

> Status: **aprovado** (etapa 2 de 4 da padronização das specs).
> Camadas: Spec da página ([notacao-estrutura.md](notacao-estrutura.md)) → **Spec de elementos** (este formato) → Spec de estilos.

O catálogo define **o que cada elemento é**: o HTML que ele gera, o que recebe da página,
quais filhos aceita, como pode ser configurado, quais estilos oferece e como se comporta.
A spec da página só referencia elementos pelo nome; tudo o que está aqui vale para todas as páginas.

## 1. Regras

- **R-E01 — Molde completo.** Toda ficha traz o HTML completo que o elemento gera, com os
  pontos de preenchimento marcados.
- **R-E02 — Classe = nome do elemento.** `[grid]` gera `.grid`, `[header]` gera `.header`.
  Partes internas usam o prefixo do elemento (`.header-title`).
- **R-E03 — Nível de heading pelo contexto.** O nível de um título é definido pelo container
  onde o elemento está (ex.: `header` em `panel` → `h2`; em `card` → `h3`), não pela página.
- **R-E04 — Um elemento por estrutura.** Elementos com a mesma estrutura são unificados; o que
  muda entre eles vira estilo. (Ex.: `card-title` foi unificado em `header`.)
- **R-E05 — Uma ficha por elemento**, agrupadas por categoria. Campos sem conteúdo ficam fora.
- **R-E06 — Estados usam `is-<estado>`.** Estados de uma parte (ex.: estrela ativa) usam a classe
  `is-<estado>` (`.star-rating-star.is-ativa`), nunca `--`, que é reservado para estilos (R-S01).
- **R-E07 — Formas estruturais são partes.** Quando um elemento gera HTML diferente conforme os
  dados (ex.: `skill-item` folha ou grupo), cada forma recebe uma classe de parte
  (`.skill-item-leaf`, `.skill-item-group`).

## 2. Pontos de preenchimento do molde

| Marcador | Origem |
|---|---|
| `{texto}` | o `'texto'` (ou `$item.campo`) da spec da página |
| `{filhos}` | os elementos declarados como filhos na spec da página |
| `{estilo}` | a classe do estilo escolhido (definida na spec de estilos) |
| `{nivel}` | nível de heading resolvido pela regra R-E03 |
| `{config.x}` | valor de uma configuração `{x: …}` |
| `{item.x}` | campo do item de dados, em elementos alimentados por fonte de dados |

## 3. Ficha

```
### <nome-do-elemento>
ID: EL-xx
Descrição: <uma linha>
HTML:
  <molde completo>
Texto principal: obrigatório | opcional — <o que representa>
Filhos: <elementos aceitos>
Dados do item: <campos, ? = opcional>          (só elementos alimentados por dados)
Configurações:
  <chave>: <valores> [, aceita breakpoints] (padrão: <valor>)
Estilos: <estilo-padrão> (padrão) | <outro> | …
Comportamento:
  - <regra de interação>
Regras:
  - <unicidade, posição, acessibilidade>
```

## 4. Categorias

1. Layout — `page-root`, `grid`, `vertical-list`, `subsection`
2. Títulos — `page-title`, `header`
3. Containers — `panel`, `card`
4. Texto — `paragraph`
5. Listas e itens — `legend`, `legend-item`, `skill-item`
6. Separadores — `divider`
7. Mídia — ícones e logos

## 5. Exemplos de fichas

```
### page-title
ID: EL-01
Descrição: Título principal da página.
HTML:
  <h1 class="page-title {estilo}">{texto}</h1>
Texto principal: obrigatório
Estilos: claro (padrão) | escuro
Regras:
  - exatamente um por página; filho direto de [page-root]
```

```
### header
ID: EL-xx
Descrição: Cabeçalho de um container, com título e itens auxiliares ao lado.
HTML:
  <header class="header {estilo}">
    <h{nivel} class="header-title">{texto}</h{nivel}>
    {filhos}
  </header>
Texto principal: obrigatório — título do container
Filhos: legend, badge
Configurações:
  direcao: coluna | linha, aceita breakpoints (padrão: coluna)
Estilos: painel (padrão) | card
Regras:
  - primeiro filho do container
  - nivel: h2 em panel, h3 em card
```

```
### grid
ID: EL-xx
Descrição: Distribui os filhos em colunas.
HTML:
  <div class="grid {estilo}">{filhos}</div>
Filhos: card
Configurações:
  colunas: número, aceita breakpoints (padrão: 1)
Estilos: padrao (padrão)
```

```
### skill-item
ID: EL-xx
Descrição: Item de habilidade com ícone, nome e estrelas; pode ter sub-itens.
HTML:
  sem sub-itens →
    <div class="skill-item {estilo}">
      <img class="skill-item-icon" src="{item.icone}" alt="{item.nome}">
      <span class="skill-item-name">{item.nome}</span>
      [star-rating]
    </div>
  com sub-itens →
    <details class="skill-item {estilo}">
      <summary class="skill-item-summary">
        <img class="skill-item-icon" src="{item.icone}" alt="{item.nome}">
        <span class="skill-item-name">{item.nome}</span>
        [star-rating]
      </summary>
      <div class="vertical-list">[skill-item] *item.skills</div>
    </details>
Dados do item: nome, icone?, estrelas?, skills[]?
Estilos: padrao (padrão)
Comportamento:
  - recursivo: sub-itens são skill-item
  - recolhível quando tem sub-itens
  - estrelas ausentes = floor(média dos sub-itens)
  - ícone ausente → herda do pai; sem ícone algum → ☆
```

> O catálogo anterior (`arquivo/catalogo-elementos.md`) foi substituído por [elementos.md](elementos.md), neste formato. Os IDs EL-xx
> são mantidos; elementos unificados (ex.: `card-title` → `header`) ficam registrados no histórico.
