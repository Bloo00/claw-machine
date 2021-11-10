
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
let time                = 0;                           // adds on per click of the coin slot
let prize;
let claw;
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
            ctx.fillRect(this.x, this.y, this.width, this.height);
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

        this.render     = function () {
            ctx.fillStyle = "#bada55"; // 
            ctx.fillRect(this.x, this.y, this.width, this.height);
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

window.addEventListener("load", function(e) {       // should check to see if the dom loaded
    claw = new Claw(10, 10, 0, 50, 50);                  // makes a new claw with the size of that
                                                                // the 0 is the z axis and should go to 5
    const runGame = setInterval(gameLoop, 120);               // game loop set at 120 ms
    console.log(claw);
})

// ==== Game Processes ====

function gameLoop() {
    ctx.clearRect(0,0,game.width,game.height);  // clears canvas
    for (let i = 0; i < prizes.length; i++) {
        prizes[i].render();
    }
    claw.render();           // makes a new claw

}

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



// ==== Prize maker ====

function prizeMaker() {         // should give me a random number of prizes starting from 5 all the way up to ten
    let randInt = Math.floor(Math.random() * 5);
    randInt = randInt + 5;
    for(let i = 0; i < randInt; i++){
        prize = new Prize;
        prizes.push(prize);
    }

}

// ==== Hit Detection ====

function hitDetection(newClaw, prizes) {
    for(let i=0; i < prizes.length; i++) {
        if(newClaw.aveWidth = prizes[i].aveWidth){

        }
    }
}
    // ==== Time Left ====

    function timeLeft(coins) {
        if (false){ // should check for button press of the coin slot
            time = time + 30;
            return time;
        }
    }