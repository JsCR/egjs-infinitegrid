"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasonryInfiniteGridTemplate = void 0;
var React = require("react");
/* eslint-disable import/no-webpack-loader-syntax */
var ReactMasonryInfiniteGridApp_1 = require("./apps/ReactMasonryInfiniteGridApp");
// import RawMasonryInfiniteGridApp from "!!raw-loader!./apps/ReactMasonryInfiniteGridApp";
require("../../../../stories/templates/default.css");
var MasonryInfiniteGridTemplate = function () { return <ReactMasonryInfiniteGridApp_1.default />; };
exports.MasonryInfiniteGridTemplate = MasonryInfiniteGridTemplate;
exports.MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
// MasonryInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridTemplate.argTypes),
// };
// MasonryInfiniteGridTemplate.parameters = {
//   preview: [
//     {
//       tab: "React",
//       template: convertReactTemplate(convertPath(RawMasonryInfiniteGridApp, "react-grid", "@egjs/react-grid")),
//       language: "tsx",
//     },
//   ],
// };
