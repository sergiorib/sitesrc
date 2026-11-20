> **Substituído.** A marcação da página Histórico agora é definida pela seção 4 (Estrutura) de
> [spec.md](../spec.md), pelo catálogo [elementos.md](../../../catalog/elementos.md) e pelos estilos
> [estilos.md](../../../catalog/estilos.md). Este contrato descreve a implementação anterior
> (`.experience-card`, `.job-title`, `.info-badges`, `.tech-stack-block`, `.tech-shield`) e é mantido apenas como histórico.

# UI Contracts: Página de Histórico

**Feature**: `03-historico`  
**Status**: Concluído

## 1. Elementos DOM e Seletores Contratuais

- `#page-content`: Contêiner raiz da página SPA com `data-page-id="historico"` e `data-page-title="Histórico"`.
- `h1.page-title`: Título principal da página ("Histórico Profissional", Barlow Condensed 700 bold, 32px, `#ffffff`).
- `.experience-card`: Contêiner de cada experiência profissional (gradiente `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, `border-radius: 12px`).
- `.company-logo`: Logotipo da empresa (100px de altura para a Experiência 1).
- `.job-title`: Cargo da experiência (Barlow Condensed 700 bold, 28px).
- `.badge`: Badges informativas (gradiente `#FFFDEB` a `#FFF9D2`, 20px).
- `.job-description`: Descrição detalhada da atividade (monoespaçada, 22px, peso 800, cor `#0a0c0c`).
- `.tech-stack-block`: Bloco de tecnologias com `border-radius: 16px`.
