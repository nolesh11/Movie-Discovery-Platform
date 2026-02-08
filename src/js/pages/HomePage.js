import { tmdbAPI } from '../api/api.js';
import { BASE_URL } from '../api/api.js';

export function HomePage() {
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

  tmdbAPI.getGenreMovies().then(data => {
    const section = document.createElement('section');
    section.className = 'genre-section';
    section.innerHTML = `
      <h2>Explore our wide variety of categories</h2>
      <p>Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
      <div class='genre-list'>
        ${data.genres.slice(0, 5).map(elem => {
          return `
            <a href="#/search?genre=${elem.id}" class='genre-item'>
              <div class='genre-img-list' data-genre-id='${elem.id}'></div>
              <div class=genre-footer>
                <span>${elem.name}</span>
                <img src='./assets/icons/arrowRight.svg' />
              </div>
            </a>
          `
        }).join('')}
      </div>
    `
    container.append(section);

    tmdbAPI.getMovies().then(data => {
      const containers = document.querySelectorAll('.genre-img-list');

      containers.forEach(containerEl => {
        const genreId = Number(containerEl.dataset.genreId);

        const moviesForGenre = data.results.filter(movie =>
          Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreId)
        );

        renderPosters(containerEl, moviesForGenre, 4);
      });
    });

  });

  return container;
}