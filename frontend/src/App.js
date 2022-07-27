import Home from "./components/home/Home";
import ProductDetails from "./components/Products/ProductDetails";
import NewProductDetails from "./components/Products/NewProductDetails";
import Search from "./components/Products/Search";
import Products from "./components/Products/Products";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Success from "./components/cart/Success";
import MyOrder from "./components/user/MyOrder";
import Cart from "./components/cart/Cart";
import Favourites from "./components/cart/Favourites";
import Payment from "./components/cart/Payment";
import Rules from "./components/more/Rules";
import MoreOption from "./components/more/MoreOption";
import LoginSignup from "./components/authentication/LoginSignup";
import Profile from "./components/user/Profile";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import WebFont from "webfontloader";
import ProtectedRoute from "./route/ProtectedRoute";
import store from "./store";
import Maps from "./Maps";
import ForgotPassword from "./components/user/ForgotPassword";
import EditProfile from "./components/user/EditProfile";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import Dashboard from "./components/Admin/Dashboard";
import CreateProduct from "./components/Admin/CreateProduct";
import CreateNewProduct from "./components/Admin/CreateNewProduct";
import AllProducts from "../../frontend/src/components/Admin/AllProducts";
import AllNewProducts from "../../frontend/src/components/Admin/AllNewProducts";
import EditProduct from "../../frontend/src/components/Admin/EditProduct";
import EditNewProduct from "../../frontend/src/components/Admin/EditNewProduct";
import AllOrder from "../../frontend/src/components/Admin/AllOrder";
import UpdateOrder from "../../frontend/src/components/Admin/UpdateOrder";
import AllUsers from "../../frontend/src/components/Admin/AllUsers";
import UpdateUser from "../../frontend/src/components/Admin/UpdateUser";
import AllReviews from "./components/Admin/AllReviews";
import OrderQueries from "./components/user/OrderQueries";
import { loadUser } from "./actions/userAction";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/new/product/:id" component={NewProductDetails} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/process/payment" component={Payment} />
        <Route exact path="/faq" component={Rules} />
        <Route exact path="/more" component={MoreOption} />
        <Route exact path="/maps" component={Maps} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/orders/form" component={OrderQueries} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={CreateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/new/product"
          component={CreateNewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AllProducts}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/new/products"
          component={AllNewProducts}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/product/:id"
          component={EditProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/new/product/:id"
          component={EditNewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={AllOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={UpdateOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={AllUsers}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={AllReviews}
        />
      </Switch>
    </Router>
  );
}

export default App;
