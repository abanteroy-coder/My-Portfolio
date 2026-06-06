// Animated background canvas
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  const COLORS = [
    'rgba(124,58,237,', 
    'rgba(168,85,247,', 
    'rgba(236,72,153,',
    'rgba(109,40,217,'
  ];

  let orbs = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createOrb() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 180 + Math.random() * 220,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.04 + Math.random() * 0.07,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    };
  }

  function init() {
    resize();
    orbs = Array.from({ length: 7 }, createOrb);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    orbs.forEach(o => {
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, o.color + o.opacity + ')');
      g.addColorStop(1, o.color + '0)');
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      o.x += o.dx;
      o.y += o.dy;
      if (o.x < -o.r || o.x > W + o.r) o.dx *= -1;
      if (o.y < -o.r || o.y > H + o.r) o.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Modal
function openModal(src, caption) {
  document.getElementById('modalImg').src = src;
  document.getElementById('modalCaption').textContent = caption;
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  const pos = window.scrollY + 100;
  sections.forEach(s => {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`nav ul a[href="#${s.id}"]`);
      if (active) active.classList.add('active');
    }
  });

  // Animate cards on scroll
  document.querySelectorAll('.skill-card, .cert-card, .capstone-card, .gallery-item').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) el.style.opacity = '1';
  });
});

// Scroll animation init
document.querySelectorAll('.skill-card, .cert-card, .capstone-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s ease, transform 0.3s ease, border-color 0.3s, box-shadow 0.3s';
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// Nav active style
const style = document.createElement('style');
style.textContent = `nav ul a.active { color: #a855f7 !important; }`;
document.head.appendChild(style);
