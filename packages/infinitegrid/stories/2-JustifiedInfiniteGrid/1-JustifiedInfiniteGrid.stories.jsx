"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JustifiedInfiniteGridTemplate = void 0;
var React = require("react");
var VanillaJustifiedInfiniteGridApp_1 = require("./apps/VanillaJustifiedInfiniteGridApp");
var ReactJSX_1 = require("../templates/ReactJSX");
var preview_1 = require("../templates/preview");
require("../templates/default.css");
exports.JustifiedInfiniteGridTemplate = ReactJSX_1.getApp(VanillaJustifiedInfiniteGridApp_1.default, function () { return <div className="container"></div>; });
exports.JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";
exports.JustifiedInfiniteGridTemplate.parameters = {
    preview: preview_1.getPreview("2-JustifiedInfiniteGrid", "JustifiedInfiniteGrid"),
};
