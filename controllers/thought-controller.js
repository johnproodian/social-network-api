const { json } = require('express/lib/response');
const { User, Thought } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        Thought.create(body)
            .then((dbThought) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: dbThought._id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400)
            });
    },
    getThoughtById( { params }, res) {
        // console.log(params._id);
         
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(404).json({ message: "No thought with this id" })
            })
    },
    updateThoughtById( { params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought with this id" })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },
    deleteThoughtById( { params }, res) {
        console.log('params: ' + params);
        console.log('params.bookId: ' + params.thoughtId );
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbDeletedThought => {
                if (!dbDeletedThought) {
                    res.status(404).json({ message: "No thought with that id" })
                    return;
                }
                res.json(dbDeletedThought);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;