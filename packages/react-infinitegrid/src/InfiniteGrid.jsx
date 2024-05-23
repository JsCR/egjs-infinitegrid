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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfiniteGrid = void 0;
/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
var React = require("react");
var infinitegrid_1 = require("@egjs/infinitegrid");
var consts_1 = require("./consts");
var utils_1 = require("./utils");
var InfiniteGrid = /** @class */ (function (_super) {
    __extends(InfiniteGrid, _super);
    function InfiniteGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wrapperRef = React.createRef();
        _this._containerRef = React.createRef();
        return _this;
    }
    InfiniteGrid.prototype.render = function () {
        var attributes = {};
        var props = this.props;
        var GridClass = this.constructor.GridClass;
        var defaultOptions = GridClass.defaultOptions;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var Tag = props.tag || "div";
        for (var name_1 in props) {
            if (name_1 in defaultOptions || consts_1.REACT_INFINITEGRID_PROPS.indexOf(name_1) > -1) {
                continue;
            }
            attributes[name_1] = props[name_1];
        }
        return <Tag ref={this._wrapperRef} {...attributes}>
      {this._renderContainer()}
    </Tag>;
    };
    InfiniteGrid.prototype.componentDidMount = function () {
        var _this = this;
        var GridClass = this.constructor.GridClass;
        var defaultOptions = GridClass.defaultOptions;
        var options = {};
        var props = this.props;
        var containerElement = this._containerRef.current;
        for (var name_2 in defaultOptions) {
            if (name_2 in props) {
                options[name_2] = props[name_2];
            }
        }
        if (containerElement) {
            options.container = containerElement;
        }
        this._renderer = new infinitegrid_1.Renderer();
        options.renderer = this._renderer;
        var grid = new GridClass(this._wrapperRef.current, options);
        var _loop_1 = function (eventName) {
            var nativeEventName = consts_1.REACT_INFINITEGRID_EVENT_MAP[eventName];
            grid.on(nativeEventName, function (e) {
                var callback = _this.props[eventName];
                callback && callback(e);
            });
        };
        for (var eventName in consts_1.REACT_INFINITEGRID_EVENT_MAP) {
            _loop_1(eventName);
        }
        this._grid = grid;
        this._renderer.on("update", function () {
            _this.setState({});
        });
        infinitegrid_1.mountRenderingItems(this._getItemInfos(), {
            grid: grid,
            useFirstRender: props.useFirstRender,
            useLoading: props.loading,
            usePlaceholder: props.placeholder,
            horizontal: props.horizontal,
            status: props.status,
        });
        this._renderer.updated();
    };
    InfiniteGrid.prototype.componentDidUpdate = function () {
        var GridClass = this.constructor.GridClass;
        var propertyTypes = GridClass.propertyTypes;
        var props = this.props;
        var grid = this._grid;
        for (var name_3 in propertyTypes) {
            if (name_3 in props) {
                grid[name_3] = props[name_3];
            }
        }
        this._renderer.updated();
    };
    InfiniteGrid.prototype.componentWillUnmount = function () {
        this._grid.destroy();
    };
    InfiniteGrid.prototype._getItemInfos = function () {
        var props = this.props;
        var children = React.Children.toArray(props.children);
        var attributePrefix = props.attributePrefix || infinitegrid_1.default.defaultOptions.attributePrefix;
        var itemBy = props.itemBy || (function (item) { return item.key; });
        var groupBy = props.groupBy || (function (item) { return item.props[attributePrefix + "groupkey"]; });
        var infoBy = props.infoBy || (function () { return ({}); });
        return children.map(function (child, i) {
            var _a = infoBy(child, i) || {}, data = _a.data, rest = __rest(_a, ["data"]);
            return __assign(__assign({ groupKey: groupBy(child, i), key: itemBy(child, i) }, rest), { data: __assign(__assign({}, data), { jsx: child }) });
        });
    };
    InfiniteGrid.prototype._renderContainer = function () {
        var props = this.props;
        var visibleChildren = this._getVisibleChildren();
        var container = props.container;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var ContainerTag = props.containerTag || "div";
        if (container === true) {
            return <ContainerTag ref={this._containerRef}>
        {visibleChildren}
      </ContainerTag>;
        }
        else {
            return visibleChildren;
        }
    };
    InfiniteGrid.prototype._getVisibleChildren = function () {
        var props = this.props;
        var placeholder = props.placeholder;
        var loading = props.loading;
        var visibleItems = infinitegrid_1.getRenderingItems(this._getItemInfos(), {
            grid: this._grid,
            status: props.status,
            horizontal: props.horizontal,
            useFirstRender: props.useFirstRender,
            useLoading: props.loading,
            usePlaceholder: props.placeholder,
        });
        return visibleItems.map(function (item) {
            if (item.type === infinitegrid_1.ITEM_TYPE.VIRTUAL) {
                return React.cloneElement(utils_1.isFunction(placeholder) ? placeholder(item) : placeholder, { key: item.key });
            }
            else if (item.type === infinitegrid_1.ITEM_TYPE.LOADING) {
                return React.cloneElement(utils_1.isFunction(loading) ? loading(item) : loading, { key: item.key });
            }
            else {
                return item.data.jsx;
            }
        });
    };
    __decorate([
        infinitegrid_1.withInfiniteGridMethods
    ], InfiniteGrid.prototype, "_grid", void 0);
    return InfiniteGrid;
}(React.Component));
exports.InfiniteGrid = InfiniteGrid;
