//import bcrypt to hash passwords
const bcrypt = require('bcrypt')
//import users model from models folder
const usersModel = require('../models/users')

//CREATE AUTH FUNCTIONS (REGISTER / LOGIN)
  //REGISTER USER
  exports.registerUser = async (req, res) => {
    try{
    //GENERATE NEW HASHED PASSWORD
    const salt = await bcrypt.genSalt(10) //generate salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt) //hash password
    //CREATE NEW USER
      const newUser = new usersModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })
      //SAVE USER IN DB & RETURN MESSAGE
      const saveUser = await newUser.save()
      res.status(200).send('Registration Success.')
    }catch(err){
      res.status(500).send(err)
    }
  }


  //LOGIN USER
  exports.loginUser = async (req, res) => {
    try{
      //FIND USER IN DB
      const user = await usersModel.findOne({email: req.body.email})
      //IF USER NOT EXIST SEND MESSAGE
      !user && res.status(400).send("User not found!")
      //ELSE IF USER EXIST IN DB ? CHECK PASSWORD
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      //IF PASSWORD NOT VALID SEND MESSAGE
      !validPassword && res.status(400).send('Wrong Password!')
      //ELSE IF PASSWORD IS VALID SEND SUCCESS MESSAGE
      res.status(200).send(user)
    }catch(err){
      res.status(500).json(err)
    }
  }