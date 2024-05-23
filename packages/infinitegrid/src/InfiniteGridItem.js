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
exports.InfiniteGridItem = void 0;
var grid_1 = require("@egjs/grid");
var consts_1 = require("./consts");
/**
 * @extends Grid.GridItem
 */
var InfiniteGridItem = /** @class */ (function (_super) {
    __extends(InfiniteGridItem, _super);
    function InfiniteGridItem(horizontal, itemStatus) {
        var _this = _super.call(this, horizontal, __assign({ html: "", type: consts_1.ITEM_TYPE.NORMAL, cssRect: { top: consts_1.INVISIBLE_POS, left: consts_1.INVISIBLE_POS } }, itemStatus)) || this;
        if (_this.type === consts_1.ITEM_TYPE.VIRTUAL) {
            if (_this.rect.width || _this.rect.height) {
                _this.mountState = grid_1.MOUNT_STATE.UNMOUNTED;
            }
            var orgRect = _this.orgRect;
            var rect = _this.rect;
            var cssRect = _this.cssRect;
            if (cssRect.width) {
                rect.width = cssRect.width;
            }
            else if (orgRect.width) {
                rect.width = orgRect.width;
            }
            if (cssRect.height) {
                rect.height = cssRect.height;
            }
            else if (orgRect.height) {
                rect.height = orgRect.height;
            }
        }
        return _this;
    }
    InfiniteGridItem.prototype.getVirtualStatus = function () {
        return {
            type: consts_1.ITEM_TYPE.VIRTUAL,
            groupKey: this.groupKey,
            key: this.key,
            orgRect: this.orgRect,
            rect: this.rect,
            cssRect: this.cssRect,
            attributes: this.attributes,
        };
    };
    InfiniteGridItem.prototype.getMinimizedStatus = function () {
        var status = __assign(__assign({}, _super.prototype.getMinimizedStatus.call(this)), { type: consts_1.ITEM_TYPE.NORMAL, groupKey: this.groupKey });
        if (this.html) {
            status.html = this.html;
        }
        return status;
    };
    return InfiniteGridItem;
}(grid_1.GridItem));
exports.InfiniteGridItem = InfiniteGridItem;
