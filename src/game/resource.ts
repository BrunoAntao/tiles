import { ResourceData, RecipeData } from "../common/resourcesData";
import { Physics } from "phaser-ce";
import { Player, ItemCount } from "./player";

export class GameResource extends Phaser.Graphics {

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

export class GameRecipe {

    data: RecipeData;

    required: Array<ItemCount>;

    constructor(data: RecipeData) {
        this.data = data;

        this.required = new Array<ItemCount>();

        for (let i = 0; i < data.recipe.length; i++) {
            let e = data.recipe[i];

            let found: boolean = false;

            for (let index = 0; index < this.required.length; index++) {
                if (this.required[index].type === e.type) {
                    found = true;
                    this.required[index].quantity++;
                    break;
                }
            }

            if (!found) {
                this.required.push(new ItemCount(e.type, 1));
            }

        }

    }

    canCreate(p: Player) {

        let items: Array<ItemCount> = p.inventory.items;

        if (items.length <= 0) {
            return false;
        }


        for (let i = 0; i < this.required.length; i++) {
            let r = this.required[i];

            let found: boolean = false;

            for (let index = 0; index < items.length; index++) {
                let item = items[index];

                if (r.type === item.type) {
                    found = true;
                    if (r.quantity > item.quantity) {
                        return false;
                    }
                }
            }

            if (!found) {
                return false;
            }

        }

        return true;
    }

}