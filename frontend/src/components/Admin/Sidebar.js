import React from "react";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  const button = () => {
    let items = document.querySelectorAll(".Dashboard__item");
  };

  return (
    <div className="sidebar">
      <Link
        to="/"
        style={{ fontSize: "30px", margin: "11px" }}
        className="logoi"
      >
        Inners<span>.</span>
      </Link>
      <Link to="/dashboard">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      {user.role === "admin" && (
        <>
          <Link to="/admin/products">
            <p className="Dashboard__item">
              <PostAddIcon /> All Featured Products
            </p>
          </Link>
          <Link to="/admin/new/products">
            <p className="Dashboard__item">
              <PostAddIcon /> All New Products
            </p>
          </Link>
          <Link to="/admin/product">
            <p>
              <AddIcon />
              Create Featured Product
            </p>
          </Link>
          <Link to="/admin/new/product">
            <p>
              <AddIcon />
              Create New Product
            </p>
          </Link>
        </>
      )}

      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      {user.role === "admin" && (
        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>
      )}
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
