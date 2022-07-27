import ProductCard from "../Products/ProductCard";
import NewProductCard from "../Products/NewProductCard";
import Footer from "../footer/Footer";
import Newsletter from "../footer/Newsletter";
import MetaData from "../more/MetaData";
import Slider from "./Slider";
import Header from "../header/Header";
import BottomTab from "../more/BottomTab";
import Loader from "../more/Loader";
import React, { useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { getNewProduct } from "../../actions/NewProductActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const { newproducts } = useSelector((state) => state.newproducts);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    dispatch(getNewProduct());
  }, [dispatch, error]);
  // scrolls
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  // scrolls
  const slideLeft2 = () => {
    var slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight2 = () => {
    var slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // scrolls
  const slideLeft3 = () => {
    var slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight3 = () => {
    var slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // sorting orders
  const sortedProducts = products?.slice(0);
  sortedProducts?.sort((a, b) => a.createAt.localeCompare(b.createAt));

  // sorting orders
  const byDate = newproducts?.slice(0);
  byDate?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // sorting orders
  const byDate2 = products?.slice(0);
  byDate2?.sort((a, b) => b.createAt.localeCompare(a.createAt));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Home"} />

          <Header />
          <Slider />
          <div id="container">
            <h2
              className="homeHeading"
              style={{ fontSize: "16px", padding: "4px" }}
            >
              Featured Products
            </h2>
            <div id="container">
              <div className="container" style={{ position: "relative" }}>
                <MdChevronLeft
                  className="rightScroll"
                  onClick={slideLeft}
                  size={40}
                />
                <div
                  id="slider"
                  className="container"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {products &&
                    sortedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <MdChevronRight
                  className="leftScroll"
                  onClick={slideRight}
                  size={40}
                />
              </div>
            </div>
          </div>
          <div id="container">
            <h2
              className="homeHeading"
              style={{ fontSize: "16px", padding: "4px" }}
            >
              New Products
            </h2>
            <div id="container">
              <div className="container" style={{ position: "relative" }}>
                <MdChevronLeft
                  className="rightScroll"
                  onClick={slideLeft2}
                  size={40}
                />
                <div
                  id="slider2"
                  className="container"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {newproducts &&
                    byDate.map((newproduct) => (
                      <NewProductCard
                        key={newproduct._id}
                        newproduct={newproduct}
                      />
                    ))}
                </div>
                <MdChevronRight
                  className="leftScroll"
                  onClick={slideRight2}
                  size={40}
                />
              </div>
            </div>
          </div>
          <div id="container">
            <h2
              className="homeHeading"
              style={{ fontSize: "16px", padding: "4px" }}
            >
              On Offer Products
            </h2>
            <div id="container">
              <div className="container" style={{ position: "relative" }}>
                <MdChevronLeft
                  className="rightScroll"
                  onClick={slideLeft3}
                  size={40}
                />
                <div
                  id="slider3"
                  className="container"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {products &&
                    byDate2.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <MdChevronRight
                  className="leftScroll"
                  onClick={slideRight3}
                  size={40}
                />
              </div>
            </div>
          </div>
          <Newsletter />
          <Footer />
        
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Home;
