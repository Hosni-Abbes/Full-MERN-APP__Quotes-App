import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import Skeleton from '../Skeleton/Skeleton';

import './Sidebar.css'

function Sidebar(props) {
  const {user} = useContext(UserContext)
  const [followings, setFollowings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //Get current user  followings
  useEffect(()=>{
    const getFollowings = async () => {
      setIsLoading(true)
      try{
        const res = await axios.get(`/user/${user._id}/followings`)
        setFollowings(res.data)
      }catch(err){
        console.log(err)
      }
      setIsLoading(false)
    }
    getFollowings()
  },[user._id])


  return (
    <aside className="app-aside">
      <div className="create-post" onClick={()=>{props.setCreateNewPost(true); document.body.classList.add('hidden')}}>
        <i className="uil uil-plus add-post"></i>
        <span>Create new post</span>
      </div>
      
      <div className="followings">
        <span className="followings-title">People you follow</span>
        {
          isLoading ?
          <Skeleton type={'sidebarFollowers'}/>
          :
          followings?.length ?
            followings.slice(0, 6).map((person) => {
              return <React.Fragment key={person._id}>
                <NavLink to={`/profile/${person.username}`} className="followings-persons">
                  <i className="uil uil-user user-icon"></i>
                  { person.username.substring(0,1).toUpperCase() + person.username.substring(1).toLowerCase() }
                </NavLink>
                </React.Fragment>
          })
          : <span>You are not following any friend.</span>
        }
      </div>

      <div className="copyright">
        <div className="app-terms">
          <a href='/'>Privacy</a>
          <a href='/'>Terms</a>
          <a href='/'>Conditions</a>
        </div>
        <p className="app-copyright">&copy; {new Date().getFullYear()} QUOTES APP.</p>
      </div>
    </aside>
  );
}

export default Sidebar;