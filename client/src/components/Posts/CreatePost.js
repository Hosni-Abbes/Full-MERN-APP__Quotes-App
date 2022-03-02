import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

import './CreatePost.css'


function CreatePost(props) {
  //import current user (context)
  const { user } = useContext(UserContext);
  const postDesc = useRef();

  //Create new post
  const addNewPost = async (e) => {
    e.preventDefault();
    const postData = {
      userId: user._id,
      desc: postDesc.current.value
    }
    //add the new post to database
    try{
      const res = await axios.post('/posts', postData)
      //if the post added successfully close the "create post" popup
      if(res.status === 200){
        props.setCreateNewPost(false);
        document.body.classList.remove('hidden')
        window.location.reload()
      }
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='create-new-post'>
      <div className='create-new-post-top'>
        <span className='create-new-post-cap'>Create new post</span>
        <span className='close-btn' onClick={()=>{props.setCreateNewPost(false); document.body.classList.remove('hidden')} }>&times;</span>
      </div>
      <form className='new-post-form' onSubmit={(e)=>addNewPost(e)}>
        <div className="user-info">
          <i className="uil uil-user user-icon"></i>
          <div className="user-name-date">
            <span className="user-name">{ user.username.substring(0,1).toUpperCase() + user.username.substring(1).toLowerCase() }</span>
          </div>
        </div>
        <textarea placeholder={`Hey ${ user.username.substring(0,1).toUpperCase() + user.username.substring(1).toLowerCase() }, Create Something..` } rows='10' cols='40' ref={postDesc}></textarea>
        <button className='create-post-btn' type="submit">Create</button>
      </form>
      
    </div>
  );
}

export default CreatePost;