# Research: Página "Meus Contatos" (`contatos.astro`)

**Branch**: `07-contatos` | **Date**: 2026-11-11 | **Spec**: [spec.md](./spec.md)

## 1. Architectural Decisions

### Decision 1: Isolation and Modular Structure (`pages/contatos/`)
- **Decision**: Segregar todos os recursos da página de contatos no diretório dedicado `pages/contatos/` contendo `contatos.astro`, `assets/css/contatos.css`, e imagens/assets em `assets/images/`.
- **Rationale**: Cumpre rigorosamente o Princípio II da Constituição (Estrutura de Páginas e Separação de Preocupações), garantindo que alterações na página de contatos não afetem outras páginas da SPA.
- **Alternatives Considered**: Colocar estilos globais ou compartilhar folhas de estilo genéricas (rejeitado por violar o isolamento modular exigido).

### Decision 2: Pure Vanilla CSS & Responsive Grid
- **Decision**: Utilizar CSS Grid com `grid-template-columns: repeat(2, minmax(0, 1fr))` para desktops (≥ 720px) e `1fr` para mobile (< 720px), combinado com variáveis CSS para gradientes e cores (`--cyan`, `--cyan-soft`, `--muted`).
- **Rationale**: Sem dependência de frameworks externos (como Tailwind ou Bootstrap), mantendo o bundle leve e em conformidade estrita com o Princípio I da Constituição.
- **Alternatives Considered**: Flexbox puro (rejeitado pois CSS Grid é mais declarativo e preciso para cards de 2 colunas).

### Decision 3: SVG Icons and Interactive Card State
- **Decision**: Incorporar ícones SVG inline ou via assets otimizados em `.icon-wrap` (48x48px, reduções para 42x42px em viewports < 380px) com transições suaves (`transform: translateY(-3px)`) no hover.
- **Rationale**: Garante feedback tátil e visual moderno ("Dark Tech Dashboard") sem uso de bibliotecas de ícones pesadas de terceiros.
- **Alternatives Considered**: FontAwesome / Material Icons (rejeitado para evitar dependências externas de rede ou runtime).
