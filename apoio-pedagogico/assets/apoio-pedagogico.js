
(() => {
  const isIndex = document.body.classList.contains('apoio-index-page');
  const iconHome = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path></svg>';
  const iconList = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"></path><path d="M3 6h.01M3 12h.01M3 18h.01"></path></svg>';
  const iconCopy = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  const iconPrint = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>';

  const toolbar = document.createElement('header');
  toolbar.className = 'apoio-toolbar';
  toolbar.innerHTML = `
    <div class="apoio-toolbar-inner">
      <a class="apoio-brand" href="../index.html"><small>EBD Fiel</small>Apoio Pedagógico — Adultos</a>
      <nav class="apoio-toolbar-actions" aria-label="Ações da página">
        <a class="apoio-button" href="../index.html" title="Página principal">${iconHome}<span class="button-label">Lições</span></a>
        ${isIndex ? '' : `<a class="apoio-button" href="index.html" title="Índice do apoio">${iconList}<span class="button-label">Índice</span></a>`}
        ${isIndex ? '' : `<button class="apoio-button" type="button" data-copy title="Copiar apoio pedagógico">${iconCopy}<span class="button-label">Copiar</span></button>`}
        <button class="apoio-button primary" type="button" data-print title="Salvar ou imprimir com layout A4 otimizado">${iconPrint}<span class="button-label">Salvar / imprimir em A4</span></button>
      </nav>
    </div>`;
  document.body.prepend(toolbar);

  document.querySelectorAll('.titulo-com-conteudo').forEach(section => {
    const heading = section.querySelector(':scope > h2, :scope > h3, :scope > h4');
    const text = heading?.textContent?.trim().toUpperCase() || '';
    if (heading?.tagName === 'H2') section.classList.add('apoio-secao-principal');
    if (/^(TEXTO ÁUREO|VERDADE APLICADA|OBJETIVOS DA LIÇÃO|TEXTOS DE REFERÊNCIA|MOTIVO DE ORAÇÃO|ESBOÇO DA LIÇÃO)/.test(text)) {
      section.classList.add('apoio-secao-informativa');
    }
    if (text.startsWith('ANÁLISE GERAL')) section.classList.add('apoio-analise');
  });

  const footer = document.createElement('footer');
  footer.className = 'apoio-footer';
  footer.textContent = 'EBD Fiel — Apoio pedagógico para preparação e ensino da lição.';
  document.body.append(footer);

  const top = document.createElement('a');
  top.className = 'apoio-top';
  top.href = '#topo';
  top.setAttribute('aria-label', 'Voltar ao topo');
  top.textContent = '↑';
  document.body.append(top);
  document.body.id = 'topo';

  const toast = document.createElement('div');
  toast.className = 'apoio-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.append(toast);
  let timer;
  const showToast = message => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  async function copyCurrentLesson() {
    const content = document.querySelector('.licao-container');
    if (!content) return;
    const text = content.innerText.replace(/\u00a0/g,' ').replace(/\n{3,}/g,'\n\n').trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        if (!document.execCommand('copy')) throw new Error('copy');
        area.remove();
      }
      showToast('Apoio pedagógico copiado.');
    } catch (error) {
      showToast('Não foi possível copiar automaticamente.');
    }
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-print]')) window.print();
    if (event.target.closest('[data-copy]')) copyCurrentLesson();
  });
})();
