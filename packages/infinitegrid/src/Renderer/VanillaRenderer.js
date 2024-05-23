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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanillaRenderer = void 0;
var Renderer_1 = require("./Renderer");
var VanillaRenderer = /** @class */ (function (_super) {
    __extends(VanillaRenderer, _super);
    function VanillaRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VanillaRenderer.prototype.render = function (nextItems, state) {
        var container = this.container;
        var result = _super.prototype.render.call(this, nextItems, state);
        var prevList = result.prevList, removed = result.removed, ordered = result.ordered, added = result.added, list = result.list;
        var diffList = __spreadArray([], prevList);
        removed.forEach(function (index) {
            diffList.splice(index, 1);
            container.removeChild(prevList[index].element);
        });
        ordered.forEach(function (_a) {
            var _b, _c;
            var prevIndex = _a[0], nextIndex = _a[1];
            var item = diffList.splice(prevIndex, 1)[0];
            diffList.splice(nextIndex, 0, item);
            container.insertBefore(item.element, (_c = (_b = diffList[nextIndex + 1]) === null || _b === void 0 ? void 0 : _b.element) !== null && _c !== void 0 ? _c : null);
        });
        added.forEach(function (index) {
            var _a, _b;
            var item = list[index];
            diffList.splice(index, 0, item);
            container.insertBefore(item.element, (_b = (_a = diffList[index + 1]) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : null);
        });
        this.updated(container.children);
        return result;
    };
    return VanillaRenderer;
}(Renderer_1.Renderer));
exports.VanillaRenderer = VanillaRenderer;
