
// background globals
var canvas = null;
var ctx = null;
var width;
var height;
var ws = null; 
var timerId;
var frame = 0;

var BLACK = "#000000";
var RED = "#FF0000";
var GREEN = "#00FF00";
var BLUE = "#0000FF";
var WHITE = "#FFFFFF";

// game globals
var prevText="";
var typeText="";


function drawText(x,y,clr,text)
{
    ctx.fillStyle = clr;
    ctx.fillText(text,x,y);
};

function drawTyping()
{
    ctx.fillStyle = BLACK;
    var w = 10 + ctx.measureText(prevText+'_').width;
    ctx.fillRect(0,5,w,30);
    prevText = typeText;
    drawText(5,5,WHITE,typeText+"_");
}

function draw()
{
    ctx.fillStyle = BLACK;
    ctx.fillRect(0,0,width,height);

    drawTyping();    

    drawText(200,50,RED,"Hello World");
};

function keydown(evt)
{
    if(evt.key.length==1){
        typeText += evt.key;
        drawTyping();
    }
    else if(evt.key == 'Backspace'){
        if(typeText.length){
            typeText = typeText.substr(0,typeText.length-1);
            drawTyping();
        }
    }
    else if(evt.key == 'Enter'){
        // do something with it?

        typeText = "";
        drawTyping();
    }
    else {
        console.log(evt);
    }

    return true;
}

function interval()
{
    draw();
    frame++;
}

function init()
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
    ctx.textBaseline = 'top';

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

    //document.onkeypress
    document.onkeydown = keydown;

    timerId = setInterval(interval,2000);

    //console.log("end init()");
};

window.onload = init;
//console.log("end game.js");

