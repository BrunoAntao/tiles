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
exports.global = {
    color1: '0x000000',
    color2: '0xffffff',
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
var image_1 = __webpack_require__(2);
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
    };
    gameState.prototype.create = function () {
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.stage.backgroundColor = "#000000";
        this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));
        var editor = new image_1.imageEditor(this);
        var tb = new image_1.toolbar(this);
        tb.add(new image_1.colorPallete(this, 1, 1, 10, 4));
        tb.add(new image_1.colorPicker(this, 1, 6, 10, 8));
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
var imageEditor = /** @class */ (function (_super) {
    __extends(imageEditor, _super);
    function imageEditor(state) {
        var _this = _super.call(this, state.game) || this;
        _this.bitmap = new Phaser.BitmapData(state.game, 'image', 32, 32);
        for (var x = 0; x < 32; x++) {
            for (var y = 0; y < 32; y++) {
                _this.add(new imagePixel(state, x, y, _this.bitmap));
                _this.bitmap.setPixel(x, y, 0xff, 0xff, 0xff);
            }
        }
        state.input.keyboard.addCallbacks(_this, function (e) {
            if (e.key === 's') {
                boot_1.socket.emit('capture', this.bitmap.canvas.toDataURL());
            }
        });
        return _this;
    }
    return imageEditor;
}(Phaser.Group));
exports.imageEditor = imageEditor;
var imagePixel = /** @class */ (function (_super) {
    __extends(imagePixel, _super);
    function imagePixel(state, x, y, bitmap) {
        var _this = _super.call(this, state.game) || this;
        _this.state = state;
        _this.x = 32 + x * 15;
        _this.y = 32 + y * 15;
        _this.bitmap = bitmap;
        _this.bx = x;
        _this.by = y;
        _this.beginFill(0xffffff);
        _this.lineStyle(2, 0x000000, 1);
        _this.drawRect(0, 0, 15, 15);
        _this.endFill();
        _this.inputEnabled = true;
        _this.events.onInputDown.add(function (pixel) {
            if (pixel.state.input.activePointer.leftButton.isDown) {
                pixel.clear();
                pixel.beginFill(parseInt(boot_1.global.color1));
                pixel.lineStyle(2, 0x000000, 1);
                pixel.drawRect(0, 0, 15, 15);
                pixel.endFill();
                var color = hexToRgb(boot_1.global.color1.substr(2, 6));
                pixel.bitmap.setPixel(pixel.bx, pixel.by, color.r, color.g, color.b);
            }
            else {
                pixel.clear();
                pixel.beginFill(parseInt(boot_1.global.color2));
                pixel.lineStyle(2, 0x000000, 1);
                pixel.drawRect(0, 0, 15, 15);
                pixel.endFill();
                var color = hexToRgb(boot_1.global.color2.substr(2, 6));
                pixel.bitmap.setPixel(pixel.bx, pixel.by, color.r, color.g, color.b);
            }
        }, _this);
        _this.events.onInputOver.add(function (pixel) {
            if (pixel.state.input.activePointer.isDown) {
                pixel.events.onInputDown.dispatch(pixel);
            }
        }, _this);
        state.add.existing(_this);
        return _this;
    }
    return imagePixel;
}(Phaser.Graphics));
var toolbar = /** @class */ (function (_super) {
    __extends(toolbar, _super);
    function toolbar(state) {
        var _this = _super.call(this, state.game) || this;
        _this.x = 17 * 32;
        _this.y = 32;
        _this.beginFill(0x000000);
        _this.lineStyle(2, 0xffffff, 1);
        _this.drawRect(0, 0, 12 * 32, 15 * 32);
        _this.endFill();
        _this.panels = new Phaser.Group(state.game);
        _this.addChild(_this.panels);
        state.add.existing(_this);
        return _this;
    }
    toolbar.prototype.add = function (panel) {
        this.panels.add(panel);
        panel.bar = this;
    };
    toolbar.prototype.update = function () {
        this.panels.update();
    };
    return toolbar;
}(Phaser.Graphics));
exports.toolbar = toolbar;
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(state, x, y, width, height) {
        var _this = _super.call(this, state.game) || this;
        _this.bar = null;
        _this.x = x * 32;
        _this.y = y * 32;
        _this.beginFill(0x000000);
        _this.lineStyle(2, 0xffffff, 1);
        _this.drawRect(0, 0, width * 32, height * 32);
        _this.endFill();
        state.add.existing(_this);
        return _this;
    }
    return Panel;
}(Phaser.Graphics));
exports.Panel = Panel;
var colorPallete = /** @class */ (function (_super) {
    __extends(colorPallete, _super);
    function colorPallete(state, x, y, width, height) {
        var _this = _super.call(this, state, x, y, width, height) || this;
        _this.slot1 = new colorSlot(state, 1, 1);
        _this.slot2 = new colorSlot(state, 3, 1);
        _this.addChild(_this.slot1);
        _this.addChild(_this.slot2);
        state.add.existing(_this);
        return _this;
    }
    colorPallete.prototype.update = function () {
        this.slot1.setColor(boot_1.global.color1);
        this.slot2.setColor(boot_1.global.color2);
    };
    return colorPallete;
}(Panel));
exports.colorPallete = colorPallete;
var colorSlot = /** @class */ (function (_super) {
    __extends(colorSlot, _super);
    function colorSlot(state, x, y) {
        var _this = _super.call(this, state.game) || this;
        _this.x = x * 32;
        _this.y = y * 32;
        _this.beginFill(0x000000);
        _this.lineStyle(2, 0xffffff, 1);
        _this.drawRect(0, 0, 32, 32);
        _this.endFill();
        state.add.existing(_this);
        return _this;
    }
    colorSlot.prototype.setColor = function (color) {
        this.clear();
        this.beginFill(color);
        this.lineStyle(2, 0xffffff, 1);
        this.drawRect(0, 0, 32, 32);
        this.endFill();
    };
    return colorSlot;
}(Phaser.Graphics));
var colorPicker = /** @class */ (function (_super) {
    __extends(colorPicker, _super);
    function colorPicker(state, x, y, width, height) {
        var _this = _super.call(this, state, x, y, width, height) || this;
        _this.wheel = new colorWheel(state, 1, 1);
        _this.addChild(_this.wheel);
        state.add.existing(_this);
        return _this;
    }
    return colorPicker;
}(Panel));
exports.colorPicker = colorPicker;
var colorWheel = /** @class */ (function (_super) {
    __extends(colorWheel, _super);
    function colorWheel(state, x, y) {
        var _this = _super.call(this, state.game) || this;
        _this.x = 3 * 32 + x * 32;
        _this.y = 3 * 32 + y * 32;
        var colors = Phaser.Color.HSVColorWheel();
        _this.beginFill(0x000000);
        _this.drawCircle(0, 0, 6 * 32);
        _this.endFill();
        var g = new Phaser.Graphics(state.game);
        for (var i = 0; i < colors.length; i++) {
            g.lineStyle(25, colors[i].color, 1);
            g.arc(0, 0, 3 * 32, Phaser.Math.degToRad(0 + i), Phaser.Math.degToRad(1 + i), false);
        }
        _this.outer = new Phaser.Sprite(state.game, 0, 0, g.generateTexture());
        _this.outer.anchor.setTo(0.5, 0.5);
        _this.light = _this.game.add.inputField(4 * 32, -16, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 32,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 0,
            type: PhaserInput.InputType.number
        });
        _this.light.setText('50');
        _this.addChild(_this.light);
        _this.addChild(_this.outer);
        _this.inputEnabled = true;
        _this.events.onInputDown.add(function (wheel) {
            var pos = {
                x: this.game.input.activePointer.x,
                y: this.game.input.activePointer.y
            };
            var c = {
                x: this.parent.bar.x + this.parent.x + this.x,
                y: this.parent.bar.y + this.parent.y + this.y
            };
            var dx = pos.x - c.x;
            var dy = pos.y - c.y;
            var d = Phaser.Math.distance(pos.x, pos.y, c.x, c.y);
            var a = Phaser.Math.radToDeg(Math.atan2(dy, dx));
            if (a < 0) {
                a = 360 + a;
            }
            ;
            var color = hslToHex(a, d, parseInt(this.light.value));
            this.beginFill(color);
            this.drawCircle(0, 0, 3 * 32);
            this.endFill();
            if (this.game.input.activePointer.leftButton.isDown) {
                boot_1.global.color1 = color;
            }
            else {
                boot_1.global.color2 = color;
            }
        }, _this);
        state.add.existing(_this);
        return _this;
    }
    return colorWheel;
}(Phaser.Graphics));
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hue2rgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    var toHex = function (x) {
        var hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return "0x" + toHex(r) + toHex(g) + toHex(b);
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map