import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    console.log(movies);
    return(
        <div>
             <h3 className="h3">{title}</h3>
            <div className="list">
               
                <div className="cardlist"> 
                    {movies?.map((movies) => 
                    <MovieCard key={movies.id} posterPath={movies.poster_path}/>)}
                
                </div>
            </div>
        </div>
    );
};
export default MovieList;

