
var canvas = null;
var ctx = null;
var width;
var height;
var ws = null; 

function drawText(x,y,text)
{
    ctx.fillStyle = "#FF00FF";
    ctx.fillText(text,x,y);
};

function draw()
{
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,width,height);
    drawText(200,50,"Hello World");
};


function start()
{
    if (!("WebSocket" in window)) {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
        return;
    }

    canvas = document.getElementById("screen");
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";

    var ws = new WebSocket("ws://localhost:8765/echo");
        
    ws.onopen = function() {
       // Web Socket is connected, send data using send()
       ws.send("I sent asdf");
    };
    
    ws.onmessage = function (evt) { 
       var msg = evt.data;
       console.log("Recieved",msg);
    };
    
    ws.onclose = function() { 
       // websocket is closed.
       console.log("Connection closed");
    };

    draw();
};

window.onload = start;

console.log("here");

