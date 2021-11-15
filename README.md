# claw-machine
game for sei 1025


Catching Novas

This is my project claw machine game. Was made for the class and my friend who wanted me to make her a game for her stream that was pay to play.
I wanted the game to be like real life claw machine where you add coins which would extend a timer and give you an attempt, also I wanted the game to
show all the prizes that you have got and if you got them all I wanted to show a congradulation screen. Going into this I thought the game would be really simple but 
it turns out collisions are tough and you run into so many more bugs than you thought. Though even with all that I had fun coding even getting frustared at the 
bugs I made was kind of interesting.

How to play
got to https://bloo00.github.io/claw-machine/
Or, fork and clone this repository and open the index.html file or use a Live Server plug-in

Languages and Tools
Vanilla Javascript
HTML5 Canvas
CSS

Key Elements

1) the "z" axis. Because the canvas is a 2d space and I wanted a 3d claw machine I had to force perspective by increasing the size of the claw and prizes or shrink it when moving back wards.

    to make the objects shrink and grow I basicly by trial and error and chose what looked the best
    i made the each row get incermntally smaller the further it went back
    ```
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
    ```

2) hit detectoin 

    was the hardest time for me.
    with the images having a transpent border it made it so that it was very hard to find out the hit box of them.
    i spent way to much time on this then i would like to admit.
    ```
    function hitDetection(claw, prizes) {
    console.log('im runnig');

    for(let i = 0; i <prizes.length; i++){
        if(claw_0.aveWidth() > prizes[i].x && 
                claw_0.aveWidth() < prizes[i].x + prizes[i].width && 
                claw_0.z === prizes[i].z &&
                claw_0.y - claw_0.height < prizes[i].height){
                    claw_0.caught = true;
                    return i;
        }
    }
}
    ```

3) reseting the claw and moving the prizes

    i needed the claw to move back after it would hit the floor or touch the sweet spot of the prize.
    i accomplished this on by haveing the claw check and loop between all the prizes and to see if it would hit the floor
    and if it did i would make the claw auto maticly come up go to the left and bring it "foward"

    ```
    async function clawReset () {

    while (claw_0.y > -1000){
    claw_0.y -= 10;
    await sleep(50);
    }
    while (claw_0.x > 0 ){
        claw_0.x -= 10; 
        await sleep(50);
    }
    while (claw_0.z > 0) {
        claw_0.z          -= 1;
        claw_0.height     += 30;
        claw_0.width      += 30;
        claw_0.x          -= 15;
        claw_0.y          += 50;


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
    ```

4)  the cats and claw

    because the cats and the claw had to be rendered in a specific order to keep the illusion of 3d i needed to render
    the scene again when ever i would move the claw in the z axix
    made a loop to check to re render all the assests and show them on correctly according the the z value
```
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
```

what i couldnt do and thing that dont work currently

1) i couldnt impement they timer and coin system 
    if i could i would have wanted the player to have put in a coin to attemt a try and give them 60 seconds to complete a run.
    and if the timer ran out i would like the claw to attempt a grab and reset
    and if they ran out of points i would like the claw to display a mesage

2) prize catcher
    i wanted all the novas you caught to show up on a display at the bottom of the screen 
    thats all

3) the css
    i really wanted to make this look like a cute pixel and retro themed claw machine but i just ran out of time