export const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmE1ZGUzZmZkMWUxYTc1MmI4ZjhiNDRhZmVjOTJhMSIsIm5iZiI6MTc3MDA2NTM5OC40OTUwMDAxLCJzdWIiOiI2OTgxMGRmNjRjOWU5YjRkY2Y0YzkyNzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Hnx7tK8KS6eXVl7aktBuiVkNCyUBRFkPMwsFPbLjZz8";

// export class tmdbApi {
//   constructor(
//     { baseUrl = "https://api.themoviedb.org/3" },
//     token,
//     language = "en-US",
//   ) {
//     this.baseUrl = baseUrl;
//     this.token = token;
//     this.language = language;
//   }

//   async request(path, params = {}) {
//     const url = new URL(this.baseUrl + path);

//     const merged = { anguage: this.language, ...params };

//     Object.entries(merged).forEach(([key, value]) => {
//       if (value !== undefined && value !== null && value !== "") {
//         url.searchParams.append(key, value);
//       }
//     });

//     const response = await fetch(url.toString(), {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//         "Content-Type": "application/json;charset=utf-8",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(
//         `API request failed: ${response.status} ${response.statusText}`,
//       );
//     }

//     return response.json()
//   }

//   getMovieById(movieId) {
//     return this.request(`/movie/${movieId}`)
//   }
// }

async function request(path, params = {}) {
  const url = new URL(BASE_URL + path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export const tmdbAPI = {
  getGenreMovies() {
    return request("/genre/movie/list", {
      language: "en-US",
    });
  },
  // getMovies() {
  //   return request('/discover/movie', {
  //     language: 'en-US',
  //     page: 1,
  //   });
  // }
};

export async function getMoviesPage(page = 1) {
  return request("/discover/movie", {
    language: "en-US",
    page,
  });
}

export async function getMoviespages(pageCount = 40) {
  const pages = [];
  for (let p = 40; p <= pageCount; p++) {
    pages.push(p);
  }

  const responses = await Promise.all(pages.map((p) => getMoviesPage(p)));

  const allmovies = [];

  for (const r of responses) {
    allmovies.push(...r.results);
  }

  return allmovies;
}

export async function getPopularMovies(page = 10) {
  return request("/movie/popular", {
    language: "en-US",
    page,
  });
}

export async function getTopRatedMoviesPage(page) {
  return request("/movie/top_rated", {
    language: "en-US",
    page,
  });
}

export async function getTopRatedMoviesPages(pageCount = 20) {
  const pages = [];
  for (let p = 20; p <= pageCount; p++) {
    pages.push(p);
  }

  const responses = await Promise.all(pages.map((p) => getPopularMovies(p)));

  const allPages = [];

  for (const r of responses) {
    allPages.push(...r.results);
  }
  return allPages;
}

export async function getTrandingMoviesOfDay(page) {
  return request("/trending/movie/day", {
    language: "en-US",
    page,
  });
}

export async function getTrandingMoviesOfDayPages(pageCount = 1) {
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    pages.push(p);
  }

  const responses = await Promise.all(
    pages.map((p) => getTrandingMoviesOfDay(p)),
  );

  const allPages = [];

  for (const r of responses) {
    allPages.push(...r.results);
  }
  return allPages;
}

export async function getMovieById(movieId) {
  return request(`/movie/${movieId}`, {
    language: "en-US",
  });
}

export async function getUpcomingMovies() {
  return request("/movie/upcoming", {
    language: "en-US",
    page: 2,
  });
}

export async function getGenresShows() {
  return request("/genre/tv/list", {
    language: "en-US",
  });
}

export async function getShowsPage(page) {
  return request("/discover/tv", {
    language: "en-US",
    page,
  });
}

export async function getShowsPages(pageCount = 1) {
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    pages.push(p);
  }

  const responses = await Promise.all(pages.map((p) => getShowsPage(p)));

  const allmovies = [];

  for (const r of responses) {
    allmovies.push(...r.results);
  }

  return allmovies;
}

export async function getPopularShowssPage(page) {
  return request("/tv/top_rated", {
    language: "en-US",
    page,
  });
}

export async function getPopularShowssPages(pageCount = 1) {
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    pages.push(p);
  }

  const responses = await Promise.all(
    pages.map((p) => getPopularShowssPage(p)),
  );

  const allmovies = [];

  for (const r of responses) {
    allmovies.push(...r.results);
  }

  return allmovies;
}

export async function getTrandingShows(page) {
  return request("/trending/tv/week", {
    language: "en-US",
    page,
  });
}

export async function getShowById(id) {
  return request(`/tv/${id}`, {language: "en-US"});
}

export async function getupcomingShows(page) {
  return request("/tv/on_the_air", {
    language: "en-US",
    page,
  });
}

export async function getMovieCredits(id) {
  return request(`/movie/${id}/credits`, { language: "en-US" });
}

export async function getMovieReview(id) {
  return request(`/movie/${id}/reviews`, { language: "en-US" })
}

export async function getTvSeason(id, seasonNumber) {
  return request(`/tv/${id}/season/${seasonNumber}`, { language: "en-US" });
}

export async function getShowCredits(id) {
  return request(`/tv/${id}/credits`, { language: "en-US" })
}

export async function getShowReviews(id) {
  return request(`/tv/${id}/reviews`, { language: "en-US" })
}

