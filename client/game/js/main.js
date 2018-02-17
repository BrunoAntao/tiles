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
var game_1 = __webpack_require__(1);
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this, 960, 512, Phaser.CANVAS, 'game', null, null, false, false) || this;
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
    resources: []
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
var player_1 = __webpack_require__(2);
var resourcesData_1 = __webpack_require__(3);
var resource_1 = __webpack_require__(4);
var wall_1 = __webpack_require__(5);
var factory_1 = __webpack_require__(6);
var ui_1 = __webpack_require__(7);
var inventoryPanel;
var gameState = /** @class */ (function (_super) {
    __extends(gameState, _super);
    function gameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gameState.prototype.preload = function () {
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
        this.stage.backgroundColor = "#55556B";
        this.input.keyboard.addCallbacks(this, function (event) {
            switch (event.key) {
                case 'p':
                    boot_1.socket.emit('capture', this.game.canvas.toDataURL());
                    break;
                case 'ç':
                    exports.player.equipped = new resourcesData_1.ProductData('pickaxe', new resourcesData_1.RecipeData(new Array()), 0, 0, 5);
                    break;
                case 'i':
                    inventoryPanel.dissapear();
                    break;
            }
        });
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.playerGroup = this.game.add.group();
        this.resourcesGroup = this.game.add.group();
        this.factoriesGroup = this.game.add.group();
        this.wallsGroup = this.game.add.group();
        this.resources = new Array();
        this.playerGroup.enableBody = true;
        this.resourcesGroup.enableBody = true;
        this.factoriesGroup.enableBody = true;
        this.wallsGroup.enableBody = true;
        exports.player = new player_1.Player(this, 32, 16, 16);
        this.playerGroup.add(exports.player);
        this.game.world.bringToTop(this.playerGroup);
        this.resourcesData = this.cache.getJSON('resources');
        boot_1.global.resources = this.resourcesData;
        this.randomResources(20);
        this.randomWalls(5);
        this.randomFactories(3);
        inventoryPanel = new ui_1.InventoryPanel(this, 15, 2, 30 - (15 + 1), 16 - (2 + 2), 30, exports.player.inventory);
        inventoryPanel.dissapear();
    };
    gameState.prototype.update = function () {
        this.game.physics.arcade.overlap(exports.player, this.resourcesGroup, function (player, resource) {
            if (resource.playerCanGet(player)) {
                var ii = new player_1.InventoryItem(resource.resourceData.type, resource.resourceData.quantity);
                player.inventory.add(ii);
                resource.kill();
            }
        });
        this.game.physics.arcade.collide(exports.player, this.wallsGroup);
        this.game.physics.arcade.collide(exports.player, this.factoriesGroup);
    };
    gameState.prototype.getRandomXY32 = function () {
        var maxX = this.game.width / 32;
        var minX = 0;
        var maxY = this.game.height / 32;
        var minY = 0;
        var x = this.state.game.rnd.integerInRange(minX, maxX);
        var y = this.state.game.rnd.integerInRange(minY, maxY);
        return { x: x, y: y };
    };
    gameState.prototype.randomWalls = function (count) {
        for (var i = 0; i < count; i++) {
            var pos = this.getRandomXY32();
            this.wallsGroup.add(new wall_1.Wall(this, 0x000000, pos.x * 32, pos.y * 32));
        }
    };
    gameState.prototype.randomResources = function (count) {
        for (var i = 0; i < count; i++) {
            var pos = this.getRandomXY32();
            var rIndex = this.state.game.rnd.integerInRange(0, this.resourcesData.length - 1);
            var r = new resource_1.Resource(this, this.resourcesData[rIndex], pos.x * 32, pos.y * 32);
            this.resources.push(r);
            this.resourcesGroup.add(r);
        }
    };
    gameState.prototype.randomFactories = function (count) {
        for (var i = 0; i < count; i++) {
            var pos = this.getRandomXY32();
            var rIndex = this.state.game.rnd.integerInRange(0, this.resourcesData.length - 1);
            this.factoriesGroup.add(new factory_1.Factory(this, this.resourcesData[rIndex], pos.x * 32, pos.y * 32));
        }
    };
    return gameState;
}(Phaser.State));
exports.gameState = gameState;


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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(state, diameter, x, y) {
        if (diameter === void 0) { diameter = 32; }
        var _this = _super.call(this, state.game) || this;
        _this.x = x;
        _this.y = y;
        _this.state = state;
        _this.inventory = new Inventory();
        _this.lineStyle(1, 0xff0000, 1);
        _this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(-90), Phaser.Math.degToRad(0), false);
        _this.lineStyle(1, 0x0000ff, 1);
        _this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(0), Phaser.Math.degToRad(90), false);
        _this.lineStyle(1, 0x00ff00, 1);
        _this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(90), Phaser.Math.degToRad(-90), false);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.setSize(32, 32, -16, -16);
        _this.body.collideWorldBounds = true;
        _this.ctrls = {
            W: _this.state.input.keyboard.addKey(Phaser.Keyboard.W),
            A: _this.state.input.keyboard.addKey(Phaser.Keyboard.A),
            S: _this.state.input.keyboard.addKey(Phaser.Keyboard.S),
            D: _this.state.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        state.add.existing(_this);
        return _this;
    }
    Player.prototype.render = function () {
        this.game.debug.body(this);
    };
    Player.prototype.update = function () {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.rotation = this.game.physics.arcade.angleToPointer(this);
        if (this.ctrls.W.isDown) {
            this.body.velocity.y = -150;
        }
        if (this.ctrls.A.isDown) {
            this.body.velocity.x = -150;
        }
        if (this.ctrls.S.isDown) {
            this.body.velocity.y = 150;
        }
        if (this.ctrls.D.isDown) {
            this.body.velocity.x = 150;
        }
    };
    return Player;
}(Phaser.Graphics));
exports.Player = Player;
var InventoryItem = /** @class */ (function () {
    function InventoryItem(type, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.type = type;
        this.quantity = quantity;
    }
    return InventoryItem;
}());
exports.InventoryItem = InventoryItem;
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.items = new Array();
    }
    Inventory.prototype.add = function (item) {
        console.log(this.items);
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].type === item.type) {
                this.items[i].quantity += item.quantity;
                return;
            }
        }
        this.items.push(item);
    };
    Inventory.prototype.use = function (item, quantity) {
        if (quantity === void 0) { quantity = item.quantity; }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].type === item.type) {
                this.items[i].quantity -= item.quantity;
                return;
            }
        }
    };
    return Inventory;
}());
exports.Inventory = Inventory;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResourceData = /** @class */ (function () {
    function ResourceData(color, type, hardness, quantity) {
        this.type = type;
        this.color = color;
        this.quantity = quantity;
        this.hardness = hardness;
    }
    return ResourceData;
}());
exports.ResourceData = ResourceData;
var ProductData = /** @class */ (function () {
    function ProductData(type, recipe, x, y, power) {
        if (x === void 0) { x = -1; }
        if (y === void 0) { y = -1; }
        if (power === void 0) { power = 1; }
        this.recipe = recipe;
        this.type = type;
        this.x = x;
        this.y = y;
        this.power = power;
    }
    return ProductData;
}());
exports.ProductData = ProductData;
var RecipeData = /** @class */ (function () {
    function RecipeData(required) {
        this.required = required;
    }
    return RecipeData;
}());
exports.RecipeData = RecipeData;


/***/ }),
/* 4 */
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
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(state, data, x, y) {
        var _this = _super.call(this, state.game, x, y) || this;
        _this.resourceData = data;
        _this.beginFill(data.color);
        _this.drawRect(0, 0, 32, 32);
        _this.endFill();
        state.add.existing(_this);
        return _this;
    }
    Resource.prototype.playerCanGet = function (p) {
        switch (this.resourceData.type) {
            case 'stone':
                return p.equipped && p.equipped.type === 'pickaxe' && p.equipped.power >= this.resourceData.hardness;
            default:
                return true;
        }
    };
    return Resource;
}(Phaser.Graphics));
exports.Resource = Resource;


/***/ }),
/* 5 */
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
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(state, color, x, y) {
        var _this = _super.call(this, state.game, x, y) || this;
        _this.beginFill(color);
        _this.drawRect(0, 0, 32, 32);
        _this.endFill();
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.immovable = true;
        state.add.existing(_this);
        return _this;
    }
    return Wall;
}(Phaser.Graphics));
exports.Wall = Wall;


/***/ }),
/* 6 */
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
var Factory = /** @class */ (function (_super) {
    __extends(Factory, _super);
    function Factory(state, data, x, y) {
        var _this = _super.call(this, state.game, x, y) || this;
        _this.resourceData = data;
        _this.lineStyle(2, data.color);
        _this.drawRect(0, 0, 32, 32);
        var text = _this.game.add.text(0, 0, "F");
        text.boundsAlignH = 'center';
        text.boundsAlignV = 'middle';
        text.setTextBounds(0, 0, 32, 32);
        _this.addChild(text);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.immovable = true;
        state.add.existing(_this);
        return _this;
    }
    return Factory;
}(Phaser.Graphics));
exports.Factory = Factory;


/***/ }),
/* 7 */
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
var InventoryPanel = /** @class */ (function (_super) {
    __extends(InventoryPanel, _super);
    //30 x 16
    function InventoryPanel(state, x, y, w, h, slots, inventory) {
        var _this = _super.call(this, state.game) || this;
        _this.x = x * 32;
        _this.y = y * 32;
        _this.state = state;
        _this.bgColor = 0x808080;
        _this.beginFill(_this.bgColor, 0.05);
        _this.lineStyle(4, 0x696969);
        _this.drawRect(0, 0, 32 * w, 32 * h);
        _this.endFill();
        _this.inventory = inventory;
        _this.w = w;
        _this.h = h;
        for (var i = 0; i < w * h; i++) {
            var slot = new ItemSlot(_this.state, _this, i % _this.w, Math.floor(i / _this.w));
            _this.addChild(slot);
        }
        _this.game.add.existing(_this);
        return _this;
    }
    InventoryPanel.prototype.getIndex2D = function (x, w, y) {
        return x * w + y;
    };
    InventoryPanel.prototype.dissapear = function () {
        this.visible = !this.visible;
    };
    InventoryPanel.prototype.update = function () {
        this.children.forEach(function (child) {
            child.update();
        }, this);
    };
    return InventoryPanel;
}(Phaser.Graphics));
exports.InventoryPanel = InventoryPanel;
var ItemSlot = /** @class */ (function (_super) {
    __extends(ItemSlot, _super);
    function ItemSlot(state, panel, x, y, w, h) {
        if (w === void 0) { w = 1; }
        if (h === void 0) { h = 1; }
        var _this = this;
        var graphics = state.add.graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(0, 0, w * 32, h * 32);
        graphics.endFill();
        _this = _super.call(this, state.game, x * 32, y * 32, graphics.generateTexture()) || this;
        _this.quantityText = _this.game.add.text(0, 0, '');
        _this.quantityText.boundsAlignH = 'center';
        _this.quantityText.boundsAlignV = 'top';
        _this.quantityText.setTextBounds(0, 0, 32, 32);
        _this.addChild(_this.quantityText);
        _this.graphics = graphics;
        _this.graphics.clear();
        _this.game.add.existing(_this);
        return _this;
    }
    ItemSlot.prototype.update = function () {
        for (var i = 0; i < boot_1.global.resources.length; i++) {
            var current = this.parent.inventory.items[this.x / 32 + this.y / 32 * this.parent.w];
            if (current && boot_1.global.resources[i].type == current.type) {
                this.tint = boot_1.global.resources[i].color;
                this.alpha = 1;
                this.quantityText.text = current.quantity.toString();
                break;
            }
            else {
                this.tint = this.parent.bgColor;
                this.alpha = 0.05;
            }
        }
    };
    return ItemSlot;
}(Phaser.Sprite));


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map