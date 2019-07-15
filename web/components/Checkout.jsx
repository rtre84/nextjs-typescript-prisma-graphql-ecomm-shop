"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("../lib/utils");
var GetOrderQuery_1 = require("../queries/GetOrderQuery");
var CheckoutDiscounts_1 = require("./CheckoutDiscounts");
var OrderRowList_1 = require("./OrderRowList");
function Checkout(_a) {
    var orderId = _a.orderId, url = _a.url;
    return (<section className="Checkout">
      <h1>Your shopping cart</h1>

      <GetOrderQuery_1.default {...{ orderId: orderId }}>{function (_a) {
        var loading = _a.loading, order = _a.order;
        return (<react_1.Fragment>
            {loading && <div>Loading..</div>}
            {order && (<react_1.Fragment>
                <OrderRowList_1.default {...{ order: order, url: url }}/>
                <CheckoutDiscounts_1.default {...{ order: order, url: url }}/>
                <h2>Totals</h2>
                <div>Sub total: {utils_1.formatPrice(order.subTotal)}</div>
                <div>Discounts: {utils_1.formatPrice(order.discountsTotal)}</div>
                <div>Total: {utils_1.formatPrice(order.total)}</div>
              </react_1.Fragment>)}
          </react_1.Fragment>);
    }}</GetOrderQuery_1.default>
    </section>);
}
exports.default = Checkout;
