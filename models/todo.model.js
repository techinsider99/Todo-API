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
    notes: {
        type: Array,
        default: []
    },
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