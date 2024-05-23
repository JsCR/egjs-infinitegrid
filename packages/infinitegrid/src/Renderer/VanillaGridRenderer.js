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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanillaGridRenderer = void 0;
var utils_1 = require("../utils");
var VanillaRenderer_1 = require("./VanillaRenderer");
var VanillaGridRenderer = /** @class */ (function (_super) {
    __extends(VanillaGridRenderer, _super);
    function VanillaGridRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VanillaGridRenderer.prototype.syncItems = function (nextItems) {
        var result = _super.prototype.syncItems.call(this, nextItems);
        var added = result.added, list = result.list;
        added.forEach(function (index) {
            var orgItem = nextItems[index].orgItem;
            if (orgItem.html && !orgItem.element) {
                orgItem.element = utils_1.convertHTMLtoElement(orgItem.html)[0];
            }
            list[index].element = orgItem.element;
        });
        return result;
    };
    return VanillaGridRenderer;
}(VanillaRenderer_1.VanillaRenderer));
exports.VanillaGridRenderer = VanillaGridRenderer;
