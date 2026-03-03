import { getMovieById } from "../api/api.js";

export async function MovieDetailsPage({ id }) {
  const movieById = await getMovieById(id);
  console.log(movieById);

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    genres,
  } = movieById;

  console.log(movieById);

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
  return movieDetails;
}
