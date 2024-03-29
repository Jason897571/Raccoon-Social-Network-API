const router = require('express').Router();
const{
    getAllThoughts,
    getSingleThought,
    createThought
    
}= require('../../models/Thought');

router.route('/').get(getAllThoughts)
router.route('/:thoughtId').get(getSingleThought).post(createThought);


module.exports = router;