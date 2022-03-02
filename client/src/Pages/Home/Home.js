import React, { useEffect } from 'react'

import AllPosts from '../../components/Posts/AllPosts'
import Sidebar from '../../components/Sidebar/Sidebar';

function Home(props) {

  //  change doc title 
  useEffect(()=>{
    document.title = 'Home'
  },[])


  return (
    <div className='app-container'>
      {/* HEADER */}
      <props.Header setClickUserIcon={props.setClickUserIcon} />
      
      {/* APP BODY */}
      <div className="app-body">
        {/* ALL USERS POSTS */}
        < AllPosts setEditThePost={props.setEditThePost} />
        {/* APP SIDE BAR */}
        < Sidebar setCreateNewPost={props.setCreateNewPost} />
      </div>
    </div>
  );
}

export default Home;