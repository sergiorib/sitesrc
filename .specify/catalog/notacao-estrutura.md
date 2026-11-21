# Notação de Estrutura de Página

> Status: **aprovada** (etapa 1 de 4 da padronização das specs).
> Camadas: **Spec da página** (esta notação) → **Spec de elementos** (catálogo) → **Spec de estilos**.

A notação descreve **como a página é montada**: quais elementos aparecem, em que hierarquia,
com que conteúdo, configuração e estilo. Ela fica dentro do `spec.md` de cada feature.

## 1. Princípios

1. **A página só monta e configura.** Estrutura interna e comportamento (recolhível, recursivo,
   acessibilidade) pertencem ao catálogo de elementos, não à página.
2. **Estrutura diferente ⇒ elemento diferente; aparência diferente ⇒ estilo.**
3. **Breakpoints são configuração da página**, declarados no elemento que os usa (ex.: `[grid]`).
4. **Textos longos e dados não ficam na árvore**: são referenciados (`@textos.x`, `@dados.x`).
5. Cada coisa tem **uma única forma** de ser escrita.

## 2. Sintaxe

| Símbolo | Significado | Exemplo |
|---|---|---|
| indentação (2 espaços) | hierarquia: o filho fica dentro do pai | |
| `[elemento]` | elemento do catálogo, com o estilo padrão | `[grid]` |
| `[elemento:estilo]` | elemento com um estilo escolhido | `[page-title:claro]` |
| `'texto'` | texto principal do elemento (o catálogo define onde ele entra) | `[panel] 'Sobre mim'` |
| `{chave: valor}` | configuração do elemento nesta página | `{colunas: 1 → 2 @768}` |
| `@textos.x` | texto longo, definido na seção **Textos** | `@textos.bio` |
| `@dados.x` | fonte de dados, definida na seção **Fontes de dados** | `@dados.hard-skills` |
| `*` | repete o elemento para cada item da fonte | `[card:hard] *@dados.hard-skills` |
| `$item.campo` | campo do item atual dentro de uma repetição | `$item.titulo` |
| `//` | comentário | |

Breakpoints: `valor @largura` em px, mobile-first. Ex.: `{colunas: 1 → 2 @768 → 3 @1280}`.
Larguras aceitas: `@768`, `@1024`, `@1280` (as mesmas do `scale.css`; ver R-S05 em
[formato-estilos.md](formato-estilos.md)).

## 3. Regras

- **R-N01 — Título de container.** `[panel] 'Título'` é o atalho para um container que tem
  só o título, com o `[header]` no estilo padrão. Quando o cabeçalho precisa de mais que o
  título ou de outro estilo, o container fica sem texto e o primeiro filho é
  `[header:estilo] 'Título'`, com os demais itens do cabeçalho como filhos dele.
- **R-N02 — `[header]` é genérico.** Pode ser usado em qualquer container que o catálogo permita
  (ex.: `panel`, `card`). Substitui o antigo `card-title`.
- **R-N03 — Estilo omitido** significa o estilo padrão do elemento, definido no catálogo.
- **R-N04 — Fontes de dados** apontam para um arquivo do projeto (`caminho#chave`) ou são
  declaradas inline na seção **Fontes de dados**.
- **R-N05 — Estilo vindo do dado.** Dentro de uma repetição, o estilo pode ser lido de um campo do
  item: `[badge:$item.estilo] *$item.stack`. Os valores do campo DEVEM ser estilos existentes do
  elemento no catálogo.
- **R-N06 — Repetição vazia.** Um elemento cujos filhos vêm só de uma repetição vazia (ex.: `[grid]` de
  uma categoria sem projetos) é omitido.
- **R-N07 — Texto e configuração vindos do item.** Dentro de uma repetição, o texto e as configurações
  podem ler campos do item: `[subsection] $item.titulo {ancora: $item.ancora} *@dados.categorias`.

## 4. Seções no `spec.md`

```
## Estrutura          ← árvore de elementos
## Textos             ← textos longos (@textos.x)
## Fontes de dados    ← tabela de referências (@dados.x) + dados inline
```

## 5. Exemplo de referência (baseado na primeira versão da página Sobre)

```
## Estrutura

[page-root:petroleo] sobre
  [page-title:claro] 'Sobre'

  [panel] 'Sobre mim'
    [vertical-list:amplo]
      [paragraph] *@textos.bio

  [panel]
    [header] 'Habilidades' {direcao: coluna → linha @768}
      [legend] 'Legenda de Estrelas'
        [legend-item] *@dados.legenda-estrelas

    [subsection] 'Hard-Skills'
      [divider:sublinhado]
      [grid] {colunas: 1 → 2 @768 → 3 @1280}
        [card:amarelo] *@dados.hard-skills
          [header:card] $item.titulo
          [vertical-list]
            [skill-item] *$item.skills

    [subsection] 'Soft-Skills'
      [divider:sublinhado]
      [grid] {colunas: 1 → 2 @768}
        [card:verde] *@dados.soft-skills
          [header:card] $item.titulo
          [vertical-list]
            [skill-item] *$item.skills

## Textos

@textos.bio
  - Sou um Cientista de Dados com sólida base em …
  - Tenho mais de 25 anos de experiência …
  - Valorizo o aprendizado contínuo …
  - Convido você a explorar …

## Fontes de dados

| Referência               | Origem                              | Campos usados        |
|--------------------------|-------------------------------------|----------------------|
| @dados.legenda-estrelas  | inline (abaixo)                     | estrelas, descricao  |
| @dados.hard-skills       | pages/sobre/data/skills.json#hard   | titulo, skills[]     |
| @dados.soft-skills       | pages/sobre/data/skills.json#soft   | titulo, skills[]     |

@dados.legenda-estrelas
  - 1 | Conhecimento conceitual
  - 2 | Prática básica
  - 3 | Uso em projetos pessoais
  - 4 | Uso em projetos profissionais
  - 5 | Domínio teórico e prático
```

> Observação para a etapa 4: o divisor passa a ser um elemento real (hoje é a borda do título
> da sub-seção) e os dados de habilidades saem de `SkillsPanel.astro` para
> `pages/sobre/data/skills.json`. As duas coisas são mudanças de implementação.
