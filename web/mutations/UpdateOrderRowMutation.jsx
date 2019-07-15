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
var AddProductToOrderMutation_1 = require("./AddProductToOrderMutation");
function orderReducerUpdateOrderRow(order, variables) {
    var newOrder = __assign({}, order, { rows: order.rows.reduce(function (rows, row) {
            if (row.id !== variables.id) {
                return rows.concat([row]);
            }
            if (variables.quantity < 1) {
                // row deleted!
                return rows;
            }
            return rows.concat([__assign({}, row, variables)]);
        }, []) });
    return AddProductToOrderMutation_1.calculateTotals(newOrder);
}
exports.orderReducerUpdateOrderRow = orderReducerUpdateOrderRow;
exports.updateOrderRowQuery = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation updateOrderRow ($id: ID! $quantity: Int) {\n    updateOrderRow (id: $id quantity: $quantity) {\n      order {\n        ", "\n      }\n    }\n  }\n"], ["\n  mutation updateOrderRow ($id: ID! $quantity: Int) {\n    updateOrderRow (id: $id quantity: $quantity) {\n      order {\n        ", "\n      }\n    }\n  }\n"])), GetOrderQuery_1.GetOrderFields);
var updateOrderRowQueryString = printer_1.print(exports.updateOrderRowQuery);
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.UpdateOrderRow = function (_a) {
    var children = _a.children, redirect = _a.redirect, variables = _a.variables, updateOrderRowMutation = _a.updateOrderRowMutation, style = _a.style;
    return (<form action={'/_gql/m'} style={style} method="post" onSubmit={function (e) {
        e.preventDefault();
        updateOrderRowMutation(variables);
    }}>
    <input type="hidden" name="query" value={updateOrderRowQueryString}/>
    <input type="hidden" name="redirect" value={redirect}/>
    <input type="hidden" name="variables" value={JSON.stringify(variables)}/>
    {isFunction(children)
        ? children({ updateOrderRowMutation: updateOrderRowMutation })
        : children}
  </form>);
};
exports.updateOrderRowGraphQL = react_apollo_1.graphql(exports.updateOrderRowQuery, {
    props: function (props) { return ({
        updateOrderRowMutation: function (variables) {
            var order = props.ownProps.order;
            return props.mutate({
                variables: variables,
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateOrderRow: {
                        __typename: 'OrderRow',
                        order: orderReducerUpdateOrderRow(order, variables),
                    },
                },
            });
        },
    }); },
});
exports.default = exports.updateOrderRowGraphQL(exports.UpdateOrderRow);
var templateObject_1;
