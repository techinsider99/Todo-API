const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    URI: process.env.DB_URI
}
