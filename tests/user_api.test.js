const User = require('../models/user')
const helper = require('./user_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('When initially there is one user in the database', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        const newUser = new User({username: "root", password: "confidential"})
        await newUser.save()
    })

    test('should be able to create a fresh user', async() => {
        const usersAtStart = await helper.allUsers()

        const newUser = new User({
            username: "tourist",
            name: "gennady",
            password: "Iamgod"
        })

        await api.post('/api/users')
                 .send(newUser)
                 .expect(200)
                 .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.allUsers()
        const usernames = usersAtEnd.map(u => u.username)
        expect(usersAtEnd.length).toBe(usersAtStart.length+1)
        expect(usernames).toContain(newUser.username)
    });
       

});
