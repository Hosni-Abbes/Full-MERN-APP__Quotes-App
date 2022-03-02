//IMPORT EXPRESS AND ROUTER
const express = require('express')
const router = express.Router()
//IMPORT AUTH CONTROLLERS
const {registerUser, loginUser} = require('../controllers/auth')

//CREATE AUTH ROUTES
  //REGISTER
  router.post('/register', registerUser)
  
  //LOGIN
  router.post('/login', loginUser)


//EXPORT ROUTES
module.exports = router