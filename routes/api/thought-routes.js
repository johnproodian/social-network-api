const router = require('express').Router();
const {
    addThought,
    getThoughts,
    getThoughtById
} = require('../../controllers/thought-controller');


// /apit/thoughts/
    router.route('/')
        // Get all thoughts
        .get(getThoughts)


// /api/thoughts/<userid>
    // Post to create new thought (incl. pushing the created thought's _id to the associated user's thoughts array field)
    router.route('/:userId')
        .post(addThought);

// /api/thoughts/<thoughtId>
    router.route('/:thoughtId')
    // Get a single thought by _id
        .get(getThoughtById)
    
    // Put to update a thought by its _id
    // Delete a thought by its _id

// /api/thoughts/:thoughtId/reactions
    // Post to create reaction stored in a single thought's reactions array field
    // Delete to pull and remove a reaction by the raction's reactionId


module.exports = router;