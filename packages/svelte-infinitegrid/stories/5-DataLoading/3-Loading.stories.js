"use strict";
exports.__esModule = true;
exports.LoadingTemplate = void 0;
var SvelteLoadingApp_svelte_1 = require("./apps/SvelteLoadingApp.svelte");
require("../../../../stories/templates/default.css");
var LoadingTemplate = function (props) { return ({
    Component: SvelteLoadingApp_svelte_1["default"],
    props: props,
}); };
exports.LoadingTemplate = LoadingTemplate;
exports.LoadingTemplate.storyName = "Loading";
