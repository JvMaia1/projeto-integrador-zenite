// =============================================
// FAQ ACCORDION
// =============================================
const faqCards = document.querySelectorAll('.faq .card');

faqCards.forEach((card) => {
  const h3 = card.querySelector('h3');
  const p = card.querySelector('p');
  
  if (!h3 || !p) return;


  // Torna acessível via teclado
  h3.setAttribute('tabindex', '0');
  h3.setAttribute('role', 'button');
  h3.setAttribute('aria-expanded', 'false');
  p.style.display = 'none';
  h3.classList.add('faq-toggle');

  const toggle = () => {
    const isOpen = p.style.display !== 'none';
    p.style.display = isOpen ? 'none' : 'block';
    h3.setAttribute('aria-expanded', String(!isOpen));
    card.classList.toggle('faq-aberto', !isOpen);
  };

  h3.addEventListener('click', toggle);
  h3.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // e.preventDefault();
      toggle();
    }
  });
});
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  // lógica futura do back-end aqui
});
