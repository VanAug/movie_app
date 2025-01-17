import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
// https://api.themoviedb.org/3/genre/movie/list?language=en


export const tmdbApi = createApi({
    reducerPath: 'tmdApi',
    baseQuery: fetchBaseQuery({ baseUrl: ' https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        // Get Genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),

        // Get movies by type
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // Get movies by search
                if(searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}` 
                }

                // Get movies by Categories
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}` 
                }

                // Get movies by genre
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }

                // Get popular movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),

        // Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),

        // Get User Specific Lists
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`, 
        }),

        // Get Actor
        getActorDetails: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
        }),

        // get Actor Movies
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        }),

        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
        })
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorDetailsQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery,
} = tmdbApi;