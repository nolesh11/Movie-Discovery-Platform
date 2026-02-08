export const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmE1ZGUzZmZkMWUxYTc1MmI4ZjhiNDRhZmVjOTJhMSIsIm5iZiI6MTc3MDA2NTM5OC40OTUwMDAxLCJzdWIiOiI2OTgxMGRmNjRjOWU5YjRkY2Y0YzkyNzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Hnx7tK8KS6eXVl7aktBuiVkNCyUBRFkPMwsFPbLjZz8';

async function request(path, params = {}) {
  const url = new URL(BASE_URL + path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const tmdbAPI = {
  getGenreMovies() {
    return request('/genre/movie/list', {
      language: 'en-US',
    });
  },
  getMovies() {
    return request('/discover/movie', {
      language: 'en-US',
      page: 1,
    });
  }
}