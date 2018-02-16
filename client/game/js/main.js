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
var player_1 = __webpack_require__(2);
var resourcesData_1 = __webpack_require__(3);
var resource_1 = __webpack_require__(4);
var wall_1 = __webpack_require__(5);
var factory_1 = __webpack_require__(6);
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
        exports.player = new player_1.Player(this, 32, 20, 20);
        this.playerGroup.add(exports.player);
        this.game.world.bringToTop(this.playerGroup);
        this.resourcesData = this.cache.getJSON('resources');
        this.randomResources(20);
        this.randomWalls(5);
        this.randomFactories(3);
    };
    gameState.prototype.update = function () {
        for (var i = 0; i < this.resources.length; i++) {
            var element = this.resources[i];
            if (this.game.physics.arcade.overlap(exports.player, element)) {
                if (element.playerCanGet(exports.player)) {
                    var ii = new player_1.InventoryItem(element.resourceData.type, element.resourceData.quantity);
                    exports.player.inventory.add(ii);
                    element.kill();
                }
                break;
            }
        }
        for (var i = 0; i < this.wallsGroup.children.length; i++) {
            if (this.game.physics.arcade.collide(exports.player, this.wallsGroup.children[i])) {
                //STUFF
            }
        }
        for (var i = 0; i < this.factoriesGroup.children.length; i++) {
            if (this.game.physics.arcade.collide(exports.player, this.factoriesGroup.children[i])) {
                //STUFF
            }
        }
    };
    gameState.prototype.getRandomXY32 = function () {
        var maxX = (this.game.width / 32) - 1;
        var minX = 1;
        var maxY = 1;
        var minY = (this.game.height / 32 - 1);
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
//# sourceMappingURL=game.js.map

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
        _this.lineStyle(1, 0x33DDFF, 1);
        _this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(-90), Phaser.Math.degToRad(90), false);
        _this.lineStyle(1, 0xCE33FF, 1);
        _this.arc(0, 0, diameter / 2, Phaser.Math.degToRad(90), Phaser.Math.degToRad(-90), false);
        _this.ctrls = {
            W: _this.state.input.keyboard.addKey(Phaser.Keyboard.W),
            A: _this.state.input.keyboard.addKey(Phaser.Keyboard.A),
            S: _this.state.input.keyboard.addKey(Phaser.Keyboard.S),
            D: _this.state.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        state.add.existing(_this);
        return _this;
    }
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
//# sourceMappingURL=player.js.map

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
//# sourceMappingURL=resourcesData.js.map

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
        _this.drawRect(-32 / 2, -32 / 2, 32, 32);
        _this.endFill();
        state.add.existing(_this);
        return _this;
    }
    Resource.prototype.playerCanGet = function (p) {
        switch (this.resourceData.type) {
            case 'wood':
                return true;
            case 'stone':
                return p.equipped && p.equipped.type === 'pickaxe' && p.equipped.power >= this.resourceData.hardness;
        }
    };
    return Resource;
}(Phaser.Graphics));
exports.Resource = Resource;
//# sourceMappingURL=resource.js.map

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
        _this.drawRect(-32 / 2, -32 / 2, 32, 32);
        _this.endFill();
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.immovable = true;
        state.add.existing(_this);
        return _this;
    }
    return Wall;
}(Phaser.Graphics));
exports.Wall = Wall;
//# sourceMappingURL=wall.js.map

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
        _this.drawRect(-32 / 2, -32 / 2, 32, 32);
        _this.addChild(_this.game.add.text(-32 / 4, -32 / 2, "F"));
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.immovable = true;
        state.add.existing(_this);
        return _this;
    }
    return Factory;
}(Phaser.Graphics));
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTNiMTcxNDVjMTc1YWE0YTI2MmUiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L3Jlc291cmNlRWRpdG9yL3Jlc291cmNlc0RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3Jlc291cmNlLmpzIiwid2VicGFjazovLy8uL2Rpc3QvZ2FtZS93YWxsLmpzIiwid2VicGFjazovLy8uL2Rpc3QvZ2FtZS9mYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtB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Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esb0M7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGdDOzs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLG1DIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlM2IxNzE0NWMxNzVhYTRhMjYyZSIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ2FtZV8xID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcclxudmFyIEdhbWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoR2FtZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEdhbWUoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgOTYwLCA1NDAsIFBoYXNlci5DQU5WQVMsICdnYW1lJywgbnVsbCwgbnVsbCwgZmFsc2UsIGZhbHNlKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLmFkZCgnQm9vdCcsIGJvb3RTdGF0ZSk7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUuYWRkKCdHYW1lJywgZ2FtZV8xLmdhbWVTdGF0ZSk7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gR2FtZTtcclxufShQaGFzZXIuR2FtZSkpO1xyXG5leHBvcnRzLkdhbWUgPSBHYW1lO1xyXG52YXIgYm9vdFN0YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKGJvb3RTdGF0ZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIGJvb3RTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBib290U3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScpO1xyXG4gICAgfTtcclxuICAgIGJvb3RTdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfTtcclxuICAgIHJldHVybiBib290U3RhdGU7XHJcbn0oUGhhc2VyLlN0YXRlKSk7XHJcbmV4cG9ydHMuYm9vdFN0YXRlID0gYm9vdFN0YXRlO1xyXG5leHBvcnRzLnNvY2tldCA9IGlvKCk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvYm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGJvb3RfMSA9IHJlcXVpcmUoXCIuL2Jvb3RcIik7XHJcbnZhciBwbGF5ZXJfMSA9IHJlcXVpcmUoXCIuL3BsYXllclwiKTtcclxudmFyIHJlc291cmNlc0RhdGFfMSA9IHJlcXVpcmUoXCIuLi9yZXNvdXJjZUVkaXRvci9yZXNvdXJjZXNEYXRhXCIpO1xyXG52YXIgcmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL3Jlc291cmNlXCIpO1xyXG52YXIgd2FsbF8xID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcclxudmFyIGZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL2ZhY3RvcnlcIik7XHJcbnZhciBnYW1lU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoZ2FtZVN0YXRlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gZ2FtZVN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5hbGlnbih0cnVlLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjYWxlLnNldFJlc2l6ZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS5zZXRNYXhpbXVtKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmpzb24oJ3Jlc291cmNlcycsICdjbGllbnQvYXNzZXRzL3Jlc291cmNlcy5qc29uJyk7XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcmVyLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4gICAgICAgIFBoYXNlci5DYW52YXMuc2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCh0aGlzLmdhbWUuY2FudmFzKTtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH07XHJcbiAgICAgICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1NTU1NkJcIjtcclxuICAgICAgICB0aGlzLmlucHV0LmtleWJvYXJkLmFkZENhbGxiYWNrcyh0aGlzLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3AnOlxyXG4gICAgICAgICAgICAgICAgICAgIGJvb3RfMS5zb2NrZXQuZW1pdCgnY2FwdHVyZScsIHRoaXMuZ2FtZS5jYW52YXMudG9EYXRhVVJMKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnw6cnOlxyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHMucGxheWVyLmVxdWlwcGVkID0gbmV3IHJlc291cmNlc0RhdGFfMS5Qcm9kdWN0RGF0YSgncGlja2F4ZScsIG5ldyByZXNvdXJjZXNEYXRhXzEuUmVjaXBlRGF0YShuZXcgQXJyYXkoKSksIDAsIDAsIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICB0aGlzLnJlc291cmNlc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMuZmFjdG9yaWVzR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy53YWxsc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJHcm91cC5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc291cmNlc0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmFjdG9yaWVzR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53YWxsc0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgIGV4cG9ydHMucGxheWVyID0gbmV3IHBsYXllcl8xLlBsYXllcih0aGlzLCAzMiwgMjAsIDIwKTtcclxuICAgICAgICB0aGlzLnBsYXllckdyb3VwLmFkZChleHBvcnRzLnBsYXllcik7XHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLmJyaW5nVG9Ub3AodGhpcy5wbGF5ZXJHcm91cCk7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZXNEYXRhID0gdGhpcy5jYWNoZS5nZXRKU09OKCdyZXNvdXJjZXMnKTtcclxuICAgICAgICB0aGlzLnJhbmRvbVJlc291cmNlcygyMCk7XHJcbiAgICAgICAgdGhpcy5yYW5kb21XYWxscyg1KTtcclxuICAgICAgICB0aGlzLnJhbmRvbUZhY3RvcmllcygzKTtcclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5yZXNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcChleHBvcnRzLnBsYXllciwgZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnBsYXllckNhbkdldChleHBvcnRzLnBsYXllcikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaWkgPSBuZXcgcGxheWVyXzEuSW52ZW50b3J5SXRlbShlbGVtZW50LnJlc291cmNlRGF0YS50eXBlLCBlbGVtZW50LnJlc291cmNlRGF0YS5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0cy5wbGF5ZXIuaW52ZW50b3J5LmFkZChpaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5raWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUoZXhwb3J0cy5wbGF5ZXIsIHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbltpXSkpIHtcclxuICAgICAgICAgICAgICAgIC8vU1RVRkZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmFjdG9yaWVzR3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGV4cG9ydHMucGxheWVyLCB0aGlzLmZhY3Rvcmllc0dyb3VwLmNoaWxkcmVuW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgLy9TVFVGRlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUuZ2V0UmFuZG9tWFkzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWF4WCA9ICh0aGlzLmdhbWUud2lkdGggLyAzMikgLSAxO1xyXG4gICAgICAgIHZhciBtaW5YID0gMTtcclxuICAgICAgICB2YXIgbWF4WSA9IDE7XHJcbiAgICAgICAgdmFyIG1pblkgPSAodGhpcy5nYW1lLmhlaWdodCAvIDMyIC0gMSk7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKG1pblgsIG1heFgpO1xyXG4gICAgICAgIHZhciB5ID0gdGhpcy5zdGF0ZS5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZShtaW5ZLCBtYXhZKTtcclxuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5yYW5kb21XYWxscyA9IGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRSYW5kb21YWTMyKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbHNHcm91cC5hZGQobmV3IHdhbGxfMS5XYWxsKHRoaXMsIDB4MDAwMDAwLCBwb3MueCAqIDMyLCBwb3MueSAqIDMyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucmFuZG9tUmVzb3VyY2VzID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFJhbmRvbVhZMzIoKTtcclxuICAgICAgICAgICAgdmFyIHJJbmRleCA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgdGhpcy5yZXNvdXJjZXNEYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB2YXIgciA9IG5ldyByZXNvdXJjZV8xLlJlc291cmNlKHRoaXMsIHRoaXMucmVzb3VyY2VzRGF0YVtySW5kZXhdLCBwb3MueCAqIDMyLCBwb3MueSAqIDMyKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChyKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNHcm91cC5hZGQocik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucmFuZG9tRmFjdG9yaWVzID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFJhbmRvbVhZMzIoKTtcclxuICAgICAgICAgICAgdmFyIHJJbmRleCA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgdGhpcy5yZXNvdXJjZXNEYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllc0dyb3VwLmFkZChuZXcgZmFjdG9yeV8xLkZhY3RvcnkodGhpcywgdGhpcy5yZXNvdXJjZXNEYXRhW3JJbmRleF0sIHBvcy54ICogMzIsIHBvcy55ICogMzIpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGdhbWVTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdhbWUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvZ2FtZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFBsYXllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhQbGF5ZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5ZXIoc3RhdGUsIGRpYW1ldGVyLCB4LCB5KSB7XHJcbiAgICAgICAgaWYgKGRpYW1ldGVyID09PSB2b2lkIDApIHsgZGlhbWV0ZXIgPSAzMjsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMueCA9IHg7XHJcbiAgICAgICAgX3RoaXMueSA9IHk7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBfdGhpcy5pbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XHJcbiAgICAgICAgX3RoaXMubGluZVN0eWxlKDEsIDB4MzNEREZGLCAxKTtcclxuICAgICAgICBfdGhpcy5hcmMoMCwgMCwgZGlhbWV0ZXIgLyAyLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCgtOTApLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCg5MCksIGZhbHNlKTtcclxuICAgICAgICBfdGhpcy5saW5lU3R5bGUoMSwgMHhDRTMzRkYsIDEpO1xyXG4gICAgICAgIF90aGlzLmFyYygwLCAwLCBkaWFtZXRlciAvIDIsIFBoYXNlci5NYXRoLmRlZ1RvUmFkKDkwKSwgUGhhc2VyLk1hdGguZGVnVG9SYWQoLTkwKSwgZmFsc2UpO1xyXG4gICAgICAgIF90aGlzLmN0cmxzID0ge1xyXG4gICAgICAgICAgICBXOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlcpLFxyXG4gICAgICAgICAgICBBOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxyXG4gICAgICAgICAgICBTOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxyXG4gICAgICAgICAgICBEOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3RhdGUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBQbGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuYW5nbGVUb1BvaW50ZXIodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3RybHMuVy5pc0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5BLmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN0cmxzLlMuaXNEb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5ELmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDE1MDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBsYXllcjtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5QbGF5ZXIgPSBQbGF5ZXI7XHJcbnZhciBJbnZlbnRvcnlJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSW52ZW50b3J5SXRlbSh0eXBlLCBxdWFudGl0eSkge1xyXG4gICAgICAgIGlmIChxdWFudGl0eSA9PT0gdm9pZCAwKSB7IHF1YW50aXR5ID0gMTsgfVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEludmVudG9yeUl0ZW07XHJcbn0oKSk7XHJcbmV4cG9ydHMuSW52ZW50b3J5SXRlbSA9IEludmVudG9yeUl0ZW07XHJcbnZhciBJbnZlbnRvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJbnZlbnRvcnkoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgSW52ZW50b3J5LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtc1tpXS50eXBlID09PSBpdGVtLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucXVhbnRpdHkgKz0gaXRlbS5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICB9O1xyXG4gICAgSW52ZW50b3J5LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoaXRlbSwgcXVhbnRpdHkpIHtcclxuICAgICAgICBpZiAocXVhbnRpdHkgPT09IHZvaWQgMCkgeyBxdWFudGl0eSA9IGl0ZW0ucXVhbnRpdHk7IH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNbaV0udHlwZSA9PT0gaXRlbS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLnF1YW50aXR5IC09IGl0ZW0ucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEludmVudG9yeTtcclxufSgpKTtcclxuZXhwb3J0cy5JbnZlbnRvcnkgPSBJbnZlbnRvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsYXllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlc291cmNlRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlc291cmNlRGF0YShjb2xvciwgdHlwZSwgaGFyZG5lc3MsIHF1YW50aXR5KSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMuaGFyZG5lc3MgPSBoYXJkbmVzcztcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNvdXJjZURhdGE7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUmVzb3VyY2VEYXRhID0gUmVzb3VyY2VEYXRhO1xyXG52YXIgUHJvZHVjdERhdGEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQcm9kdWN0RGF0YSh0eXBlLCByZWNpcGUsIHgsIHksIHBvd2VyKSB7XHJcbiAgICAgICAgaWYgKHggPT09IHZvaWQgMCkgeyB4ID0gLTE7IH1cclxuICAgICAgICBpZiAoeSA9PT0gdm9pZCAwKSB7IHkgPSAtMTsgfVxyXG4gICAgICAgIGlmIChwb3dlciA9PT0gdm9pZCAwKSB7IHBvd2VyID0gMTsgfVxyXG4gICAgICAgIHRoaXMucmVjaXBlID0gcmVjaXBlO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMucG93ZXIgPSBwb3dlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9kdWN0RGF0YTtcclxufSgpKTtcclxuZXhwb3J0cy5Qcm9kdWN0RGF0YSA9IFByb2R1Y3REYXRhO1xyXG52YXIgUmVjaXBlRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlY2lwZURhdGEocmVxdWlyZWQpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVkID0gcmVxdWlyZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVjaXBlRGF0YTtcclxufSgpKTtcclxuZXhwb3J0cy5SZWNpcGVEYXRhID0gUmVjaXBlRGF0YTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb3VyY2VzRGF0YS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvcmVzb3VyY2VFZGl0b3IvcmVzb3VyY2VzRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlc291cmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFJlc291cmNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUmVzb3VyY2Uoc3RhdGUsIGRhdGEsIHgsIHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lLCB4LCB5KSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnJlc291cmNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgX3RoaXMuYmVnaW5GaWxsKGRhdGEuY29sb3IpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KC0zMiAvIDIsIC0zMiAvIDIsIDMyLCAzMik7XHJcbiAgICAgICAgX3RoaXMuZW5kRmlsbCgpO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUmVzb3VyY2UucHJvdG90eXBlLnBsYXllckNhbkdldCA9IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnJlc291cmNlRGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dvb2QnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0b25lJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBwLmVxdWlwcGVkICYmIHAuZXF1aXBwZWQudHlwZSA9PT0gJ3BpY2theGUnICYmIHAuZXF1aXBwZWQucG93ZXIgPj0gdGhpcy5yZXNvdXJjZURhdGEuaGFyZG5lc3M7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNvdXJjZTtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5SZXNvdXJjZSA9IFJlc291cmNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNvdXJjZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9yZXNvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFdhbGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoV2FsbCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFdhbGwoc3RhdGUsIGNvbG9yLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5iZWdpbkZpbGwoY29sb3IpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KC0zMiAvIDIsIC0zMiAvIDIsIDMyLCAzMik7XHJcbiAgICAgICAgX3RoaXMuZW5kRmlsbCgpO1xyXG4gICAgICAgIF90aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoX3RoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgX3RoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdhbGw7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuV2FsbCA9IFdhbGw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdhbGwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvd2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEZhY3RvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRmFjdG9yeSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZhY3Rvcnkoc3RhdGUsIGRhdGEsIHgsIHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lLCB4LCB5KSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnJlc291cmNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgX3RoaXMubGluZVN0eWxlKDIsIGRhdGEuY29sb3IpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KC0zMiAvIDIsIC0zMiAvIDIsIDMyLCAzMik7XHJcbiAgICAgICAgX3RoaXMuYWRkQ2hpbGQoX3RoaXMuZ2FtZS5hZGQudGV4dCgtMzIgLyA0LCAtMzIgLyAyLCBcIkZcIikpO1xyXG4gICAgICAgIF90aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoX3RoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgX3RoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEZhY3Rvcnk7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuRmFjdG9yeSA9IEZhY3Rvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3RvcnkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvZmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9