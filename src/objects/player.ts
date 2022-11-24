export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {

        // Waar spawnt de player
        super(scene, 200, 3080, "rob")
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(600)
    }

    public update(): void {
        
        // Reageren op keyboard inputs en sprite omdraaien bij verandering van richting
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        }

        // Alleen kunnen springen als je 'gegrond' bent
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-340)
        }
        if (grounded == false) {
            this.setGravityY(40)
        }
    }
}