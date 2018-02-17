import { ResourceData } from "../resourceEditor/resourcesData";
import { Physics } from "phaser-ce";
import { Player } from "./player";

export class Resource extends Phaser.Graphics {

    resourceData: ResourceData;

    constructor(state: Phaser.State, data: ResourceData, x: number, y: number) {

        super(state.game, x, y);

        this.resourceData = data;

        this.beginFill(data.color);

        this.drawRect(0, 0, 32, 32);
        this.endFill();

        state.add.existing(this);
    }

    playerCanGet(p: Player) {
        switch (this.resourceData.type) {
            case 'stone':
                return p.equipped && p.equipped.type === 'pickaxe' && p.equipped.power >= this.resourceData.hardness;
            default:
                return true;
        }
    }

}