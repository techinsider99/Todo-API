const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const { URI } = require('./config')
const todoHandler = require('./routes/todo.route')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(URI, options)
.then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('MongoDB Connection error.' + err)
})

app.use(morgan("common"))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/todo', todoHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})