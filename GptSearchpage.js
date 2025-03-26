import { BG_URL } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";


const GptSearchpage = () => {
    return(
        <div>
            <div className='bg-img1'>
            <img src={BG_URL} alt='logo'>  
            </img>
        </div>
            <GptSearchBar/>
            <GptMovieSuggestion/>


        </div>
    );
}
    


export default GptSearchpage;