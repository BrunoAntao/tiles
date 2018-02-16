import { MapEditor } from "./rts";
import { Menu, subMenu } from "./menu";
import { socket, global, Item } from "./boot";

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
        this.load.json('resources', 'client/assets/resources.json');

    }

    create() {

        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.stage.backgroundColor = "#212121";

        this.ctrls = {

            ctrl: this.input.keyboard.addKey(Phaser.Keyboard.CONTROL)

        }

        new MapEditor(this, 10, 10);

        let items:Array<Item> = this.cache.getJSON('resources');
        global.selected.primary = items[0];
        global.selected.secondary = null;
        //socket.emit('capture', this.game.canvas.toDataURL());

        new Menu(this, items);

    }

    cameraDrag() {

        if (this.input.activePointer.rightButton.isDown && this.ctrls.ctrl.isDown) {

            if (this.origDragPoint) {

                this.camera.x += this.origDragPoint.x - this.input.activePointer.position.x;
                this.camera.y += this.origDragPoint.y - this.input.activePointer.position.y;

            }

            this.origDragPoint = this.input.activePointer.position.clone();

        } else {

            this.origDragPoint = null;

        }

    }

    update() {

        this.cameraDrag();

    }

}