"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ScrollManager = void 0;
var core_1 = require("@cfcs/core");
var component_1 = require("@egjs/component");
var consts_1 = require("./consts");
var utils_1 = require("./utils");
var ScrollManager = /** @class */ (function (_super) {
    __extends(ScrollManager, _super);
    function ScrollManager(wrapper, options) {
        var _this = _super.call(this) || this;
        _this.wrapper = wrapper;
        _this.prevScrollPos = null;
        _this.scrollOffset = 0;
        _this.contentSize = 0;
        _this._isScrollIssue = consts_1.IS_IOS;
        _this._onCheck = function () {
            var prevScrollPos = _this.getScrollPos();
            var nextScrollPos = _this.getOrgScrollPos();
            _this.setScrollPos(nextScrollPos);
            if (prevScrollPos === null || (_this._isScrollIssue && nextScrollPos === 0) || prevScrollPos === nextScrollPos) {
                nextScrollPos && (_this._isScrollIssue = false);
                return;
            }
            _this._isScrollIssue = false;
            _this.trigger(new component_1.ComponentEvent("scroll", {
                direction: prevScrollPos < nextScrollPos ? "end" : "start",
                scrollPos: nextScrollPos,
                relativeScrollPos: _this.getRelativeScrollPos(),
            }));
        };
        _this.options = __assign({ container: false, containerTag: "div", horizontal: false, scrollContainer: null }, options);
        _this._init();
        return _this;
    }
    ScrollManager.prototype.getWrapper = function () {
        return this.wrapper;
    };
    ScrollManager.prototype.getContainer = function () {
        return this.container;
    };
    ScrollManager.prototype.getScrollContainer = function () {
        return this.scrollContainer;
    };
    ScrollManager.prototype.getScrollOffset = function () {
        return this.scrollOffset;
    };
    ScrollManager.prototype.getContentSize = function () {
        return this.contentSize;
    };
    ScrollManager.prototype.getRelativeScrollPos = function () {
        return (this.prevScrollPos || 0) - this.scrollOffset;
    };
    ScrollManager.prototype.getScrollPos = function () {
        return this.prevScrollPos;
    };
    ScrollManager.prototype.setScrollPos = function (pos) {
        this.prevScrollPos = pos;
    };
    ScrollManager.prototype.getOrgScrollPos = function () {
        var eventTarget = this.eventTarget;
        var horizontal = this.options.horizontal;
        var prop = "scroll" + (horizontal ? "Left" : "Top");
        if (utils_1.isWindow(eventTarget)) {
            return window[horizontal ? "pageXOffset" : "pageYOffset"]
                || document.documentElement[prop] || document.body[prop];
        }
        else {
            return eventTarget[prop];
        }
    };
    ScrollManager.prototype.setStatus = function (status) {
        this.contentSize = status.contentSize;
        this.scrollOffset = status.scrollOffset;
        this.prevScrollPos = status.prevScrollPos;
        this.scrollTo(this.prevScrollPos);
    };
    ScrollManager.prototype.getStatus = function () {
        return {
            contentSize: this.contentSize,
            scrollOffset: this.scrollOffset,
            prevScrollPos: this.prevScrollPos,
        };
    };
    ScrollManager.prototype.scrollTo = function (pos) {
        var eventTarget = this.eventTarget;
        var horizontal = this.options.horizontal;
        var _a = horizontal ? [pos, 0] : [0, pos], x = _a[0], y = _a[1];
        if (utils_1.isWindow(eventTarget)) {
            eventTarget.scroll(x, y);
        }
        else {
            eventTarget.scrollLeft = x;
            eventTarget.scrollTop = y;
        }
    };
    ScrollManager.prototype.scrollBy = function (pos) {
        if (!pos) {
            return;
        }
        var eventTarget = this.eventTarget;
        var horizontal = this.options.horizontal;
        var _a = horizontal ? [pos, 0] : [0, pos], x = _a[0], y = _a[1];
        this.prevScrollPos += pos;
        if (utils_1.isWindow(eventTarget)) {
            eventTarget.scrollBy(x, y);
        }
        else {
            eventTarget.scrollLeft += x;
            eventTarget.scrollTop += y;
        }
    };
    ScrollManager.prototype.resize = function () {
        var scrollContainer = this.scrollContainer;
        var horizontal = this.options.horizontal;
        var isBody = scrollContainer === document.body;
        var scrollContainerRect = isBody
            ? { top: 0, left: 0 }
            : scrollContainer.getBoundingClientRect();
        var containerRect = this.container.getBoundingClientRect();
        this.scrollOffset = (this.prevScrollPos || 0) + (horizontal
            ? containerRect.left - scrollContainerRect.left
            : containerRect.top - scrollContainerRect.top);
        if (isBody) {
            this.contentSize = horizontal ? window.innerWidth : window.innerHeight;
        }
        else {
            this.contentSize = horizontal ? scrollContainer.offsetWidth : scrollContainer.offsetHeight;
        }
    };
    ScrollManager.prototype.destroy = function () {
        var container = this.container;
        this.eventTarget.removeEventListener("scroll", this._onCheck);
        if (this._isCreateElement) {
            var scrollContainer = this.scrollContainer;
            var fragment_1 = document.createDocumentFragment();
            var childNodes = utils_1.toArray(container.childNodes);
            scrollContainer.removeChild(container);
            childNodes.forEach(function (childNode) {
                fragment_1.appendChild(childNode);
            });
            scrollContainer.appendChild(fragment_1);
        }
        else if (this.options.container) {
            container.style.cssText = this._orgCSSText;
        }
    };
    ScrollManager.prototype._init = function () {
        var _a;
        var _b = this.options, containerOption = _b.container, containerTag = _b.containerTag, horizontal = _b.horizontal, scrollContainerOption = _b.scrollContainer;
        var wrapper = this.wrapper;
        var scrollContainer = wrapper;
        var container = wrapper;
        var containerCSSText = "";
        if (!containerOption) {
            scrollContainer = core_1.findTarget(scrollContainerOption) || document.body;
            containerCSSText = container.style.cssText;
        }
        else {
            if (containerOption === true) {
                // Create Container
                container = document.createElement(containerTag);
                container.style.position = "relative";
                container.className = consts_1.CONTAINER_CLASS_NAME;
                var childNodes = utils_1.toArray(scrollContainer.childNodes);
                childNodes.forEach(function (childNode) {
                    container.appendChild(childNode);
                });
                scrollContainer.appendChild(container);
                this._isCreateElement = true;
            }
            else {
                // Find Container
                container = core_1.findTarget(containerOption);
            }
            containerCSSText = container.style.cssText;
            var style = scrollContainer.style;
            _a = horizontal ? ["scroll", "hidden"] : ["hidden", "scroll"], style.overflowX = _a[0], style.overflowY = _a[1];
            if (horizontal) {
                container.style.height = "100%";
            }
        }
        var eventTarget = scrollContainer === document.body ? window : scrollContainer;
        eventTarget.addEventListener("scroll", this._onCheck);
        this._orgCSSText = containerCSSText;
        this.container = container;
        this.scrollContainer = scrollContainer;
        this.eventTarget = eventTarget;
        this.resize();
        this.setScrollPos(this.getOrgScrollPos());
    };
    return ScrollManager;
}(component_1.default));
exports.ScrollManager = ScrollManager;
