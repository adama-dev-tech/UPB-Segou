  // Header shrink on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Mobile menu toggle
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerBars = document.querySelectorAll('.burger-bar');
  let menuOpen = false;
  function setMenu(open){
    menuOpen = open;
    mobileMenu.classList.toggle('hidden', !open);
    mobileMenu.classList.toggle('flex', open);
    burgerBtn.setAttribute('aria-expanded', open);
    burgerBars[0].style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
    burgerBars[1].style.opacity = open ? '0' : '1';
    burgerBars[2].style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
  }
  burgerBtn.addEventListener('click', () => setMenu(!menuOpen));
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => setMenu(false)));

  // Faculty tabs
  const tabButtons = document.querySelectorAll('#faculty-tabs .tab-btn');
  const panels = document.querySelectorAll('.faculty-panel');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(p => p.classList.add('hidden'));
      panels[+btn.dataset.tab].classList.remove('hidden');
      panels[+btn.dataset.tab].querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Admission form (client-side only)
  const form = document.getElementById('admission-form');
  const success = document.getElementById('form-success');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    success.classList.remove('hidden');
    form.querySelectorAll('input, select, button[type="submit"]').forEach(el => el.disabled = true);
  });
