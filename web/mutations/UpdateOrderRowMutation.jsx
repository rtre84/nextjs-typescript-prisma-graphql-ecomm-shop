import gql from 'graphql-tag';
import { print as printSource } from 'graphql/language/printer';
import React from 'react';
import { graphql } from 'react-apollo';
import { GetOrderFields } from '../queries/GetOrderQuery';
import { calculateTotals } from './AddProductToOrderMutation';
export function orderReducerUpdateOrderRow(order, variables) {
    const newOrder = {
        ...order,
        rows: order.rows.reduce((rows, row) => {
            if (row.id !== variables.id) {
                return [...rows, row];
            }
            if (variables.quantity < 1) {
                // row deleted!
                return rows;
            }
            return [...rows, { ...row, ...variables }];
        }, []),
    };
    return calculateTotals(newOrder);
}
export const updateOrderRowQuery = gql `
  mutation updateOrderRow ($id: ID! $quantity: Int) {
    updateOrderRow (id: $id quantity: $quantity) {
      order {
        ${GetOrderFields}
      }
    }
  }
`;
const updateOrderRowQueryString = printSource(updateOrderRowQuery);
function isFunction(obj) {
    return typeof obj === 'function';
}
export const UpdateOrderRow = ({ children, redirect, variables, updateOrderRowMutation, style, }) => (<form action={'/_gql/m'} style={style} method="post" onSubmit={e => {
    e.preventDefault();
    updateOrderRowMutation(variables);
}}>
    <input type="hidden" name="query" value={updateOrderRowQueryString}/>
    <input type="hidden" name="redirect" value={redirect}/>
    <input type="hidden" name="variables" value={JSON.stringify(variables)}/>
    {isFunction(children)
    ? children({ updateOrderRowMutation })
    : children}
  </form>);
export const updateOrderRowGraphQL = graphql(updateOrderRowQuery, {
    props: props => ({
        updateOrderRowMutation: (variables) => {
            const { order } = props.ownProps;
            return props.mutate({
                variables,
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateOrderRow: {
                        __typename: 'OrderRow',
                        order: orderReducerUpdateOrderRow(order, variables),
                    },
                },
            });
        },
    }),
});
export default updateOrderRowGraphQL(UpdateOrderRow);
//# sourceMappingURL=UpdateOrderRowMutation.jsx.map