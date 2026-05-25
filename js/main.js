/* THE COVENANT — Shared JS */

// ── NAV SCROLL STATE ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── MOBILE HAMBURGER ──
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

// ── MODAL ──
const modalWrap  = document.getElementById('modal');
const modalLabel = document.getElementById('modal-label');
const modalTitle = document.getElementById('modal-title');
const modalBody  = document.getElementById('modal-body');

function openModal(label, title, paragraphs) {
  if (!modalWrap) return;
  modalLabel.textContent = label;
  modalTitle.textContent = title;
  modalBody.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
  modalWrap.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalWrap.querySelector('.modal').scrollTop = 0;
}

function closeModal() {
  if (!modalWrap) return;
  modalWrap.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalWrap) {
  modalWrap.addEventListener('click', e => {
    if (e.target === modalWrap) closeModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
