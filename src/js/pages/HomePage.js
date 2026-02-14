import { tmdbAPI, getMoviespages } from '../api/api.js';

export async function HomePage() {
  const container = document.createElement('div');
  container.id = 'main-page';
  container.innerHTML = `
    <section class='hero'>
      <div class='hero-logo-container'>
        <img src='./assets/icons/heroLogo.svg' class='hero-logo' alt='Hero Logo' />
        <img src='./assets/icons/heroLogobtn.svg' alt='Hero Logo Button' class='hero-logo-btn' />
      </div>
      <h1>The Best Streaming Experience</h1>
      <p>StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
      <a href="#/search" class='hero-btn'>
        <img src='./assets/icons/HeroIcon.svg' alt='Play button' class='hero-btn-icon' />
        Start Watching
      </a>
     </section>
  `;

  const genresData = await tmdbAPI.getGenreMovies();
  const movies = await getMoviespages(40);

  const genreSection = createGenreSection(genresData.genres, movies);
  container.append(genreSection);

  function renderPosters(containerEl, movies, limit) {
    containerEl.innerHTML = '';

    const posters = movies 
      .filter(e => e.poster_path)
      .slice(0, limit);

    posters.forEach(movies => {
      const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
      img.alt = 'Poster image';
      containerEl.append(img);
    });
  };

  function createGenreSection(genres, movies) {
    const section = document.createElement('section');
    section.className = 'genre-section';
    section.innerHTML = `
      <div class='genre-header'>
        <div class='genre-info'>
          <h2>Explore our wide variety of categories</h2>
          <p>Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
        </div>
        <div class='genre-btns'>
          <button class='genre-prev genre-btn-bgc'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='genre-next genre-btn-bgc'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>

      <div class='genre-list'></div>
    `;
    
    const listEl = section.querySelector('.genre-list');
    const prevBtn = section.querySelector('.genre-prev');
    const nextBtn = section.querySelector('.genre-next');

    let startIndex = 0;
    const pageSize = 4;
    const step = 4;

    function renderGenres() {
      listEl.innerHTML = genres
        .slice(startIndex, startIndex + pageSize)
        .map(g => `
          <a href="#/search?genre=${g.id}" class='genre-item'>
            <div class='genre-img-list' data-genre-id='${g.id}'></div>
            <div class='genre-footer'>
              <span>${g.name}</span>
              <img src='./assets/icons/arrowRight.svg' />
            </div>
          </a>
        `)
        .join('');
    }
  

    function hydratePosters() {
      const containers = section.querySelectorAll('.genre-img-list');
      containers.forEach(containerEl => {
        const genreid = Number(containerEl.dataset.genreId);

        const moviesForGenres = movies.filter(m => 
          Array.isArray(m.genre_ids) && m.genre_ids.includes(genreid)
        )

        renderPosters(containerEl, moviesForGenres, 4);
      })
    }

    function render() {
      renderGenres();
      hydratePosters();

      const maxStart = Math.max(0, genres.length - pageSize);
      prevBtn.disabled = startIndex === 0;
      nextBtn.disabled = startIndex === maxStart;
    }

    prevBtn.addEventListener('click', () => {
      startIndex = Math.max(0, startIndex - step);
      render();
    });

    nextBtn.addEventListener('click', () => {
      const maxStart = Math.max(0, genres.length - pageSize);
      startIndex = Math.min(maxStart, startIndex + step);
      render();
    });

    render();

    return section;
  
  }
  return container;
}