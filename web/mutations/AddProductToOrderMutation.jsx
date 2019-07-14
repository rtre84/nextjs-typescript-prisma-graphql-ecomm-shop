import gql from 'graphql-tag';
import { print as printSource } from 'graphql/language/printer';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { GetOrderFields, GetOrderQueryAST } from '../queries/GetOrderQuery';
export function calculateTotals(order) {
    const rows = order.rows.map(row => ({
        ...row,
        subTotal: row.quantity * row.product.price,
    }));
    const subTotal = rows.reduce((sum, row) => sum + row.subTotal, 0);
    const discountsTotal = order.discountCodes &&
        order.discountCodes.reduce((sum, { type, amount }) => {
            let ret = sum;
            if (type === 'Percentage') {
                ret += subTotal * (amount / 100);
            }
            return ret;
        }, 0);
    const total = Math.max(subTotal - discountsTotal, 0);
    return {
        ...order,
        rows,
        subTotal,
        total,
        discountsTotal,
    };
}
function isFunction(obj) {
    return typeof obj === 'function';
}
export function addProductToOrderReducer(order, product) {
    const rows = [...order.rows];
    const index = order.rows.findIndex(row => row.product.id === product.id);
    if (index > -1) {
        const row = rows[index];
        const quantity = row.quantity + 1;
        rows[index] = {
            ...row,
            quantity,
        };
    }
    else {
        rows.push({
            __typename: 'OrderRow',
            id: new Date().toJSON(),
            product,
            quantity: 1,
            total: product.price,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON(),
            order,
        });
    }
    const newOrder = {
        ...order,
        rows,
    };
    return calculateTotals(newOrder);
}
export const AddProductToOrder = ({ addProductToOrderMutation, children, orderId, product, productId, redirect, }) => (<form action={'/_gql/m'} method="post" onSubmit={e => {
    e.preventDefault();
    addProductToOrderMutation(product);
}}>
    <input type="hidden" name="redirect" value={redirect}/>
    <input type="hidden" name="query" value={AddProductToOrderASTString}/>
    <input type="hidden" name="variables" value={JSON.stringify({ orderId, productId })}/>
    {isFunction(children)
    ? children({ addProductToOrderMutation })
    : children}
  </form>);
export const AddProductToOrderAST = gql `
  mutation addProductToOrder ($orderId: String! $productId: String! $quantity: Int) {
    addProductToOrder (orderId: $orderId productId: $productId quantity: $quantity) {
      order {
        ${GetOrderFields}
      }
    }
  }
`;
const AddProductToOrderASTString = printSource(AddProductToOrderAST);
export const AddProductToOrderMutation = compose(graphql(GetOrderQueryAST, {
    name: 'orderData',
    options: ({ orderId }) => ({
        variables: {
            id: orderId,
        },
    }),
}), graphql(AddProductToOrderAST, {
    name: 'addProductToOrder',
    props: (props) => ({
        addProductToOrderMutation: (product) => {
            const { order } = props.ownProps.orderData;
            const variables = {
                orderId: order.id,
                productId: product.id,
            };
            return props.addProductToOrder({
                variables,
                optimisticResponse: () => {
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
    }),
}))(AddProductToOrder);
export default AddProductToOrderMutation;
//# sourceMappingURL=AddProductToOrderMutation.jsx.map