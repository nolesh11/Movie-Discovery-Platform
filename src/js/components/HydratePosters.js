import { renderPosters } from "./RenderPosters.js";

export function hydratePosters(root, item, {targetClass, dataAttr}) {
  const posterContainer = root.querySelectorAll(`.${targetClass}`);
  posterContainer.forEach((cont) => {
    const genreId = Number(cont.dataset.genreId);
    const moviesForgenre = item.filter(
      (m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(genreId),
    );
    renderPosters(cont, moviesForgenre, 4);
  });
}
