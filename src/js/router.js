import { HomePage } from './pages/HomePage.js';
import { SearchPage } from './pages/SearchPage.js';
import { FavoritesPage } from './pages/FavoritesPage.js';
import { DetailsPage } from './pages/DetailsPage.js';

const routes = {
  '#/home': HomePage,
  '#/search': SearchPage,
  '#/favorites': FavoritesPage,
  '#/details': DetailsPage,
}

function renderRouter() {
  const main = document.getElementById('main');
  const hash = window.location.hash || '#/home';

  main.innerHTML = '';

  const renderPage = routes[hash];

  main.append(renderPage());
}

function updateActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  const hash = window.location.hash || '#/home';
  
  links.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active-page');
    } else {
      link.classList.remove('active-page');
    } 
  });  
}


export function initRouter() {
  window.addEventListener('hashchange', renderRouter);
  window.addEventListener('load', renderRouter);
  window.addEventListener('hashchange', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
  renderRouter();
  updateActiveLink();
}