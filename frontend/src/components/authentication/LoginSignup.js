import MetaData from "../more/MetaData";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import jwt_decode from "jwt-decode";
import { Circle } from "better-react-spinkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  register,
  registerGoogle,
  loginGoogle,
} from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import "./LoginSignup.css";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = ({ history, location }) => {
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    const myForm = new FormData();
    myForm.set("name", userObject.name);
    myForm.set("email", userObject.email);
    myForm.set("avatar", userObject.picture);
    dispatch(registerGoogle(myForm));
  }
  function handleCallbackResponse2(response) {
    var userObject = jwt_decode(response.credential);
    dispatch(loginGoogle(userObject.email));
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse2,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv2"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/bramuels/image/upload/v1656165811/avatar/Profile_sdltwi.png"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/bramuels/image/upload/v1656165811/avatar/Profile_sdltwi.png"
  );

  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    document.getElementById("loginSubmit").reset();
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    document.getElementById("registerSubmit").reset();
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const deleteAvatar = (e) => {
    setAvatarPreview(
      "https://res.cloudinary.com/bramuels/image/upload/v1656165811/avatar/Profile_sdltwi.png"
    );
    setAvatar(
      "https://res.cloudinary.com/bramuels/image/upload/v1656165811/avatar/Profile_sdltwi.png"
    );
  };
  const redirect = location.search ? location.search.split("=")[1] : "/me";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    const container = document.querySelector(".loginContainer");

    if (tab === "login") {
      container.classList.add("sign-up-mode");
    }
    if (tab === "register") {
      container.classList.remove("sign-up-mode");
    }
  };

  const myFuncion = () => {
    var x = document.getElementById("myInput");
    var y = document.getElementById("hide2");
    var z = document.getElementById("hide1");

    if (x.type === "password") {
      x.type = "text";
      y.style.display = "block";
      z.style.display = "none";
    } else {
      x.type = "password";
      y.style.display = "none";
      z.style.display = "block";
    }
  };
  const myFuncion2 = () => {
    var x = document.getElementById("myInput2");
    var y = document.getElementById("hide4");
    var z = document.getElementById("hide3");

    if (x.type === "password") {
      x.type = "text";
      y.style.display = "block";
      z.style.display = "none";
    } else {
      x.type = "password";
      y.style.display = "none";
      z.style.display = "block";
    }
  };

  return (
    <>
      <>
        <Header />
        <MetaData title="Login or Signup" />
        <div className="loginContainer">
          <div className="forms-container">
            <div className="signin-signup">
              <form
                action="#"
                className="sign-in-form"
                id="loginSubmit"
                onSubmit={loginSubmit}
              >
                <h2 className="title">Login</h2>

                <div className="input-field">
                  <i className="fas fa-user">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </i>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                  </i>
                  <input
                    type="password"
                    id="myInput"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <span
                    className="eye"
                    onClick={myFuncion}
                    style={{ cursor: "ponter" }}
                  >
                    <div id="hide1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </div>
                    <div id="hide2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    </div>
                  </span>
                </div>
                <Link to="/password/forgot" className="forgotPassword">
                  Forgot Password ?
                </Link>
                <Link to="/" className="forgotPassword">
                  <span>Login as a guest ?</span>
                </Link>
                <button
                  className="btn solid"
                  type="submit"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    padddingLeft: "5px",
                  }}
                >
                  {loading && "processing"}{" "}
                  {loading && <Circle color="#fff" size={20} />}{" "}
                  {!loading && "login"}
                </button>
                {/* <input
                  type="submit"
                  value={
                    loading
                      ? `Processing... ${(<Circle size={30} />)}`
                      : "LogIn"
                  }
                  className="btn solid"
                /> */}

                <p className="social-text">Or Login with Google</p>
                <div className="social-media">
                  <i className="fab fa-facebook-f">
                    <div id="signInDiv2"></div>
                  </i>
                </div>
              </form>
              <form
                action="#"
                id="registerSubmit"
                className="sign-up-form"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <h2 className="title">Register</h2>
                <div className="input-field">
                  <i className="fas fa-user">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                  </i>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </i>

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                  </i>
                  <input
                    type="password"
                    id="myInput2"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <span
                    className="eye"
                    onClick={myFuncion2}
                    style={{ cursor: "ponter" }}
                  >
                    <div id="hide3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </div>
                    <div id="hide4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    </div>
                  </span>
                </div>
                <span style={{ fontSize: "13px" }}>
                  Enter your Profile image (optional)
                </span>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  <p
                    classname="removeAvatar"
                    onClick={deleteAvatar}
                    style={{
                      cursor: "pointer",
                      margin: "2px 5px",
                      fontSize: "14px",
                      marginTop: "24px",
                    }}
                  >
                    Remove
                  </p>
                </div>
                <button
                  className="btn solid"
                  type="submit"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                    padddingLeft: "5px",
                  }}
                >
                  {loading && "processing"}{" "}
                  {loading && <Circle color="#fff" size={20} />}{" "}
                  {!loading && "register"}
                </button>

                <p className="social-text">Or Register with Google</p>
                <div className="social-media">
                  <i className="fab fa-facebook-f">
                    <div id="signInDiv"></div>
                  </i>
                </div>
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>
                  Welcome to GreenLands Underwears when we enhance inner
                  condindence. Your satisfaction is our Goal. Please register
                  below..
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={(e) => switchTabs(e, "login")}
                >
                  Register
                </button>
              </div>
              <img src="img/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>
                  Welcome back to the GreenLands Underwears. Happy to see you
                  Again. Your satisfaction is our Goal. Please Login below..
                </p>
                <button
                  className="btn transparent"
                  id="sign-in-btn"
                  onClick={(e) => switchTabs(e, "register")}
                >
                  Login
                </button>
              </div>
              <img src="img/register.svg" className="image" alt="" />
            </div>
          </div>
        </div>
        <Footer />
        {/* <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </>
    </>
  );
};

export default LoginSignup;
