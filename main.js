
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

let blackCat    = new Image();                          // all my cats
let greenCat    = new Image(); 
let tealCat     = new Image();
let pinkCat     = new Image();
let purpleCat   = new Image();
let orangeCat   = new Image();

blackCat.src    = "Black.png";
greenCat.src    = "Green.png";
tealCat.src     = "Teal.png";
pinkCat.src     = "Pink.png";
purpleCat.src   = "Purple.png";
orangeCat.src   = "Orange.png";


// ==== Entities ====
console.log(game.height);
class Prize {
    constructor(x, y, z, width, height, color, cat) {
        this.x          = x;
        this.y          = y;
        this.z          = z;
        this.height     = height;
        this.width      = width;                        // i want the average of this or the base of the claw to
        this.caught     = false;                        
        this.color      = color;

        function hitbox(x,y) {
            return ;
        }

        this.render = function () {
            ctx.fillStyle = this.color;
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
        console.log("something");
        console.log(game.height);
        console.log(claw.y);
        
            claw.y + 10 >= game.height ? (claw.y += 10) : null;
            if (claw.y - 10 >= 0 ? (claw.y -= 10) : null) {     // whille its moving 
                for (let i =0; i < prizes.length; i++){         // make the claw check for colisions
                    hitDetection(claw, prizes[i]);
                }
                if (claw.y === game.height || claw.y < game.height) {
                    claw.y === game.height;
                }                               // returneto moansodfabyuand;basdfgoinoin';pasfdg
            }
            break;
    }
}



// ==== Prize maker ====

function prizeMaker() {         // should give me a random number of prizes starting from 5 all the way up to ten
    // let randInt = Math.floor(Math.random() * 5);
    //randInt = randInt + 5;
    let randInt = 25;
    for(let i = 0; i < randInt; i++){       // adds it tpp the prizes arr
        prizeItem = new Prize;
        prizes.push(prizeItem);
    }

    for(let i = 0; i < prizes.length; i++){
        // let x = Math.floor(Math.random()*50);  // this was for the diffent sizes of prizes but i no do trhat for now
        // let y = Math.floor(Math.random()*50);
        // let pos_x = 0;
        // let pox_y = 1000;
        // prizes[i].x = pos_x;
        // prizes[i].y = pos_y;
    }
}

// ==== Hit Detection ====
let sweet_l, sweet_r;           //  this make it global but didnt wanna put it up there 

function hitDetection(claw, prize) {
    sweet_l = (claw.x + claw.aveWidth)/2;
    sweet_r = (claw.x + 450)/2;
}
    // ==== Time Left ====

    function timeLeft(coins) {
        if (false){ // should check for button press of the coin slot
            time = time + 30;
            return time;
        }
    }