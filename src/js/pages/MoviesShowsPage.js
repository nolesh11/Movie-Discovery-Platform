export async function MoviesShowsPage() {
  const searchSection = document.createElement('section'); 
  searchSection.className = 'search';
  searchSection.innerHTML = `
    <div class=search-container'>
      <h2>Search film or TV show</h2>
    </div>
    
  `;
  return searchSection;
}