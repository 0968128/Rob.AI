export class enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "enemy")

        this.scene.physics.add.existing(this)

        this.setBounce(0)
        this.setCollideWorldBounds(true)

        this.setVelocityX(80)
    }
}