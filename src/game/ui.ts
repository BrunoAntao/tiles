import { Inventory, ItemCount } from "./player";
import { global } from "./boot";


export class InventoryPanel extends Phaser.Graphics {

    public inventory: Inventory;

    private state: Phaser.State;

    public w: number;
    public h: number;

    public bgColor: number;

    //30 x 16

    constructor(state: Phaser.State, x: number, y: number, w: number, h: number, slots: number, inventory: Inventory) {

        super(state.game);

        this.x = x * 32;
        this.y = y * 32;

        this.state = state;

        this.bgColor = 0x808080;

        this.beginFill(this.bgColor, 0.05);
        this.lineStyle(4, 0x696969);
        this.drawRect(0, 0, 32 * w, 32 * h);
        this.endFill();

        this.inventory = inventory;

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

    public quantityText: Phaser.Text;

    public graphics: Phaser.Graphics;

    constructor(state: Phaser.State, panel: InventoryPanel, x: number, y: number, w: number = 1, h: number = 1) {

        let graphics = state.add.graphics();

        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(0, 0, w * 32, h * 32);
        graphics.endFill();

        super(state.game, x * 32, y * 32, graphics.generateTexture());

        this.quantityText = this.game.add.text(0, 0, '');
        this.quantityText.boundsAlignH = 'center';
        this.quantityText.boundsAlignV = 'top';
        this.quantityText.setTextBounds(0, 0, 32, 32);

        this.addChild(this.quantityText);

        this.graphics = graphics;
        this.graphics.clear();

        this.game.add.existing(this);
    }

    update() {

        for (let i = 0; i < global.resources.length; i++) {

            let current: ItemCount = this.parent.inventory.items[this.x / 32 + this.y / 32 * this.parent.w];

            if (current && global.resources[i].type == current.type) {

                this.tint = global.resources[i].color;
                this.alpha = 1;
                this.quantityText.text = current.quantity.toString();

                break;

            }

            else {

                this.tint = this.parent.bgColor;
                this.alpha = 0.05;

            }

        }

    }

}