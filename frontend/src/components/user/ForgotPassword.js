import Header from "../header/Header";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../more/MetaData";
import BottomTab from "../more/BottomTab";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      <Header />
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value={loading ? "Sending..." : "Send"}
              className="forgotPasswordBtn"
            />
          </form>
        </div>
      </div>
      <BottomTab />
    </Fragment>
  );
};

export default ForgotPassword;
