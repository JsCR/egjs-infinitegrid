"use strict";
exports.__esModule = true;
exports.MasonryInfiniteGridTemplate = void 0;
var SvelteMasonryInfiniteGridApp_svelte_1 = require("./apps/SvelteMasonryInfiniteGridApp.svelte");
// import RawMasonryInfiniteGridApp from "!!raw-loader!./apps/SvelteMasonryInfiniteGridApp.svelte";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertSvelteTemplate, makeArgs } from "../../../../stories/utils";
require("../../../../stories/templates/default.css");
var MasonryInfiniteGridTemplate = function (props) { return ({
    Component: SvelteMasonryInfiniteGridApp_svelte_1["default"],
    props: props,
}); };
exports.MasonryInfiniteGridTemplate = MasonryInfiniteGridTemplate;
exports.MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
// MasonryInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridTemplate.argTypes),
// };
// MasonryInfiniteGridTemplate.parameters = {
//   preview: [
//     {
//       tab: "Svelte",
//       template: convertSvelteTemplate(convertPath(RawMasonryInfiniteGridApp, "src", "@egjs/svelte-grid")),
//       language: "html",
//     },
//   ],
// };
