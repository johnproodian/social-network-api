const { User, Thought } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        Thought.create()
    }
}