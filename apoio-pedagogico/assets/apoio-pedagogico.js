(() => {
  const isIndex = document.body.classList.contains('apoio-index-page');

  const iconPrint = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9V2h12v7"></path>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>`;

  const socialIcons = {
    youtube: `
      <span class="apoio-social-icon apoio-social-youtube" aria-hidden="true">
        <svg viewBox="0 0 32 24"><rect x="1" y="1" width="30" height="22" rx="7" fill="#ff0000"></rect><path d="M13 7.5 22 12l-9 4.5z" fill="#fff"></path></svg>
      </span>`,
    tiktok: `
      <span class="apoio-social-icon apoio-social-tiktok" aria-hidden="true">
        <span>♪</span>
      </span>`,
    whatsapp: `
      <span class="apoio-social-icon apoio-social-whatsapp" aria-hidden="true">
        <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#25d366"></circle><path d="M23.3 19.5c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.7-.2-1 .2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-2.4-1.2-4-2.2-5.7-4.9-.4-.7.4-.7 1.2-2.2.1-.3 0-.6-.1-.8-.1-.2-1-2.4-1.4-3.3-.4-.9-.8-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.9s1.7 4.5 1.9 4.8c.2.3 3.3 5.1 8.1 7.1 3 .9 4.2.8 5.7.7.9-.1 2.3-1 2.6-1.9.3-.9.3-1.7.2-1.9-.2-.2-.6-.3-1-.5z" fill="#fff"></path></svg>
      </span>`,
    facebook: `
      <span class="apoio-social-icon apoio-social-facebook" aria-hidden="true">f</span>`,
    instagram: `
      <span class="apoio-social-icon apoio-social-instagram" aria-hidden="true">
        <svg viewBox="0 0 32 32"><defs><linearGradient id="apoio-instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ffdc80"></stop><stop offset=".34" stop-color="#fcaf45"></stop><stop offset=".58" stop-color="#f77737"></stop><stop offset=".78" stop-color="#c13584"></stop><stop offset="1" stop-color="#405de6"></stop></linearGradient></defs><rect x="1" y="1" width="30" height="30" rx="8" fill="url(#apoio-instagram-gradient)"></rect><rect x="7.5" y="7.5" width="17" height="17" rx="5" fill="none" stroke="#fff" stroke-width="2.2"></rect><circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" stroke-width="2.2"></circle><circle cx="22" cy="10.2" r="1.35" fill="#fff"></circle></svg>
      </span>`
  };

  document.querySelectorAll('.titulo-com-conteudo').forEach(section => {
    const heading = section.querySelector(':scope > h2, :scope > h3, :scope > h4');
    const text = heading?.textContent?.trim().toUpperCase() || '';

    if (heading?.tagName === 'H2') section.classList.add('apoio-secao-principal');
    if (/^(TEXTO ÁUREO|VERDADE APLICADA|OBJETIVOS DA LIÇÃO|TEXTOS DE REFERÊNCIA|MOTIVO DE ORAÇÃO|ESBOÇO DA LIÇÃO)/.test(text)) {
      section.classList.add('apoio-secao-informativa');
    }
    if (text.startsWith('ANÁLISE GERAL')) section.classList.add('apoio-analise');
  });

  const whatsappText = encodeURIComponent(`${document.title}\n${window.location.href}`);
  const footer = document.createElement('footer');
  footer.className = 'apoio-footer';
  footer.innerHTML = `
    <div class="apoio-footer-inner">
      ${isIndex ? '' : `
        <div class="apoio-footer-actions">
          <button class="apoio-print-button" type="button" data-print title="Salvar como PDF ou imprimir em A4">
            ${iconPrint}
            <span>Salvar / imprimir em A4</span>
          </button>
        </div>`}

      <nav class="apoio-social-links" aria-label="Redes sociais da EBD Fiel">
        <a class="apoio-social-link" href="https://www.youtube.com/@EBDFiel" target="_blank" rel="noopener noreferrer" aria-label="Abrir o YouTube da EBD Fiel">
          ${socialIcons.youtube}<span>YouTube</span>
        </a>
        <a class="apoio-social-link" href="https://www.tiktok.com/@ebdfiel" target="_blank" rel="noopener noreferrer" aria-label="Abrir o TikTok da EBD Fiel">
          ${socialIcons.tiktok}<span>TikTok</span>
        </a>
        <a class="apoio-social-link" href="https://wa.me/?text=${whatsappText}" target="_blank" rel="noopener noreferrer" aria-label="Compartilhar esta página no WhatsApp">
          ${socialIcons.whatsapp}<span>WhatsApp</span>
        </a>
        <a class="apoio-social-link" href="https://www.facebook.com/EBDFiel/" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Facebook da EBD Fiel">
          ${socialIcons.facebook}<span>Facebook</span>
        </a>
        <a class="apoio-social-link" href="https://www.instagram.com/ebdfiel/" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Instagram da EBD Fiel">
          ${socialIcons.instagram}<span>Instagram</span>
        </a>
      </nav>

      <a class="apoio-footer-logo" href="https://ebdfiel.com.br/" target="_blank" rel="noopener noreferrer" aria-label="Abrir o site EBD Fiel">
        <img src="assets/logo-ebd-fiel-footer.png" alt="Logo EBD Fiel — Fiel à Palavra"/>
      </a>
      <p class="apoio-footer-caption">Classe Adultos · Apoio Pedagógico · EBD Fiel</p>
    </div>`;
  document.body.append(footer);

  document.addEventListener('click', event => {
    if (event.target.closest('[data-print]')) window.print();
  });
})();
