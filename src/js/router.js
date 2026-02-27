import { HomePage } from "./pages/HomePage.js";
import { MoviesShowsPage } from "./pages/MoviesShowsPage.js";
import { SupportPage } from "./pages/SupportPage.js";
import { SubscriptionsPage } from "./pages/SubscriptionsPage.js";

const routes = {
  "#/home": HomePage,
  "#/movies&shows": MoviesShowsPage,
  "#/support": SupportPage,
  "#/subscription": SubscriptionsPage,
};

async function renderRouter() {
  const main = document.getElementById("main");
  const hash = window.location.hash || "#/home";

  main.innerHTML = "";

  const renderPage = routes[hash];

  main.append(await renderPage());
}

function updateActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  const hash = window.location.hash || "#/home";

  links.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("active-page");
    } else {
      link.classList.remove("active-page");
    }
  });
}

export function initRouter() {
  window.addEventListener("hashchange", renderRouter);
  window.addEventListener("load", renderRouter);
  window.addEventListener("hashchange", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
  updateActiveLink();
}
