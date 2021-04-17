var socket = io();
var ctx, canvas;
player = {
    size: 30,
    x: 0,
    y: 0,
    color: "green",
    speedY: 0,
    speedX: 0,
    speed: 10,
}
var keys = [];
var nScreens;

//Socket listeners
socket.on('new-screen', function (payload) {
    //get number of screens
    nScreens = payload.nScreens;

    //canvas/canvas context setup
    canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext("2d");

    //keyboard event listeners
    window.addEventListener('keydown', function (e) {
        keys[e.key] = true;
    })

    window.addEventListener('keyup', function (e) {
        keys[e.key] = false;
    })

    setInterval(updateGameArea, 20); //update game area every 20ms

    socket.emit("set-breakpoint", window.innerWidth / nScreens); //get breakpoint value
})

//Js functions
function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    //update player position based on key press
    checkKeys();
    player.x += player.speedX;
    player.y += player.speedY;
    socket.emit("update-player", player);

    
    //draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
};

function checkKeys() {
    //initialize on 0
    player.speedX = 0;
    player.speedY = 0;

    //change horizontal/vertical speed based on keys pressed
    if (keys["ArrowUp"]) {
        player.speedY = -player.speed;
    }
    if (keys["ArrowDown"]) {
        player.speedY = player.speed;
    }
    if (keys["ArrowRight"]) {
        player.speedX = player.speed;

    }
    if (keys["ArrowLeft"]) {
        player.speedX = -player.speed;
    }
};