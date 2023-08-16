import { MovieCollection } from "./Movie"

export const Suggestion = (
    { suggestion, setQuery, searchMovieInSuggestion }:
        { suggestion: MovieCollection, setQuery: any, searchMovieInSuggestion: any }) => {

    const handleClick = (e: any) => {
        let query = e.target.innerText
        setQuery(query)
        searchMovieInSuggestion(query)
    }

    return (
        <>
            {suggestion.map((movie) =>
                <div className="suggestion-item" onClick={handleClick} key={movie.id}>{movie.name}</div>
            )}
        </>
    )
}
