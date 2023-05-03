// LIYU SUN_CMPM 120
// ROCKET PATROL REMASTERED: SIDE 6
// 20 HOURS
/* MOD LISTS:
        Track a high score that persists across scenes and display it in the UI (5)
        
*/

let config =
{
    type    : Phaser.AUTO,
    width   : 640,
    height  : 480,
    scene   : [Menu, Play] 
}

let game = new Phaser.Game(config);

// set globab variable for best score
let p1ScoreBest = 0;

// set UI sizes
let borderUISize    = game.config.height / 15;
let borderPadding   = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;