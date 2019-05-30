const express = require('express');

const server = express();


server.get('/', (req, res) => {
    res.send({message: "Server up and running on Port 8000"})
})



server.listen(8000, () => {
    console.log("Server listening on Port 8000")
})