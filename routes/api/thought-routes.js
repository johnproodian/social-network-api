const router = require('express').Router();
const {
    addThought
} = require('../../controllers/thought-controller');

// /api/thoughts
    // Get all thoughts
    // Post to create new thought (incl. pushing the created thought's _id to the associated user's thoughts array field)
    router.route('/')
        .post(addThought);

// /api/thoughts/<thoughtId>
    // Get a single thought by _id
    
    // Put to update a thought by its _id
    // Delete a thought by its _id

// /api/thoughts/:thoughtId/reactions
    // Post to create reaction stored in a single thought's reactions array field
    // Delete to pull and remove a reaction by the raction's reactionId