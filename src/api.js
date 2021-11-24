// fetch the gifs that I will use
const limit = 10
const apiKey = '5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f';

export async function fetchTrending() {
  const url = 'api.giphy.com/v1/gifs/trending';

  const response = await fetch(`https://${url}?api_key=${apiKey}&limit=${limit}`);
  const gifs = await response.json();
  return gifs.data;
}

export async function fetchSearch(searchTerm) {
  const url = 'api.giphy.com/v1/gifs/search';

  const response = await fetch(`https://${url}?api_key=${apiKey}&q=${searchTerm}&limit=${limit}`);
  const gifs = await response.json();
  return gifs.data;
}