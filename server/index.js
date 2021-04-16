var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'))

app.get('/:id', (req, res) => {
    if (req.params.id == "controller") {
        screenNumber = req.params.id;
        res.sendFile(__dirname + '/public/controller.html');
    }
    else {
        res.sendFile(__dirname + '/public/index.html');
    }

})

io.on('connect', (socket) => {
    console.log(`User connected with id ${socket.id}!`);
})

const port = 8028;
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
