//import express , Router
const express = require('express')
const router = express.Router()

//import user controllers
const { getCurrentUser, getUser, followUnfollowUser, searchForUser } = require('../controllers/users');

//Get current user followings
router.get('/user/:id/followings', getCurrentUser)

//get user (post page)
router.get('/users/', getUser);

//follow user
router.put('/users/follow/', followUnfollowUser);

//Search for users
router.get('/users/search/', searchForUser)

//Export router
module.exports = router