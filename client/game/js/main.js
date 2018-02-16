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
var resourcesData_1 = __webpack_require__(6);
var resource_1 = __webpack_require__(3);
var wall_1 = __webpack_require__(4);
var factory_1 = __webpack_require__(5);
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
            if (event.key === 'p') {
                boot_1.socket.emit('capture', this.game.canvas.toDataURL());
            }
        });
        this.input.keyboard.addCallbacks(this, function (event) {
            if (event.key === 'ç') {
                exports.player.equipped = new resourcesData_1.ProductData('pickaxe', new resourcesData_1.RecipeData(new Array()), 0, 0, 5);
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
                this.items[i].quantity = parseInt(this.items[i].quantity.toString()) + parseInt(item.quantity.toString());
                return;
            }
        }
        this.items.push(item);
    };
    Inventory.prototype.use = function (item, quantity) {
        if (quantity === void 0) { quantity = item.quantity; }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].type === item.type) {
                this.items[i].quantity = parseInt(this.items[i].quantity.toString()) - parseInt(item.quantity.toString());
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

/***/ }),
/* 6 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzU5YjU5MzgzMjUzOGY5YmFiYTQiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2dhbWUvcmVzb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3dhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9yZXNvdXJjZUVkaXRvci9yZXNvdXJjZXNEYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtB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QTtBQUNBLENBQUM7QUFDRDtBQUNBLG9DOzs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxnQzs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxtQzs7Ozs7OztBQzVCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFFBQVE7QUFDbkMsMkJBQTJCLFFBQVE7QUFDbkMsK0JBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EseUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM1OWI1OTM4MzI1MzhmOWJhYmE0IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBnYW1lXzEgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG52YXIgR2FtZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhHYW1lLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR2FtZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCA5NjAsIDU0MCwgUGhhc2VyLkNBTlZBUywgJ2dhbWUnLCBudWxsLCBudWxsLCBmYWxzZSwgZmFsc2UpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUuYWRkKCdCb290JywgYm9vdFN0YXRlKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZS5hZGQoJ0dhbWUnLCBnYW1lXzEuZ2FtZVN0YXRlKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBHYW1lO1xyXG59KFBoYXNlci5HYW1lKSk7XHJcbmV4cG9ydHMuR2FtZSA9IEdhbWU7XHJcbnZhciBib290U3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoYm9vdFN0YXRlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gYm9vdFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIGJvb3RTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH07XHJcbiAgICBib290U3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJyk7XHJcbiAgICB9O1xyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGJvb3RTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5ib290U3RhdGUgPSBib290U3RhdGU7XHJcbmV4cG9ydHMuc29ja2V0ID0gaW8oKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoKTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9ib290LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYm9vdF8xID0gcmVxdWlyZShcIi4vYm9vdFwiKTtcclxudmFyIHBsYXllcl8xID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xyXG52YXIgcmVzb3VyY2VzRGF0YV8xID0gcmVxdWlyZShcIi4uL3Jlc291cmNlRWRpdG9yL3Jlc291cmNlc0RhdGFcIik7XHJcbnZhciByZXNvdXJjZV8xID0gcmVxdWlyZShcIi4vcmVzb3VyY2VcIik7XHJcbnZhciB3YWxsXzEgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xyXG52YXIgZmFjdG9yeV8xID0gcmVxdWlyZShcIi4vZmFjdG9yeVwiKTtcclxudmFyIGdhbWVTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhnYW1lU3RhdGUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBnYW1lU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgICAgICB0aGlzLnNjYWxlLmFsaWduKHRydWUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0UmVzaXplQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnNldE1heGltdW0oKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmxvYWQuanNvbigncmVzb3VyY2VzJywgJ2NsaWVudC9hc3NldHMvcmVzb3VyY2VzLmpzb24nKTtcclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUucmVuZGVyZXIucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IHRydWU7XHJcbiAgICAgICAgUGhhc2VyLkNhbnZhcy5zZXRJbWFnZVJlbmRlcmluZ0NyaXNwKHRoaXMuZ2FtZS5jYW52YXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW52YXMub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfTtcclxuICAgICAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IFwiIzU1NTU2QlwiO1xyXG4gICAgICAgIHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncCcpIHtcclxuICAgICAgICAgICAgICAgIGJvb3RfMS5zb2NrZXQuZW1pdCgnY2FwdHVyZScsIHRoaXMuZ2FtZS5jYW52YXMudG9EYXRhVVJMKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRDYWxsYmFja3ModGhpcywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICfDpycpIHtcclxuICAgICAgICAgICAgICAgIGV4cG9ydHMucGxheWVyLmVxdWlwcGVkID0gbmV3IHJlc291cmNlc0RhdGFfMS5Qcm9kdWN0RGF0YSgncGlja2F4ZScsIG5ldyByZXNvdXJjZXNEYXRhXzEuUmVjaXBlRGF0YShuZXcgQXJyYXkoKSksIDAsIDAsIDUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICB0aGlzLnJlc291cmNlc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMuZmFjdG9yaWVzR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy53YWxsc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJHcm91cC5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc291cmNlc0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmFjdG9yaWVzR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53YWxsc0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgIGV4cG9ydHMucGxheWVyID0gbmV3IHBsYXllcl8xLlBsYXllcih0aGlzLCAzMiwgMjAsIDIwKTtcclxuICAgICAgICB0aGlzLnBsYXllckdyb3VwLmFkZChleHBvcnRzLnBsYXllcik7XHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLmJyaW5nVG9Ub3AodGhpcy5wbGF5ZXJHcm91cCk7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZXNEYXRhID0gdGhpcy5jYWNoZS5nZXRKU09OKCdyZXNvdXJjZXMnKTtcclxuICAgICAgICB0aGlzLnJhbmRvbVJlc291cmNlcygyMCk7XHJcbiAgICAgICAgdGhpcy5yYW5kb21XYWxscyg1KTtcclxuICAgICAgICB0aGlzLnJhbmRvbUZhY3RvcmllcygzKTtcclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5yZXNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcChleHBvcnRzLnBsYXllciwgZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnBsYXllckNhbkdldChleHBvcnRzLnBsYXllcikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaWkgPSBuZXcgcGxheWVyXzEuSW52ZW50b3J5SXRlbShlbGVtZW50LnJlc291cmNlRGF0YS50eXBlLCBlbGVtZW50LnJlc291cmNlRGF0YS5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0cy5wbGF5ZXIuaW52ZW50b3J5LmFkZChpaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5raWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUoZXhwb3J0cy5wbGF5ZXIsIHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbltpXSkpIHtcclxuICAgICAgICAgICAgICAgIC8vU1RVRkZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmFjdG9yaWVzR3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGV4cG9ydHMucGxheWVyLCB0aGlzLmZhY3Rvcmllc0dyb3VwLmNoaWxkcmVuW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgLy9TVFVGRlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUuZ2V0UmFuZG9tWFkzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWF4WCA9ICh0aGlzLmdhbWUud2lkdGggLyAzMikgLSAxO1xyXG4gICAgICAgIHZhciBtaW5YID0gMTtcclxuICAgICAgICB2YXIgbWF4WSA9IDE7XHJcbiAgICAgICAgdmFyIG1pblkgPSAodGhpcy5nYW1lLmhlaWdodCAvIDMyIC0gMSk7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKG1pblgsIG1heFgpO1xyXG4gICAgICAgIHZhciB5ID0gdGhpcy5zdGF0ZS5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZShtaW5ZLCBtYXhZKTtcclxuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5yYW5kb21XYWxscyA9IGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRSYW5kb21YWTMyKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbHNHcm91cC5hZGQobmV3IHdhbGxfMS5XYWxsKHRoaXMsIDB4MDAwMDAwLCBwb3MueCAqIDMyLCBwb3MueSAqIDMyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucmFuZG9tUmVzb3VyY2VzID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFJhbmRvbVhZMzIoKTtcclxuICAgICAgICAgICAgdmFyIHJJbmRleCA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgdGhpcy5yZXNvdXJjZXNEYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB2YXIgciA9IG5ldyByZXNvdXJjZV8xLlJlc291cmNlKHRoaXMsIHRoaXMucmVzb3VyY2VzRGF0YVtySW5kZXhdLCBwb3MueCAqIDMyLCBwb3MueSAqIDMyKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChyKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNHcm91cC5hZGQocik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucmFuZG9tRmFjdG9yaWVzID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFJhbmRvbVhZMzIoKTtcclxuICAgICAgICAgICAgdmFyIHJJbmRleCA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgdGhpcy5yZXNvdXJjZXNEYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllc0dyb3VwLmFkZChuZXcgZmFjdG9yeV8xLkZhY3RvcnkodGhpcywgdGhpcy5yZXNvdXJjZXNEYXRhW3JJbmRleF0sIHBvcy54ICogMzIsIHBvcy55ICogMzIpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGdhbWVTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdhbWUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvZ2FtZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFBsYXllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhQbGF5ZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5ZXIoc3RhdGUsIGRpYW1ldGVyLCB4LCB5KSB7XHJcbiAgICAgICAgaWYgKGRpYW1ldGVyID09PSB2b2lkIDApIHsgZGlhbWV0ZXIgPSAzMjsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMueCA9IHg7XHJcbiAgICAgICAgX3RoaXMueSA9IHk7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBfdGhpcy5pbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XHJcbiAgICAgICAgX3RoaXMubGluZVN0eWxlKDEsIDB4MzNEREZGLCAxKTtcclxuICAgICAgICBfdGhpcy5hcmMoMCwgMCwgZGlhbWV0ZXIgLyAyLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCgtOTApLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCg5MCksIGZhbHNlKTtcclxuICAgICAgICBfdGhpcy5saW5lU3R5bGUoMSwgMHhDRTMzRkYsIDEpO1xyXG4gICAgICAgIF90aGlzLmFyYygwLCAwLCBkaWFtZXRlciAvIDIsIFBoYXNlci5NYXRoLmRlZ1RvUmFkKDkwKSwgUGhhc2VyLk1hdGguZGVnVG9SYWQoLTkwKSwgZmFsc2UpO1xyXG4gICAgICAgIF90aGlzLmN0cmxzID0ge1xyXG4gICAgICAgICAgICBXOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlcpLFxyXG4gICAgICAgICAgICBBOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxyXG4gICAgICAgICAgICBTOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxyXG4gICAgICAgICAgICBEOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3RhdGUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBQbGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuYW5nbGVUb1BvaW50ZXIodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3RybHMuVy5pc0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5BLmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN0cmxzLlMuaXNEb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5ELmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDE1MDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBsYXllcjtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5QbGF5ZXIgPSBQbGF5ZXI7XHJcbnZhciBJbnZlbnRvcnlJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSW52ZW50b3J5SXRlbSh0eXBlLCBxdWFudGl0eSkge1xyXG4gICAgICAgIGlmIChxdWFudGl0eSA9PT0gdm9pZCAwKSB7IHF1YW50aXR5ID0gMTsgfVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEludmVudG9yeUl0ZW07XHJcbn0oKSk7XHJcbmV4cG9ydHMuSW52ZW50b3J5SXRlbSA9IEludmVudG9yeUl0ZW07XHJcbnZhciBJbnZlbnRvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJbnZlbnRvcnkoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgSW52ZW50b3J5LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtc1tpXS50eXBlID09PSBpdGVtLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucXVhbnRpdHkgPSBwYXJzZUludCh0aGlzLml0ZW1zW2ldLnF1YW50aXR5LnRvU3RyaW5nKCkpICsgcGFyc2VJbnQoaXRlbS5xdWFudGl0eS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICB9O1xyXG4gICAgSW52ZW50b3J5LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoaXRlbSwgcXVhbnRpdHkpIHtcclxuICAgICAgICBpZiAocXVhbnRpdHkgPT09IHZvaWQgMCkgeyBxdWFudGl0eSA9IGl0ZW0ucXVhbnRpdHk7IH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNbaV0udHlwZSA9PT0gaXRlbS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLnF1YW50aXR5ID0gcGFyc2VJbnQodGhpcy5pdGVtc1tpXS5xdWFudGl0eS50b1N0cmluZygpKSAtIHBhcnNlSW50KGl0ZW0ucXVhbnRpdHkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEludmVudG9yeTtcclxufSgpKTtcclxuZXhwb3J0cy5JbnZlbnRvcnkgPSBJbnZlbnRvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsYXllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZXNvdXJjZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhSZXNvdXJjZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJlc291cmNlKHN0YXRlLCBkYXRhLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yZXNvdXJjZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIF90aGlzLmJlZ2luRmlsbChkYXRhLmNvbG9yKTtcclxuICAgICAgICBfdGhpcy5kcmF3UmVjdCgtMzIgLyAyLCAtMzIgLyAyLCAzMiwgMzIpO1xyXG4gICAgICAgIF90aGlzLmVuZEZpbGwoKTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFJlc291cmNlLnByb3RvdHlwZS5wbGF5ZXJDYW5HZXQgPSBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXNvdXJjZURhdGEudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICd3b29kJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBjYXNlICdzdG9uZSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5lcXVpcHBlZCAmJiBwLmVxdWlwcGVkLnR5cGUgPT09ICdwaWNrYXhlJyAmJiBwLmVxdWlwcGVkLnBvd2VyID49IHRoaXMucmVzb3VyY2VEYXRhLmhhcmRuZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzb3VyY2U7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuUmVzb3VyY2UgPSBSZXNvdXJjZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb3VyY2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvcmVzb3VyY2UuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBXYWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFdhbGwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBXYWxsKHN0YXRlLCBjb2xvciwgeCwgeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUsIHgsIHkpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuYmVnaW5GaWxsKGNvbG9yKTtcclxuICAgICAgICBfdGhpcy5kcmF3UmVjdCgtMzIgLyAyLCAtMzIgLyAyLCAzMiwgMzIpO1xyXG4gICAgICAgIF90aGlzLmVuZEZpbGwoKTtcclxuICAgICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKF90aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIF90aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBXYWxsO1xyXG59KFBoYXNlci5HcmFwaGljcykpO1xyXG5leHBvcnRzLldhbGwgPSBXYWxsO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13YWxsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9nYW1lL3dhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBGYWN0b3J5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEZhY3RvcnksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGYWN0b3J5KHN0YXRlLCBkYXRhLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yZXNvdXJjZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIF90aGlzLmxpbmVTdHlsZSgyLCBkYXRhLmNvbG9yKTtcclxuICAgICAgICBfdGhpcy5kcmF3UmVjdCgtMzIgLyAyLCAtMzIgLyAyLCAzMiwgMzIpO1xyXG4gICAgICAgIF90aGlzLmFkZENoaWxkKF90aGlzLmdhbWUuYWRkLnRleHQoLTMyIC8gNCwgLTMyIC8gMiwgXCJGXCIpKTtcclxuICAgICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKF90aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIF90aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBGYWN0b3J5O1xyXG59KFBoYXNlci5HcmFwaGljcykpO1xyXG5leHBvcnRzLkZhY3RvcnkgPSBGYWN0b3J5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mYWN0b3J5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9nYW1lL2ZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlc291cmNlRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlc291cmNlRGF0YShjb2xvciwgdHlwZSwgaGFyZG5lc3MsIHF1YW50aXR5KSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMuaGFyZG5lc3MgPSBoYXJkbmVzcztcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNvdXJjZURhdGE7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUmVzb3VyY2VEYXRhID0gUmVzb3VyY2VEYXRhO1xyXG52YXIgUHJvZHVjdERhdGEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQcm9kdWN0RGF0YSh0eXBlLCByZWNpcGUsIHgsIHksIHBvd2VyKSB7XHJcbiAgICAgICAgaWYgKHggPT09IHZvaWQgMCkgeyB4ID0gLTE7IH1cclxuICAgICAgICBpZiAoeSA9PT0gdm9pZCAwKSB7IHkgPSAtMTsgfVxyXG4gICAgICAgIGlmIChwb3dlciA9PT0gdm9pZCAwKSB7IHBvd2VyID0gMTsgfVxyXG4gICAgICAgIHRoaXMucmVjaXBlID0gcmVjaXBlO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMucG93ZXIgPSBwb3dlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9kdWN0RGF0YTtcclxufSgpKTtcclxuZXhwb3J0cy5Qcm9kdWN0RGF0YSA9IFByb2R1Y3REYXRhO1xyXG52YXIgUmVjaXBlRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlY2lwZURhdGEocmVxdWlyZWQpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVkID0gcmVxdWlyZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVjaXBlRGF0YTtcclxufSgpKTtcclxuZXhwb3J0cy5SZWNpcGVEYXRhID0gUmVjaXBlRGF0YTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb3VyY2VzRGF0YS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvcmVzb3VyY2VFZGl0b3IvcmVzb3VyY2VzRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9