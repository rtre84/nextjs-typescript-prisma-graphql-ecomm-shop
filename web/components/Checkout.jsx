import { Fragment } from 'react';
import { formatPrice } from '../lib/utils';
import GetOrderQuery from '../queries/GetOrderQuery';
import CheckoutDiscounts from './CheckoutDiscounts';
import OrderRowList from './OrderRowList';
function Checkout({ orderId, url }) {
    return (<section className="Checkout">
      <h1>Your shopping cart</h1>

      <GetOrderQuery {...{ orderId }}>{({ loading, order }) => (<Fragment>
            {loading && <div>Loading..</div>}
            {order && (<Fragment>
                <OrderRowList {...{ order, url }}/>
                <CheckoutDiscounts {...{ order, url }}/>
                <h2>Totals</h2>
                <div>Sub total: {formatPrice(order.subTotal)}</div>
                <div>Discounts: {formatPrice(order.discountsTotal)}</div>
                <div>Total: {formatPrice(order.total)}</div>
              </Fragment>)}
          </Fragment>)}</GetOrderQuery>
    </section>);
}
export default Checkout;
//# sourceMappingURL=Checkout.jsx.map