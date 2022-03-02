import React, { useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

//import LoginAPI From LoginSignupAPI
import { loginApi } from '../../LoginAPI/LoginAPI';
//import UserContext to use it in useContext hook
import { UserContext } from '../../Context/UserContext';
//import progress from material ui framework
import { CircularProgress } from '@mui/material';

import './Login.css';


function Login(props) {
  const email = useRef();
  const password = useRef();
  //using useContext hook to get the initial state and dispatch from UserContext file
  const { user, isFetching, error, dispatch } = useContext(UserContext);

  //change doc title
  useEffect(()=>{
    document.title = 'Login';
  },[])

  //LOGIN FUNCTION
  function login(e){
    e.preventDefault();
    //using loginApi
    loginApi({email:email.current.value, password:password.current.value}, dispatch);
  }


  return (
    <div className="login_signup-p">
      <div className='login_signup-top'>
        <h1>Quotes</h1>
        <form className='login_signup-form login-form' onSubmit={(e)=>{login(e)}}>
          {error? <span className="login_signup-err">{ error.response.data }</span> : null }
          <input className='login_signup-email login-email' type='email' placeholder='Email' ref={email} required  />
          <input className='login_signup-pass login-pass' type='password' placeholder='Password' ref={password} required minLength='5'  />
          <button className='login_signup-btn login-btn' type='submit' disabled={isFetching} >{isFetching? <CircularProgress size="12px" color="inherit" /> : 'Log In' } </button>
        </form>
      </div>
      <div className='login_signup-bottom'>
        {isFetching? <div className="layBtns"></div> : null }
        <span>Don't have an account?</span>
        <NavLink to='/signup'>Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;