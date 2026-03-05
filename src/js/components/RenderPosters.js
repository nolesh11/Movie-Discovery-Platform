export function renderPosters(cont, movies, limit) {
  cont.innerHTML = "";

  const posters = movies.filter((m) => m.poster_path).slice(0, limit);

  posters.forEach((movies) => {
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/original${movies.poster_path}`;
    img.alt = "Poster";
    cont.append(img);
  });
}
