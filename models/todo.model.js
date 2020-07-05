const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TodoSchema = new Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    notes: [
        {
            _id: false,
            id: {
                type: String
            },
            description: {
                type: String
            },
        }
    ],
    isCompleted: {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model('Todo', TodoSchema)