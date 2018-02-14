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
        this.randomResources(20);
        this.randomWalls(5);
        this.randomFactories(3);
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
        for (var i = 0; i < this.factoriesGroup.children.length; i++) {
            if (this.game.physics.arcade.collide(this.player, this.factoriesGroup.children[i])) {
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
            this.resourcesGroup.add(new resource_1.Resource(this, this.resourcesData[rIndex], pos.x * 32, pos.y * 32));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGRlNmQ0NGQ5MGNlMzMzMjMzN2MiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2dhbWUvcmVzb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL3dhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9nYW1lL2ZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxtQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGRlNmQ0NGQ5MGNlMzMzMjMzN2MiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGdhbWVfMSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XHJcbnZhciBHYW1lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEdhbWUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBHYW1lKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIDk2MCwgNTQwLCBQaGFzZXIuQ0FOVkFTLCAnZ2FtZScsIG51bGwsIG51bGwsIGZhbHNlLCBmYWxzZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0ZS5hZGQoJ0Jvb3QnLCBib290U3RhdGUpO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLmFkZCgnR2FtZScsIGdhbWVfMS5nYW1lU3RhdGUpO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEdhbWU7XHJcbn0oUGhhc2VyLkdhbWUpKTtcclxuZXhwb3J0cy5HYW1lID0gR2FtZTtcclxudmFyIGJvb3RTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhib290U3RhdGUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBib290U3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfTtcclxuICAgIGJvb3RTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW52YXMuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnKTtcclxuICAgIH07XHJcbiAgICBib290U3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYm9vdFN0YXRlO1xyXG59KFBoYXNlci5TdGF0ZSkpO1xyXG5leHBvcnRzLmJvb3RTdGF0ZSA9IGJvb3RTdGF0ZTtcclxuZXhwb3J0cy5zb2NrZXQgPSBpbygpO1xyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGdhbWUgPSBuZXcgR2FtZSgpO1xyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9nYW1lL2Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBib290XzEgPSByZXF1aXJlKFwiLi9ib290XCIpO1xyXG52YXIgcGxheWVyXzEgPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XHJcbnZhciByZXNvdXJjZV8xID0gcmVxdWlyZShcIi4vcmVzb3VyY2VcIik7XHJcbnZhciB3YWxsXzEgPSByZXF1aXJlKFwiLi93YWxsXCIpO1xyXG52YXIgZmFjdG9yeV8xID0gcmVxdWlyZShcIi4vZmFjdG9yeVwiKTtcclxudmFyIGdhbWVTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhnYW1lU3RhdGUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBnYW1lU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgICAgICB0aGlzLnNjYWxlLmFsaWduKHRydWUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0UmVzaXplQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnNldE1heGltdW0oKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmxvYWQuanNvbigncmVzb3VyY2VzJywgJ2NsaWVudC9hc3NldHMvcmVzb3VyY2VzLmpzb24nKTtcclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUucmVuZGVyZXIucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IHRydWU7XHJcbiAgICAgICAgUGhhc2VyLkNhbnZhcy5zZXRJbWFnZVJlbmRlcmluZ0NyaXNwKHRoaXMuZ2FtZS5jYW52YXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW52YXMub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfTtcclxuICAgICAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IFwiIzU1NTU2QlwiO1xyXG4gICAgICAgIHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncCcpIHtcclxuICAgICAgICAgICAgICAgIGJvb3RfMS5zb2NrZXQuZW1pdCgnY2FwdHVyZScsIHRoaXMuZ2FtZS5jYW52YXMudG9EYXRhVVJMKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICB0aGlzLnJlc291cmNlc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMuZmFjdG9yaWVzR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy53YWxsc0dyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZXNHcm91cC5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZhY3Rvcmllc0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2FsbHNHcm91cC5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBwbGF5ZXJfMS5QbGF5ZXIodGhpcywgMzIsIDIwLCAyMCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJHcm91cC5hZGQodGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5icmluZ1RvVG9wKHRoaXMucGxheWVyR3JvdXApO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzRGF0YSA9IHRoaXMuY2FjaGUuZ2V0SlNPTigncmVzb3VyY2VzJyk7XHJcbiAgICAgICAgdGhpcy5yYW5kb21SZXNvdXJjZXMoMjApO1xyXG4gICAgICAgIHRoaXMucmFuZG9tV2FsbHMoNSk7XHJcbiAgICAgICAgdGhpcy5yYW5kb21GYWN0b3JpZXMoMyk7XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlc291cmNlc0dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5yZXNvdXJjZXNHcm91cC5jaGlsZHJlbltpXSkpIHtcclxuICAgICAgICAgICAgICAgIC8vU1RVRkZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMud2FsbHNHcm91cC5jaGlsZHJlbltpXSkpIHtcclxuICAgICAgICAgICAgICAgIC8vU1RVRkZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmFjdG9yaWVzR3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmZhY3Rvcmllc0dyb3VwLmNoaWxkcmVuW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgLy9TVFVGRlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUuZ2V0UmFuZG9tWFkzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWF4WCA9ICh0aGlzLmdhbWUud2lkdGggLyAzMikgLSAxO1xyXG4gICAgICAgIHZhciBtaW5YID0gMTtcclxuICAgICAgICB2YXIgbWF4WSA9IDE7XHJcbiAgICAgICAgdmFyIG1pblkgPSAodGhpcy5nYW1lLmhlaWdodCAvIDMyIC0gMSk7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKG1pblgsIG1heFgpO1xyXG4gICAgICAgIHZhciB5ID0gdGhpcy5zdGF0ZS5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZShtaW5ZLCBtYXhZKTtcclxuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5yYW5kb21XYWxscyA9IGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRSYW5kb21YWTMyKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbHNHcm91cC5hZGQobmV3IHdhbGxfMS5XYWxsKHRoaXMsIDB4MDAwMDAwLCBwb3MueCAqIDMyLCBwb3MueSAqIDMyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUucmFuZG9tUmVzb3VyY2VzID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFJhbmRvbVhZMzIoKTtcclxuICAgICAgICAgICAgdmFyIHJJbmRleCA9IHRoaXMuc3RhdGUuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgdGhpcy5yZXNvdXJjZXNEYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlc0dyb3VwLmFkZChuZXcgcmVzb3VyY2VfMS5SZXNvdXJjZSh0aGlzLCB0aGlzLnJlc291cmNlc0RhdGFbckluZGV4XSwgcG9zLnggKiAzMiwgcG9zLnkgKiAzMikpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnJhbmRvbUZhY3RvcmllcyA9IGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRSYW5kb21YWTMyKCk7XHJcbiAgICAgICAgICAgIHZhciBySW5kZXggPSB0aGlzLnN0YXRlLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIHRoaXMucmVzb3VyY2VzRGF0YS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5mYWN0b3JpZXNHcm91cC5hZGQobmV3IGZhY3RvcnlfMS5GYWN0b3J5KHRoaXMsIHRoaXMucmVzb3VyY2VzRGF0YVtySW5kZXhdLCBwb3MueCAqIDMyLCBwb3MueSAqIDMyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBnYW1lU3RhdGU7XHJcbn0oUGhhc2VyLlN0YXRlKSk7XHJcbmV4cG9ydHMuZ2FtZVN0YXRlID0gZ2FtZVN0YXRlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1nYW1lLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9nYW1lL2dhbWUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBQbGF5ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUGxheWVyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUGxheWVyKHN0YXRlLCBkaWFtZXRlciwgeCwgeSkge1xyXG4gICAgICAgIGlmIChkaWFtZXRlciA9PT0gdm9pZCAwKSB7IGRpYW1ldGVyID0gMzI7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnggPSB4O1xyXG4gICAgICAgIF90aGlzLnkgPSB5O1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgX3RoaXMubGluZVN0eWxlKDEsIDB4MzNEREZGLCAxKTtcclxuICAgICAgICBfdGhpcy5hcmMoMCwgMCwgZGlhbWV0ZXIgLyAyLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCgtOTApLCBQaGFzZXIuTWF0aC5kZWdUb1JhZCg5MCksIGZhbHNlKTtcclxuICAgICAgICBfdGhpcy5saW5lU3R5bGUoMSwgMHhDRTMzRkYsIDEpO1xyXG4gICAgICAgIF90aGlzLmFyYygwLCAwLCBkaWFtZXRlciAvIDIsIFBoYXNlci5NYXRoLmRlZ1RvUmFkKDkwKSwgUGhhc2VyLk1hdGguZGVnVG9SYWQoLTkwKSwgZmFsc2UpO1xyXG4gICAgICAgIF90aGlzLmN0cmxzID0ge1xyXG4gICAgICAgICAgICBXOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlcpLFxyXG4gICAgICAgICAgICBBOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkEpLFxyXG4gICAgICAgICAgICBTOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlMpLFxyXG4gICAgICAgICAgICBEOiBfdGhpcy5zdGF0ZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkQpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3RhdGUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBQbGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuYW5nbGVUb1BvaW50ZXIodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3RybHMuVy5pc0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5BLmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN0cmxzLlMuaXNEb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55ID0gMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdHJscy5ELmlzRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDE1MDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBsYXllcjtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5QbGF5ZXIgPSBQbGF5ZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsYXllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZXNvdXJjZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhSZXNvdXJjZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJlc291cmNlKHN0YXRlLCBkYXRhLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yZXNvdXJjZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIF90aGlzLmJlZ2luRmlsbChkYXRhLmNvbG9yKTtcclxuICAgICAgICBfdGhpcy5kcmF3UmVjdCgtMzIgLyAyLCAtMzIgLyAyLCAzMiwgMzIpO1xyXG4gICAgICAgIF90aGlzLmVuZEZpbGwoKTtcclxuICAgICAgICBzdGF0ZS5hZGQuZXhpc3RpbmcoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNvdXJjZTtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5SZXNvdXJjZSA9IFJlc291cmNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNvdXJjZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvZ2FtZS9yZXNvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFdhbGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoV2FsbCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFdhbGwoc3RhdGUsIGNvbG9yLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3RhdGUuZ2FtZSwgeCwgeSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5iZWdpbkZpbGwoY29sb3IpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KC0zMiAvIDIsIC0zMiAvIDIsIDMyLCAzMik7XHJcbiAgICAgICAgX3RoaXMuZW5kRmlsbCgpO1xyXG4gICAgICAgIF90aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoX3RoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgX3RoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdhbGw7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuV2FsbCA9IFdhbGw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdhbGwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvd2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEZhY3RvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRmFjdG9yeSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZhY3Rvcnkoc3RhdGUsIGRhdGEsIHgsIHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lLCB4LCB5KSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnJlc291cmNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgX3RoaXMubGluZVN0eWxlKDIsIGRhdGEuY29sb3IpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KC0zMiAvIDIsIC0zMiAvIDIsIDMyLCAzMik7XHJcbiAgICAgICAgX3RoaXMuYWRkQ2hpbGQoX3RoaXMuZ2FtZS5hZGQudGV4dCgtMzIgLyA0LCAtMzIgLyAyLCBcIkZcIikpO1xyXG4gICAgICAgIF90aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoX3RoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgX3RoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEZhY3Rvcnk7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuRmFjdG9yeSA9IEZhY3Rvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3RvcnkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L2dhbWUvZmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9