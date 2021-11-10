
// ==== GLOBAL DOM / VARIABLES ====
let game                = document.querySelector("#game");         // <canvas>
let movementDisplay     = document.querySelector("#movement");
let ctx                 = game.getContext("2d");                   // this creates a 2 dimensional canvas

ctx.fillStyle           = "white";
ctx.strokeStyle         = "red";
ctx.lineWidth           = 5;

// ==== Canvas Rendering ====

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);




// ==== Variables ====

let coins               = 0;
let gameStart           = false;
let prizes              = [];                          // think this should link to cute images maybe pixel art
let prizesGot           = [];
// ==== Entities ====

class Prize {
    constructor(x, y, z, width, height) {
        this.x          = x;
        this.y          = y;
        this.z          = z;
        this.height     = height;
        this.width      = width;                        // i want the average of this or the base of the claw to
        this.caught     = false;                        
        

        function aveWidth(x, width) {
            return (x+width)/2;
        }
        
        this.render = function () {
            ctx.fillStyle = '#09F'; 
            ctx.fillRect(this.x, this.y, this.width);
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

        this.render = function () {
            ctx.fillStyle = "#bada55"; // 
            ctx.fillRect(this.x, this.y, this.width);
        }

        function aveWidth(x, width) {
            return (x+width)/2;
        }
    }
}

class Machine {
    constructor (coins,difficulty,time) {
        this.coins      = coins;
        this.difficulty = difficulty;
        this.time       = time;
    }
}

// ==== Event listener ====

window.addEventListener("DOMcontentLoaded", function(e) {
    let claw = new Claw(10, 10, 0, 50, 50);

    const runGame = setInterval(gameLoop(), 120); 
})

// ==== Movement of the Claw ====

document.addEventListener("keydown", movementHandler);

function movementHandler (e) {
    console.log("movement", e.key);
    console.log(e);

    switch(e.key){            
        case "w":               // wanna mmake it move to the "z" direction  get further 
            claw.y - 10 >= 0 ? (claw.y -= 10) : null;
            break;

        case "a" :              // wanna mmake it move to the "z" direction get futher 
            claw.x - 10 >= 0 ? (claw.x -= 10) : null;
            break;  

        case "s":               
            claw.y + 10 <= game.width ? (claw.y += 10) : null; // should increase the size of the pic so look 3d
            break;

        case "d":               // wanna mmake it move to the "z" direction get closer
            claw.x + 10 <= game.width ? (claw.x += 10) : null;
            break;
    }
    
}

// ==== Game Processes ====

function gameLoop() {
    ctx.clearRect(0,0,game.width,game.height);  // clears canvas

    claw.render();

}

// ==== Prize maker ====

function prizeMaker() {
    let randInt = Math.floor(Math.random() * 5);
    randInt = randInt + 5;
    for(let i = 0; i < randInt; i++){
        let newPrize = new Prize;
        prizes.push(newPrize);
    }
}

// ==== Hit Detection ====

function hitDetection(claw, prizes) {
    for(let i=0; i < prizes.length; i++) {
        if(claw.aveWidth = prizes[i].aveWidth){

        }
    }
}
// ==== Time Left ====

function timeLeft(coins) {
    if (false){

    }
}


// ==== Time Left on Machine ====

// function countDown(){
//     currentTime-- // var subtracts from the time left
//     if (currentTime == 0){
//         clearInterval()

//     }
// } 