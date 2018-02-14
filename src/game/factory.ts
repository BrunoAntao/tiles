import { ResourceData } from "../resourceEditor/resourcesData";

export class Factory extends Phaser.Graphics {

    resourceData: ResourceData;

    public body: Phaser.Physics.Arcade.Body;

    text: Phaser.Text;

    constructor(state: Phaser.State, data: ResourceData, x: number, y: number) {

        super(state.game, x, y);

        this.resourceData = data;

        this.lineStyle(4, data.color);
        this.drawRect(-32 / 2, -32 / 2, 32, 32);

        this.text = this.game.add.text(-8, -16, "F");
        this.addChild(this.text);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;

        state.add.existing(this);
    }

}