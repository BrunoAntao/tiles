import { Key } from "phaser-ce";
import { ResourceData, ProductData } from "../resourceEditor/resourcesData";

export class Player extends Phaser.Graphics {

    private state: Phaser.State;

    public body: Phaser.Physics.Arcade.Body;
    private ctrls;

    private diameter: number;

    public inventory: Inventory;

    public equipped: ProductData;

    constructor(state: Phaser.State, diameter: number = 32, x: number, y: number) {

        super(state.game);

        this.x = x;
        this.y = y;

        this.state = state;

        this.inventory = new Inventory();

        this.lineStyle(1, 0xff0000, 1);
        this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(-90), Phaser.Math.degToRad(0), false);
        this.lineStyle(1, 0x0000ff, 1);
        this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(0), Phaser.Math.degToRad(90), false);
        this.lineStyle(1, 0x00ff00, 1);
        this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(90), Phaser.Math.degToRad(-90), false);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setSize(32, 32, -16, -16);
        this.body.collideWorldBounds = true;

        this.ctrls = {

            W: this.state.input.keyboard.addKey(Phaser.Keyboard.W),
            A: this.state.input.keyboard.addKey(Phaser.Keyboard.A),
            S: this.state.input.keyboard.addKey(Phaser.Keyboard.S),
            D: this.state.input.keyboard.addKey(Phaser.Keyboard.D),

        }

        state.add.existing(this);
    }

    render() {

        this.game.debug.body(this);

    }

    update() {

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        this.rotation = this.game.physics.arcade.angleToPointer(this);

        if (this.ctrls.W.isDown) {

            this.body.velocity.y = -150;

        }


        if (this.ctrls.A.isDown) {

            this.body.velocity.x = -150;

        }


        if (this.ctrls.S.isDown) {

            this.body.velocity.y = 150;

        }


        if (this.ctrls.D.isDown) {

            this.body.velocity.x = 150;

        }

    }


}

export class InventoryItem {

    public type: string;
    public quantity: number;

    constructor(type: string, quantity: number = 1) {

        this.type = type;
        this.quantity = quantity;
    }

}

export class Inventory {

    public items: Array<InventoryItem>;

    constructor() {

        this.items = new Array<InventoryItem>();

    }

    add(item: InventoryItem) {

        console.log(this.items);

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].type === item.type) {
                this.items[i].quantity += item.quantity;
                return;
            }
        }

        this.items.push(item);
    }

    use(item: InventoryItem, quantity: number = item.quantity) {

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].type === item.type) {
                this.items[i].quantity -= item.quantity;
                return;
            }
        }
    }

}

