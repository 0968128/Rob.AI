import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { enemy } from "../objects/bomb"
import { MovingPlatform } from "../objects/movingplatform"
import { UIScene } from "../scenes/ui-scene"

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private chip: Phaser.Physics.Arcade.Group
    private enemys: Phaser.GameObjects.Group
    private score = 0
    private life = 200

    constructor() {
        super({ key: "GameScene" })
    }
    init(): void {
        this.registry.set("score", 0)
        this.registry.set("life", 100)
        
        this.physics.world.bounds.width = 5693
        this.physics.world.bounds.height = 3185

        this.scene.add("UIScene", new UIScene("UIScene"), true)
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // Het spawnen van 12 chip
        this.chip = this.physics.add.group({
            key: 'chip',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        // Add platforms
        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2840, 3153, "ground"),
            new Platform(this, 150, 3036, "platform"),
            new Platform(this, 1030, 3050, "platform"),
            new Platform(this, 1200, 2700, "wall"),
            new MovingPlatform(this, 600, 2960, "movingplatform")
        ], true)

        // Add enemies
        this.enemys = this.add.group()
        this.enemys.add(new enemy(this, 600, 2800), true)
        
        // Definiëren van botsingen van de player met de vijanden en de verzamelobjecten
        this.physics.add.collider(this.chip, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemys, this.platforms)
        
        this.physics.add.overlap(this.player, this.chip, this.collectchip, null, this)
        this.physics.add.overlap(this.player, this.enemys, this.hitenemy, null, this)
        
        // Als player een vijand raakt, dan wordt de score weer op 0 gezet, zodat hij alles weer moet verzamelen
        if(this.hitenemy) {
            this.life --
        }

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 5693, 3185)
        this.cameras.main.startFollow(this.player)
    }

    private hitenemy(player:Player, enemy) {
        this.registry.values.life--

        if(this.registry.values.life == 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    private collectchip(player : Player , chip) : void {
        this.chip.remove(chip, true, true)
        this.registry.values.score++

        // TO DO check if we have all the chip, then go to the end scene
        if(this.registry.values.score == 12) {
            this.scene.start("GameScene2")
        }
    }

    update(){
        this.player.update()
    }
}