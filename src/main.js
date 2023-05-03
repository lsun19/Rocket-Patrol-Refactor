// LIYU SUN_CMPM 120
// ROCKET PATROL REMASTERED: SIDE 6
// 20 HOURS
/* MOD LISTS:
        Track a high score that persists across scenes and display it in the UI (5)
        Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
        Create 4 new explosion sound effects and randomize which one plays on impact (10)
        Create a new title screen (e.g., new artwork, typography, layout) (10)
        Display the time remaining (in seconds) on the screen (10)
        Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)



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