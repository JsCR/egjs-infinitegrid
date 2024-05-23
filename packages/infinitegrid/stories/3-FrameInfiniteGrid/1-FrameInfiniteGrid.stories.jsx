"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameInfiniteGridTemplate = void 0;
var React = require("react");
var VanillaFrameInfiniteGridApp_1 = require("./apps/VanillaFrameInfiniteGridApp");
var ReactJSX_1 = require("../templates/ReactJSX");
var preview_1 = require("../templates/preview");
require("../templates/default.css");
exports.FrameInfiniteGridTemplate = ReactJSX_1.getApp(VanillaFrameInfiniteGridApp_1.default, function () { return <div className="container"></div>; });
exports.FrameInfiniteGridTemplate.storyName = "FrameInfiniteGrid";
exports.FrameInfiniteGridTemplate.parameters = {
    preview: preview_1.getPreview("3-FrameInfiniteGrid", "FrameInfiniteGrid"),
};
