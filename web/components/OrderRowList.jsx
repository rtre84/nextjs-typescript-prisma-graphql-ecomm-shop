"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
var UpdateOrderRowMutation_1 = require("../mutations/UpdateOrderRowMutation");
var OrderRowQuantityInput_1 = require("./OrderRowQuantityInput");
function OrderRowList(props) {
    var order = props.order, url = props.url;
    var rows = order.rows;
    var orderRowMutationProps = {
        order: order,
        redirect: url.asPath,
        style: {
            display: 'inline-block',
        },
    };
    return (<ul>
      {rows.map(function (_a) {
        var id = _a.id, quantity = _a.quantity, _b = _a.product, name = _b.name, price = _b.price, brand = _b.brand, thumbnail = _b.thumbnail;
        return (<article key={id} itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
            <div className="image">
              <img src={thumbnail} alt={name + " picture"}/>
            </div>
            <div className="description">
              <div>{name}</div>
              <div>By: {brand.name}</div>
            </div>

            <div className="total-price">{utils_1.formatPrice(price)}</div>
            <div className="quantity">
              <UpdateOrderRowMutation_1.default {...orderRowMutationProps} variables={{ id: id, quantity: quantity - 1 }}>
                <input type="submit" value="-" aria-label={"Remove 1 " + name + " from cart"}/>
              </UpdateOrderRowMutation_1.default>

              <UpdateOrderRowMutation_1.default {...orderRowMutationProps} variables={{ id: id, quantity: quantity }}>
                {function (_a) {
            var updateOrderRowMutation = _a.updateOrderRowMutation;
            return (<OrderRowQuantityInput_1.default quantity={quantity} onChange={function (newQuantity) {
                updateOrderRowMutation({
                    id: id,
                    quantity: newQuantity,
                });
            }}/>);
        }}
              </UpdateOrderRowMutation_1.default>
              <UpdateOrderRowMutation_1.default {...orderRowMutationProps} variables={{ id: id, quantity: quantity + 1 }}>
                <input type="submit" value="+" aria-label={"Add 1 " + name + " to cart"}/>
              </UpdateOrderRowMutation_1.default>
            </div>
            <div className="delete">
              <UpdateOrderRowMutation_1.default {...orderRowMutationProps} variables={{ id: id, quantity: 0 }}>
                <input type="submit" value="x" aria-label={"Delete " + name + " from cart"}/>
              </UpdateOrderRowMutation_1.default>
            </div>
          </article>);
    })}
      <style jsx>{"\n        article {\n          display: flex;\n          flex-wrap: wrap;\n        }\n        ul {\n          padding-left: 0;\n          padding-right: 0;\n          display: flex;\n          flex-direction: column;\n        }\n        article {\n          display: flex;\n          justify-content: space-between;\n        }\n        article > div {\n          flex: 1;\n          padding: 1rem;\n        }\n        .image {\n          max-width: 10%;\n        }\n        img {\n          max-width: 100%;\n        }\n\n        input[type='submit'] {\n          background: navy;\n          color: white;\n          border: none;\n          padding: 0.2rem;\n          width: 2rem;\n        }\n      "}</style>
    </ul>);
}
exports.default = OrderRowList;
