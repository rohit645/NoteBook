const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(req, res, next) => {
    try{
        const body = req.body
        const saltrounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltrounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        res.json(savedUser) 
    } catch(exception){
        next(exception)
    }

})

module.exports = usersRouter