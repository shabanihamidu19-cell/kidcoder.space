/* kidcoder.space — Interactions */

document.addEventListener('DOMContentLoaded', () => {
  // Professional hero image series (crossfade)
  const heroPhotos = document.querySelectorAll('.hero-series .hero-photo');
  if (heroPhotos.length > 1) {
    let current = 0;
    setInterval(() => {
      heroPhotos[current].classList.remove('active');
      current = (current + 1) % heroPhotos.length;
      heroPhotos[current].classList.add('active');
    }, 4500); // every 4.5s
  }

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const nav = document.querySelector('.nav');

  menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Nav border on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Gallery filter
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.gallery-item');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const cats = item.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  function openLightbox(index) {
    const item = galleryItems[index];
    if (!item) return;
    currentIndex = index;

    const img = item.querySelector('img');
    const title = item.dataset.title || '';
    const meta = item.dataset.meta || '';

    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.style.display = 'block';
    } else {
      // placeholder
      lightboxImg.style.display = 'none';
    }

    lightboxTitle.textContent = title;
    lightboxMeta.textContent = meta;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  });

  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  // Copy email
  const copyBtn = document.getElementById('copyEmail');
  const feedback = document.getElementById('emailFeedback');
  const EMAIL = 'shabanihamidu19@gmail.com';

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      feedback.textContent = 'Email copied ✓';
      setTimeout(() => { feedback.textContent = ''; }, 2500);
    } catch {
      feedback.textContent = EMAIL;
    }
  });

  // Animate skill bars when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fill').forEach(fill => {
          fill.style.width = fill.style.width; // trigger reflow already set
        });
      }
    });
  }, { threshold: 0.3 });

  const stackSection = document.getElementById('stack');
  if (stackSection) observer.observe(stackSection);
});
