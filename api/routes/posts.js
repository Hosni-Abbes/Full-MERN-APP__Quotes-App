const express = require('express')
const router = express.Router()

//IMPORT CONTROLLERS FUNCTIONS
const {addPosts, getAllPosts, getUserPosts, getOnePost, updatePost, deletePost, postLike} = require('../controllers/posts')

//CREATE ROUTES
  //add posts to database
  router.post('/posts', addPosts)

  //get followilngs posts from db
  router.get('/posts/all/:id', getAllPosts)

  //get all posts of one user
  router.get('/posts/:username', getUserPosts)

  //get only one post
  router.get('/posts/:id', getOnePost)

  //update post
  router.put('/posts/:id', updatePost)

  //delete post
  router.delete('/posts/:id', deletePost)

  //like post
  router.put('/posts/:id/like', postLike)

//EXPORT ROUTER
module.exports = router