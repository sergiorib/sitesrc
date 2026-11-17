# Research: Portfolio Page Architecture & SPA Integration

## 1. SPA Navigation & Fragment Injection
- **Decision**: Use dynamic `fetch` via the main SPA router (`pages/spa/spa.astro` / `pages/spa/assets/js/...`) to load project subpages into `#page-content-host`.
- **Rationale**: Preserves the SPA state without full browser reloads, providing smooth transitions and consistent navigation headers.
- **Alternatives considered**: Traditional multi-page application routing (rejected due to SPA architecture requirement).

## 2. Asset Resolution Convention
- **Decision**: Use absolute paths (`/pages/portfolio/assets/images/...`) for static images and assets.
- **Rationale**: Prevents broken path resolution when fragments are fetched and injected across nested router paths.
- **Alternatives considered**: Relative paths `./assets/images/...` (rejected due to path resolution failure in SPA router).

## 3. Styling & Interactivity
- **Decision**: Vanilla CSS (`portfolio.css`) with CSS Grid for 2-column project layout on tablet/desktop, and Vanilla JS (`portfolio.js`) for category scroll anchors and active state highlighting on header selection buttons.
- **Rationale**: Fully complies with project Constitution prohibiting external CSS frameworks or UI component libraries.
- **Alternatives considered**: Tailwind CSS or React components (strictly forbidden by Constitution).
