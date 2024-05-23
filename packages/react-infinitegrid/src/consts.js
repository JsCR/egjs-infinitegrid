"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACT_INFINITEGRID_PROPS = exports.REACT_INFINITEGRID_EVENTS = exports.REACT_INFINITEGRID_EVENT_MAP = void 0;
exports.REACT_INFINITEGRID_EVENT_MAP = {
    "onContentError": "contentError",
    "onRenderComplete": "renderComplete",
    "onRequestAppend": "requestAppend",
    "onRequestPrepend": "requestPrepend",
    "onChangeScroll": "changeScroll",
};
exports.REACT_INFINITEGRID_EVENTS = [];
for (var name_1 in exports.REACT_INFINITEGRID_EVENT_MAP) {
    exports.REACT_INFINITEGRID_EVENTS.push(name_1);
}
exports.REACT_INFINITEGRID_PROPS = __spreadArray([
    "tag",
    "placeholder",
    "status",
    "useFirstRender",
    "loading",
    "itemBy",
    "groupBy"
], exports.REACT_INFINITEGRID_EVENTS);
