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
      <a href="#/search" class='nav-link'>Search</a>
      <a href="#/favorites" class='nav-link'>Favorites</a>
      <a href="#/details" class='nav-link'>Details</a>
    </nav>

    <div class='header-btn isActive'>
      <button class='search-btn'>
        <img src='./assets/icons/SearchIcon.svg' alt='Search button' />
      </button>
      <button class='notification-btn'>
        <img src='./assets/icons/notificationIcon.svg' alt='Notification button' />
      </button>
    </div>
  `;



  return header;
}