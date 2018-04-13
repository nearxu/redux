import React from "react";
import { connect } from "react-redux";
import { getCartProducts, getTotal } from "../reducers";
import { checkout } from "../actions";

const Product = ({ title, price, quantity }) => {
  return (
    <div>
      {title} - &#36;{price}
      {quantity ? ` x ${quantity}` : null}
    </div>
  );
};

const Cart = ({ products, total, checkout }) => {
  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map(product => (
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    ))
  ) : (
    <em>Please add some products to cart.</em>
  );
  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button
        onClick={() => checkout(products)}
        disabled={hasProducts ? "" : "disabled"}
      >
        Checkout
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  // console.log(state, "state");
  products: getCartProducts(state),
  total: getTotal(state)
});

export default connect(mapStateToProps, { checkout })(Cart);
