"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
var component_1 = require("@egjs/component");
var list_differ_1 = require("@egjs/list-differ");
var utils_1 = require("../utils");
var Renderer = /** @class */ (function (_super) {
    __extends(Renderer, _super);
    function Renderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.container = null;
        _this.rendererKey = 0;
        _this._updateTimer = 0;
        _this._state = {};
        _this._isItemChanged = false;
        return _this;
    }
    Renderer.prototype.updateKey = function () {
        this.rendererKey = Date.now();
    };
    Renderer.prototype.getItems = function () {
        return this.items;
    };
    Renderer.prototype.setContainer = function (container) {
        this.container = container;
    };
    Renderer.prototype.render = function (nextItems, state) {
        return this.syncItems(nextItems, state);
    };
    Renderer.prototype.update = function (state) {
        var _this = this;
        if (state === void 0) { state = {}; }
        this._state = __assign(__assign({}, this._state), state);
        this.trigger("update", {
            state: state,
        });
        clearTimeout(this._updateTimer);
        this._updateTimer = window.setTimeout(function () {
            _this.trigger("requestUpdate", {
                state: state,
            });
        });
    };
    Renderer.prototype.updated = function (nextElements) {
        var _a, _b;
        if (nextElements === void 0) { nextElements = (_b = (_a = this.container) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []; }
        var diffResult = this._diffResult;
        var isChanged = !!(diffResult.added.length || diffResult.removed.length || diffResult.changed.length);
        var state = this._state;
        var isItemChanged = this._isItemChanged;
        var nextItems = diffResult.list;
        this._isItemChanged = false;
        this._state = {};
        this.items = nextItems;
        nextItems.forEach(function (item, i) {
            item.element = nextElements[i];
        });
        this.trigger("updated", {
            items: nextItems,
            elements: utils_1.toArray(nextElements),
            diffResult: this._diffResult,
            state: state,
            isItemChanged: isItemChanged,
            isChanged: isChanged,
        });
        return isChanged;
    };
    Renderer.prototype.syncItems = function (items, state) {
        if (state === void 0) { state = {}; }
        var rendererKey = this.rendererKey;
        var prevItems = this.items;
        var nextItems = items.map(function (item) { return (__assign(__assign({}, item), { renderKey: rendererKey + "_" + item.key })); });
        var result = list_differ_1.diff(prevItems, nextItems, function (item) { return item.renderKey; });
        this._isItemChanged = !!result.added.length || !!result.removed.length || !!result.changed.length;
        this._state = __assign(__assign({}, this._state), state);
        this._diffResult = result;
        return result;
    };
    Renderer.prototype.destroy = function () {
        this.off();
    };
    return Renderer;
}(component_1.default));
exports.Renderer = Renderer;
