const { User, Thought } = require('../models');

module.exports = {
    // get information for all users
    async getAllUsers(req,res) {
        try{
            const userData = await User.find({}).select('-__v');
            res.json(userData);
        }catch(err){
            res.status(500).json(err);
        }

    },
    // get information for one user
    async getSingleUser(req,res) {
        try{
            // get thought and friend data
            const userData = await User.findOne({_id:req.params.userId}).select('-__v');
            if(!userData){
                return res.status(404).json({message: 'No user with that ID'})
            }
            res.json(userData);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // create a new user
    async createNewUser(req,res){
        try{
            const userData = await User.create(req.body);
            res.json(userData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //update the information for a user
    async updateUser(req,res){
        try{
            const userData = await User.findOneAndUpdate({_id:req.params.userId},{$set:{"username":req.body.username,"email":req.body.email}},{new:true})
            res.json(userData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // delete a user 
    async deleteUser(req,res){
        try{
            const userData = await User.findOneAndDelete({_id:req.params.userId});
            if (userData == null) {
                return res.status(404).json({ message: 'User not found' });
              }
            
            // delete related thoughts
            await Thought.deleteMany({userId:req.params.userId});
            
            res.status(200).json({message:"user has been deleted","deleted user": userData});
        }catch(err){
            res.status(500).json(err);
        }
    },

    //add a friend
    //TODO to fix bug for id testing
    async addFriend(req,res){
        try{
            // test if the user exist
            const isUserExist = await User.findOne({_id:req.params.userId});
            if(!isUserExist){
                return res.status(404).json({message:"User not found"});
            }
            // test if the friendID is a userID
            const isFirendExist = await User.findOne({_id:req.params.friendId});
            if(!isFirendExist){
                return res.status(404).json({message:"friend not found"});
            }

            // add friend
            const friendData = await User.findOneAndUpdate({_id:req.params.userId},{$addToSet:{"friends":req.params.friendId}},{new:true}).select("-__v");
            
            res.json(friendData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async removeFriend(req,res){
        try{
            const removedFriendData = await User.findOneAndUpdate({_id:req.params.userId},{$pull:{"friends":req.params.friendId}},{new:true})
            res.json({message:"The friend has been removed",removedFriendData});
        }catch(err){
            res.status(500).json(err);
        }
    }
    

}