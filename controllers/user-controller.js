const { json } = require('express/lib/response');
const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: 'asc' })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // add User
    addUser({ body }, res) {
        User.create(body)
            .then(newUser => res.json(newUser))
            .catch(err => res.json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params._id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate( { _id: params._id }, body, { new: true, runValidators: true })
            .then(dbUpdatedUser => {
                if (!dbUpdatedUser) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUpdatedUser);
            })
            .catch(err => res.json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params._id })
            .then(dbDeletedUser => res.json(dbDeletedUser))
            .catch(err => res.json(err));
    },
    addFriendById({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends:  params.friendId }},
            { new: true }
        )
            .then(dbNewFriend => {
                if (!dbNewFriend) {
                    res.status(404).json({ message: "No User by that id" });
                    return;
                }
                res.json(dbNewFriend);
            })
            .catch(err => res.json(err));
    },
    deleteFriendById({ params }, res) {
        User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId }},
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));


        //     {$pull: {friends: { _id: params.friendId } } },
        //     { new: true }
        // )
        //     .then(deletedFriend => {
        //         if (!deletedFriend) {
        //             res.status(404).json({ message: "No user by that id" });
        //             return;
        //         }
        //         res.json(deletedFriend);
        //     })
        //     .catch(err => res.json(err));
    }
};

module.exports = userController;