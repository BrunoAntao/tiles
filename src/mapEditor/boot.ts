import { gameState } from "./game";

export class Item {

    type: string;
    color: number;

    constructor(type = null, color = null) {

        this.type = type;
        this.color = color;

    }

}

export class Game extends Phaser.Game {

    constructor() {

        super(960, 540, Phaser.CANVAS, 'game', null, null, false, false);

        this.state.add('Boot', bootState);
        this.state.add('Game', gameState);

        this.state.start('Boot');

    }

}

export class bootState extends Phaser.State {

    preload() {

        this.load.json('tiles', 'client/assets/tiles.json');

    }

    create() {

        this.game.canvas.style.position = 'relative';
        this.state.start('Game');

    }

    update() {



    }

}

export var global = {

    selected: {

        primary: new Item(),
        secondary: new Item()

    },
    history: []

}

export let socket = io();

window.onload = () => {

    let game = new Game();

}