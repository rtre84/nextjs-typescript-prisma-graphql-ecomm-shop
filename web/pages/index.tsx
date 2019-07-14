import Layout from '../components/Layout';
import ProductSection from '../components/ProductSection';
import withOrder, { WithOrderProps } from '../lib/withOrder';

export default withOrder((props: WithOrderProps) => (
  <Layout {...props}>
    <ProductSection orderId={props.orderId} url={props.url} />
  </Layout>
));

// export default withOrder(props => (
//   <Layout {...props}>
//     <ProductSection orderId={props.orderId} url={props.url} />
//   </Layout>
// ));
