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
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVISIBLE_POS = exports.STATUS_TYPE = exports.ITEM_TYPE = exports.GROUP_TYPE = exports.INFINITEGRID_METHODS = exports.ITEM_INFO_PROPERTIES = exports.INFINITEGRID_EVENTS = exports.DIRECTION = exports.INFINITEGRID_PROPERTY_TYPES = exports.IGNORE_PROPERITES_MAP = exports.CONTAINER_CLASS_NAME = exports.IS_IOS = void 0;
var grid_1 = require("@egjs/grid");
var ua = typeof window !== "undefined" ? window.navigator.userAgent : "";
exports.IS_IOS = /iPhone|iPad/.test(ua);
exports.CONTAINER_CLASS_NAME = "infinitegrid-container";
exports.IGNORE_PROPERITES_MAP = {
    renderOnPropertyChange: true,
    useFit: true,
    autoResize: true,
};
exports.INFINITEGRID_PROPERTY_TYPES = __assign({}, grid_1.GRID_PROPERTY_TYPES);
exports.DIRECTION = {
    START: "start",
    END: "end",
    NONE: "",
};
exports.INFINITEGRID_EVENTS = {
    CHANGE_SCROLL: "changeScroll",
    REQUEST_APPEND: "requestAppend",
    REQUEST_PREPEND: "requestPrepend",
    RENDER_COMPLETE: "renderComplete",
    CONTENT_ERROR: "contentError",
};
exports.ITEM_INFO_PROPERTIES = {
    type: true,
    groupKey: true,
    key: true,
    element: true,
    html: true,
    data: true,
    inserted: true,
    attributes: true,
};
exports.INFINITEGRID_METHODS = [
    "insertByGroupIndex",
    "updateItems",
    "getItems",
    "getVisibleItems",
    "getGroups",
    "getVisibleGroups",
    "renderItems",
    "getContainerElement",
    "getScrollContainerElement",
    "getWrapperElement",
    "setStatus",
    "getStatus",
    "removePlaceholders",
    "prependPlaceholders",
    "appendPlaceholders",
    "getStartCursor",
    "getEndCursor",
    "setCursors",
];
var GROUP_TYPE;
(function (GROUP_TYPE) {
    GROUP_TYPE[GROUP_TYPE["NORMAL"] = 0] = "NORMAL";
    GROUP_TYPE[GROUP_TYPE["VIRTUAL"] = 1] = "VIRTUAL";
    GROUP_TYPE[GROUP_TYPE["LOADING"] = 2] = "LOADING";
})(GROUP_TYPE = exports.GROUP_TYPE || (exports.GROUP_TYPE = {}));
var ITEM_TYPE;
(function (ITEM_TYPE) {
    ITEM_TYPE[ITEM_TYPE["NORMAL"] = 0] = "NORMAL";
    ITEM_TYPE[ITEM_TYPE["VIRTUAL"] = 1] = "VIRTUAL";
    ITEM_TYPE[ITEM_TYPE["LOADING"] = 2] = "LOADING";
})(ITEM_TYPE = exports.ITEM_TYPE || (exports.ITEM_TYPE = {}));
var STATUS_TYPE;
(function (STATUS_TYPE) {
    // does not remove anything.
    STATUS_TYPE[STATUS_TYPE["NOT_REMOVE"] = 0] = "NOT_REMOVE";
    // Minimize information on invisible items
    STATUS_TYPE[STATUS_TYPE["MINIMIZE_INVISIBLE_ITEMS"] = 1] = "MINIMIZE_INVISIBLE_ITEMS";
    // Minimize information on invisible groups
    STATUS_TYPE[STATUS_TYPE["MINIMIZE_INVISIBLE_GROUPS"] = 2] = "MINIMIZE_INVISIBLE_GROUPS";
    // remove invisible groups
    STATUS_TYPE[STATUS_TYPE["REMOVE_INVISIBLE_GROUPS"] = 3] = "REMOVE_INVISIBLE_GROUPS";
})(STATUS_TYPE = exports.STATUS_TYPE || (exports.STATUS_TYPE = {}));
exports.INVISIBLE_POS = -9999;
