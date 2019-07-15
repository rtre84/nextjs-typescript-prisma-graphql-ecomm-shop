"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("next/link");
var router_1 = require("next/router");
var react_1 = require("react");
var withOrder_1 = require("../lib/withOrder");
var GetOrderQuery_1 = require("../queries/GetOrderQuery");
var navItemsHeight = '3rem';
function getNumberOfItems(order) {
    return order.rows.reduce(function (sum, _a) {
        var quantity = _a.quantity;
        return sum + quantity;
    }, 0);
}
exports.default = (function (_a) {
    var orderId = _a.orderId, openCheckoutModal = _a.openCheckoutModal;
    return (`<react_1.Fragment>
    <header>
      <nav>
        <link_1.default href="/" prefetch>
          <a>Home</a>
        </link_1.default>{' '}
        <link_1.default href="/about" prefetch>
          <a>About</a>
        </link_1.default>{' '}
        <a href="/checkout" onClick={openCheckoutModal}>
          Checkout
          <GetOrderQuery_1.default {...{ orderId: orderId }}>
            {function (_a) {
        var order = _a.order;
        return order && <react_1.Fragment> ({getNumberOfItems(order)})</react_1.Fragment>;
    }}
          </GetOrderQuery_1.default>
        </a>
        <a href="?clearOrderId" onClick={function (e) {
        e.preventDefault();
        withOrder_1.saveOrderId(undefined, { isBrowser: true });
        router_1.default.reload(router_1.default.route);
    }}>
          Clear cart
        </a>
      </nav>
    </header>
    <div className="placeholder"/>
    <style jsx>{"\n      a {\n        display: inline-block;\n        padding: 0 1rem;\n        text-decoration: none;\n        background: rgba(255, 255, 255, 0.1);\n        color: white;\n        font-size: 1.2rem;\n        line-height: " + navItemsHeight + ";\n\n        transition: background 0.3s ease-out;\n      }\n      a:hover {\n        background: rgba(255, 255, 255, 0.3);\n      }\n      a:focus {\n        background: rgba(255, 255, 255, 0.4);\n      }\n      a:not(:last-child) {\n        margin-right: 1rem;\n      }\n      header {\n        position: fixed;\n        top: 0;\n        background: black;\n        width: 100%;\n        padding: 0 2rem;\n      }\n      .placeholder {\n        height: " + navItemsHeight + ";\n        visibility: hidden;\n      }\n    "}</style>
  </react_1.Fragment>`);
});
