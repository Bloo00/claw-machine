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
let hitPrize = 0;

let colors = [ "images/Black.png","images/Green.png","images/Teal.png","images/Pink.png","images/Purple.png", "images/Orange.png" ];

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
        clawImg.src     = 'images/Crane_4.png';

        this.render     = function () {
            ctx.drawImage(clawImg, this.x, this.y, this.width, this.height);
        }
    }
    aveWidth() {
        return (this.x + this.x + this.width)/2;
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
    claw_0 = new Claw(20, -1000, 0, 300, 1400);         // makes a new claw with the size of that
                                                    // the 0 is the z axis and should go to 5
    prizeMaker();
    const runGame = setInterval(gameLoop, 1);       // game loop set at 1 ms
    
})

// ==== Game Processes ====

function gameLoop() {
    renderScene(claw_0.z);                             // makes a new claw
}

// ==== Movement of the Claw ====

document.addEventListener("keydown", movementHandler);

function movementHandler (e) { 

    switch(e.key){            
        case "w":              // wanna mmake it move to the "z" direction  get further 
            if (claw_0.z === 3){  
                claw_0.z              = 3;
            }else{
                if (claw_0.z < 3){
                    claw_0.z          += 1;
                    claw_0.height     -= 25;
                    claw_0.width      -= 25;
                    claw_0.x          += 15;
                    claw_0.y          -= 50;
                }
            }
            break;

        case "a" :              // wanna mmake it move to the "z" direction get futher 
            claw_0.x - 10 >= 0 ? (claw_0.x -= 10) : null;
            break;  

        case "s":               
        if (claw_0.z === 0){  
            claw_0.z   = 0;
        }else{
            if (claw_0.z > 0){
                claw_0.z          -= 1;
                claw_0.height     += 25;
                claw_0.width      += 25;
                claw_0.x          -= 15;
                claw_0.y          += 50;
            }
        }
            break;
            
        case "d":               // wanna mmake it move to the "z" direction get closer
            claw_0.x + 10 <= game.width ? (claw_0.x += 10) : null;
            break; 

        case " ":               // should make the claw take away a try drop the claw and drop it to the box
            let gotCat = false;
            hitDetection(claw_0, prizes);
            if(gotCat != true){
                claw_0.y+1750 <= prizes[hitPrize].y + prizes[hitPrize].y+prizes[hitPrize].height
                 ? (claw_0.y += 10) : clawReset();
            }
            if(claw_0.y + 1400 >= game.height){
                claw_0.y+1450 <= game.height ? (claw_0.y += 10) : clawReset();
            }
            break;
    }
}
// ==== claw reseter ====
async function clawReset () {
    if (true) {
        while (claw_0.y > -1000){
        claw_0.y -= 10;
        await sleep(50);
        }
        while (claw_0.x > 0){
            claw_0.x -= 10;
            await sleep(50);
        }
        while (claw_0.z > 0){
            claw_0.z          -= 1;
            claw_0.height     += 30;
            claw_0.width      += 30;
            claw_0.x          -= 15;
            claw_0.y          += 50;
        }
    console.log(hitPrize, "wonk");
    console.log(claw_0.y+1400) //// work on this
    console.log(prizes[hitPrize].y);
    if (claw_0.caught) {
        console.log("yes");
        while (claw_0.y > -1000){
            prizes[hitPrize].y -= 10;
            await sleep(50);
            }
            while (claw_0.x > 0){
                prizes[hitPrize].x -= 10;
                await sleep(50);
            }
            while (claw_0.z > 0){
                prizes[hitPrize]          -= 1;
                claw_0.height     += 30;
                claw_0.width      += 30;
                prizes[hitPrize].x          -= 50;
                prizes[hitPrize].y          += 50;
            }
            gotCat = false;
    }
    
    //await sleep(50);
    //console.log(prizes[hitPrize].x,prizes[hitPrize].y)
    }
}       
    

// ==== Prize maker ====

function prizeMaker() {
    for(let i = 0; i < 25; i++){       // adds it tpp the prizes arr
        let randInt = Math.floor(Math.random() * 5);
        prizeItem = new Prize(0, 0, 0, 210, 210, colors[randInt]);
        prizes.push(prizeItem);
    }
    // make the cats apear
    let j = 0;
    for(let i = 24; i > 19; i--){        // makes the posioitioning
        prizes[i].x = (game.width/6)+j*250; // very front
        j+=1;
        prizes[i].y = 700;
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
        //console.log(prizes[i].x);
        prizes[i].y = 500;
    }
        j = 0;
    for(let i = 5; i >= 0; i--){        // makes the posioitioning
        prizes[i].z = 3;// give me a z axix
        prizes[i].width -= 90;
        prizes[i].height -= 90;
        prizes[i].x = ( game.width/5 + j*180);
        j+=1;
        prizes[i].y = 450;
    }
    console.log(prizes);
}

// ==== Hit Detection ====

function hitDetection(claw_0, prizes) {
    for(let i = 0; i < prizes.length; i++){
        // console.log(claw_0.aveWidth() > prizes[i].x + 20);
        // console.log(claw_0.aveWidth() < (prizes[i].x + prizes[i].width-20));
        // console.log(claw_0.z == prizes[i].z);
        // console.log(claw_0.y - claw_0.height - 200 < prizes[i].height+100, "4");
        // console.log();
        

        if( claw_0.aveWidth() > prizes[i].x + 20 && 
            claw_0.aveWidth() < (prizes[i].x + prizes[i].width-20) && 
            claw_0.z == prizes[i].z &&
            claw_0.y - claw_0.height-400 < prizes[i].height){

                claw_0.caught = true;
                gotCat = true;
                hitPrize = i;
                //clawAnimatoin(claw_0);
        }
    }
    return 0;
}

async function clawAnimatoin (claw_0){
    if(clawReset.caught){
        claw_0.clawImg.src     = 'images/Crane_4.png';
        await sleep(100);
        claw_0.clawImg.src     = 'images/Crane_3.png';
        await sleep(100);
        claw_0.clawImg.src     = 'images/Crane_2.png';
        await sleep(100);
        claw_0.clawImg.src     = 'images/Crane_1.png';
        await sleep(100);
    }
}


// ==== slows down the loops if i need ====

function sleep(ms) {                                            // gets a number val and uses that to make the the code wait the amount of time before going again
    return new Promise(resolve => setTimeout(resolve, ms));
  }
// ==== renders the whole thing a gain to get the layer right ====
function renderScene(z) {
	let renderedClaw = false;
	ctx.clearRect(0,0,game.width,game.height);  // clears canvas
	for(let i = 0; i < prizes.length; i++) {
        prizes[i].render();
		if(z === prizes[i].z && !renderedClaw) {
			claw_0.render(); 
			renderedClaw = true;
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