import Footer from "../footer/Footer";
import Header from "../header/Header";
import MetaData from "../more/MetaData";
import BottomTab from "../more/BottomTab";
import Loading from "../more/Loader";
import ProductCard from "./ProductCard";
import NewProductCard from "./NewProductCard";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { getNewProduct } from "../../actions/NewProductActions";
import { Link } from "react-router-dom";
import "./Product.css";

const categories = [
  "Personal",
  "cloth",
  "Ladies Cloth",
  "Gift",
  "Food",
  "Electronics",
  "Sports",
  "Others",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  const { newproducts } = useSelector((state) => state.newproducts);
  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getNewProduct(keyword));

    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={keyword ? `${keyword}'s results` : "Products"} />
          <Header />
          <div>
            {products?.length === 0 && newproducts?.length === 0 ? (
              ""
            ) : (
              <h2
                className="FeaturedProductHeading"
                style={{ marginTop: "88px" }}
              >
                Featured Products
              </h2>
            )}
            <div className="sidebar__product">
              {newproducts?.length === 0 && products?.length === 0 ? (
                <>
                  <div className="emptyProduct">
                    <h4 style={{ fontSize: "15px" }}>
                      Ooops! No Products found by name "{keyword}"
                    </h4>

                    <p style={{ fontSize: "11px" }}>
                      * Search Keyword Only e.g Panties, Boxers etc...
                    </p>
                    <p style={{ fontSize: "11px" }}>
                      * Try searching with short and simple keywords.{" "}
                    </p>
                    <p style={{ fontSize: "11px" }}>
                      * Check your spelling for typing errors.
                    </p>
                    <p style={{ fontSize: "11px" }}>
                      * Try searching more general terms.{" "}
                    </p>

                    <Link to="/products">View all Products</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="products">
                    {products &&
                      products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}{" "}
                    <br />
                    {newproducts &&
                      newproducts.map((newproduct) => (
                        <NewProductCard
                          key={newproduct.id}
                          newproduct={newproduct}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
            {newproducts?.length === 0 && products?.length === 0 ? (
              ""
            ) : (
              <div
                className="pagination__box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "6vmax",
                }}
              >
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
