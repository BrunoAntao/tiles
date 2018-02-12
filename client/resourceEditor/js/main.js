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
var ui_1 = __webpack_require__(2);
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
        this.stage.backgroundColor = "#000000";
        this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));
        this.menu = {
            type: this.game.add.inputField(this.game.width / 3 * 2, this.game.height / 10 * 2, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Type',
                type: PhaserInput.InputType.text
            }),
            quantity: this.game.add.inputField(this.game.width / 3 * 2, this.game.height / 10 * 3, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Quantity',
                type: PhaserInput.InputType.number
            }),
            color: this.game.add.inputField(this.game.width / 3 * 2, this.game.height / 10 * 4, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Color',
                type: PhaserInput.InputType.text
            })
        };
        var display = new ui_1.Display(this, this.game.width / 3, this.game.height / 2, 0xffffff);
        this.menu.color.focusOut.add(function () {
            display.setColor(parseInt(this.value));
        }, this.menu.color);
        var submit = new ui_1.Submit(this, this.game.width / 3 * 2, this.game.height / 10 * 5);
    };
    gameState.prototype.update = function () {
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
var boot_1 = __webpack_require__(0);
var Display = /** @class */ (function (_super) {
    __extends(Display, _super);
    function Display(state, x, y, color) {
        var _this = _super.call(this, state.game) || this;
        _this.x = x - state.game.width / 6;
        _this.y = y - state.game.width / 6;
        _this.state = state;
        _this.color = color;
        _this.beginFill(_this.color);
        _this.lineStyle(2, 0x000000, 1);
        _this.drawRect(0, 0, _this.state.game.width / 3, _this.state.game.width / 3);
        _this.endFill();
        state.add.existing(_this);
        return _this;
    }
    Display.prototype.setColor = function (color) {
        this.clear();
        this.beginFill(color);
        this.lineStyle(2, 0x000000, 1);
        this.drawRect(0, 0, this.state.game.width / 3, this.state.game.width / 3);
        this.endFill();
        this.color = color;
    };
    return Display;
}(Phaser.Graphics));
exports.Display = Display;
var Submit = /** @class */ (function (_super) {
    __extends(Submit, _super);
    function Submit(state, x, y) {
        var _this = _super.call(this, state.game) || this;
        _this.x = x;
        _this.y = y;
        _this.state = state;
        _this.beginFill(0x000000);
        _this.lineStyle(2, 0xffffff, 1);
        _this.drawRect(0, 0, 170, 32);
        _this.endFill();
        _this.label = state.add.text(x, y, 'Submit', { font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
        _this.label.setTextBounds(0, 0, 170, 32);
        _this.inputEnabled = true;
        _this.events.onInputDown.add(function (submit) {
            var data = {
                type: submit.state.menu.type.value,
                quantity: submit.state.menu.quantity.value,
                color: submit.state.menu.color.value
            };
            boot_1.socket.emit('resource', data);
        }, _this);
        state.add.existing(_this);
        return _this;
    }
    Submit.prototype.update = function () {
        this.state.world.bringToTop(this.label);
    };
    return Submit;
}(Phaser.Graphics));
exports.Submit = Submit;
//# sourceMappingURL=ui.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjMwZTI0NDYxOTY0Y2I2MmVmNDIiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9yZXNvdXJjZUVkaXRvci9ib290LmpzIiwid2VicGFjazovLy8uL2Rpc3QvcmVzb3VyY2VFZGl0b3IvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L3Jlc291cmNlRWRpdG9yL3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsb0JBQW9CO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxnQzs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCx3RkFBd0Y7QUFDOUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsOEIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYzMGUyNDQ2MTk2NGNiNjJlZjQyIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBnYW1lXzEgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG52YXIgR2FtZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhHYW1lLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR2FtZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCA5NjAsIDU0MCwgUGhhc2VyLkNBTlZBUywgJ2dhbWUnLCBudWxsLCBudWxsLCBmYWxzZSwgZmFsc2UpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUuYWRkKCdCb290JywgYm9vdFN0YXRlKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZS5hZGQoJ0dhbWUnLCBnYW1lXzEuZ2FtZVN0YXRlKTtcclxuICAgICAgICBfdGhpcy5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBHYW1lO1xyXG59KFBoYXNlci5HYW1lKSk7XHJcbmV4cG9ydHMuR2FtZSA9IEdhbWU7XHJcbnZhciBib290U3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoYm9vdFN0YXRlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gYm9vdFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIGJvb3RTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxvYWQuanNvbigndGlsZXMnLCAnY2xpZW50L2Fzc2V0cy90aWxlcy5qc29uJyk7XHJcbiAgICB9O1xyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScpO1xyXG4gICAgfTtcclxuICAgIGJvb3RTdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfTtcclxuICAgIHJldHVybiBib290U3RhdGU7XHJcbn0oUGhhc2VyLlN0YXRlKSk7XHJcbmV4cG9ydHMuYm9vdFN0YXRlID0gYm9vdFN0YXRlO1xyXG5leHBvcnRzLnNvY2tldCA9IGlvKCk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L3Jlc291cmNlRWRpdG9yL2Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1aV8xID0gcmVxdWlyZShcIi4vdWlcIik7XHJcbnZhciBnYW1lU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoZ2FtZVN0YXRlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gZ2FtZVN0YXRlKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmdyb3VuZFBvaW50ID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgX3RoaXMub3JpZ0RyYWdQb2ludCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgndGlsZScsICcvY2xpZW50L2Fzc2V0cy90aWxlLnBuZycsIDMyLCAzMik7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuYWxpZ24odHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zZXRSZXNpemVDYWxsYmFjayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUuc2V0TWF4aW11bSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubG9hZC5qc29uKCd0aWxlcycsICdjbGllbnQvYXNzZXRzL3RpbGVzLmpzb24nKTtcclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUucmVuZGVyZXIucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IHRydWU7XHJcbiAgICAgICAgUGhhc2VyLkNhbnZhcy5zZXRJbWFnZVJlbmRlcmluZ0NyaXNwKHRoaXMuZ2FtZS5jYW52YXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW52YXMub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfTtcclxuICAgICAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQucGx1Z2luKG5ldyBQaGFzZXJJbnB1dC5QbHVnaW4odGhpcy5nYW1lLCB0aGlzLmdhbWUucGx1Z2lucykpO1xyXG4gICAgICAgIHRoaXMubWVudSA9IHtcclxuICAgICAgICAgICAgdHlwZTogdGhpcy5nYW1lLmFkZC5pbnB1dEZpZWxkKHRoaXMuZ2FtZS53aWR0aCAvIDMgKiAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gMTAgKiAyLCB7XHJcbiAgICAgICAgICAgICAgICBmb250OiAnMThweCBBcmlhbCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzIxMjEyMScsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogOCxcclxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMDAwJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogNixcclxuICAgICAgICAgICAgICAgIHBsYWNlSG9sZGVyOiAnVHlwZScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBQaGFzZXJJbnB1dC5JbnB1dFR5cGUudGV4dFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ2FtZS5hZGQuaW5wdXRGaWVsZCh0aGlzLmdhbWUud2lkdGggLyAzICogMiwgdGhpcy5nYW1lLmhlaWdodCAvIDEwICogMywge1xyXG4gICAgICAgICAgICAgICAgZm9udDogJzE4cHggQXJpYWwnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMyMTIxMjEnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDgsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzAwMCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsXHJcbiAgICAgICAgICAgICAgICBwbGFjZUhvbGRlcjogJ1F1YW50aXR5JyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFBoYXNlcklucHV0LklucHV0VHlwZS5udW1iZXJcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmdhbWUuYWRkLmlucHV0RmllbGQodGhpcy5nYW1lLndpZHRoIC8gMyAqIDIsIHRoaXMuZ2FtZS5oZWlnaHQgLyAxMCAqIDQsIHtcclxuICAgICAgICAgICAgICAgIGZvbnQ6ICcxOHB4IEFyaWFsJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjMjEyMTIxJyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA4LFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMwMDAnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA2LFxyXG4gICAgICAgICAgICAgICAgcGxhY2VIb2xkZXI6ICdDb2xvcicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBQaGFzZXJJbnB1dC5JbnB1dFR5cGUudGV4dFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGRpc3BsYXkgPSBuZXcgdWlfMS5EaXNwbGF5KHRoaXMsIHRoaXMuZ2FtZS53aWR0aCAvIDMsIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLCAweGZmZmZmZik7XHJcbiAgICAgICAgdGhpcy5tZW51LmNvbG9yLmZvY3VzT3V0LmFkZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuc2V0Q29sb3IocGFyc2VJbnQodGhpcy52YWx1ZSkpO1xyXG4gICAgICAgIH0sIHRoaXMubWVudS5jb2xvcik7XHJcbiAgICAgICAgdmFyIHN1Ym1pdCA9IG5ldyB1aV8xLlN1Ym1pdCh0aGlzLCB0aGlzLmdhbWUud2lkdGggLyAzICogMiwgdGhpcy5nYW1lLmhlaWdodCAvIDEwICogNSk7XHJcbiAgICB9O1xyXG4gICAgZ2FtZVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGdhbWVTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdhbWUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L3Jlc291cmNlRWRpdG9yL2dhbWUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBib290XzEgPSByZXF1aXJlKFwiLi9ib290XCIpO1xyXG52YXIgRGlzcGxheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhEaXNwbGF5LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gRGlzcGxheShzdGF0ZSwgeCwgeSwgY29sb3IpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnggPSB4IC0gc3RhdGUuZ2FtZS53aWR0aCAvIDY7XHJcbiAgICAgICAgX3RoaXMueSA9IHkgLSBzdGF0ZS5nYW1lLndpZHRoIC8gNjtcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIF90aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgX3RoaXMuYmVnaW5GaWxsKF90aGlzLmNvbG9yKTtcclxuICAgICAgICBfdGhpcy5saW5lU3R5bGUoMiwgMHgwMDAwMDAsIDEpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KDAsIDAsIF90aGlzLnN0YXRlLmdhbWUud2lkdGggLyAzLCBfdGhpcy5zdGF0ZS5nYW1lLndpZHRoIC8gMyk7XHJcbiAgICAgICAgX3RoaXMuZW5kRmlsbCgpO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgRGlzcGxheS5wcm90b3R5cGUuc2V0Q29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5iZWdpbkZpbGwoY29sb3IpO1xyXG4gICAgICAgIHRoaXMubGluZVN0eWxlKDIsIDB4MDAwMDAwLCAxKTtcclxuICAgICAgICB0aGlzLmRyYXdSZWN0KDAsIDAsIHRoaXMuc3RhdGUuZ2FtZS53aWR0aCAvIDMsIHRoaXMuc3RhdGUuZ2FtZS53aWR0aCAvIDMpO1xyXG4gICAgICAgIHRoaXMuZW5kRmlsbCgpO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGlzcGxheTtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5EaXNwbGF5ID0gRGlzcGxheTtcclxudmFyIFN1Ym1pdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTdWJtaXQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTdWJtaXQoc3RhdGUsIHgsIHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdGF0ZS5nYW1lKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnggPSB4O1xyXG4gICAgICAgIF90aGlzLnkgPSB5O1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgX3RoaXMuYmVnaW5GaWxsKDB4MDAwMDAwKTtcclxuICAgICAgICBfdGhpcy5saW5lU3R5bGUoMiwgMHhmZmZmZmYsIDEpO1xyXG4gICAgICAgIF90aGlzLmRyYXdSZWN0KDAsIDAsIDE3MCwgMzIpO1xyXG4gICAgICAgIF90aGlzLmVuZEZpbGwoKTtcclxuICAgICAgICBfdGhpcy5sYWJlbCA9IHN0YXRlLmFkZC50ZXh0KHgsIHksICdTdWJtaXQnLCB7IGZvbnQ6IFwiYm9sZCAyOHB4IEFyaWFsXCIsIGZpbGw6IFwiI2ZmZlwiLCBib3VuZHNBbGlnbkg6IFwiY2VudGVyXCIsIGJvdW5kc0FsaWduVjogXCJtaWRkbGVcIiB9KTtcclxuICAgICAgICBfdGhpcy5sYWJlbC5zZXRUZXh0Qm91bmRzKDAsIDAsIDE3MCwgMzIpO1xyXG4gICAgICAgIF90aGlzLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbiAoc3VibWl0KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogc3VibWl0LnN0YXRlLm1lbnUudHlwZS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHF1YW50aXR5OiBzdWJtaXQuc3RhdGUubWVudS5xdWFudGl0eS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzdWJtaXQuc3RhdGUubWVudS5jb2xvci52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBib290XzEuc29ja2V0LmVtaXQoJ3Jlc291cmNlJywgZGF0YSk7XHJcbiAgICAgICAgfSwgX3RoaXMpO1xyXG4gICAgICAgIHN0YXRlLmFkZC5leGlzdGluZyhfdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgU3VibWl0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS53b3JsZC5icmluZ1RvVG9wKHRoaXMubGFiZWwpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTdWJtaXQ7XHJcbn0oUGhhc2VyLkdyYXBoaWNzKSk7XHJcbmV4cG9ydHMuU3VibWl0ID0gU3VibWl0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD11aS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvcmVzb3VyY2VFZGl0b3IvdWkuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==