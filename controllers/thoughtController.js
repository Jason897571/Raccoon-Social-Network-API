const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts (req, res){
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

    async createThought(req, res){
        try{
            const newThoughtData = await Thought.create(req.body);
            res.status(200).json(newThoughtData);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}