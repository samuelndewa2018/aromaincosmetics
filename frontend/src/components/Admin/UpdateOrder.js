import Loading from "../more/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import MetaData from "../more/MetaData";
import SideBar from "./Sidebar";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constans/OrderConstans";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/OrderAction";
import "./UpdateOrder.css";

const UpdateOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteOrder
  );
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    myForm.set("paid", paid);
    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const [status, setStatus] = useState("Processing");
  const [paid, setPaid] = useState("Waiting Verification");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer" style={{ marginBottom: "100px" }}>
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>{order.user && order.user.email}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                    <div>
                      <p>Order Number:</p>
                      <span>{order && order._id?.replace(/\D/g, "")}</span>
                    </div>
                    <div>
                      <p>Order Id:</p>
                      <span>{order && order._id}</span>
                    </div>
                    <div>
                      <p>Ordered on:</p>
                      <span>
                        {moment(order.paidAt).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paidStatus &&
                          order.paidStatus === "Payment Verified"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paidStatus &&
                        order.paidStatus === "Payment Verified" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            viewBox="0 0 14 14"
                            fill="currentColor"
                            width="20"
                            height="20"
                            role="img"
                            style={{
                              color: "#53C08E",
                              margin: "5px",
                            }}
                          >
                            <path d="M13.72 7.03c.45-.56.34-1.39-.24-1.82l-.55-.41c-.34-.25-.53-.66-.51-1.08l.03-.68c.03-.72-.53-1.32-1.25-1.33h-.68c-.42 0-.81-.22-1.05-.57L9.11.57c-.39-.6-1.2-.75-1.79-.33l-.55.4c-.34.24-.79.3-1.18.15L4.95.55c-.67-.25-1.41.11-1.64.79l-.21.65c-.14.4-.46.71-.87.82l-.65.18C.89 3.19.5 3.92.71 4.6l.21.65c.13.41.04.85-.22 1.18l-.42.54c-.45.56-.34 1.39.24 1.81l.55.41c.34.25.53.66.51 1.08l-.03.68c-.03.72.54 1.32 1.25 1.33h.68c.42 0 .81.22 1.05.57l.37.57c.39.6 1.21.75 1.79.33l.55-.4c.34-.25.78-.31 1.18-.16l.64.24c.67.25 1.41-.1 1.64-.79l.21-.65c.13-.4.45-.71.86-.82l.65-.17c.69-.19 1.09-.92.87-1.61l-.21-.65c-.13-.4-.05-.85.22-1.18l.42-.53zM6.06 9.84L3.5 7.27l1.23-1.23 1.33 1.33 3.21-3.21L10.5 5.4 6.06 9.84z"></path>
                          </svg>
                        ) : (
                          ""
                        )}
                        {order.paidStatus && order.paidStatus}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
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
                          value={order.totalPrice && order.totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Kshs. "}
                        />
                      </span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            <span>
                              {item.quantity} X Ksh{item.price} ={" "}
                              <b>Ksh {item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Order Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-credit-card"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                      <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                    </svg>
                    <select onChange={(e) => setPaid(e.target.value)}>
                      <option value="">Verify Payment</option>
                      {order.paidStatus === "Waiting Verification" && (
                        <option value="Payment Verified">
                          {" "}
                          Payment Verified
                        </option>
                      )}
                      {order.paidStatus === "Payment Verified" && (
                        <option value="Waiting Verification">
                          {" "}
                          Waiting Verification
                        </option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default UpdateOrder;
