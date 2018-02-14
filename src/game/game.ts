import { socket } from "./boot";
import { Player } from "./player";
import { ResourceData } from "../resourceEditor/resourcesData";
import { Resource } from "./resource";
import { RandomDataGenerator } from "phaser-ce";
import { Wall } from "./wall";
import { Factory } from "./factory";

export class gameState extends Phaser.State {

    resourcesData: Array<ResourceData>;

    player: Player;

    playerGroup: Phaser.Group;
    resourcesGroup: Phaser.Group;
    factoriesGroup: Phaser.Group;
    wallsGroup: Phaser.Group;

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

            if (event.key === 'p') {

                socket.emit('capture', this.game.canvas.toDataURL())

            }

        })

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.playerGroup = this.game.add.group();
        this.resourcesGroup = this.game.add.group();
        this.factoriesGroup = this.game.add.group();
        this.wallsGroup = this.game.add.group();

        this.playerGroup.enableBody = true;
        this.resourcesGroup.enableBody = true;
        this.factoriesGroup.enableBody = true;
        this.wallsGroup.enableBody = true;

        this.player = new Player(this, 32, 20, 20);
        this.playerGroup.add(this.player);

        this.game.world.bringToTop(this.playerGroup);

        this.resourcesData = this.cache.getJSON('resources');

        this.randomResources();

        this.randomWalls();

        this.randomFactories();

    }

    update() {

        for (let i = 0; i < this.resourcesGroup.children.length; i++) {

            if (this.game.physics.arcade.overlap(this.player, this.resourcesGroup.children[i])) {

                //STUFF

            }

        }

        for (let i = 0; i < this.wallsGroup.children.length; i++) {

            if (this.game.physics.arcade.collide(this.player, this.wallsGroup.children[i])) {

                //STUFF

            }

        }

        for (let i = 0; i < this.resourcesGroup.children.length; i++) {

            if (this.game.physics.arcade.overlap(this.player, this.resourcesGroup.children[i])) {

                //STUFF

            }

        }

        for (let i = 0; i < this.factoriesGroup.children.length; i++) {

            if (this.game.physics.arcade.collide(this.player, this.factoriesGroup.children[i])) {

                //STUFF

            }

        }

    }

    randomWalls() {

        let count: number = 3;

        let maxX: number = this.game.width / 32;
        let minX: number = 1;

        let maxY: number = 1;
        let minY: number = this.game.height / 32;

        for (let i = 0; i < count; i++) {

            let x: number = this.state.game.rnd.integerInRange(minX, maxX);
            let y: number = this.state.game.rnd.integerInRange(minY, maxY);

            this.wallsGroup.add(new Wall(this, 0x000000, x * 32, y * 32));

        }
    }

    randomResources() {

        let count: number = 10;

        let maxX: number = (this.game.width / 32) - 1;
        let minX: number = 1;

        let maxY: number = 1;
        let minY: number = (this.game.height / 32 - 1);

        for (let i = 0; i < count; i++) {

            let x: number = this.state.game.rnd.integerInRange(minX, maxX);
            let y: number = this.state.game.rnd.integerInRange(minY, maxY);

            let rIndex: number = this.state.game.rnd.integerInRange(0, this.resourcesData.length - 1);

            this.resourcesGroup.add(new Resource(this, this.resourcesData[rIndex], x * 32, y * 32));

        }
    }

    randomFactories() {

        let count: number = 2;

        let maxX: number = this.game.width / 32;
        let minX: number = 0;

        let maxY: number = 0;
        let minY: number = this.game.height / 32;

        for (let i = 0; i < count; i++) {

            let x: number = this.state.game.rnd.integerInRange(minX, maxX);
            let y: number = this.state.game.rnd.integerInRange(minY, maxY);

            let rIndex: number = this.state.game.rnd.integerInRange(0, this.resourcesData.length - 1);

            this.factoriesGroup.add(new Factory(this, this.resourcesData[rIndex], x * 32, y * 32));

        }
    }

}