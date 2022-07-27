import React from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link className="cart__title" to={`/product/${item.product}`}>
          {item.name}
        </Link>
        <span>
          Price:
          {
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p>{value}</p>
                </>
              )}
              decimalScale={2}
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Ksh."}
            />
          }
        </span>
        <span>Tax Included</span>
        <p
          onClick={() => deleteCartItems(item.product)}
          style={{ scrollBehavior: "smooth" }}
        >
          <p>
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
          </p>
          <p> Remove</p>
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
