import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BottomTab from "../more/BottomTab";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./orderSuccess.css";

const Success = () => {
  return (
    <>
      <Header />
      <div className="orderSuccess">
        <CheckCircleIcon />

        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/orders">View Orders</Link>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Success;
