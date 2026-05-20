'use strict'

// CARREGA MENU
async function loadMenu() {
  const response = await fetch('./components/menu.html');
  const data = await response.text();
  document.getElementById('menu-container').innerHTML = data;

  // AGORA O HTML EXISTE
  startMenu();
}

loadMenu();

//CARREGA FOOTER

async function loadComponent(elementId, file) {
  const response = await fetch(file);
  const html = await response.text();

  document.getElementById(elementId).innerHTML = html;
}

loadComponent('footer-container', './components/footer.html');


