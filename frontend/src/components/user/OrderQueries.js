import React from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MetaData from "../more/MetaData";
import BottomTab from "../more/BottomTab";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../contact/Contact.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [looading, setLooading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      return toast.error("Please fill email, subject and message");
    }
    try {
      setLooading(true);
      const { data } = await axios.post(`/api/v1/receive/order/form`, {
        name,
        email,
        order,
        subject,
        message,
      });
      setLooading(false);
      toast.success(data.message);
      document.getElementById("myForm").reset();
    } catch (err) {
      setLooading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  return (
    <>
      <MetaData title={"Contact Us"} />
      <Header />
      <section className="contact" id="contact">
        <h1 className="heading">
          <span> Order </span> Queries/Comments
        </h1>

        <div className="row">
          <form action="" id="myForm" onSubmit={submitHandler}>
            <h2 className="Contactheading">Send us message...</h2>
            <input
              type="text"
              placeholder="Order Number..."
              className="box"
              name="email"
              onChange={(e) => setOrder(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Name..."
              className="box"
              name="email"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email..."
              className="box"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Number..."
              className="box"
              name="name"
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              name="text"
              className="box"
              placeholder="Enter your message..."
              onChange={(e) => setMessage(e.target.value)}
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="submit"
              disabled={looading}
              value={looading ? "Sending..." : "Submit"}
              className="btn"
            />
            <div className="mb-5"></div>
          </form>
        </div>
      </section>
      <Footer />
      <BottomTab />
      <ToastContainer position="top-center" limit={1} />
    </>
  );
};

export default Contact;
