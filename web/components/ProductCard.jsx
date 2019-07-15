"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var utils_1 = require("../lib/utils");
var AddProductToOrderMutation_1 = require("../mutations/AddProductToOrderMutation");
exports.ProductCardFragment = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment ProductCardFragment on Product {\n    name\n    price\n    thumbnail\n  }\n"], ["\n  fragment ProductCardFragment on Product {\n    name\n    price\n    thumbnail\n  }\n"])));
exports.default = (function (_a) {
    var product = _a.product, orderId = _a.orderId, url = _a.url;
    return (<article className="ProductCard" itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
    <div className="image">
      <img src={product.thumbnail} alt={product.name} itemProp="image"/>
    </div>
    <div itemProp="name">{product.name}</div>
    <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
      <span itemProp="price">{utils_1.formatPrice(product.price)}</span>
    </div>
    <AddProductToOrderMutation_1.default orderId={orderId} productId={product.id} product={product} redirect={url.asPath}>
      <button type="submit">Add to order</button>
    </AddProductToOrderMutation_1.default>

    <style jsx>{"\n      article {\n        padding: 2%;\n        flex-grow: 1;\n        flex-basis: 20%;\n        background: white;\n      }\n      @media (max-width: 920px) {\n        article {\n          flex: 1 21%;\n        }\n      }\n      section {\n      }\n      img {\n        max-width: 100%;\n      }\n      .info {\n        margin-top: auto;\n      }\n      button {\n        display: block;\n        width: 100%\n        padding: 5px;\n      }\n    "}</style>
  </article>);
});
var templateObject_1;
