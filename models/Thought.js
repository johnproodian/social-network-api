const { Schema, model, Types } = require('mongoose');
// const dateFormat??

// Reaction Schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

// Thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// ThoughtSchema.virtual('ReactionCount').get(function() {
//     return this.reactions.length;
// });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
