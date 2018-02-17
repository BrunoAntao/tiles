import { ResourceData } from "../resourceEditor/resourcesData";

export class Factory extends Phaser.Graphics {

    resourceData: ResourceData;

    public body: Phaser.Physics.Arcade.Body;

    constructor(state: Phaser.State, data: ResourceData, x: number, y: number) {

        super(state.game, x, y);

        this.resourceData = data;

        this.lineStyle(2, data.color);
        this.drawRect(0, 0, 32, 32);

        let text = this.game.add.text(0, 0, "F");
        text.boundsAlignH = "center";
        text.boundsAlignV = "middle";
        text.setTextBounds(0, 0, 32, 32);

        this.addChild(text);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;

        state.add.existing(this);
    }

}