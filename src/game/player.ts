import { Math } from "phaser-ce";

export class Player extends Phaser.Graphics {

    private state: Phaser.State;
    private ctrls;

    constructor(state: Phaser.State, x: number, y: number) {

        super(state.game, x, y);

        this.state = state;

        this.x = x;
        this.y = y;

        this.lineStyle(1, 0x33DDFF, 1);
        this.arc(0, 0, 25, Math.degToRad(-90), Math.degToRad(90), false);
        this.lineStyle(1, 0xCE33FF, 1);
        this.arc(0, 0, 25, Math.degToRad(90), Math.degToRad(-90), false);

        this.state.physics.arcade.enable(this);

        this.ctrls = {

            W: this.state.input.keyboard.addKey(Phaser.Keyboard.W),
            A: this.state.input.keyboard.addKey(Phaser.Keyboard.A),
            S: this.state.input.keyboard.addKey(Phaser.Keyboard.S),
            D: this.state.input.keyboard.addKey(Phaser.Keyboard.D),

        }

        state.add.existing(this);
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