export class ResourceData {

    public rType: string;
    public color: number;
    public quantity: number;
    public hardness: number;

    constructor(color: number, rType: string, hardness: number, quantity: number) {

        this.rType = rType;
        this.color = color;
        this.quantity = quantity;
        this.hardness = hardness;

    }

}

export class ResourceRequirement {

    public resource: ResourceData;
    public quantity: number;

    constructor(resource: ResourceData, quantity: number) {

        this.resource = resource;
        this.quantity = quantity;

    }

}


export class RecipeData {

    public requirements: Array<ResourceRequirement>;
    public result: EndProductData;
    public x: number;
    public y: number;

    constructor(requirements: Array<ResourceRequirement>, result: EndProductData, x: number = -1, y: number = -1) {

        this.requirements = requirements;
        this.result = result;
        this.x = x;
        this.y = y;

    }

}

export class EndProductData {

    public name: string;
    public type: string;
    public value: number;

    constructor(name: string, type: string, value: number = -1) {

        this.name = name;
        this.type = type;
        this.value = value;

    }

}