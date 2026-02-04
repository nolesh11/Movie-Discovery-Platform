export function DetailsPage() {
  const page = document.createElement('div');
  page.innerHTML = `
    <h1>Details Page</h1>
    <div class="movie-details"></div>
  `;
  return page;
}