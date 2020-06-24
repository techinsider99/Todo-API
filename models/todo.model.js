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
    isCompleted: {
        type: Boolean
    }
})

module.exports = mongoose.model('Todo', TodoSchema)