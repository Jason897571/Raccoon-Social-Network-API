const router = require('express').Router();
const{
    getAllThoughts,
    getSingleThought,
    createThought
    
}= require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts)
router.route('/:thoughtId').get(getSingleThought).post(createThought);


module.exports = router;