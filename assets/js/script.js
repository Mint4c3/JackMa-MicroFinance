// ── NAV & BACK-TOP ON SCROLL ──
  const navbar  = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backTop.classList.toggle('show',    window.scrollY > 300);
  });

  // ── HAMBURGER ──
  document.getElementById('hamburger').addEventListener('click', () =>
    document.getElementById('mobileMenu').classList.add('open'));
  document.getElementById('mobileClose').addEventListener('click', () =>
    document.getElementById('mobileMenu').classList.remove('open'));
  function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
  }

  // ── FLOATING PARTICLE CANVAS ──
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const pts = Array.from({length: 90}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.6 + 0.4,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    a: Math.random() * 0.5 + 0.1
  }));

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${p.a})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(loop);
  })();

  // ── SCROLL-REVEAL ──
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.benefit-card, .team-card, .testimonial-card, .step-item, .reason-item, .join-step, .stat-card'
  ).forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity .55s ease ${(i % 6) * 0.08}s, transform .55s ease ${(i % 6) * 0.08}s`;
    io.observe(el);
  });