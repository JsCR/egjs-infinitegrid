"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withInfiniteGridMethods = exports.filterVirtuals = exports.flatGroups = exports.range = exports.isFlatOutline = exports.setPlaceholder = exports.getItemInfo = exports.findLastIndex = exports.findIndex = exports.find = exports.toArray = exports.convertInsertedItems = exports.convertHTMLtoElement = exports.makeKey = exports.InfiniteGridGetterSetter = exports.getRenderingItems = exports.mountRenderingItems = exports.getRenderingItemsByStatus = exports.getFirstRenderingItems = exports.splitVirtualGroups = exports.getNextCursors = exports.categorize = exports.splitGridOptions = exports.splitOptions = exports.flat = exports.isObject = exports.isString = exports.isNumber = exports.isWindow = void 0;
var core_1 = require("@cfcs/core");
var grid_1 = require("@egjs/grid");
var list_differ_1 = require("@egjs/list-differ");
var consts_1 = require("./consts");
var InfiniteGridItem_1 = require("./InfiniteGridItem");
function isWindow(el) {
    return el === window;
}
exports.isWindow = isWindow;
function isNumber(val) {
    return typeof val === "number";
}
exports.isNumber = isNumber;
function isString(val) {
    return typeof val === "string";
}
exports.isString = isString;
function isObject(val) {
    return typeof val === "object";
}
exports.isObject = isObject;
function flat(arr) {
    return arr.reduce(function (prev, cur) {
        return __spreadArray(__spreadArray([], prev), cur);
    }, []);
}
exports.flat = flat;
function splitOptions(options) {
    var gridOptions = options.gridOptions, otherOptions = __rest(options, ["gridOptions"]);
    return __assign(__assign({}, splitGridOptions(gridOptions)), otherOptions);
}
exports.splitOptions = splitOptions;
function splitGridOptions(options) {
    var nextOptions = {};
    var gridOptions = {};
    var defaultOptions = grid_1.default.defaultOptions;
    for (var name_1 in options) {
        var value = options[name_1];
        if (!(name_1 in consts_1.IGNORE_PROPERITES_MAP)) {
            gridOptions[name_1] = value;
        }
        if (name_1 in defaultOptions) {
            nextOptions[name_1] = value;
        }
    }
    return __assign(__assign({}, nextOptions), { gridOptions: gridOptions });
}
exports.splitGridOptions = splitGridOptions;
function categorize(items) {
    var groups = [];
    var groupKeys = {};
    var registeredGroupKeys = {};
    items.filter(function (item) { return item.groupKey != null; }).forEach(function (_a) {
        var groupKey = _a.groupKey;
        registeredGroupKeys[groupKey] = true;
    });
    var generatedGroupKey;
    var isContinuousGroupKey = false;
    items.forEach(function (item, i) {
        if (item.groupKey != null) {
            isContinuousGroupKey = false;
        }
        else if (!item.inserted && items[i - 1]) {
            // In case of framework, inserted is false.
            // If groupKey is not set, the group key of the previous item is followed.
            item.groupKey = items[i - 1].groupKey;
            isContinuousGroupKey = false;
        }
        else {
            if (!isContinuousGroupKey) {
                generatedGroupKey = makeKey(registeredGroupKeys);
                isContinuousGroupKey = true;
                registeredGroupKeys[generatedGroupKey] = true;
            }
            item.groupKey = generatedGroupKey;
        }
        var groupKey = item.groupKey;
        var group = groupKeys[groupKey];
        if (!group) {
            group = {
                groupKey: groupKey,
                items: [],
            };
            groupKeys[groupKey] = group;
            groups.push(group);
        }
        group.items.push(item);
    });
    return groups;
}
exports.categorize = categorize;
function getNextCursors(prevKeys, nextKeys, prevStartCursor, prevEndCursor) {
    var result = list_differ_1.diff(prevKeys, nextKeys, function (key) { return key; });
    var nextStartCursor = -1;
    var nextEndCursor = -1;
    // sync cursors
    result.maintained.forEach(function (_a) {
        var prevIndex = _a[0], nextIndex = _a[1];
        if (prevStartCursor <= prevIndex && prevIndex <= prevEndCursor) {
            if (nextStartCursor === -1) {
                nextStartCursor = nextIndex;
                nextEndCursor = nextIndex;
            }
            else {
                nextStartCursor = Math.min(nextStartCursor, nextIndex);
                nextEndCursor = Math.max(nextEndCursor, nextIndex);
            }
        }
    });
    return {
        startCursor: nextStartCursor,
        endCursor: nextEndCursor,
    };
}
exports.getNextCursors = getNextCursors;
function splitVirtualGroups(groups, direction, nextGroups) {
    var virtualGroups = [];
    if (direction === "start") {
        var index = findIndex(groups, function (group) { return group.type === consts_1.GROUP_TYPE.NORMAL; });
        if (index === -1) {
            return [];
        }
        // Get the virtual group maintained in the group from the next group.
        var endMaintainedIndex = findIndex(groups, function (group) {
            return findIndex(nextGroups, function (nextGroup) { return nextGroup.groupKey === group.groupKey; }) >= 0;
        });
        var endIndex = endMaintainedIndex >= 0 ? Math.min(index, endMaintainedIndex) : index;
        virtualGroups = groups.slice(0, endIndex);
    }
    else {
        var index = findLastIndex(groups, function (group) { return group.type === consts_1.GROUP_TYPE.NORMAL; });
        if (index === -1) {
            return [];
        }
        var startMaintainedIndex = findLastIndex(groups, function (group) {
            return findIndex(nextGroups, function (nextGroup) { return nextGroup.groupKey === group.groupKey; }) >= 0;
        });
        var startIndex = startMaintainedIndex >= 0 ? Math.max(index, startMaintainedIndex) : index;
        virtualGroups = groups.slice(startIndex + 1);
    }
    return virtualGroups;
}
exports.splitVirtualGroups = splitVirtualGroups;
function getFirstRenderingItems(nextItems, horizontal) {
    var groups = categorize(nextItems);
    if (!groups[0]) {
        return [];
    }
    return groups[0].items.map(function (item) {
        return new InfiniteGridItem_1.InfiniteGridItem(horizontal, __assign({}, item));
    });
}
exports.getFirstRenderingItems = getFirstRenderingItems;
function getRenderingItemsByStatus(groupManagerStatus, nextItems, usePlaceholder, horizontal) {
    var prevGroups = groupManagerStatus.groups;
    var groups = categorize(nextItems);
    var startVirtualGroups = splitVirtualGroups(prevGroups, "start", groups);
    var endVirtualGroups = splitVirtualGroups(prevGroups, "end", groups);
    var nextGroups = __spreadArray(__spreadArray(__spreadArray([], startVirtualGroups), groups), endVirtualGroups);
    var _a = getNextCursors(prevGroups.map(function (group) { return group.groupKey; }), nextGroups.map(function (group) { return group.groupKey; }), groupManagerStatus.cursors[0], groupManagerStatus.cursors[1]), startCursor = _a.startCursor, endCursor = _a.endCursor;
    var nextVisibleItems = flat(nextGroups.slice(startCursor, endCursor + 1).map(function (group) {
        return group.items.map(function (item) {
            return new InfiniteGridItem_1.InfiniteGridItem(horizontal, __assign({}, item));
        });
    }));
    if (!usePlaceholder) {
        nextVisibleItems = nextVisibleItems.filter(function (item) {
            return item.type !== consts_1.ITEM_TYPE.VIRTUAL;
        });
    }
    return nextVisibleItems;
}
exports.getRenderingItemsByStatus = getRenderingItemsByStatus;
function mountRenderingItems(items, options) {
    var grid = options.grid, usePlaceholder = options.usePlaceholder, useLoading = options.useLoading, useFirstRender = options.useFirstRender, status = options.status;
    if (!grid) {
        return;
    }
    if (usePlaceholder) {
        grid.setPlaceholder({});
    }
    if (useLoading) {
        grid.setLoading({});
    }
    if (status) {
        grid.setStatus(status, true);
    }
    grid.syncItems(items);
    if (useFirstRender && !status && grid.getGroups().length) {
        grid.setCursors(0, 0, true);
    }
}
exports.mountRenderingItems = mountRenderingItems;
function getRenderingItems(items, options) {
    var status = options.status, usePlaceholder = options.usePlaceholder, useLoading = options.useLoading, horizontal = options.horizontal, useFirstRender = options.useFirstRender, grid = options.grid;
    var visibleItems = [];
    if (grid) {
        grid.setPlaceholder(usePlaceholder ? {} : null);
        grid.setLoading(useLoading ? {} : null);
        grid.syncItems(items);
        visibleItems = grid.getRenderingItems();
    }
    else if (status) {
        visibleItems = getRenderingItemsByStatus(status.groupManager, items, !!usePlaceholder, !!horizontal);
    }
    else if (useFirstRender) {
        visibleItems = getFirstRenderingItems(items, !!horizontal);
    }
    return visibleItems;
}
exports.getRenderingItems = getRenderingItems;
/* Class Decorator */
function InfiniteGridGetterSetter(component) {
    var prototype = component.prototype, propertyTypes = component.propertyTypes;
    var _loop_1 = function (name_2) {
        var attributes = {
            enumerable: true,
            configurable: true,
            get: function () {
                var options = this.groupManager.options;
                if (name_2 in options) {
                    return options[name_2];
                }
                else {
                    return options.gridOptions[name_2];
                }
            },
            set: function (value) {
                var _a;
                var prevValue = this.groupManager[name_2];
                if (prevValue === value) {
                    return;
                }
                this.groupManager.gridOptions = (_a = {},
                    _a[name_2] = value,
                    _a);
            },
        };
        Object.defineProperty(prototype, name_2, attributes);
    };
    for (var name_2 in propertyTypes) {
        _loop_1(name_2);
    }
}
exports.InfiniteGridGetterSetter = InfiniteGridGetterSetter;
function makeKey(registeredKeys, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var index = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        var key = "infinitegrid_" + prefix + index++;
        if (!(key in registeredKeys)) {
            return key;
        }
    }
}
exports.makeKey = makeKey;
function convertHTMLtoElement(html) {
    var dummy = document.createElement("div");
    dummy.innerHTML = html;
    return toArray(dummy.children);
}
exports.convertHTMLtoElement = convertHTMLtoElement;
function convertInsertedItems(items, groupKey) {
    var insertedItems;
    if (isString(items)) {
        insertedItems = convertHTMLtoElement(items);
    }
    else {
        insertedItems = items;
    }
    return insertedItems.map(function (item) {
        var element;
        var html = "";
        var key;
        if (isString(item)) {
            html = item;
        }
        else if ("parentNode" in item) {
            element = item;
            html = item.outerHTML;
        }
        else {
            // inserted is true when adding via a method.
            return __assign({ groupKey: groupKey, inserted: true }, item);
        }
        // inserted is true when adding via a method.
        return {
            key: key,
            groupKey: groupKey,
            html: html,
            element: element,
            inserted: true,
        };
    });
}
exports.convertInsertedItems = convertInsertedItems;
function toArray(nodes) {
    var array = [];
    if (nodes) {
        var length_1 = nodes.length;
        for (var i = 0; i < length_1; i++) {
            array.push(nodes[i]);
        }
    }
    return array;
}
exports.toArray = toArray;
function find(arr, callback) {
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
        var value = arr[i];
        if (callback(value, i)) {
            return value;
        }
    }
    return null;
}
exports.find = find;
function findIndex(arr, callback) {
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function findLastIndex(arr, callback) {
    var length = arr.length;
    for (var i = length - 1; i >= 0; --i) {
        if (callback(arr[i], i)) {
            return i;
        }
    }
    return -1;
}
exports.findLastIndex = findLastIndex;
function getItemInfo(info) {
    var nextInfo = {};
    for (var name_3 in info) {
        if (name_3 in consts_1.ITEM_INFO_PROPERTIES) {
            nextInfo[name_3] = info[name_3];
        }
    }
    return nextInfo;
}
exports.getItemInfo = getItemInfo;
function setPlaceholder(item, info) {
    for (var name_4 in info) {
        var value = info[name_4];
        if (isObject(value)) {
            item[name_4] = __assign(__assign({}, item[name_4]), value);
        }
        else {
            item[name_4] = info[name_4];
        }
    }
}
exports.setPlaceholder = setPlaceholder;
function isFlatOutline(start, end) {
    return start.length === end.length && start.every(function (pos, i) { return end[i] === pos; });
}
exports.isFlatOutline = isFlatOutline;
function range(length) {
    var arr = [];
    for (var i = 0; i < length; ++i) {
        arr.push(i);
    }
    return arr;
}
exports.range = range;
function flatGroups(groups) {
    return flat(groups.map(function (_a) {
        var grid = _a.grid;
        return grid.getItems();
    }));
}
exports.flatGroups = flatGroups;
function filterVirtuals(items, includePlaceholders) {
    if (includePlaceholders) {
        return __spreadArray([], items);
    }
    else {
        return items.filter(function (item) { return item.type !== consts_1.ITEM_TYPE.VIRTUAL; });
    }
}
exports.filterVirtuals = filterVirtuals;
/**
 * Decorator that makes the method of InfiniteGrid available in the framework.
 * @ko 프레임워크에서 InfiniteGrid의 메소드를 사용할 수 있게 하는 데코레이터.
 * @private
 * @example
 * ```js
 * import { withInfiniteGridMethods } from "@egjs/infinitegrid";
 *
 * class Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {
 *   &#64;withInfiniteGridMethods
 *   private grid: NativeGrid;
 * }
 * ```
 */
exports.withInfiniteGridMethods = core_1.withClassMethods(consts_1.INFINITEGRID_METHODS);
