import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {USER_AVATAR} from "../utils/constants";
import { BG_URL } from '../utils/constants';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErroeMessage] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
//  const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

//  }

  const handleButtonClick = () => {
   const message = checkValidData(email.current.value, password.current.value);
  
   
   setErroeMessage(message);
   if(message) return; 
   
   if(!isSignInForm) {
      // Sign Up Login
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )

       .then((userCredential) => {
        
         const user = userCredential.user;
         
         updateProfile(user, {
          displayName: name.current.value, 
          photoURL: USER_AVATAR
        })
        .then(() => {
          const {uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid, 
                email: email, 
                displayName: displayName, 
                photoURL: photoURL 
                
              }));
            
         navigate("/browse");
        })
        .catch((error) => {
        setErroeMessage(error.message);
        });
       
     })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         setErroeMessage(errorCode + "-" + errorMessage);
        });

   }
   else {
    // Sign In Logic
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )

     .then((userCredential) => {
      
       const user = userCredential.user;
       console.log(user);
       navigate("/browse")
      })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErroeMessage(errorCode + "-" + errorMessage);
      });

   }
   
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);

  }
  return (
    <div>
        <Header/>
        <div className='bg-img'>
            <img src={BG_URL}
                 alt='logo'>  
            </img>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='Loginform'>
         <h1 className='h1'>
         {isSignInForm ? "Sign In" : "Sign Up"}
         </h1>

         {!isSignInForm && (
              <input
             ref={name}
             className='input' 
             type='text' 
             placeholder='Full Name'></input>
             )}
            <input
            ref={email}
             className='input' 
             type='text' 
             placeholder='Email Address'></input>

             <input
             ref={password}
               className='input' type={showPassword ? "text" : "password"}
             placeholder='Password'>
             </input>
             <span onClick={() =>
              setShowPassword(!showPassword)}>
                {showPassword}
                {/* {showPassword ? "👁️" : "🙈"}  */}

             </span>

            {/* <input
            ref={password}
             className='input' 
             type='text'
             placeholder='Password'>
             </input> */}
             

            <p className='p1'>{errorMessage}</p>
            <button
             className='button' onClick={handleButtonClick}>
               {isSignInForm ? "Sign In" : "Sign Up"}
             </button>
             
             

            <p className='p' onClick={toggleSignInForm}>
            {isSignInForm ? " New to Netflix Sign Up Now" : "Already registered? Sign In Now."}
           </p>
        </form>
    </div>
  )
}

export default Login;