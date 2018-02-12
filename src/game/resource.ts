import { ResourceData } from "../resourceEditor/resourcesData";
import { Physics } from "phaser-ce";

export class Resource extends Phaser.Graphics {

    resourceData: ResourceData;

    constructor(state: Phaser.State, data: ResourceData, x: number, y: number) {

        super(state.game, x, y);

        this.resourceData = data;

        this.beginFill(data.color);
        this.drawRect(-32/2, -32/2, 32, 32);
        this.endFill();

        state.add.existing(this);
    }
}