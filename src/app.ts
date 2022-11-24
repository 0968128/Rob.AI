import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { Level1 } from "./scenes/level1"
import { Level2 } from "./scenes/level2"
import { Level3 } from "./scenes/level3"
import { EndScene } from "./scenes/end-scene"
import { UIScene } from "./scenes/ui-scene"
import { WonScene } from "./scenes/won-scene"

const config: GameConfig = {
    width: 800,
    height: 600,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, UIScene, Level1, Level2, Level3, EndScene, WonScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 400 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config)
    }
}

window.addEventListener("load", () => new Game(config))