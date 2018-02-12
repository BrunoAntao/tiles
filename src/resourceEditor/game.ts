import { socket } from "./boot";
import { Display, Submit } from "./ui";

export class gameState extends Phaser.State {

    public ctrls;
    public groundPoint = { x: 0, y: 0 };
    public origDragPoint = null;
    public game: PhaserInput.InputFieldGame;
    public menu;

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

        this.menu = {

            type: this.game.add.inputField(
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
                }),

            quantity: this.game.add.inputField(
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
                    type: PhaserInput.InputType.number
                }),

            color: this.game.add.inputField(
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
                })

        }

        let display = new Display(this, this.game.width / 3, this.game.height / 2, 0xffffff);

        this.menu.type.focusOut.add(function () {

            display.setLabel(this.value);

        }, this.menu.type);

        this.menu.color.focusOut.add(function () {

            display.setColor(parseInt(this.value));

        }, this.menu.color);

        let submit = new Submit(this, this.game.width / 3 * 2, this.game.height / 10 * 5);

    }

    update() {

    }

}