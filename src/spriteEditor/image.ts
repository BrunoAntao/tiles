import { socket, global } from "./boot";

export class imageEditor extends Phaser.Group {

    private bitmap: Phaser.BitmapData;

    constructor(state: Phaser.State) {

        super(state.game);

        this.bitmap = new Phaser.BitmapData(state.game, 'image', 32, 32);

        for (let x = 0; x < 32; x++) {

            for (let y = 0; y < 32; y++) {

                this.add(new imagePixel(state, x, y, this.bitmap));
                this.bitmap.setPixel(x, y, 0xff, 0xff, 0xff);

            }

        }

        state.input.keyboard.addCallbacks(this, function (e) {

            if (e.key === 's') {

                socket.emit('capture', this.bitmap.canvas.toDataURL());

            }

        })

    }

}

class imagePixel extends Phaser.Graphics {

    private state: Phaser.State;
    private bitmap: Phaser.BitmapData;
    private bx: number; by: number;

    constructor(state: Phaser.State, x: number, y: number, bitmap: Phaser.BitmapData) {

        super(state.game);

        this.state = state;

        this.x = 32 + x * 15;
        this.y = 32 + y * 15;

        this.bitmap = bitmap;
        this.bx = x;
        this.by = y;

        this.beginFill(0xffffff);
        this.lineStyle(2, 0x000000, 1);
        this.drawRect(0, 0, 15, 15);
        this.endFill();

        this.inputEnabled = true;

        this.events.onInputDown.add(function (pixel: imagePixel) {

            if (pixel.state.input.activePointer.leftButton.isDown) {

                pixel.clear();
                pixel.beginFill(parseInt(global.color1));
                pixel.lineStyle(2, 0x000000, 1);
                pixel.drawRect(0, 0, 15, 15);
                pixel.endFill();

                let color = hexToRgb(global.color1.substr(2, 6));

                pixel.bitmap.setPixel(pixel.bx, pixel.by, color.r, color.g, color.b);

            } else {

                pixel.clear();
                pixel.beginFill(parseInt(global.color2));
                pixel.lineStyle(2, 0x000000, 1);
                pixel.drawRect(0, 0, 15, 15);
                pixel.endFill();

                let color = hexToRgb(global.color2.substr(2, 6));

                pixel.bitmap.setPixel(pixel.bx, pixel.by, color.r, color.g, color.b);

            }

        }, this)

        this.events.onInputOver.add(function (pixel: imagePixel) {

            if (pixel.state.input.activePointer.isDown) {

                pixel.events.onInputDown.dispatch(pixel);

            }

        }, this)

        state.add.existing(this);
    }

}

export class toolbar extends Phaser.Graphics {

    private panels: Phaser.Group;

    constructor(state: Phaser.State) {

        super(state.game);

        this.x = 17 * 32;
        this.y = 32;

        this.beginFill(0x000000);
        this.lineStyle(2, 0xffffff, 1);
        this.drawRect(0, 0, 12 * 32, 15 * 32);
        this.endFill();
        this.panels = new Phaser.Group(state.game);

        this.addChild(this.panels);

        state.add.existing(this);
    }

    add(panel: Panel) {

        this.panels.add(panel);
        panel.bar = this;

    }

    update() {

        this.panels.update();

    }

}

export class Panel extends Phaser.Graphics {

    public bar: toolbar = null;

    constructor(state: Phaser.State, x: number, y: number, width: number, height: number) {

        super(state.game);

        this.x = x * 32;
        this.y = y * 32;

        this.beginFill(0x000000);
        this.lineStyle(2, 0xffffff, 1);
        this.drawRect(0, 0, width * 32, height * 32);
        this.endFill();

        state.add.existing(this);
    }

}

export class colorPallete extends Panel {

    private slot1: colorSlot; private slot2: colorSlot;

    constructor(state: Phaser.State, x: number, y: number, width: number, height: number) {

        super(state, x, y, width, height);

        this.slot1 = new colorSlot(state, 1, 1);
        this.slot2 = new colorSlot(state, 3, 1);

        this.addChild(this.slot1);
        this.addChild(this.slot2);

        state.add.existing(this);
    }

    update() {

        this.slot1.setColor(global.color1);
        this.slot2.setColor(global.color2);

    }

}

class colorSlot extends Phaser.Graphics {

    constructor(state: Phaser.State, x: number, y: number) {

        super(state.game);

        this.x = x * 32;
        this.y = y * 32;

        this.beginFill(0x000000);
        this.lineStyle(2, 0xffffff, 1);
        this.drawRect(0, 0, 32, 32);
        this.endFill();

        state.add.existing(this);
    }

    setColor(color) {

        this.clear();
        this.beginFill(color);
        this.lineStyle(2, 0xffffff, 1);
        this.drawRect(0, 0, 32, 32);
        this.endFill();

    }

}

export class colorPicker extends Panel {

    private wheel: colorWheel;

    constructor(state: Phaser.State, x: number, y: number, width: number, height: number) {

        super(state, x, y, width, height);

        this.wheel = new colorWheel(state, 1, 1);

        this.addChild(this.wheel);

        state.add.existing(this);
    }

}

class colorWheel extends Phaser.Graphics {

    public game: PhaserInput.InputFieldGame;
    private outer: Phaser.Sprite;
    private light: PhaserInput.InputField;
    private plus; private minus;

    constructor(state: Phaser.State, x: number, y: number) {

        super(state.game);

        this.x = 3 * 32 + x * 32;
        this.y = 3 * 32 + y * 32;

        let colors = Phaser.Color.HSVColorWheel();

        this.beginFill(0x000000);
        this.drawCircle(0, 0, 6 * 32);
        this.endFill();

        let g = new Phaser.Graphics(state.game);

        for (let i = 0; i < colors.length; i++) {

            g.lineStyle(25, colors[i].color, 1);
            g.arc(0, 0, 3 * 32, Phaser.Math.degToRad(0 + i), Phaser.Math.degToRad(1 + i), false);

        }

        this.outer = new Phaser.Sprite(state.game, 0, 0, g.generateTexture());
        this.outer.anchor.setTo(0.5, 0.5);

        this.light = this.game.add.inputField(
            4 * 32,
            -16, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 32,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 0,
                type: PhaserInput.InputType.number
            });

        this.light.setText('50');

        this.addChild(this.light);
        this.addChild(this.outer);

        this.inputEnabled = true;

        this.events.onInputDown.add(function (wheel: colorWheel) {

            let pos = {

                x: this.game.input.activePointer.x,
                y: this.game.input.activePointer.y

            }

            let c = {

                x: this.parent.bar.x + this.parent.x + this.x,
                y: this.parent.bar.y + this.parent.y + this.y

            }

            let dx = pos.x - c.x;
            let dy = pos.y - c.y;
            let d = Phaser.Math.distance(pos.x, pos.y, c.x, c.y);
            let a = Phaser.Math.radToDeg(Math.atan2(dy, dx));

            if (a < 0) { a = 360 + a; };

            let color = hslToHex(a, d, parseInt(this.light.value));

            this.beginFill(color);
            this.drawCircle(0, 0, 3 * 32);
            this.endFill();

            if (this.game.input.activePointer.leftButton.isDown) {

                global.color1 = color;

            } else {

                global.color2 = color;
            }

        }, this)

        state.add.existing(this);
    }

}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `0x${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}