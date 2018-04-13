import React from "react";
import { connect } from "react-redux";
import { getVisibleProducts } from "../reducers/products";
import { addToCart } from "../actions";
const ProduceList = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

const Item = ({ title, price, quantity }) => {
  return (
    <div>
      <div>
        {title} - &#36;{price}
        {quantity ? ` x ${quantity}` : null}
      </div>
    </div>
  );
};
const Index = ({ products, addToCart }) => {
  console.log(products, "products");
  return (
    <ProduceList title="Products">
      {products.map((product, index) => {
        return (
          <div key={index}>
            <Item
              title={product.title}
              price={product.price}
              quantity={product.inventory}
            />
            <button
              onClick={() => addToCart(product.id)}
              disabled={product.inventory > 0 ? "" : "disabled"}
            >
              {product.inventory > 0 ? "Add to cart" : "Sold Out"}
            </button>
          </div>
        );
      })}
    </ProduceList>
  );
};
// );

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
  //   products: state.products
});

export default connect(mapStateToProps, { addToCart })(Index);
