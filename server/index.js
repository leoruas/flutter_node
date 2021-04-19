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
var serverIp = process.env.SERVER_IP;
var player = {
    size: 50,
    x: 0,
    y: 0,
    color: "green",
    speedY: 0,
    speedX: 0,
    speed: 25,
}

app.use(express.static(__dirname + '/public'))

app.get('/:id', (req, res) => {
    id = req.params.id

    res.sendFile(__dirname + '/public/index.html');
})

let breakpoint;
io.on('connect', (socket) => {
    console.log(`User connected with id ${socket.id}!`);

    socket.on("update-player", function (dir) {
        switch (dir) {
            case "up":
                player.y -= player.speed;
                break;
            case "down":
                player.y += player.speed;
                break;
            case "right":
                player.x += player.speed;
                break;
            case "left":
                player.x -= player.speed;
                break;
        };
        
        io.emit("update-player", player);
    });

    socket.on("set-breakpoint", function (bp) {
        breakpoint = bp;
    })

    socket.on("open-game", function () {
        exec(`ssh -Xnf leoruas@${machine1ID} "export DISPLAY=:0; chromium-browser http://${serverIp}:8028/1"`); //open in machine 1
        exec(`ssh -Xnf leoruas@${machine2ID} "export DISPLAY=:0; chromium-browser http://${serverIp}:8028/2"`); //open in machine 2
    });
})

const port = 8028;
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
