import {
  getShowById,
  getTvSeason,
  getShowCredits,
  getShowReviews,
} from "../api/api.js";
import { hydrateRuntime } from "../components/HydrateRuntime.js";
import { cutString } from "../components/CutString.js";
import { getCastPaginationConfig } from "../components/PaginationConfig.js";
import { pagination } from "../components/Pagination.js";

export async function ShowsDetailsPage({ id }) {
  const [showById, season, credits, reviews] = await Promise.all([
    getShowById(id),
    getTvSeason(id, 1),
    getShowCredits(id),
    getShowReviews(id),
  ]);

  console.log(showById);
  console.log(season);
  console.log(credits);

  const { name, overview, backdrop_path, first_air_date, vote_average } =
    showById;

  const movieContainer = document.createElement("div");
  movieContainer.id = "movie-container";

  const movieDetails = document.createElement("section");
  movieDetails.className = "movie-details";
  movieDetails.innerHTML = `
    <div class='movie-container' style="background-image: url('https://image.tmdb.org/t/p/original${backdrop_path}')">
      <h2>${name}</h2>
      <p>${overview ? overview : "No data"}</p>
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

  const showInfo = document.createElement("section");
  showInfo.className = "show-info";
  showInfo.innerHTML = `
    <div class='show-seasons'>
      <div class='show-seasons-header'>
        <h3>Seasons and Episodes</h3>
      </div>
      <div class='show-seasons-info'></div>
    </div>
    <div class='movie-description show-overview'>
      <p>Description</p>
      <p>${overview ? overview : "No data"}</p>
    </div>
    <div class='movie-info-details show-info-details'>
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
    <div class='movie-cast show-cast'>
      <div class='movie-cast-header'>
        <p>Cast</p>
        <div class='cast-header__btns'>
          <button class='prev'><img src='./assets/icons/rightArrowIcon.svg' /></button>
          <button class='next'><img src='./assets/icons/leftArrowIcon.svg' /></button>
        </div>
      </div>
      <div class='movie-cast-list'></div>
    </div>
    <div class='movie-review show-reviews'>
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

  async function innerShowSeasons() {
    const container = showInfo.querySelector(".show-seasons-info");

    const seasonNums = (showById.seasons ?? []).map((s) => s.season_number);

    const seasons = await Promise.all(
      seasonNums.map((n) => getTvSeason(id, n)),
    );
    console.log(seasons);

    function renderSeason() {
      container.innerHTML = seasons
        .map(
          (s) => `
            <div class='show-season-info'>
              <div class='show-season'>
                <div class='season-header'>
                  <h6>${s.name}</h6>
                  <p>${s.episodes.length} Episodes</p>
                </div>
                <button><img src='./assets/icons/arrowSeason.svg' /></button>
              </div>
              <div class='season-episodes season-closed' data-season-id='${s.season_number}' data-episodes-id=${s.episodes.map((id) => id.id)}>
                ${s.episodes
                  .map(
                    (e) => `
                      <div class='episode-card'>
                        <div class='episode-video'>
                          ${e.still_path ? `<img src='https://image.tmdb.org/t/p/original${e.still_path}' />` : `No data`}
                        </div>
                        <div class='episode-number'>
                        ${e.episode_number < 10 ? `0` + e.episode_number : e.episode_number}
                        </div>
                        <div class='episode-runtime'>
                          <div>
                            <img src='./assets/icons/clockIcon.svg' />
                          </div>
                          <p class='episode-runtime-data' data-episode-id='${e.id}'>-</p>
                        </div>
                        <div class='episode-title'>Chapter ${e.episode_number}: ${e.name}</div>
                        <div class='episode-overview'>
                          <p>${cutString(e.overview, 200)}</p>
                        </div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          `,
        )
        .join("");

      return container;
    }

    function render() {
      renderSeason();

      const episodes1 = seasons.flatMap((s) => s.episodes);

      hydrateRuntime(episodes1, container, {
        targetClass: "episode-runtime-data",
        dataAttr: "episode-id",
      });
    }

    render();

    const showEpisodesContainers =
      showInfo.querySelectorAll(".show-season-info");
    showEpisodesContainers.forEach((c) => {
      c.addEventListener("click", (e) => {
        const target = e.target.closest(".show-season");
        const episodesList = target.nextElementSibling;

        episodesList.classList.toggle("season-closed");
      });
    });

    return container;
  }

  function formatDate(releasedYear) {
    const container = showInfo.querySelector(".movie-release-date");
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
    const container = showInfo.querySelector(".movie-languages-list");
    const data = showById.spoken_languages;

    container.innerHTML = data
      .map(
        (lang) => `
        <p>${lang.english_name}</p>
      `,
      )
      .join("");
  }

  function hydrateGenres() {
    const container = showInfo.querySelector(".movie-genres-list");
    const data = showById.genres;

    container.innerHTML = data
      .map(
        (g) => `
        <p>${g.name}</p>
      `,
      )
      .join("");
  }

  function hydrateCrew() {
    const containerDir = showInfo.querySelector(".movie-director-list");
    const director = credits.crew
      .filter((j) => j.job === "Director")
      .slice(0, 1);
    const containerMus = showInfo.querySelector(".movie-music-list");
    const music = credits.crew
      .filter((j) => j.department === "Sound")
      .slice(0, 1);

    containerDir.innerHTML =
      Array.isArray(director) && director.length
        ? director
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
            .join("")
        : `<div>No data</div>`;

    containerMus.innerHTML =
      Array.isArray(music) && music.length
        ? music
            .map((m) => {
              const img = filterProfileImg(m.profile_path);
              return `
          <div class='movie-music-item'>
            <div class='music-profile-photo'>
              <img src='${img}' alt='Profile photo' />
            </div>
            <div class='music-info'>
              <h6>${m.name}</h6>
              <p>From No Data</p>
            </div>
          </div>  
        `;
            })
            .join("")
        : `<div>No data</div>`;
  }

  function renderMovieCast() {
    const container = showInfo.querySelector(".movie-cast-list");
    const prevBtn = showInfo.querySelector(".prev");
    const nextBtn = showInfo.querySelector(".next");

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
    const container = showInfo.querySelector(".movie-review-info");
    const prevBtn = showInfo.querySelector(".prev-review");
    const nextBtn = showInfo.querySelector(".next-review");
    let startIndex = 0;
    let { pageSize, step } = getCastPaginationConfig(1, 1, 2, 2);
    const data = reviews.results;

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

  innerShowSeasons();
  formatDate(first_air_date);
  hydrateLanguages();
  hydrateGenres();
  hydrateCrew();
  renderMovieCast();
  renderUserReview();

  movieContainer.append(movieDetails);
  movieContainer.append(showInfo);
  return movieContainer;
}
