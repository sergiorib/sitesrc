/**
 * Página "Meus Contatos" — botão "Copiar" dos cartões (spec-07_contatos, FR-010)
 *
 * Um único listener delegado em .contatos-page trata os cliques em .link-card-copy:
 * copia data-copiar para a área de transferência (Clipboard API, com fallback por seleção
 * de texto), aplica is-copiado (ícone ✓, rótulo "Copiado") por 1,8s e volta a "Copiar".
 * O botão fica fora do link do cartão, então o clique não abre o destino.
 *
 * Entregue ao navegador como <script is:inline type="module"> dentro de #page-content
 * (import `?raw` em contatos.astro), para ser re-executado pelo roteador SPA a cada injeção.
 */

const FEEDBACK_MS = 1800;
const LABEL_INICIAL = 'Copiar';
const LABEL_COPIADO = 'Copiado';
const LABEL_FALHA = 'Falhou';

/** Fallback para contextos sem Clipboard API (ex.: HTTP sem TLS). */
function copiarPorSelecao(texto) {
  const campo = document.createElement('textarea');
  campo.value = texto;
  campo.setAttribute('readonly', '');
  campo.style.position = 'fixed';
  campo.style.opacity = '0';
  document.body.appendChild(campo);
  campo.select();
  try {
    if (!document.execCommand('copy')) throw new Error('execCommand("copy") recusado');
  } finally {
    campo.remove();
  }
}

async function copiarTexto(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(texto);
      return;
    } catch (error) {
      // Permissão negada (ex.: navegador embutido ou iframe): tenta o fallback abaixo
    }
  }
  copiarPorSelecao(texto);
}

function mostrarFeedback(botao, sucesso) {
  const rotulo = botao.querySelector('.link-card-copy-label');
  clearTimeout(Number(botao.dataset.feedbackTimer));

  botao.classList.toggle('is-copiado', sucesso);
  if (rotulo) rotulo.textContent = sucesso ? LABEL_COPIADO : LABEL_FALHA;

  botao.dataset.feedbackTimer = String(setTimeout(() => {
    botao.classList.remove('is-copiado');
    if (rotulo) rotulo.textContent = LABEL_INICIAL;
  }, FEEDBACK_MS));
}

function initContatosPage() {
  if (typeof document === 'undefined') return;

  const page = document.querySelector('.contatos-page');
  if (!page || page.dataset.copyBound === 'true') return;
  page.dataset.copyBound = 'true';

  page.addEventListener('click', async (event) => {
    const botao = event.target.closest('.link-card-copy');
    if (!botao || !page.contains(botao)) return;
    event.preventDefault();

    try {
      await copiarTexto(botao.dataset.copiar || '');
      mostrarFeedback(botao, true);
    } catch (error) {
      console.warn('[contatos] Não foi possível copiar o contato.', error);
      mostrarFeedback(botao, false);
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContatosPage, { once: true });
  } else {
    initContatosPage();
  }

  if (!window.__contatosBound) {
    window.__contatosBound = true;
    window.addEventListener('spa:page-loaded', initContatosPage);
  }
}

// Endpoint GET para compatibilidade com file-based routing do Astro (arquivo sob pages/)
export function GET() {
  return new Response(JSON.stringify({ module: 'contatos' }), {
    headers: { 'content-type': 'application/json' },
  });
}
