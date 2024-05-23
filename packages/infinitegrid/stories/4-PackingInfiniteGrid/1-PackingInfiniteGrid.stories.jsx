"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackingInfiniteGridTemplate = void 0;
var React = require("react");
var VanillaPackingInfiniteGridApp_1 = require("./apps/VanillaPackingInfiniteGridApp");
var ReactJSX_1 = require("../templates/ReactJSX");
var preview_1 = require("../templates/preview");
require("../templates/default.css");
exports.PackingInfiniteGridTemplate = ReactJSX_1.getApp(VanillaPackingInfiniteGridApp_1.default, function () { return <div className="container"></div>; });
exports.PackingInfiniteGridTemplate.storyName = "PackingInfiniteGrid";
// PackingInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// PackingInfiniteGridTemplate.args = { ...makeArgs(PackingInfiniteGridTemplate.argTypes) };
exports.PackingInfiniteGridTemplate.parameters = {
    preview: preview_1.getPreview("4-PackingInfiniteGrid", "PackingInfiniteGrid"),
};
