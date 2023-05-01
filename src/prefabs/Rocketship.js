//Rocketship prefab
class Rocketship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.moveSpeed  = 2;

        // add rocket sfx
        this.sfxThrusting = scene.sound.add('sfx_thrusting');
    }

    update()
    {

        // fire button - hook in the entire sequence of JustDown to trigger single hit mechanics
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            this.sfxThrusting.play();
        }

    }

    reset()
    {
        // Maybe respawn after taking certain amount of damage?
    }
}