import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { GetOrderProductFields } from '../queries/GetOrderQuery';
import { ProductCardFragment } from './ProductCard';
import ProductList from './ProductList';
function ProductSection(props) {
    const { productsData: { loading, error, products }, url, orderId, } = props;
    if (error) {
        return <div>Error loading Products</div>;
    }
    return (<section>
      {products && <ProductList {...{ products, url, orderId }}/>}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
      `}</style>
    </section>);
}
const productsQuery = gql `
  query products {
    products(orderBy: createdAt_DESC) {
      __typename
      id
      name
      price
      ...ProductCardFragment
      ${GetOrderProductFields}
    }
  }
  ${ProductCardFragment}
`;
export default graphql(productsQuery, {
    name: 'productsData',
})(ProductSection);
//# sourceMappingURL=ProductSection.jsx.map