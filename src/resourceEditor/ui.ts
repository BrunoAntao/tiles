import { socket } from "./boot";

export class Display extends Phaser.Graphics {

    private state: Phaser.State;
    private color: number;

    constructor(state: Phaser.State, x: number, y: number, color: number) {

        super(state.game);

        this.x = x - state.game.width / 6;
        this.y = y - state.game.width / 6;

        this.state = state;
        this.color = color;

        this.beginFill(this.color);
        this.lineStyle(2, 0x000000, 1);
        this.drawRect(0, 0, this.state.game.width / 3, this.state.game.width / 3);
        this.endFill();

        state.add.existing(this);
    }

    setColor(color) {

        this.clear();
        this.beginFill(color);
        this.lineStyle(2, 0x000000, 1);
        this.drawRect(0, 0, this.state.game.width / 3, this.state.game.width / 3);
        this.endFill();

        this.color = color;

    }

}

export class Submit extends Phaser.Graphics {

    private state: Phaser.State;
    private label: Phaser.Text;

    constructor(state: Phaser.State, x: number, y: number) {

        super(state.game);

        this.x = x;
        this.y = y;

        this.state = state;

        this.beginFill(0x000000);
        this.lineStyle(2, 0xffffff, 1);
        this.drawRect(0, 0, 170, 32);
        this.endFill();

        this.label = state.add.text(x, y, 'Submit', { font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
        this.label.setTextBounds(0, 0, 170, 32);

        this.inputEnabled = true;

        this.events.onInputDown.add(function (submit) {

            let data = {

                type: submit.state.menu.type.value,
                quantity: submit.state.menu.quantity.value,
                color: submit.state.menu.color.value

            };

            socket.emit('resource', data);

        }, this)

        state.add.existing(this);
    }

    update() {

        this.state.world.bringToTop(this.label);

    }

}