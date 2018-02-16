export class ResourceData {

    public type: string;
    public color: number;
    public quantity: number;
    public hardness: number;

    constructor(color: number, type: string, hardness: number, quantity: number) {

        this.type = type;
        this.color = color;
        this.quantity = quantity;
        this.hardness = hardness;

    }

}

export class ProductData {

    public type: string;
    public recipe: RecipeData;
    public x: number;
    public y: number;
    public power: number;

    constructor(type: string, recipe: RecipeData, x: number = -1, y: number = -1, power: number = 1) {

        this.recipe = recipe;
        this.type = type;
        this.x = x;
        this.y = y;
        this.power = power;

    }

}

export class RecipeData {

    required: Array<object>;

    constructor(required: Array<object>) {

        this.required = required;

    }

}