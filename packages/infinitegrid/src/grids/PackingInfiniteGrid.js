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
exports.PackingInfiniteGrid = void 0;
var grid_1 = require("@egjs/grid");
var InfiniteGrid_1 = require("../InfiniteGrid");
var utils_1 = require("../utils");
/**
 * The PackingInfiniteGrid is a grid that shows the important items bigger without sacrificing the weight of the items.
 * Rows and columns are separated so that items are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
 * If `sizeWeight` is higher than `ratioWeight`, the size of items is preserved as much as possible.
 * Conversely, if `ratioWeight` is higher than `sizeWeight`, the ratio of items is preserved as much as possible.
 * @ko PackingInfiniteGrid는 아이템의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다.
 * 행과 열이 구분돼 아이템을 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 아이템을 배치한다.
 * `sizeWeight`가 `ratioWeight`보다 높으면 아이템들의 size가 최대한 보존이 된다.
 * 반대로 `ratioWeight`가 `sizeWeight`보다 높으면 아이템들의 비율이 최대한 보존이 된다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {PackingInfiniteGridOptions} options - The option object of the PackingInfiniteGrid module <ko>PackingInfiniteGrid 모듈의 옵션 객체</ko>
 */
var PackingInfiniteGrid = /** @class */ (function (_super) {
    __extends(PackingInfiniteGrid, _super);
    function PackingInfiniteGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PackingInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid_1.default.propertyTypes), grid_1.PackingGrid.propertyTypes);
    PackingInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid_1.default.defaultOptions), grid_1.PackingGrid.defaultOptions), { gridConstructor: grid_1.PackingGrid });
    PackingInfiniteGrid = __decorate([
        utils_1.InfiniteGridGetterSetter
    ], PackingInfiniteGrid);
    return PackingInfiniteGrid;
}(InfiniteGrid_1.default));
exports.PackingInfiniteGrid = PackingInfiniteGrid;
