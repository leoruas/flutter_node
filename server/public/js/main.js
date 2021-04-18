var socket = io();
var ctx, canvas, nScreens, player;
var hasLoaded = false;
screenNumber = window.location.pathname.substring(1);

//Socket listeners
socket.on("connect", function () {
    //setup canvas/canvas context
    canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext("2d");
    hasLoaded = true;
})

socket.on("update-player", function (pl) {
    player = pl;

    if(hasLoaded) //only draw if loaded info
        updateGameArea();
});

//Js functions
function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    let x = player.x - ((screenNumber - 1) * window.innerWidth); //calculate player x based on screen number
    ctx.fillStyle = player.color;
    ctx.fillRect(x, player.y, player.size, player.size);
};