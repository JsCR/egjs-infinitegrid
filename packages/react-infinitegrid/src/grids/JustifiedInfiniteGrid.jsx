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
exports.JustifiedInfiniteGrid = void 0;
var infinitegrid_1 = require("@egjs/infinitegrid");
var InfiniteGrid_1 = require("../InfiniteGrid");
var JustifiedInfiniteGrid = /** @class */ (function (_super) {
    __extends(JustifiedInfiniteGrid, _super);
    function JustifiedInfiniteGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustifiedInfiniteGrid.GridClass = infinitegrid_1.JustifiedInfiniteGrid;
    return JustifiedInfiniteGrid;
}(InfiniteGrid_1.InfiniteGrid));
exports.JustifiedInfiniteGrid = JustifiedInfiniteGrid;
