
// ==== GLOBAL DOM / VARIABLES ====
let game                = document.querySelector("#game");         // <canvas>
let movementDisplay     = document.querySelector("#movement");
let ctx                 = game.getContext("2d");                   // this creates a 2 dimensional canvas

ctx.fillStyle =     "white";
ctx.strokeStyle =   "red";
ctx.lineWidth =     5;

// ==== canvas rendering ====
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);




// ==== variables ====

let coins               = 0;
let gameStart           = false;
let prizes              = [];                          // think this should link to cute images maybe pixel art
// ==== Entities ====

class Prize {
    constructor(x, y, z, width, height) {
        this.x          = x;
        this.y          = y;
        this.z          = z;
        this. height    = height;
        this.width      = width;                        // i want the average of this or the base of the claw to
        this.caught     = false;                        
        

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
            ctx.fillStyle = yellow; // 
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

// ==== movement of the claw ====

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

// ==== game processes ====
function gameLoop() {
    ctx.clearRect(0,0,game.width,game.height);  // clears canvas

    claw.render();
}

// ==== Event listener ====

window.addEventListener("DOMcontentLoaded", function(e) {
    let claw = new Claw(10, 10, 0, 50, 50);

    const runGame = setInterval(gameLoop, 120); 
})

// ==== time left on machine ====

// function countDown(){
//     currentTime-- // var subtracts from the time left
//     if (currentTime == 0){
//         clearInterval()

//     }
// } 