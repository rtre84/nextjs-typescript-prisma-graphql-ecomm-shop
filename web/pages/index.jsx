"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = require("../components/Layout");
var ProductSection_1 = require("../components/ProductSection");
var withOrder_1 = require("../lib/withOrder");
exports.default = withOrder_1.default(function (props) { return (<Layout_1.default {...props}>
    <ProductSection_1.default orderId={props.orderId} url={props.url}/>
  </Layout_1.default>); });
// export default withOrder(props => (
//   <Layout {...props}>
//     <ProductSection orderId={props.orderId} url={props.url} />
//   </Layout>
// ));
