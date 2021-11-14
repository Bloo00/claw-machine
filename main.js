
// ==== GLOBAL DOM / VARIABLES ====
let game                = document.querySelector("#game");         // <canvas>
let movementDisplay     = document.querySelector("#movement");
let ctx                 = game.getContext("2d");                   // this creates a 2 dimensional canvas

ctx.fillStyle           = "white";
ctx.strokeStyle         = "red";
ctx.lineWidth           = 5;


// ==== Canvas sizing ====

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);
console.log(game.width,game.height);
// ==== Variables ====

let coins               = 0;
let gameStart           = false;
let prizes              = [];                          // think this should link to cute images maybe pixel art
let prizesGot           = [];
let time                = 0;                           // adds on per click of the coin slot
let prizeItem;
let claw;

let colors = [ "Black.png","Green.png","Teal.png","Pink.png","Purple.png", "Orange.png" ];

// ==== Entities ====

class Prize {
    constructor(x, y, z, width, height, color) {
        this.x          = x;
        this.y          = y;
        this.z          = z;
        this.height     = height;
        this.width      = width;                        // i want the average of this or the base of the claw to
        this.caught     = false;                  
        let prizeImage  = new Image();
        prizeImage.src  = color;

        function hitbox(x,y) {
            return ;
        }

        this.render = function () {
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(prizeImage, this.x, this.y, this.width, this.height);
        }
    }
}


class Claw {
    constructor(x, y, z, width, height) {
        this.x          = x;
        this.y          = y;
        this.z          = z;
        this. height    = height;
        this.width      = width;                        // i want the average of this or the base of the claw to
        this.caught     = false;
        let clawImg     = new Image();
        clawImg.src     = 'Crane_4.png';

        this.render     = function () {
            //ctx.fillStyle = "#bada55"; // 
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(clawImg, this.x, this.y, this.width, this.height);
        }

        function aveWidth(x) {
            return (x+450)/2;
        }
    }
}

function newClawSize (width, height) {
    claw.width          = width;
    claw.height         = height;
}

class Machine {
    constructor (coins,difficulty,time) {
        this.coins      = coins;
        this.difficulty = difficulty;
        this.time       = time;
    }
}

// ==== Event listener ====

window.addEventListener("load", function(e) {       // should check to see if the dom loaded
    claw = new Claw(20, -300, 0, 450, 700);         // makes a new claw with the size of that
                                                    // the 0 is the z axis and should go to 5
    prizeMaker();
    const runGame = setInterval(gameLoop, 1);       // game loop set at 1 ms
})

// ==== Game Processes ====

function gameLoop() {
    ctx.clearRect(0,0,game.width,game.height);  // clears canvas
    claw.render();                              // makes a new claw
    for(let i = 0; i < prizes.length; i++){
        prizes[i].render();
    }
}

// ==== Movement of the Claw ====

document.addEventListener("keydown", movementHandler);
// document.addEventListener("keyup", movementHandler);

function movementHandler (e) { 
    //console.log("movement", e.key);
    //console.log(e);

    switch(e.key){            
        case "w":                               // wanna mmake it move to the "z" direction  get further 
            if (claw.z === 5){  
                claw.z              = 5;
            }else{
                if (claw.z < 5){
                    claw.z          += 1;
                    claw.height     -= 30;
                    claw.width      -= 30;
                    claw.x          += 15;
                }
            }//claw.y - 10 >= 0 ? (claw.y -= 10) : null;
            break;

        case "a" :              // wanna mmake it move to the "z" direction get futher 
            claw.x - 10 >= 0 ? (claw.x -= 10) : null;
            break;  

        case "s":               
        if (claw.z === 0){  
            claw.z          = 0;
        }else{
            if (claw.z > 0){
                claw.z          -= 1;
                claw.height     += 30;
                claw.width      += 30;
                claw.x          -= 15;
            }
        }
            break;
            
        case "d":               // wanna mmake it move to the "z" direction get closer
            claw.x + 10 <= game.width ? (claw.x += 10) : null;
            break; 

        case " ":               // should make the claw take away a try drop the claw and drop it to the box
            hitDetection(claw, prizes);
            claw.y+700 <= game.height ? (claw.y += 10) : clawReset();
            break;
    }
}

async function clawReset () {
    while(claw.z > 0){
        console.log(claw.z,"z")
        claw.z          -= 1;
        claw.height     += 30;
        claw.width      += 30;
        claw.x          -= 15;
        await sleep(50);
    }
    while(claw.y != -300){
        claw.y-=10;
        await sleep(50);
    }
    while(claw.x != 0){
        claw.x-=10;
        await sleep(50);
    }
}

// ==== Prize maker ====

function prizeMaker() {
    for(let i = 0; i < 25; i++){       // adds it tpp the prizes arr
        let randInt = Math.floor(Math.random() * 5);
        prizeItem = new Prize(0 , 0 ,0 ,300, 300, colors[randInt]);
        prizes.push(prizeItem);
        console.log(prizes[i].prizeImage);
    }
    
}

// ==== Hit Detection ====
let sweet_l, sweet_r;           //  this make it global but didnt wanna put it up there 

function hitDetection(claw, prize) {
    sweet_l = (claw.x + claw.aveWidth)/2;
    sweet_r = (claw.x + 450)/2;
}
// ==== Time Left ====

// function timeLeft(coins) {
//     if (false){ // should check for button press of the coin slot
//         time = time + 30;
//         return time;
//     }
// }
// ==== slows down the loops if i need ====

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }