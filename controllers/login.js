const jwt = require('jsonwebtoken')
const loginRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRoute.post('/', async(req, res) => {
    const body = req.body
    console.log('hey i recieved your login request!')
    const user = await User.findOne({username: body.username})
    const passwordValid = user === null 
    ? false 
    : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && passwordValid)) {
        res.status(401).json({
            error: 'invalid username or password!'
        })
    }
    
    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    res
    .status(200)
    .send({
        token, username: user.username, name: user.name
    })
})

module.exports = loginRoute