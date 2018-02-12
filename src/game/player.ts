import { Key } from "phaser-ce";

export class Player extends Phaser.Graphics {

    private state: Phaser.State;

    public body: Phaser.Physics.Arcade.Body;
    private ctrls;

    private diameter: number;

    constructor(state: Phaser.State, diameter: number =  32, x: number, y: number) {

        super(state.game);

        this.x = x;
        this.y = y;

        this.state = state;

        this.lineStyle(1, 0x33DDFF, 1);
        this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(-90), Phaser.Math.degToRad(90), false);
        this.lineStyle(1, 0xCE33FF, 1);
        this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(90), Phaser.Math.degToRad(-90), false);

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