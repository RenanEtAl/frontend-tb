import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder
} from "../apiCore"; // getBraintreeClientToken, processPayment, createOrder
import { emptyCart } from "../cartHelpers";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
// import "braintree-web"; // not using this package
import DropIn from "braintree-web-drop-in-react";
import "./Checkout.styles.css";

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}, // for braintree react UI
    address: ""
  });
  // get userId
  const userId = isAuthenticated() && isAuthenticated().user._id;
  // get tokenId
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    // if user is authenticated show
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  let deliveryAddress = data.address; // used to send address to backend

  const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            console.log(response);
            // setData({...data, success: response.success})
            // empty cart/
            // emptyCart(()=> {
            //     console.log('payment sucess and empty cart');
            //     setData({loading: false})
            // })
            // create order

            // can see all these from response
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress
            };

            createOrder(userId, token, createOrderData)
              .then(response => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log("payment success and empty cart");
                  setData({
                    loading: false,
                    success: true
                  });
                });
              })
              .catch(error => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch(error => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch(error => {
        //console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };
  const showDropIn = () => (
    // onBlur- whenever the page is clicked
    // clear error message
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Shipping Address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your shipping address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: { flow: "vault" }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );
  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = loading => loading && <h2>Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>

      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
      <div className="credit-card-info">
        Use the test credit card for payments
        <br />
        4242 4242 4242 4242 - Exp: 02/21 - CVV: 123{" "}
      </div>
    </div>
  );
};
export default Checkout;
