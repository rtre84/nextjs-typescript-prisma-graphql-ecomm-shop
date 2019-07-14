import { Component, Fragment } from 'react';
export default class OrderRowQuantityInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = (e) => {
            const { value } = e.target;
            this.setState({ value });
            const newQuantity = parseInt(value, 10);
            if (isNaN(newQuantity) || newQuantity < 1) {
                return;
            }
            this.props.onChange(newQuantity);
        };
        this.state = { value: props.quantity + '' };
    }
    componentWillReceiveProps({ quantity }) {
        if (this.props.quantity !== quantity) {
            this.setState({
                value: quantity + '',
            });
        }
    }
    render() {
        const { value } = this.state;
        return (<Fragment>
        <input name="variables:quantity:type" type="hidden" value="Int"/>
        <input name="variables:quantity:value" type="number" min="1" step="1" value={value} onChange={this.handleChange}/>
        <style jsx>{`
          input[type='number'] {
            width: 2.5rem;
            text-align: center;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
              /* display: none; <- Crashes Chrome on hover */
              -webkit-appearance: none;
              margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
          }
        `}</style>
      </Fragment>);
    }
}
//# sourceMappingURL=OrderRowQuantityInput.jsx.map