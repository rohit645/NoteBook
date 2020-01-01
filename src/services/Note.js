import React from 'react'
import axios from 'axios'
const baseUrl = '/api/notes'

const token = null

const setToken = (newtoken) => {
	token = `bearer ${newtoken}`
}

const getAll = () => {
	console.log('Just now sent a GET request to server')
	const request = (axios.get(baseUrl))
	console.log('fetching data from server')
	return request.then(response => response.data)
}

const create = (newObject) => {
	
	console.log(`creating new object in server at ${baseUrl}`);
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	console.log('Sent the put request')
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	console.log('successfully made the put request!!')
	return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}
