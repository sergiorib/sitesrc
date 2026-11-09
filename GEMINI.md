# Project Guidelines & Architectural Conventions

## SPA Asset Resolution Convention
- **Absolute Paths for Static Assets**: When adding images, logos, icons, or static media inside SPA modules (`pages/<modulo>/`), **NEVER** use relative paths (e.g. `./assets/...` or `../modulo/assets/...`). Because the SPA client-side router dynamically injects HTML snippets into `#page-content-host` via `fetch` across nested routes (e.g., `/spa/<modulo>/`), relative paths fail to resolve correctly.
- **Server Root Standard**: **ALWAYS** use absolute paths based on the Astro static server root following the project pattern: `/pages/<modulo>/assets/images/<filename>`.
- **Physical Verification**: Ensure asset files physically exist in `pages/<modulo>/assets/images/`.
- **Validation**: always validate rendering and bundling by running `npm run build` upon completion.

## Exhaustive Data Record & Experience Verification
- **Full Specification Compliance**: When executing implementation workflows (`/speckit.tasks` and `/speckit.implement`) from feature specifications (`spec.md`), the agent must perform an exhaustive item count of all data records, user stories, or professional experiences listed in the spec.
- **No Truncation**: Every single entry defined in the specification (including those at the bottom of long documents) must be explicitly accounted for in task breakdowns and fully realized in the codebase. Assumptions or shortcuts based on partial pattern matching are strictly forbidden.
