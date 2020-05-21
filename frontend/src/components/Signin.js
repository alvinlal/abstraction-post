import React, { useState } from "react";
import { signIn } from "../Helpers/apiCalls";
import { setUserInfo } from "../Helpers/localStorage";
import { useHistory } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSignIn = () => {
    const body = { email, password };
    signIn(body).then((response) => {
      if (response?.error) {
        setError(response.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else if (response?.status && response?.user) {
        if (response.status == "ok") {
          setUserInfo(response.user);
          history.push("/");
        }
      }
    });
  };
  return (
    <div className="signupContainer">
      <div className="error">{error}</div>
      <div className="signUpFields" style={{ marginTop: 40 }}>
        <input
          type="email"
          placeholder="Email"
          className="signUpTextField"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="signUpTextField"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="signUpBtn" onClick={handleSignIn}>
          SIGNIN
        </button>
        <div className="line"></div>
        <a className="google" href="#">
          <img src={require("../assets/google.png")} className="googleLogo" />
          LogIn with google
        </a>
        <a className="facebook" href="#">
          <img
            src={require("../assets/facebook.png")}
            className="facebookLogo"
          />
          LogIn with facebook
        </a>
      </div>
    </div>
  );
}
