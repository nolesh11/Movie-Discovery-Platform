import { getPopularMovies, tmdbAPI, getMoviespages } from "../api/api.js";

export async function MoviesShowsPage() {
  const popularMovies = await getPopularMovies(10);
  const moviesData = popularMovies.results;
  const genres = await tmdbAPI.getGenreMovies();
  const genresData = genres.genres;
  const moviesPages = await getMoviespages(5);

  const moviesShows = document.createElement("div");
  moviesShows.id = "movies-shows-section";
  moviesShows.innerHTML = ``;

  const popularmovie = document.createElement("section");
  popularmovie.className = "popular-movie";

  let startIndexMovie = 0;
  const pageSizeMovies = 1;

  function renderPopularMovie(movie) {
    const movieFilter = movie.slice(
      startIndexMovie,
      startIndexMovie + pageSizeMovies,
    );

    popularmovie.innerHTML = movieFilter.map(
      (m) => `
        <div class='popular-movie-container' style="background-image: url('https://image.tmdb.org/t/p/original${m.backdrop_path}')">
          <div class='popular-movie-heading'>
            <h2>${m.title}</h2>
            <p>With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.</p>
          </div>
          <div class='popular-movie-btn'>
            <button>
              <img src='./assets/icons/HeroIcon.svg' alt='Play button' />
              Play Now
            </button>
            <div class='popular-movie-img-btn'>
              <div><img src='./assets/icons/popularPlus.svg' alt='Add icon' /></div>
              <div><img src='./assets/icons/popularLike.svg' alt='Like icon' /></div>
              <div><img src='./assets/icons/popularSound.svg' alt='Sound icon' /></div>
            </div>
          </div>
          <div class='popular-movie-carusel'>
            <button class='popular-prev'><img src='./assets/icons/prevArrow.svg' alt='Previous button' /></button>
            <button class='popular-next'><img src='./assets/icons/nextArrow.svg' alt='Next button' /></button>
          </div>
        </div>
      `,
    );
    const prevBtn = popularmovie.querySelector(".popular-prev");
    const nextBtn = popularmovie.querySelector(".popular-next");

    prevBtn.addEventListener("click", () => {
      startIndexMovie = Math.max(0, startIndexMovie - pageSizeMovies);
      renderPopularMovie(moviesData);
    });

    nextBtn.addEventListener("click", () => {
      const maxStart = Math.max(0, moviesData.length - pageSizeMovies);
      startIndexMovie = Math.min(maxStart, startIndexMovie + pageSizeMovies);
      renderPopularMovie(moviesData);
    });
  }

  renderPopularMovie(moviesData);
  moviesShows.append(popularmovie);

  const moviesSection = document.createElement("section");
  moviesSection.className = "movies-section";
  moviesSection.innerHTML = `
    <div class='movies-section-switcher'>
      <button class='movies-btn active-genre-btn'>Movies</button>
      <button class='shows-btn'>Shows</button>
    </div>
    <div class='genres-list'>
      <div class='genre-heading'>
        <h2>Our Genres</h2>
        <div class='genre-list-btn'>
          <button class='genre-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='genre-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='genre-list-card'></div>
    </div>
  `;

  function renderGenrePosters(cont, movies, limit) {
    cont.innerHTML = "";

    const posters = movies.filter((m) => m.poster_path).slice(0, limit);

    posters.forEach((movies) => {
      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/original${movies.poster_path}`;
      img.alt = "Poster";
      cont.append(img);
    });
  }

  function innerGenres() {
    const genresContainer = moviesSection.querySelector(".genre-list-card");
    let genreStartIndex = 0;
    const genrePageSize = 5;
    const genreStep = 5;

    function renderGenres() {
      genresContainer.innerHTML = genresData
        .slice(genreStartIndex, genreStartIndex + genrePageSize)
        .map(
          (g) => `
        <a href='#/home'>
          <div class='genre-list-img' data-genre-id='${g.id}'></div>
          <div class='genre-title'>
            <span>${g.name}</span> 
            <img src='./assets/icons/arrowRight.svg' />
          </div>
        </a>
      `,
        )
        .join("");
    }

    function hydratePosters() {
      const posterContainer = moviesSection.querySelectorAll(".genre-list-img");
      posterContainer.forEach((cont) => {
        const genreId = Number(cont.dataset.genreId);
        const moviesForgenre = moviesPages.filter(
          (m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(genreId),
        );

        renderGenrePosters(cont, moviesForgenre, 4);
      });
    }

    function render() {
      renderGenres();
      hydratePosters();
    }

    const genrePrevBtn = moviesSection.querySelector(".genre-prev");
    const genreNextBtn = moviesSection.querySelector(".genre-next");

    genrePrevBtn.addEventListener("click", () => {
      genreStartIndex = Math.max(0, genreStartIndex - genreStep);
      render();
    });

    genreNextBtn.addEventListener("click", () => {
      const maxStart = Math.max(0, genresData.length - genrePageSize);
      genreStartIndex = Math.min(maxStart, genreStartIndex + genreStep);
      render();
    });

    render();

    return genresContainer;
  }

  innerGenres();
  moviesShows.append(moviesSection);

  return moviesShows;
}
