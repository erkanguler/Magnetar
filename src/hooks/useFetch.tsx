import { useQuery } from '@tanstack/react-query'

function getMovies() {
    return fetch('https://movies-mock-api-s7oiqxtmzq-lz.a.run.app/api/movies').then(res => res.json())
}

export function useFetch() {
    return useQuery({
        queryKey: ['dtmovies'],
        queryFn: getMovies,
        //cacheTime: 1000 * 60, // in millseconds, default is 5 minutes
        refetchOnWindowFocus: false
    })
}
