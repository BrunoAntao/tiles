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
//# sourceMappingURL=boot.js.map

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
//# sourceMappingURL=menu.js.map

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
        this.load.json('tiles', 'client/assets/tiles.json');
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
        var items = this.cache.getJSON('tiles');
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
//# sourceMappingURL=game.js.map

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
//# sourceMappingURL=rts.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzk1NTBjMTJlOGU3MjY4YWFkYTIiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9tYXBFZGl0b3IvYm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L21hcEVkaXRvci9tZW51LmpzIiwid2VicGFjazovLy8uL2Rpc3QvbWFwRWRpdG9yL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9tYXBFZGl0b3IvcnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsYUFBYTtBQUMzQywrQkFBK0IsY0FBYztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLCtCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOTU1MGMxMmU4ZTcyNjhhYWRhMiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ2FtZV8xID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcclxudmFyIEl0ZW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJdGVtKHR5cGUsIGNvbG9yKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IHZvaWQgMCkgeyB0eXBlID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChjb2xvciA9PT0gdm9pZCAwKSB7IGNvbG9yID0gbnVsbDsgfVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEl0ZW07XHJcbn0oKSk7XHJcbmV4cG9ydHMuSXRlbSA9IEl0ZW07XHJcbnZhciBHYW1lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEdhbWUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBHYW1lKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIDk2MCwgNTQwLCBQaGFzZXIuQ0FOVkFTLCAnZ2FtZScsIG51bGwsIG51bGwsIGZhbHNlLCBmYWxzZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0ZS5hZGQoJ0Jvb3QnLCBib290U3RhdGUpO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLmFkZCgnR2FtZScsIGdhbWVfMS5nYW1lU3RhdGUpO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEdhbWU7XHJcbn0oUGhhc2VyLkdhbWUpKTtcclxuZXhwb3J0cy5HYW1lID0gR2FtZTtcclxudmFyIGJvb3RTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhib290U3RhdGUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBib290U3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubG9hZC5qc29uKCd0aWxlcycsICdjbGllbnQvYXNzZXRzL3RpbGVzLmpzb24nKTtcclxuICAgIH07XHJcbiAgICBib290U3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJyk7XHJcbiAgICB9O1xyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGJvb3RTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5ib290U3RhdGUgPSBib290U3RhdGU7XHJcbmV4cG9ydHMuZ2xvYmFsID0ge1xyXG4gICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICBwcmltYXJ5OiBuZXcgSXRlbSgpLFxyXG4gICAgICAgIHNlY29uZGFyeTogbmV3IEl0ZW0oKVxyXG4gICAgfSxcclxuICAgIGhpc3Rvcnk6IFtdXHJcbn07XHJcbmV4cG9ydHMuc29ja2V0ID0gaW8oKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoKTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvbWFwRWRpdG9yL2Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBib290XzEgPSByZXF1aXJlKFwiLi9ib290XCIpO1xyXG52YXIgTWVudSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhNZW51LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTWVudShzdGF0ZSwgaXRlbXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzaWRlQmFyID0gc3RhdGUuYWRkLmdyYXBoaWNzKCk7XHJcbiAgICAgICAgc2lkZUJhci5iZWdpbkZpbGwoMHgwMDAwMDApO1xyXG4gICAgICAgIHNpZGVCYXIubGluZVN0eWxlKDEsIDB4ZmZmZmZmLCAxKTtcclxuICAgICAgICBzaWRlQmFyLmRyYXdSZWN0KDAsIDAsIDE1OSwgc3RhdGUuZ2FtZS5oZWlnaHQgLSAxKTtcclxuICAgICAgICBzaWRlQmFyLmVuZEZpbGwoKTtcclxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUsIHN0YXRlLmdhbWUud2lkdGggLSAxNjAsIDAsIHNpZGVCYXIuZ2VuZXJhdGVUZXh0dXJlKCkpIHx8IHRoaXM7XHJcbiAgICAgICAgc2lkZUJhci5kZXN0cm95KCk7XHJcbiAgICAgICAgX3RoaXMuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBfdGhpcy5pdGVtcyA9IHN0YXRlLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgX3RoaXMuZGVsdGEgPSAwO1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcclxuICAgICAgICAgICAgdmFyIHRpbGUgPSBzdGF0ZS5hZGQuc3ByaXRlKHN0YXRlLmdhbWUud2lkdGggLSAxNjAgKyA2NCwgc3RhdGUuZ2FtZS5oZWlnaHQgLyAzICsgMzIgKyBpICogNDgsICd0aWxlJyk7XHJcbiAgICAgICAgICAgIHRpbGUudGludCA9IGl0ZW0uY29sb3I7XHJcbiAgICAgICAgICAgIHRpbGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGlsZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uICh0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaW5wdXQuYWN0aXZlUG9pbnRlci5sZWZ0QnV0dG9uLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb3RfMS5nbG9iYWwuc2VsZWN0ZWQucHJpbWFyeSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vdF8xLmdsb2JhbC5oaXN0b3J5LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvb3RfMS5nbG9iYWwuaGlzdG9yeS5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb3RfMS5nbG9iYWwuaGlzdG9yeS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb3RfMS5nbG9iYWwuc2VsZWN0ZWQuc2Vjb25kYXJ5ID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICBib290XzEuZ2xvYmFsLmhpc3RvcnkucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9vdF8xLmdsb2JhbC5oaXN0b3J5Lmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vdF8xLmdsb2JhbC5oaXN0b3J5LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBfdGhpcyk7XHJcbiAgICAgICAgICAgIF90aGlzLml0ZW1zLmFkZCh0aWxlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRlbHRhWSA8IDAgJiYgX3RoaXMuZGVsdGEgPiAtKF90aGlzLml0ZW1zLmxlbmd0aCAtIDcpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kZWx0YS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLmRlbHRhWSA+IDAgJiYgX3RoaXMuZGVsdGEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kZWx0YSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgX3RoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS55ID0gNDggKiBfdGhpcy5kZWx0YSArIHN0YXRlLmdhbWUuaGVpZ2h0IC8gMyArIDMyICsgaSAqIDQ4O1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9LCBfdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3RoaXMuc3ViQmFyID0gbmV3IHN1Yk1lbnUoc3RhdGUsIHN0YXRlLmdhbWUud2lkdGggLSAxNjAsIDAsIDE2MCwgc3RhdGUuZ2FtZS5oZWlnaHQgLyAzKTtcclxuICAgICAgICBfdGhpcy5zdWJTbG90MSA9IG5ldyBhY3RpdmVTbG90KHN0YXRlLCAxLCAwKTtcclxuICAgICAgICBfdGhpcy5zdWJTbG90MiA9IG5ldyBhY3RpdmVTbG90KHN0YXRlLCAyLCAwKTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIE1lbnUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgaXRlbS55ID0gX3RoaXMuc3RhdGUuY2FtZXJhLnkgKyA0OCAqIF90aGlzLmRlbHRhICsgX3RoaXMuc3RhdGUuZ2FtZS5oZWlnaHQgLyAzICsgMzIgKyBpICogNDg7XHJcbiAgICAgICAgICAgIGl0ZW0ueCA9IF90aGlzLnN0YXRlLmNhbWVyYS54ICsgX3RoaXMuc3RhdGUuZ2FtZS53aWR0aCAtIDE2MCArIDY0O1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS53b3JsZC5icmluZ1RvVG9wKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUud29ybGQuYnJpbmdUb1RvcCh0aGlzLnN1YkJhcik7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS53b3JsZC5icmluZ1RvVG9wKHRoaXMuc3ViQmFyLnNsb3RzKTtcclxuICAgICAgICB0aGlzLnN1YlNsb3QxLnNldENvbG9yKGJvb3RfMS5nbG9iYWwuc2VsZWN0ZWQucHJpbWFyeSk7XHJcbiAgICAgICAgdGhpcy5zdWJTbG90Mi5zZXRDb2xvcihib290XzEuZ2xvYmFsLnNlbGVjdGVkLnNlY29uZGFyeSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS53b3JsZC5icmluZ1RvVG9wKHRoaXMuc3ViU2xvdDEpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUud29ybGQuYnJpbmdUb1RvcCh0aGlzLnN1YlNsb3QyKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTWVudTtcclxufShQaGFzZXIuU3ByaXRlKSk7XHJcbmV4cG9ydHMuTWVudSA9IE1lbnU7XHJcbnZhciBzdWJNZW51ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKHN1Yk1lbnUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBzdWJNZW51KHN0YXRlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgc3ViTWVudSA9IHN0YXRlLmFkZC5ncmFwaGljcygpO1xyXG4gICAgICAgIHN1Yk1lbnUuYmVnaW5GaWxsKDB4MDAwMDAwKTtcclxuICAgICAgICBzdWJNZW51LmxpbmVTdHlsZSgxLCAweGZmZmZmZiwgMSk7XHJcbiAgICAgICAgc3ViTWVudS5kcmF3UmVjdCgwLCAwLCB3aWR0aCAtIDEsIGhlaWdodCAtIDEpO1xyXG4gICAgICAgIHN1Yk1lbnUuZW5kRmlsbCgpO1xyXG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSwgc3ViTWVudS5nZW5lcmF0ZVRleHR1cmUoKSkgfHwgdGhpcztcclxuICAgICAgICBzdWJNZW51LmRlc3Ryb3koKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIF90aGlzLnNsb3RzID0gbmV3IHNsb3RHcm91cChzdGF0ZSk7XHJcbiAgICAgICAgc3RhdGUuZ2FtZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBzdWJNZW51O1xyXG59KFBoYXNlci5TcHJpdGUpKTtcclxuZXhwb3J0cy5zdWJNZW51ID0gc3ViTWVudTtcclxudmFyIHNsb3RHcm91cCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhzbG90R3JvdXAsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBzbG90R3JvdXAoc3RhdGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRkKG5ldyBzbG90KF90aGlzLnN0YXRlLCAwLCBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBzbG90R3JvdXA7XHJcbn0oUGhhc2VyLkdyb3VwKSk7XHJcbmV4cG9ydHMuc2xvdEdyb3VwID0gc2xvdEdyb3VwO1xyXG52YXIgc2xvdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhzbG90LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gc2xvdChzdGF0ZSwgeCwgaSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNsb3QgPSBzdGF0ZS5hZGQuZ3JhcGhpY3MoKTtcclxuICAgICAgICBzbG90LmJlZ2luRmlsbCgweDAwMDAwMCk7XHJcbiAgICAgICAgc2xvdC5saW5lU3R5bGUoMiwgMHhmZmZmZmYsIDEpO1xyXG4gICAgICAgIHNsb3QuZHJhd1JlY3QoMCwgMCwgc3RhdGUuZ2FtZS5oZWlnaHQgLyAzIC8gNywgc3RhdGUuZ2FtZS5oZWlnaHQgLyAzIC8gNyk7XHJcbiAgICAgICAgc2xvdC5lbmRGaWxsKCk7XHJcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lLCBzdGF0ZS5nYW1lLndpZHRoIC0gMTYwICsgMTYgKyAoc3RhdGUuZ2FtZS5oZWlnaHQgLyAzIC8gNyArIDE2KSAqIHgsIHN0YXRlLmdhbWUuaGVpZ2h0IC8gMyAvIDcgKyBpICogc3RhdGUuZ2FtZS5oZWlnaHQgLyAzIC8gNywgc2xvdC5nZW5lcmF0ZVRleHR1cmUoKSkgfHwgdGhpcztcclxuICAgICAgICBzbG90LmRlc3Ryb3koKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIF90aGlzLml0ZW0gPSBudWxsO1xyXG4gICAgICAgIF90aGlzLmlkID0gaTtcclxuICAgICAgICBfdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIF90aGlzLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24gKHNsb3QpIHtcclxuICAgICAgICAgICAgaWYgKHNsb3Quc3RhdGUuaW5wdXQuYWN0aXZlUG9pbnRlci5sZWZ0QnV0dG9uLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgYm9vdF8xLmdsb2JhbC5zZWxlY3RlZC5wcmltYXJ5ID0gc2xvdC5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNsb3QuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgYm9vdF8xLmdsb2JhbC5zZWxlY3RlZC5zZWNvbmRhcnkgPSBzbG90Lml0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBfdGhpcyk7XHJcbiAgICAgICAgc3RhdGUuZ2FtZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHNsb3QucHJvdG90eXBlLnNldENvbG9yID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgZyA9IHRoaXMuc3RhdGUuYWRkLmdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIGcuYmVnaW5GaWxsKGl0ZW0uY29sb3IpO1xyXG4gICAgICAgICAgICBnLmxpbmVTdHlsZSgyLCAweGZmZmZmZiwgMSk7XHJcbiAgICAgICAgICAgIGcuZHJhd1JlY3QoMCwgMCwgdGhpcy5zdGF0ZS5nYW1lLmhlaWdodCAvIDMgLyA3LCB0aGlzLnN0YXRlLmdhbWUuaGVpZ2h0IC8gMyAvIDcpO1xyXG4gICAgICAgICAgICBnLmVuZEZpbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkVGV4dHVyZShnLmdlbmVyYXRlVGV4dHVyZSgpKTtcclxuICAgICAgICAgICAgZy5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNsb3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLml0ZW0gPSBib290XzEuZ2xvYmFsLmhpc3RvcnlbdGhpcy5pZF07XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLml0ZW0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBzbG90O1xyXG59KFBoYXNlci5TcHJpdGUpKTtcclxuZXhwb3J0cy5zbG90ID0gc2xvdDtcclxudmFyIGFjdGl2ZVNsb3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoYWN0aXZlU2xvdCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIGFjdGl2ZVNsb3Qoc3RhdGUsIHgsIGkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzbG90ID0gc3RhdGUuYWRkLmdyYXBoaWNzKCk7XHJcbiAgICAgICAgc2xvdC5iZWdpbkZpbGwoMHgwMDAwMDApO1xyXG4gICAgICAgIHNsb3QubGluZVN0eWxlKDIsIDB4ZmZmZmZmLCAxKTtcclxuICAgICAgICBzbG90LmRyYXdSZWN0KDAsIDAsIHN0YXRlLmdhbWUuaGVpZ2h0IC8gMyAvIDcsIHN0YXRlLmdhbWUuaGVpZ2h0IC8gMyAvIDcpO1xyXG4gICAgICAgIHNsb3QuZW5kRmlsbCgpO1xyXG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgc3RhdGUuZ2FtZS53aWR0aCAtIDE2MCArIDE2ICsgKHN0YXRlLmdhbWUuaGVpZ2h0IC8gMyAvIDcgKyAxNikgKiB4LCBzdGF0ZS5nYW1lLmhlaWdodCAvIDMgLyA3ICsgaSAqIHN0YXRlLmdhbWUuaGVpZ2h0IC8gMyAvIDcsIHNsb3QuZ2VuZXJhdGVUZXh0dXJlKCkpIHx8IHRoaXM7XHJcbiAgICAgICAgc2xvdC5kZXN0cm95KCk7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBfdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHN0YXRlLmdhbWUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBhY3RpdmVTbG90LnByb3RvdHlwZS5zZXRDb2xvciA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGcgPSB0aGlzLnN0YXRlLmFkZC5ncmFwaGljcygpO1xyXG4gICAgICAgICAgICBnLmJlZ2luRmlsbChpdGVtLmNvbG9yKTtcclxuICAgICAgICAgICAgZy5saW5lU3R5bGUoMiwgMHhmZmZmZmYsIDEpO1xyXG4gICAgICAgICAgICBnLmRyYXdSZWN0KDAsIDAsIHRoaXMuc3RhdGUuZ2FtZS5oZWlnaHQgLyAzIC8gNywgdGhpcy5zdGF0ZS5nYW1lLmhlaWdodCAvIDMgLyA3KTtcclxuICAgICAgICAgICAgZy5lbmRGaWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFRleHR1cmUoZy5nZW5lcmF0ZVRleHR1cmUoKSk7XHJcbiAgICAgICAgICAgIGcuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gYWN0aXZlU2xvdDtcclxufShQaGFzZXIuU3ByaXRlKSk7XHJcbmV4cG9ydHMuYWN0aXZlU2xvdCA9IGFjdGl2ZVNsb3Q7XHJcbnZhciBQb3B1cCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhQb3B1cCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFBvcHVwKHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUG9wdXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgZWxlbS5zZXRQYXJlbnQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQb3B1cDtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5Qb3B1cCA9IFBvcHVwO1xyXG52YXIgdGV4dEJveCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIHRleHRCb3goc3VibWl0KSB7XHJcbiAgICAgICAgaWYgKHN1Ym1pdCA9PT0gdm9pZCAwKSB7IHN1Ym1pdCA9IG51bGw7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gJzI1JSc7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSAnNDUlJztcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAlJztcclxuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdWJtaXQgPSBzdWJtaXQ7XHJcbiAgICAgICAgdmFyIGEgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBfdGhpcy5lbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc3VibWl0KF90aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBhcmVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICB0ZXh0Qm94LnByb3RvdHlwZS5zZXRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRleHRCb3g7XHJcbn0oKSk7XHJcbmV4cG9ydHMudGV4dEJveCA9IHRleHRCb3g7XHJcbnZhciBzZWxlY3RCb3ggPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBzZWxlY3RCb3goaXRlbXMsIHN1Ym1pdCkge1xyXG4gICAgICAgIGlmIChzdWJtaXQgPT09IHZvaWQgMCkgeyBzdWJtaXQgPSBudWxsOyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAnMjUlJztcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9ICc0NSUnO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMCUnO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5tdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICBhLnRleHQgPSBpdGVtO1xyXG4gICAgICAgICAgICBfdGhpcy5lbGVtZW50Lm9wdGlvbnMuYWRkKGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN1Ym1pdCA9IHN1Ym1pdDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc3VibWl0KF90aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBhcmVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RCb3gucHJvdG90eXBlLnNldFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gc2VsZWN0Qm94O1xyXG59KCkpO1xyXG5leHBvcnRzLnNlbGVjdEJveCA9IHNlbGVjdEJveDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVudS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvbWFwRWRpdG9yL21lbnUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBydHNfMSA9IHJlcXVpcmUoXCIuL3J0c1wiKTtcclxudmFyIG1lbnVfMSA9IHJlcXVpcmUoXCIuL21lbnVcIik7XHJcbnZhciBib290XzEgPSByZXF1aXJlKFwiLi9ib290XCIpO1xyXG52YXIgZ2FtZVN0YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKGdhbWVTdGF0ZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIGdhbWVTdGF0ZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5ncm91bmRQb2ludCA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICAgIF90aGlzLm9yaWdEcmFnUG9pbnQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3RpbGUnLCAnL2NsaWVudC9hc3NldHMvdGlsZS5wbmcnLCAzMiwgMzIpO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgICAgICB0aGlzLnNjYWxlLmFsaWduKHRydWUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0UmVzaXplQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnNldE1heGltdW0oKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmxvYWQuanNvbigndGlsZXMnLCAnY2xpZW50L2Fzc2V0cy90aWxlcy5qc29uJyk7XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcmVyLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4gICAgICAgIFBoYXNlci5DYW52YXMuc2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCh0aGlzLmdhbWUuY2FudmFzKTtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH07XHJcbiAgICAgICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyMTIxMjFcIjtcclxuICAgICAgICB0aGlzLmN0cmxzID0ge1xyXG4gICAgICAgICAgICBjdHJsOiB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQ09OVFJPTClcclxuICAgICAgICB9O1xyXG4gICAgICAgIG5ldyBydHNfMS5NYXBFZGl0b3IodGhpcywgMTAsIDEwKTtcclxuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLmNhY2hlLmdldEpTT04oJ3RpbGVzJyk7XHJcbiAgICAgICAgYm9vdF8xLmdsb2JhbC5zZWxlY3RlZC5wcmltYXJ5ID0gaXRlbXNbMF07XHJcbiAgICAgICAgYm9vdF8xLmdsb2JhbC5zZWxlY3RlZC5zZWNvbmRhcnkgPSBudWxsO1xyXG4gICAgICAgIC8vc29ja2V0LmVtaXQoJ2NhcHR1cmUnLCB0aGlzLmdhbWUuY2FudmFzLnRvRGF0YVVSTCgpKTtcclxuICAgICAgICBuZXcgbWVudV8xLk1lbnUodGhpcywgaXRlbXMpO1xyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUuY2FtZXJhRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnB1dC5hY3RpdmVQb2ludGVyLnJpZ2h0QnV0dG9uLmlzRG93biAmJiB0aGlzLmN0cmxzLmN0cmwuaXNEb3duKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9yaWdEcmFnUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLnggKz0gdGhpcy5vcmlnRHJhZ1BvaW50LnggLSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXIucG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLnkgKz0gdGhpcy5vcmlnRHJhZ1BvaW50LnkgLSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXIucG9zaXRpb24ueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9yaWdEcmFnUG9pbnQgPSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXIucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ0RyYWdQb2ludCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhRHJhZygpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBnYW1lU3RhdGU7XHJcbn0oUGhhc2VyLlN0YXRlKSk7XHJcbmV4cG9ydHMuZ2FtZVN0YXRlID0gZ2FtZVN0YXRlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1nYW1lLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9tYXBFZGl0b3IvZ2FtZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGJvb3RfMSA9IHJlcXVpcmUoXCIuL2Jvb3RcIik7XHJcbnZhciBtZW51XzEgPSByZXF1aXJlKFwiLi9tZW51XCIpO1xyXG52YXIgRGF0YU1hcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERhdGFNYXAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGlmICh3aWR0aCA9PT0gdm9pZCAwKSB7IHdpZHRoID0gMTA7IH1cclxuICAgICAgICBpZiAoaGVpZ2h0ID09PSB2b2lkIDApIHsgaGVpZ2h0ID0gMTA7IH1cclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IEFycmF5KHdpZHRoKTtcclxuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbeF0gPSBuZXcgQXJyYXkoaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRGF0YU1hcDtcclxufSgpKTtcclxudmFyIE1hcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhNYXAsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBNYXAoc3RhdGUsIGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBuZXcgRGF0YU1hcCg1MCwgNTApOyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHN0YXRlLmdhbWUud29ybGQuc2V0Qm91bmRzKDAsIDAsIGRhdGEud2lkdGggKiAzMiArIDE2MCwgZGF0YS5oZWlnaHQgKiAzMik7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hcDtcclxufShQaGFzZXIuR3JvdXApKTtcclxuZXhwb3J0cy5NYXAgPSBNYXA7XHJcbnZhciBNYXBFZGl0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTWFwRWRpdG9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTWFwRWRpdG9yKHN0YXRlLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHdpZHRoID09PSB2b2lkIDApIHsgd2lkdGggPSAxMDsgfVxyXG4gICAgICAgIGlmIChoZWlnaHQgPT09IHZvaWQgMCkgeyBoZWlnaHQgPSAxMDsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLCBuZXcgRGF0YU1hcCh3aWR0aCwgaGVpZ2h0KSkgfHwgdGhpcztcclxuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IF90aGlzLmRhdGEud2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IF90aGlzLmRhdGEuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZChuZXcgRWRpdG9yVGlsZShzdGF0ZS5nYW1lLCBfdGhpcywgeCwgeSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRlLmlucHV0LmtleWJvYXJkLmFkZENhbGxiYWNrcyhfdGhpcywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAncycpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMucG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucG9wID0gbmV3IG1lbnVfMS5Qb3B1cChzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucG9wLmFkZChuZXcgbWVudV8xLnRleHRCb3goZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb3RfMS5zb2NrZXQuZW1pdCgnbWFwIHNhdmUnLCB7IG5hbWU6IGlucHV0LnZhbHVlLCBkYXRhOiBfdGhpcy5zYXZlKCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnBvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAnbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMucG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vdF8xLnNvY2tldC5lbWl0KCdmZXRjaCBtYXBsaXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgZWRpdG9yID0gX3RoaXM7XHJcbiAgICAgICAgYm9vdF8xLnNvY2tldC5vbignbWFwbGlzdCcsIGZ1bmN0aW9uIChtYXBsaXN0KSB7XHJcbiAgICAgICAgICAgIGVkaXRvci5wb3AgPSBuZXcgbWVudV8xLlBvcHVwKHN0YXRlKTtcclxuICAgICAgICAgICAgZWRpdG9yLnBvcC5hZGQobmV3IG1lbnVfMS5zZWxlY3RCb3gobWFwbGlzdCwgZnVuY3Rpb24gKHNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgYm9vdF8xLnNvY2tldC5lbWl0KCdmZXRjaCBtYXAnLCBzZWxlY3Quc2VsZWN0ZWRPcHRpb25zWzBdLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgZWRpdG9yLnBvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBib290XzEuc29ja2V0Lm9uKCdtYXAnLCBmdW5jdGlvbiAobWFwKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGVkaXRvci5jbGVhcigpO1xyXG4gICAgICAgICAgICBtYXAuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyLCB4KSB7XHJcbiAgICAgICAgICAgICAgICByLmZvckVhY2goZnVuY3Rpb24gKHRpbGUsIHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IG5ldyBUaWxlKHN0YXRlLmdhbWUsIF90aGlzLCB4LCB5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC50aW50ID0gdGlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmRhdGFbeF1beV0gPSB0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZWRpdG9yLmRhdGEgPSBtYXA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgTWFwRWRpdG9yLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmRhdGEuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHguZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTWFwRWRpdG9yLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBleHBvcnREYXRhID0gbmV3IERhdGFNYXAodGhpcy5kYXRhLndpZHRoLCB0aGlzLmRhdGEuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRhdGEuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHguZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBvcnREYXRhLmRhdGFbdGlsZS5wb3NYXVt0aWxlLnBvc1ldID0gdGlsZS50aW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZXhwb3J0RGF0YTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTWFwRWRpdG9yO1xyXG59KE1hcCkpO1xyXG5leHBvcnRzLk1hcEVkaXRvciA9IE1hcEVkaXRvcjtcclxudmFyIFRpbGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVGlsZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRpbGUoZ2FtZSwgbWFwLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZ2FtZSwgeCwgeSwgJ3RpbGUnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLm1hcCA9IG1hcDtcclxuICAgICAgICBfdGhpcy5hdXRvQ3VsbCA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMucG9zWCA9IHg7XHJcbiAgICAgICAgX3RoaXMucG9zWSA9IHk7XHJcbiAgICAgICAgZ2FtZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaWxlLnByb3RvdHlwZSwgXCJwb3NYXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueCAvIDMyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4ICogMzI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlsZS5wcm90b3R5cGUsIFwicG9zWVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnkgLyAzMjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHkpIHtcclxuICAgICAgICAgICAgdGhpcy55ID0geSAqIDMyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFRpbGU7XHJcbn0oUGhhc2VyLlNwcml0ZSkpO1xyXG5leHBvcnRzLlRpbGUgPSBUaWxlO1xyXG52YXIgRWRpdG9yVGlsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhFZGl0b3JUaWxlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gRWRpdG9yVGlsZShnYW1lLCBtYXAsIHgsIHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBnYW1lLCBtYXAsIHgsIHkpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuYWxwaGEgPSAwLjI7XHJcbiAgICAgICAgX3RoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgX3RoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBfdGhpcy5ldmVudHMub25JbnB1dE92ZXIuYWRkKGZ1bmN0aW9uICh0aWxlKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICB0aWxlLmV2ZW50cy5vbklucHV0RG93bi5kaXNwYXRjaCh0aWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aWxlLmFscGhhID0gMC41O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF90aGlzLmV2ZW50cy5vbklucHV0T3V0LmFkZChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICB0aWxlLmFscGhhID0gMC4yO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF90aGlzLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5sZWZ0QnV0dG9uLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcC5kYXRhLmRhdGFbdGlsZS5wb3NYXVt0aWxlLnBvc1ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmRhdGEuZGF0YVt0aWxlLnBvc1hdW3RpbGUucG9zWV0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWFwLmRhdGEuZGF0YVt0aWxlLnBvc1hdW3RpbGUucG9zWV0gPSBuZXcgVGlsZShnYW1lLCBtYXAsIHRpbGUucG9zWCwgdGlsZS5wb3NZKTtcclxuICAgICAgICAgICAgICAgIG1hcC5kYXRhLmRhdGFbdGlsZS5wb3NYXVt0aWxlLnBvc1ldLnRpbnQgPSBib290XzEuZ2xvYmFsLnNlbGVjdGVkLnByaW1hcnkuY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIW1hcC5zdGF0ZS5jdHJscy5jdHJsLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvb3RfMS5nbG9iYWwuc2VsZWN0ZWQuc2Vjb25kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcC5kYXRhLmRhdGFbdGlsZS5wb3NYXVt0aWxlLnBvc1ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5kYXRhLmRhdGFbdGlsZS5wb3NYXVt0aWxlLnBvc1ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmRhdGEuZGF0YVt0aWxlLnBvc1hdW3RpbGUucG9zWV0gPSBuZXcgVGlsZShnYW1lLCBtYXAsIHRpbGUucG9zWCwgdGlsZS5wb3NZKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuZGF0YS5kYXRhW3RpbGUucG9zWF1bdGlsZS5wb3NZXS50aW50ID0gYm9vdF8xLmdsb2JhbC5zZWxlY3RlZC5zZWNvbmRhcnkuY29sb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLmRhdGEuZGF0YVt0aWxlLnBvc1hdW3RpbGUucG9zWV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmRhdGEuZGF0YVt0aWxlLnBvc1hdW3RpbGUucG9zWV0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuZGF0YS5kYXRhW3RpbGUucG9zWF1bdGlsZS5wb3NZXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgRWRpdG9yVGlsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIud2l0aGluR2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFscGhhID0gMC4yO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gRWRpdG9yVGlsZTtcclxufShUaWxlKSk7XHJcbmV4cG9ydHMuRWRpdG9yVGlsZSA9IEVkaXRvclRpbGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ0cy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvbWFwRWRpdG9yL3J0cy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9