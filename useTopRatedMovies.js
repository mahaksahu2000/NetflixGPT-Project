import { useDispatch } from "react-redux";
import {API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies, addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {

  // const [movies, setMovies] = useState(null); // This is problematic

    
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      API_OPTIONS
    );
  
    const json = await data.json(); 
    console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  };
  
 useEffect(() => {
    getTopRatedMovies();

 }, []);
};

export default useTopRatedMovies;