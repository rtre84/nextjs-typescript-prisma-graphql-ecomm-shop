import ProductCard from './ProductCard';
export default function ProductList(props) {
    const { products, url, orderId, } = props;
    return (<section className="ProductList" itemScope itemType="http://schema.org/ItemList">
      {products.map((product) => {
        return <ProductCard {...{ key: product.id, product, orderId, url }}/>;
    })}

      <style jsx>{`
        section {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </section>);
}
//# sourceMappingURL=ProductList.jsx.map