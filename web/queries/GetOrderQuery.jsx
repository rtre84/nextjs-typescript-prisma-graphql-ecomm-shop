import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
export const GetOrderProductFields = `
  __typename
  id
  name
  price
  brand { name }
  thumbnail
`;
export const GetOrderFields = `
  __typename
  id
  subTotal
  total
  discountsTotal
  discountCodes {
    __typename
    id
    name
    amount
    type
    code
    description
  }

  rows {
    __typename
    id
    quantity
    total
    product {
      ${GetOrderProductFields}
    }
  }
`;
export const GetOrderQueryAST = gql `
  query GetOrderQuery($id: ID!) {
    order(id: $id) {
      ${GetOrderFields}
    }
  }
`;
export const GetOrderComponent = ({ children, data }) => children({ ...data });
export default graphql(GetOrderQueryAST, {
    options: ({ orderId }) => ({
        variables: {
            id: orderId,
        },
    }),
})(GetOrderComponent);
//# sourceMappingURL=GetOrderQuery.jsx.map