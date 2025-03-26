import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
    return(
        <div>
          <img className="card" alt="Movie Card" src={IMG_CDN_URL + posterPath}>
          </img>
        </div>
    );
};
export default MovieCard;