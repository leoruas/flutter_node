var socket = io();
var ctx, canvas, nScreens, player;
var hasStarted = false;
screenNumber = window.location.pathname.substring(1);
var player = {
    size: 50,
    x: 0,
    y: 0,
    color: "green",
    speedY: 0,
    speedX: 0,
    speed: 25,
}

//Socket listeners
socket.on("connect", function () {
    //setup canvas/canvas context
    canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext("2d");
    setInterval(updateGameArea, 20);
})

socket.on("update-player", function (pl) {
    player = pl;
});

//Js functions
function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    let x = player.x - ((screenNumber - 1) * window.innerWidth); //calculate player x based on screen number
    ctx.fillStyle = player.color;
    ctx.fillRect(x, player.y, player.size, player.size);
};