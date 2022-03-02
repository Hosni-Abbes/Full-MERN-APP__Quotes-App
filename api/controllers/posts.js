//import posts model from models
const postsModel = require('../models/posts')
const userModel = require('../models/users');


//add posts to database
exports.addPosts = async (req,res) => {
  try{
    //create new post
    const newPost = new postsModel({
      userId:req.body.userId,
      desc:req.body.desc,
      postLikes:req.body.postLikes
    })
    //save post to database
    const savePost = await newPost.save()
    res.status(200).send("Post Added")
  }catch(err){
    return res.status(500).send(err)
  }
}

//get all posts
exports.getAllPosts = async (req,res)=>{
  try{
    const currentUser = await userModel.findById(req.params.id)
    const CurrentUserPosts = await postsModel.find( { userId : currentUser._id } )
    //fetch all followings posts (Promise)
    const followingsPosts = await Promise.all(
      currentUser.followings.map( (followerId) => {
        return postsModel.find({userId: followerId})
      })
    )
      res.status(200).send(CurrentUserPosts.concat(...followingsPosts) )
  }catch(err){
    return res.status(500).send(err)
  }
}

//get all posts of one user (when enter to user profile)
exports.getUserPosts = async (req, res) => {
  try{
    //first find the user (by his username)
    const user = await userModel.findOne({username:req.params.username});
    //find the posts (by user username)
    const userPosts = await postsModel.find({ userId:user._id });
    res.status(200).send(userPosts)
  }catch(err){
    return res.status(500).send(err)
  }
}

//get only one post (using post id)
exports.getOnePost = async (req, res)=>{
  try{
    const post = await postsModel.findById(req.params.id)
    if(post){
      res.status(200).send(post)
    }else{
      res.status(403).send("Post Not Found")
    }
  }catch(err){
    return res.status(404).send("Post Not Exist")
  }
}

//update post
exports.updatePost = async (req, res) => {
  try{
    const post = await postsModel.findByIdAndUpdate(req.params.id, {$set: req.body})
    res.status(200).send('Post Updated.')
  }catch(err){
    return res.status(500).send(err)
  }
}

//delete post
exports.deletePost = async (req, res) => {
  try{
    const post = await postsModel.findByIdAndDelete(req.params.id)
    res.status(200).send('Post Deleted')
  }catch(err){
    return res.status(500).send(err)
  }
}

//like post
exports.postLike = async (req, res) => {
  try{
    //find post to update its likes
    const post = await postsModel.findById(req.params.id)
    //check if post likes include this user
    if (!post.postLikes.includes(req.body.username)){
      await post.updateOne( { $push: {postLikes: req.body.username} } )
      res.status(200).send('Like post')
    }else{
      await post.updateOne( { $pull: {postLikes: req.body.username} } )
      res.status(200).send('Dislike post')
    }
  }catch(err){
    return res.status(500).send(err)
  }
}
