/* =========================================================
   MAREL - Marine Eutrophication Lab
   Global JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. MENU MOBILE (HAMBÚRGUER) ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.header__toggle');
    const nav = document.querySelector('.header__nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fecha o menu ao clicar em um link (útil em mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. FALLBACK DE IMAGENS ---------- */
  /* Se uma imagem não existir, aplica um fundo neutro
     em vez de mostrar o ícone de imagem quebrada. */
  function initImageFallback() {
    const images = document.querySelectorAll('img');

    images.forEach(function (img) {
      // Se a imagem já falhou antes do JS rodar
      if (img.complete && img.naturalWidth === 0) {
        applyFallback(img);
      }

      img.addEventListener('error', function () {
        applyFallback(img);
      });
    });
  }

  function applyFallback(img) {
    // Evita loop infinito se o fallback também falhar
    if (img.dataset.fallbackApplied === 'true') return;

    img.dataset.fallbackApplied = 'true';
    img.style.backgroundColor = '#E1E8EA';
    img.style.objectFit = 'cover';

    // Para fotos de membros (círculo), mantém o formato
    if (img.classList.contains('member-card__photo')) {
      img.style.display = 'block';
    }

    // Remove o src quebrado (evita ícone de imagem quebrada)
    img.removeAttribute('src');
    img.setAttribute('alt', img.getAttribute('alt') || 'Image not available');
  }

  /* ---------- 3. LINK ATIVO NO MENU ---------- */
  /* Marca automaticamente o link do menu correspondente
     à página atual com a classe .is-active */
  function initActiveMenuLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header__nav a');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');

      if (!href) return;

      // Remove "./" e barras do início
      const cleanHref = href.replace(/^\.\//, '').split('/').pop();

      if (cleanHref === currentPath) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- 4. INICIALIZAÇÃO ---------- */
  function init() {
    initMobileMenu();
    initImageFallback();
    initActiveMenuLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
