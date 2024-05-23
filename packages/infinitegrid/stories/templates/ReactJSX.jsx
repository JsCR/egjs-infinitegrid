"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
var React = require("react");
function getApp(appFunc, containerFunc) {
    function App(props) {
        var gridRef = React.useRef(null);
        React.useEffect(function () {
            gridRef.current = appFunc(props);
            return function () {
                gridRef.current.destroy();
            };
        }, []);
        return containerFunc();
    }
    return function render(props) {
        return <App key={Math.random()} {...props}/>;
    }.bind({});
}
exports.getApp = getApp;
