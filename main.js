
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

// ==== makes the canvas ====



// ==== variables ====

let coins       = 0;
let gameStart   = false;
let prizes      = [];                                   // think this should link to cute images maybe pixel art

// ==== Entities ====

class prize {
    constructor(x, y, width, height) {
        this.x          = x;
        this.y          = y;
        this.color      = color;
        this. height    = height;
        this.width      = width;                        // i want the average of this or the base of the claw to
        this.caught     = false;                          // be the hitbox of it

        this.render = function () {
            ctx.fillStyle = this.color; // changes color for now but i wanna have a pixel claw
            ctx.fillRect(this.x, this.y, this.width);
        }
    }
}

// ==== movement of the claw ====

document.addEventListener("keydown", movementHandler);

function movementHandler (e) {
    console.log("movement", e.key);
    console.log(e);

    switch(e.key){            
        case "w":               // wanna mmake it move to the "z" direction  get further 

            break;

        case "a":               

            break;  
            
        case "s":               

            break;

        case "d":               // wanna mmake it move to the "z" direction get closer
                                //
            break;
    }
    
}

