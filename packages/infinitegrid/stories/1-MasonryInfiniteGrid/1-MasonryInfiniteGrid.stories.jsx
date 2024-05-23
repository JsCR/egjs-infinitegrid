"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasonryInfiniteGridTemplate = void 0;
var React = require("react");
var VanillaMasonryInfiniteGridApp_1 = require("./apps/VanillaMasonryInfiniteGridApp");
var ReactJSX_1 = require("../templates/ReactJSX");
var preview_1 = require("../templates/preview");
require("../templates/default.css");
exports.MasonryInfiniteGridTemplate = ReactJSX_1.getApp(VanillaMasonryInfiniteGridApp_1.default, function () { return <div className="container"></div>; });
exports.MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
// MasonryInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridTemplate.args = { ...makeArgs(MasonryInfiniteGridTemplate.argTypes) };
exports.MasonryInfiniteGridTemplate.parameters = {
    preview: preview_1.getPreview("1-MasonryInfiniteGrid", "MasonryInfiniteGrid"),
};
