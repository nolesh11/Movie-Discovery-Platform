import { getPopularMovies } from "../api/api.js";

export async function MoviesShowsPage() {
  const popularMovies = await getPopularMovies(21);
  const moviesData = popularMovies.results;
  console.log(moviesData);

  const moviesShows = document.createElement("div");
  moviesShows.id = "movies-shows-section";
  moviesShows.innerHTML = ``;

  const popularmovie = document.createElement("section");
  popularmovie.className = "popular-movie";

  let startIndex = 0;
  const pageSize = 1;

  function renderPopularMovie(movie) {
    const movieFilter = movie.slice(startIndex, startIndex + pageSize);

    popularmovie.innerHTML = movieFilter.map(
      (m) => `
        <div class='popular-movie-container' style="background-image: url('https://image.tmdb.org/t/p/original${m.backdrop_path}')">
          <div class=popular-movie-heading'>
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
            <button class='popular-prev'><img src='./assets/icons/prevArrow.svg' alt='Previous button' />
            <button class='popular-next'><img src='./assets/icons/nextArrow.svg' alt='Next button' />
        </div>
      `,
    );
    const prevBtn = popularmovie.querySelector(".popular-prev");
    const nextBtn = popularmovie.querySelector(".popular-next");

    prevBtn.addEventListener("click", () => {
      startIndex = Math.max(0, startIndex - pageSize);
      renderPopularMovie(moviesData);
    });

    nextBtn.addEventListener("click", () => {
      const maxStart = Math.max(0, moviesData.length - pageSize);
      startIndex = Math.min(maxStart, startIndex + pageSize);
      renderPopularMovie(moviesData);
    });
  }

  renderPopularMovie(moviesData);

  moviesShows.append(popularmovie);

  return moviesShows;
}
