import React, { useState } from "react";
import { Formik } from "formik";
import { signUp } from "../Helpers/apiCalls";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();
  return (
    <div className="signupContainer">
      <div className={error ? "error" : "success"}>
        {error ? error : success}
      </div>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email is Invalid";
          } else if (values.userName.length <= 4) {
            errors.userName = "Username should be atleast 4 characters";
          } else if (!values.userName) {
            errors.userName = "Username is required";
          } else if (values.userName.includes(" ")) {
            errors.userName = "Username should not contain white spaces";
          } else if (!values.password) {
            errors.password = "Please enter a password";
          } else if (values.password.length <= 6) {
            errors.password = "Password should contain atleast 6 characters";
          } else if (values.password != values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          const { userName, email, password } = values;
          signUp({ userName, email, password }).then((data) => {
            if (data?.error) {
              setError(data.error);
              if (data.error === "User already exist,please login") {
                setError(data.error);
                setTimeout(() => {
                  history.push("/signin");
                }, 5000);
              } else if (data.error === "Username already taken") {
                setError(data.error);
                setTimeout(() => {
                  setError("");
                }, 5000);
              }
            } else if (data?.status == "ok") {
              toast.success("Account Created", {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
              setTimeout(() => {
                history.push("/signin");
              }, 2000);
            }
          });
        }}
      >
        {(props) => (
          <form className="form" onSubmit={props.handleSubmit}>
            <div className="signUpFields">
              <input
                type="text"
                placeholder="Username"
                className="signUpTextField"
                onChange={props.handleChange("userName")}
                onBlur={props.handleBlur("userName")}
                value={props.values.userName}
              />
              <div className="error">
                {props.errors.userName &&
                  props.touched.userName &&
                  props.errors.userName}
              </div>
              <input
                type="email"
                placeholder="Email"
                className="signUpTextField"
                onChange={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.email}
              />
              <div className="error">
                {props.errors.email &&
                  props.touched.email &&
                  props.errors.email}
              </div>

              <input
                type="password"
                placeholder="Password"
                className="signUpTextField"
                onChange={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
              />
              <div className="error">
                {props.errors.password &&
                  props.touched.password &&
                  props.errors.password}
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                className="signUpTextField"
                onChange={props.handleChange("confirmPassword")}
                onBlur={props.handleBlur("confirmPassword")}
                value={props.values.ConfirmPassword}
              />
              <div className="error">
                {props.errors.confirmPassword &&
                  props.touched.confirmPassword &&
                  props.errors.confirmPassword}
              </div>

              <button className="signUpBtn" type="submit">
                SIGNUP
              </button>

              <div className="line"></div>
              <a className="google" href="#">
                <img
                  src={require("../assets/google.png")}
                  className="googleLogo"
                />
                SignUp with google
              </a>
              <a className="facebook" href="#">
                <img
                  src={require("../assets/facebook.png")}
                  className="facebookLogo"
                />
                SignUp with facebook
              </a>
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
