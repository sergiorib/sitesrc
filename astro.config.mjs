import { defineConfig } from 'astro/config';
import { cpSync, existsSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PAGES_DIR = fileURLToPath(new URL('./pages/', import.meta.url));

/**
 * Publicação das imagens das páginas no build (spec-01 FR-013; constituição, Convenção de
 * Resolução de Assets, item 5).
 *
 * As imagens são referenciadas por caminho absoluto (`/pages/<modulo>/assets/images/<arquivo>`)
 * e não são importadas pelo código, então o Astro não as leva para `dist/`. Ao fim do build,
 * esta integração copia cada `pages/<modulo>/assets/images/` para
 * `dist/pages/<modulo>/assets/images/`, sem arquivos ocultos (ex.: `.gitkeep`).
 */
function copiarImagensDasPaginas() {
  return {
    name: 'copiar-imagens-das-paginas',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const destinoRaiz = fileURLToPath(new URL('pages/', dir));
        let pastas = 0;

        for (const modulo of readdirSync(PAGES_DIR, { withFileTypes: true })) {
          if (!modulo.isDirectory()) continue;
          const origem = join(PAGES_DIR, modulo.name, 'assets', 'images');
          if (!existsSync(origem)) continue;

          cpSync(origem, join(destinoRaiz, modulo.name, 'assets', 'images'), {
            recursive: true,
            filter: (caminho) => !basename(caminho).startsWith('.'),
          });
          pastas += 1;
        }

        logger.info(`${pastas} pasta(s) de imagens copiadas para dist/pages/`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  srcDir: './',
  integrations: [copiarImagensDasPaginas()],
});
