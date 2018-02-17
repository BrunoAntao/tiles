export class Wall extends Phaser.Graphics {

    public body: Phaser.Physics.Arcade.Body;

    constructor(state: Phaser.State, color: number, x: number, y: number) {

        super(state.game, x, y);

        this.beginFill(color);
<<<<<<< HEAD

=======
>>>>>>> 241f518d3412010b279813e7829591ba09468aeb
        this.drawRect(0, 0, 32, 32);
        this.endFill();

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;

        state.add.existing(this);
    }

}