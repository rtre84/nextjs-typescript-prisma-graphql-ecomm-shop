import gql from 'graphql-tag';
import { print as printSource } from 'graphql/language/printer';
import React from 'react';
import { graphql } from 'react-apollo';
import { GetOrderFields } from '../queries/GetOrderQuery';
export const AddDiscountToOrderAST = gql `
  mutation addDiscountCodeToOrder ($orderId: ID! $code: String!) {
    addDiscountCodeToOrder (orderId: $orderId code: $code) {
      ${GetOrderFields}
    }
  }
`;
const AddDiscountToOrderASTString = printSource(AddDiscountToOrderAST);
function isFunction(obj) {
    return typeof obj === 'function';
}
export const AddDiscountCodeToOrder = ({ children, redirect, addDiscountCodeToOrderMutation, submit, }) => (<form action={'/_gql/m'} method="post" onSubmit={e => {
    e.preventDefault();
    submit(addDiscountCodeToOrderMutation);
}}>
    <input type="hidden" name="query" value={AddDiscountToOrderASTString}/>
    <input type="hidden" name="redirect" value={redirect}/>
    {isFunction(children)
    ? children({ addDiscountCodeToOrderMutation })
    : children}
  </form>);
export const AddDiscountCodeToOrderMutation = graphql(AddDiscountToOrderAST, {
    props: props => ({
        addDiscountCodeToOrderMutation: (variables) => {
            return props.mutate({
                variables,
            });
        },
    }),
})(AddDiscountCodeToOrder);
export default AddDiscountCodeToOrderMutation;
//# sourceMappingURL=AddDiscountCodeToOrderMutation.jsx.map