import {
  getPopularMovies,
  tmdbAPI,
  getMoviespages,
  getTopRatedMoviesPages,
  getTrandingMoviesOfDayPages,
  getMovieById,
  getUpcomingMovies,
  getTopRatedMoviesPage,
  getGenresShows,
  getShowsPages,
  getPopularShowssPages,
  getTrandingShows,
  getShowById,
  getupcomingShows,
} from "../api/api.js";
import { pagination } from "../components/Pagination.js";
import { formatDate } from "../components/FormatDate.js";
import { hydrateRuntime } from "../components/HydrateRuntime.js";
import { hydratePosters } from "../components/HydratePosters.js";
import { hydrateSeasons } from "../components/HydrateSeasons.js";
import { hydrateEpisodeRuntime } from "../components/HydrateEpisodRuntime.js";
import { getCastPaginationConfig } from "../components/PaginationConfig.js";

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
  const mustWatchMovies = await getTopRatedMoviesPage(5);
  const mustWatchMoviesData = mustWatchMovies.results;
  const showsGenres = await getGenresShows();
  const showsGenresData = showsGenres.genres;
  const showsPages = await getShowsPages(5);
  const showsPopularPages = await getPopularShowssPages(5);
  const showsTarandingPage = await getTrandingShows(20);
  const showsTarandingPageData = showsTarandingPage.results;
  const showsUpcomingPage = await getupcomingShows(2);
  const showsUpcomingPageData = showsUpcomingPage.results;
  const showsMustWatch = await getTrandingShows(15);
  const showsshowsMustWatchPageData = showsMustWatch.results;

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
            <p>${m.overview}</p>
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

  const switcherContainer = document.createElement("section");
  switcherContainer.innerHTML = `
    <div class='movies-section-switcher'>
      <button class='switcher-btn is-active active-genre-btn'>Movies</button>
      <button class='switcher-btn shows'>Shows</button>
    </div>
  `;

  moviesShows.append(switcherContainer);

  const moviesSection = document.createElement("section");
  moviesSection.className = "movies-section";
  moviesSection.innerHTML = `
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
    <div class='must-watch-list'>
      <div class='genre-heading'>
        <h2>Must - Watch Movies</h2>
        <div class='genre-list-btn'>
          <button class='must-watch-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='must-watch-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='must-watch-list-card'></div>
    </div>
  `;

  const showsSection = document.createElement("section");
  showsSection.className = "shows-section closed-section";
  showsSection.innerHTML = `
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
        <h2>Trending Shows Now</h2>
        <div class='genre-list-btn'>
          <button class='tranding-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='tranding-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='tranding-shows-list-card'></div>
    </div>
    <div class='upcoming-list'>
      <div class='genre-heading'>
        <h2>New Released Shows</h2>
        <div class='genre-list-btn'>
          <button class='upcoming-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='upcoming-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='upcoming-shows-list-card'></div>
    </div>
    <div class='must-watch-list'>
      <div class='genre-heading'>
        <h2>Must - Watch Shows</h2>
        <div class='genre-list-btn'>
          <button class='must-watch-prev'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='must-watch-next'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>
      <div class='must-watch-list-card'></div>
    </div>
  `;

  const buttons = moviesShows.querySelectorAll(".switcher-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      buttons.forEach((b) => b.classList.remove("active-genre-btn"));
      btn.classList.add("active-genre-btn");

      const showsBtn = e.target.closest(".shows");

      const movies = moviesShows.querySelector(".movies-section");
      const shows = moviesShows.querySelector(".shows-section");

      if (showsBtn) {
        movies.classList.add("closed-section");
        shows.classList.remove("closed-section");
      } else {
        movies.classList.remove("closed-section");
        shows.classList.add("closed-section");
      }
    });
  });

  function innerGenres() {
    const genresContainer = moviesSection.querySelector(".genre-list-card");
    const prevBtn = moviesSection.querySelector(".genre-prev");
    const nextBtn = moviesSection.querySelector(".genre-next");
    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 5, 5)

    function renderGenres(visible) {
      genresContainer.innerHTML = visible
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

    function render() {
      const visible = genresData.slice(startIndex, startIndex + pageSize);
      renderGenres(visible);
      hydratePosters(genresContainer, moviesPages, {
        targetClass: "genre-list-img",
      });
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
    let {pageSize, step} = getCastPaginationConfig(2, 2, 4, 4)

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

    function render() {
      renderRatedMovies();
      hydratePosters(ratedMoviesContainer, topRatedPages, {
        targetClass: "rated-list-img",
      });
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

  async function innerTrandingMovies() {
    const trandingContainer = moviesSection.querySelector(
      ".tranding-list-card",
    );
    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 5, 5)

    const prevBtn = moviesSection.querySelector(".tranding-prev");
    const nextBtn = moviesSection.querySelector(".tranding-next");

    function renderTranding(visible) {
      trandingContainer.innerHTML = visible
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
    }

    async function render() {
      const visible = trandingMovies.slice(startIndex, startIndex + step);
      renderTranding(visible);

      const details = await Promise.all(visible.map((m) => getMovieById(m.id)));
      hydrateRuntime(details, trandingContainer, {
        targetClass: "movie-duration",
        dataAttr: "movie-id",
      });
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
        render();
      },
    });

    render();

    return trandingContainer;
  }

  function innerNewReleases() {
    const newReleasesContainer = moviesSection.querySelector(
      ".upcoming-list-card",
    );
    const prevBtn = moviesSection.querySelector(".upcoming-prev");
    const nextBtn = moviesSection.querySelector(".upcoming-next");
    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 5, 5)

    function renderUpcoming(visiable) {
      newReleasesContainer.innerHTML = visiable
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

    function render() {
      const visiable = upcomingMoviesData.slice(startIndex, startIndex + step);
      renderUpcoming(visiable);
      formatDate(visiable, newReleasesContainer, {
        targetClass: "upcoming-date",
        dataAttr: "date-id",
      });
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

  async function innerMustWatchMovies() {
    const movieContainer = moviesSection.querySelector(".must-watch-list-card");
    const prevBtn = moviesSection.querySelector(".must-watch-prev");
    const nextBtn = moviesSection.querySelector(".must-watch-next");

    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 4, 4)


    function rendermustWatchMovies(visible) {
      function fillRatingStars(rating) {
        const stars = Math.round(rating) / 2;
        return (stars * 100) / 5;
      }
      movieContainer.innerHTML = visible
        .map((m) => {
          const answer = fillRatingStars(m.vote_average);

          return `
            <a href='#/movie/${m.id}'>
              <div class='must-watch-poster'>
                <img src='https://image.tmdb.org/t/p/original${m.poster_path}' />
              </div>
              <div class='must-watch-title'>
                <div class='movie-runtime'>
                  <img src='./assets/icons/clockIcon.svg' />
                  <span class='must-watch-date' data-must-id="${m.id}">-</span>
                </div>
                <div class='movie-rating'>
                  <div class='stars-rating' style="--fill: ${answer}%"></div>
                  <span>${Math.round((m.vote_average / 2) * 10) / 10}</span>
                </div>
              </div>
            </a>
          `;
        })
        .join("");
    }

    async function render() {
      const visible = mustWatchMoviesData.slice(startIndex, startIndex + step);
      rendermustWatchMovies(visible);
      const details = await Promise.all(visible.map((m) => getMovieById(m.id)));

      hydrateRuntime(details, movieContainer, {
        targetClass: "must-watch-date",
        dataAttr: "must-id",
      });
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      getTotal: () => mustWatchMoviesData.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
    });

    render();
    return movieContainer;
  }

  function innerShowsGenres() {
    const genresShowsContainer = showsSection.querySelector(".genre-list-card");
    const prevBtn = showsSection.querySelector(".genre-prev");
    const nextBtn = showsSection.querySelector(".genre-next");
    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 5, 5)

    function renderGenresShows(visiable) {
      genresShowsContainer.innerHTML = visiable
        .map(
          (s) => `
            <a href='#/home'>
              <div class='genre-list-img' data-genre-id='${s.id}'></div>
              <div class='genre-title'>
                <span>${s.name}</span> 
                <img src='./assets/icons/arrowRight.svg' />
              </div>
            </a>
          `,
        )
        .join("");
    }

    function render() {
      const visiable = showsGenresData.slice(startIndex, startIndex + step);
      renderGenresShows(visiable);

      hydratePosters(genresShowsContainer, showsPages, {
        targetClass: "genre-list-img",
      });
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
      getTotal: () => showsPages.length,
      getStart: () => startIndex,
    });

    render();

    return genresShowsContainer;
  }

  function innerPopularShows() {
    const popularShowsContainer =
      showsSection.querySelector(".rated-list-card");
    const prevBtn = showsSection.querySelector(".rated-prev");
    const nextBtn = showsSection.querySelector(".rated-next");

    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 4, 4)

    function renderPopularShows(visiable) {
      popularShowsContainer.innerHTML = visiable
        .map(
          (s) => `
            <a href='#/home'>
              <div class='rated-list-img' data-genre-id='${s.id}'></div>
              <div class='rated-title'>
                <div class='rated-title-cont'>
                  <span>Top 10 In</span>
                  <span>${s.name}</span> 
                </div>
                <img src='./assets/icons/arrowRight.svg' />
              </div>
            </a>
          `,
        )
        .join("");
    }

    function render() {
      const visiable = showsGenresData.slice(startIndex, startIndex + step);

      renderPopularShows(visiable);
      hydratePosters(popularShowsContainer, showsPopularPages, {
        targetClass: "rated-list-img",
      });
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
      getTotal: () => showsPopularPages.length,
      getStart: () => startIndex,
    });

    render();
  }

  async function innerTrandingShows() {
    const trandingShowsContainer = showsSection.querySelector(
      ".tranding-shows-list-card",
    );
    const prevBtn = showsSection.querySelector(".tranding-prev");
    const nextBtn = showsSection.querySelector(".tranding-next");

    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 4, 4)

    function renderTrandingShows(visiable) {
      trandingShowsContainer.innerHTML = visiable
        .map(
          (s) => `
            <a href='#/tv/${s.id}'>
              <div class='tranding-poster'>
                <img src='https://image.tmdb.org/t/p/original${s.poster_path}' />
              </div>
              <div class='tranding-header'>
                <div>
                  <img src='./assets/icons/clockIcon.svg' />
                  <span class='show-duration' data-show-id="${s.id}">-</span>
                </div>  
                <div>
                  <img src='./assets/icons/seasonIcon.svg' />
                  <span class='seasons' data-show-id="${s.id}">-</span>
                </div>
              </div>
            </a>
          `,
        )
        .join("");
    }

    async function render() {
      const visiable = showsTarandingPageData.slice(
        startIndex,
        startIndex + step,
      );
      renderTrandingShows(visiable);

      const details = await Promise.all(visiable.map((m) => getShowById(m.id)));

      hydrateEpisodeRuntime(details, trandingShowsContainer, {
        targetClass: "show-duration",
        dataAttr: "show-id",
      });

      hydrateSeasons(details, trandingShowsContainer, {
        targetClass: "seasons",
        dataAttr: "show-id",
      });
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      getTotal: () => showsTarandingPageData.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
    });

    render();
  }

  async function innerUpcomingShows() {
    const upcomingContainer = showsSection.querySelector(".upcoming-shows-list-card");
    const prevBtn = showsSection.querySelector(".upcoming-prev");
    const nextBtn = showsSection.querySelector(".upcoming-next");

    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 4, 4)

    function renderUpcomingShows(visiable) {
      upcomingContainer.innerHTML = visiable
        .map(
          (s) => `
            <a href='#/tv/${s.id}'>
              <div class='tranding-poster'>
                <img src='https://image.tmdb.org/t/p/original${s.poster_path}' />
              </div>
              <div class='tranding-header'>
                <div>
                  <img src='./assets/icons/clockIcon.svg' />
                  <span class='show-duration' data-show-id="${s.id}">-</span>
                </div>  
                <div>
                  <img src='./assets/icons/seasonIcon.svg' />
                  <span class='seasons' data-show-id="${s.id}">-</span>
                </div>
              </div>
            </a>
          `,
        )
        .join("");
    }

    async function render() {
      const visiable = showsUpcomingPageData.slice(
        startIndex,
        startIndex + step,
      );
      renderUpcomingShows(visiable);

      const details = await Promise.all(visiable.map((m) => getShowById(m.id)));

      hydrateEpisodeRuntime(details, upcomingContainer, {
        targetClass: "show-duration",
        dataAttr: "show-id",
      });

      hydrateSeasons(details, upcomingContainer, {
        targetClass: "seasons",
        dataAttr: "show-id",
      });
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      getTotal: () => showsUpcomingPageData.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
    });

    render();

    return upcomingContainer;
  }

  async function innerMustWatchShows() {
    const showsMustWatch = showsSection.querySelector(".must-watch-list-card");
    const prevBtn = showsSection.querySelector(".must-watch-prev");
    const nextBtn = showsSection.querySelector(".must-watch-next");

    let startIndex = 0;
    let {pageSize, step} = getCastPaginationConfig(2, 2, 4, 4)

    function renderMustWatchShows(visiable) {
      function fillRatingStars(rating) {
        const stars = Math.round(rating) / 2;
        return (stars * 100) / 5;
      }
      showsMustWatch.innerHTML = visiable
        .map((s) => {
          const answer = fillRatingStars(s.vote_average);

          return `
            <a href='#/tv/${s.id}'>
              <div class='must-watch-poster'>
                <img src='https://image.tmdb.org/t/p/original${s.poster_path}' />
              </div>
              <div class='must-watch-title'>
                <div class='movie-runtime'>
                  <img src='./assets/icons/clockIcon.svg' />
                  <span class='must-watch-date' data-must-id="${s.id}">-</span>
                </div>
                <div class='movie-rating'>
                  <div class='stars-rating' style="--fill: ${answer}%"></div>
                  <span>${Math.round((s.vote_average / 2) * 10) / 10}</span>
                </div>
              </div>
            </a>
          `;
        })
        .join("");
    }

    

    async function render() {
      const visiable = showsshowsMustWatchPageData.slice(
        startIndex,
        startIndex + step,
      );
      renderMustWatchShows(visiable);

      const details = await Promise.all(visiable.map((m) => getShowById(m.id)));

      hydrateEpisodeRuntime(details, showsMustWatch, {
        targetClass: "must-watch-date",
        dataAttr: "must-id",
      });
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      getTotal: () => showsshowsMustWatchPageData.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
    });

    render();

    const a = showsMustWatch.getElementsByTagName('a');
    console.log(a);

    return showsMustWatch;
  }

  innerGenres();
  innerTopRatedMovies();
  innerTrandingMovies();
  innerNewReleases();
  innerMustWatchMovies();
  innerShowsGenres();
  innerPopularShows();
  innerTrandingShows();
  innerUpcomingShows();
  innerMustWatchShows();

  moviesShows.append(moviesSection);
  moviesShows.append(showsSection);

  return moviesShows;
}
