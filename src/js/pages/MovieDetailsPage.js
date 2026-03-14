import { getMovieById, getMovieCredits, getMovieReview } from "../api/api.js";
import { pagination } from "../components/Pagination.js";
import { getCastPaginationConfig } from "../components/PaginationConfig.js";
import { cutString } from "../components/CutString.js";

export async function MovieDetailsPage({ id }) {
  const [movieById, credits, review] = await Promise.all([
    getMovieById(id),
    getMovieCredits(id),
    getMovieReview(id),
  ]);

  const { title, overview, backdrop_path, release_date, vote_average } =
    movieById;

  const movieContainer = document.createElement("div");
  movieContainer.id = "movie-container";

  const movieDetails = document.createElement("section");
  movieDetails.className = "movie-details";
  movieDetails.innerHTML = `
    <div class='movie-container' style="background-image: url('https://image.tmdb.org/t/p/original${backdrop_path}')">
      <h2>${title}</h2>
      <p>${overview}</p>
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
    </div>
  `;

  function fillRatingStars(rating) {
    const stars = Math.round(rating) / 2;
    return (stars * 100) / 5;
  }

  const answer = fillRatingStars(vote_average);

  const movieInfo = document.createElement("section");
  movieInfo.className = "movie-info";
  movieInfo.innerHTML = `
    <div class='movie-description'>
      <p>Description</p>
      <p>${overview}</p>
    </div>
    <div class='movie-info-details'>
      <div class='movie-release'>
        <div class='movie-release-info'>
          <div>
            <img src='./assets/icons/releaseIcon.svg' />
          </div>
          <p>Released Year</p>
        </div>
        <h6 class='movie-release-date'>-</h6>
      </div>
      <div class='movie-languges'>
        <div class='movie-language-header'>
          <div>
            <img src='./assets/icons/languageIcon.svg' />
          </div>
          <p>Available Languages</p>
        </div>
        <div class='movie-languages-list'></div>
      </div>
      <div class='movie-ratings'>
        <div class='movie-language-header'>
          <div>
            <img src='./assets/icons/rating.svg' />
          </div>
          <p>Ratings</p>
        </div>
        <div class='movie-ratings-info'>
          <div class='movie-rating-tmdb'>
            <p>IMDB</p>
            <div class='movie-rating-info'>
              <div class='stars-rating' style="--fill: ${answer}%"></div>
              <span>${Math.round((vote_average / 2) * 10) / 10}</span>
            </div>
          </div>
          <div class='movie-rating-tmdb'>
            <p>TMDB</p>
            <div class='movie-rating-info'>
              <div class='stars-rating' style="--fill: ${answer}%"></div>
              <span>${Math.round((vote_average / 2) * 10) / 10}</span>
            </div>
          </div>
        </div>
      </div>
      <div class='movie-genres'>
        <div class='movie-language-header'>
          <div>
            <img src='./assets/icons/genresIcon.svg' />
          </div>
          <p>Genres</p>
        </div>
        <div class='movie-genres-list'></div>
      </div>
      <div class='movie-crew'>
        <div>
          <p>Director</p>
          <div class='movie-director-list'></div>
        </div>
        <div>
          <p>Music</p>
          <div class='movie-music-list'></div>
        </div>
      </div>
    </div> 
    <div class='movie-cast'>
      <div class='movie-cast-header'>
        <p>Cast</p>
        <div class='cast-header__btns'>
          <button class='prev'><img src='./assets/icons/rightArrowIcon.svg' /></button>
          <button class='next'><img src='./assets/icons/leftArrowIcon.svg' /></button>
        </div>
      </div>
      <div class='movie-cast-list'></div>
    </div>
    <div class='movie-review'>
      <div class='review-header'>
        <p>Reviews</p>
        <div class='add-review-btn'>
          <img src='./assets/icons/popularPlus.svg' />
          <button>Add Your Review</button>
        </div>
      </div>
      <div class='movie-review-info'></div>
      <div class='reviews-btns'>
        <button class='prev-review'><img src='./assets/icons/rightArrowIcon.svg' /></button>
        <button class='next-review'><img src='./assets/icons/leftArrowIcon.svg' /></button>
      </div>
    </div>
  `;

  function formatDate(releasedYear) {
    const container = movieInfo.querySelector(".movie-release-date");
    const date = new Date(releasedYear);

    if (!container) return;

    container.textContent = date.toLocaleDateString("en-US", {
      year: "numeric",
    });
  }

  const noAvatarImg = "./assets/icons/avatarIcon.svg";

  function filterProfileImg(path) {
    return path ? `https://image.tmdb.org/t/p/original${path}` : noAvatarImg;
  }

  function hydrateLanguages() {
    const container = movieInfo.querySelector(".movie-languages-list");
    const data = movieById.spoken_languages;

    container.innerHTML = data
      .map(
        (lang) => `
        <p>${lang.english_name}</p>
      `,
      )
      .join("");
  }

  function hydrateGenres() {
    const container = movieInfo.querySelector(".movie-genres-list");
    const data = movieById.genres;

    container.innerHTML = data
      .map(
        (g) => `
        <p>${g.name}</p>
      `,
      )
      .join("");
  }

  function hydrateCrew() {
    const containerDir = movieInfo.querySelector(".movie-director-list");
    const director = credits.crew.filter((j) => j.job === "Director");
    const containerMus = movieInfo.querySelector(".movie-music-list");
    const music = credits.crew
      .filter((j) => j.department === "Sound")
      .slice(0, 1);

    containerDir.innerHTML = director
      .map((j) => {
        const img = filterProfileImg(j.profile_path);
        return `
          <div class='director-profile-photo'>
            <img src='${img}' />
          </div>
          <div class='director-info'>
            <h6>${j.name}</h6>
            <p>From No Data</p>
          </div>
        `;
      })
      .join("");

    containerMus.innerHTML = music
      .map((m) => {
        const img = filterProfileImg(m.profile_path);
        return `
            <div class='music-profile-photo'>
              <img src='${img}' alt='Profile photo' />
            </div>
            <div class='music-info'>
              <h6>${m.name}</h6>
              <p>From No Data</p>
            </div>
            
          `;
      })
      .join("");
  }

  function renderMovieCast() {
    const container = movieInfo.querySelector(".movie-cast-list");
    const prevBtn = movieInfo.querySelector(".prev");
    const nextBtn = movieInfo.querySelector(".next");

    let startIndex = 0;
    let { pageSize, step } = getCastPaginationConfig(4, 4, 8, 8);

    const dataCast = credits.cast;

    function renderPeople() {
      const data = credits.cast.slice(startIndex, startIndex + step);
      container.innerHTML = data
        .map((c) => {
          const img = filterProfileImg(c.profile_path);
          return `
            <div class='cast-img'>
              <img src='${img}' />
            </div>
          `;
        })
        .join("");
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      root: movieInfo,
      targetClass: "cast-img",
      getTotal: () => dataCast.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        renderPeople();
      },
    });

    renderPeople();

    return container;
  }

  function renderUserReview() {
    const container = movieInfo.querySelector(".movie-review-info");
    const prevBtn = movieInfo.querySelector(".prev-review");
    const nextBtn = movieInfo.querySelector(".next-review");
    let startIndex = 0;
    let { pageSize, step } = getCastPaginationConfig(1, 1, 2, 2);
    const data = review.results;

    function fillRatingStars(rating) {
      const stars = Math.round(rating) / 2;
      return (stars * 100) / 5;
    }

    function render() {
      const visiable = data.slice(startIndex, startIndex + pageSize);

      container.innerHTML = visiable
        .map((r) => {
          const answer = fillRatingStars(r.author_details.rating);
          return `
          <div class='movie-review-user-info'>
            <div class='movie-review-uner-info'>
              <div class='user-name'>
                <p>${r.author}</p>
                <p>From No Data</p>
              </div>
              <div class='user-review-rate'>
                <div class='stars-rating' style="--fill: ${answer}%"></div>
                <span>${Math.round((r.author_details.rating / 2) * 10) / 10}</span>
              </div>
            </div>
              <div class='user-review'>
                <p>${cutString(r.content, 400)}</p>
              </div>
          </div>
            
          `;
        })
        .join("");
    }

    pagination({
      prevBtn,
      nextBtn,
      pageSize,
      step,
      root: movieInfo,
      targetClass: "movie-review-user-info",
      getTotal: () => data.length,
      getStart: () => startIndex,
      onChange: (newStart) => {
        startIndex = newStart;
        render();
      },
    });

    render();

    return container;
  }

  formatDate(release_date);
  hydrateLanguages();
  hydrateGenres();
  hydrateCrew();
  renderMovieCast();
  renderUserReview();

  movieContainer.append(movieDetails);
  movieContainer.append(movieInfo);

  return movieContainer;
}
