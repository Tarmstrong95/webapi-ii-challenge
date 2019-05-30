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
    db.findById(req.params.id)
    .then((i) => {
        if(i.length > 0){
            res.send(i[0])
        }else{
            res.status(404).json({message: "The post with the ID does not exist"})
        }
    }).catch(() => res.status(500).json({error: "the post could not be retrieved."}))
})

server.get('/:id/comments', (req, res) => {
        db.findPostComments(req.params.id)
        .then((i) => {
            if(i.length > 0){
                res.send(i)
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(() => {
            res.status(500).json({error: "the comments information could not be retrieved."})
        })
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
    if(!req.body.text){
        res.status(400).json({errorMessage: "please provide text for the comment"})
    }else{
        const body = req.body;
        body.post_id = req.params.id;
        db.findById(req.params.id)
        .then((i) => {
            if(i.length > 0){
                db.insertComment(req.body)
                .then((i) => {
                    res.status(201).json(req.body)
                })
                .catch(() => {
                    res.status(500).json({error: "there was an error while saving the comment"})
                })
            }else{
                res.status(404).json({message: "the post with ID does not exist"})
            }
        })
        .catch(() => {
            res.status(500).json({error: "Failed to retrieve data"})
        })
    }
})

server.delete('/:id', (req, res) => {
    db.findById(req.params.id)
    .then((i) => {
        if(i.length > 0){
            db.remove(req.params.id)
            .then((i) => {
                res.send(i)
            }).catch(() => res.status(500).json({error: "the post could not be removed."}))
        }else{
            res.status(404).json({message: "the comment does not exist"})
        }
    }).catch(() => {
        res.status(500).json({error: "ran in to some server issues"})
    })
})

server.put('/:id', (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "please provide title and contents for the post"})
    }else{
        db.findById(req.params.id)
        .then(post => {
            if(post.length > 0){
                db.update(req.params.id, req.body)
                .then(() => {
                    res.send(req.body)
                })
                .catch(() => {
                    res.status(500).json({error: "the post information could not be modified"})
                })
            }else{
                res.status(404).json({error: "the post could not be found"})
            }
        })
        .catch(() => {
            res.status(500).json({error: "Failed to retrieve data from the database"})
        })
        
    }
})

module.exports = server;