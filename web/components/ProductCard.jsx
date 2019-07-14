import gql from 'graphql-tag';
import { formatPrice } from '../lib/utils';
import AddProductToOrderMutation from '../mutations/AddProductToOrderMutation';
export const ProductCardFragment = gql `
  fragment ProductCardFragment on Product {
    name
    price
    thumbnail
  }
`;
export default ({ product, orderId, url }) => (<article className="ProductCard" itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
    <div className="image">
      <img src={product.thumbnail} alt={product.name} itemProp="image"/>
    </div>
    <div itemProp="name">{product.name}</div>
    <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
      <span itemProp="price">{formatPrice(product.price)}</span>
    </div>
    <AddProductToOrderMutation orderId={orderId} productId={product.id} product={product} redirect={url.asPath}>
      <button type="submit">Add to order</button>
    </AddProductToOrderMutation>

    <style jsx>{`
      article {
        padding: 2%;
        flex-grow: 1;
        flex-basis: 20%;
        background: white;
      }
      @media (max-width: 920px) {
        article {
          flex: 1 21%;
        }
      }
      section {
      }
      img {
        max-width: 100%;
      }
      .info {
        margin-top: auto;
      }
      button {
        display: block;
        width: 100%
        padding: 5px;
      }
    `}</style>
  </article>);
//# sourceMappingURL=ProductCard.jsx.map