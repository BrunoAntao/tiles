import { MapEditor } from "./rts";
import { global, socket, Item } from "./boot";

export class Menu extends Phaser.Sprite {

    private subBar: subMenu;
    private subSlot1: activeSlot;
    private subSlot2: activeSlot;
    private state: Phaser.State;
    private items: Phaser.Group;
    private delta: number;

    constructor(state: Phaser.State, items: Array<Object>) {

        let sideBar: Phaser.Graphics = state.add.graphics();
        sideBar.beginFill(0x000000);
        sideBar.lineStyle(1, 0xffffff, 1);
        sideBar.drawRect(0, 0, 159, state.game.height - 1);
        sideBar.endFill();

        super(state.game, state.game.width - 160, 0, sideBar.generateTexture());

        sideBar.destroy();

        this.fixedToCamera = true;

        this.state = state;
        this.items = state.game.add.group();
        this.delta = 0;

        items.forEach((item: Item, i) => {

            let tile = state.add.sprite(state.game.width - 160 + 64, state.game.height / 3 + 32 + i * 48, 'tile');
            tile.tint = item.color;
            tile.inputEnabled = true;
            tile.events.onInputDown.add((tile) => {

                if (state.input.activePointer.leftButton.isDown) {

                    global.selected.primary = item;
                    global.history.push(item);
                    if (global.history.length > 5) {

                        global.history.shift();

                    }

                } else {

                    global.selected.secondary = item;
                    global.history.push(item);
                    if (global.history.length > 5) {

                        global.history.shift();

                    }

                }

            }, this)
            this.items.add(tile);

        });

        window.addEventListener('mousewheel', (e) => {

            if (e.deltaY < 0 && this.delta > -(this.items.length - 7)) {

                this.delta--;

            }

            if (e.deltaY > 0 && this.delta < 0) {

                this.delta++;

            }

            let i = 0;

            this.items.forEach(item => {

                item.y = 48 * this.delta + state.game.height / 3 + 32 + i * 48;
                i++;

            }, this);

        })

        this.subBar = new subMenu(state, state.game.width - 160, 0, 160, state.game.height / 3);

        this.subSlot1 = new activeSlot(state, 1, 0);
        this.subSlot2 = new activeSlot(state, 2, 0);

        state.add.existing(this);
    }

    update() {

        let i = 0;
        this.items.forEach(item => {

            item.y = this.state.camera.y + 48 * this.delta + this.state.game.height / 3 + 32 + i * 48;
            item.x = this.state.camera.x + this.state.game.width - 160 + 64;
            i++;

        }, this);

        this.state.world.bringToTop(this.items);
        this.state.world.bringToTop(this.subBar);
        this.state.world.bringToTop(this.subBar.slots);

        this.subSlot1.setColor(global.selected.primary);
        this.subSlot2.setColor(global.selected.secondary);

        this.state.world.bringToTop(this.subSlot1);
        this.state.world.bringToTop(this.subSlot2);

    }

}

export class subMenu extends Phaser.Sprite {

    public slots: slotGroup;
    private state: Phaser.State;

    constructor(state, x, y, width, height) {

        let subMenu: Phaser.Graphics = state.add.graphics();
        subMenu.beginFill(0x000000);
        subMenu.lineStyle(1, 0xffffff, 1);
        subMenu.drawRect(0, 0, width - 1, height - 1);
        subMenu.endFill();

        super(state.game, x, y, subMenu.generateTexture());

        subMenu.destroy();

        this.state = state;

        this.slots = new slotGroup(state);

        state.game.add.existing(this);
    }

}

export class slotGroup extends Phaser.Group {

    private state: Phaser.State;

    constructor(state) {

        super(state.game);

        this.state = state;

        for (let i = 0; i < 5; i++) {

            this.add(new slot(this.state, 0, i));

        }

    }

}

export class slot extends Phaser.Sprite {

    public state: Phaser.State;
    public item;
    private id: number;

    constructor(state, x, i) {

        let slot: Phaser.Graphics = state.add.graphics();
        slot.beginFill(0x000000);
        slot.lineStyle(2, 0xffffff, 1);
        slot.drawRect(0, 0, state.game.height / 3 / 7, state.game.height / 3 / 7);
        slot.endFill();

        super(state.game, state.game.width - 160 + 16 + (state.game.height / 3 / 7 + 16) * x, state.game.height / 3 / 7 + i * state.game.height / 3 / 7, slot.generateTexture());

        slot.destroy();

        this.state = state;
        this.item = null;
        this.id = i;

        this.inputEnabled = true;

        this.events.onInputDown.add((slot: slot) => {

            if (slot.state.input.activePointer.leftButton.isDown) {

                global.selected.primary = slot.item;

            } else if (slot.item) {

                global.selected.secondary = slot.item;

            }

        }, this)

        state.game.add.existing(this);
    }

    setColor(item) {

        if (item) {

            let g = this.state.add.graphics();
            g.beginFill(item.color);
            g.lineStyle(2, 0xffffff, 1);
            g.drawRect(0, 0, this.state.game.height / 3 / 7, this.state.game.height / 3 / 7);
            g.endFill();

            this.loadTexture(g.generateTexture());

            g.destroy();

        }

    }

    update() {

        this.item = global.history[this.id];
        this.setColor(this.item);

    }

}

export class activeSlot extends Phaser.Sprite {

    public state: Phaser.State;

    constructor(state, x, i) {

        let slot: Phaser.Graphics = state.add.graphics();
        slot.beginFill(0x000000);
        slot.lineStyle(2, 0xffffff, 1);
        slot.drawRect(0, 0, state.game.height / 3 / 7, state.game.height / 3 / 7);
        slot.endFill();

        super(state.game, state.game.width - 160 + 16 + (state.game.height / 3 / 7 + 16) * x, state.game.height / 3 / 7 + i * state.game.height / 3 / 7, slot.generateTexture());

        slot.destroy();

        this.state = state;

        this.inputEnabled = true;

        state.game.add.existing(this);
    }

    setColor(item) {

        if (item) {

            let g = this.state.add.graphics();
            g.beginFill(item.color);
            g.lineStyle(2, 0xffffff, 1);
            g.drawRect(0, 0, this.state.game.height / 3 / 7, this.state.game.height / 3 / 7);
            g.endFill();

            this.loadTexture(g.generateTexture());

            g.destroy();

        }

    }

}

export class Popup extends Phaser.Graphics {

    private elements;

    constructor(state: Phaser.State) {

        super(state.game);

        this.elements = [];

        state.add.existing(this);
    }

    add(elem) {

        elem.setParent(this);
        this.elements.push(elem);

    }

}

export class textBox {

    private submit: Function;
    private parent: Popup;
    public element: HTMLInputElement;

    constructor(submit: Function = null) {

        this.element = document.createElement('input');

        this.element.style.position = 'absolute';
        this.element.style.top = '25%';
        this.element.style.left = '45%';
        this.element.style.width = '10%';

        this.parent = null;
        this.submit = submit;

        let a = (e) => {

            this.element.focus();
            document.removeEventListener('keydown', a);

        }

        document.addEventListener('keydown', a);

        this.element.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {

                this.submit(this.element);
                this.element.remove();
                this.parent.destroy();

            }

        })

        document.body.appendChild(this.element);

    }

    setParent(parent) {

        this.parent = parent;

    }

}

export class selectBox {

    private submit: Function;
    private parent: Popup;
    public element: HTMLSelectElement;

    constructor(items: Array<string>, submit: Function = null) {

        this.element = document.createElement('select');

        this.element.style.position = 'absolute';
        this.element.style.top = '25%';
        this.element.style.left = '45%';
        this.element.style.width = '10%';
        this.element.multiple = false;

        items.forEach((item) => {

            let a = document.createElement("option");
            a.text = item;
            this.element.options.add(a);

        })

        this.parent = null;
        this.submit = submit;

        this.element.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {

                this.submit(this.element);
                this.element.remove();
                this.parent.destroy();

            }

        })

        document.body.appendChild(this.element);
        this.element.focus();

    }

    setParent(parent) {

        this.parent = parent;

    }

}