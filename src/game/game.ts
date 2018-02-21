import { socket, global } from "./boot";
import { Player, ItemCount } from "./player";
import { ResourceData, RecipeData } from "../common/resourcesData";
import { GameResource, GameRecipe } from "./resource";
import { RandomDataGenerator } from "phaser-ce";
import { Wall } from "./wall";
import { Factory } from "./factory";
import { InventoryPanel } from "./ui";

export var player: Player;
let inventoryPanel: InventoryPanel;

export class gameState extends Phaser.State {

    playerGroup: Phaser.Group;
    resourcesGroup: Phaser.Group;
    factoriesGroup: Phaser.Group;
    wallsGroup: Phaser.Group;

    private ctrls;

    resources: Array<GameResource>;
    recipes: Array<GameRecipe>;

    preload() {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.align(true, true);
        this.scale.setResizeCallback(function () {

            this.scale.setMaximum();

        }, this);

        this.load.json('resources', 'client/assets/resources.json');

    }

    create() {

        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.stage.backgroundColor = "#55556B";

        this.input.keyboard.addCallbacks(this, function (event) {

            switch (event.key) {

                case 'p':
                    socket.emit('capture', this.game.canvas.toDataURL())
                    break;

                case 'ç':
                    player.equipped = new RecipeData('pickaxe', (new Array<Object>()), 5);
                    break;
                case 'i':
                    inventoryPanel.dissapear();
                    break;

                case '0':
                    console.log(global.recipes[0]);
                    console.log(this.recipes[0].canCreate(player));
            }

        })

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.playerGroup = this.game.add.group();
        this.resourcesGroup = this.game.add.group();
        this.factoriesGroup = this.game.add.group();
        this.wallsGroup = this.game.add.group();

        this.resources = new Array<GameResource>();

        this.playerGroup.enableBody = true;
        this.resourcesGroup.enableBody = true;
        this.factoriesGroup.enableBody = true;
        this.wallsGroup.enableBody = true;

        player = new Player(this, 32, 16, 16);
        this.playerGroup.add(player);

        this.game.world.bringToTop(this.playerGroup);

        global.resources = this.cache.getJSON('resources');
        global.recipes = new Array<RecipeData>();

        this.recipes = new Array<GameRecipe>();

        /// TESTS ONLY
        let reqs: Array<ResourceData> = new Array<ResourceData>();
        reqs.push(global.resources[0]);
        reqs.push(global.resources[0]);
        reqs.push(global.resources[0]);
        reqs.push(global.resources[1]);
        reqs.push(global.resources[1]);
        global.recipes[0] = new RecipeData('Santa Hanta', reqs);
        this.recipes[0] = new GameRecipe(global.recipes[0]);
        ///

        this.randomResources(20);

        this.randomWalls(5);

        this.randomFactories(3);

        inventoryPanel = new InventoryPanel(this, 15, 2, 30 - (15 + 1), 16 - (2 + 2), 30, player.inventory);
        inventoryPanel.dissapear();

    }

    update() {

        this.game.physics.arcade.overlap(player, this.resourcesGroup, function (player, resource) {

            if (resource.playerCanGet(player)) {
                let ii: ItemCount = new ItemCount(resource.resourceData.type, resource.resourceData.quantity);
                player.inventory.add(ii);
                resource.kill();
            }

        })

        this.game.physics.arcade.collide(player, this.wallsGroup);

        this.game.physics.arcade.collide(player, this.factoriesGroup);

    }

    getRandomXY32() {

        let maxX: number = this.game.width / 32;
        let minX: number = 0;

        let maxY: number = this.game.height / 32;
        let minY: number = 0;

        let x: number = this.state.game.rnd.integerInRange(minX, maxX);
        let y: number = this.state.game.rnd.integerInRange(minY, maxY);

        return { x, y };

    }

    randomWalls(count: number) {

        for (let i = 0; i < count; i++) {

            let pos = this.getRandomXY32();
            this.wallsGroup.add(new Wall(this, 0x000000, pos.x * 32, pos.y * 32));

        }
    }

    randomResources(count: number) {

        for (let i = 0; i < count; i++) {

            let pos = this.getRandomXY32();
            let rIndex: number = this.state.game.rnd.integerInRange(0, global.resources.length - 1);
            let r = new GameResource(this, global.resources[rIndex], pos.x * 32, pos.y * 32);
            this.resources.push(r);
            this.resourcesGroup.add(r);

        }

    }

    randomFactories(count: number) {

        for (let i = 0; i < count; i++) {

            let pos = this.getRandomXY32();
            let rIndex: number = this.state.game.rnd.integerInRange(0, global.resources.length - 1);
            this.factoriesGroup.add(new Factory(this, global.resources[rIndex], pos.x * 32, pos.y * 32));

        }
    }

}