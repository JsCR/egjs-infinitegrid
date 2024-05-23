"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreview = void 0;
var storybook_addon_preview_1 = require("storybook-addon-preview");
var utils_1 = require("./utils");
function getPreview(folderName, fileName, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.htmlCode, htmlCode = _c === void 0 ? require("!!raw-loader!./default.html").default : _c, _d = _b.cssCode, cssCode = _d === void 0 ? require("!!raw-loader!./default.css").default : _d, _e = _b.vanillaCode, vanillaCode = _e === void 0 ? require("!!raw-loader!../" + folderName + "/apps/Vanilla" + fileName + "App").default : _e;
    var reactCode = require("!!raw-loader!../../../react-infinitegrid/stories/" + folderName + "/apps/React" + fileName + "App").default;
    var ngxComponentCode = require("!!raw-loader!../../../ngx-infinitegrid/stories/" + folderName + "/apps/Ngx" + fileName + "App/app.component.ts").default;
    ngxComponentCode = ngxComponentCode.replace(/"(.+)\.css"/g, "\"./app.component.css\"");
    var ngxHTMLCode = require("!!raw-loader!../../../ngx-infinitegrid/stories/" + folderName + "/apps/Ngx" + fileName + "App/app.component.html").default;
    var ngxModuleCode = require("!!raw-loader!../../../ngx-infinitegrid/stories/apps/default/app.module.ts").default;
    var vueCode = require("!!raw-loader!../../../vue-infinitegrid/stories/" + folderName + "/apps/Vue" + fileName + "App.vue").default;
    var svelteCode = require("!!raw-loader!../../../svelte-infinitegrid/stories/" + folderName + "/apps/Svelte" + fileName + "App.svelte").default;
    return [
        {
            tab: "HTML",
            template: htmlCode,
            language: "html",
            codesandbox: storybook_addon_preview_1.DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
            copy: true,
        },
        {
            tab: "CSS",
            template: cssCode,
            language: "css",
        },
        {
            tab: "Vanilla",
            template: utils_1.convertVanillaTemplate(utils_1.convertPath(vanillaCode, "src", "@egjs/infinitegrid")),
            language: "tsx",
            codesandbox: storybook_addon_preview_1.DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
            copy: true,
        },
        {
            tab: "React",
            template: utils_1.convertReactTemplate(utils_1.convertPath(reactCode, "src", "@egjs/react-infinitegrid")),
            language: "tsx",
            codesandbox: storybook_addon_preview_1.DEFAULT_REACT_CODESANDBOX(["@egjs/react-infinitegrid"]),
            copy: true,
        },
        {
            tab: "Angular",
            template: utils_1.convertAngularHTMLTemplate(utils_1.convertPath(ngxHTMLCode, "src", "@egjs/ngx-infinitegrid")),
            language: "tsx",
            description: "app.component.html",
            codesandbox: storybook_addon_preview_1.DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
            copy: true,
        },
        {
            tab: "Angular",
            template: utils_1.convertAngularTemplate(utils_1.convertPath(ngxComponentCode, "src", "@egjs/ngx-infinitegrid")),
            language: "tsx",
            description: "app.component.ts",
            codesandbox: storybook_addon_preview_1.DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
            copy: true,
        },
        {
            tab: "Angular",
            template: utils_1.convertTemplate(utils_1.convertPath(ngxModuleCode, "src", "@egjs/ngx-infinitegrid")),
            language: "tsx",
            description: "app.module.ts",
            codesandbox: storybook_addon_preview_1.DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
            copy: true,
        },
        {
            tab: "Vue",
            template: utils_1.convertVueTemplate(utils_1.convertPath(vueCode, "src", "@egjs/vue-infinitegrid")),
            language: "html",
            codesandbox: storybook_addon_preview_1.DEFAULT_VUE_CODESANDBOX(["@egjs/vue-infinitegrid"]),
            copy: true,
        },
        {
            tab: "Svelte",
            template: utils_1.convertSvelteTemplate(utils_1.convertPath(svelteCode, "src", "@egjs/svelte-infinitegrid"), cssCode),
            language: "html",
            codesandbox: storybook_addon_preview_1.DEFAULT_SVELTE_CODESANDBOX(["@egjs/svelte-infinitegrid"]),
            copy: true,
        },
    ];
}
exports.getPreview = getPreview;
