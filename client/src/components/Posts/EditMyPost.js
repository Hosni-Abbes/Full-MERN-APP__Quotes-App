import axios from 'axios';
import React, { useRef } from 'react';

function EditMyPost(props) {
  const updatedPostDesc = useRef();

  //Update the post
  const updatePost = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`/posts/${props.updatePost.postId}`, { desc: updatedPostDesc.current.value } )
      //hide the popup if post edited successfully
      if (res.status === 200){
        props.setEditMyPost(false);
        props.setEditThePost(false);
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
        <span className='create-new-post-cap'>Edit my post</span>
        <span className='close-btn' onClick={()=>{props.setEditMyPost(false)} }>&times;</span>
      </div>
      <form className='new-post-form' onSubmit={e=>updatePost(e)}>
        <textarea placeholder='Create Something..' rows='10' cols='40' defaultValue={props.updatePost.postDesc} ref={updatedPostDesc} ></textarea>
        <button className='create-post-btn' type="submit">Edit</button>
      </form>  
    </div>
  );
}

export default EditMyPost;