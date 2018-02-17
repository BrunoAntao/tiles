import { gameState } from "./game";

export class Game extends Phaser.Game {

    constructor() {

        super(960, 512, Phaser.CANVAS, 'game', null, null, false, false);

        this.state.add('Boot', bootState);
        this.state.add('Game', gameState);

        this.state.start('Boot');

    }

}

export class bootState extends Phaser.State {

    preload() {


    }

    create() {

        this.game.canvas.style.position = 'relative';
        this.state.start('Game');

    }

    update() {

    }

}

export var global = {

    resources : []

};

export let socket = io();

window.onload = () => {

    let game = new Game();

}