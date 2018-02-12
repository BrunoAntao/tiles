import { ResourceData } from "../resourceEditor/resourcesData";

export class Factory extends Phaser.Graphics {

    resourceData: ResourceData;

    public body: Phaser.Physics.Arcade.Body;

    constructor(state: Phaser.State, data: ResourceData, x: number, y: number) {

        super(state.game, x, y);

        this.resourceData = data;

        this.beginFill(data.color);
        this.drawRect(-32/2, -32/2, 32, 32);
        this.endFill();

        this.body.immovable = true;

        state.add.existing(this);
    }
}