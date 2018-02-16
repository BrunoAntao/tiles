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
            hardness: this.game.add.inputField(this.game.width / 3 * 2, this.game.height / 10 * 4, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Hardness',
                type: PhaserInput.InputType.number
            }),
            tool: this.game.add.inputField(this.game.width / 3 * 2, this.game.height / 10 * 5, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Tool',
                type: PhaserInput.InputType.text
            }),
            color: this.game.add.inputField(this.game.width / 3 * 2, this.game.height / 10 * 6, {
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
        this.menu.type.focusOut.add(function () {
            display.setLabel(this.value);
        }, this.menu.type);
        this.menu.color.focusOut.add(function () {
            display.setColor(parseInt(this.value));
        }, this.menu.color);
        var submit = new ui_1.Submit(this, this.game.width / 3 * 2, this.game.height / 10 * 7);
    };
    gameState.prototype.update = function () {
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
        _this.label = _this.state.add.text(_this.x, _this.y, '');
        _this.label.boundsAlignH = 'center';
        _this.label.boundsAlignV = 'middle';
        _this.label.addColor('0x000000', 0);
        _this.label.fontSize = '100px';
        _this.label.setTextBounds(0, 0, _this.state.game.width / 3, _this.state.game.width / 3);
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
    Display.prototype.setLabel = function (text) {
        this.label.text = text.toUpperCase().charAt(0);
    };
    Display.prototype.update = function () {
        this.state.game.world.bringToTop(this.label);
        var r = Math.floor(this.color / (256 * 256));
        var g = Math.floor(this.color / 256) % 256;
        var b = this.color % 256;
        var ir = Math.floor((255 - r) * 0.5);
        var ig = Math.floor((255 - g) * 0.5);
        var ib = Math.floor((255 - b) * 0.5);
        this.label.addColor('rgb(' + ir + ',' + ig + ',' + ib + ')', 0);
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
            if (submit.state.menu.type.value &&
                parseInt(submit.state.menu.quantity.value) &&
                parseInt(submit.state.menu.hardness.value) &&
                submit.state.menu.tool.value &&
                submit.state.menu.color.value) {
                var data = {
                    type: submit.state.menu.type.value,
                    quantity: parseInt(submit.state.menu.quantity.value),
                    hardness: parseInt(submit.state.menu.hardness.value),
                    tool: submit.state.menu.tool.value,
                    color: submit.state.menu.color.value
                };
                boot_1.socket.emit('resource', data);
            }
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


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map