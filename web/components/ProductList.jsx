"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductCard_1 = require("./ProductCard");
function ProductList(props) {
    var products = props.products, url = props.url, orderId = props.orderId;
    return (<section className="ProductList" itemScope itemType="http://schema.org/ItemList">
      {products.map(function (product) {
        return <ProductCard_1.default {...{ key: product.id, product: product, orderId: orderId, url: url }}/>;
    })}

      <style jsx>{"\n        section {\n          display: flex;\n          flex-wrap: wrap;\n        }\n      "}</style>
    </section>);
}
exports.default = ProductList;
