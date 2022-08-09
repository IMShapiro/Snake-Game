
let GameBtn = document.querySelector("button")
let canv = document.querySelector('canvas');
canv.width = 400
canv.height = 400
let ctx = canv.getContext("2d");

setInterval(game, 1000/10);


let isGameOver = false
let posX = posY = 10;
let width = height = 20;
let appleX = appleY = 15;
let xVelocity = yVelocity = 0;
let trail=[];
let tail= 1;

GameBtn.addEventListener("click",() => {
    newGame()
    console.log("clicked");
})

function newGame(){
    isGameOver = false
    posX = posY = 10;
    trail = []
    tail = 1

    GameBtn.style.display = "none"
}

function gameOver(){
    isGameOver = true
    xVelocity = 0
    yVelocity = 0

    GameBtn.style.display = "block"

    ctx.fillStyle = "maroon"
    ctx.font = "50px serif"
    ctx.fillText("Game Over",10,50,200)
}

function game(){
    posX += xVelocity;
    posY += yVelocity;
    if(posX < 0) {
        posX = height-1;
    }
    if(posX >height-1) {
        posX = 0;
    }
    if(posY <0) {
        posY = height-1;
    }
    if(posY > height-1) {
        posY = 0;
    }
    
    
    ctx.fillStyle ='black';
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle='lime';
    for(var i = 0;i < trail.length;i++){
        ctx.fillRect(trail[i].x*width,trail[i].y*width,width-1,width-1);
        if(trail[i].x == posX && trail[i].y == posY){
            if(tail > 1){
                gameOver()
            }
        }
    }

    trail.push({x:posX,y:posY});
    while(trail.length > tail){
        trail.shift();
    }
    
    if(appleX==posX && appleY==posY){
        tail++;
        appleX = Math.floor(Math.random() * height)
        appleY = Math.floor(Math.random() * height)
    }
    
    ctx.fillStyle='red';
    ctx.fillRect(appleX*width,appleY*width,width-2,width-2);

    ctx.fillStyle = "white"
    ctx.font = "20px Helvetica"
    ctx.fillText(`Score: ${tail-1}`,290,50,100)
}

addEventListener("keydown",(e)=> {
    if(!isGameOver){
        if(e.key == "ArrowLeft" && xVelocity == 0){
                xVelocity = -1;
                yVelocity = 0
        }
        else if(e.key == "ArrowUp" && yVelocity == 0){
            xVelocity = 0; 
            yVelocity = -1
        }
        else if(e.key == "ArrowRight" && xVelocity == 0){
            xVelocity = 1; 
            yVelocity = 0
        }
        else if(e.key == "ArrowDown" && yVelocity == 0){
            xVelocity = 0;
            yVelocity = 1
        }
        }
    }
);
