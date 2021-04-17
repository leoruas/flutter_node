var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var id;
var myArgs = process.argv.slice(2);
var nScreens = Number(myArgs[0]);

if(myArgs.length == 0 || isNaN(nScreens)) {
    console.log("Number of screens invalid or not informed, default number is 2.")
    nScreens = 2;
}

app.use(express.static(__dirname + '/public'))

app.get('/:id', (req, res) => {
    id = req.params.id
    if (id == "controller") {
        screenNumber = req.params.id;
        res.sendFile(__dirname + '/public/controller.html');
    }
    else {
        res.sendFile(__dirname + '/public/index.html');
    }

})

let breakpoint;
io.on('connect', (socket) => {
    console.log(`User connected with id ${socket.id}!`);

    socket.emit('new-screen', {id, nScreens, breakpoint});

    socket.on("update-player", function(player) {
        io.emit("update-player", player);
    });

    socket.on("set-breakpoint", function(bp) {
        breakpoint = bp;
    })
})

const port = 8028;
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
