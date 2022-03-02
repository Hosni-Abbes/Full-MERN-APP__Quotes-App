import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
//IMPORT TIMEAGO.JS TO FORMAT THE POSTS DATE
import { format } from "timeago.js"
import { NavLink } from 'react-router-dom';

//import UserContext to get user info into the intire app
import { UserContext } from '../../Context/UserContext';

function Post(props) {
  const [otherUser, setOtherUser] = useState({});
  const [likes, setLikes] = useState(props.post.postLikes.length)
  const [isLiked, setIsLiked] = useState(false)

  //get the user data when user login
  const { user } = useContext(UserContext)

  // FUNCTION TO GET USERS
  useEffect(()=>{
    const getUser = async ()=>{
      try{
        const res = await axios.get(`/users?userId=${props.post.userId}`)
        setOtherUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[props.post.userId])

  //CHECK IF POST IS ALREADY LIKED
  useEffect(()=>{
    setIsLiked(props.post.postLikes.includes(user.username))
  }, [props.post.postLikes, user.username])

  //FUNCTION TO UPDATE POST LIKEES WHEN CLICK LIKE BUTTON (HEART)
  const postLikes = () => {
    //update postLikes in database
    try{
      axios.put(`/posts/${props.post._id}/like`, {username: user.username })
    }catch(err){
      console.log(err)
    }
    //update likes in webpage (inc & dec likes)
    setLikes( isLiked? likes-1  : likes+1 );
    setIsLiked(!isLiked);
  }


  return (
      <article className="_post">
        {/* top part (user info post time and edit post) */}
        <div className="post-top">
          <div className="user-info">
            <NavLink to={`/profile/${otherUser.username}`}>
              <i className="uil uil-user user-icon"></i>
            </NavLink> 
            <div className="user-name-date">
              <NavLink to={`/profile/${otherUser.username}`}>
                <span className="user-name">{ otherUser.username && otherUser.username.substring(0,1).toUpperCase() + otherUser.username.substring(1).toLowerCase() }</span>
              </NavLink>
              <span className="post-date">{ format(props.post.createdAt) }</span>
            </div>
          </div>
          {
            props.post.userId === user._id ?
          <i className="uil uil-ellipsis-h edit-post" onClick={()=>{props.setEditThePost({case:true, postId:props.post._id, postDesc: props.post.desc}); document.body.classList.add('hidden')  }}></i>
          : null
          }
        </div>
        {/* midle part ( post text) */}
        <div className="post-content">
          <p className="post-desc">{props.post.desc}</p>
        </div>
        <div className="post-bottom">
          <span className="post-like" onClick={()=>{ postLikes() }} style={{color: isLiked? 'red': '#c7c7c7' }} >&#10084;</span>
          <span className="post-likes-number">{likes} Likes</span>
        </div>
      </article>
  );
}

export default Post;