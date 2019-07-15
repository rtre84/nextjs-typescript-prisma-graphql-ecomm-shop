"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var printer_1 = require("graphql/language/printer");
var react_1 = require("react");
var react_apollo_1 = require("react-apollo");
var GetOrderQuery_1 = require("../queries/GetOrderQuery");
exports.AddDiscountToOrderAST = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation addDiscountCodeToOrder ($orderId: ID! $code: String!) {\n    addDiscountCodeToOrder (orderId: $orderId code: $code) {\n      ", "\n    }\n  }\n"], ["\n  mutation addDiscountCodeToOrder ($orderId: ID! $code: String!) {\n    addDiscountCodeToOrder (orderId: $orderId code: $code) {\n      ", "\n    }\n  }\n"])), GetOrderQuery_1.GetOrderFields);
var AddDiscountToOrderASTString = printer_1.print(exports.AddDiscountToOrderAST);
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.AddDiscountCodeToOrder = function (_a) {
    var children = _a.children, redirect = _a.redirect, addDiscountCodeToOrderMutation = _a.addDiscountCodeToOrderMutation, submit = _a.submit;
    return (<form action={'/_gql/m'} method="post" onSubmit={function (e) {
        e.preventDefault();
        submit(addDiscountCodeToOrderMutation);
    }}>
    <input type="hidden" name="query" value={AddDiscountToOrderASTString}/>
    <input type="hidden" name="redirect" value={redirect}/>
    {isFunction(children)
        ? children({ addDiscountCodeToOrderMutation: addDiscountCodeToOrderMutation })
        : children}
  </form>);
};
exports.AddDiscountCodeToOrderMutation = react_apollo_1.graphql(exports.AddDiscountToOrderAST, {
    props: function (props) { return ({
        addDiscountCodeToOrderMutation: function (variables) {
            return props.mutate({
                variables: variables,
            });
        },
    }); },
})(exports.AddDiscountCodeToOrder);
exports.default = exports.AddDiscountCodeToOrderMutation;
var templateObject_1;
