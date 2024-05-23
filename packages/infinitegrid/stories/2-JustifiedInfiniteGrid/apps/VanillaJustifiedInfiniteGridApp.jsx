"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../../src");
function App() {
    function getItems(nextGroupKey, count) {
        var nextItems = [];
        for (var i = 0; i < count; ++i) {
            var num = nextGroupKey * count + i;
            nextItems.push("<div class=\"item\">\n    <div class=\"thumbnail\">\n        <img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/" + ((num % 33) + 1) + ".jpg\" alt=\"egjs\" data-grid-maintained-target=\"true\"/>\n    </div>\n    <div class=\"info\">egjs " + num + "</div>\n</div>");
        }
        return nextItems;
    }
    var ig = new src_1.JustifiedInfiniteGrid(".container", {
        gap: 5,
    });
    ig.on("requestAppend", function (e) {
        var nextGroupKey = +(e.groupKey || 0) + 1;
        ig.append(getItems(nextGroupKey, 10), nextGroupKey);
    });
    ig.renderItems();
    return ig;
}
exports.default = App;
