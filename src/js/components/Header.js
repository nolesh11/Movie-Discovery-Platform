import { Search } from '../components/Search.js';

export function Header() {
  const header = document.createElement('header');
  header.innerHTML = `
    <div class='header-logo'>
      <a href="#/home">
        <img src='./assets/Logo/HeaderDesktopLogo.svg' alt="Logo" />
      </a>
    </div>

    <nav class='header-nav isActive'>
      <a href="#/home" class='nav-link active-page'>Home</a>
      <a href="#/movies&shows" class='nav-link'>Movies & Shows</a>
      <a href="#/support" class='nav-link'>Support</a>
      <a href="#/subscription" class='nav-link'>Subscription</a>
    </nav>

    <div class='header-btn'>
      <input type='text' placeholder='Title, name' value />
      <button class='search-btn'>
        <img src='./assets/icons/SearchIcon.svg' alt='Search button' />
      </button>
      <button class='notification-btn'>
        <img src='./assets/icons/notificationIcon.svg' alt='Notification button' />
      </button>
    </div>
  `;

  Search(header);

  return header;
}