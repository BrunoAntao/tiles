import { Inventory } from "./player";


export class InventoryPanel extends Phaser.Graphics {

    private inventory: Inventory;

    private slots: Array<ItemSlot>

    private freeSlotLast: number;

    private state: Phaser.State;

    private w: number;
    private h: number;

    public myX: number;
    public myY: number;

    private bgColor: number;

    //30 x 16

    constructor(state: Phaser.State, x: number, y: number, w: number, h: number, slots: number, inventory: Inventory) {

        super(state.game);

        this.state = state;

        this.bgColor = 0x696969;

        this.beginFill(0x808080, 0.5);
        this.lineStyle(4, this.bgColor);
        this.drawRect(x * 32, y * 32, 32 * w, 32 * h);
        this.endFill();

        this.inventory = inventory;

        this.freeSlotLast = 0;

        this.slots = new Array<ItemSlot>(w * h);

        this.w = w;
        this.h = h;

        this.myX = x * 32;
        this.myY = y * 32;

        // w: 3 x h: 4

        // [0] [1] [2]
        // [3] [X] [5]
        // [6] [X] [8]
        // [9] [10] [11]

        for (let i = 0; i < this.slots.length; i++) {

            this.slots[i] = new ItemSlot(this.state, this, i % this.w, Math.floor(i / this.w));

        }

        this.state = state;

        this.game.add.existing(this);

    }

    getIndex2D(x: number, w: number, y: number) {
        return x * w + y;
    }

    dissapear() {

        this.visible = !this.visible;

        for (let i = 0; i < this.slots.length; i++) {

            this.slots[i].toggleVisible();

        }
    }

}

class ItemSlot extends Phaser.Sprite {

    private color: number;

    public graphics: Phaser.Graphics;

    constructor(state: Phaser.State, panel: InventoryPanel, x: number, y: number, w: number = 1, h: number = 1) {

        let graphics = state.add.graphics();

        // [0] [1] [2]
        // [3] [X] [5]
        // [6] [X] [8]
        // [9] [X] [11]
        // [12][13][14]
        // [15][16][17]

        graphics.beginFill(0x808080, 0.5);
        graphics.drawRect(x * 32 + panel.myX, y * 32 + panel.myY, w * 32, h * 32);
        graphics.endFill();

        super(state.game, x * 32 + panel.myX, y * 32 + panel.myY, graphics.generateTexture());

        this.graphics = graphics;

        this.game.add.existing(this);
    }

    toggleVisible() {
        this.graphics.visible = this.graphics.visible;
        this.setTexture(this.graphics.generateTexture());
    }

}