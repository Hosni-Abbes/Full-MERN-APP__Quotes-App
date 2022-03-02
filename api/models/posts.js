const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  desc:{
    type:String,
    required:true,
    max:500
  },
  postLikes:{
    type:Array,
    default:[]
  }
},
{
  timestamps:true
}
)

module.exports = mongoose.model('posts', postsSchema)