import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Footer.css";

function Newsletter() {
  const [message, setMessage] = useState("");
  const [looading, setLooading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message) {
      return toast.error("Please fill the email or phone number");
    }
    if (message === null) {
      return toast.error("Please fill the email or phone number");
    }
    try {
      setLooading(true);
      const { data } = await axios.post(`api/v1/api/receive/email`, {
        message,
      });
      setLooading(false);
      toast.success(data.message);
      document.getElementById("myForm").value = null;
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
      <section className="section_p1" id="newsletter">
        <div className="newstext">
          <h4>Sign up for newsletter</h4>
          <p>
            Get email/WhatsApp texts updates about our latest shop and
            <span> special offers.</span>
          </p>
        </div>

        <div className="form">
          <input
            id="myForm"
            type="text"
            placeholder="Your email/phone number"
            onChange={(e) => setMessage(e.target.value)}
          />
          <p className="normali" onClick={submitHandler}>
            {looading ? "Sending..." : "Sign Up"}
          </p>
        </div>
      </section>
    </>
  );
}

export default Newsletter;
