import { socket } from "./boot";

export class gameState extends Phaser.State {

    public ctrls;
    public groundPoint = { x: 0, y: 0 };
    public origDragPoint = null;

    preload() {

        this.load.spritesheet('tile', '/client/assets/tile.png', 32, 32);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.align(true, true);
        this.scale.setResizeCallback(function () {

            this.scale.setMaximum();

        }, this);
        this.load.json('tiles', 'client/assets/tiles.json');

    }

    create() {

        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.stage.backgroundColor = "#212121";

    }

    update() {

    }

}