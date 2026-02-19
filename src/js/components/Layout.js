import { Header } from './Header.js';
import { MobileNav } from './MobileNav.js';
import { Footer } from './footer.js';

export function Layout() {
  const root = document.createElement('div');
  root.id = 'root';

  const main = document.createElement('main');
  main.id = 'main';

  root.append(Header(), main, Footer(), MobileNav());
  return root;
}