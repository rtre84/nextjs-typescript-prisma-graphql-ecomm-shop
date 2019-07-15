"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var react_apollo_1 = require("react-apollo");
var GetOrderQuery_1 = require("../queries/GetOrderQuery");
var ProductCard_1 = require("./ProductCard");
var ProductList_1 = require("./ProductList");
function ProductSection(props) {
    var _a = props.productsData, loading = _a.loading, error = _a.error, products = _a.products, url = props.url, orderId = props.orderId;
    if (error) {
        return <div>Error loading Products</div>;
    }
    return (<section>
      {products && <ProductList_1.default {...{ products: products, url: url, orderId: orderId }}/>}
      <style jsx>{"\n        section {\n          padding-bottom: 20px;\n        }\n      "}</style>
    </section>);
}
var productsQuery = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query products {\n    products(orderBy: createdAt_DESC) {\n      __typename\n      id\n      name\n      price\n      ...ProductCardFragment\n      ", "\n    }\n  }\n  ", "\n"], ["\n  query products {\n    products(orderBy: createdAt_DESC) {\n      __typename\n      id\n      name\n      price\n      ...ProductCardFragment\n      ", "\n    }\n  }\n  ", "\n"])), GetOrderQuery_1.GetOrderProductFields, ProductCard_1.ProductCardFragment);
exports.default = react_apollo_1.graphql(productsQuery, {
    name: 'productsData',
})(ProductSection);
var templateObject_1;
