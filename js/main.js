/* ========================
          NAVBAR
=========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ========================
         CARRUSEL
=========================== */
const container = document.getElementById('carouselContainer');
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Clonar elementos para crear el efecto "infinito"
const cards = Array.from(track.children);
cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

nextBtn.addEventListener('click', () => {
// Evaluamos el ancho de la carta + el gap (1.5rem = 24px)
    const cardWidth = track.firstElementChild.offsetWidth + 24;
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });

// Reset rápido si llega al final de los clones
    if (container.scrollLeft >= (container.scrollWidth - container.clientWidth) - 10) {
        setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'instant' });
        }, 500);
    }
});

prevBtn.addEventListener('click', () => {
    const cardWidth = track.firstElementChild.offsetWidth + 24;

    if (container.scrollLeft <= 0) {
// Salto invisible al set de clones para poder ir hacia atrás suavemente
        container.scrollTo({ left: container.scrollWidth / 2, behavior: 'instant' });
        setTimeout(() => {
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }, 10);
    } else {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
});


/* ========================
         WRAPPLER
=========================== */
document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
        const currentItem = button.closest('.faq-item');
        const isOpen = currentItem.classList.contains('active');

        // Cierra las demás preguntas abiertas para mantener la vista limpia
        document.querySelectorAll('.faq-item.active').forEach((openItem) => {
            if (openItem !== currentItem) {
                openItem.classList.remove('active');
                const openBtn = openItem.querySelector('.faq-question');
                if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Alterna la pregunta seleccionada
        currentItem.classList.toggle('active', !isOpen);
        button.setAttribute('aria-expanded', String(!isOpen));
    });
});