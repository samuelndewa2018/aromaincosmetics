import "./Search.css";
import BottomTab from "../more/BottomTab";
import Header from "../header/Header";
import React, { useState } from "react";

function Search({ history }) {
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <>
      <Header />
      <form className="search_form" onSubmit={searchSubmitHandler}>
        <div className="searchbar">
          <input
            type="text"
            className="searchbar__input"
            placeholder="Search Products"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="searchbar__button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </form>
      <BottomTab />
    </>
  );
}
export default Search;
