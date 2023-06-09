class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion0', './assets/explosion0.wav');
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_thrusting', './assets/thrusting.wav');

        //load background music
        this.load.audio('bgm', './assets/genres electronica 8-bit (0b067c5dd7fc4555af449ed21650e1ba).mp3');

        //load menu image
        this.load.image('menuArt', './assets/menuArt.png');
        this.load.image('menuTextArt', './assets/rpr_menu_text0.png');

    }

    create()
    {
        // menu text configuration
        let menuKeyConfig = 
        {
            fontFamily: 'MS Reference Sans Serif',
            fontSize: '28px',
            backgroundColor: '#CC000000',
            color: '#FFD700',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu art
        const menuConfig = 
        {
            key: 'menuArt',
            x: game.config.width/2,
            y: game.config.height/2
        };

        // see: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/sprites/create%20from%20config.js
        this.make.sprite(menuConfig);

        // menu text art
        const menuTextConfig = 
        {
            key: 'menuTextArt',
            x: game.config.width/2,
            y: game.config.height/2 - 3 * borderUISize
        };

        // see: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/sprites/create%20from%20config.js
        this.make.sprite(menuTextConfig);


        // show menu key text
        // this.add.text(game.config.width/2, game.config.height/2 + 3 * borderUISize, 'Use ←→ arrows to move & (F) to fire', menuKeyConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 3 * borderUISize, 'Press ← for Novice or → for Expert', menuKeyConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            // easy mode
            this.game.settings = 
            {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            // hard mode
            this.game.settings = 
            {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

    }
}