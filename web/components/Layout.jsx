"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var head_1 = require("next/head");
var router_1 = require("next/router");
var react_1 = require("react");
var react_modal_1 = require("react-modal");
var normalize_css_1 = require("../lib/normalize-css");
var Checkout_1 = require("./Checkout");
var Header_1 = require("./Header");
var isBrowser = !!process.browser;
// const isBrowser = !!process.browser;
if (isBrowser) {
    react_modal_1.default.setAppElement('#__next');
}
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openCheckoutModal = function (e) {
            e.preventDefault();
            router_1.default.push(_this.props.url.pathname + '?checkout', '/checkout');
        };
        return _this;
    }
    Layout.prototype.render = function () {
        var _a = this.props, children = _a.children, url = _a.url, title = _a.title, orderId = _a.orderId;
        return (`
      <react_1.Fragment>
        <head_1.default>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta charSet="utf-8"/>
          <title>{title && title + " | "}KATTCORP Webshop</title>
        </head_1.default>
        <style jsx global>{"\n          " + normalize_css_1.default + "\n          * {\n            box-sizing: border-box;\n          }\n          body {\n            background: #e5e5e5;\n            font: 10px;\n            color: #000;\n            font-family: 'Roboto', sans-serif;\n          }\n          input[type='submit'],\n          button {\n            cursor: pointer;\n          }\n        "}</style>
        <Header_1.default {...{ orderId: orderId, openCheckoutModal: this.openCheckoutModal }}/>
        <main>{children}</main>
        <react_modal_1.default isOpen={this.isCheckoutOpen()} onRequestClose={router_1.default.back}>
          <Checkout_1.default orderId={this.props.orderId} url={url}/>
        </react_modal_1.default>
        <style jsx>{"\n          main {\n            padding: 2rem;\n          }\n        "}</style>
      </react_1.Fragment>
        `);
    };
    Layout.prototype.isCheckoutOpen = function () {
        return typeof this.props.url.query.checkout === 'string';
    };
    return Layout;
}(react_1.Component));
exports.default = Layout;
