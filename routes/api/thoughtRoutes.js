const router = require('express').Router();
const{
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
    
}= require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts)
router.route('/:thoughtId').get(getSingleThought).post(createThought).put(updateThought).delete(deleteThought);


module.exports = router;