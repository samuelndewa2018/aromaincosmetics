import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../more/MetaData";
import BottomTab from "../more/BottomTab";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CurrencyFormat from "react-currency-format";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./ConfirmOrder.css";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const payBtn = useRef(null);
  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const subtotal = productPrice;
  const shippingCharges = productPrice > 999 ? 0 : 50;
  const totalPrice = subtotal + shippingCharges;
  const phoneNo = shippingInfo.phoneNo;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
      phoneNo,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <Header />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage" style={{ marginBottom: "50px" }}>
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info:</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {shippingInfo.address}, <br />
                  {shippingInfo.state}, <br />
                  {shippingInfo.country}.
                </span>
              </div>
            </div>
            <div
              className="confirmCartItems"
              style={{ borderTop: "1px solid #eee", paddingTop: "17px" }}
            >
              <Typography>Your Cart Items:</Typography>

              {cartItems.length === 0 ? (
                <div className="confirmCartItemsContainer">""</div>
              ) : (
                <div className="confirmCartItemsContainer">
                  {cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X Ksh {item.price} ={" "}
                        <b>Ksh {item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <p>
                          <strong> {value} </strong>
                        </p>
                      </>
                    )}
                    decimalScale={2}
                    value={subtotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Kshs. "}
                  />
                </span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Kshs. {shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal" style={{ fontWeight: "bold" }}>
              <p>
                <b>Total:</b>
              </p>
              <span>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        <strong> {value} </strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Kshs. "}
                />
              </span>
            </div>

            <button
              style={{ borderRadius: "3px", outline: "none" }}
              onClick={proceedToPayment}
              ref={payBtn}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default ConfirmOrder;
