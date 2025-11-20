(function () {
  const root = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('artily-theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  function applyTheme(themeName) {
    if (themeName === 'light') {
      root.setAttribute('data-theme', 'light');
      themeToggleButton.textContent = '🌙';
    } else {
      root.removeAttribute('data-theme');
      themeToggleButton.textContent = '🌞';
    }
  }

  applyTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

  themeToggleButton?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('artily-theme', next);
  });

  // Mobile menu
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  navToggle?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));

  // Parallax effect for hero and quote sections
  const parallaxSections = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    parallaxSections.forEach((section) => {
      section.style.backgroundPosition = `center ${Math.round(y * -0.08)}px`;
    });
  }, { passive: true });

  // Filters for masonry gallery
  const filterButtons = document.querySelectorAll('.filters .chip');
  const items = document.querySelectorAll('.masonry-item');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-filter');
      items.forEach((item) => {
        if (target === 'all') {
          item.style.display = '';
        } else {
          item.style.display = item.classList.contains(target) ? '' : 'none';
        }
      });
    });
  });

  // Tilt effect on cards
  const tiltCards = document.querySelectorAll('.tilt');
  tiltCards.forEach((card) => {
    let rect = null;
    function updateRect() { rect = card.getBoundingClientRect(); }
    updateRect();
    window.addEventListener('resize', updateRect);
    card.addEventListener('mousemove', (e) => {
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8; // rotateX
      const ry = ((x / rect.width) - 0.5) * 8;   // rotateY
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Prevent default submit on newsletter
  const subscribeForm = document.querySelector('.subscribe');
  subscribeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = subscribeForm.querySelector('input[type="email"]');
    if (input && input.value.trim()) {
      alert('¡Gracias por suscribirte a ArtiLy!');
      input.value = '';
    }
  });
})();


