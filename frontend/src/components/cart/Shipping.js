import CheckoutSteps from "./CheckoutSteps.js";
import MetaData from "../more/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import Header from "../header/Header";
import BottomTab from "../more/BottomTab";
import Footer from "../footer/Footer";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../actions/CartAction";
import "./Shipping.css";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (!phoneNo || !address) {
      toast.error("Please fill out the shipping details");
    } else if (phoneNo.length < 12) {
      toast.error(
        "Invalid Phone Number. Your Phone number should start with +2547xxxxxxxx"
      );
    } else if (phoneNo.length[0] === 0) {
      toast.error("Your Phone number should start with +2547XXXXXXXX");
    } else {
      dispatch(saveShippingInfo({ address, state, country, phoneNo }));
      history.push("/order/confirm");
    }
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <Header />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="+2547xxxxxxxx (Phone Number)"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div>
              <PublicIcon />

              <input
                value={country}
                placeholder="County"
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </div>

            <div>
              <TransferWithinAStationIcon />

              <input
                placeholder="Town"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></input>
            </div>

            <input
              type="submit"
              value={phoneNo && address ? "continue " : "waiting . . . "}
              className="shippingBtn"
            />
          </form>
        </div>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Shipping;
