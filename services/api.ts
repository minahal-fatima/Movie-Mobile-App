export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({ query}: {query: string}) => {
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`    
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`; //search by latest movies
    
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok){
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);


    }
    const data = await response.json();
    return data.results;

}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if(!response.ok) throw new Error('Failed o fetch movie details');

        const data = await response.json();
        return data;
        
    } catch (error){
        console.log(error);
        throw error;
    }
}
// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2I3MDQ0N2E1ZmI3MTUyNmIwOWQyYmVkZDUyZThkMCIsIm5iZiI6MTc1MzQ0Njc0My4zNjUsInN1YiI6IjY4ODM3OTU3ODA3YWJkNzU4M2Q5YTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCaXsWLZPCNGJc4K1b7j4NNeXte43sMdSjQGxez6f-4'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));