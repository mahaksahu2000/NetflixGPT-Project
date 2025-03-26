import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGE } from '../utils/constants';
import {toggleGptSearchView} from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      // navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid, 
            email: email, 
            displayName: displayName, 
            photoURL: photoURL, 
          })
        );
          navigate("/browse");

      } else {
        // dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmount
    return () => unsubscribe();

  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
   dispatch(toggleGptSearchView());

  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
   };
 
  return (
    <div className='header'>
   
    <img className="img" src={LOGO}
    alt='logo'></img>

    {user && (
    <div className='img1'>
      {showGptSearch && (
        <select className='dropdown' onChange={handleLanguageChange}>
        {SUPPORTED_LANGUAGE.map((lang) => (
          <option key={lang.identifire} value={lang.identifire}>
            {lang.name}
          </option>
        ))}
        
      </select>
    )}
      <button className='GPT'
      onClick={handleGptSearchClick}>
        {showGptSearch? "Homepage": "GPT Search"}
        </button>
      <img  className="usericon" alt='usericon' 
      src={user?.photoURL}>
      </img>
      <button onClick={handleSignOut} className='bt' alt="bt">
        (Sign Out)
        </button>
    </div>
  )}
    </div>
  );
};

export default Header;