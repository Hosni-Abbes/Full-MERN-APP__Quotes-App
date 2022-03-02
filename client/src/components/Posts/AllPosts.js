import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Post from './post';
import { UserContext } from '../../Context/UserContext';
import Skeleton from '../Skeleton/Skeleton';

import './AllPosts.css';

function AllPosts(props) {
  const {user} = useContext(UserContext)
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  //FUNCTION TO GET POSTS
  useEffect(()=>{
    const getPosts = async ()=>{
      setIsLoading(true)
      try{
        const res = props.username? 
        await axios.get(`/posts/${props.username}`)
        : await axios.get(`/posts/all/${user._id}`)
        //set posts and sort them by newest posts
        setPosts(res.data.sort((post1,post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt)
        } ))
      }catch(err){
        console.log(err)
      }
      setIsLoading(false)
    }
    getPosts()
  },[props.username, user._id])


  return (
    <section className="all-posts">
      {
      isLoading ?
        <Skeleton type={'posts'}/>
      :
        posts.length ?
        posts.map( post => <Post key={post._id} post={post} setEditThePost={props.setEditThePost} />  )
        : <span className='no-quotes-msg'>No quotes to show.</span>
      }
    </section>
  );
}

export default AllPosts;