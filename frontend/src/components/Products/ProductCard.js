import React from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link className="ProductCard" to={`/product/${product._id}`}>
        <span className="discountSpan">
          {product.offerPrice > 1 &&
            `-${Math.round(
              ((product.offerPrice - product.price) / product.price) * 100
            )}%`}
        </span>
        <img
          src={product.images[0].url}
          alt={product.name}
          className="ProductImg"
        />
        <p className="productName">{product.name}</p>
        <div className="RatingReview">
          <span>
            <Rating {...options} />
          </span>
          <span>({product.numOfReviews} Reviews)</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="offerPriceBox">
            <h1 className="discountPrice">
              {
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        <strong> {value} </strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={product.offerPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"was Ksh. "}
                />
              }
            </h1>
            <span className="p__Price">
              {
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        <strong> {value} </strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Ksh. "}
                />
              }

              <div className="AddShoppingCartIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-cart-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
