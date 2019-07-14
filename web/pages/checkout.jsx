import Checkout from '../components/Checkout';
import Layout from '../components/Layout';
import withOrder from '../lib/withOrder';
export default withOrder(props => (<Layout {...props} title="Checkout">
    <Checkout orderId={props.orderId} url={props.url}/>
  </Layout>));
//# sourceMappingURL=checkout.jsx.map