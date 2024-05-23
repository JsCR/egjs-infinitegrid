"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var src_1 = require("../../../src");
function getItems(nextGroupKey, count) {
    var nextItems = [];
    var nextKey = nextGroupKey * count;
    for (var i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}
var Item = function (_a) {
    var num = _a.num;
    return <div className="item">
  <div className="thumbnail">
    <img src={"https://naver.github.io/egjs-infinitegrid/assets/image/" + ((num % 33) + 1) + ".jpg"} alt="egjs"/>
  </div>
  <div className="info">{"egjs " + num}</div>
    </div>;
};
function App() {
    var _a = React.useState(function () { return getItems(0, 10); }), items = _a[0], setItems = _a[1];
    return <src_1.MasonryInfiniteGrid className="container" gap={5} align={"justify"} onRequestAppend={function (e) {
            var nextGroupKey = (+e.groupKey || 0) + 1;
            setItems(__spreadArray(__spreadArray([], items), getItems(nextGroupKey, 10)));
        }} onRenderComplete={function (e) {
            console.log(e);
        }}>
    {items.map(function (item) { return <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key}/>; })}
  </src_1.MasonryInfiniteGrid>;
}
exports.default = App;
