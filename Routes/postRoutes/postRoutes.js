const express = require('express')

const db = require('../../data/db.js')

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    db.find()
    .then(list => {
        res.send(list)
    })
    .catch(() => {
        res.status(500).json({error: "the posts information could not be received."})
    })
})

server.get('/:id', (req, res) => {
    res.send({message: "id get working"})
})

server.get('/:id/comments', (req, res) => {
    res.send({message: "id comments working"})
})

server.post('/', (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else{
        db.insert(req.body)
        .then(() => {
            res.status(201).json(req.body)
        })
        .catch(() => {
            res.status(500).json({ERROR: 'There was an error adding post to database.'})
        })
    }
})

server.post('/:id/comments', (req, res) => {
    res.send({message: "post id working"})
})

server.delete('/:id', (req, res) => {
    res.send({message: "delete working"})
})
server.put('/:id', (req, res) => {
    res.send({message: "put working"})
})

module.exports = server;