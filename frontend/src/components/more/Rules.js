import React from "react";
import Header from "../header/Header";
import BottomTab from "./BottomTab";
import MetaData from "./MetaData";
import Footer from "../footer/Footer";
import "./Rules.css";

const Rules = () => {
  return (
    <>
      <MetaData title="Rules" />
      <Header />
      <div
        className="rules"
        style={{
          padding: "50px 30px",
          display: "flex",
          width: "95%",
          overflow: "hidden",
          marginTop: "43px",
        }}
      >
        <ul className="rules">
          <span className="rulesHeading">
            GreenLands Underwares user Rules and Guidelines:
          </span>
          <li>
            1. You can easily return your product if it did not meet your
            specifications. But you have to give us the delivery charge.
          </li>
          <li>
            2. You have to give delivery charge first for cash on Delivery. In
            Nairobi and Kisumu City delivery is FREE but beyond these cities you
            have to give sh. 200.
          </li>
          <li>3. You can not buy the out of stock products.</li>
          <li>
            4. You can buy any products from us. We are trying to our best to
            give the best quality of products.
          </li>
          <li>
            5. You can find more new features in our buiseness on Daily Basis.
            Our developers team always work for your good services.
          </li>
          <li>
            6. At last thanks for visiting Mimiscosmetics website. Have a good
            day!
          </li>
        </ul>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Rules;
