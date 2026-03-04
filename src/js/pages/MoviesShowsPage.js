import {
  getPopularMovies,
  tmdbAPI,
  getMoviespages,
  getTopRatedMoviesPages,
  getTrandingMoviesOfDayPages,
  getMovieById,
  getUpcomingMovies,
} from "../api/api.js";

import { pagination } from "../components/Pagination.js";

export async function MoviesShowsPage() {
  const popularMovies = await getPopularMovies(2);
  const moviesData = popularMovies.results;
  const genres = await tmdbAPI.getGenreMovies();
  const genresData = genres.genres;
  const moviesPages = await getMoviespages(44);
  const topRatedPages = await getTopRatedMoviesPages(24);
  const trandingMovies = await getTrandingMoviesOfDayPages(5);
  const upcomingMovies = await getUpcomingMovies();
  const upcomingMoviesData = upcomingMovies.results;

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

    popularmovie.innerHTML = movieFilter
      .map(
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
      )
      .join("");
  }

  popularmovie.addEventListener("click", (e) => {
    if (e.target.closest(".popular-prev")) {
      startIndexMovie = Math.max(0, startIndexMovie - pageSizeMovies);
      renderPopularMovie(moviesData);
    }

    if (e.target.closest(".popular-next")) {
      const maxStart = Math.max(0, moviesData.length - pageSizeMovies);
      startIndexMovie = Math.min(maxStart, startIndexMovie + pageSizeMovies);
      renderPopularMovie(moviesData);
    }
  });

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
    <div class='genres-list'>
      <div class='genre-heading'>
        <h2>Popular Top 10 In Genres</h2>
        <div class='genre-list-btn'>
          <button class='rated-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='rated-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='rated-list-card'></div>
    </div>
    <div class='tranding-list'>
      <div class='genre-heading'>
        <h2>Trending Now</h2>
        <div class='genre-list-btn'>
          <button class='tranding-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='tranding-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='tranding-list-card'></div>
    </div>
    <div class='upcoming-list'>
      <div class='genre-heading'>
        <h2>New Releases</h2>
        <div class='genre-list-btn'>
          <button class='upcoming-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='upcoming-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='upcoming-list-card'></div>
    </div>
  `;

  function renderPosters(cont, movies, limit) {
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
    const prevBtn = moviesSection.querySelector(".genre-prev");
    const nextBtn = moviesSection.querySelector(".genre-next");
    let startIndex = 0;
    const pageSize = 5;
    const step = 5;

    function renderGenres() {
      genresContainer.innerHTML = genresData
        .slice(startIndex, startIndex + pageSize)
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
        renderPosters(cont, moviesForgenre, 4);
      });
    }

    function render() {
      renderGenres();
      hydratePosters();
    }

    pagination({
      prevBtn,
      nextBtn,
      startIndex,
      pageSize,
      step,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
      getTotal: () => genresData.length,
      getStart: () => startIndex,
    });

    render();

    return genresContainer;
  }

  function innerTopRatedMovies() {
    const ratedMoviesContainer =
      moviesSection.querySelector(".rated-list-card");
    const prevBtn = moviesSection.querySelector(".rated-prev");
    const nextBtn = moviesSection.querySelector(".rated-next");
    let startIndex = 0;
    const pageSize = 4;
    const step = 4;

    function renderRatedMovies() {
      ratedMoviesContainer.innerHTML = genresData
        .slice(startIndex, startIndex + pageSize)
        .map(
          (r) => `
          <a href='#/home'>
            <div class='rated-list-img' data-genre-id='${r.id}'></div>
            <div class='rated-title'>
              <div class='rated-title-cont'>
                <span>Top 10 In</span>
                <span>${r.name}</span> 
              </div>
              <img src='./assets/icons/arrowRight.svg' />
            </div>
          </a>
        `,
        )
        .join("");
    }

    function hydratePosters() {
      const container = moviesSection.querySelectorAll(".rated-list-img");
      container.forEach((cont) => {
        const genreId = Number(cont.dataset.genreId);
        const topRated = topRatedPages.filter(
          (m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(genreId),
        );

        renderPosters(cont, topRated, 4);
      });
    }

    function render() {
      renderRatedMovies();
      hydratePosters();
    }

    pagination({
      prevBtn,
      nextBtn,
      startIndex,
      pageSize,
      step,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
      getTotal: () => genresData.length,
      getStart: () => startIndex,
    });

    render();
    return ratedMoviesContainer;
  }

  let startIndex = 0;
  const pageSize = 5;
  const step = 5;
  const prevBtn = moviesSection.querySelector(".tranding-prev");
  const nextBtn = moviesSection.querySelector(".tranding-next");

  async function innerTrandingMovies() {
    const trandingContainer = moviesSection.querySelector(
      ".tranding-list-card",
    );

    const visible = trandingMovies.slice(startIndex, startIndex + step);
    const ids = visible.map((m) => m.id);
    const details = await Promise.all(ids.map((id) => getMovieById(id)));

    trandingContainer.innerHTML = trandingMovies
      .slice(startIndex, startIndex + step)
      .map(
        (m) => `
        <a href='#/movie/${m.id}'>
          <div class='tranding-poster'>
            <img src='https://image.tmdb.org/t/p/original${m.poster_path}' />
          </div>
          <div class='tranding-header'>
            <div>
              <img src='./assets/icons/clockIcon.svg' />
              <span class='movie-duration' data-movie-id="${m.id}">-</span>
            </div>  
            <div>
              <img src='./assets/icons/viewIcon.svg' />
              <span>${Math.ceil(m.popularity)}K</span>
            </div>
          </div>
        </a>
      `,
      )
      .join("");

    function formatRuntime(mins) {
      if (mins <= 0) return "-";
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      return hours ? `${hours}h ${minutes}mins` : `${mins}`;
    }

    function hydrateRuntime() {
      details.forEach((m) => {
        const container = trandingContainer.querySelector(
          `.movie-duration[data-movie-id="${m.id}"]`,
        );

        if (!container) return;

        container.textContent = formatRuntime(m.runtime);
      });
    }

    hydrateRuntime();

    return trandingContainer;
  }

  pagination({
    prevBtn,
    nextBtn,
    pageSize,
    step,
    getTotal: () => trandingMovies.length,
    getStart: () => startIndex,
    onChange: (newStart) => {
      startIndex = newStart;
      innerTrandingMovies();
    },
  });

  function innerNewReleases() {
    const newReleasesContainer = moviesSection.querySelector(
      ".upcoming-list-card",
    );
    const prevBtn = moviesSection.querySelector(".upcoming-prev");
    const nextBtn = moviesSection.querySelector(".upcoming-next");
    let startIndex = 0;
    const pageSize = 5;
    const step = 5;

    function renderUpcoming() {
      newReleasesContainer.innerHTML = upcomingMoviesData
        .slice(startIndex, startIndex + step)
        .map(
          (m) => `
            <a href='#/movie/${m.id}'>
              <div class='upcoming-poster'>
                <img src='https://image.tmdb.org/t/p/original${m.poster_path}' />
              </div>
              <div class='upcoming-title'>
                <span>Released at</span>
                <span class='upcoming-date' data-date-id="${m.id}">-</span>
              </div>
            </a>
        `,
        )
        .join("");
    }

    function hedrateDate() {
      upcomingMoviesData.forEach((d) => {
        const dateContainer = newReleasesContainer.querySelector(
          `.upcoming-date[data-date-id="${d.id}"]`,
        );
        const releaseDate = d.release_date;
        const date = new Date(releaseDate);

        const formatedDay = date.toLocaleDateString("en-US", {
          day: "numeric",
        });
        const formatedMonth = date.toLocaleDateString("en-US", {
          month: "short",
        });
        const formatedYear = date.toLocaleDateString("en-US", {
          year: "numeric",
        });

        if (!dateContainer) return;

        dateContainer.textContent = `\u00A0${formatedDay} ${formatedMonth} ${formatedYear}`;
      });
    }

    function render() {
      renderUpcoming();
      hedrateDate();
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      getTotal: () => upcomingMoviesData.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
    });

    render();
    return newReleasesContainer;
  }

  innerGenres();
  innerTopRatedMovies();
  innerTrandingMovies();
  innerNewReleases();

  moviesShows.append(moviesSection);

  return moviesShows;
}
