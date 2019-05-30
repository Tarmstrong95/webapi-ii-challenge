const express = require('express');

const postRoutes = require('./Routes/postRoutes/postRoutes.js')

const server = express();

server.use('/api/posts', postRoutes);



server.listen(8000, () => {
    console.log("Server listening on Port 8000")
})