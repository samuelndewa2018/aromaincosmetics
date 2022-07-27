import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MetaData from "../more/MetaData";
import BottomTab from "../more/BottomTab";
import "./About.css";

const About = () => {
  return (
    <>
      <MetaData title={"About Us"} />
      <Header />
      <section className="about" id="about">
        <h1 className="heading">
          <span> about </span> us
        </h1>

        <div className="row">
          <div className="video-container">
            <img
              src="https://images.unsplash.com/photo-1591384658362-1105c821611c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              style={{ width: "100%" }}
            />
            <h3>inner confindence is our core b/s</h3>
          </div>

          <div className="content">
            <h3>why choose us?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
              cumque sit nemo pariatur corporis perspiciatis aspernatur a ullam
              repudiandae autem asperiores quibusdam omnis commodi alias
              repellat illum, unde optio temporibus.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Accusantium ea est commodi incidunt magni quia molestias
              perspiciatis, unde repudiandae quidem.
            </p>
            <a href="#about" className="btn">
              learn more
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <BottomTab />
    </>
  );
};

export default About;
