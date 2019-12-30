require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let NODE_ENV
let SECRET

module.exports = {
    MONGODB_URI, 
    PORT,
    NODE_ENV,
    SECRET
}