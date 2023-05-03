//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring   = false;
        this.moveSpeed  = 2;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.sfxRocket.volume = 0.1;
    }

    update()
    {
        if (!this.isFiring)
        {   
            // movement
            if (keyLEFT.isDown && this.x >= borderUISize + this.width + 32)
            {
                this.x -= this.moveSpeed;
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width - 32)
            {
                this.x += this.moveSpeed;
            }
        }

        // fire button - hook in the entire sequence of JustDown to trigger single hit mechanics
        if (Phaser.Input.Keyboard.JustDown(keyF))
        {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding)
        {
            this.y -= this.moveSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding)
        {
            this.isFiring = false;
        }
    }

    reset()
    {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 32 
    }
}