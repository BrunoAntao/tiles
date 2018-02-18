import { socket } from "./boot";

export class Display extends Phaser.Graphics {

    private state: Phaser.State;
    private label: Phaser.Text;
    private color: string;

    constructor(state: Phaser.State, x: number, y: number, color: number) {

        super(state.game);

        this.x = x - state.game.width / 6;
        this.y = y - state.game.width / 6;

        this.state = state;
        this.color = color.toString(16);

        this.beginFill(color);
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
        this.beginFill(parseInt('0x' + color));
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

        console.log(this.color)

        this.label.addColor(invertColor(this.color, true), 0);

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

            if (submit.state.menu.type.value &&
                parseInt(submit.state.menu.quantity.value) &&
                parseInt(submit.state.menu.hardness.value) &&
                submit.state.menu.tool.value &&
                submit.state.menu.color.value
            ) {

                let data = {

                    type: submit.state.menu.type.value,
                    quantity: parseInt(submit.state.menu.quantity.value),
                    hardness: parseInt(submit.state.menu.hardness.value),
                    tool: submit.state.menu.tool.value,
                    color: submit.state.menu.color.value

                };

                socket.emit('resource', data);

            }

        }, this)

        state.add.existing(this);
    }

    update() {

        this.state.world.bringToTop(this.label);

    }

}

function padZero(str, len = 2) {
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertColor(hex, bw) {
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r: any = parseInt(hex.slice(0, 2), 16),
        g: any = parseInt(hex.slice(2, 4), 16),
        b: any = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}