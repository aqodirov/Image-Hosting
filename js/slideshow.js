document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.slideshow');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('img'));
  if (slides.length === 0) return;

  let index = slides.findIndex(s => s.classList.contains('active'));
  if (index === -1) index = 0;

  let intervalId = null;
  const INTERVAL = 3000;

  slides.forEach((s, i) => s.classList.toggle('active', i === index));

  function showSlide(newIndex) {
    if (newIndex === index) return;
    slides[index].classList.remove('active');
    slides[newIndex].classList.add('active');
    index = newIndex;
  }

  function next() {
    showSlide((index + 1) % slides.length);
  }

  function prev() {
    showSlide((index - 1 + slides.length) % slides.length);
  }

  function start() {
    if (intervalId) return;
    intervalId = setInterval(next, INTERVAL);
  }

  function stop() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  }

  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);
  container.addEventListener('touchstart', stop, {passive: true});
  container.addEventListener('touchend', start, {passive: true});

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = `
    <button class="slide-btn prev" aria-label="Предыдущий слайд">‹</button>
    <button class="slide-btn next" aria-label="Следующий слайд">›</button>
  `;
  container.appendChild(controls);

  controls.querySelector('.prev').addEventListener('click', () => {
    prev();
    stop();
    start();
  });

  controls.querySelector('.next').addEventListener('click', () => {
    next();
    stop();
    start();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prev();
      stop(); start();
    } else if (e.key === 'ArrowRight') {
      next();
      stop(); start();
    }
  });

  slides.forEach(img => {
    if (!img.complete) {
      const tmp = new Image();
      tmp.src = img.src;
    }
  });

  start();
});
