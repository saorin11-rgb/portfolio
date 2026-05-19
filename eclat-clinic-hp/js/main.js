/* ÉCLAT CLINIC HP — Main JS */

(function () {
  'use strict';

  /* ---- Active nav ---- */
  const filename = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.replace('./', '') === filename) {
      link.classList.add('active');
    }
    if (filename === '' || filename === 'index.html') {
      if (href === './index.html' || href === 'index.html') link.classList.add('active');
    }
  });

  /* ---- Header scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- Hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Contact Form (Formspree AJAX) ---- */
  const form = document.getElementById('contact-form');
  const msgSuccess = document.getElementById('form-success');
  const msgError   = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.disabled = true;
      btn.textContent = '送信中...';

      if (msgSuccess) msgSuccess.classList.remove('is-visible');
      if (msgError)   msgError.classList.remove('is-visible');

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          form.reset();
          form.style.display = 'none';
          if (msgSuccess) msgSuccess.classList.add('is-visible');
        } else {
          throw new Error('send failed');
        }
      } catch {
        if (msgError) msgError.classList.add('is-visible');
        btn.disabled = false;
        btn.textContent = '送信する';
      }
    });
  }
})();
