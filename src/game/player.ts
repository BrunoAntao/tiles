export class Player extends Phaser.Graphics {

    private state: Phaser.State;

    constructor(state: Phaser.State, x: number, y: number) {

        super(state.game, x, y);

        this.state = state;

        this.beginFill(0x33DDFF);
        this.drawCircle(x, y, 50)
        this.beginFill(0xCE33FF);
        this.arc(x, y, 50/2, Phaser.Math.PI2, Phaser.Math.PI2/4, false);
        this.endFill();

        state.add.existing(this);
    }

    update() {

        this.rotation = this.game.physics.arcade.angleToPointer(this);

    }

}