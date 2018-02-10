import { global, socket } from "./boot";
import { Popup, textBox, selectBox } from "./menu";

class DataMap {

    public width;
    public height;
    public data;

    constructor(width: number = 10, height: number = 10) {

        this.width = width;
        this.height = height;

        this.data = new Array(width);

        for (let x = 0; x < this.width; x++) {

            this.data[x] = new Array(height);

        }

    }

}

export class Map extends Phaser.Group {

    public data: DataMap;
    public state;

    constructor(state: Phaser.State, data: DataMap = new DataMap(50, 50)) {

        super(state.game);

        this.data = data;
        this.state = state;

        state.game.world.setBounds(0, 0, data.width * 32 + 160, data.height * 32);

    }

}

export class MapEditor extends Map {

    private pop: Popup;

    constructor(state: Phaser.State, width: number = 10, height: number = 10) {

        super(state, new DataMap(width, height));

        for (let x = 0; x < this.data.width; x++) {

            for (let y = 0; y < this.data.height; y++) {

                this.add(new EditorTile(state.game, this, x, y));

            }

        }

        state.input.keyboard.addCallbacks(this, (e) => {

            if (e.key === 's') {

                if (!this.pop) {

                    this.pop = new Popup(state);
                    this.pop.add(new textBox((input) => {

                        socket.emit('map save', { name: input.value, data: this.save() });
                        this.pop = null;

                    }));

                }

            } else if (e.key === 'l') {

                if (!this.pop) {

                    socket.emit('fetch maplist');

                }

            }

        })

        let editor = this;

        socket.on('maplist', function (maplist) {

            editor.pop = new Popup(state);
            editor.pop.add(new selectBox(maplist, (select) => {

                socket.emit('fetch map', select.selectedOptions[0].text);
                editor.pop = null;

            }));

        })

        socket.on('map', function (map) {

            editor.clear();

            map.data.forEach((r, x) => {

                r.forEach((tile, y) => {

                    if (tile) {

                        let t = new Tile(state.game, this, x, y);
                        t.tint = tile;
                        map.data[x][y] = t;

                    }

                });

            });

            editor.data = map;

        })

    }

    clear() {

        this.data.data.forEach(x => {

            x.forEach(tile => {

                if (tile) {

                    tile.destroy();
                    tile = null;

                }

            });

        });

    }

    save(): DataMap {

        let exportData = new DataMap(this.data.width, this.data.height);

        this.data.data.forEach(x => {

            x.forEach(tile => {

                if (tile) {

                    exportData.data[tile.posX][tile.posY] = tile.tint;

                }

            });

        });

        return exportData;

    }

}

export class Tile extends Phaser.Sprite {

    private map: Map;

    constructor(game: Phaser.Game, map: Map, x: number, y: number) {

        super(game, x, y, 'tile');

        this.map = map;

        this.autoCull = true;
        this.posX = x;
        this.posY = y;

        game.add.existing(this);
    }

    set posX(x) {

        this.x = x * 32;

    }

    get posX() {

        return this.x / 32;

    }

    set posY(y) {

        this.y = y * 32;

    }

    get posY() {

        return this.y / 32;

    }

}

export class EditorTile extends Tile {

    constructor(game: Phaser.Game, map: MapEditor, x: number, y: number) {

        super(game, map, x, y);

        this.alpha = 0.2;
        this.game = game;

        this.inputEnabled = true;

        this.events.onInputOver.add((tile) => {

            if (game.input.activePointer.isDown) {

                tile.events.onInputDown.dispatch(tile);

            }

            tile.alpha = 0.5;

        })

        this.events.onInputOut.add((tile) => {

            tile.alpha = 0.2;

        })

        this.events.onInputDown.add((tile) => {

            if (game.input.activePointer.leftButton.isDown) {

                if (map.data.data[tile.posX][tile.posY]) {

                    map.data.data[tile.posX][tile.posY].destroy();

                }

                map.data.data[tile.posX][tile.posY] = new Tile(game, map, tile.posX, tile.posY);
                map.data.data[tile.posX][tile.posY].tint = global.selected.primary.color;

            } else if (!map.state.ctrls.ctrl.isDown) {

                if (global.selected.secondary) {

                    if (map.data.data[tile.posX][tile.posY]) {

                        map.data.data[tile.posX][tile.posY].destroy();

                    }

                    map.data.data[tile.posX][tile.posY] = new Tile(game, map, tile.posX, tile.posY);
                    map.data.data[tile.posX][tile.posY].tint = global.selected.secondary.color;

                } else {

                    if (map.data.data[tile.posX][tile.posY]) {

                        map.data.data[tile.posX][tile.posY].destroy();
                        map.data.data[tile.posX][tile.posY] = null;

                    }

                }

            }

        })

    }

    update() {

        if (!this.game.input.activePointer.withinGame) {

            this.alpha = 0.2;

        }

    }

}