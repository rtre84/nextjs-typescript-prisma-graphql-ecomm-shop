"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AddDiscountCodeToOrderMutation_1 = require("../mutations/AddDiscountCodeToOrderMutation");
var SubmitState;
(function (SubmitState) {
    SubmitState[SubmitState["INIT"] = 0] = "INIT";
    SubmitState[SubmitState["LOADING"] = 1] = "LOADING";
})(SubmitState || (SubmitState = {}));
var CheckoutDiscounts = /** @class */ (function (_super) {
    __extends(CheckoutDiscounts, _super);
    function CheckoutDiscounts(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSuccess = function () {
            _this.setState(function () { return ({
                code: '',
                submitState: SubmitState.INIT,
            }); });
        };
        _this.handleError = function (e) {
            alert('Invalid code!');
            _this.setState(function () { return ({
                submitState: SubmitState.INIT,
            }); });
        };
        _this.state = {
            submitState: SubmitState.INIT,
            code: '',
        };
        return _this;
    }
    CheckoutDiscounts.prototype.render = function () {
        var _this = this;
        var _a = this.props, order = _a.order, url = _a.url;
        var _b = this.state, code = _b.code, submitState = _b.submitState;
        return (<div className="CheckoutDiscounts">
        <h2>Discount codes</h2>
        {order.discountCodes.length ? (<ul className="CheckoutDiscountsList">
            {order.discountCodes.map(function (_a) {
            var id = _a.id, name = _a.name, description = _a.description;
            return (<li key={id}>
                {name}: {description}
              </li>);
        })}
          </ul>) : ('No added discounts')}

        <h3>Add discount</h3>
        <AddDiscountCodeToOrderMutation_1.AddDiscountCodeToOrderMutation submit={function (submit) {
            _this.setState(function () { return ({
                submitState: SubmitState.LOADING,
            }); });
            submit({
                orderId: order.id,
                code: code,
            })
                .then(_this.handleSuccess)
                .catch(_this.handleError);
        }} redirect={url.asPath}>
          <input name="variables:orderId:type" type="hidden" value="String"/>
          <input name="variables:orderId:value" type="hidden" value={order.id}/>
          <input name="variables:code:type" type="hidden" value="String"/>
          <input name="variables:code:value" type="text" value={this.state.code} onChange={function (e) {
            return _this.setState({
                code: e.target.value,
            });
        }} disabled={submitState === SubmitState.LOADING}/>
          <input type="submit" value={submitState === SubmitState.LOADING ? 'Submitting' : 'Submit'}/>
        </AddDiscountCodeToOrderMutation_1.AddDiscountCodeToOrderMutation>
      </div>);
    };
    return CheckoutDiscounts;
}(react_1.Component));
exports.default = CheckoutDiscounts;
