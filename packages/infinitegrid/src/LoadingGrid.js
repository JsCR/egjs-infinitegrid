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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingGrid = exports.LOADING_ITEM_KEY = exports.LOADING_GROUP_KEY = void 0;
var grid_1 = require("@egjs/grid");
var consts_1 = require("./consts");
var InfiniteGridItem_1 = require("./InfiniteGridItem");
exports.LOADING_GROUP_KEY = "__INFINITEGRID__LOADING_GRID";
exports.LOADING_ITEM_KEY = "__INFINITEGRID__LOADING_ITEM";
var LoadingGrid = /** @class */ (function (_super) {
    __extends(LoadingGrid, _super);
    function LoadingGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "";
        return _this;
    }
    LoadingGrid.prototype.getLoadingItem = function () {
        return this.items[0] || null;
    };
    LoadingGrid.prototype.setLoadingItem = function (item) {
        if (item) {
            var loadingItem = this.getLoadingItem();
            if (!loadingItem) {
                this.items = [new InfiniteGridItem_1.InfiniteGridItem(this.options.horizontal, __assign(__assign({}, item), { type: consts_1.ITEM_TYPE.LOADING, key: exports.LOADING_ITEM_KEY }))];
            }
            else {
                for (var name_1 in item) {
                    loadingItem[name_1] = item[name_1];
                }
            }
        }
        else {
            this.items = [];
        }
    };
    LoadingGrid.prototype.applyGrid = function (items, direction, outline) {
        if (!items.length) {
            return {
                start: outline,
                end: outline,
            };
        }
        var nextOutline = outline.length ? __spreadArray([], outline) : [0];
        var item = items[0];
        var offset = item.contentSize + this.gap;
        item.cssInlinePos = this.getContainerInlineSize() / 2 - item.inlineSize / 2;
        if (direction === "end") {
            var maxPos = Math.max.apply(Math, nextOutline);
            item.cssContentPos = maxPos;
            return {
                start: nextOutline,
                end: nextOutline.map(function (pos) { return pos + offset; }),
            };
        }
        else {
            var minPos = Math.min.apply(Math, nextOutline);
            item.cssContentPos = minPos - offset;
            return {
                start: nextOutline.map(function (pos) { return pos - offset; }),
                end: nextOutline,
            };
        }
    };
    return LoadingGrid;
}(grid_1.default));
exports.LoadingGrid = LoadingGrid;
