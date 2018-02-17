import { Inventory } from "./player";
import { global } from "./boot";


export class InventoryPanel extends Phaser.Graphics {

    public inventory: Inventory;

    private freeSlotLast: number;

    private state: Phaser.State;

    public w: number;
    public h: number;

    private bgColor: number;

    //30 x 16

    constructor(state: Phaser.State, x: number, y: number, w: number, h: number, slots: number, inventory: Inventory) {

        super(state.game);

        this.x = x * 32;
        this.y = y * 32;

        this.state = state;

        this.bgColor = 0x696969;

        this.beginFill(0x808080, 0.5);
        this.lineStyle(4, this.bgColor);
        this.drawRect(0, 0, 32 * w, 32 * h);
        this.endFill();

        this.inventory = inventory;

        this.freeSlotLast = 0;

        this.w = w;
        this.h = h;

        for (let i = 0; i < w * h; i++) {

            let slot = new ItemSlot(this.state, this, i % this.w, Math.floor(i / this.w));
            this.addChild(slot);
        }

        this.game.add.existing(this);
    }

    getIndex2D(x: number, w: number, y: number) {
        return x * w + y;
    }

    dissapear() {

        this.visible = !this.visible;

    }

    update() {

        this.children.forEach(function (child: ItemSlot) {

            child.update();

        }, this)

    }

}

class ItemSlot extends Phaser.Sprite {

    private color: number;
    public parent: InventoryPanel;

    public graphics: Phaser.Graphics;

    constructor(state: Phaser.State, panel: InventoryPanel, x: number, y: number, w: number = 1, h: number = 1) {

        let graphics = state.add.graphics();

        graphics.beginFill(0x808080, 0.5);
        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(0, 0, w * 32, h * 32);
        graphics.endFill();

        super(state.game, x * 32, y * 32, graphics.generateTexture());

        this.graphics = graphics;
        this.graphics.clear();

        this.game.add.existing(this);
    }

    update() {

        for (let i = 0; i < global.resources.length; i++) {

            if (this.parent.inventory.items[this.x / 32 + this.y / 32 * this.parent.w] &&
                global.resources[i].type == this.parent.inventory.items[this.x / 32 + this.y / 32 * this.parent.w].type) {

                this.tint = global.resources[i].color;
                break;

            }

        }

    }

}