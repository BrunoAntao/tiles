/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(2);
var Item = /** @class */ (function () {
    function Item(type, color) {
        if (type === void 0) { type = null; }
        if (color === void 0) { color = null; }
        this.type = type;
        this.color = color;
    }
    return Item;
}());
exports.Item = Item;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this, 960, 540, Phaser.CANVAS, 'game', null, null, false, false) || this;
        _this.state.add('Boot', bootState);
        _this.state.add('Game', game_1.gameState);
        _this.state.start('Boot');
        return _this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;
var bootState = /** @class */ (function (_super) {
    __extends(bootState, _super);
    function bootState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bootState.prototype.preload = function () {
        this.load.json('tiles', 'client/assets/tiles.json');
    };
    bootState.prototype.create = function () {
        this.game.canvas.style.position = 'relative';
        this.state.start('Game');
    };
    bootState.prototype.update = function () {
    };
    return bootState;
}(Phaser.State));
exports.bootState = bootState;
exports.global = {
    selected: {
        primary: new Item(),
        secondary: new Item()
    },
    history: []
};
exports.socket = io();
window.onload = function () {
    var game = new Game();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = __webpack_require__(0);
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(state, items) {
        var _this = this;
        var sideBar = state.add.graphics();
        sideBar.beginFill(0x000000);
        sideBar.lineStyle(1, 0xffffff, 1);
        sideBar.drawRect(0, 0, 159, state.game.height - 1);
        sideBar.endFill();
        _this = _super.call(this, state.game, state.game.width - 160, 0, sideBar.generateTexture()) || this;
        sideBar.destroy();
        _this.fixedToCamera = true;
        _this.state = state;
        _this.items = state.game.add.group();
        _this.delta = 0;
        items.forEach(function (item, i) {
            var tile = state.add.sprite(state.game.width - 160 + 64, state.game.height / 3 + 32 + i * 48, 'tile');
            tile.tint = item.color;
            tile.inputEnabled = true;
            tile.events.onInputDown.add(function (tile) {
                if (state.input.activePointer.leftButton.isDown) {
                    boot_1.global.selected.primary = item;
                    boot_1.global.history.push(item);
                    if (boot_1.global.history.length > 5) {
                        boot_1.global.history.shift();
                    }
                }
                else {
                    boot_1.global.selected.secondary = item;
                    boot_1.global.history.push(item);
                    if (boot_1.global.history.length > 5) {
                        boot_1.global.history.shift();
                    }
                }
            }, _this);
            _this.items.add(tile);
        });
        window.addEventListener('mousewheel', function (e) {
            if (e.deltaY < 0 && _this.delta > -(_this.items.length - 7)) {
                _this.delta--;
            }
            if (e.deltaY > 0 && _this.delta < 0) {
                _this.delta++;
            }
            var i = 0;
            _this.items.forEach(function (item) {
                item.y = 48 * _this.delta + state.game.height / 3 + 32 + i * 48;
                i++;
            }, _this);
        });
        _this.subBar = new subMenu(state, state.game.width - 160, 0, 160, state.game.height / 3);
        _this.subSlot1 = new activeSlot(state, 1, 0);
        _this.subSlot2 = new activeSlot(state, 2, 0);
        state.add.existing(_this);
        return _this;
    }
    Menu.prototype.update = function () {
        var _this = this;
        var i = 0;
        this.items.forEach(function (item) {
            item.y = _this.state.camera.y + 48 * _this.delta + _this.state.game.height / 3 + 32 + i * 48;
            item.x = _this.state.camera.x + _this.state.game.width - 160 + 64;
            i++;
        }, this);
        this.state.world.bringToTop(this.items);
        this.state.world.bringToTop(this.subBar);
        this.state.world.bringToTop(this.subBar.slots);
        this.subSlot1.setColor(boot_1.global.selected.primary);
        this.subSlot2.setColor(boot_1.global.selected.secondary);
        this.state.world.bringToTop(this.subSlot1);
        this.state.world.bringToTop(this.subSlot2);
    };
    return Menu;
}(Phaser.Sprite));
exports.Menu = Menu;
var subMenu = /** @class */ (function (_super) {
    __extends(subMenu, _super);
    function subMenu(state, x, y, width, height) {
        var _this = this;
        var subMenu = state.add.graphics();
        subMenu.beginFill(0x000000);
        subMenu.lineStyle(1, 0xffffff, 1);
        subMenu.drawRect(0, 0, width - 1, height - 1);
        subMenu.endFill();
        _this = _super.call(this, state.game, x, y, subMenu.generateTexture()) || this;
        subMenu.destroy();
        _this.state = state;
        _this.slots = new slotGroup(state);
        state.game.add.existing(_this);
        return _this;
    }
    return subMenu;
}(Phaser.Sprite));
exports.subMenu = subMenu;
var slotGroup = /** @class */ (function (_super) {
    __extends(slotGroup, _super);
    function slotGroup(state) {
        var _this = _super.call(this, state.game) || this;
        _this.state = state;
        for (var i = 0; i < 5; i++) {
            _this.add(new slot(_this.state, 0, i));
        }
        return _this;
    }
    return slotGroup;
}(Phaser.Group));
exports.slotGroup = slotGroup;
var slot = /** @class */ (function (_super) {
    __extends(slot, _super);
    function slot(state, x, i) {
        var _this = this;
        var slot = state.add.graphics();
        slot.beginFill(0x000000);
        slot.lineStyle(2, 0xffffff, 1);
        slot.drawRect(0, 0, state.game.height / 3 / 7, state.game.height / 3 / 7);
        slot.endFill();
        _this = _super.call(this, state.game, state.game.width - 160 + 16 + (state.game.height / 3 / 7 + 16) * x, state.game.height / 3 / 7 + i * state.game.height / 3 / 7, slot.generateTexture()) || this;
        slot.destroy();
        _this.state = state;
        _this.item = null;
        _this.id = i;
        _this.inputEnabled = true;
        _this.events.onInputDown.add(function (slot) {
            if (slot.state.input.activePointer.leftButton.isDown) {
                boot_1.global.selected.primary = slot.item;
            }
            else if (slot.item) {
                boot_1.global.selected.secondary = slot.item;
            }
        }, _this);
        state.game.add.existing(_this);
        return _this;
    }
    slot.prototype.setColor = function (item) {
        if (item) {
            var g = this.state.add.graphics();
            g.beginFill(item.color);
            g.lineStyle(2, 0xffffff, 1);
            g.drawRect(0, 0, this.state.game.height / 3 / 7, this.state.game.height / 3 / 7);
            g.endFill();
            this.loadTexture(g.generateTexture());
            g.destroy();
        }
    };
    slot.prototype.update = function () {
        this.item = boot_1.global.history[this.id];
        this.setColor(this.item);
    };
    return slot;
}(Phaser.Sprite));
exports.slot = slot;
var activeSlot = /** @class */ (function (_super) {
    __extends(activeSlot, _super);
    function activeSlot(state, x, i) {
        var _this = this;
        var slot = state.add.graphics();
        slot.beginFill(0x000000);
        slot.lineStyle(2, 0xffffff, 1);
        slot.drawRect(0, 0, state.game.height / 3 / 7, state.game.height / 3 / 7);
        slot.endFill();
        _this = _super.call(this, state.game, state.game.width - 160 + 16 + (state.game.height / 3 / 7 + 16) * x, state.game.height / 3 / 7 + i * state.game.height / 3 / 7, slot.generateTexture()) || this;
        slot.destroy();
        _this.state = state;
        _this.inputEnabled = true;
        state.game.add.existing(_this);
        return _this;
    }
    activeSlot.prototype.setColor = function (item) {
        if (item) {
            var g = this.state.add.graphics();
            g.beginFill(item.color);
            g.lineStyle(2, 0xffffff, 1);
            g.drawRect(0, 0, this.state.game.height / 3 / 7, this.state.game.height / 3 / 7);
            g.endFill();
            this.loadTexture(g.generateTexture());
            g.destroy();
        }
    };
    return activeSlot;
}(Phaser.Sprite));
exports.activeSlot = activeSlot;
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(state) {
        var _this = _super.call(this, state.game) || this;
        _this.elements = [];
        state.add.existing(_this);
        return _this;
    }
    Popup.prototype.add = function (elem) {
        elem.setParent(this);
        this.elements.push(elem);
    };
    return Popup;
}(Phaser.Graphics));
exports.Popup = Popup;
var textBox = /** @class */ (function () {
    function textBox(submit) {
        if (submit === void 0) { submit = null; }
        var _this = this;
        this.element = document.createElement('input');
        this.element.style.position = 'absolute';
        this.element.style.top = '25%';
        this.element.style.left = '45%';
        this.element.style.width = '10%';
        this.parent = null;
        this.submit = submit;
        var a = function (e) {
            _this.element.focus();
            document.removeEventListener('keydown', a);
        };
        document.addEventListener('keydown', a);
        this.element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                _this.submit(_this.element);
                _this.element.remove();
                _this.parent.destroy();
            }
        });
        document.body.appendChild(this.element);
    }
    textBox.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    return textBox;
}());
exports.textBox = textBox;
var selectBox = /** @class */ (function () {
    function selectBox(items, submit) {
        if (submit === void 0) { submit = null; }
        var _this = this;
        this.element = document.createElement('select');
        this.element.style.position = 'absolute';
        this.element.style.top = '25%';
        this.element.style.left = '45%';
        this.element.style.width = '10%';
        this.element.multiple = false;
        items.forEach(function (item) {
            var a = document.createElement("option");
            a.text = item;
            _this.element.options.add(a);
        });
        this.parent = null;
        this.submit = submit;
        this.element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                _this.submit(_this.element);
                _this.element.remove();
                _this.parent.destroy();
            }
        });
        document.body.appendChild(this.element);
        this.element.focus();
    }
    selectBox.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    return selectBox;
}());
exports.selectBox = selectBox;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rts_1 = __webpack_require__(3);
var menu_1 = __webpack_require__(1);
var boot_1 = __webpack_require__(0);
var gameState = /** @class */ (function (_super) {
    __extends(gameState, _super);
    function gameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groundPoint = { x: 0, y: 0 };
        _this.origDragPoint = null;
        return _this;
    }
    gameState.prototype.preload = function () {
        this.load.spritesheet('tile', '/client/assets/tile.png', 32, 32);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.align(true, true);
        this.scale.setResizeCallback(function () {
            this.scale.setMaximum();
        }, this);
        this.load.json('resources', 'client/assets/resources.json');
    };
    gameState.prototype.create = function () {
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.stage.backgroundColor = "#212121";
        this.ctrls = {
            ctrl: this.input.keyboard.addKey(Phaser.Keyboard.CONTROL)
        };
        new rts_1.MapEditor(this, 10, 10);
        var items = this.cache.getJSON('resources');
        boot_1.global.selected.primary = items[0];
        boot_1.global.selected.secondary = null;
        //socket.emit('capture', this.game.canvas.toDataURL());
        new menu_1.Menu(this, items);
    };
    gameState.prototype.cameraDrag = function () {
        if (this.input.activePointer.rightButton.isDown && this.ctrls.ctrl.isDown) {
            if (this.origDragPoint) {
                this.camera.x += this.origDragPoint.x - this.input.activePointer.position.x;
                this.camera.y += this.origDragPoint.y - this.input.activePointer.position.y;
            }
            this.origDragPoint = this.input.activePointer.position.clone();
        }
        else {
            this.origDragPoint = null;
        }
    };
    gameState.prototype.update = function () {
        this.cameraDrag();
    };
    return gameState;
}(Phaser.State));
exports.gameState = gameState;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = __webpack_require__(0);
var menu_1 = __webpack_require__(1);
var DataMap = /** @class */ (function () {
    function DataMap(width, height) {
        if (width === void 0) { width = 10; }
        if (height === void 0) { height = 10; }
        this.width = width;
        this.height = height;
        this.data = new Array(width);
        for (var x = 0; x < this.width; x++) {
            this.data[x] = new Array(height);
        }
    }
    return DataMap;
}());
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(state, data) {
        if (data === void 0) { data = new DataMap(50, 50); }
        var _this = _super.call(this, state.game) || this;
        _this.data = data;
        _this.state = state;
        state.game.world.setBounds(0, 0, data.width * 32 + 160, data.height * 32);
        return _this;
    }
    return Map;
}(Phaser.Group));
exports.Map = Map;
var MapEditor = /** @class */ (function (_super) {
    __extends(MapEditor, _super);
    function MapEditor(state, width, height) {
        if (width === void 0) { width = 10; }
        if (height === void 0) { height = 10; }
        var _this = _super.call(this, state, new DataMap(width, height)) || this;
        for (var x = 0; x < _this.data.width; x++) {
            for (var y = 0; y < _this.data.height; y++) {
                _this.add(new EditorTile(state.game, _this, x, y));
            }
        }
        state.input.keyboard.addCallbacks(_this, function (e) {
            if (e.key === 's') {
                if (!_this.pop) {
                    _this.pop = new menu_1.Popup(state);
                    _this.pop.add(new menu_1.textBox(function (input) {
                        boot_1.socket.emit('map save', { name: input.value, data: _this.save() });
                        _this.pop = null;
                    }));
                }
            }
            else if (e.key === 'l') {
                if (!_this.pop) {
                    boot_1.socket.emit('fetch maplist');
                }
            }
        });
        var editor = _this;
        boot_1.socket.on('maplist', function (maplist) {
            editor.pop = new menu_1.Popup(state);
            editor.pop.add(new menu_1.selectBox(maplist, function (select) {
                boot_1.socket.emit('fetch map', select.selectedOptions[0].text);
                editor.pop = null;
            }));
        });
        boot_1.socket.on('map', function (map) {
            var _this = this;
            editor.clear();
            map.data.forEach(function (r, x) {
                r.forEach(function (tile, y) {
                    if (tile) {
                        var t = new Tile(state.game, _this, x, y);
                        t.tint = tile;
                        map.data[x][y] = t;
                    }
                });
            });
            editor.data = map;
        });
        return _this;
    }
    MapEditor.prototype.clear = function () {
        this.data.data.forEach(function (x) {
            x.forEach(function (tile) {
                if (tile) {
                    tile.destroy();
                    tile = null;
                }
            });
        });
    };
    MapEditor.prototype.save = function () {
        var exportData = new DataMap(this.data.width, this.data.height);
        this.data.data.forEach(function (x) {
            x.forEach(function (tile) {
                if (tile) {
                    exportData.data[tile.posX][tile.posY] = tile.tint;
                }
            });
        });
        return exportData;
    };
    return MapEditor;
}(Map));
exports.MapEditor = MapEditor;
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile(game, map, x, y) {
        var _this = _super.call(this, game, x, y, 'tile') || this;
        _this.map = map;
        _this.autoCull = true;
        _this.posX = x;
        _this.posY = y;
        game.add.existing(_this);
        return _this;
    }
    Object.defineProperty(Tile.prototype, "posX", {
        get: function () {
            return this.x / 32;
        },
        set: function (x) {
            this.x = x * 32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "posY", {
        get: function () {
            return this.y / 32;
        },
        set: function (y) {
            this.y = y * 32;
        },
        enumerable: true,
        configurable: true
    });
    return Tile;
}(Phaser.Sprite));
exports.Tile = Tile;
var EditorTile = /** @class */ (function (_super) {
    __extends(EditorTile, _super);
    function EditorTile(game, map, x, y) {
        var _this = _super.call(this, game, map, x, y) || this;
        _this.alpha = 0.2;
        _this.game = game;
        _this.inputEnabled = true;
        _this.events.onInputOver.add(function (tile) {
            if (game.input.activePointer.isDown) {
                tile.events.onInputDown.dispatch(tile);
            }
            tile.alpha = 0.5;
        });
        _this.events.onInputOut.add(function (tile) {
            tile.alpha = 0.2;
        });
        _this.events.onInputDown.add(function (tile) {
            if (game.input.activePointer.leftButton.isDown) {
                if (map.data.data[tile.posX][tile.posY]) {
                    map.data.data[tile.posX][tile.posY].destroy();
                }
                map.data.data[tile.posX][tile.posY] = new Tile(game, map, tile.posX, tile.posY);
                map.data.data[tile.posX][tile.posY].tint = boot_1.global.selected.primary.color;
            }
            else if (!map.state.ctrls.ctrl.isDown) {
                if (boot_1.global.selected.secondary) {
                    if (map.data.data[tile.posX][tile.posY]) {
                        map.data.data[tile.posX][tile.posY].destroy();
                    }
                    map.data.data[tile.posX][tile.posY] = new Tile(game, map, tile.posX, tile.posY);
                    map.data.data[tile.posX][tile.posY].tint = boot_1.global.selected.secondary.color;
                }
                else {
                    if (map.data.data[tile.posX][tile.posY]) {
                        map.data.data[tile.posX][tile.posY].destroy();
                        map.data.data[tile.posX][tile.posY] = null;
                    }
                }
            }
        });
        return _this;
    }
    EditorTile.prototype.update = function () {
        if (!this.game.input.activePointer.withinGame) {
            this.alpha = 0.2;
        }
    };
    return EditorTile;
}(Tile));
exports.EditorTile = EditorTile;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map