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
var react_apollo_1 = require("react-apollo");
exports.GetOrderProductFields = "\n  __typename\n  id\n  name\n  price\n  brand { name }\n  thumbnail\n";
exports.GetOrderFields = "\n  __typename\n  id\n  subTotal\n  total\n  discountsTotal\n  discountCodes {\n    __typename\n    id\n    name\n    amount\n    type\n    code\n    description\n  }\n\n  rows {\n    __typename\n    id\n    quantity\n    total\n    product {\n      " + exports.GetOrderProductFields + "\n    }\n  }\n";
exports.GetOrderQueryAST = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query GetOrderQuery($id: ID!) {\n    order(id: $id) {\n      ", "\n    }\n  }\n"], ["\n  query GetOrderQuery($id: ID!) {\n    order(id: $id) {\n      ", "\n    }\n  }\n"])), exports.GetOrderFields);
exports.GetOrderComponent = function (_a) {
    var children = _a.children, data = _a.data;
    return children(__assign({}, data));
};
exports.default = react_apollo_1.graphql(exports.GetOrderQueryAST, {
    options: function (_a) {
        var orderId = _a.orderId;
        return ({
            variables: {
                id: orderId,
            },
        });
    },
})(exports.GetOrderComponent);
var templateObject_1;
