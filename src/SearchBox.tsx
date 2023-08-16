import { useState } from 'react'
import { useFetch } from './hooks/useFetch'
import { Suggestion } from './Suggestion'
import { MovieCollection } from './Movie'
import { MovieList } from './MovieList'
import './SearchBox.css'

let initialSearchResult: MovieCollection = []
let initailSuggestion: MovieCollection = []
let initialQuery: string = ''
let movies: MovieCollection = []

function findMovie(query: string): MovieCollection {
    return movies.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()))
}

export const SearchBox = () => {
    const [query, setQuery] = useState(initialQuery)
    const [suggestion, setSuggestion] = useState(initailSuggestion)
    const [searchResult, setSearchResult] = useState(initialSearchResult)
    const [isMoviesDisplayed, setIsMoviesDisplayed] = useState(false)

    const { isLoading, data, isError, error } = useFetch()

    movies = data

    const resetSuggestionAndQuery = () => {
        setQuery(initialQuery)
        setSuggestion(initailSuggestion)
    }

    const setStateForQuery = (e: any) => {
        let searchQuery = e.target.value

        if (!searchQuery) {
            resetSuggestionAndQuery()
            return
        }

        setQuery(searchQuery)
        setSuggestion(findMovie(searchQuery).slice(0, 5))
    }

    const searchMovie = () => {
        resetSuggestionAndQuery()
        setIsMoviesDisplayed(true)
        setSearchResult(findMovie(query))
    }

    const searchMovieInSuggestion = (query: string) => {
        resetSuggestionAndQuery()
        setIsMoviesDisplayed(true)
        let result: MovieCollection = findMovie(query)

        if (result.length > 1) {
            result = result.filter((movie) => {
                return movie.name === query
            })
        }

        setSearchResult(result)
    }

    const handleEnterKey = (e: any) => {
        if (e.code != 'Enter') {
            return
        }

        resetSuggestionAndQuery()
        setIsMoviesDisplayed(true)
        setSearchResult(findMovie(query))
    }

    if (isLoading) {
        return <h1 className='dtcenter'>Loading...</h1>
    }

    if (isError) {
        return (error instanceof Error) && <h1 className='dtcenter'>Network error: {error.message}</h1>
    }

    return (
        <>
            <div className='dtsearch-box'>
                <div className='dtsearch-box-head'>
                    <input onChange={setStateForQuery} onKeyDown={e => { handleEnterKey(e) }} value={query} placeholder="Movie name" autoFocus />
                    <button onClick={searchMovie}>Search</button>
                </div>
                <div className='dtsearch-box-suggestion'>
                    <Suggestion suggestion={suggestion} setQuery={setQuery} searchMovieInSuggestion={searchMovieInSuggestion} />
                </div>
            </div>

            <ul className='dtlisting-movies'>
                <MovieList movies={searchResult} isMoviesDisplayed={isMoviesDisplayed} />
            </ul>
        </>
    )
}
