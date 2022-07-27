import React from "react";
import FavouriteItemsCard from "./FavouriteItemsCard.js";
import MetaData from "../more/MetaData";
import Loading from "../more/Loader";
import BottomTab from "../more/BottomTab";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavouriteItemsToCart } from "../../actions/FavouriteAction";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Favourite.css";

const Favourite = ({ history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);
  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Favourites Items" />
          <Header />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Items In Favourites</Typography>
              <Link to="/products">View Products</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="favouritesPage">
                <div className="favouritesHeader">
                  <p>Product</p>
                  <p>Price</p>
                  <p>Action</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
                <BottomTab />
              </div>
            </>
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default Favourite;
