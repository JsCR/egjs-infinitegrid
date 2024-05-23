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
exports.Infinite = void 0;
var component_1 = require("@egjs/component");
var list_differ_1 = require("@egjs/list-differ");
var consts_1 = require("./consts");
var utils_1 = require("./utils");
var Infinite = /** @class */ (function (_super) {
    __extends(Infinite, _super);
    function Infinite(options) {
        var _this = _super.call(this) || this;
        _this.startCursor = -1;
        _this.endCursor = -1;
        _this.size = 0;
        _this.items = [];
        _this.itemKeys = {};
        _this.options = __assign({ threshold: 0, useRecycle: true, defaultDirection: "end" }, options);
        return _this;
    }
    Infinite.prototype.scroll = function (scrollPos) {
        var _a, _b;
        var prevStartCursor = this.startCursor;
        var prevEndCursor = this.endCursor;
        var items = this.items;
        var length = items.length;
        var size = this.size;
        var _c = this.options, defaultDirection = _c.defaultDirection, threshold = _c.threshold, useRecycle = _c.useRecycle;
        var isDirectionEnd = defaultDirection === "end";
        if (!length) {
            this.trigger(isDirectionEnd ? "requestAppend" : "requestPrepend", {
                key: undefined,
                isVirtual: false,
            });
            return;
        }
        else if (prevStartCursor === -1 || prevEndCursor === -1) {
            var nextCursor = isDirectionEnd ? 0 : length - 1;
            this.trigger("change", {
                prevStartCursor: prevStartCursor,
                prevEndCursor: prevEndCursor,
                nextStartCursor: nextCursor,
                nextEndCursor: nextCursor,
            });
            return;
        }
        var endScrollPos = scrollPos + size;
        var startEdgePos = Math.max.apply(Math, items[prevStartCursor].startOutline);
        var endEdgePos = Math.min.apply(Math, items[prevEndCursor].endOutline);
        var visibles = items.map(function (item) {
            var startOutline = item.startOutline, endOutline = item.endOutline;
            if (!startOutline.length || !endOutline.length || utils_1.isFlatOutline(startOutline, endOutline)) {
                return false;
            }
            var startPos = Math.min.apply(Math, startOutline);
            var endPos = Math.max.apply(Math, endOutline);
            if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
                return true;
            }
            return false;
        });
        var hasStartItems = 0 < prevStartCursor;
        var hasEndItems = prevEndCursor < length - 1;
        var isStart = scrollPos <= startEdgePos + threshold;
        var isEnd = endScrollPos >= endEdgePos - threshold;
        var nextStartCursor = visibles.indexOf(true);
        var nextEndCursor = visibles.lastIndexOf(true);
        if (nextStartCursor === -1) {
            nextStartCursor = prevStartCursor;
            nextEndCursor = prevEndCursor;
        }
        if (!useRecycle) {
            nextStartCursor = Math.min(nextStartCursor, prevStartCursor);
            nextEndCursor = Math.max(nextEndCursor, prevEndCursor);
        }
        if (nextStartCursor === prevStartCursor && hasStartItems && isStart) {
            nextStartCursor -= 1;
        }
        if (nextEndCursor === prevEndCursor && hasEndItems && isEnd) {
            nextEndCursor += 1;
        }
        var nextVisibleItems = items.slice(nextStartCursor, nextEndCursor + 1);
        // It must contain no virtual items.
        if (nextVisibleItems.every(function (item) { return item.isVirtual === true; })) {
            // The real item can be in either the start or end direction.
            var hasRealItem = false;
            for (var i = nextStartCursor - 1; i >= 0; --i) {
                if (!items[i].isVirtual) {
                    nextStartCursor = i;
                    hasRealItem = true;
                    break;
                }
            }
            if (!hasRealItem) {
                for (var i = nextEndCursor + 1; i < length; ++i) {
                    if (!items[i].isVirtual) {
                        nextEndCursor = i;
                        hasRealItem = true;
                        break;
                    }
                }
            }
            if (hasRealItem) {
                nextVisibleItems = items.slice(nextStartCursor, nextEndCursor + 1);
            }
        }
        var hasVirtualItems = nextVisibleItems.some(function (item) { return item.isVirtual === true; });
        if (prevStartCursor !== nextStartCursor || prevEndCursor !== nextEndCursor) {
            this.trigger("change", {
                prevStartCursor: prevStartCursor,
                prevEndCursor: prevEndCursor,
                nextStartCursor: nextStartCursor,
                nextEndCursor: nextEndCursor,
            });
            if (!hasVirtualItems) {
                return;
            }
        }
        // If a virtual item is included, a requestPrepend (or requestAppend) event is triggered.
        if (hasVirtualItems) {
            var isStartVirtual = (_a = nextVisibleItems[0]) === null || _a === void 0 ? void 0 : _a.isVirtual;
            var isEndVirtual = (_b = nextVisibleItems[nextVisibleItems.length - 1]) === null || _b === void 0 ? void 0 : _b.isVirtual;
            if ((!isDirectionEnd || !isEnd) && isStartVirtual) {
                var realItemIndex = utils_1.findIndex(nextVisibleItems, function (item) { return !item.isVirtual; });
                var endVirtualItemIndex = (realItemIndex === -1 ? nextVisibleItems.length : realItemIndex) - 1;
                if (nextVisibleItems[endVirtualItemIndex]) {
                    this.trigger("requestPrepend", {
                        key: realItemIndex > -1 ? nextVisibleItems[realItemIndex].key : undefined,
                        nextKey: nextVisibleItems[endVirtualItemIndex].key,
                        nextKeys: nextVisibleItems.slice(0, endVirtualItemIndex + 1).map(function (item) { return item.key; }),
                        isVirtual: true,
                    });
                }
            }
            else if ((isDirectionEnd || !isStart) && isEndVirtual) {
                var realItemIndex = utils_1.findLastIndex(nextVisibleItems, function (item) { return !item.isVirtual; });
                var startVirtualItemIndex = realItemIndex + 1;
                if (nextVisibleItems[startVirtualItemIndex]) {
                    this.trigger("requestAppend", {
                        key: realItemIndex > -1 ? nextVisibleItems[realItemIndex].key : undefined,
                        nextKey: nextVisibleItems[startVirtualItemIndex].key,
                        nextKeys: nextVisibleItems.slice(startVirtualItemIndex).map(function (item) { return item.key; }),
                        isVirtual: true,
                    });
                }
            }
        }
        else if (!this._requestVirtualItems()) {
            if ((!isDirectionEnd || !isEnd) && isStart) {
                this.trigger("requestPrepend", {
                    key: items[prevStartCursor].key,
                    isVirtual: false,
                });
            }
            else if ((isDirectionEnd || !isStart) && isEnd) {
                this.trigger("requestAppend", {
                    key: items[prevEndCursor].key,
                    isVirtual: false,
                });
            }
        }
    };
    /**
     * Call the requestAppend or requestPrepend event to fill the virtual items.
     * @ko virtual item을 채우기 위해 requestAppend 또는 requestPrepend 이벤트를 호출합니다.
     * @return - Whether the event is called. <ko>이벤트를 호출했는지 여부.</ko>
     */
    Infinite.prototype._requestVirtualItems = function () {
        var isDirectionEnd = this.options.defaultDirection === "end";
        var items = this.items;
        var totalVisibleItems = this.getVisibleItems();
        var visibleItems = totalVisibleItems.filter(function (item) { return !item.isVirtual; });
        var totalVisibleLength = totalVisibleItems.length;
        var visibleLength = visibleItems.length;
        var startCursor = this.getStartCursor();
        var endCursor = this.getEndCursor();
        if (visibleLength === totalVisibleLength) {
            return false;
        }
        else if (visibleLength) {
            var startKey_1 = visibleItems[0].key;
            var endKey_1 = visibleItems[visibleLength - 1].key;
            var startIndex = utils_1.findIndex(items, function (item) { return item.key === startKey_1; }) - 1;
            var endIndex = utils_1.findIndex(items, function (item) { return item.key === endKey_1; }) + 1;
            var isEnd = endIndex <= endCursor;
            var isStart = startIndex >= startCursor;
            // Fill the placeholder with the original item.
            if ((isDirectionEnd || !isStart) && isEnd) {
                this.trigger("requestAppend", {
                    key: endKey_1,
                    nextKey: items[endIndex].key,
                    isVirtual: true,
                });
                return true;
            }
            else if ((!isDirectionEnd || !isEnd) && isStart) {
                this.trigger("requestPrepend", {
                    key: startKey_1,
                    nextKey: items[startIndex].key,
                    isVirtual: true,
                });
                return true;
            }
        }
        else if (totalVisibleLength) {
            var lastItem = totalVisibleItems[totalVisibleLength - 1];
            if (isDirectionEnd) {
                this.trigger("requestAppend", {
                    nextKey: totalVisibleItems[0].key,
                    isVirtual: true,
                });
            }
            else {
                this.trigger("requestPrepend", {
                    nextKey: lastItem.key,
                    isVirtual: true,
                });
            }
            return true;
        }
        return false;
    };
    Infinite.prototype.setCursors = function (startCursor, endCursor) {
        this.startCursor = startCursor;
        this.endCursor = endCursor;
    };
    Infinite.prototype.setSize = function (size) {
        this.size = size;
    };
    Infinite.prototype.getStartCursor = function () {
        return this.startCursor;
    };
    Infinite.prototype.getEndCursor = function () {
        return this.endCursor;
    };
    Infinite.prototype.isLoading = function (direction) {
        var startCursor = this.startCursor;
        var endCursor = this.endCursor;
        var items = this.items;
        var firstItem = items[startCursor];
        var lastItem = items[endCursor];
        var length = items.length;
        if (direction === consts_1.DIRECTION.END
            && endCursor > -1
            && endCursor < length - 1
            && !lastItem.isVirtual
            && !utils_1.isFlatOutline(lastItem.startOutline, lastItem.endOutline)) {
            return false;
        }
        if (direction === consts_1.DIRECTION.START
            && startCursor > 0
            && !firstItem.isVirtual
            && !utils_1.isFlatOutline(firstItem.startOutline, firstItem.endOutline)) {
            return false;
        }
        return true;
    };
    Infinite.prototype.setItems = function (nextItems) {
        this.items = nextItems;
        var itemKeys = {};
        nextItems.forEach(function (item) {
            itemKeys[item.key] = item;
        });
        this.itemKeys = itemKeys;
    };
    Infinite.prototype.syncItems = function (nextItems) {
        var prevItems = this.items;
        var prevStartCursor = this.startCursor;
        var prevEndCursor = this.endCursor;
        var _a = utils_1.getNextCursors(this.items.map(function (item) { return item.key; }), nextItems.map(function (item) { return item.key; }), prevStartCursor, prevEndCursor), nextStartCursor = _a.startCursor, nextEndCursor = _a.endCursor;
        // sync items between cursors
        var isChange = nextEndCursor - nextStartCursor !== prevEndCursor - prevStartCursor
            || (prevStartCursor === -1 || nextStartCursor === -1);
        if (!isChange) {
            var prevVisibleItems = prevItems.slice(prevStartCursor, prevEndCursor + 1);
            var nextVisibleItems = nextItems.slice(nextStartCursor, nextEndCursor + 1);
            var visibleResult = list_differ_1.diff(prevVisibleItems, nextVisibleItems, function (item) { return item.key; });
            isChange = visibleResult.added.length > 0
                || visibleResult.removed.length > 0
                || visibleResult.changed.length > 0;
        }
        this.setItems(nextItems);
        this.setCursors(nextStartCursor, nextEndCursor);
        return isChange;
    };
    Infinite.prototype.getItems = function () {
        return this.items;
    };
    Infinite.prototype.getVisibleItems = function () {
        var startCursor = this.startCursor;
        var endCursor = this.endCursor;
        if (startCursor === -1) {
            return [];
        }
        return this.items.slice(startCursor, endCursor + 1);
    };
    Infinite.prototype.getItemByKey = function (key) {
        return this.itemKeys[key];
    };
    Infinite.prototype.getRenderedVisibleItems = function () {
        var items = this.getVisibleItems();
        var rendered = items.map(function (_a) {
            var startOutline = _a.startOutline, endOutline = _a.endOutline;
            var length = startOutline.length;
            if (length === 0 || length !== endOutline.length) {
                return false;
            }
            return startOutline.some(function (pos, i) { return endOutline[i] !== pos; });
        });
        var startIndex = rendered.indexOf(true);
        var endIndex = rendered.lastIndexOf(true);
        return endIndex === -1 ? [] : items.slice(startIndex, endIndex + 1);
    };
    Infinite.prototype.destroy = function () {
        this.off();
        this.startCursor = -1;
        this.endCursor = -1;
        this.items = [];
        this.size = 0;
    };
    return Infinite;
}(component_1.default));
exports.Infinite = Infinite;
