
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
let claws               =[];

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
            ctx.drawImage(clawImg, this.x, this.y, this.width, this.height);
        }
        function aveWidth() {
            return (this.x+450)/2;
        }
    }
}

function newClawSize (width, height) {
    claw_0.width          = width;
    claw_0.height         = height;
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
    claw_0 = new Claw(20, -300, 0, 450, 700);         // makes a new claw with the size of that
    claw_1 = new Claw(20, -300, 1, 450, 700);
    claw_2 = new Claw(20, -300, 2, 450, 700);
    claw_3 = new Claw(20, -300, 3, 450, 700);
    claw_4 = new Claw(20, -300, 4, 450, 700);
    claw_5 = new Claw(20, -300, 5, 450, 700);
                                                    // the 0 is the z axis and should go to 5
    prizeMaker();
    const runGame = setInterval(gameLoop, 1);       // game loop set at 1 ms
    
})

// ==== Game Processes ====

function gameLoop() {
    ctx.clearRect(0,0,game.width,game.height);  // clears canvas
    for(let i = 5; i >= 0; i--){        // back
        prizes[i].render();
        claw_4.render();
    }    
    for(let i = 12; i > 5; i--){        // 3
        prizes[i].render();
        claw_3.render();
    }
    for(let i = 19; i > 12; i--){        // 2
        prizes[i].render();
        claw_2.render();
    }
    for(let i = 24; i > 19; i--){        // front
        prizes[i].render();
        claw_1.render();
    }
    

    claw_0.render();                              // makes a new claw
}

// ==== Movement of the Claw ====

document.addEventListener("keydown", movementHandler);

function movementHandler (e) { 

    switch(e.key){            
        case "w":              // wanna mmake it move to the "z" direction  get further 
            if (claw_0.z === 5){  
                claw_0.z              = 5;
            }else{
                if (claw_0.z < 5){
                    claw_0.z          += 1;
                    claw_0.height     -= 30;
                    claw_0.width      -= 30;
                    claw_0.x          += 15;
                }
            }
            break;

        case "a" :              // wanna mmake it move to the "z" direction get futher 
            claw_0.x - 10 >= 0 ? (claw_0.x -= 10) : null;
            break;  

        case "s":               
        if (claw_0.z === 0){  
            claw_0.z          = 0;
        }else{
            if (claw_0.z > 0){
                claw_0.z          -= 1;
                claw_0.height     += 30;
                claw_0.width      += 30;
                claw_0.x          -= 15;
            }
        }
            break;
            
        case "d":               // wanna mmake it move to the "z" direction get closer
            claw_0.x + 10 <= game.width ? (claw_0.x += 10) : null;
            break; 

        case " ":               // should make the claw take away a try drop the claw and drop it to the box
            hitDetection(claw_0, prizes);
            claw_0.y+700 <= game.height ? (claw_0.y += 10) : clawReset();
            break;
    }
}
// ==== Makes it go slower
async function clawReset () {
    while(claw_0.z > 0){
        claw_0.z          -= 1;
        claw_0.height     += 30;
        claw_0.width      += 30;
        claw_0.x          -= 15;
        await sleep(50);
    }
    while(claw_0.y != -300){
        claw_0.y-=10;
        await sleep(50);
    }
    while(claw_0.x != 0){
        claw_0.x-=10;
        await sleep(150);
    }
}

// ==== Prize maker ====

function prizeMaker() {
    for(let i = 0; i < 25; i++){       // adds it tpp the prizes arr
        let randInt = Math.floor(Math.random() * 5);
        prizeItem = new Prize(0 , 0 ,0 ,300, 300, colors[randInt]);
        prizes.push(prizeItem);
    }
    // make the cats apear
    let j = 0;
    for(let i = 24; i > 19; i--){        // makes the posioitioning
        prizes[i].x = (game.width/5)+j*200; // very front
        j+=1;
        prizes[i].y = 650;
    }
        j = 0;
    for(let i = 19; i > 12; i--){        // makes the posioitioning
        prizes[i].z = 1;// give me a z axix
        prizes[i].width -= 30;
        prizes[i].height -= 30;
        prizes[i].x = ( j*200);
        console.log(prizes[i].x);
        j+=1;
        prizes[i].y = 600;
    }
        j = 0;
    for(let i = 12; i > 5; i--){        // makes the posioitioning
        prizes[i].z = 2;// give me a z axix
        prizes[i].width -= 60;
        prizes[i].height -= 60;
        prizes[i].x = ( j*180);
        j+=1;
        console.log(prizes[i].x);
        prizes[i].y = 550;
    }
        j = 0;
    for(let i = 5; i >= 0; i--){        // makes the posioitioning
        prizes[i].z = 3;// give me a z axix
        prizes[i].width -= 90;
        prizes[i].height -= 90;
        prizes[i].x = ( game.width/5 + j*180);
        j+=1;
        prizes[i].y = 500;
    }
}

// ==== Hit Detection ====
let sweet_l = 0;           //  this make it global but didnt wanna put it up there 
let sweet_r = 0;
function hitDetection(claw, prizes) {
    sweet_l = (claw.x + claw.aveWidth)/2;
    sweet_r = (claw.aveWidth + 450)/2;
    console.log(claw.x, sweet_l,sweet_r,claw.width+claw.x);
    for(let i =0; i < prizes.length; i++){
       if (sweet_r < prizes.width && sweet_l < prizes.width + 450 && claw.z === prizes[i].z
        && claw.y + 700){
        console.log("hi braylin");
        } 
    }
}
// ==== Time Left ====

// function timeLeft(coins) {
//     if (false){ // should check for button press of the coin slot
//         time = time + 30;
//         return time;
//     }
// }

// ==== slows down the loops if i need ====

function sleep(ms) {                                            // gets a number val and uses that to make the the code wait the amount of time before going again
    return new Promise(resolve => setTimeout(resolve, ms));
  }