# Registro de Migração — Página Histórico (spec-03)

> Plano: [plano-migracao.md](../../catalog/plano-migracao.md) · Status: **Concluída e aprovada (2026-11-20)**

## 1. Linha de base (Etapa 1) — 2026-11-20

Medido no shell da SPA (`/` → clique em "Histórico"), animações finalizadas. Retângulos `x,y,largura,altura`.

| Largura | `#page-content` | `h1` | Cards de experiência (1 a 5) |
|---|---|---|---|
| 375  | 20,197,327,6000 | 36,213,295,29 | 36,254,295,1097 · 36,1367,295,1161 · 36,2544,295,1225 · 36,3785,295,1155 · 36,4956,295,1225 |
| 1024 | 264,66,728,3467 | 282,84,692,31 | 282,129,692,653 · 282,800,692,653 · 282,1471,692,672 · 282,2161,692,664 · 282,2843,692,672 |
| 1440 | 301,75,1100,2957 | 321,95,1061,34 | 321,143,1061,546 · 321,709,1061,546 · 321,1274,1061,567 · 321,1860,1061,567 · 321,2446,1061,567 |

Card 1 em detalhe (logo · cargo · descrição · título da stack):

| Largura | logo | `h3` | `p` | `h4` | linhas de badges |
|---|---|---|---|---|---|
| 375  | 53,267,261,80 | 53,357,261,31 | 53,530,261,504 | 66,1061,235,72 | 3 (grade de 2 colunas) |
| 1024 | 425,144,407,84 | 301,240,654,34 | 301,331,654,243 | 316,605,624,40 | 1 (linha centralizada) |
| 1440 | 631,159,441,91 | 341,262,1020,35 | 341,357,1020,171 | 357,561,989,22 | 1 (linha centralizada) |

Sem rolagem horizontal. Breadcrumb: "Histórico". Sem JS próprio e sem hover.

## 2. Inventário (Etapa 2)

### 2.1 Árvore atual (as duas cópias têm o mesmo corpo)

```
div#page-content.page-content-wrapper.historico-page   data-page-id="historico" data-page-title="Histórico"
  div.panel-container
    h1.page-title 'Histórico Profissional'
    div.vertical-list.experiences-wrapper                (gap --space-xl)
      div.experience-card ×5                             (fundo branco, sombra, conteúdo centralizado)
        div.company-logo-container > img.company-logo   (altura --logo-h)
        h3.job-title                                     (cargo, centralizado)
        div.info-badges                                  (grade 2 col. < 1024; linha centralizada ≥ 1024)
          span.badge ×5                                  (período, duração, vínculo, modalidade, setor)
        p.job-description                                (Courier New, peso 800)
        div.tech-stack-block                             (bloco azul-claro arredondado)
          h4.tech-stack-title 'Stack tecnológica e outras habilidades utilizadas nesta experiencia'
          div.tech-shields                               (flex com quebra)
            span.tech-shield.hard|soft ×N                (hard: ardósia; soft: turquesa)
```

### 2.2 Ganchos de JS
Nenhum. O roteador usa só `#page-content`, `data-page-id` e `data-page-title`.

### 2.3 Conteúdo embutido
As 5 experiências (logo, cargo, 5 badges, descrição, stack com tipo hard/soft) escritas direto no markup.
O texto do título da stack é igual nos 5 cards. `logo_frete.jpg` existe na pasta, mas não é usado.

### 2.4 Divergências spec × código
**Visuais e estruturais** (o código prevalece, como nas migrações anteriores):
- tamanhos em px da spec (título 30/28/24px, badges 20px, descrição 22px, logo 80/100px) diferem da escala fluida do CSS.

**De conteúdo** — ⚠ precisam de decisão, porque spec e código discordam sobre os dados:

| # | Experiência | Spec | Código |
|---|---|---|---|
| 1 | Arezzo — badge de período | `janeiro março 2021 a outubro 2022` | `janeiro 2021 a outubro 2022` |
| 2 | CVC — badge de período | `janeiro 2018 a janeiro/2021` | `janeiro 2018 a janeiro 2021` |
| 3 | CVC — descrição | "ganho **significatbvo**" | "ganho **significativo**" |
| 4 | CVC — stack | Oracle EBS, SQL, Excel, Grafana, Zabbix, Python, AWS Cloudewatch, Power BI, PowerPoint, Jira, Scrum | SQL Server, Oracle, Excel, C#, Databricks |
| 5 | Submarino — logo | `logo_arezzo.png` | `logo_submarino.png` |
| 6 | Submarino — stack | SQL Server, Oracle, Excel, C# | igual à da Arezzo (Databricks, SQL, PySpark, …) |
| 7 | Submarino — descrição | texto da Arezzo | texto da Arezzo (repetido nos dois) |

Leitura: a stack da CVC na spec combina com a descrição da CVC (Oracle EBS, Grafana, Zabbix,
CloudWatch); no código as stacks parecem deslocadas (a da CVC lembra a da Submarino na spec, e a da
Submarino repete a da Arezzo). Os itens 1–3 e 5 parecem erros de digitação/cópia da spec.

## 3. Mapeamento (Etapa 3)

| Item atual | Cat. | Proposta | Observação |
|---|---|---|---|
| `div#page-content.historico-page` | A | `[page-root:petroleo] historico {titulo: 'Histórico'}` | visual idêntico; breadcrumb continua "Histórico" |
| `div.panel-container` | A | `[container:centralizado]` | visual idêntico |
| `h1.page-title` | A | `[page-title:claro] 'Histórico Profissional'` | visual idêntico |
| `div.vertical-list.experiences-wrapper` | A | `[vertical-list:amplo]` | M-02 |
| `div.experience-card` | A | `[card:amarelo]` | M-02 |
| `company-logo-container > img` | A | `[logo:faixa] $item.logo` | M-02 |
| `h3.job-title` | A | `[header:card] $item.cargo` | M-02 |
| `div.info-badges` e `div.tech-shields` | **C** | **`[tag-list]`** — elemento novo (EL-19) | lista de selos com quebra de linha |
| `span.badge` | A | `[badge:pilula] *$item.badges` | M-02 |
| `p.job-description` | A | `[paragraph:escuro] $item.descricao` | M-02 |
| `div.tech-stack-block` | **B** | `[panel:claro]` | extensão: `panel` dentro de `card` (título `h4`) |
| `h4.tech-stack-title` | A | `[header:card] 'Stack tecnológica…'` | M-02 |
| `span.tech-shield.hard/soft` | A | `[badge]` — **ver decisão 3** | |
| Dados das 5 experiências | D | `@dados.experiencias` → `pages/historico/data/historico.json` | conteúdo atual do código (decisão 1) |

Composição dentro do card: `[vertical-list:amplo]` envolve selos, descrição e bloco de stack, para
manter o espaçamento entre eles (os elementos do catálogo não têm margem própria).

### Estrutura resultante (proposta)

```
[page-root:petroleo] historico {titulo: 'Histórico'}
  [container:centralizado]
    [page-title:claro] 'Histórico Profissional'
    [vertical-list:amplo]
      [card:amarelo] *@dados.experiencias
        [logo:faixa] $item.logo
        [header:card] $item.cargo
        [vertical-list:amplo]
          [tag-list]
            [badge:pilula] *$item.badges
          [paragraph:escuro] $item.descricao
          [panel:claro]
            [header:card] 'Stack tecnológica e outras habilidades utilizadas nesta experiencia'
            [tag-list]
              [badge:$item.estilo] *$item.stack          ← só com a exceção da decisão 3
```

## 4. Mudanças propostas no catálogo

### 4.1 Elemento novo (C)

```
### tag-list (EL-19)
Descrição: Linha de selos curtos que quebra para a linha seguinte quando falta espaço.
HTML:
  <div class="tag-list {estilo}">{filhos}</div>
Filhos: badge
Estilos: padrao (padrão)              → flex com quebra, espaço --space-sm, alinhado ao início
```

### 4.2 Extensão compatível (B)
- **`panel` dentro de `card`**: hoje o `panel` só é usado no nível da página. A extensão permite usá-lo
  dentro de um `[card]`, e a regra de nível (R-E03) passa a ser: `header` → `h2` em panel da página,
  `h3` em card, **`h4` em panel dentro de card**. A Sobre não muda.

### 4.3 Exceção pedida (M-03) — decisão 3
Com M-02 puro, todos os selos da stack viram `badge:pilula` e **some a distinção hard × soft**, que é
informação, não só aparência. Proposta: criar dois estilos de `badge` reproduzindo os atuais —
`ardosia` (hard) e `turquesa` (soft) — e escolher o estilo pelo dado do item. Isso exige uma pequena
extensão da notação: **`[elemento:$item.campo]`** (estilo vindo de um campo do item).

## 5. Diferenças visuais (efeito de M-02)

| Item | Hoje | Depois |
|---|---|---|
| Espaço entre cards | `--space-xl` | `--space-md` (`vertical-list:amplo`) |
| Card | fundo branco, cantos 12px, sombra, padding `--space-lg --space-xl`, conteúdo centralizado | `amarelo`: gradiente `#FFEFBA → #FFF`, cantos `--raio-md`, sem sombra, padding `--space-md`, à esquerda |
| Logo | altura `--logo-h` | faixa de `--logo-h × 0,6` (logo menor), centralizada |
| Cargo | preto, ~1,06 × `--fs-3xl`, centralizado | `header:card`: verde `#386312`, CAIXA ALTA, `--fs-lg`, à esquerda |
| Badges de período etc. | Barlow Condensed, fundo amarelo-claro; grade de 2 colunas < 1024, linha centralizada ≥ 1024 | `pilula`: fonte monoespaçada em CAIXA ALTA, fundo branco/cinza; linha com quebra, alinhada à esquerda, em todas as larguras |
| Descrição | Courier New, peso 800, quase preto | `paragraph:escuro`: Barlow, peso normal, azul-noite |
| Bloco da stack | gradiente `#DAEBF2 → #A8CCD9`, cantos 16px, padding `--space-md --space-lg` | `panel:claro`: gradiente `#E0EAFC → #CFDEF3`, sombra interna, cantos `--raio-md`, padding `--space-lg` |
| Título da stack | Courier New, verde `#1b5e20`, `--fs-lg` | `header:card`: Barlow Condensed, verde `#386312`, CAIXA ALTA |
| Selos da stack | hard ardósia / soft turquesa, Courier | depende da decisão 3 (com exceção: iguais aos atuais) |

## 6. Decisões (aprovação 1 — 2026-11-20)
1. ~~Conteúdo divergente (§2.4)~~ — **decidido (2026-11-20):** a migração mantém o conteúdo que a página
   exibe hoje (código); textos e imagens serão revisados depois, num "pente fino" de todas as páginas.
   A nova spec registra os itens 1–7 como pendências de revisão de conteúdo.
2. **Mapeamento:** **aprovado** (`tag-list` novo, `panel` dentro de `card`, demais itens por M-02; diferenças do §5 aceitas).
3. **Exceção M-03:** **aprovada** — estilos `badge:ardosia` (hard) e `badge:turquesa` (soft) e notação `[elemento:$item.campo]`.

## 7. Catálogo (Etapa 4)
- `elementos.md`:
  - novo `tag-list` (EL-19, Listas e itens);
  - `panel`: pode ser filho de `card`; `header` em panel dentro de card → `h4` (R-E03 atualizada);
  - `badge`: estilos `ardosia` e `turquesa`; em `tag-list`, estilo pode vir do dado.
- `notacao-estrutura.md`: regra **R-N05** — `[elemento:$item.campo]` (estilo vindo de um campo do item).
- `estilos.md`: `tag-list:padrao`, `badge:ardosia`, `badge:turquesa` (reproduzem os selos hard/soft atuais,
  sem borda visível e sem caixa alta); tokens `--raio-tag`, `--cor-ardosia`, `--cor-turquesa`.
  Diferença residual: a fonte dos selos hard/soft passa de `Courier New` para `--fonte-mono` (`Consolas`).
- Nada existente mudou de aparência → Sobre, Contatos e Formação não são afetadas (M-04).

## 8. Spec da página (Etapa 5)
- `spec.md` reescrita no modelo (seções 1 a 10), sem valores visuais; o conteúdo segue o que a página
  exibe hoje, com as divergências listadas em **6.1 Pendências de revisão de conteúdo**.
- `data-page-title` "Histórico" via `{titulo: 'Histórico'}` no `page-root` (o `h1` é "Histórico Profissional").
- `contracts/ui-contracts.md` marcado como substituído.
- **Aguardando aprovação 2** para seguir para a implementação (Etapa 6).

## 9. Aprovação 2 — 2026-11-20
- Spec da página: **aprovada**.

## 10. Implementação (Etapa 6)
- `pages/historico/data/historico.json`: extraído do markup atual por script (textos idênticos); `stack[].estilo` = `ardosia` (hard) ou `turquesa` (soft).
- Componente novo `TagList.astro`; `Badge`, `Panel`, `Header`, `Logo`, `Container` reusados.
- Páginas: as duas cópias montadas só com componentes do catálogo; raiz com `page-root page-root--petroleo historico-page`.
- `historico.css` reescrito a partir de `estilos.md`; `tokens.css` com 3 tokens novos.

## 11. Validação (Etapa 7) — 2026-11-20
- `npm run build`: sem erros nem avisos.
- Conteúdo: 5 cards, 25 selos de informação (ordem preservada), 44 selos hard (`ardosia`) e 2 soft
  (`turquesa`: "Análise de Sistema", "Modelagem de dados"). Títulos: 1 `h1`, 5 `h3`, 5 `h4`.
- Comparação com a linha de base (`x,y,largura,altura`):

| Largura | Cards (1 a 5) | Linhas de selos (card 1) |
|---|---|---|
| 375  | 36,254,295,865 · 36,1129,295,900 · 36,2039,295,849 · 36,2898,295,837 · 36,3745,295,849 | 3 (antes 3) |
| 1024 | 282,129,692,535 · 282,676,692,535 · 282,1224,692,525 · 282,1761,692,550 · 282,2324,692,525 | 1 (antes 1) |
| 1440 | 321,143,1061,469 · 321,624,1061,469 · 321,1105,1061,458 · 321,1575,1061,458 · 321,2045,1061,458 | 1 (antes 1) |

  Cards mais baixos e próximos entre si — efeito das diferenças aceitas do §5 (logo menor, padding
  `--space-md`, gap `--space-md`, descrição em Barlow). Sem rolagem horizontal.
- Breadcrumb: "Histórico".
- Regressão: Sobre (grids 3/2, 2 painéis claros), Formação (grids 2/3/3, selo `pilula`), Contatos (2 colunas, 4 cartões).
- Colisão de classes: ao navegar Histórico → Artigos (não convertida), o CSS da Histórico é descarregado
  e o `h1` da Artigos mantém o estilo próprio (Oswald).

## 12. Fechamento (Etapa 8)
- `elementos.md`, `elementos-por-pagina.md` e CLAUDE.md atualizados com a Histórico como convertida.
- Commit/PR: não feitos (trabalho segue na branch atual, sem commit).
- **Migração aprovada pelo responsável em 2026-11-20.**
