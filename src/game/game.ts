import { socket } from "./boot";
import { Player } from "./player";

export class gameState extends Phaser.State {

    player: Player;

    preload() {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.align(true, true);
        this.scale.setResizeCallback(function () {

            this.scale.setMaximum();

        }, this);

    }

    create() {

        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.stage.backgroundColor = "#212121";

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new Player(this, 32, 20, 20);

    }

    update() {

    }

}