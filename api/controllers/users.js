//import users model
const usersModel = require('../models/users');

//Get current user followings
exports.getCurrentUser = async (req, res) => {
  try{
    //get current user 
    const currentUser = await usersModel.findById(req.params.id)
    //get this current user followings
    const userFollowings = await Promise.all(
      currentUser.followings.map(followerId => {
        return usersModel.findById( followerId )
      })
    )
    //use another map to get only username and user id (because you should not get user password)
    let followersList = []
    userFollowings.map(follower => {
      const { _id, username } = follower;
      followersList.push( { _id, username } )
    })
    res.status(200).json(followersList);
  }catch(err){
    return res.status(500).send(err)
  }
}

//Function get a user (using user id)
exports.getUser = async (req, res) => {
  //we will use query to fetch data (when writing id or username)
  const userId = req.query.userId;
  const username = req.query.username;
  try{
    //get user (using if condition to get user depend on what query i send)
    const user = userId 
      ? await usersModel.findById(userId) 
      : await usersModel.findOne({ username:username });
      const { password, ...otherData } = user._doc ;
    if(otherData){
      res.status(200).json(otherData)
    }else{
      res.status(404).send('User not found!')
    }
  }catch(err){
    return res.status(404).send('User not found!')
  }
}

//Follow/Unfolow users
exports.followUnfollowUser = async (req, res) => {
  const userId = req.query.id;
  const username = req.body.userName;
  if(req.body.currentUserId !== userId || req.body.currentUserName !== username){
    try{
      const currentUser = await usersModel.findById(req.body.currentUserId)
      //check if current user is not following this user
      if(!currentUser.followings.includes(userId)){
        //follow this user
        await currentUser.updateOne( { $push: {followings: userId} } )
        res.status(200).send('Following user.')
      }else{
        //unfollow user
        await currentUser.updateOne( { $pull: {followings: userId} })
        res.status(200).send('Unfollowing user.')
      }
    }catch(err){
      return res.status(500).send(err)
    }
  }
}

//Get users when search
exports.searchForUser = async (req, res) => {
  //filter the search string to contain only letter
  const searchRegex = new RegExp(/^[A-Za-z0-9]*$/g)
  const searchQuery = req.query.username.trim().toLowerCase()
  const searchIsOkay = searchRegex.test(searchQuery) //boolean
  try{
    if(searchQuery !== '' && searchIsOkay ){
      //find users 
      const users = await usersModel.find( { username: {$regex: '^' + searchQuery + '.*' } } )
      if(users.length){
        res.status(200).send(users)
      }else{
        res.status(400).send(`No results found for '${searchQuery}'`)
      }
    }else{
      res.status(303).send(`Search for friend..`)
    }
  }catch(err){
    return res.status(500).send(err)
  }
}