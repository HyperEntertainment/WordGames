
var canvas = null;
var ctx = null;
var width;
var height;


function draw()
{
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "#FF00FF";
    ctx.fillText("Hello World", 200,50);
};

function start()
{
    canvas = document.getElementById("screen");
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";

    draw();
};

window.onload = start;

console.log("here");

