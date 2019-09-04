var cvs = document.getElementById("thecanvas");
var ctx = cvs.getContext("2d");
var bg = new Image();
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var floor = new Image();
var score = new Audio();
var fly = new Audio();
fly.src = "./sounds/fly.mp3"
score.src = "./sounds/score.mp3"
bird.src = "./image/bird.png"
bg.src = "./image/bg.png";
floor.src = "./image/fg.png";
pipeNorth.src = "./image/pipeNorth.png";
pipeSouth.src = "./image/pipeSouth.png";
var floory = 370;
var Pipe = [];

Pipe[0] = {
    width: 320,
    height: ((Math.random() + 2) * 100) - 350
};
var cache=0;
var K = 150;
var move = [];
move[0] = {
    width: 0
}

function draw() {
    if (move[move.length - 1].width > 0) {
        move.push({
            width: -290
        })
    }

    for (var i = 0; i < move.length; i++) {
        ctx.drawImage(bg,move[i].width,0);
    }
    for (var i = 0; i < Pipe.length; i++) {
        if(Pipe[i].width == 30)
        {
            score.play();
        }
        ctx.drawImage(pipeNorth, Pipe[i].width, Pipe[i].height);
        ctx.drawImage(pipeSouth, Pipe[i].width, Pipe[i].height + 350);
        Pipe[i].width--;
        if (Pipe[Pipe.length - 1].width <= 180) {
            Pipe.push({
                width: 320,
                height: ((Math.random() + 2) * 100) - 350
            })
        }
    }
    for( var i = 0 ; i < move.length ; i++){
        ctx.drawImage(floor,move[i].width,370);
        move[i].width++;
    }
    ctx.drawImage(bird,30,K);
    if(cache>0)
    {
        K-=5;
        cache--;      
    }
    else
    {
        K *= 1.025;
        cache = 0;
    }
    function setclick(){
        fly.play();
        cache=10;
    }
    if(K>350)
        return 0;
    document.getElementById("thecanvas").addEventListener("click",setclick);
    console.log("cache " +cache);
    requestAnimationFrame(draw);
}
draw();