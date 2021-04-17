const { exec } = require("child_process");
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var nScreens = process.env.NUMBER_OF_SCREENS;
var id;
var test = process.env.MACHINE_1_ID;

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

    socket.on("open-game", function() {
        exec(`ssh -Xnf leoruas@${test} -p 2222 "export DISPLAY=:0; chromium google.com"`);
    });
})

const port = 8028;
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
