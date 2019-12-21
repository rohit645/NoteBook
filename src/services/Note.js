import React from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = (axios.get(baseUrl))
    const dummy = {
        id: 56,
        content: 'This data doesnt exist in the database',
        date: new Date().toISOString(),
        important: Math.random() > 0.5
    }
    console.log('fetching dataa from server')
    return request.then(response => response.data.concat(dummy))
}

const create = (newObject) => {
    console.log(`creating new object in server at ${baseUrl}`);
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}
