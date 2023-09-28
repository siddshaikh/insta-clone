import React, { useContext, useState } from "react";
import "./signIn.css";
import logo from "../../img/logo.png";
import { Link, json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { myContext } from "../../context/LoginContex";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //context variable
  const { setUserLogin } = useContext(myContext);
  //REG_X email varification
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handlePostData = () => {
    if (!emailPattern.test(email)) {
      toast.error("Please enter valid Email");
      return;
    }
    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: `${email}`, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Signed in Succesfuly!");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  return (
    <div className="signIn">
      <div>
        <div className="login-form">
          <img src={logo} alt="logo" className="logo" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            value="Sign In"
            id="login-btn"
            onClick={() => {
              handlePostData();
            }}
          />
        </div>
        <div className="loginForm-two">
          Don't have an account?{" "}
          <Link to={"/signup"} style={{ color: "blue", cursor: "pointer" }}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
