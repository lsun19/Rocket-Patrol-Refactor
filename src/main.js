// CMPM 120 SPRING 2023_LIYU SUN_ROCKET PATROL MOD

let config =
{
    type    : Phaser.AUTO,
    width   : 640,
    height  : 480,
    scene   : [Menu, Play] 
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize    = game.config.height / 15;
let borderPadding   = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;