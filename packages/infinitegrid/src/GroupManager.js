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
exports.GroupManager = void 0;
var grid_1 = require("@egjs/grid");
var consts_1 = require("./consts");
var InfiniteGridItem_1 = require("./InfiniteGridItem");
var LoadingGrid_1 = require("./LoadingGrid");
var utils_1 = require("./utils");
var GroupManager = /** @class */ (function (_super) {
    __extends(GroupManager, _super);
    function GroupManager(container, options) {
        var _this = _super.call(this, container, utils_1.splitOptions(options)) || this;
        _this.groupItems = [];
        _this.groups = [];
        _this.itemKeys = {};
        _this.groupKeys = {};
        _this.startCursor = 0;
        _this.endCursor = 0;
        _this._placeholder = null;
        _this._loadingGrid = new LoadingGrid_1.LoadingGrid(container, {
            externalContainerManager: _this.containerManager,
            useFit: false,
            autoResize: false,
            renderOnPropertyChange: false,
            gap: _this.gap,
        });
        _this._mainGrid = _this._makeGrid();
        return _this;
    }
    Object.defineProperty(GroupManager.prototype, "gridOptions", {
        set: function (options) {
            var _a = utils_1.splitGridOptions(options), gridOptions = _a.gridOptions, otherOptions = __rest(_a, ["gridOptions"]);
            var shouldRender = this._checkShouldRender(options);
            this.options.gridOptions = __assign(__assign({}, this.options.gridOptions), gridOptions);
            __spreadArray([this._mainGrid], this.groups.map(function (_a) {
                var grid = _a.grid;
                return grid;
            })).forEach(function (grid) {
                for (var name_1 in options) {
                    grid[name_1] = options[name_1];
                }
            });
            for (var name_2 in otherOptions) {
                this[name_2] = otherOptions[name_2];
            }
            this._loadingGrid.gap = this.gap;
            if (shouldRender) {
                this.scheduleRender();
            }
        },
        enumerable: false,
        configurable: true
    });
    GroupManager.prototype.getItemByKey = function (key) {
        return this.itemKeys[key] || null;
    };
    GroupManager.prototype.getGroupItems = function (includePlaceholders) {
        return utils_1.filterVirtuals(this.groupItems, includePlaceholders);
    };
    GroupManager.prototype.getVisibleItems = function (includePlaceholders) {
        return utils_1.filterVirtuals(this.items, includePlaceholders);
    };
    GroupManager.prototype.getRenderingItems = function () {
        if (this.hasPlaceholder()) {
            return this.items;
        }
        else {
            return this.items.filter(function (item) { return item.type !== consts_1.ITEM_TYPE.VIRTUAL; });
        }
    };
    GroupManager.prototype.getGroups = function (includePlaceholders) {
        return utils_1.filterVirtuals(this.groups, includePlaceholders);
    };
    GroupManager.prototype.hasVisibleVirtualGroups = function () {
        return this.getVisibleGroups(true).some(function (group) { return group.type === consts_1.GROUP_TYPE.VIRTUAL; });
    };
    GroupManager.prototype.hasPlaceholder = function () {
        return !!this._placeholder;
    };
    GroupManager.prototype.hasLoadingItem = function () {
        return !!this._getLoadingItem();
    };
    GroupManager.prototype.updateItems = function (items, options) {
        if (items === void 0) { items = this.groupItems; }
        return _super.prototype.updateItems.call(this, items, options);
    };
    GroupManager.prototype.setPlaceholder = function (placeholder) {
        this._placeholder = placeholder;
        this._updatePlaceholder();
    };
    GroupManager.prototype.getLoadingType = function () {
        return this._loadingGrid.type;
    };
    GroupManager.prototype.startLoading = function (type) {
        this._loadingGrid.type = type;
        this.items = this._getRenderingItems();
        return true;
    };
    GroupManager.prototype.endLoading = function () {
        var prevType = this._loadingGrid.type;
        this._loadingGrid.type = "";
        this.items = this._getRenderingItems();
        return !!prevType;
    };
    GroupManager.prototype.setLoading = function (loading) {
        this._loadingGrid.setLoadingItem(loading);
        this.items = this._getRenderingItems();
    };
    GroupManager.prototype.getVisibleGroups = function (includePlaceholders) {
        var groups = this.groups.slice(this.startCursor, this.endCursor + 1);
        return utils_1.filterVirtuals(groups, includePlaceholders);
    };
    GroupManager.prototype.getComputedOutlineLength = function (items) {
        if (items === void 0) { items = this.items; }
        return this._mainGrid.getComputedOutlineLength(items);
    };
    GroupManager.prototype.getComputedOutlineSize = function (items) {
        if (items === void 0) { items = this.items; }
        return this._mainGrid.getComputedOutlineSize(items);
    };
    GroupManager.prototype.applyGrid = function (items, direction, outline) {
        var _this = this;
        var renderingGroups = this.groups.slice();
        if (!renderingGroups.length) {
            return {
                start: [],
                end: [],
            };
        }
        var loadingGrid = this._loadingGrid;
        if (loadingGrid.getLoadingItem()) {
            if (loadingGrid.type === "start") {
                renderingGroups.unshift(this._getLoadingGroup());
            }
            else if (loadingGrid.type === "end") {
                renderingGroups.push(this._getLoadingGroup());
            }
        }
        var groups = renderingGroups.slice();
        var nextOutline = outline;
        if (direction === "start") {
            groups.reverse();
        }
        var appliedItemChecker = this.options.appliedItemChecker;
        var groupItems = this.groupItems;
        var outlineLength = this.getComputedOutlineLength(groupItems);
        var outlineSize = this.getComputedOutlineSize(groupItems);
        var itemRenderer = this.itemRenderer;
        groups.forEach(function (group) {
            var grid = group.grid;
            var gridItems = grid.getItems();
            var isVirtual = group.type === consts_1.GROUP_TYPE.VIRTUAL && !gridItems[0];
            grid.outlineLength = outlineLength;
            grid.outlineSize = outlineSize;
            var appliedItems = gridItems.filter(function (item) {
                if (item.mountState === grid_1.MOUNT_STATE.UNCHECKED || !item.rect.width) {
                    itemRenderer.updateItem(item, true);
                }
                return (item.orgRect.width && item.rect.width) || appliedItemChecker(item, grid);
            });
            var gridOutlines;
            if (isVirtual) {
                gridOutlines = _this._applyVirtualGrid(grid, direction, nextOutline);
            }
            else if (appliedItems.length) {
                gridOutlines = grid.applyGrid(appliedItems, direction, nextOutline);
            }
            else {
                gridOutlines = {
                    start: __spreadArray([], nextOutline),
                    end: __spreadArray([], nextOutline),
                };
            }
            grid.setOutlines(gridOutlines);
            nextOutline = gridOutlines[direction];
        });
        return {
            start: renderingGroups[0].grid.getOutlines().start,
            end: renderingGroups[renderingGroups.length - 1].grid.getOutlines().end,
        };
    };
    GroupManager.prototype.syncItems = function (nextItemInfos) {
        var _this = this;
        var prevItemKeys = this.itemKeys;
        this.itemKeys = {};
        var nextItems = this._syncItemInfos(nextItemInfos.map(function (info) { return utils_1.getItemInfo(info); }), prevItemKeys);
        var prevGroupKeys = this.groupKeys;
        var nextManagerGroups = utils_1.categorize(nextItems);
        var startVirtualGroups = this._splitVirtualGroups("start", nextManagerGroups);
        var endVirtualGroups = this._splitVirtualGroups("end", nextManagerGroups);
        nextManagerGroups = __spreadArray(__spreadArray(__spreadArray([], startVirtualGroups), this._mergeVirtualGroups(nextManagerGroups)), endVirtualGroups);
        var nextGroups = nextManagerGroups.map(function (_a) {
            var _b, _c;
            var groupKey = _a.groupKey, items = _a.items;
            var isVirtual = !items[0] || items[0].type === consts_1.ITEM_TYPE.VIRTUAL;
            var grid = (_c = (_b = prevGroupKeys[groupKey]) === null || _b === void 0 ? void 0 : _b.grid) !== null && _c !== void 0 ? _c : _this._makeGrid();
            var gridItems = isVirtual ? items : items.filter(function (_a) {
                var type = _a.type;
                return type === consts_1.ITEM_TYPE.NORMAL;
            });
            grid.setItems(gridItems);
            return {
                type: isVirtual ? consts_1.GROUP_TYPE.VIRTUAL : consts_1.GROUP_TYPE.NORMAL,
                groupKey: groupKey,
                grid: grid,
                items: gridItems,
                renderItems: items,
            };
        });
        this._registerGroups(nextGroups);
    };
    GroupManager.prototype.renderItems = function (options) {
        if (options === void 0) { options = {}; }
        if (options.useResize) {
            this.groupItems.forEach(function (item) {
                item.updateState = grid_1.UPDATE_STATE.NEED_UPDATE;
            });
            var loadingItem = this._getLoadingItem();
            if (loadingItem) {
                loadingItem.updateState = grid_1.UPDATE_STATE.NEED_UPDATE;
            }
        }
        return _super.prototype.renderItems.call(this, options);
    };
    GroupManager.prototype.setCursors = function (startCursor, endCursor) {
        this.startCursor = startCursor;
        this.endCursor = endCursor;
        this.items = this._getRenderingItems();
    };
    GroupManager.prototype.getStartCursor = function () {
        return this.startCursor;
    };
    GroupManager.prototype.getEndCursor = function () {
        return this.endCursor;
    };
    GroupManager.prototype.getGroupStatus = function (type, includePlaceholders) {
        var orgStartCursor = this.startCursor;
        var orgEndCursor = this.endCursor;
        var orgGroups = this.groups;
        var startGroup = orgGroups[orgStartCursor];
        var endGroup = orgGroups[orgEndCursor];
        var startCursor = orgStartCursor;
        var endCursor = orgEndCursor;
        var isMinimizeItems = type === consts_1.STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS;
        var isMinimizeGroups = type === consts_1.STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS;
        var groups;
        if (type === consts_1.STATUS_TYPE.REMOVE_INVISIBLE_GROUPS) {
            groups = this.getVisibleGroups(includePlaceholders);
            endCursor = groups.length - 1;
            startCursor = 0;
        }
        else {
            groups = this.getGroups(includePlaceholders);
            if (!includePlaceholders) {
                startCursor = -1;
                endCursor = -1;
                for (var orgIndex = orgStartCursor; orgIndex <= orgEndCursor; ++orgIndex) {
                    var orgGroup = orgGroups[orgIndex];
                    if (orgGroup && orgGroup.type !== consts_1.GROUP_TYPE.VIRTUAL) {
                        startCursor = groups.indexOf(orgGroup);
                        break;
                    }
                }
                for (var orgIndex = orgEndCursor; orgIndex >= orgStartCursor; --orgIndex) {
                    var orgGroup = orgGroups[orgIndex];
                    if (orgGroup && orgGroup.type !== consts_1.GROUP_TYPE.VIRTUAL) {
                        endCursor = groups.lastIndexOf(orgGroup);
                        break;
                    }
                }
            }
        }
        var groupStatus = groups.map(function (_a, i) {
            var grid = _a.grid, groupKey = _a.groupKey;
            var isOutsideCursor = i < startCursor || endCursor < i;
            var isVirtualItems = isMinimizeItems && isOutsideCursor;
            var isVirtualGroup = isMinimizeGroups && isOutsideCursor;
            var gridItems = grid.getItems();
            var items = isVirtualGroup
                ? []
                : gridItems.map(function (item) { return isVirtualItems ? item.getVirtualStatus() : item.getMinimizedStatus(); });
            return {
                type: isVirtualGroup || isVirtualItems ? consts_1.GROUP_TYPE.VIRTUAL : consts_1.GROUP_TYPE.NORMAL,
                groupKey: groupKey,
                outlines: grid.getOutlines(),
                items: items,
            };
        });
        var totalItems = this.getGroupItems();
        var itemStartCursor = totalItems.indexOf(startGroup === null || startGroup === void 0 ? void 0 : startGroup.items[0]);
        var itemEndCursor = totalItems.indexOf(endGroup === null || endGroup === void 0 ? void 0 : endGroup.items.slice().reverse()[0]);
        return {
            cursors: [startCursor, endCursor],
            orgCursors: [orgStartCursor, orgEndCursor],
            itemCursors: [itemStartCursor, itemEndCursor],
            startGroupKey: startGroup === null || startGroup === void 0 ? void 0 : startGroup.groupKey,
            endGroupKey: endGroup === null || endGroup === void 0 ? void 0 : endGroup.groupKey,
            groups: groupStatus,
            outlines: this.outlines,
        };
    };
    GroupManager.prototype.fitOutlines = function (useFit) {
        if (useFit === void 0) { useFit = this.useFit; }
        var groups = this.groups;
        var firstGroup = groups[0];
        if (!firstGroup) {
            return;
        }
        var outlines = firstGroup.grid.getOutlines();
        var startOutline = outlines.start;
        var outlineOffset = startOutline.length ? Math.min.apply(Math, startOutline) : 0;
        // If the outline is less than 0, a fit occurs forcibly.
        if (!useFit && outlineOffset > 0) {
            return;
        }
        groups.forEach(function (_a) {
            var grid = _a.grid;
            var _b = grid.getOutlines(), start = _b.start, end = _b.end;
            grid.setOutlines({
                start: start.map(function (point) { return point - outlineOffset; }),
                end: end.map(function (point) { return point - outlineOffset; }),
            });
        });
        this.groupItems.forEach(function (item) {
            var contentPos = item.cssContentPos;
            if (!utils_1.isNumber(contentPos)) {
                return;
            }
            item.cssContentPos = contentPos - outlineOffset;
        });
    };
    GroupManager.prototype.setGroupStatus = function (status) {
        var _this = this;
        this.itemKeys = {};
        this.groupItems = [];
        this.items = [];
        var prevGroupKeys = this.groupKeys;
        var nextGroups = status.groups.map(function (_a) {
            var _b, _c;
            var type = _a.type, groupKey = _a.groupKey, items = _a.items, outlines = _a.outlines;
            var nextItems = _this._syncItemInfos(items);
            var grid = (_c = (_b = prevGroupKeys[groupKey]) === null || _b === void 0 ? void 0 : _b.grid) !== null && _c !== void 0 ? _c : _this._makeGrid();
            grid.setOutlines(outlines);
            grid.setItems(nextItems);
            return {
                type: type,
                groupKey: groupKey,
                grid: grid,
                items: nextItems,
                renderItems: nextItems,
            };
        });
        this.setOutlines(status.outlines);
        this._registerGroups(nextGroups);
        this._updatePlaceholder();
        this.setCursors(status.cursors[0], status.cursors[1]);
    };
    GroupManager.prototype.appendPlaceholders = function (items, groupKey) {
        return this.insertPlaceholders("end", items, groupKey);
    };
    GroupManager.prototype.prependPlaceholders = function (items, groupKey) {
        return this.insertPlaceholders("start", items, groupKey);
    };
    GroupManager.prototype.removePlaceholders = function (type) {
        var groups = this.groups;
        var length = groups.length;
        if (type === "start") {
            var index = utils_1.findIndex(groups, function (group) { return group.type === consts_1.GROUP_TYPE.NORMAL; });
            groups.splice(0, index);
        }
        else if (type === "end") {
            var index = utils_1.findLastIndex(groups, function (group) { return group.type === consts_1.GROUP_TYPE.NORMAL; });
            groups.splice(index + 1, length - index - 1);
        }
        else {
            var groupKey_1 = type.groupKey;
            var index = utils_1.findIndex(groups, function (group) { return group.groupKey === groupKey_1; });
            if (index > -1) {
                groups.splice(index, 1);
            }
        }
        this.syncItems(utils_1.flatGroups(this.getGroups()));
    };
    GroupManager.prototype.insertPlaceholders = function (direction, items, groupKey) {
        var _a, _b;
        if (groupKey === void 0) { groupKey = utils_1.makeKey(this.groupKeys, "virtual_"); }
        var infos = [];
        if (utils_1.isNumber(items)) {
            infos = utils_1.range(items).map(function () { return ({ type: consts_1.ITEM_TYPE.VIRTUAL, groupKey: groupKey }); });
        }
        else if (Array.isArray(items)) {
            infos = items.map(function (status) { return (__assign(__assign({ groupKey: groupKey }, status), { type: consts_1.ITEM_TYPE.VIRTUAL })); });
        }
        var grid = this._makeGrid();
        var nextItems = this._syncItemInfos(infos, this.itemKeys);
        this._updatePlaceholder(nextItems);
        grid.setItems(nextItems);
        var group = {
            type: consts_1.GROUP_TYPE.VIRTUAL,
            groupKey: groupKey,
            grid: grid,
            items: nextItems,
            renderItems: nextItems,
        };
        this.groupKeys[groupKey] = group;
        if (direction === "end") {
            this.groups.push(group);
            (_a = this.groupItems).push.apply(_a, nextItems);
        }
        else {
            this.groups.splice(0, 0, group);
            (_b = this.groupItems).splice.apply(_b, __spreadArray([0, 0], nextItems));
            if (this.startCursor > -1) {
                ++this.startCursor;
                ++this.endCursor;
            }
        }
        return {
            group: group,
            items: nextItems,
        };
    };
    GroupManager.prototype.shouldRerenderItems = function () {
        var isRerender = false;
        this.getVisibleGroups().forEach(function (group) {
            var items = group.items;
            if (items.length === group.renderItems.length
                || items.every(function (item) { return item.mountState === grid_1.MOUNT_STATE.UNCHECKED; })) {
                return;
            }
            isRerender = true;
            group.renderItems = __spreadArray([], items);
        });
        if (isRerender) {
            this.items = this._getRenderingItems();
        }
        return isRerender;
    };
    GroupManager.prototype._updateItems = function (items) {
        this.itemRenderer.updateEqualSizeItems(items, this.groupItems);
    };
    GroupManager.prototype._getGroupItems = function () {
        return utils_1.flatGroups(this.getGroups(true));
    };
    GroupManager.prototype._getRenderingItems = function () {
        var items = utils_1.flat(this.getVisibleGroups(true).map(function (item) { return item.renderItems; }));
        var loadingGrid = this._loadingGrid;
        var loadingItem = loadingGrid.getLoadingItem();
        if (loadingItem) {
            if (loadingGrid.type === "end") {
                items.push(loadingItem);
            }
            else if (loadingGrid.type === "start") {
                items.unshift(loadingItem);
            }
        }
        return items;
    };
    GroupManager.prototype._checkShouldRender = function (options) {
        var GridConstructor = this.options.gridConstructor;
        var prevOptions = this.gridOptions;
        var propertyTypes = GridConstructor.propertyTypes;
        for (var name_3 in prevOptions) {
            if (!(name_3 in options) && propertyTypes[name_3] === grid_1.PROPERTY_TYPE.RENDER_PROPERTY) {
                return true;
            }
        }
        for (var name_4 in options) {
            if (prevOptions[name_4] !== options[name_4] && propertyTypes[name_4] === grid_1.PROPERTY_TYPE.RENDER_PROPERTY) {
                return true;
            }
        }
        return false;
    };
    GroupManager.prototype._applyVirtualGrid = function (grid, direction, outline) {
        var startOutline = outline.length ? __spreadArray([], outline) : [0];
        var prevOutlines = grid.getOutlines();
        var prevOutline = prevOutlines[direction === "end" ? "start" : "end"];
        if (prevOutline.length !== startOutline.length
            || prevOutline.some(function (value, i) { return value !== startOutline[i]; })) {
            return {
                start: __spreadArray([], startOutline),
                end: __spreadArray([], startOutline),
            };
        }
        return prevOutlines;
    };
    GroupManager.prototype._syncItemInfos = function (nextItemInfos, prevItemKeys) {
        if (prevItemKeys === void 0) { prevItemKeys = {}; }
        var horizontal = this.options.horizontal;
        var nextItemKeys = this.itemKeys;
        nextItemInfos.filter(function (info) { return info.key != null; }).forEach(function (info) {
            var key = info.key;
            var prevItem = prevItemKeys[key];
            if (!prevItem) {
                nextItemKeys[key] = new InfiniteGridItem_1.InfiniteGridItem(horizontal, __assign({}, info));
            }
            else if (prevItem.type === consts_1.ITEM_TYPE.VIRTUAL && info.type !== consts_1.ITEM_TYPE.VIRTUAL) {
                nextItemKeys[key] = new InfiniteGridItem_1.InfiniteGridItem(horizontal, __assign({ orgRect: prevItem.orgRect, rect: prevItem.rect }, info));
            }
            else {
                if (info.data) {
                    prevItem.data = info.data;
                }
                if (info.groupKey != null) {
                    prevItem.groupKey = info.groupKey;
                }
                if (info.element) {
                    prevItem.element = info.element;
                }
                nextItemKeys[key] = prevItem;
            }
        });
        var nextItems = nextItemInfos.map(function (info) {
            var key = info.key;
            if (info.key == null) {
                key = utils_1.makeKey(nextItemKeys, info.type === consts_1.ITEM_TYPE.VIRTUAL ? "virtual_" : "");
            }
            var item = nextItemKeys[key];
            if (!item) {
                var prevItem = prevItemKeys[key];
                if (prevItem) {
                    item = prevItem;
                    if (info.data) {
                        item.data = info.data;
                    }
                    if (info.element) {
                        item.element = info.element;
                    }
                }
                else {
                    item = new InfiniteGridItem_1.InfiniteGridItem(horizontal, __assign(__assign({}, info), { key: key }));
                }
                nextItemKeys[key] = item;
            }
            return item;
        });
        return nextItems;
    };
    GroupManager.prototype._registerGroups = function (groups) {
        var nextGroupKeys = {};
        groups.forEach(function (group) {
            nextGroupKeys[group.groupKey] = group;
        });
        this.groups = groups;
        this.groupKeys = nextGroupKeys;
        this.groupItems = this._getGroupItems();
    };
    GroupManager.prototype._splitVirtualGroups = function (direction, nextGroups) {
        var groups = utils_1.splitVirtualGroups(this.groups, direction, nextGroups);
        var itemKeys = this.itemKeys;
        groups.forEach(function (_a) {
            var renderItems = _a.renderItems;
            renderItems.forEach(function (item) {
                itemKeys[item.key] = item;
            });
        });
        return groups;
    };
    GroupManager.prototype._mergeVirtualGroups = function (groups) {
        var itemKeys = this.itemKeys;
        var groupKeys = this.groupKeys;
        groups.forEach(function (group) {
            var prevGroup = groupKeys[group.groupKey];
            if (!prevGroup) {
                return;
            }
            var items = group.items;
            if (items.every(function (item) { return item.mountState === grid_1.MOUNT_STATE.UNCHECKED; })) {
                prevGroup.renderItems.forEach(function (item) {
                    if (item.type === consts_1.ITEM_TYPE.VIRTUAL && !itemKeys[item.key]) {
                        items.push(item);
                        itemKeys[item.key] = item;
                    }
                });
            }
        });
        return groups;
    };
    GroupManager.prototype._updatePlaceholder = function (items) {
        if (items === void 0) { items = this.groupItems; }
        var placeholder = this._placeholder;
        if (!placeholder) {
            return;
        }
        items.filter(function (item) { return item.type === consts_1.ITEM_TYPE.VIRTUAL; }).forEach(function (item) {
            utils_1.setPlaceholder(item, placeholder);
        });
    };
    GroupManager.prototype._makeGrid = function () {
        var GridConstructor = this.options.gridConstructor;
        var gridOptions = this.gridOptions;
        var container = this.containerElement;
        return new GridConstructor(container, __assign(__assign({}, gridOptions), { useFit: false, autoResize: false, useResizeObserver: false, observeChildren: false, renderOnPropertyChange: false, externalContainerManager: this.containerManager, externalItemRenderer: this.itemRenderer }));
    };
    GroupManager.prototype._getLoadingGroup = function () {
        var loadingGrid = this._loadingGrid;
        var items = loadingGrid.getItems();
        return {
            groupKey: LoadingGrid_1.LOADING_GROUP_KEY,
            type: consts_1.GROUP_TYPE.NORMAL,
            grid: loadingGrid,
            items: items,
            renderItems: items,
        };
    };
    GroupManager.prototype._getLoadingItem = function () {
        return this._loadingGrid.getLoadingItem();
    };
    GroupManager.defaultOptions = __assign(__assign({}, grid_1.default.defaultOptions), { appliedItemChecker: function () { return false; }, gridConstructor: null, gridOptions: {} });
    GroupManager.propertyTypes = __assign(__assign({}, grid_1.default.propertyTypes), { gridConstructor: grid_1.PROPERTY_TYPE.PROPERTY, gridOptions: grid_1.PROPERTY_TYPE.PROPERTY });
    GroupManager = __decorate([
        grid_1.GetterSetter
    ], GroupManager);
    return GroupManager;
}(grid_1.default));
exports.GroupManager = GroupManager;
