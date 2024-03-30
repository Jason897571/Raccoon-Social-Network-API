const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res){
        try{
            const allThoughtsData = await Thought.find({}).select('-__v');
            if (!allThoughtsData){
                return res.status(404).json({message: 'No thoughts found'});
            }
            res.status(200).json(allThoughtsData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // get signle thought
    async getSingleThought(req,res){
        try{
            const singleThoughtData = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
            if (!singleThoughtData){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.status(200).json(singleThoughtData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // create a thought
    async createThought(req, res){
 
        try{
            const isUser = await User.findOne({_id: req.body.userId});

            if (!isUser){
                return res.status(404).json({message: 'No user with that ID'});
            }

            const newThoughtData = await Thought.create(req.body);
            res.status(200).json(newThoughtData);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // update a thought by id
    async updateThought(req, res){
        try{
            const updatedThoughtData = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true});

            res.status(200).json({"message":"Thought is updated",updatedThoughtData});
        }
        catch{
            res.status(500).json(err);
        }
    },

    // delete a thought by id
    async deleteThought(req, res){
        try{
            const deletedThoughtData = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            res.status(200).json({"message":"Thought is deleted",deletedThoughtData});
        }
        catch{
            res.status(500).json(err);
        }
    }
}