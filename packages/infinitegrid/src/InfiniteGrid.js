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
var component_1 = require("@egjs/component");
var grid_1 = require("@egjs/grid");
var consts_1 = require("./consts");
var GroupManager_1 = require("./GroupManager");
var Infinite_1 = require("./Infinite");
var VanillaGridRenderer_1 = require("./Renderer/VanillaGridRenderer");
var ScrollManager_1 = require("./ScrollManager");
var utils_1 = require("./utils");
/**
 * A module used to arrange items including content infinitely according to layout type. With this module, you can implement various layouts composed of different items whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 아이템을 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 아이템을 다양한 레이아웃으로 배치할 수 있다. 아이템의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @example
```html
<ul id="grid">
  <li class="card">
    <div>test1</div>
  </li>
  <li class="card">
    <div>test2</div>
  </li>
  <li class="card">
    <div>test3</div>
  </li>
  <li class="card">
    <div>test4</div>
  </li>
  <li class="card">
    <div>test5</div>
  </li>
  <li class="card">
    <div>test6</div>
  </li>
</ul>
<script>
import { MasonryInfiniteGrid } from "@egjs/infinitegrid";
var some = new MasonryInfiniteGrid("#grid").on("renderComplete", function(e) {
  // ...
});
// If you already have items in the container, call "layout" method.
some.renderItems();
</script>
```
 */
var InfiniteGrid = /** @class */ (function (_super) {
    __extends(InfiniteGrid, _super);
    /**
     * @param - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
     * @param - The option object of the InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
     */
    function InfiniteGrid(wrapper, options) {
        var _this = _super.call(this) || this;
        _this._waitType = "";
        _this._onScroll = function (_a) {
            var direction = _a.direction, scrollPos = _a.scrollPos, relativeScrollPos = _a.relativeScrollPos;
            _this._scroll();
            /**
             * This event is fired when scrolling.
             * @ko 스크롤하면 발생하는 이벤트이다.
             * @event InfiniteGrid#changeScroll
             * @param {InfiniteGrid.OnChangeScroll} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             */
            _this.trigger(new component_1.ComponentEvent(consts_1.INFINITEGRID_EVENTS.CHANGE_SCROLL, {
                direction: direction,
                scrollPos: scrollPos,
                relativeScrollPos: relativeScrollPos,
            }));
        };
        _this._onChange = function (e) {
            _this.setCursors(e.nextStartCursor, e.nextEndCursor);
        };
        _this._onRendererUpdated = function (e) {
            var renderedItems = e.items;
            renderedItems.forEach(function (item) {
                // set grid element
                var gridItem = item.orgItem;
                gridItem.element = item.element;
            });
            if (!e.isChanged) {
                _this._checkEndLoading();
                _this._scroll();
                return;
            }
            var _a = e.diffResult, added = _a.added, removed = _a.removed, prevList = _a.prevList, list = _a.list;
            removed.forEach(function (index) {
                var orgItem = prevList[index].orgItem;
                if (orgItem.mountState !== grid_1.MOUNT_STATE.UNCHECKED) {
                    orgItem.mountState = grid_1.MOUNT_STATE.UNMOUNTED;
                }
            });
            var horizontal = _this.options.horizontal;
            var addedItems = added.map(function (index) {
                var gridItem = list[index].orgItem;
                var element = gridItem.element;
                if (gridItem.type === consts_1.ITEM_TYPE.VIRTUAL) {
                    var cssRect = __assign({}, gridItem.cssRect);
                    var rect = gridItem.rect;
                    if (!cssRect.width && rect.width) {
                        cssRect.width = rect.width;
                    }
                    if (!cssRect.height && rect.height) {
                        cssRect.height = rect.height;
                    }
                    // virtual item
                    return new grid_1.GridItem(horizontal, {
                        element: element,
                        cssRect: cssRect,
                    });
                }
                return gridItem;
            });
            var containerManager = _this.containerManager;
            if (_this.options.observeChildren) {
                containerManager.observeChildren(added.map(function (index) { return list[index].element; }));
                containerManager.unobserveChildren(removed.map(function (index) { return prevList[index].element; }));
            }
            var _b = e.state, isRestore = _b.isRestore, isResize = _b.isResize;
            _this.itemRenderer.renderItems(addedItems);
            if (isRestore) {
                _this._onRenderComplete({
                    mounted: added.map(function (index) { return list[index].orgItem; }),
                    updated: [],
                    isResize: false,
                    direction: _this.defaultDirection,
                });
            }
            if (!isRestore || isResize || e.isItemChanged) {
                _this.groupManager.renderItems();
            }
        };
        _this._onResize = function (e) {
            if (e.isResizeContainer) {
                _this._renderItems({ useResize: true }, true);
            }
            else {
                var updatedItems = grid_1.getUpdatedItems(_this.getVisibleItems(), e.childEntries);
                if (updatedItems.length > 0) {
                    _this.updateItems(updatedItems);
                }
            }
        };
        _this._onRequestAppend = function (e) {
            /**
             * The event is fired when scrolling reaches the end or when data for a virtual group is required.
             * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
             * @event InfiniteGrid#requestAppend
             * @param {InfiniteGrid.OnRequestAppend} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             */
            _this._onRequestInsert(consts_1.DIRECTION.END, consts_1.INFINITEGRID_EVENTS.REQUEST_APPEND, e);
        };
        _this._onRequestPrepend = function (e) {
            /**
             * The event is fired when scrolling reaches the start or when data for a virtual group is required.
             * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
             * @event InfiniteGrid#requestPrepend
             * @param {InfiniteGrid.OnRequestPrepend} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             */
            _this._onRequestInsert(consts_1.DIRECTION.START, consts_1.INFINITEGRID_EVENTS.REQUEST_PREPEND, e);
        };
        _this._onContentError = function (_a) {
            var element = _a.element, target = _a.target, item = _a.item, update = _a.update;
            /**
             * The event is fired when scrolling reaches the start or when data for a virtual group is required.
             * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
             * @event InfiniteGrid#contentError
             * @param {InfiniteGrid.OnContentError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             */
            _this.trigger(new component_1.ComponentEvent(consts_1.INFINITEGRID_EVENTS.CONTENT_ERROR, {
                element: element,
                target: target,
                item: item,
                update: update,
                remove: function () {
                    _this.removeByKey(item.key);
                },
            }));
        };
        _this._onRenderComplete = function (_a) {
            var isResize = _a.isResize, mounted = _a.mounted, updated = _a.updated, direction = _a.direction;
            var infinite = _this.infinite;
            var prevRenderedGroups = infinite.getRenderedVisibleItems();
            var length = prevRenderedGroups.length;
            var isDirectionEnd = direction === consts_1.DIRECTION.END;
            _this._syncInfinite();
            if (length) {
                var prevStandardGroup = prevRenderedGroups[isDirectionEnd ? 0 : length - 1];
                var nextStandardGroup = infinite.getItemByKey(prevStandardGroup.key);
                var offset = isDirectionEnd
                    ? Math.min.apply(Math, nextStandardGroup.startOutline) - Math.min.apply(Math, prevStandardGroup.startOutline)
                    : Math.max.apply(Math, nextStandardGroup.endOutline) - Math.max.apply(Math, prevStandardGroup.endOutline);
                _this.scrollManager.scrollBy(offset);
            }
            /**
             * This event is fired when the InfiniteGrid has completed rendering.
             * @ko InfiniteGrid가 렌더링이 완료됐을 때 이벤트가 발생한다.
             * @event InfiniteGrid#renderComplete
             * @param {InfiniteGrid.OnRenderComplete} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             */
            _this.trigger(new component_1.ComponentEvent(consts_1.INFINITEGRID_EVENTS.RENDER_COMPLETE, {
                isResize: isResize,
                direction: direction,
                mounted: mounted.filter(function (item) { return item.type !== consts_1.ITEM_TYPE.LOADING; }),
                updated: updated.filter(function (item) { return item.type !== consts_1.ITEM_TYPE.LOADING; }),
                startCursor: _this.getStartCursor(),
                endCursor: _this.getEndCursor(),
                items: _this.getVisibleItems(true),
                groups: _this.getVisibleGroups(true),
            }));
            if (_this.groupManager.shouldRerenderItems()) {
                _this._update();
            }
            else {
                _this._checkEndLoading();
                _this._scroll();
            }
        };
        _this.options = __assign(__assign(__assign({}, _this.constructor.defaultOptions), { renderer: new VanillaGridRenderer_1.VanillaGridRenderer().on("requestUpdate", function () { return _this._render(); }) }), options);
        var _a = _this.options, gridConstructor = _a.gridConstructor, containerTag = _a.containerTag, container = _a.container, renderer = _a.renderer, threshold = _a.threshold, useRecycle = _a.useRecycle, scrollContainer = _a.scrollContainer, appliedItemChecker = _a.appliedItemChecker, gridOptions = __rest(_a, ["gridConstructor", "containerTag", "container", "renderer", "threshold", "useRecycle", "scrollContainer", "appliedItemChecker"]);
        // options.container === false, wrapper = container, scrollContainer = document.body
        // options.container === true, wrapper = scrollContainer, container = wrapper's child
        // options.container === string,
        var horizontal = gridOptions.horizontal, attributePrefix = gridOptions.attributePrefix, useTransform = gridOptions.useTransform, percentage = gridOptions.percentage, isConstantSize = gridOptions.isConstantSize, isEqualSize = gridOptions.isEqualSize, autoResize = gridOptions.autoResize, useResizeObserver = gridOptions.useResizeObserver, resizeDebounce = gridOptions.resizeDebounce, maxResizeDebounce = gridOptions.maxResizeDebounce, defaultDirection = gridOptions.defaultDirection;
        var wrapperElement = utils_1.isString(wrapper) ? document.querySelector(wrapper) : wrapper;
        var scrollManager = new ScrollManager_1.ScrollManager(wrapperElement, {
            scrollContainer: scrollContainer,
            container: container,
            containerTag: containerTag,
            horizontal: horizontal,
        }).on({
            scroll: _this._onScroll,
        });
        var containerElement = scrollManager.getContainer();
        var containerManager = new grid_1.ContainerManager(containerElement, {
            horizontal: horizontal,
            autoResize: autoResize,
            resizeDebounce: resizeDebounce,
            maxResizeDebounce: maxResizeDebounce,
            useResizeObserver: useResizeObserver,
        }).on("resize", _this._onResize);
        var itemRenderer = new grid_1.ItemRenderer({
            attributePrefix: attributePrefix,
            horizontal: horizontal,
            useTransform: useTransform,
            percentage: percentage,
            isEqualSize: isEqualSize,
            isConstantSize: isConstantSize,
        });
        var infinite = new Infinite_1.Infinite({
            defaultDirection: defaultDirection,
            useRecycle: useRecycle,
            threshold: threshold,
        }).on({
            "change": _this._onChange,
            "requestAppend": _this._onRequestAppend,
            "requestPrepend": _this._onRequestPrepend,
        });
        infinite.setSize(scrollManager.getContentSize());
        var groupManager = new GroupManager_1.GroupManager(containerElement, {
            appliedItemChecker: appliedItemChecker,
            gridConstructor: gridConstructor,
            externalItemRenderer: itemRenderer,
            externalContainerManager: containerManager,
            gridOptions: gridOptions,
        });
        groupManager.on({
            "renderComplete": _this._onRenderComplete,
            "contentError": _this._onContentError,
        });
        renderer.setContainer(containerElement);
        renderer.on("updated", _this._onRendererUpdated);
        _this.itemRenderer = itemRenderer;
        _this.groupManager = groupManager;
        _this.wrapperElement = wrapperElement;
        _this.scrollManager = scrollManager;
        _this.containerManager = containerManager;
        _this.infinite = infinite;
        _this.containerManager.resize();
        return _this;
    }
    InfiniteGrid_1 = InfiniteGrid;
    /**
     * Rearrange items to fit the grid and render them. When rearrange is complete, the `renderComplete` event is fired.
     * @ko grid에 맞게 아이템을 재배치하고 렌더링을 한다. 배치가 완료되면 `renderComplete` 이벤트가 발생한다.
     * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
     * @example
     * ```ts
     * import { MasonryInfiniteGrid } from "@egjs/infinitegrid";
     * const grid = new MasonryInfiniteGrid();
     *
     * grid.on("renderComplete", e => {
     *   console.log(e);
     * });
     * grid.renderItems();
     * ```
     */
    InfiniteGrid.prototype.renderItems = function (options) {
        if (options === void 0) { options = {}; }
        this._renderItems(options);
        return this;
    };
    /**
     * Returns the wrapper element specified by the user.
     * @ko 컨테이너 엘리먼트를 반환한다.
     */
    InfiniteGrid.prototype.getWrapperElement = function () {
        return this.scrollManager.getWrapper();
    };
    /**
     * Returns the container element corresponding to the scroll area.
     * @ko 스크롤 영역에 해당하는 컨테이너 엘리먼트를 반환한다.
     */
    InfiniteGrid.prototype.getScrollContainerElement = function () {
        return this.scrollManager.getScrollContainer();
    };
    /**
     * Returns the container element containing item elements.
     * @ko 아이템 엘리먼트들을 담긴 컨테이너 엘리먼트를 반환한다.
     */
    InfiniteGrid.prototype.getContainerElement = function () {
        return this.scrollManager.getContainer();
    };
    /**
     * When items change, it synchronizes and renders items.
     * @ko items가 바뀐 경우 동기화를 하고 렌더링을 한다.
     * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
     */
    InfiniteGrid.prototype.syncItems = function (items) {
        this.groupManager.syncItems(items);
        this._syncGroups();
        return this;
    };
    /**
     * Change the currently visible groups.
     * @ko 현재 보이는 그룹들을 바꾼다.
     * @param - first index of visible groups. <ko>보이는 그룹의 첫번째 index.</ko>
     * @param - last index of visible groups. <ko>보이는 그룹의 마지막 index.</ko>
     * @param - Whether the first rendering has already been done. <ko>첫 렌더링이 이미 되어있는지 여부.</ko>
     */
    InfiniteGrid.prototype.setCursors = function (startCursor, endCursor, useFirstRender) {
        this.groupManager.setCursors(startCursor, endCursor);
        this.infinite.setCursors(startCursor, endCursor);
        if (useFirstRender) {
            this._syncItems();
        }
        else {
            this._update();
            this._checkEndLoading();
        }
        return this;
    };
    /**
     * Returns the first index of visible groups.
     * @ko 보이는 그룹들의 첫번째 index를 반환한다.
     */
    InfiniteGrid.prototype.getStartCursor = function () {
        return this.infinite.getStartCursor();
    };
    /**
     * Returns the last index of visible groups.
     * @ko 보이는 그룹들의 마지막 index를 반환한다.
     */
    InfiniteGrid.prototype.getEndCursor = function () {
        return this.infinite.getEndCursor();
    };
    /**
     * Add items at the bottom(right) of the grid.
     * @ko 아이템들을 grid 아래(오른쪽)에 추가한다.
     * @param - items to be added <ko>추가할 아이템들</ko>
     * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
     * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @example
     * ```js
     * ig.append(`<div class="item">test1</div><div class="item">test2</div>`);
     * ig.append([`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
     * ig.append([HTMLElement1, HTMLElement2]);
     * ```
     */
    InfiniteGrid.prototype.append = function (items, groupKey) {
        return this.insert(-1, items, groupKey);
    };
    /**
     * Add items at the top(left) of the grid.
     * @ko 아이템들을 grid 위(왼쪽)에 추가한다.
     * @param - items to be added <ko>추가할 아이템들</ko>
     * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
     * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @example
     * ```ts
     * ig.prepend(`<div class="item">test1</div><div class="item">test2</div>`);
     * ig.prepend([`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
     * ig.prepend([HTMLElement1, HTMLElement2]);
     * ```
     */
    InfiniteGrid.prototype.prepend = function (items, groupKey) {
        return this.insert(0, items, groupKey);
    };
    /**
     * Add items to a specific index.
     * @ko 아이템들을 특정 index에 추가한다.
     * @param - index to add <ko>추가하기 위한 index</ko>
     * @param - items to be added <ko>추가할 아이템들</ko>
     * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
     * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @example
     * ```ts
     * ig.insert(2, `<div class="item">test1</div><div class="item">test2</div>`);
     * ig.insert(3, [`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
     * ig.insert(4, [HTMLElement1, HTMLElement2]);
     * ```
     */
    InfiniteGrid.prototype.insert = function (index, items, groupKey) {
        var nextItemInfos = this.groupManager.getGroupItems();
        var itemInfos = utils_1.convertInsertedItems(items, groupKey);
        if (index === -1) {
            nextItemInfos.push.apply(nextItemInfos, itemInfos);
        }
        else {
            nextItemInfos.splice.apply(nextItemInfos, __spreadArray([index, 0], itemInfos));
        }
        return this.syncItems(nextItemInfos);
    };
    /**
     * Add items based on group index.
     * @ko group의 index 기준으로 item들을 추가한다.
     * @param - group index to add <ko>추가하기 위한 group의 index</ko>
     * @param - items to be added <ko>추가할 아이템들</ko>
     * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
     * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @example
     * ```ts
     * ig.insertByGroupIndex(2, `<div class="item">test1</div><div class="item">test2</div>`);
     * ig.insertByGroupIndex(3, [`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
     * ig.insertByGroupIndex(4, [HTMLElement1, HTMLElement2]);
     * ```
     */
    InfiniteGrid.prototype.insertByGroupIndex = function (groupIndex, items, groupKey) {
        var nextGroupInfos = this.groupManager.getGroups();
        var rightGroup = nextGroupInfos[groupIndex];
        if (!rightGroup) {
            return this.append(items, groupKey);
        }
        var nextItemInfos = this.groupManager.getGroupItems();
        var rightGroupKey = rightGroup.groupKey;
        var rightItemIndex = utils_1.findIndex(nextItemInfos, function (item) { return item.groupKey === rightGroupKey; });
        return this.insert(rightItemIndex, items, groupKey);
    };
    /**
     * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
     * @ko 아이템의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
     * @param - STATUS_TYPE.NOT_REMOVE = Get all information about items. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = Get information on visible items only. STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = Compress invisible items. You can replace it with a placeholder. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = Compress invisible groups. <ko> STATUS_TYPE.NOT_REMOVE = 모든 아이템들의 정보를 가져온다. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = 보이는 아이템들의 정보만 가져온다. STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = 안보이는 아이템들을 압축한다. placeholder로 대체가 가능하다. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = 안보이는 그룹을 압축한다.</ko>
     * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
     */
    InfiniteGrid.prototype.getStatus = function (type, includePlaceholders) {
        return {
            containerManager: this.containerManager.getStatus(),
            itemRenderer: this.itemRenderer.getStatus(),
            groupManager: this.groupManager.getGroupStatus(type, includePlaceholders),
            scrollManager: this.scrollManager.getStatus(),
        };
    };
    /**
     * You can set placeholders to restore status or wait for items to be added.
     * @ko status 복구 또는 아이템 추가 대기를 위한 placeholder를 설정할 수 있다.
     * @param - The placeholder status. <ko>placeholder의 status</ko>
     */
    InfiniteGrid.prototype.setPlaceholder = function (info) {
        this.groupManager.setPlaceholder(info);
        return this;
    };
    /**
     * You can set placeholders to restore status or wait for items to be added.
     * @ko status 복구 또는 아이템 추가 대기를 위한 placeholder를 설정할 수 있다.
     * @param - The placeholder status. <ko>placeholder의 status</ko>
     */
    InfiniteGrid.prototype.setLoading = function (info) {
        this.groupManager.setLoading(info);
        return this;
    };
    /**
     * Add the placeholder at the end.
     * @ko placeholder들을 마지막에 추가한다.
     * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
     * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
     */
    InfiniteGrid.prototype.appendPlaceholders = function (items, groupKey) {
        var _this = this;
        var result = this.groupManager.appendPlaceholders(items, groupKey);
        this._syncGroups(true);
        return __assign(__assign({}, result), { remove: function () {
                _this.removePlaceholders({ groupKey: result.group.groupKey });
            } });
    };
    /**
     * Add the placeholder at the start.
     * @ko placeholder들을 처음에 추가한다.
     * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
     * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
     */
    InfiniteGrid.prototype.prependPlaceholders = function (items, groupKey) {
        var _this = this;
        var result = this.groupManager.prependPlaceholders(items, groupKey);
        this._syncGroups(true);
        return __assign(__assign({}, result), { remove: function () {
                _this.removePlaceholders({ groupKey: result.group.groupKey });
            } });
    };
    /**
     * Remove placeholders
     * @ko placeholder들을 삭제한다.
     * @param type - Remove the placeholders corresponding to the groupkey. When "start" or "end", remove all placeholders in that direction. <ko>groupkey에 해당하는 placeholder들을 삭제한다. "start" 또는 "end" 일 때 해당 방향의 모든 placeholder들을 삭제한다.</ko>
     */
    InfiniteGrid.prototype.removePlaceholders = function (type) {
        this.groupManager.removePlaceholders(type);
        this._syncGroups(true);
    };
    /**
     * Sets the status of the InfiniteGrid module with the information returned through a call to the getStatus() method.
     * @ko getStatus() 메서드가 저장한 정보로 InfiniteGrid 모듈의 상태를 설정한다.
     * @param - status object of the InfiniteGrid module. <ko>InfiniteGrid 모듈의 status 객체.</ko>
     * @param - Whether the first rendering has already been done. <ko>첫 렌더링이 이미 되어있는지 여부.</ko>
     */
    InfiniteGrid.prototype.setStatus = function (status, useFirstRender) {
        this.itemRenderer.setStatus(status.itemRenderer);
        this.containerManager.setStatus(status.containerManager);
        this.scrollManager.setStatus(status.scrollManager);
        var groupManager = this.groupManager;
        var prevInlineSize = this.containerManager.getInlineSize();
        groupManager.setGroupStatus(status.groupManager);
        this._syncInfinite();
        this.infinite.setCursors(groupManager.getStartCursor(), groupManager.getEndCursor());
        this._getRenderer().updateKey();
        var state = {
            isResize: this.containerManager.getInlineSize() !== prevInlineSize,
            isRestore: true,
        };
        if (useFirstRender) {
            this._syncItems(state);
        }
        else {
            this._update(state);
        }
        return this;
    };
    /**
     * Removes the group corresponding to index.
     * @ko index에 해당하는 그룹을 제거 한다.
     */
    InfiniteGrid.prototype.removeGroupByIndex = function (index) {
        var nextGroups = this.getGroups();
        return this.removeGroupByKey(nextGroups[index].groupKey);
    };
    /**
     * Removes the group corresponding to key.
     * @ko key에 해당하는 그룹을 제거 한다.
     */
    InfiniteGrid.prototype.removeGroupByKey = function (key) {
        var nextItemInfos = this.getItems();
        var firstIndex = utils_1.findIndex(nextItemInfos, function (item) { return item.groupKey === key; });
        var lastIndex = utils_1.findLastIndex(nextItemInfos, function (item) { return item.groupKey === key; });
        if (firstIndex === -1) {
            return this;
        }
        nextItemInfos.splice(firstIndex, lastIndex - firstIndex + 1);
        return this.syncItems(nextItemInfos);
    };
    /**
     * Removes the item corresponding to index.
     * @ko index에 해당하는 아이템을 제거 한다.
     */
    InfiniteGrid.prototype.removeByIndex = function (index) {
        var nextItemInfos = this.getItems(true);
        nextItemInfos.splice(index, 1);
        return this.syncItems(nextItemInfos);
    };
    /**
     * Removes the item corresponding to key.
     * @ko key에 해당하는 아이템을 제거 한다.
     */
    InfiniteGrid.prototype.removeByKey = function (key) {
        var nextItemInfos = this.getItems(true);
        var index = utils_1.findIndex(nextItemInfos, function (item) { return item.key === key; });
        return this.removeByIndex(index);
    };
    /**
     * Update the size of the items and render them.
     * @ko 아이템들의 사이즈를 업데이트하고 렌더링을 한다.
     * @param - Items to be updated. <ko>업데이트할 아이템들.</ko>
     * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
     */
    InfiniteGrid.prototype.updateItems = function (items, options) {
        if (options === void 0) { options = {}; }
        this.groupManager.updateItems(items, options);
        return this;
    };
    /**
     * Return all items of InfiniteGrid.
     * @ko InfiniteGrid의 모든 아이템들을 반환한다.
     * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
     */
    InfiniteGrid.prototype.getItems = function (includePlaceholders) {
        return this.groupManager.getGroupItems(includePlaceholders);
    };
    /**
     * Return visible items of InfiniteGrid.
     * @ko InfiniteGrid의 보이는 아이템들을 반환한다.
     * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
     */
    InfiniteGrid.prototype.getVisibleItems = function (includePlaceholders) {
        return this.groupManager.getVisibleItems(includePlaceholders);
    };
    /**
     * Return rendering items of InfiniteGrid.
     * @ko InfiniteGrid의 렌더링 아이템들을 반환한다.
     */
    InfiniteGrid.prototype.getRenderingItems = function () {
        return this.groupManager.getRenderingItems();
    };
    /**
     * Return all groups of InfiniteGrid.
     * @ko InfiniteGrid의 모든 그룹들을 반환한다.
     * @param - Whether to include groups corresponding to placeholders. <ko>placeholder에 해당하는 그룹들을 포함할지 여부.</ko>
     */
    InfiniteGrid.prototype.getGroups = function (includePlaceholders) {
        return this.groupManager.getGroups(includePlaceholders);
    };
    /**
     * Return visible groups of InfiniteGrid.
     * @ko InfiniteGrid의 보이는 그룹들을 반환한다.
     * @param - Whether to include groups corresponding to placeholders. <ko>placeholder에 해당하는 그룹들을 포함할지 여부.</ko>
     */
    InfiniteGrid.prototype.getVisibleGroups = function (includePlaceholders) {
        return this.groupManager.getVisibleGroups(includePlaceholders);
    };
    /**
     * Set to wait to request data.
     * @ko 데이터를 요청하기 위해 대기 상태로 설정한다.
     * @param direction - direction in which data will be added. <ko>데이터를 추가하기 위한 방향.</ko>
     */
    InfiniteGrid.prototype.wait = function (direction) {
        if (direction === void 0) { direction = consts_1.DIRECTION.END; }
        this._waitType = direction;
        this._checkStartLoading(direction);
    };
    /**
     * When the data request is complete, it is set to ready state.
     * @ko 데이터 요청이 끝났다면 준비 상태로 설정한다.
     */
    InfiniteGrid.prototype.ready = function () {
        this._waitType = "";
    };
    /**
     * Returns whether it is set to wait to request data.
     * @ko 데이터를 요청하기 위해 대기 상태로 설정되어 있는지 여부를 반환한다.
     */
    InfiniteGrid.prototype.isWait = function () {
        return !!this._waitType;
    };
    /**
     * Releases the instnace and events and returns the CSS of the container and elements.
     * @ko 인스턴스와 이벤트를 해제하고 컨테이너와 엘리먼트들의 CSS를 되돌린다.
     */
    InfiniteGrid.prototype.destroy = function () {
        this.off();
        this._getRenderer().destroy();
        this.containerManager.destroy();
        this.groupManager.destroy();
        this.scrollManager.destroy();
        this.infinite.destroy();
    };
    InfiniteGrid.prototype._getRenderer = function () {
        return this.options.renderer;
    };
    InfiniteGrid.prototype._getRendererItems = function () {
        return this.getRenderingItems().map(function (item) {
            return {
                element: item.element,
                key: item.type + "_" + item.key,
                orgItem: item,
            };
        });
    };
    InfiniteGrid.prototype._syncItems = function (state) {
        this._getRenderer().syncItems(this._getRendererItems(), state);
    };
    InfiniteGrid.prototype._render = function (state) {
        this._getRenderer().render(this._getRendererItems(), state);
    };
    InfiniteGrid.prototype._update = function (state) {
        if (state === void 0) { state = {}; }
        this._getRenderer().update(state);
    };
    InfiniteGrid.prototype._resizeScroll = function () {
        var scrollManager = this.scrollManager;
        scrollManager.resize();
        this.infinite.setSize(scrollManager.getContentSize());
    };
    InfiniteGrid.prototype._syncGroups = function (isUpdate) {
        var infinite = this.infinite;
        var scrollManager = this.scrollManager;
        if (!scrollManager.getContentSize()) {
            this._resizeScroll();
        }
        this._syncInfinite();
        this.groupManager.setCursors(infinite.getStartCursor(), infinite.getEndCursor());
        if (isUpdate) {
            this._update();
        }
        else {
            this._render();
        }
    };
    InfiniteGrid.prototype._syncInfinite = function () {
        this.infinite.syncItems(this.getGroups(true).map(function (_a) {
            var groupKey = _a.groupKey, grid = _a.grid, type = _a.type;
            var outlines = grid.getOutlines();
            return {
                key: groupKey,
                isVirtual: type === consts_1.GROUP_TYPE.VIRTUAL,
                startOutline: outlines.start,
                endOutline: outlines.end,
            };
        }));
    };
    InfiniteGrid.prototype._scroll = function () {
        this.infinite.scroll(this.scrollManager.getRelativeScrollPos());
    };
    InfiniteGrid.prototype._onRequestInsert = function (direction, eventType, e) {
        var _this = this;
        if (this._waitType) {
            this._checkStartLoading(this._waitType);
            return;
        }
        this.trigger(new component_1.ComponentEvent(eventType, {
            groupKey: e.key,
            nextGroupKey: e.nextKey,
            nextGroupKeys: e.nextKeys || [],
            isVirtual: e.isVirtual,
            wait: function () {
                _this.wait(direction);
            },
            ready: function () {
                _this.ready();
            },
        }));
    };
    InfiniteGrid.prototype._renderItems = function (options, isTrusted) {
        if (options === void 0) { options = {}; }
        if (!isTrusted && options.useResize) {
            this.containerManager.resize();
        }
        this._resizeScroll();
        if (!this.getRenderingItems().length) {
            var children = utils_1.toArray(this.getContainerElement().children);
            if (children.length > 0) {
                // no items, but has children
                this.groupManager.syncItems(utils_1.convertInsertedItems(children));
                this._syncInfinite();
                this.setCursors(0, 0, true);
                this._getRenderer().updated();
            }
            else {
                this.infinite.scroll(0);
            }
            return this;
        }
        if (!this.getVisibleGroups(true).length) {
            this.setCursors(0, 0);
        }
        else {
            this.groupManager.renderItems(options);
        }
        return this;
    };
    InfiniteGrid.prototype._checkStartLoading = function (direction) {
        var groupManager = this.groupManager;
        var infinite = this.infinite;
        if (!groupManager.getLoadingType()
            && infinite.isLoading(direction)
            && groupManager.startLoading(direction)
            && groupManager.hasLoadingItem()) {
            this._update();
        }
    };
    InfiniteGrid.prototype._checkEndLoading = function () {
        var groupManager = this.groupManager;
        var loadingType = this.groupManager.getLoadingType();
        if (loadingType
            && (!this._waitType || !this.infinite.isLoading(loadingType))
            && groupManager.endLoading()
            && groupManager.hasLoadingItem()) {
            this._update();
        }
    };
    var InfiniteGrid_1;
    InfiniteGrid.defaultOptions = __assign(__assign({}, grid_1.DEFAULT_GRID_OPTIONS), { container: false, containerTag: "div", renderer: null, threshold: 100, useRecycle: true, scrollContainer: null, appliedItemChecker: (function () { return false; }) });
    InfiniteGrid.propertyTypes = consts_1.INFINITEGRID_PROPERTY_TYPES;
    InfiniteGrid = InfiniteGrid_1 = __decorate([
        utils_1.InfiniteGridGetterSetter
    ], InfiniteGrid);
    return InfiniteGrid;
}(component_1.default));
exports.default = InfiniteGrid;
