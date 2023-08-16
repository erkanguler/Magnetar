import { MovieCollection } from './Movie'

export const MovieList = (
    { movies, isMoviesDisplayed }:
        { movies: MovieCollection, isMoviesDisplayed: boolean }) => {
    return (
        <>
            {isMoviesDisplayed && movies.map(movie =>
            (
                <li data-testid='dtmovie' className='dtmovie' key={movie.id}>
                    <div><img src={movie.thumbnail} alt='Movie image' /></div>
                    <ul className='dtmovie-info'>
                        <li><b>{movie.name}</b></li>
                        <li>{movie.description}</li>
                        <li><b>&#11088; {movie.rating}</b></li>
                        <li>{Number(movie.duration) / 60} minutes</li>
                        <li>{movie.genres.map(genre => genre.toUpperCase()).join(', ')}</li>
                    </ul>
                </li>
            )
            )}
        </>
    )
}
