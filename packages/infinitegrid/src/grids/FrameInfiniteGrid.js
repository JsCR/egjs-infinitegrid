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
exports.FrameInfiniteGrid = void 0;
var grid_1 = require("@egjs/grid");
var InfiniteGrid_1 = require("../InfiniteGrid");
var utils_1 = require("../utils");
/**
 * 'Frame' is a printing term with the meaning that 'it fits in one row wide'. FrameInfiniteGrid is a grid that the item is filled up on the basis of a line given a size.
 * @ko 'Frame'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. FrameInfiniteGrid는 용어의 의미대로 너비가 주어진 사이즈를 기준으로 아이템이 가득 차도록 배치하는 Grid다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {FrameInfiniteGridOptions} options - The option object of the FrameInfiniteGrid module <ko>FrameGrid 모듈의 옵션 객체</ko>
 */
var FrameInfiniteGrid = /** @class */ (function (_super) {
    __extends(FrameInfiniteGrid, _super);
    function FrameInfiniteGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrameInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid_1.default.propertyTypes), grid_1.FrameGrid.propertyTypes);
    FrameInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid_1.default.defaultOptions), grid_1.FrameGrid.defaultOptions), { gridConstructor: grid_1.FrameGrid });
    FrameInfiniteGrid = __decorate([
        utils_1.InfiniteGridGetterSetter
    ], FrameInfiniteGrid);
    return FrameInfiniteGrid;
}(InfiniteGrid_1.default));
exports.FrameInfiniteGrid = FrameInfiniteGrid;
