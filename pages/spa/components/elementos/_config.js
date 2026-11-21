// Converte uma configuração da spec da página em variáveis CSS inline (R-S06).
// valor: escalar (ex.: 2) ou objeto por breakpoint (ex.: { base: 1, 768: 2, 1280: 3 }).
// traduzir: converte um valor em { variavel: valorCss } (padrão: { [chave]: valor }).
export function cssVars(chave, valor, traduzir = (v) => ({ [chave]: v })) {
  if (valor === undefined || valor === null) return undefined;
  const etapas = typeof valor === 'object' ? valor : { base: valor };
  const partes = [];
  for (const [bp, v] of Object.entries(etapas)) {
    const sufixo = bp === 'base' ? '' : `-${bp}`;
    for (const [k, val] of Object.entries(traduzir(v))) partes.push(`--${k}${sufixo}: ${val}`);
  }
  return partes.join('; ');
}
