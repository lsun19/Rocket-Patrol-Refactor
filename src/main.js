// LIYU SUN_CMPM 120
// ROCKET PATROL REMASTERED: SIDE 6
// 25-30 HOURS
/* MOD LISTS:
    5-Point Tier
        Track a high score that persists across scenes and display it in the UI (5)
        Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
        Implement the 'FIRE' UI text from the original game (5)
        Create a new scrolling tile sprite for the background (5)
    10-Point Tier
        Create 4 new explosion sound effects and randomize which one plays on impact (10)
        Create a new title screen (e.g., new artwork, typography, layout) (10)
        Display the time remaining (in seconds) on the screen (10)
        Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
    15-Point Tier
        Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
        Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
        Implement mouse control for player movement and mouse click to fire (15)
    God Tier
        Add new rocketship sprite that fires the rocket
        Double the music playrate after 30 seconds

   CITATIONS:
        Menu Art        : https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/sprites/create%20from%20config.js
        Play Music      : https://github.com/photonstorm/phaser3-examples/blob/master/public/src/audio/Web%20Audio/play%20audio%20file.js
        Timer           : https://github.com/photonstorm/phaser3-examples/blob/master/public/src/time/timer%20event.js
*/

let config =
{
    type    : Phaser.AUTO,
    width   : 640,
    height  : 480,
    scene   : [Menu, Play] 
}

let game = new Phaser.Game(config);

// set variable for best score
let p1ScoreBest = 0;

// set UI sizes
let borderUISize    = game.config.height / 15;
let borderPadding   = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;