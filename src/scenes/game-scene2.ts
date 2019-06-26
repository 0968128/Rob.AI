import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Bomb } from "../objects/bomb"
import { MovingPlatform } from "../objects/movingplatform"
import { UIScene } from "../scenes/ui-scene"

export class GameScene2 extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private score = 0
    private life = 100

    constructor() {
        super({ key: "GameScene2" })
    }

    init(): void {
        this.registry.set("score", 0)
        this.registry.set("life", 200)
        
        this.physics.world.bounds.width = 5693
        this.physics.world.bounds.height = 3185
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // 12 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 2700, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2840, 3153, "ground"),
            new Platform(this, 50, 2965, "platform"),
            new Platform(this, 50, 2965, "platform"),
            new Platform(this, 50, 2965, "platform"),
            new Platform(this, 50, 2965, "platform"),
            new Platform(this, 50, 2965, "platform"),
            new Platform(this, 50, 2965, "platform"),
            new Platform(this, 50, 2965, "platform"),
            new MovingPlatform(this, 800, 3055, "platform"),
            new MovingPlatform(this, 800, 3055, "platform"),
            new MovingPlatform(this, 800, 3055, "platform"),
            new MovingPlatform(this, 800, 3055, "platform"),
            new MovingPlatform(this, 800, 3055, "platform")
        ], true)

        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 600, 3035), true)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 5693, 3185)
        this.cameras.main.startFollow(this.player)
    }

    private hitBomb(player:Player, bomb) {
        this.registry.values.life--

        if(this.registry.values.life == 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
        if(this.registry.values.score == 12) {
            this.scene.start("GameScene3")
        }
    }

    update(){
        this.player.update()
    }
}