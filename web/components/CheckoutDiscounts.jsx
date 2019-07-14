import { Component } from 'react';
import { AddDiscountCodeToOrderMutation } from '../mutations/AddDiscountCodeToOrderMutation';
var SubmitState;
(function (SubmitState) {
    SubmitState[SubmitState["INIT"] = 0] = "INIT";
    SubmitState[SubmitState["LOADING"] = 1] = "LOADING";
})(SubmitState || (SubmitState = {}));
class CheckoutDiscounts extends Component {
    constructor(props) {
        super(props);
        this.handleSuccess = () => {
            this.setState(() => ({
                code: '',
                submitState: SubmitState.INIT,
            }));
        };
        this.handleError = e => {
            alert('Invalid code!');
            this.setState(() => ({
                submitState: SubmitState.INIT,
            }));
        };
        this.state = {
            submitState: SubmitState.INIT,
            code: '',
        };
    }
    render() {
        const { order, url } = this.props;
        const { code, submitState } = this.state;
        return (<div className="CheckoutDiscounts">
        <h2>Discount codes</h2>
        {order.discountCodes.length ? (<ul className="CheckoutDiscountsList">
            {order.discountCodes.map(({ id, name, description }) => (<li key={id}>
                {name}: {description}
              </li>))}
          </ul>) : ('No added discounts')}

        <h3>Add discount</h3>
        <AddDiscountCodeToOrderMutation submit={submit => {
            this.setState(() => ({
                submitState: SubmitState.LOADING,
            }));
            submit({
                orderId: order.id,
                code,
            })
                .then(this.handleSuccess)
                .catch(this.handleError);
        }} redirect={url.asPath}>
          <input name="variables:orderId:type" type="hidden" value="String"/>
          <input name="variables:orderId:value" type="hidden" value={order.id}/>
          <input name="variables:code:type" type="hidden" value="String"/>
          <input name="variables:code:value" type="text" value={this.state.code} onChange={e => this.setState({
            code: e.target.value,
        })} disabled={submitState === SubmitState.LOADING}/>
          <input type="submit" value={submitState === SubmitState.LOADING ? 'Submitting' : 'Submit'}/>
        </AddDiscountCodeToOrderMutation>
      </div>);
    }
}
export default CheckoutDiscounts;
//# sourceMappingURL=CheckoutDiscounts.jsx.map