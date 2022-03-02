import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import './Header.css'

function Header(props) {
  //Get user using useContext to edit yhe username to be the user username
  const {user} = useContext(UserContext)
  const searchQuery = useRef()
  const [searchUserResult, setSearchUserResult] = useState({
    isSerching: false,
    users:[],
    error:''
  })


  //Search for users
  const searchForUser = async () => {
    try{
      const res = await axios.get(`/users/search?username=${searchQuery.current.value}` )
      setSearchUserResult({  isSerching:true, error:'', users: res.data })
    }catch(err){
      setSearchUserResult({  isSerching:true, error: err.response.data })
    }


  }

  return (
    <header className="app-header">
      <nav className="header-nav">
        <NavLink to='/' className="header-logo">Quotes</NavLink>
        <div style={{position:'relative'}}>
          <input type="text" className="search-bar" placeholder="Search"
                  ref={searchQuery} onChange={searchForUser} onFocus={searchForUser}
                  onBlur={()=> {
                    setTimeout(() => {
                      setSearchUserResult({ ...searchUserResult, isSerching:false })
                    }, 200);
                    }  }/>
          
          {/* Result of search */}
          {
            searchUserResult.isSerching  ? 
            <div className='search_result'>
              {
                searchUserResult.error === '' ?
                searchUserResult.users.map( (user,index) => {
                  return  <NavLink to={`/profile/${user.username}`} key={index} style={{display:'block'}} >
                            { user.username.substring(0,1).toUpperCase() + user.username.substring(1).toLowerCase() }
                          </NavLink>
                }) : <span className='search-result-err'>{searchUserResult.error }</span>
              }
            </div>
            : null
          }
        </div>

        <span className="my-posts" onClick={()=>{props.setClickUserIcon(true); document.body.classList.add('hidden') }}>
          <i className="uil uil-user user-icon"></i>
          <span className='header-me'>{ user.username.substring(0,1).toUpperCase() + user.username.substring(1).toLowerCase() }</span>
        </span>
      </nav>
    </header>
  );
}

export default Header;