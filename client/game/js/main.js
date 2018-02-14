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
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.playerGroup = this.game.add.group();
        this.resourcesGroup = this.game.add.group();
        this.factoriesGroup = this.game.add.group();
        this.wallsGroup = this.game.add.group();
        this.playerGroup.enableBody = true;
        this.resourcesGroup.enableBody = true;
        this.factoriesGroup.enableBody = true;
        this.wallsGroup.enableBody = true;
        this.player = new player_1.Player(this, 32, 20, 20);
        this.playerGroup.add(this.player);
        this.game.world.bringToTop(this.playerGroup);
        this.resourcesData = this.cache.getJSON('resources');
        this.randomResources();
        this.randomWalls();
        this.randomFactories();
    };
    gameState.prototype.update = function () {
        for (var i = 0; i < this.resourcesGroup.children.length; i++) {
            if (this.game.physics.arcade.overlap(this.player, this.resourcesGroup.children[i])) {
                //STUFF
            }
        }
        for (var i = 0; i < this.wallsGroup.children.length; i++) {
            if (this.game.physics.arcade.collide(this.player, this.wallsGroup.children[i])) {
                //STUFF
            }
        }
        for (var i = 0; i < this.resourcesGroup.children.length; i++) {
            if (this.game.physics.arcade.overlap(this.player, this.resourcesGroup.children[i])) {
                //STUFF
            }
        }
        for (var i = 0; i < this.factoriesGroup.children.length; i++) {
            if (this.game.physics.arcade.collide(this.player, this.factoriesGroup.children[i])) {
                //STUFF
            }
        }
    };
    gameState.prototype.randomWalls = function () {
        var count = 3;
        var maxX = this.game.width / 32;
        var minX = 1;
        var maxY = 1;
        var minY = this.game.height / 32;
        for (var i = 0; i < count; i++) {
            var x = this.state.game.rnd.integerInRange(minX, maxX);
            var y = this.state.game.rnd.integerInRange(minY, maxY);
            this.wallsGroup.add(new wall_1.Wall(this, 0x000000, x * 32, y * 32));
        }
    };
    gameState.prototype.randomResources = function () {
        var count = 10;
        var maxX = (this.game.width / 32) - 1;
        var minX = 1;
        var maxY = 1;
        var minY = (this.game.height / 32 - 1);
        for (var i = 0; i < count; i++) {
            var x = this.state.game.rnd.integerInRange(minX, maxX);
            var y = this.state.game.rnd.integerInRange(minY, maxY);
            var rIndex = this.state.game.rnd.integerInRange(0, this.resourcesData.length - 1);
            this.resourcesGroup.add(new resource_1.Resource(this, this.resourcesData[rIndex], x * 32, y * 32));
        }
    };
    gameState.prototype.randomFactories = function () {
        var count = 2;
        var maxX = this.game.width / 32;
        var minX = 0;
        var maxY = 0;
        var minY = this.game.height / 32;
        for (var i = 0; i < count; i++) {
            var x = this.state.game.rnd.integerInRange(minX, maxX);
            var y = this.state.game.rnd.integerInRange(minY, maxY);
            var rIndex = this.state.game.rnd.integerInRange(0, this.resourcesData.length - 1);
            this.factoriesGroup.add(new factory_1.Factory(this, this.resourcesData[rIndex], x * 32, y * 32));
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
        _this.lineStyle(4, data.color);
        _this.drawRect(-32 / 2, -32 / 2, 32, 32);
        _this.text = _this.game.add.text(-8, -16, "F");
        _this.addChild(_this.text);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzk1MDFiMjM1MDUyZmQ0NjY5NGEiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2dhbWUvcmVzb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3dhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2ZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELG9CQUFvQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5Q0FBeUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUNBQXFDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlDQUF5QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5Q0FBeUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsV0FBVztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsV0FBVztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGdDOzs7Ozs7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGVBQWU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGtDOzs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esb0M7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGdDOzs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsbUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc5NTAxYjIzNTA1MmZkNDY2OTRhIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBnYW1lXzEgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG52YXIgR2FtZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhHYW1lLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR2FtZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCA5NjAsIDU0MCwgUGhhc2VyLkNBTlZBUywgJ2dhbWUnLCBudWxsLCBudWxsLCBmYWxzZSwgZmFsc2UpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUuYWRkKCdCb290JywgYm9vdFN0YXRlKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZS5hZGQoJ0dhbWUnLCBnYW1lXzEuZ2FtZVN0YXRlKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBHYW1lO1xyXG59KFBoYXNlci5HYW1lKSk7XHJcbmV4cG9ydHMuR2FtZSA9IEdhbWU7XHJcbnZhciBib290U3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoYm9vdFN0YXRlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gYm9vdFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIGJvb3RTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH07XHJcbiAgICBib290U3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJyk7XHJcbiAgICB9O1xyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGJvb3RTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5ib290U3RhdGUgPSBib290U3RhdGU7XHJcbmV4cG9ydHMuc29ja2V0ID0gaW8oKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoKTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9ib290LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYm9vdF8xID0gcmVxdWlyZShcIi4vYm9vdFwiKTtcclxudmFyIHBsYXllcl8xID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xyXG52YXIgcmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL3Jlc291cmNlXCIpO1xyXG52YXIgd2FsbF8xID0gcmVxdWlyZShcIi4vd2FsbFwiKTtcclxudmFyIGZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL2ZhY3RvcnlcIik7XHJcbnZhciBnYW1lU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoZ2FtZVN0YXRlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gZ2FtZVN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5hbGlnbih0cnVlLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjYWxlLnNldFJlc2l6ZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS5zZXRNYXhpbXVtKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmpzb24oJ3Jlc291cmNlcycsICdjbGllbnQvYXNzZXRzL3Jlc291cmNlcy5qc29uJyk7XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcmVyLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4gICAgICAgIFBoYXNlci5DYW52YXMuc2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCh0aGlzLmdhbWUuY2FudmFzKTtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH07XHJcbiAgICAgICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1NTU1NkJcIjtcclxuICAgICAgICB0aGlzLmlucHV0LmtleWJvYXJkLmFkZENhbGxiYWNrcyh0aGlzLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ3AnKSB7XHJcbiAgICAgICAgICAgICAgICBib290XzEuc29ja2V0LmVtaXQoJ2NhcHR1cmUnLCB0aGlzLmdhbWUuY2FudmFzLnRvRGF0YVVSTCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMucGxheWVyR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZXNHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICB0aGlzLmZhY3Rvcmllc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMud2FsbHNHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllckdyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mYWN0b3JpZXNHcm91cC5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndhbGxzR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgcGxheWVyXzEuUGxheWVyKHRoaXMsIDMyLCAyMCwgMjApO1xyXG4gICAgICAgIHRoaXMucGxheWVyR3JvdXAuYWRkKHRoaXMucGxheWVyKTtcclxuICAgICAgICB0aGlzLmdhbWUud29ybGQuYnJpbmdUb1RvcCh0aGlzLnBsYXllckdyb3VwKTtcclxuICAgICAgICB0aGlzLnJlc291cmNlc0RhdGEgPSB0aGlzLmNhY2hlLmdldEpTT04oJ3Jlc291cmNlcycpO1xyXG4gICAgICAgIHRoaXMucmFuZG9tUmVzb3VyY2VzKCk7XHJcbiAgICAgICAgdGhpcy5yYW5kb21XYWxscygpO1xyXG4gICAgICAgIHRoaXMucmFuZG9tRmFjdG9yaWVzKCk7XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlc291cmNlc0dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5yZXNvdXJjZXNHcm91cC5jaGlsZHJlbltpXSkpIHtcclxuICAgICAgICAgICAgICAgIC8vU1RVRkZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbltpXSkpIHtcclxuICAgICAgICAgICAgICAgIC8vU1RVRkZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVzb3VyY2VzR3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLnJlc291cmNlc0dyb3VwLmNoaWxkcmVuW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgLy9TVFVGRlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mYWN0b3JpZXNHcm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuZmFjdG9yaWVzR3JvdXAuY2hpbGRyZW5baV0pKSB7XHJcbiAgICAgICAgICAgICAgICAvL1NUVUZGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5yYW5kb21XYWxscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY291bnQgPSAzO1xyXG4gICAgICAgIHZhciBtYXhYID0gdGhpcy5nYW1lLndpZHRoIC8gMzI7XHJcbiAgICAgICAgdmFyIG1pblggPSAxO1xyXG4gICAgICAgIHZhciBtYXhZID0gMTtcclxuICAgICAgICB2YXIgbWluWSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAzMjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKG1pblgsIG1heFgpO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UobWluWSwgbWF4WSk7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbHNHcm91cC5hZGQobmV3IHdhbGxfMS5XYWxsKHRoaXMsIDB4MDAwMDAwLCB4ICogMzIsIHkgKiAzMikpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnJhbmRvbVJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY291bnQgPSAxMDtcclxuICAgICAgICB2YXIgbWF4WCA9ICh0aGlzLmdhbWUud2lkdGggLyAzMikgLSAxO1xyXG4gICAgICAgIHZhciBtaW5YID0gMTtcclxuICAgICAgICB2YXIgbWF4WSA9IDE7XHJcbiAgICAgICAgdmFyIG1pblkgPSAodGhpcy5nYW1lLmhlaWdodCAvIDMyIC0gMSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5zdGF0ZS5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZShtaW5YLCBtYXhYKTtcclxuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKG1pblksIG1heFkpO1xyXG4gICAgICAgICAgICB2YXIgckluZGV4ID0gdGhpcy5zdGF0ZS5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCB0aGlzLnJlc291cmNlc0RhdGEubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzR3JvdXAuYWRkKG5ldyByZXNvdXJjZV8xLlJlc291cmNlKHRoaXMsIHRoaXMucmVzb3VyY2VzRGF0YVtySW5kZXhdLCB4ICogMzIsIHkgKiAzMikpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnJhbmRvbUZhY3RvcmllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY291bnQgPSAyO1xyXG4gICAgICAgIHZhciBtYXhYID0gdGhpcy5nYW1lLndpZHRoIC8gMzI7XHJcbiAgICAgICAgdmFyIG1pblggPSAwO1xyXG4gICAgICAgIHZhciBtYXhZID0gMDtcclxuICAgICAgICB2YXIgbWluWSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAzMjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKG1pblgsIG1heFgpO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UobWluWSwgbWF4WSk7XHJcbiAgICAgICAgICAgIHZhciBySW5kZXggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIHRoaXMucmVzb3VyY2VzRGF0YS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5mYWN0b3JpZXNHcm91cC5hZGQobmV3IGZhY3RvcnlfMS5GYWN0b3J5KHRoaXMsIHRoaXMucmVzb3VyY2VzRGF0YVtySW5kZXhdLCB4ICogMzIsIHkgKiAzMikpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gZ2FtZVN0YXRlO1xyXG59KFBoYXNlci5TdGF0ZSkpO1xyXG5leHBvcnRzLmdhbWVTdGF0ZSA9IGdhbWVTdGF0ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2FtZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9nYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUGxheWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFBsYXllciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFBsYXllcihzdGF0ZSwgZGlhbWV0ZXIsIHgsIHkpIHtcclxuICAgICAgICBpZiAoZGlhbWV0ZXIgPT09IHZvaWQgMCkgeyBkaWFtZXRlciA9IDMyOyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy54ID0geDtcclxuICAgICAgICBfdGhpcy55ID0geTtcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIF90aGlzLmxpbmVTdHlsZSgxLCAweDMzRERGRiwgMSk7XHJcbiAgICAgICAgX3RoaXMuYXJjKDAsIDAsIGRpYW1ldGVyIC8gMiwgUGhhc2VyLk1hdGguZGVnVG9SYWQoLTkwKSwgUGhhc2VyLk1hdGguZGVnVG9SYWQoOTApLCBmYWxzZSk7XHJcbiAgICAgICAgX3RoaXMubGluZVN0eWxlKDEsIDB4Q0UzM0ZGLCAxKTtcclxuICAgICAgICBfdGhpcy5hcmMoMCwgMCwgZGlhbWV0ZXIgLyAyLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCg5MCksIFBoYXNlci5NYXRoLmRlZ1RvUmFkKC05MCksIGZhbHNlKTtcclxuICAgICAgICBfdGhpcy5jdHJscyA9IHtcclxuICAgICAgICAgICAgVzogX3RoaXMuc3RhdGUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5XKSxcclxuICAgICAgICAgICAgQTogX3RoaXMuc3RhdGUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BKSxcclxuICAgICAgICAgICAgUzogX3RoaXMuc3RhdGUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TKSxcclxuICAgICAgICAgICAgRDogX3RoaXMuc3RhdGUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5EKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMDtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmFuZ2xlVG9Qb2ludGVyKHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmN0cmxzLlcuaXNEb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLTE1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3RybHMuQS5pc0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5TLmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDE1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3RybHMuRC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAxNTA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBQbGF5ZXI7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuUGxheWVyID0gUGxheWVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbGF5ZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvcGxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVzb3VyY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUmVzb3VyY2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBSZXNvdXJjZShzdGF0ZSwgZGF0YSwgeCwgeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUsIHgsIHkpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMucmVzb3VyY2VEYXRhID0gZGF0YTtcclxuICAgICAgICBfdGhpcy5iZWdpbkZpbGwoZGF0YS5jb2xvcik7XHJcbiAgICAgICAgX3RoaXMuZHJhd1JlY3QoLTMyIC8gMiwgLTMyIC8gMiwgMzIsIDMyKTtcclxuICAgICAgICBfdGhpcy5lbmRGaWxsKCk7XHJcbiAgICAgICAgc3RhdGUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzb3VyY2U7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuUmVzb3VyY2UgPSBSZXNvdXJjZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb3VyY2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvcmVzb3VyY2UuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBXYWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFdhbGwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBXYWxsKHN0YXRlLCBjb2xvciwgeCwgeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUsIHgsIHkpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuYmVnaW5GaWxsKGNvbG9yKTtcclxuICAgICAgICBfdGhpcy5kcmF3UmVjdCgtMzIgLyAyLCAtMzIgLyAyLCAzMiwgMzIpO1xyXG4gICAgICAgIF90aGlzLmVuZEZpbGwoKTtcclxuICAgICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKF90aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIF90aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBXYWxsO1xyXG59KFBoYXNlci5HcmFwaGljcykpO1xyXG5leHBvcnRzLldhbGwgPSBXYWxsO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13YWxsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9nYW1lL3dhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBGYWN0b3J5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEZhY3RvcnksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGYWN0b3J5KHN0YXRlLCBkYXRhLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yZXNvdXJjZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIF90aGlzLmxpbmVTdHlsZSg0LCBkYXRhLmNvbG9yKTtcclxuICAgICAgICBfdGhpcy5kcmF3UmVjdCgtMzIgLyAyLCAtMzIgLyAyLCAzMiwgMzIpO1xyXG4gICAgICAgIF90aGlzLnRleHQgPSBfdGhpcy5nYW1lLmFkZC50ZXh0KC04LCAtMTYsIFwiRlwiKTtcclxuICAgICAgICBfdGhpcy5hZGRDaGlsZChfdGhpcy50ZXh0KTtcclxuICAgICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKF90aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIF90aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBGYWN0b3J5O1xyXG59KFBoYXNlci5HcmFwaGljcykpO1xyXG5leHBvcnRzLkZhY3RvcnkgPSBGYWN0b3J5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mYWN0b3J5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9nYW1lL2ZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==