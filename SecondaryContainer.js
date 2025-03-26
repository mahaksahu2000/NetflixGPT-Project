import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";


const SecondaryContainer  = () => {
    const movies = useSelector((store) => store.movies);
   
return (
    movies.addNowPlayingMovies &&
    <div className="cardbg">
        <div className="card1">
    <MovieList title={"Now Playing"} movies={movies.addNowPlayingMovies}/>
    <MovieList title={"Top Rated"} movies={movies.addTopRatedMovies}/>
    <MovieList title={"Popular"} movies={movies.popularMovies}/>
    <MovieList title={"Upcoming Movies"} movies={movies.addUpcomingMovies}/>
    <MovieList title={"Trending Movies"} movies={movies.addTrendingMovies}/>
    </div>
   

        {/* 

        MovieList - Popular
         MovieCard* n
         MovieList - Now Playing
          MovieList - Trending
           MovieList - Hrror
        
        */}
    </div>

);
}
export default SecondaryContainer;