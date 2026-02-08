export function MobileNav() {
  const mobileNav = document.createElement('nav');
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="#/home" class='nav-link'>Home</a>
    <a href="#/search" class='nav-link'>Search</a>
    <a href="#/favorites" class='nav-link'>Favorites</a>
    <a href="#/details" class='nav-link'>Details</a>
  `
  return mobileNav;
}