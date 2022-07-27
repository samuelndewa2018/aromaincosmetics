import MetaData from "../more/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import BottomTab from "../more/BottomTab";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "./ResetPassword.css";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Password Updated Successfully");
      history.push("/me");
    }
  }, [dispatch, error, history, success]);

  return (
    <>
      <Header />
      <MetaData title="Change Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Reset Password</h2>

          <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
            <div>
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Update" className="resetPasswordBtn" />
          </form>
        </div>
      </div>
      <BottomTab />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </>
  );
};

export default ResetPassword;
