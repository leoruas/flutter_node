const { exec } = require("child_process");

//config for env file
const dotenv = require('dotenv');
dotenv.config();

//server config
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var nScreens = process.env.NUMBER_OF_SCREENS;
var id;
var machine1ID = process.env.MACHINE_1_ID;
var machine2ID = process.env.MACHINE_2_ID;

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
        exec(`ssh -Xnf leoruas@${machine1ID} -p 2222 "export DISPLAY=:0; chromium-browser --start-fullscreen google.com"`); //open in machine 1
        exec(`ssh -Xnf leoruas@${machine2ID} -p 2222 "export DISPLAY=:0; chromium-browser --start-fullscreen google.com"`); //open in machine 2
    });
})

const port = 8028;
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
