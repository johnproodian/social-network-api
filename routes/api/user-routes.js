const router = require('express').Router();
const {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');


// /api/users
    router.route('/')
        // Get all users
        .get(getAllUsers)
        // Post a new user
        .post(addUser)
    
// /api/users/<_id>
    router.route('/:_id')
        // Get a single user by _id and populated thought and friend data
        .get(getUserById)
        // Put to update a user by its _id
        .put(updateUser)
        // Delete to remove a user by its _id
        .delete(deleteUser);
    
    
    
    // BONUS: Remove a user's associated thoughts when deleted


// /api/users/:userId/friends/:friendId
    // Post to add a new friend to a user's friend list
    // Delete to remove a friend from a user's friend list
    
module.exports = router;