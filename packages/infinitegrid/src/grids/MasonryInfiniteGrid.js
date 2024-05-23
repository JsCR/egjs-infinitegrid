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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasonryInfiniteGrid = void 0;
var grid_1 = require("@egjs/grid");
var InfiniteGrid_1 = require("../InfiniteGrid");
var utils_1 = require("../utils");
/**
 * MasonryInfiniteGrid is a grid that stacks items with the same width as a stack of bricks. Adjust the width of all images to the same size, find the lowest height column, and insert a new item.
 * @ko MasonryInfiniteGrid는 벽돌을 쌓아 올린 모양처럼 동일한 너비를 가진 아이템을 쌓는 레이아웃이다. 모든 이미지의 너비를 동일한 크기로 조정하고, 가장 높이가 낮은 열을 찾아 새로운 이미지를 삽입한다. 따라서 배치된 아이템 사이에 빈 공간이 생기지는 않지만 배치된 레이아웃의 아래쪽은 울퉁불퉁해진다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {MasonryInfiniteGridOptions} options - The option object of the MasonryInfiniteGrid module <ko>MasonryInfiniteGrid 모듈의 옵션 객체</ko>
 */
var MasonryInfiniteGrid = /** @class */ (function (_super) {
    __extends(MasonryInfiniteGrid, _super);
    function MasonryInfiniteGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MasonryInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid_1.default.propertyTypes), grid_1.MasonryGrid.propertyTypes);
    MasonryInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid_1.default.defaultOptions), grid_1.MasonryGrid.defaultOptions), { gridConstructor: grid_1.MasonryGrid, appliedItemChecker: function (item, grid) {
            var column = parseFloat(item.attributes.column) || 0;
            return column >= grid.outlineLength;
        } });
    MasonryInfiniteGrid = __decorate([
        utils_1.InfiniteGridGetterSetter
    ], MasonryInfiniteGrid);
    return MasonryInfiniteGrid;
}(InfiniteGrid_1.default));
exports.MasonryInfiniteGrid = MasonryInfiniteGrid;
