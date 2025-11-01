const API_KEY ="66af9c1e4a0be514785dfec8308b4ce2";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) =>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()

    if(!data.results || data.results.length === 0 ) {
        throw new Error ("No movies found")
    }

    return data.results
};