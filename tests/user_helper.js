const User = require('../models/user')

const allUsers = async() => {
    const users = await User.find({})
    return users
}

module.exports = {
    allUsers
}