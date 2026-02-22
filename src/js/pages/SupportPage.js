export async function SupportPage() {
  const page = document.createElement('div');
  page.innerHTML = `
    <h1>Favorites Page</h1>
    <div class="favorites-list"></div>
  `;
  return page;
}