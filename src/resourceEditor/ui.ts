import { socket } from "./boot";

export class Display extends Phaser.Graphics {

    private state: Phaser.State;
    private label: Phaser.Text;
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

        this.label = this.state.add.text(this.x, this.y, '');
        this.label.boundsAlignH = 'center';
        this.label.boundsAlignV = 'middle';
        this.label.addColor('0x000000', 0);
        this.label.fontSize = '100px';
        this.label.setTextBounds(0, 0, this.state.game.width / 3, this.state.game.width / 3)

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

    setLabel(text: string) {

        this.label.text = text.toUpperCase().charAt(0);

    }

    update() {

        this.state.game.world.bringToTop(this.label);

        var r = Math.floor(this.color / (256*256));
        var g = Math.floor(this.color / 256) % 256;
        var b = this.color % 256;

        var ir = Math.floor((255 - r) * 0.5);
        var ig = Math.floor((255 - g) * 0.5);
        var ib = Math.floor((255 - b) * 0.5);

        this.label.addColor('rgb(' + ir + ',' + ig + ',' + ib + ')', 0);

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