import React from "react";
import { Link } from "react-router-dom";
import "./FavouriteItemsCard.css";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  return (
    <>
      <div className="FavouriteItemsCard">
        <div>
          <img src={item.image} alt="ssa" />
          <Link
            to={`/product/${item.product}`}
            style={{
              fontSize: "300 0.9vmax",
              fontFamily: "cursive",
            }}
          >
            {item.name}
          </Link>
          <p onClick={() => deleteFavouriteItems(item.product)}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
            Remove
          </p>
        </div>

        <div>
          <span>{`Ksh ${item.price}`}</span>
        </div>
        <div>
          <Link to={`/product/${item.product}`}>
            <button
              className="favouritesButton"
              onClick={() => deleteFavouriteItems(item.product)}
            >
              Add To Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FavouriteItemsCard;
