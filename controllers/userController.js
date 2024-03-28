const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req,res) {
        try{
            const userData = await User.find({}).select('-__v');
            res.json(userData);
        }catch(err){
            res.status(500).json(err);
        }

    },

    async getSingleUser(req,res) {
        try{
            // get thought and friend data
            const userData = await User.findOne({_id:req.params.userId}).select('-__v');
            res.json(userData);
        }catch(err){
            res.status(500).json(err);
        }
    },

    async createNewUser(req,res){
        try{
            const userData = await User.create(req.body);
            res.json(userData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async updateUser(req,res){
        try{
            const userData = await User.findOneAndUpdate({_id:req.params.userId},{$set:{"username":req.body.username,"email":req.body.email}})
            res.json(userData);
        }
        catch(err){
            res.status(500).json(err);
        }
    }

}