import React, { useEffect, useRef } from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup(props) {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  //useNavigate hook to redirect user to pages
  const navigate = useNavigate();
  
  //change doc title
  useEffect(()=>{
    document.title = 'Signup';
  },[])

//FUNCTION SIGN UP
const signup = async (e) => {
  e.preventDefault();
  //create user object holding his data
  const user = {
    email: email.current.value,
    username: username.current.value,
    password: password.current.value
  }
  //send data to db
  try{
    //register user in database
    await axios.post('/auth/register', user);
    //if user is registered in database redirect him to login page 
    navigate('/login');
  }catch(err){
    console.log(err);
  }
}


  return (
    <div className="login_signup-p">
      <div className='login_signup-top'>
        <h1>Quotes</h1>
        <span className='signup-sub'>Sign up to see quotes from your friends.</span>
        <form className='login_signup-form signup-form' onSubmit={ (e)=>{signup(e)} }>
          <input className='login_signup-email signup-email' type='email' placeholder='Email' ref={email} required />
          <input className='signup-username' type='text' placeholder='Username' ref={username} required maxLength='15' minLength='3' />
          <input className='login_signup-pass signup-pass' type='password' placeholder='Password' ref={password} minLength='5' required />
          <button className='login_signup-btn signup-btn' type='submit'>Sign up</button>
        </form>
        <span className='signup-rules'>By signing up, you agree to our <strong>Terms</strong> , <strong>Data Policy</strong> and <strong>Cookies</strong> Policy .</span>
      </div>
      <div className='login_signup-bottom'>
        <span>Already have an account?</span>
        <NavLink to='/login'>Log in</NavLink>
      </div>
    </div>
  );
}

export default Signup;