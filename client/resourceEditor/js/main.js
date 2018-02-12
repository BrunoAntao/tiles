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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.align(true, true);
        this.scale.setResizeCallback(function () {
            this.scale.setMaximum();
        }, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDk5ZGIwMDc0YzFjZTNhMmIwYzUiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9yZXNvdXJjZUVkaXRvci9ib290LmpzIiwid2VicGFjazovLy8uL2Rpc3QvcmVzb3VyY2VFZGl0b3IvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L3Jlc291cmNlRWRpdG9yL3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxvQkFBb0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGdDOzs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHdGQUF3RjtBQUM5STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw4QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDk5ZGIwMDc0YzFjZTNhMmIwYzUiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGdhbWVfMSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XHJcbnZhciBHYW1lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEdhbWUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBHYW1lKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIDk2MCwgNTQwLCBQaGFzZXIuQ0FOVkFTLCAnZ2FtZScsIG51bGwsIG51bGwsIGZhbHNlLCBmYWxzZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0ZS5hZGQoJ0Jvb3QnLCBib290U3RhdGUpO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLmFkZCgnR2FtZScsIGdhbWVfMS5nYW1lU3RhdGUpO1xyXG4gICAgICAgIF90aGlzLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEdhbWU7XHJcbn0oUGhhc2VyLkdhbWUpKTtcclxuZXhwb3J0cy5HYW1lID0gR2FtZTtcclxudmFyIGJvb3RTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhib290U3RhdGUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBib290U3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubG9hZC5qc29uKCd0aWxlcycsICdjbGllbnQvYXNzZXRzL3RpbGVzLmpzb24nKTtcclxuICAgIH07XHJcbiAgICBib290U3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWUuY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJyk7XHJcbiAgICB9O1xyXG4gICAgYm9vdFN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGJvb3RTdGF0ZTtcclxufShQaGFzZXIuU3RhdGUpKTtcclxuZXhwb3J0cy5ib290U3RhdGUgPSBib290U3RhdGU7XHJcbmV4cG9ydHMuc29ja2V0ID0gaW8oKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoKTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvcmVzb3VyY2VFZGl0b3IvYm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHVpXzEgPSByZXF1aXJlKFwiLi91aVwiKTtcclxudmFyIGdhbWVTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhnYW1lU3RhdGUsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBnYW1lU3RhdGUoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuZ3JvdW5kUG9pbnQgPSB7IHg6IDAsIHk6IDAgfTtcclxuICAgICAgICBfdGhpcy5vcmlnRHJhZ1BvaW50ID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuYWxpZ24odHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zZXRSZXNpemVDYWxsYmFjayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUuc2V0TWF4aW11bSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGdhbWVTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZS5yZW5kZXJlci5yZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzID0gdHJ1ZTtcclxuICAgICAgICBQaGFzZXIuQ2FudmFzLnNldEltYWdlUmVuZGVyaW5nQ3Jpc3AodGhpcy5nYW1lLmNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmNhbnZhcy5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24gKGUpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9O1xyXG4gICAgICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5wbHVnaW4obmV3IFBoYXNlcklucHV0LlBsdWdpbih0aGlzLmdhbWUsIHRoaXMuZ2FtZS5wbHVnaW5zKSk7XHJcbiAgICAgICAgdGhpcy5tZW51ID0ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLmdhbWUuYWRkLmlucHV0RmllbGQodGhpcy5nYW1lLndpZHRoIC8gMyAqIDIsIHRoaXMuZ2FtZS5oZWlnaHQgLyAxMCAqIDIsIHtcclxuICAgICAgICAgICAgICAgIGZvbnQ6ICcxOHB4IEFyaWFsJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjMjEyMTIxJyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA4LFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMwMDAnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA2LFxyXG4gICAgICAgICAgICAgICAgcGxhY2VIb2xkZXI6ICdUeXBlJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFBoYXNlcklucHV0LklucHV0VHlwZS50ZXh0XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5nYW1lLmFkZC5pbnB1dEZpZWxkKHRoaXMuZ2FtZS53aWR0aCAvIDMgKiAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gMTAgKiAzLCB7XHJcbiAgICAgICAgICAgICAgICBmb250OiAnMThweCBBcmlhbCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzIxMjEyMScsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogOCxcclxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMDAwJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogNixcclxuICAgICAgICAgICAgICAgIHBsYWNlSG9sZGVyOiAnUXVhbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogUGhhc2VySW5wdXQuSW5wdXRUeXBlLm51bWJlclxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY29sb3I6IHRoaXMuZ2FtZS5hZGQuaW5wdXRGaWVsZCh0aGlzLmdhbWUud2lkdGggLyAzICogMiwgdGhpcy5nYW1lLmhlaWdodCAvIDEwICogNCwge1xyXG4gICAgICAgICAgICAgICAgZm9udDogJzE4cHggQXJpYWwnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMyMTIxMjEnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDgsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzAwMCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsXHJcbiAgICAgICAgICAgICAgICBwbGFjZUhvbGRlcjogJ0NvbG9yJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFBoYXNlcklucHV0LklucHV0VHlwZS50ZXh0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgZGlzcGxheSA9IG5ldyB1aV8xLkRpc3BsYXkodGhpcywgdGhpcy5nYW1lLndpZHRoIC8gMywgdGhpcy5nYW1lLmhlaWdodCAvIDIsIDB4ZmZmZmZmKTtcclxuICAgICAgICB0aGlzLm1lbnUuY29sb3IuZm9jdXNPdXQuYWRkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGlzcGxheS5zZXRDb2xvcihwYXJzZUludCh0aGlzLnZhbHVlKSk7XHJcbiAgICAgICAgfSwgdGhpcy5tZW51LmNvbG9yKTtcclxuICAgICAgICB2YXIgc3VibWl0ID0gbmV3IHVpXzEuU3VibWl0KHRoaXMsIHRoaXMuZ2FtZS53aWR0aCAvIDMgKiAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gMTAgKiA1KTtcclxuICAgIH07XHJcbiAgICBnYW1lU3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZ2FtZVN0YXRlO1xyXG59KFBoYXNlci5TdGF0ZSkpO1xyXG5leHBvcnRzLmdhbWVTdGF0ZSA9IGdhbWVTdGF0ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2FtZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvcmVzb3VyY2VFZGl0b3IvZ2FtZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGJvb3RfMSA9IHJlcXVpcmUoXCIuL2Jvb3RcIik7XHJcbnZhciBEaXNwbGF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKERpc3BsYXksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBEaXNwbGF5KHN0YXRlLCB4LCB5LCBjb2xvcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMueCA9IHggLSBzdGF0ZS5nYW1lLndpZHRoIC8gNjtcclxuICAgICAgICBfdGhpcy55ID0geSAtIHN0YXRlLmdhbWUud2lkdGggLyA2O1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgX3RoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICBfdGhpcy5iZWdpbkZpbGwoX3RoaXMuY29sb3IpO1xyXG4gICAgICAgIF90aGlzLmxpbmVTdHlsZSgyLCAweDAwMDAwMCwgMSk7XHJcbiAgICAgICAgX3RoaXMuZHJhd1JlY3QoMCwgMCwgX3RoaXMuc3RhdGUuZ2FtZS53aWR0aCAvIDMsIF90aGlzLnN0YXRlLmdhbWUud2lkdGggLyAzKTtcclxuICAgICAgICBfdGhpcy5lbmRGaWxsKCk7XHJcbiAgICAgICAgc3RhdGUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5zZXRDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmJlZ2luRmlsbChjb2xvcik7XHJcbiAgICAgICAgdGhpcy5saW5lU3R5bGUoMiwgMHgwMDAwMDAsIDEpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JlY3QoMCwgMCwgdGhpcy5zdGF0ZS5nYW1lLndpZHRoIC8gMywgdGhpcy5zdGF0ZS5nYW1lLndpZHRoIC8gMyk7XHJcbiAgICAgICAgdGhpcy5lbmRGaWxsKCk7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEaXNwbGF5O1xyXG59KFBoYXNlci5HcmFwaGljcykpO1xyXG5leHBvcnRzLkRpc3BsYXkgPSBEaXNwbGF5O1xyXG52YXIgU3VibWl0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFN1Ym1pdCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFN1Ym1pdChzdGF0ZSwgeCwgeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHN0YXRlLmdhbWUpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMueCA9IHg7XHJcbiAgICAgICAgX3RoaXMueSA9IHk7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBfdGhpcy5iZWdpbkZpbGwoMHgwMDAwMDApO1xyXG4gICAgICAgIF90aGlzLmxpbmVTdHlsZSgyLCAweGZmZmZmZiwgMSk7XHJcbiAgICAgICAgX3RoaXMuZHJhd1JlY3QoMCwgMCwgMTcwLCAzMik7XHJcbiAgICAgICAgX3RoaXMuZW5kRmlsbCgpO1xyXG4gICAgICAgIF90aGlzLmxhYmVsID0gc3RhdGUuYWRkLnRleHQoeCwgeSwgJ1N1Ym1pdCcsIHsgZm9udDogXCJib2xkIDI4cHggQXJpYWxcIiwgZmlsbDogXCIjZmZmXCIsIGJvdW5kc0FsaWduSDogXCJjZW50ZXJcIiwgYm91bmRzQWxpZ25WOiBcIm1pZGRsZVwiIH0pO1xyXG4gICAgICAgIF90aGlzLmxhYmVsLnNldFRleHRCb3VuZHMoMCwgMCwgMTcwLCAzMik7XHJcbiAgICAgICAgX3RoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBfdGhpcy5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uIChzdWJtaXQpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzdWJtaXQuc3RhdGUubWVudS50eXBlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IHN1Ym1pdC5zdGF0ZS5tZW51LnF1YW50aXR5LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHN1Ym1pdC5zdGF0ZS5tZW51LmNvbG9yLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJvb3RfMS5zb2NrZXQuZW1pdCgncmVzb3VyY2UnLCBkYXRhKTtcclxuICAgICAgICB9LCBfdGhpcyk7XHJcbiAgICAgICAgc3RhdGUuYWRkLmV4aXN0aW5nKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTdWJtaXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLndvcmxkLmJyaW5nVG9Ub3AodGhpcy5sYWJlbCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN1Ym1pdDtcclxufShQaGFzZXIuR3JhcGhpY3MpKTtcclxuZXhwb3J0cy5TdWJtaXQgPSBTdWJtaXQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVpLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9yZXNvdXJjZUVkaXRvci91aS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9