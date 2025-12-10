export const TMDB_CONFIG={
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_ACCESS_TOKEN,
    headers:{
        accept:'application/json',
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_ACCESS_TOKEN}`
    }
}

export const fetchMovies=async({query}:{query:string})=>{
    const endpoint=
    query? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers
    })
    try {
        
    } catch (err) {
        
    }
    if(!response.ok){
        console.log()
        throw new Error('Failed to fetch movies')
    }
    const data = await response.json()

    return data.results;
}


export const getMovieById= async(id:string) : Promise<MovieDetails>=>{
    const endpoint=
     `${TMDB_CONFIG.BASE_URL}/movie/${id}`

    try {
        const response = await fetch(endpoint,{
            method:'GET',
            headers:TMDB_CONFIG.headers
        })
        const data = await response.json()
        // console.log(data)
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch movies')

    }
   
    

    
}