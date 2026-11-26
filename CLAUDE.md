# Constituição Técnica e Fluxo Google Spec Kit (GSK)

## Fonte de Verdade (Single Source of Truth)
Este projeto segue rigorosamente o fluxo **Specification-Driven Development** via Google Spec Kit.
- Antes de escrever ou modificar qualquer código em `pages/`, leia obrigatoriamente:
  1. A constituição do projeto: `.specify/memory/constitution.md`.
  2. A especificação da página/feature em foco: `.specify/specs/spec-XX_<feature>/` (`spec.md`, `plan.md`, `tasks.md`).
  3. As specs transversais do modelo em camadas em `.specify/catalog/` (ver abaixo).

## Especificação em Camadas (Princípio VII da constituição)
As páginas são especificadas em três camadas, cada uma com uma única responsabilidade:

| Camada | Arquivo | Define | Formato |
|---|---|---|---|
| **Página** | seções **Estrutura**, **Textos** e **Fontes de dados** do `spec.md` da feature | *o que* a página monta: elementos, hierarquia, textos, configurações e estilos escolhidos | `.specify/catalog/notacao-estrutura.md` |
| **Elementos** | `.specify/catalog/elementos.md` | *o que cada elemento é*: HTML completo, filhos, configurações, estilos disponíveis, comportamento | `.specify/catalog/formato-elementos.md` |
| **Estilos** | `.specify/catalog/estilos.md` | *como cada estilo aparece*, só com tokens | `.specify/catalog/formato-estilos.md` |

Correspondência com o código:
- Elemento → componente `pages/spa/components/elementos/<Elemento>.astro`; classe CSS = nome do elemento (`.grid`).
- Estilo → classe `.<elemento>--<estilo>` (`.page-title--claro`), escolhida conforme a spec da página.
- Estilos → CSS da página (`pages/<pagina>/assets/css/<pagina>.css`), contendo só os elementos e estilos que a página usa; sem prefixo de página e sem sobrescrever o catálogo.
- Tokens → `pages/spa/assets/css/scale.css` (escala) e `pages/spa/assets/css/tokens.css` (cores, gradientes, sombras, raios, fontes).
- Configurações da página (`{colunas: …}`, `{direcao: …}`) → variáveis CSS inline (`--colunas-768`); breakpoints apenas 768, 1024 e 1280.
- Fontes de dados → `pages/<pagina>/data/*.json`.

A moldura da SPA (spec-01) e todas as páginas (spec-02 a spec-07) usam o modelo em camadas. Os elementos da moldura têm nomes próprios e seus ids são ganchos estáveis do JS de navegação (spec-01 FR-003). Exceção: as subpáginas de projeto do Portfólio (`pages/portfolio/projetos/`) e as páginas de artigo (`pages/artigos/artigos_pages/`) são HTML estático legado e só adotam o modelo quando forem reescritas (Princípio VII); mesmo assim seguem o contrato de fragmento da SPA e têm estilos/scripts restritos à própria página (ver spec-06 §2). Documentos do modelo anterior ficam em `.specify/catalog/arquivo/` (só histórico).
- **Elemento ou estilo novo:** compare primeiro com o catálogo pelo critério de equivalência de `.specify/catalog/plano-migracao.md` (§3); só crie quando nenhum existente servir.

## Stack e Regras Arquiteturais
- **Framework:** Astro (arquitetura SPA, componentes `.astro`, estilos isolados `.css`, scripts modulares `.js`). `pages/` é o diretório de roteamento: auxiliares que não são páginas têm nome iniciado por `_` (ex.: `_config.js`).
- **Nomenclatura Estrita:** Respeitar exatamente os nomes de elementos, estilos, classes CSS e componentes definidos nas specs e no catálogo. Nunca renomear sem atualizar a spec primeiro.
- **Assets:** Ícones e imagens de páginas devem respeitar os diretórios especificados (ex: `pages/sobre/assets/images/`), com caminhos absolutos.

## Protocolo de Execução (Regra de Ouro)
1. **Nunca implementar no escuro:** Se um pedido envolver alteração visual, de layout ou de comportamento, identifique primeiro a camada afetada e verifique se ela já reflete a mudança:
   - composição da página (elementos, ordem, textos, colunas, estilo escolhido) → **Estrutura** do `spec.md`;
   - HTML, filhos, configurações ou comportamento de um elemento → `elementos.md`;
   - aparência de um estilo, ou um estilo novo → `estilos.md` (e `tokens.css` se surgir um token).
2. **Ordem de alteração:** spec da camada afetada → código. Um elemento ou estilo novo é criado primeiro no catálogo e só então usado na página. Alterações em `elementos.md` ou `estilos.md` afetam todas as páginas que usam o elemento/estilo: liste-as e verifique cada uma.
3. **Sincronização (Converge):** Se houver divergência entre o código atual e a especificação, aponte o conflito antes de alterar arquivos e pergunte se deve atualizar a spec ou o código.
4. **Validação:** Após alterações em arquivos `.astro`, `.js` ou `.css`, execute `npm run build` ou `npx astro check` para garantir integridade antes de concluir.
