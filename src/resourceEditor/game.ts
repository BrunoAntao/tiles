/// <reference path="../../typings/phaser-input/phaser-input.d.ts" /> 
import { socket } from "./boot";

export class gameState extends Phaser.State {

    public ctrls;
    public groundPoint = { x: 0, y: 0 };
    public origDragPoint = null;
    public game: PhaserInput.InputFieldGame;

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
        this.stage.backgroundColor = "#000000";

        this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));

        var type = this.game.add.inputField(
            this.game.width / 3 * 2,
            this.game.height / 10 * 2, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Type',
                type: PhaserInput.InputType.text
            });

        var quantity = this.game.add.inputField(
            this.game.width / 3 * 2,
            this.game.height / 10 * 3, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Quantity',
                type: PhaserInput.InputType.text
            });

        var color = this.game.add.inputField(
            this.game.width / 3 * 2,
            this.game.height / 10 * 4, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Color',
                type: PhaserInput.InputType.text
        });

        

    }

    update() {

    }

}