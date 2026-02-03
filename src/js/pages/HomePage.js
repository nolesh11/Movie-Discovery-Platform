export function HomePage() {
  const container = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'Welcome to the Movie Discovery Platform';
  container.append(title);
  return container;
}