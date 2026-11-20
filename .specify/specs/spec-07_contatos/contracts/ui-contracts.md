> **Substituído.** A marcação da página Contatos agora é definida pela seção 4 (Estrutura) de
> [spec.md](../spec.md), pelo catálogo [elementos.md](../../../catalog/elementos.md) e pelos estilos
> [estilos.md](../../../catalog/estilos.md). Este contrato descreve a implementação anterior
> (`.contacts-page`, `.contact-grid`, `.contact-card`) e é mantido apenas como histórico.

# UI Contracts: Página "Meus Contatos" (`contatos.astro`)

## 1. Elementos Raiz e Contêineres SPA
- **Elemento Raiz da Página**: `<div id="page-content" data-page-id="contatos" data-page-title="Meus Contatos" class="page-content-wrapper contacts-page">`
- **Contêiner de Conteúdo**: `<div class="content">` com largura máxima de `min(100%, 1280px)` e margens centralizadas (`0 auto`).
- **Grade de Cards**: `<div class="contact-grid">` utilizando CSS Grid (`grid-template-columns: repeat(2, minmax(0, 1fr))`, `gap: 16px`).

## 2. Componentes de Card (`.contact-card`)
- Tag HTML: `<a>` (link âncora com `href`, `target="_blank"` para links externos).
- Estados Interativos:
  - Default: Fundo com gradiente linear, borda translúcida (`rgba(102, 218, 238, .44)`), border-radius de `13px`.
  - Hover / Focus-visible: `transform: translateY(-3px)`, borda `--cyan` (`#19c6e6`), background elevado.

## 3. Tipografia
- Título da página (`h1.page-title`): `Barlow Condensed`, 700 bold, 32px, cor `#ffffff`.
- Rótulos (`.label` / `.contact-label`): `Barlow Condensed`, 600, 24px, maiúsculas, cor `#f2fbfd`.
- Valores (`.value`): `Barlow Condensed`, 600, 24px, cor `#f2fbfd`.
- Detalhes (`.detail`): `Inter`, 400, 11px, cor `--muted` (`#a9c4ce`).
