"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var graphql_tag_1 = require("graphql-tag");
var printer_1 = require("graphql/language/printer");
var react_1 = require("react");
var react_apollo_1 = require("react-apollo");
var GetOrderQuery_1 = require("../queries/GetOrderQuery");
function calculateTotals(order) {
    var rows = order.rows.map(function (row) { return (__assign({}, row, { subTotal: row.quantity * row.product.price })); });
    var subTotal = rows.reduce(function (sum, row) { return sum + row.subTotal; }, 0);
    var discountsTotal = order.discountCodes &&
        order.discountCodes.reduce(function (sum, _a) {
            var type = _a.type, amount = _a.amount;
            var ret = sum;
            if (type === 'Percentage') {
                ret += subTotal * (amount / 100);
            }
            return ret;
        }, 0);
    var total = Math.max(subTotal - discountsTotal, 0);
    return __assign({}, order, { rows: rows,
        subTotal: subTotal,
        total: total,
        discountsTotal: discountsTotal });
}
exports.calculateTotals = calculateTotals;
function isFunction(obj) {
    return typeof obj === 'function';
}
function addProductToOrderReducer(order, product) {
    var rows = order.rows.slice();
    var index = order.rows.findIndex(function (row) { return row.product.id === product.id; });
    if (index > -1) {
        var row = rows[index];
        var quantity = row.quantity + 1;
        rows[index] = __assign({}, row, { quantity: quantity });
    }
    else {
        rows.push({
            __typename: 'OrderRow',
            id: new Date().toJSON(),
            product: product,
            quantity: 1,
            total: product.price,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON(),
            order: order,
        });
    }
    var newOrder = __assign({}, order, { rows: rows });
    return calculateTotals(newOrder);
}
exports.addProductToOrderReducer = addProductToOrderReducer;
exports.AddProductToOrder = function (_a) {
    var addProductToOrderMutation = _a.addProductToOrderMutation, children = _a.children, orderId = _a.orderId, product = _a.product, productId = _a.productId, redirect = _a.redirect;
    return (<form action={'/_gql/m'} method="post" onSubmit={function (e) {
        e.preventDefault();
        addProductToOrderMutation(product);
    }}>
    <input type="hidden" name="redirect" value={redirect}/>
    <input type="hidden" name="query" value={AddProductToOrderASTString}/>
    <input type="hidden" name="variables" value={JSON.stringify({ orderId: orderId, productId: productId })}/>
    {isFunction(children)
        ? children({ addProductToOrderMutation: addProductToOrderMutation })
        : children}
  </form>);
};
exports.AddProductToOrderAST = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation addProductToOrder ($orderId: String! $productId: String! $quantity: Int) {\n    addProductToOrder (orderId: $orderId productId: $productId quantity: $quantity) {\n      order {\n        ", "\n      }\n    }\n  }\n"], ["\n  mutation addProductToOrder ($orderId: String! $productId: String! $quantity: Int) {\n    addProductToOrder (orderId: $orderId productId: $productId quantity: $quantity) {\n      order {\n        ", "\n      }\n    }\n  }\n"])), GetOrderQuery_1.GetOrderFields);
var AddProductToOrderASTString = printer_1.print(exports.AddProductToOrderAST);
exports.AddProductToOrderMutation = react_apollo_1.compose(react_apollo_1.graphql(GetOrderQuery_1.GetOrderQueryAST, {
    name: 'orderData',
    options: function (_a) {
        var orderId = _a.orderId;
        return ({
            variables: {
                id: orderId,
            },
        });
    },
}), react_apollo_1.graphql(exports.AddProductToOrderAST, {
    name: 'addProductToOrder',
    props: function (props) { return ({
        addProductToOrderMutation: function (product) {
            var order = props.ownProps.orderData.order;
            var variables = {
                orderId: order.id,
                productId: product.id,
            };
            return props.addProductToOrder({
                variables: variables,
                optimisticResponse: function () {
                    return {
                        __typename: 'Mutation',
                        addProductToOrder: {
                            __typename: 'OrderRow',
                            order: addProductToOrderReducer(order, product),
                        },
                    };
                },
            });
        },
    }); },
}))(exports.AddProductToOrder);
exports.default = exports.AddProductToOrderMutation;
var templateObject_1;
