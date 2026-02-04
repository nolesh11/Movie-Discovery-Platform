export function SearchPage() {
  const page = document.createElement('div');
  page.innerHTML = `
    <h1>Search Page</h1>
    <input type="text" placeholder="Search for movies..." />
    <div class="search-results"></div>
  `;
  return page;
}