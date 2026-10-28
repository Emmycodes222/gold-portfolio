document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const serviceCards = document.querySelectorAll('.service-card');
  const heroCard = document.querySelector('.hero-card');
  const backToTop = document.querySelector('.back-to-top');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('is-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  const collapseCard = (card) => {
    card.className = 'service-card collapsed';
    const num = card.getAttribute('data-index');
    const name = card.getAttribute('data-name');

    card.innerHTML = `
      <div class="service-left">
        <span class="service-number">${num}.</span>
        <span class="service-name">${name}</span>
      </div>
      <div class="action-icon">+</div>
    `;
  };

  const expandCard = (card) => {
    card.className = 'service-card expanded';
    const num = card.getAttribute('data-index');
    const name = card.getAttribute('data-name');

    card.innerHTML = `
      <div class="expanded-header">
        <div class="service-left">
          <span class="service-number">${num}.</span>
          <span class="service-name">${name}</span>
        </div>
        <div class="action-icon">×</div>
      </div>
      <div class="sub-tags">
        <span class="sub-tag">Brand Strategy</span>
        <span class="sub-tag">Design Systems</span>
        <span class="sub-tag">Interaction Design</span>
        <span class="sub-tag">Visual Direction</span>
      </div>
    `;
  };

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('expanded')) {
        collapseCard(card);
      } else {
        serviceCards.forEach(c => collapseCard(c));
        expandCard(card);
      }
    });
  });

  if (heroCard) {
    const resetCard = () => {
      heroCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    document.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      heroCard.style.transform = `rotateY(${x}deg) rotateX(${y * -1}deg)`;
    });

    document.addEventListener('pointerup', resetCard);
    document.addEventListener('pointerleave', resetCard);
  }

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    };

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
  }

  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(element => observer.observe(element));
});