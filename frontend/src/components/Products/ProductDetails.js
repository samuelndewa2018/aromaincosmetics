import BottomTab from "../more/BottomTab";
import Loading from "../more/Loader";
import Footer from "../footer/Footer";
import MetaData from "../more/MetaData";
import Header from "../header/Header";
import ReviewCard from "./ReviewCard.js";
import Arrows from "./Arrows";
import CurrencyFormat from "react-currency-format";
import React, { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import { NEW_REVIEW_RESET } from "../../constans/ProductConstans";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/ProductActions";
import "./Productdetails.css";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;

    dispatch(newReview(myForm));

    comment.length === 0
      ? toast.error("Please fill the comment box")
      : toast.success("Review done successfully reload to watch it");

    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return toast.error("Product stock limited");
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    if (product.Stock > 0) {
      dispatch(addItemsToCart(match.params.id, quantity));
      toast.success("Product Added to cart");
    } else {
      toast.error("Product stock limited");
    }
  };
  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Product Added to Favourites");
  };

  // slider
  const len = product.images?.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="ProductDetails">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              {product.images &&
                product.images.map((item, index) => (
                  <div
                    key={index}
                    className={
                      index === activeIndex ? "slides active" : "inactive"
                    }
                  >
                    <img
                      className="d-block w-100 CarouselImage"
                      src={item.url}
                      alt={product.title}
                    />
                  </div>
                ))}

              <Arrows
                prevSlide={() =>
                  setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
                }
                nextSlide={() =>
                  setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
                }
              />
            </div>
            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                  <h1>
                    {" "}
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
                  </h1>
                </div>
                <div className="detailsBlock-3-1">
                  <span>
                    {product.offerPrice > 1 &&
                      `Discount : ${Math.round(
                        ((product.offerPrice - product.price) / product.price) *
                          100
                      )}%`}
                  </span>
                </div>

                <div className="detailsBlock-3-1">
                  <span className="quantity">
                    <strong>Quantity</strong>
                  </span>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                </div>
                <p className="stock__meta">
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out Of Stock" : "InStock "}
                  </b>
                  <p style={{ marginLeft: "5px" }}>
                    {product.Stock < 1
                      ? "(0 remaining)"
                      : `(${product.Stock} remaining)`}
                  </p>
                </p>
                <div className="Description">
                  <span>
                    <strong>Description:</strong>
                  </span>
                  <p>{product.description}</p>
                </div>
                <div className="prodDetailsBtn">
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Add to wishlist
                    </span>
                  </div>

                  <div
                    className="pointer flex"
                    style={{
                      padding: "0 5px",
                      borderRadius: "10px",
                      alignItems: "center",
                      backgroundColor: "#E4EAEC",
                    }}
                    onClick={addToCartHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <p className="cartBtn">Add to Cart</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="varse__2">
              <div className="col-12 col-lg-5 img-fluid paddindadd">
                <div className="detailsBlock-1 heading delivery">
                  <h2>DELIVERY & RETURNS</h2>
                </div>
                <div className="detailsBlock-2">
                  <span>
                    Qualifies for free delivery for orders above Ksh 699 in
                    Nairobi, Kiambu, and Mombasa (excluding medium and large
                    items){" "}
                  </span>
                </div>
                <div className="iconsi">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-shop-window"
                      viewBox="0 0 16 16"
                      style={{ color: "#3bb77e" }}
                    >
                      <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                  </p>
                  <p> Kahawa Sukari Baringo Road</p>
                </div>
                <div className="iconsi">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-bootstrap-reboot"
                      viewBox="0 0 16 16"
                      style={{ color: "#3bb77e" }}
                    >
                      <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                      <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                    </svg>
                  </p>
                  <p>
                    You can return this products within 10 days
                    . But delivery charges are not refundable
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 84px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Reviews
            </h1>
          </div>
          <div>
            <div
              style={{
                padding: "1vmax 5vmax",
              }}
            >
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review, i) => (
                      <ReviewCard key={i} review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    margin: "5px 0",
                    fontSize: "12px",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  No Reviews Yet * (Be the first to comment)
                </p>
              )}
              <div className="prodDetailsComment">
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Add a Review
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                        fontSize: "12px",
                      }}
                    >
                      Your Rating*
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="ReviewsSectionInput"
                ></textarea>
                <p
                  type="submit"
                  style={{
                    width: "18vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "5px",
                    fontSize: "16px",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </p>
              </div>
            </div>
          </div>

          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default ProductDetails;
