import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import MetaData from "../more/MetaData";
import Loading from "../more/Loader";
import CurrencyFormat from "react-currency-format";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAdminNewProduct } from "../../actions/NewProductActions.js";
import { getAllOrders } from "../../actions/OrderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { newproducts } = useSelector((state) => state.newproducts);
  const { orders } = useSelector((state) => state.AllOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  newproducts &&
    newproducts.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAdminNewProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <MetaData title="Dashboard" />
          <Sidebar />

          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br />
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <p>{value}</p>
                      </>
                    )}
                    decimalScale={2}
                    value={totalAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Kshs. "}
                  />
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                {user.role === "admin" && (
                  <>
                    <Link to="/admin/products">
                      <p>F-Products</p>
                      <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/new/products" className="secondChild">
                      <p>N-Products</p>
                      <p>{newproducts && newproducts.length}</p>
                    </Link>
                    <Link to="/admin/users">
                      <p>Users</p>
                      <p>{users && users.length}</p>
                    </Link>
                  </>
                )}
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders && orders.length}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
