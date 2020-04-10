import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.component";
import { getCart } from "../cartHelpers";
import Card from "../card/Card.component";
import Checkout from "../checkout/Checkout.component";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };
  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );
  return (
    <Layout
      title="Cart"
      description="Manage your cart. Add, remove, checkout or continue shopping!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
      <ScrollUpButton />
    </Layout>
  );
};

export default Cart;
