/**
 * Nexus Card Block - Frontend JavaScript
 *
 * Script para las animaciones y funcionalidades en el frontend.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Función para detectar cuándo un elemento está visible en la ventana
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }

  // Elementos con animaciones al hacer scroll
  const animatedCards = document.querySelectorAll(
    '.wp-block-nexus-card[class*="anim-"]'
  );

  // Inicializar observador de intersección si está disponible en el navegador
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-animated');
          // Dejar de observar el elemento una vez que se ha animado
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedCards.forEach((card) => {
      observer.observe(card);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    function handleScrollAnimation() {
      animatedCards.forEach((card) => {
        if (
          isElementInViewport(card) &&
          !card.classList.contains('is-animated')
        ) {
          card.classList.add('is-animated');
        }
      });
    }

    // Ejecutar una vez al cargar
    handleScrollAnimation();

    // Y luego en cada scroll
    window.addEventListener('scroll', handleScrollAnimation);
  }

  // Comprobación de soporte para animaciones basadas en scroll
  const scrollAnimCards = document.querySelectorAll(
    '.wp-block-nexus-card[class*="scroll-anim"]'
  );

  // Si no hay soporte para CSS @scroll-timeline, añadimos clases fallback
  if (
    !CSS.supports('animation-timeline: scroll()') &&
    scrollAnimCards.length > 0
  ) {
    if ('IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-animated');
              scrollObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      scrollAnimCards.forEach((card) => {
        scrollObserver.observe(card);
      });
    } else {
      // Fallback adicional
      function handleScrollTimelineAnimation() {
        scrollAnimCards.forEach((card) => {
          if (
            isElementInViewport(card) &&
            !card.classList.contains('is-animated')
          ) {
            card.classList.add('is-animated');
          }
        });
      }

      handleScrollTimelineAnimation();
      window.addEventListener('scroll', handleScrollTimelineAnimation);
    }
  }

  // Agregar efectos interactivos a las tarjetas con hover
  const hoverCards = document.querySelectorAll(
    '.wp-block-nexus-card[class*="hover-"]'
  );

  hoverCards.forEach((card) => {
    // Si la tarjeta tiene efecto shine, añadimos el listener para reiniciar animación
    if (card.classList.contains('hover-shine')) {
      card.addEventListener('mouseleave', function () {
        setTimeout(() => {
          card.classList.remove('hover-shine-active');
          void card.offsetWidth; // Forzar reflow
          card.classList.add('hover-shine-active');
        }, 100);
      });
    }
  });
});
