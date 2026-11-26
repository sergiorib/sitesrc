# Plano de Migração de Páginas para o Modelo em Camadas

> Status: **concluído (2026-11-20)** · Modelo de referência: página Sobre (spec-02)
> Camadas: Spec da página → [elementos.md](elementos.md) → [estilos.md](estilos.md)
> Vale para qualquer página. Todas as páginas foram migradas (ver §7).

## 1. Regras da migração

- **M-01 — Reusar antes de criar.** Todo item da página é primeiro comparado com o catálogo.
  Só vira elemento novo quando nenhum elemento existente serve (ver §3).
- **M-02 — O estilo existente prevalece.** Se um item equivale a um elemento existente mas tem
  aparência diferente (cor, fonte, tamanho, espaçamento), a página passa a usar um estilo que
  já existe no catálogo. A aparência antiga é descartada e registrada como "diferença aceita".
- **M-03 — Exceção só com aprovação.** Um estilo novo para um elemento existente só é criado
  quando nenhum estilo existente é utilizável (ex.: texto ilegível sobre o fundo da página) e
  com aprovação explícita, registrada no mapeamento.
- **M-04 — Catálogo só cresce de forma compatível.** Uma mudança num elemento existente
  (parte, filho ou configuração nova) DEVE ser opcional e, por padrão, manter o HTML e a
  aparência das páginas já convertidas.
- **M-05 — Uma página por vez**, numa branch própria (`feat/migracao-<pagina>`), do início ao
  fim, antes de começar a próxima.
- **M-06 — Spec antes do código**, com dois pontos de aprovação (§2, etapas 3 e 5).
- **M-07 — Nada se perde em silêncio.** Toda diferença visual, todo seletor de JS alterado e
  todo conteúdo movido para dados é listado no registro da página (§4).

## 2. Etapas por página

### Etapa 1 — Linha de base
- Criar a branch `feat/migracao-<pagina>` a partir da branch principal atualizada.
- `npm run build` passando antes de qualquer mudança.
- Capturar referências da página atual em 375, 1024 e 1440px: captura de tela e medições
  (posição e tamanho de títulos, painéis, cards, listas; altura total), com os recolhíveis
  abertos e fechados.
- Registrar os comportamentos de JS da página (cliques, filtros, âncoras, rolagem).

### Etapa 2 — Inventário
Levantar, a partir do código (fonte da verdade do que a página faz hoje) e da spec atual:
- **Árvore da página** com tags e classes atuais, incluindo as duas cópias
  (`pages/spa/<pagina>.astro` e `pages/<pagina>/<pagina>.astro`) e componentes próprios.
- **Ganchos de JS:** classes, ids e `data-*` usados por `assets/js/*.js` e pelo roteador.
- **Conteúdo:** textos longos, listas e dados embutidos no markup ou nos componentes.
- **Divergências spec × código** encontradas (pela Regra de Ouro, apontadas, não corrigidas
  em silêncio).

### Etapa 3 — Mapeamento contra o catálogo ⛳ aprovação 1
Classificar cada item do inventário em uma categoria:

| Cat. | Situação | Ação |
|---|---|---|
| **A** | Equivale a um elemento existente (§3) | Reusar; escolher um estilo existente (M-02) |
| **B** | Equivale, mas falta algo pequeno (parte, filho, configuração) | Propor extensão compatível (M-04) |
| **C** | Sem equivalente | Propor elemento novo, com ficha completa |
| **D** | É conteúdo ou dado, não elemento | Seção **Textos** ou **Fontes de dados** |

Entregável para aprovação, no registro da página (§4):
- tabela item atual → `[elemento:estilo]` com a categoria;
- lista de **diferenças visuais aceitas** (efeito de M-02), com antes e depois;
- extensões (B) e elementos novos (C) propostos;
- exceções pedidas (M-03), se houver.

Nada é alterado no catálogo antes desta aprovação.

### Etapa 4 — Atualização do catálogo
Só o que foi aprovado na Etapa 3:
- fichas novas ou estendidas em `elementos.md` (próximo ID EL-xx livre);
- estilos dos elementos novos em `estilos.md`, usando tokens existentes; token novo só se
  nenhum servir, adicionado em `estilos.md` e `tokens.css`;
- conferir que as páginas já convertidas continuam válidas (M-04).

### Etapa 5 — Spec da página no modelo ⛳ aprovação 2
Reescrever o `spec.md` seguindo o [spec-template](../templates/spec-template.md) e a Sobre:
- seções 1 a 10 numeradas; seção 2 com rotas, subpáginas e árvore de arquivos;
- seção 4 (Estrutura) na notação; seções 5 e 6 com textos e fontes de dados;
- User Stories, requisitos e critérios sem valores visuais (remetem à Estrutura e ao catálogo);
- requisitos não visuais preservados (roteamento, JS, acessibilidade, dados);
- `contracts/ui-contracts.md` marcado como substituído.

### Etapa 6 — Implementação
- Dados em `pages/<pagina>/data/*.json`; textos longos no frontmatter da página.
- As duas cópias da página montadas só com componentes de `pages/spa/components/elementos/`.
- Componentes novos para elementos novos; componentes próprios antigos removidos.
- CSS da página reescrito a partir de `estilos.md`, só com os elementos e estilos usados.
- Importar `scale.css` e `tokens.css`.
- Ganchos de JS: manter as classes/ids usados ou atualizar o JS junto, conforme o registro.

### Etapa 7 — Validação
- `npm run build` sem erros nem avisos.
- Comparar com a linha de base nas três larguras: tudo igual, exceto as diferenças aceitas.
- Testar todos os comportamentos de JS registrados na Etapa 1.
- **Regressão:** conferir as páginas já convertidas se o catálogo mudou na Etapa 4.
- **Colisão de classes:** buscar as classes do catálogo nas páginas ainda não convertidas
  (ex.: `.page-title`, `.vertical-list`, `.badge`) e verificar se o CSS novo não as afeta
  durante a navegação no SPA.
- Console sem erros.

### Etapa 8 — Fechamento
- Registro da página completo e marcado como concluído (§4).
- `elementos-por-pagina.md` e a nota de transição do CLAUDE.md atualizados.
- Commit e PR da branch da página.

## 3. Critério de equivalência (anti-redundância)

Um item da página **equivale** a um elemento do catálogo quando as três condições valem:
1. **Mesma função** na página (ex.: título de container, lista vertical, selo de período).
2. **Mesmo esqueleto HTML**: mesma tag raiz e mesmas partes, aceitando partes opcionais.
3. **Mesmos tipos de filho** aceitos.

Diferenças apenas de cor, fonte, tamanho, espaçamento, borda ou sombra **não** criam elemento
novo: são estilo (aplica-se M-02). Diferença de nome também não: `period-badge` e `badge`,
`card-title` e `header` são o mesmo elemento.

Quando um item atende 1 e 3 mas o esqueleto difere só por uma parte a mais ou a menos,
é categoria **B** (extensão). Quando a função é outra, é categoria **C**, mesmo que o HTML
pareça igual.

## 4. Registro da migração

Um arquivo por página: `.specify/specs/spec-XX_<pagina>/migracao.md`, com:
- linha de base (data, larguras, onde estão as capturas);
- inventário resumido e ganchos de JS;
- tabela de mapeamento (Etapa 3) com a decisão de cada item;
- diferenças visuais aceitas, extensões, elementos novos e exceções, com a aprovação;
- resultado da validação (Etapa 7).

## 5. Ordem e aprovação

- A ordem das páginas é **definida pelo responsável do projeto**, uma página de cada vez.
- A migração seguinte só começa depois que o responsável **aprova a migração concluída** da
  página anterior (após a Etapa 7/8).

Sugestão de ordem (apenas referência):

| # | Página | Motivo |
|---|---|---|
| 1 | Contatos (spec-07) | Menor e sem JS próprio: piloto do processo |
| 2 | Formação (spec-04) | Introduz `badge` e `company-logo` no catálogo |
| 3 | Histórico (spec-03) | Reusa `badge` e `company-logo` vindos da Formação |
| 4 | Artigos (spec-06) | Tem JS próprio (`artigos.js`) e listas aninhadas |
| 5 | Portfólio (spec-05) | Mais complexa: JS próprio, cabeçalho fixo e subpáginas |

## 6. Encerramento (após a última página)
- Aposentar `catalogo-elementos.md` e `elementos-por-pagina.md` (ou reescrever este último a
  partir das seções Estrutura).
- Remover as cláusulas de transição da constituição (Princípio III) e do CLAUDE.md, com o
  devido incremento de versão.
- Revisar `estilos.md` em busca de estilos não usados por nenhuma página.

## 7. Resultado (2026-11-20)

| Ordem | Página | Registro | Elementos novos no catálogo |
|---|---|---|---|
| — | Sobre (spec-02) | modelo de referência | catálogo inicial (EL-01 a EL-14) |
| 1 | Contatos (spec-07) | [migracao.md](../specs/spec-07_contatos/migracao.md) | `link-card` |
| 2 | Formação (spec-04) | [migracao.md](../specs/spec-04_formacao/migracao.md) | `container`, `logo`, `badge` |
| 3 | Histórico (spec-03) | [migracao.md](../specs/spec-03_historico/migracao.md) | `tag-list`; estilos `badge:ardosia`/`turquesa` (M-03) |
| 4 | Artigos (spec-06) | [migracao.md](../specs/spec-06_artigos/migracao.md) | `accordion`, `link-item`, `page-footer` |
| 5 | Portfólio (spec-05) | [migracao.md](../specs/spec-05_portfolio/migracao.md) | `page-header`, `anchor-nav`, `media-card` |
| 6 | Moldura da SPA (spec-01) + página 404 | [migracao.md](../specs/spec-01_spa/migracao.md) | `app-layout`, `sidebar`, `identity-card`, `nav-menu`, `main-area`, `breadcrumbs`, `content-host`; seção "Base do documento" |

Encerramento (§6):
- `catalogo-elementos.md` e `elementos-por-pagina.md` arquivados em `.specify/catalog/arquivo/`.
- Cláusula de transição removida da constituição (v2.0.1) e do CLAUDE.md; exceção registrada para as
  subpáginas de projeto do Portfólio em HTML estático legado.
- Revisão de estilos: 25 elementos e 37 estilos no catálogo; sem uso em nenhuma página: `header:painel`
  (estilo padrão do atalho R-N01) e `panel:escuro` (estilo padrão do `panel`). **Decisão: mantidos no
  catálogo** (são os estilos padrão desses elementos e ficam disponíveis para páginas futuras). No CSS das páginas, só
  `badge--turquesa` no Portfólio não aparece hoje no HTML (nenhuma tag soft cadastrada), mas é escolhido
  pelo dado e por isso permanece.

Pendências fora do escopo da migração:
- Revisão geral de conteúdo ("pente fino"), incluindo as pendências da Histórico (spec-03, §6.1) e a
  divisória encostada no subtítulo da Artigos.
- Conversão das subpáginas de projeto do Portfólio (`pages/portfolio/projetos/`) e das páginas de artigo
  (`pages/artigos/artigos_pages/`) quando forem reescritas; até lá seguem a exceção do Princípio VII
  (constituição v2.0.2), com contrato de fragmento, `data-breadcrumbs` e estilos/scripts restritos à página.
  `pagina_teste.html` e `series_temporais_glossario.html` ainda usam Tailwind via CDN (Princípio I), com a
  versão fixada na URL (`https://cdn.tailwindcss.com/3.4.17`).
