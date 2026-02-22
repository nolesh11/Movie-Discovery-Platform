export function MobileNav() {
  const mobileNav = document.createElement('nav');
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="#/home" class='nav-link'>Home</a>
    <a href="#/movies&shows" class='nav-link'>Movies & Shows</a>
    <a href="#/support" class='nav-link'>Support</a>
    <a href="#/subscription" class='nav-link'>Subscription</a>
  `
  return mobileNav;
}