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
var OrderRowQuantityInput = /** @class */ (function (_super) {
    __extends(OrderRowQuantityInput, _super);
    function OrderRowQuantityInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (e) {
            var value = e.target.value;
            _this.setState({ value: value });
            var newQuantity = parseInt(value, 10);
            if (isNaN(newQuantity) || newQuantity < 1) {
                return;
            }
            _this.props.onChange(newQuantity);
        };
        _this.state = { value: props.quantity + '' };
        return _this;
    }
    OrderRowQuantityInput.prototype.componentWillReceiveProps = function (_a) {
        var quantity = _a.quantity;
        if (this.props.quantity !== quantity) {
            this.setState({
                value: quantity + '',
            });
        }
    };
    OrderRowQuantityInput.prototype.render = function () {
        var value = this.state.value;
        return (<react_1.Fragment>
        <input name="variables:quantity:type" type="hidden" value="Int"/>
        <input name="variables:quantity:value" type="number" min="1" step="1" value={value} onChange={this.handleChange}/>
        <style jsx>{"\n          input[type='number'] {\n            width: 2.5rem;\n            text-align: center;\n          }\n          input::-webkit-outer-spin-button,\n          input::-webkit-inner-spin-button {\n              /* display: none; <- Crashes Chrome on hover */\n              -webkit-appearance: none;\n              margin: 0; /* <-- Apparently some margin are still there even though it's hidden */\n          }\n        "}</style>
      </react_1.Fragment>);
    };
    return OrderRowQuantityInput;
}(react_1.Component));
exports.default = OrderRowQuantityInput;
