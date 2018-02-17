import { socket } from "./boot";
import { imageEditor, toolbar, Panel, colorPallete, colorPicker } from "./image";

export class gameState extends Phaser.State {

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
        this.stage.backgroundColor = "#000000";

        this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));

        let editor = new imageEditor(this);
        let tb = new toolbar(this);
        tb.add(new colorPallete(this, 1, 1, 10, 4));
        tb.add(new colorPicker(this, 1, 6, 10, 8));

    }

    update() {

    }

}