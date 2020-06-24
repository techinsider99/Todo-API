const dotenv = require('dotenv')
dotenv.config({
    path: './.env'
})

module.exports = {
    URI: process.env.DB_URI
}
