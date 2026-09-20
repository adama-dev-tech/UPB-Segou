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

  // ============ WHATSAPP ============
  // Numéro de l'UPB au format international, sans « + » ni espaces (Mali = 223).
  // Pour le changer, modifie seulement cette ligne.
  const WHATSAPP_NUMBER = '22393316343';

  function waLink(message){
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  // Boutons « Écrire sur WhatsApp » (flottant + section contact)
  const hello = "Bonjour, je souhaite avoir des informations sur l'UPB Ségou.";
  ['wa-float', 'wa-contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waLink(hello);
  });

  // Formulaire d'admission : ouvre WhatsApp avec la candidature déjà écrite
  const form = document.getElementById('admission-form');
  const success = document.getElementById('form-success');

  const errorBox = document.createElement('p');
  errorBox.className = 'form-error hidden';
  errorBox.setAttribute('role', 'alert');
  form.appendChild(errorBox);

  function showError(text){
    errorBox.textContent = text;
    errorBox.classList.remove('hidden');
    success.classList.add('hidden');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorBox.classList.add('hidden');

    if (!form.checkValidity()){ form.reportValidity(); return; }

    const data = new FormData(form);
    const nom = String(data.get('nom')).trim();
    const prenom = String(data.get('prenom')).trim();
    const telephone = String(data.get('telephone')).trim();
    const niveau = data.get('niveau');
    const faculte = data.get('faculte');

    if (telephone.replace(/\D/g, '').length < 8){
      showError('Entrez un numéro de téléphone valide (8 chiffres minimum).');
      return;
    }

    const message =
      "Bonjour, je souhaite déposer ma candidature à l'UPB Ségou (2026-2027).\n\n" +
      'Nom : ' + nom + '\n' +
      'Prénom : ' + prenom + '\n' +
      'Téléphone : ' + telephone + '\n' +
      "Niveau d'étude visé : " + niveau + '\n' +
      'Faculté choisie : ' + faculte;

    const link = waLink(message);

    // Lien de secours affiché dans le message de succès
    const retry = document.getElementById('wa-retry');
    if (retry) retry.href = link;

    success.classList.remove('hidden');
    form.reset();

    // Ouverture directe de WhatsApp : la méthode la plus fiable sur téléphone
    window.location.href = link;
  });
