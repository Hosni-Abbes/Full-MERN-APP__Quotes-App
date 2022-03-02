import axios from 'axios';
import React from 'react';

import './EditPost.css';

function EditPost(props) {

  //FUNCTION DELETE POST
  const deletePost = async () => {
    const res = await axios.delete(`/posts/${props.editThePost.postId}`)
    if(res.status === 200){
      props.setEditThePost(false)
      document.body.classList.remove('hidden')
      window.location.reload()
    }
  }

  
  return (
    <div className='edit_my_post popup_mult_class'>
      <span className='edit_p' onClick={()=>{props.setEditMyPost(true)}}>Edit post</span>
      <span className='delete_p' onClick={()=>{deletePost()}} >Delete post</span>
      <span className='cancel_p' onClick={()=>{props.setEditThePost(false); document.body.classList.remove('hidden')}} >Cancel</span>
    </div>
  );
}

export default EditPost;