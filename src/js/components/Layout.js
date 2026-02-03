export function Layout() {
  const root = document.createElement('div');
  root.id = 'root';

  const header = document.createElement('header');
  header.innerHTML = `
    <h1>Movie Discovery Platform</h1>
  `;

  const main = document.createElement('main');
  main.id = 'main';

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>&copy; 2026 Movie Discovery Platform</p>
  `;

  root.append(header, main, footer);
  return root;
}