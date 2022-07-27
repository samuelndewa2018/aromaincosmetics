import Header from "../header/Header";
import Footer from "../footer/Footer";
import MetaData from "../more/MetaData";
import Loading from "../more/Loader";
import BottomTab from "../more/BottomTab";
import moment from "moment";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CurrencyFormat from "react-currency-format";
import React, { Fragment, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/OrderAction";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./myOrders.css";
import "./orderDetails.css";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const { order } = useSelector((state) => state.myOrderDetails);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);
  // sorting orders
  const byDate = orders?.slice(0);
  byDate?.sort((a, b) => b.paidAt.localeCompare(a.paidAt));

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          {orders.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Orders In Your Account</Typography>
              <Link to="/products">Place Order</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="myOrder__PageContainer">
                {orders &&
                  byDate.map((item) => (
                    <>
                      <div key={item.id} className="orderDetailsPage">
                        <div className="orderDetailsContainer ">
                          <Typography component="h1">
                            Order No. #{item._id.replace(/\D/g, "")}
                          </Typography>
                          <div
                            className="orderDetailsContainerBox1"
                            style={{
                              fontSize: "18px",
                              padding: "5px 0",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <p>Ordered on:</p>{" "}
                            <span>
                              {moment(item.paidAt).format(
                                "dddd, MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                          </div>
                          <div
                            className="orderDetailsContainerBox1"
                            style={{
                              fontSize: "18px",
                              padding: "5px 0",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <p>Payment:</p>{" "}
                            <span>
                              <div className="orderDetailsContainerBox">
                                <div>
                                  <p
                                    className={
                                      item.orderStatus === "Delivered"
                                        ? "greenColor"
                                        : "redColor"
                                    }
                                  ></p>
                                  <p
                                    className={
                                      item.paidStatus &&
                                      item.paidStatus === "Payment Verified"
                                        ? "greenColor"
                                        : "redColor"
                                    }
                                  >
                                    {item.paidStatus &&
                                    item.paidStatus === "Payment Verified" ? (
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
                                    {item.paidStatus && item.paidStatus}
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
                                      value={item.totalPrice && item.totalPrice}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"Kshs. "}
                                    />
                                  </span>
                                </div>
                              </div>
                            </span>
                          </div>

                          <div
                            className="orderDetailsContainerBox1"
                            style={{
                              fontSize: "18px",
                              padding: "5px 0",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <p>Order Status:</p>{" "}
                            <span>
                              <div className="orderDetailsContainerBox">
                                <div>
                                  <p
                                    className={
                                      item.orderStatus &&
                                      item.orderStatus === "Delivered"
                                        ? "greenColor"
                                        : "redColor"
                                    }
                                  >
                                    {item.orderStatus && item.orderStatus}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                              {item.orderItems &&
                                item.orderItems.map((item) => (
                                  <div key={item.Offer}>
                                    <img src={item.image} alt="Product" />
                                    <Link>{item.name}</Link>{" "}
                                    <span>
                                      {item.quantity} X Ksh {item.price} ={" "}
                                      <b>Ksh {item.price * item.quantity}</b>
                                    </span>
                                  </div>
                                ))}
                            </div>
                            <p
                              className="orderDetailsContainerBox1"
                              style={{
                                fontSize: "14px",
                                padding: "5px 0",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p>Queries and comments:</p>{" "}
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#eee",
                                }}
                              >
                                <Link to="/orders/form">
                                  {" "}
                                  Was there problem in that order?{" "}
                                  <span style={{ textDecolation: "underline" }}>
                                    Click here{" "}
                                  </span>
                                  to send us message.
                                  <br /> (Refresh to see order updates)
                                </Link>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </>
          )}
          <Footer />
        </>
      )}
      <BottomTab />
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

export default MyOrder;
