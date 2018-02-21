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
    public recipe: Array<object>;
    public power: number;

    constructor(type: string, recipe: Array<object>, power: number = 1) {

        this.recipe = recipe;
        this.type = type;
        this.power = power;

    }

}