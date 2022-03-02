import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
//import useParams from react-router to choose automatically the username from adressBar
import { NavLink, useParams } from 'react-router-dom';

import AllPosts from '../../components/Posts/AllPosts';
import { UserContext } from '../../Context/UserContext';
//import skeleton from material ui
import { Skeleton } from '@mui/material';

import './profile.css';


function Profile(props) {
  const [user, setUser] = useState({});
  const [userNotExistErr, setUserNotExistErr] = useState(false);
  //here use the useParams hook to get username and use it in getUser function and allPosts component
  const username = useParams().username;
  //get current user data (using Context)
  const { user:currentUser } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  // FUNCTION TO GET USERS
  useEffect(()=>{
    const getUser = async ()=>{
      try{
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      }catch(err){
        console.log(err);
        setUserNotExistErr(true)
      }
    }
    getUser();
  },[username])

  //check if current user is already follows this user 
  useEffect(()=>{
    const getFollowings = async () => {
      try{
        const res = await axios.get(`/user/${currentUser._id}/followings`)
        const followingsArray =  res.data.map( follower =>  follower.username)
        setIsFollowing(followingsArray.includes(username))
      }catch(err){
        console.log(err)
      }
    }
    getFollowings();
  },[currentUser._id, username])

  //change doc title with profile user name
  useEffect(()=>{
    user?.username && (document.title = user.username.substring(0,1).toUpperCase() + user.username.substring(1).toLowerCase() );
  },[user])
  
  //FOLLOW USERS FUNCTION
  const followUser = async () => {
    try{
      await axios.put(`/users/follow?id=${user._id}`, { userName: username, currentUserId: currentUser._id, currentUserName: currentUser.username } )
    }catch(err){
      console.log(err)
    }
    //set the button to update with following user state
    setIsFollowing(!isFollowing);
  }


  return (
    <React.Fragment>
      <props.Header setClickUserIcon={props.setClickUserIcon} />
      {
        userNotExistErr ?
        <div style={{ margin:'200px auto', textAlign:'center' }}>
          <span style={{display:'block', marginBottom:'10px'}}>User Is Not Exist.</span>
          <span>Go Back To <NavLink to='/'>Home Page</NavLink></span>
        </div>
        :
        <>
      {/* PROFILE */}
      <div className='profile_info'>

        {/* Profile top */}        
        <div className='profile_name'>
          {
            user?.username
          ? <i className='uil uil-user user-icon'></i>
          : <Skeleton variant="circular" width={32} height={32} /> 
          }
          <div className='user-name-follow'>
            <span className='profile_username'>
              {user?.username 
              ? user.username.substring(0,1).toUpperCase() + user.username.substring(1).toLowerCase()
              : <Skeleton variant="rectangular" width={50} height={16} /> }
            </span>
            {/* FOLLOW / UNFOLLOW USER */}
            {
              username === currentUser.username ?
              null
              : user?.username ?
                <button className='follow-user' 
                        style={ isFollowing ? { backgroundColor:'#fff', color:'#262626', border:'1px solid #ccc' } : { backgroundColor:'#0095f6' } }
                        onClick={()=>{followUser()}}>
                          { 
                            isFollowing ? "Unfollow" : "Follow"
                          }
                </button> : <Skeleton variant="rectangular" width={50} height={16} />
            }
          </div>
        </div>

        {/* PROFILE POSTS */}
        <div className='profile_posts'>
          <AllPosts username={username} setEditThePost={props.setEditThePost}  />
        </div>
      </div>

    </> }
      

    </React.Fragment>
  );
}

export default Profile;