import { getMoviespages } from "../api/api.js";

export async function Search(header) {
  const movies = await getMoviespages(5);
  const btn = header.querySelector('.search-btn');
  
  function searchPanel() {
    const existing = header.querySelector('.search-container')
    const input = header.querySelector('input')

    if(existing) {
      existing.remove();
      input?.classList.remove('open')
      return;
    } 

    input?.classList.add('open')

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    // searchContainer.innerHTML = ``;
    
    // const cont = searchContainer.querySelector('.search-results')
    
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      
      if(!query) {
        return cont.innerHTML = '';
      }

      const result = movies.filter(m => {
        const title = (m.title || '').toLowerCase();
        return title.includes(query)
      })

      render(result)
      
    });

    function render(movies) {
      searchContainer.innerHTML = movies
        .slice(0, 10)
        .map(m => `
          <div class='search-results'>
            <div class='result-img'>
              <img src='https://image.tmdb.org/t/p/w300${m.poster_path}' />
            </div>
            <div class='result-info'>
              <h3>${m.title}</h3>
              <p>Realse date: ${m.release_date}</p>
            </div>
          </div>
          `
        )
        .join('')
    }
    
    header.append(searchContainer)
  }

  btn.addEventListener('click', searchPanel)

}