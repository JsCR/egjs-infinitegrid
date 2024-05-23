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
exports.JustifiedInfiniteGrid = void 0;
var grid_1 = require("@egjs/grid");
var InfiniteGrid_1 = require("../InfiniteGrid");
var utils_1 = require("../utils");
/**
 * 'justified' is a printing term with the meaning that 'it fits in one row wide'. JustifiedInfiniteGrid is a grid that the item is filled up on the basis of a line given a size.
 * If 'data-grid-inline-offset' or 'data-grid-content-offset' are set for item element, the ratio is maintained except for the offset value.
 * If 'data-grid-maintained-target' is set for an element whose ratio is to be maintained, the item is rendered while maintaining the ratio of the element.
 * @ko 'justified'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. JustifiedInfiniteGrid는 용어의 의미대로 너비가 주어진 사이즈를 기준으로 아이템가 가득 차도록 배치하는 Grid다.
 * 아이템 엘리먼트에 'data-grid-inline-offset' 또는 'data-grid-content-offset'를 설정하면 offset 값을 제외하고 비율을 유지한다.
 * 비율을 유지하고 싶은 엘리먼트에 'data-grid-maintained-target'을 설정한다면 해당 엘리먼트의 비율을 유지하면서 아이템이 렌더링이 된다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {JustifiedInfiniteGridOptions} options - The option object of the JustifiedInfiniteGrid module <ko>JustifiedInfiniteGrid 모듈의 옵션 객체</ko>
 */
var JustifiedInfiniteGrid = /** @class */ (function (_super) {
    __extends(JustifiedInfiniteGrid, _super);
    function JustifiedInfiniteGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustifiedInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid_1.default.propertyTypes), grid_1.JustifiedGrid.propertyTypes);
    JustifiedInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid_1.default.defaultOptions), grid_1.JustifiedGrid.defaultOptions), { gridConstructor: grid_1.JustifiedGrid });
    JustifiedInfiniteGrid = __decorate([
        utils_1.InfiniteGridGetterSetter
    ], JustifiedInfiniteGrid);
    return JustifiedInfiniteGrid;
}(InfiniteGrid_1.default));
exports.JustifiedInfiniteGrid = JustifiedInfiniteGrid;
