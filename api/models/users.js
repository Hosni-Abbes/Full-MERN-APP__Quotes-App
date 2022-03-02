const mongoose = require('mongoose')


//create users model
const usersSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    max: 15,
    min:3,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    min:5
  },
  followings:{
    type:Array,
    default:[]
  }
})

//Export users model
module.exports = mongoose.model('users', usersSchema)