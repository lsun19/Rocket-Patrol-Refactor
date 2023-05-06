class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        // load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocketship', './assets/rocketShip.png');
        this.load.image('caspaceship', './assets/caSpaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.atlas('spaceship_atlas', './assets/spaceshipsheet.png', './assets/spaceshipsheet.json');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create()
    {

        let playMusic = this.sound.add('bgm');
        playMusic.play();
        playMusic.volume = 0.2;

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 32, 'rocket').setOrigin(0.5, 0.5);

        // add rocketship (player 1)
        this.p1RocketShip = new Rocketship(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 32, 'rocketship').setOrigin(0.5, 0.5).setInteractive();

        // add spaceships (x4) & rebalance the points to 5/10/15/30
        this.ship00 = new SpaceshipCA(this, game.config.width + borderUISize * 10, borderUISize * 4 - 10, 'caspaceship', 0, 30).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4 + 15, 'spaceship_atlas', "spaceshipTypeB0001", 15).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2 + 15, 'spaceship_atlas', "spaceshipTypeA0001", 10).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4 + 10, 'spaceship_atlas', "spaceshipTypeA0001", 5).setOrigin(0, 0);
        
        // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create(
            {
                key: 'explode',
                frames: this.anims.generateFrameNames('explosion', 
                {
                    start: 0,
                    end: 9,
                    first: 0
                }),
                frameRate: 30
            });

        // initialize scores
        this.p1Score = 0;

        // display score
        let scoreConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding - 5, borderUISize + borderPadding * 2 + 4, this.p1Score, scoreConfig);

        // display best score
        let scoreBestConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 220
        }

        this.scoreRight = this.add.text( (borderUISize + borderPadding) * 9, borderUISize + borderPadding * 2 + 4, "Best Score: " + p1ScoreBest, scoreBestConfig);

        // 60-second play clock
        scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => 
        {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // define countdown text
        this.countdown = this.add.text(32, 32);

        this.timedEvent = this.time.delayedCall(game.settings.gameTimer, this.onEvent, [], this);

        // double the music playrate as well as the spaceship movespeed after 30 seconds
        this.clock = this.time.delayedCall(30000, () => 
        {
            this.ship01.moveSpeed *= 2;
            this.ship02.moveSpeed *= 2;
            this.ship03.moveSpeed *= 2;
            playMusic.setRate(2);
        }, null, this);

    }


    update()
    {   
        // this.controls.update(delta);

        // show the time countdown
        this.countdown.setText(`Time Left: ${parseFloat(game.settings.gameTimer/1000 - ((this.timedEvent.getProgress())*(game.settings.gameTimer/1000))).toFixed(2)}`);

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR))
        {
            this.sound.stopAll();
            this.scene.restart();
            this.gameOver = false;
            
            // check and update the best score
            if(this.p1Score >= p1ScoreBest)
            {
                p1ScoreBest = this.p1Score;
            }
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            // stop the music
            this.sound.stopAll();

            // go back to the menu
            this.scene.start("menuScene");
            this.gameOver = false;

            // check and update the best score
            if(this.p1Score >= p1ScoreBest)
            {
                p1ScoreBest = this.p1Score;
            }
        }

        this.starfield.tilePositionX -= 1;

        if(!this.gameOver)
        {
            this.p1Rocket.update();
            this.p1RocketShip.update();
            this.ship00.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // config FIRE UI
        let fireUIConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 80
        }
                
        // check firing and display fire UI
        if (this.p1Rocket.isFiring)
        {
            this.fireUI = this.add.text((borderUISize + borderPadding) * 5 + 5, borderUISize + borderPadding * 2 + 4, "FIRE", fireUIConfig);
        }
        else
        {
            fireUIConfig.backgroundColor = '#00FF00';
            fireUIConfig.color = '#00FF00';
            this.fireUI = this.add.text((borderUISize + borderPadding) * 5 + 5, borderUISize + borderPadding * 2 + 4, '', fireUIConfig);
        }

        //check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03))
        {
            this.p1Rocket.reset();
            this.p1Rocket.x = this.p1RocketShip.x;
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02))
        {
            this.p1Rocket.reset();
            this.p1Rocket.x = this.p1RocketShip.x;
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01))
        {
            this.p1Rocket.reset();
            this.p1Rocket.x = this.p1RocketShip.x;
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship00))
        {
            this.p1Rocket.reset();
            this.p1Rocket.x = this.p1RocketShip.x;
            this.shipExplode(this.ship00);
        }
        
        if (this.p1Rocket.y <= borderUISize * 3 + borderPadding)
        {
            this.isFiring = false;
            this.p1Rocket.x = this.p1RocketShip.x;
            this.p1Rocket.y = game.config.height - borderUISize - borderPadding - 32;
        }

    }

    checkCollision(rocket, ship)
    {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    shipExplode(ship)
    {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => 
        {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })

        // score add and repaint
        this.p1Score += ship.points * (1 + 0.1 * (parseFloat(((this.timedEvent.getProgress())*(game.settings.gameTimer/1000))).toFixed(0)));
        this.scoreLeft.text = this.p1Score;

        let explodeType = Math.floor(Math.random() * 4);;

        switch (explodeType) {
            case 1:
                this.sound.play('sfx_explosion1');
                break;
        
            case 2:
                this.sound.play('sfx_explosion2');
                break;

            case 3:
                this.sound.play('sfx_explosion3');
                break;

            default:
                this.sound.play('sfx_explosion0');
                break;
        }
    }
}