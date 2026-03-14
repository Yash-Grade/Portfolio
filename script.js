/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-group, .course-card, .workshop-chip, .cert-item');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
});

/* ===== SCROLL: NAV STICKY ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== REVEAL ON SCROLL ===== */
const revealElements = document.querySelectorAll('.reveal, .skill-group, .project-card, .cert-item, .course-card, .workshop-chip, .timeline-item, .about-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on position
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

// Add initial hidden state and stagger delays
document.querySelectorAll('.skill-group, .project-card, .cert-item, .course-card, .workshop-chip').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===== HERO STAGGERED REVEAL ===== */
const heroItems = document.querySelectorAll('.hero .reveal');
heroItems.forEach((el, i) => {
  setTimeout(() => {
    el.classList.add('visible');
  }, 200 + i * 120);
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));

/* ===== SMOOTH PARALLAX ON HERO GRID ===== */
const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('scroll', () => {
  if (heroGrid) {
    const scrolled = window.scrollY;
    heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

/* ===== TILT EFFECT ON PROJECT CARDS ===== */
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== SKILL GROUP HOVER HIGHLIGHT ===== */
const skillGroups = document.querySelectorAll('.skill-group');
skillGroups.forEach(group => {
  group.addEventListener('mouseenter', () => {
    skillGroups.forEach(g => {
      if (g !== group) g.style.opacity = '0.5';
    });
  });
  group.addEventListener('mouseleave', () => {
    skillGroups.forEach(g => {
      g.style.opacity = '';
    });
  });
});

/* ===== COUNTER ANIMATION FOR HERO STATS ===== */
function animateCounter(el, target, duration = 1500) {
  const isFloat = target % 1 !== 0;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    el.textContent = isFloat ? current.toFixed(2) : Math.floor(current) + '+';

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isFloat ? target.toFixed(2) : target + '+';
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const raw = num.textContent.replace('+', '').trim();
        const val = parseFloat(raw);
        if (!isNaN(val)) {
          animateCounter(num, val);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===== TAG RIPPLE ON CLICK ===== */
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      background: var(--accent); opacity: 0.3;
      width: 60px; height: 60px;
      top: ${e.clientY - rect.top - 30}px;
      left: ${e.clientX - rect.left - 30}px;
      transform: scale(0); pointer-events: none;
      transition: transform 0.5s ease, opacity 0.5s ease;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(2)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 500);
  });
});