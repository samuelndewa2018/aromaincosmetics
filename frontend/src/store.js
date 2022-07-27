import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { cartReducer } from "./reducers/CartReducer";
import { favouriteReducer } from "./reducers/FavouriteReducer";
import {
  deleteProductReducer,
  deleteReviewReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReviewsReducer,
  productsReducer,
} from "./reducers/ProductReducer";
import {
  deletenewProductReducer,
  deletenewReviewReducer,
  newnewProductReducer,
  newnewReviewReducer,
  newproductDetailsReducer,
  newproductReviewsReducer,
  newproductsReducer,
} from "./reducers/NewProductReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  createProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  newproducts: newproductsReducer,
  newproductDetails: newproductDetailsReducer,
  newcreateProduct: newnewProductReducer,
  newdeleteProduct: deletenewProductReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  newReview: newReviewReducer,
  newnewReview: newnewReviewReducer,
  productReviews: productReviewsReducer,
  newproductReviews: newproductReviewsReducer,
  deleteReview: deleteReviewReducer,
  deletenewReview: deletenewReviewReducer,
  order: newOrderReducer,
  myOrder: myOrdersReducer,
  myOrderDetails: orderDetailsReducer,
  AllOrders: allOrdersReducer,
  deleteOrder: orderReducer,
  user: userReducer,
  profile: profileReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
