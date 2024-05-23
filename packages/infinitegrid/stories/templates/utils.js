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
exports.convertTemplate = exports.convertReactTemplate = exports.convertAngularTemplate = exports.convertAngularHTMLTemplate = exports.convertSvelteTemplate = exports.convertVueTemplate = exports.convertVanillaTemplate = exports.convertPath = exports.makeArgs = exports.makeArgType = void 0;
// export function makeLink(name: string, property: string) {
//   return `<a href="https://naver.github.io/egjs-infinitegrid/release/latest/doc/Grid.${name}.html#${property}" target="_blank">See API</a>`;
// }
function makeArgType(param) {
    return {
        control: __assign({ type: param.type }, (param.control || {})),
        table: __assign({ defaultValue: { summary: param.defaultValue }, category: param.category }, (param.table || {})),
        description: param.description,
    };
}
exports.makeArgType = makeArgType;
function makeArgs(argTypes) {
    return Object.keys(argTypes).reduce(function (prev, cur) {
        prev[cur] = argTypes[cur].table.defaultValue.summary;
        return prev;
    }, {});
}
exports.makeArgs = makeArgs;
function convertPath(text, findName, moduleName) {
    if (moduleName === void 0) { moduleName = findName; }
    var nextText = text.replace(new RegExp("\"[a-zA-Z0-9./_-]*" + findName + "[a-zA-Z0-9./_-]*\"", "g"), "\"" + moduleName + "\"");
    nextText = nextText.replace(new RegExp("'[a-zA-Z0-9./_-]*" + findName + "[a-zA-Z0-9./_-]*'", "g"), "'" + moduleName + "'");
    return nextText;
}
exports.convertPath = convertPath;
function convertVanillaTemplate(text) {
    var previewText = text.replace(/\n^export[^\n]*$/mg, "");
    previewText = previewText.replace(/\s*return ig;\n\}$/mg, "\n");
    previewText = previewText.replace(/^[ ]{2}/mg, "");
    return convertTemplate(previewText);
}
exports.convertVanillaTemplate = convertVanillaTemplate;
function convertVueTemplate(text) {
    var previewText = text.replace("props:", "data:");
    previewText = previewText.replace(/\[(\s*"([^"]+)",\s*)+\]/g, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0].replace("[", "() => ({").replace("]", "})").replace(/"([^"]+)"/g, function (_, name) {
            return name + ": " + name;
        });
    });
    return convertTemplate(previewText, /([a-zA-Z_0-9]+):\s([a-zA-Z_0-9]+),/g, true);
}
exports.convertVueTemplate = convertVueTemplate;
function convertSvelteTemplate(text, cssCode) {
    if (cssCode === void 0) { cssCode = ""; }
    var previewText = text.replace(/export let ([a-zA-Z_0-9]+);/g, "const $1 = $1;");
    if (cssCode) {
        previewText = previewText.replace("</script>", "</script>\n<style>\n" + cssCode + "\n</style>");
    }
    return convertTemplate(previewText, /([a-zA-Z_0-9]+) = ([a-zA-Z_0-9]+);/g, true);
}
exports.convertSvelteTemplate = convertSvelteTemplate;
function convertAngularHTMLTemplate(text) {
    var previewText = text.replace(/\n\s+\*ngFor="let item of \[0\]; trackBy: trackBy;"/g, "");
    return convertTemplate(previewText);
}
exports.convertAngularHTMLTemplate = convertAngularHTMLTemplate;
function convertAngularTemplate(text) {
    var previewText = text.replace(/\n\s+@Input\(\) key[^;]+;[^;]+;/g, "");
    previewText = previewText.replace(/@Input\(\) ([a-zA-Z_0-9]+): any;/g, "$1 = $1;");
    return convertTemplate(previewText, /([a-zA-Z_0-9]+) = ([a-zA-Z_0-9]+);/g, true);
}
exports.convertAngularTemplate = convertAngularTemplate;
function convertReactTemplate(text) {
    var previewText = text.replace(/\n\s+key=\{Math.random\(\)\}/, "");
    return convertTemplate(previewText);
}
exports.convertReactTemplate = convertReactTemplate;
function convertTemplate(text, regex, includePrefix) {
    if (regex === void 0) { regex = /props\.([a-zA-Z0-9_]+)/g; }
    if (includePrefix === void 0) { includePrefix = false; }
    var previewText = text.replace(/App\([^)]*\)/g, "App()");
    var result;
    var index = 0;
    var strings = [];
    var values = [];
    // eslint-disable-next-line no-cond-assign
    while (result = regex.exec(previewText)) {
        var nextIndex = result.index + (includePrefix ? result[0].lastIndexOf(result[2]) : 0);
        strings.push(previewText.slice(index, nextIndex));
        values.push(result[1]);
        index = nextIndex + (includePrefix ? result[2].length : result[0].length);
    }
    strings.push(previewText.slice(index));
    return [strings, values];
}
exports.convertTemplate = convertTemplate;
