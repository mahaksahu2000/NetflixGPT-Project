import openai from "../utils/openai";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import client from "../utils/openai";

const GptSearchBar = () => {

    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " + 
        searchText.current.value; + 
        ". only give me names of 5 movies, comma seprated like the example result given ahead. Example Result: Pushpa2, sholay, Don, Golmaal, Koi Mil Gaya";


        const gptResults = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'developer', content: 'Talk like a pirate.' },
              { role: 'user', content: 'Are semicolons optional in JavaScript?' },
            ],
          });
        
          console.log(gptResults.choices);
          
        };
   

    

    return(
        <div className="gpt">
             <form 
             className="form1" 
             onSubmit={(e) => e.preventDefault()}>
                <input 
                ref={searchText}
                type="text" className="text1" 
                placeholder={lang[langKey].gptSearchPlaceholder}
                onClick={handleGptSearchClick}>
                </input>
                <button className="button1">
                    {lang[langKey].search}
                </button>
             </form>
        </div>
    );
}
export default GptSearchBar;