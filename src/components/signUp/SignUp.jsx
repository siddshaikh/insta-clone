import React, { useState } from "react";
import logo from "../../img/logo.png";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignUp = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //toast function
  const notifyErr = (msg) => {
    toast.error(msg);
  };
  const notifySucess = (msg) => {
    toast.success(msg, { theme: "light" });
  };
  // REG_X for the email varification
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // REG_X for the password validation
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePost = () => {
    if (!emailPattern.test(email)) {
      notifyErr("Please enter valid email");
      return;
    }else if(!passwordPattern.test(password)){
      notifyErr("Password must have at least 8 characters, including uppercase, lowercase, digit, and special character.")
      return
    }

    //lets send data to server
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyErr(data.error);
        } else {
          notifySucess(data.success);
          navigate("/signin");
        }
      });
  };
  return (
    <div className="signUp">
      <div className="form-control">
        <div className="form">
          <img src={logo} alt="logo" className="signup-logo" />
          <p className="login-paragraph">
            Signup to see the photos and videos <br /> from your friends
          </p>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p
            className="login-paragraph"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up you agree to our Terms, <br /> Privecy policy and
            cookie policy.
          </p>
          <input
            type="submit"
            value="Sign Up"
            id="submit-btn"
            onClick={() => handlePost()}
          />
        </div>
      </div>
      <div className="form-two">
        Already have an account?
        <Link to={"/signin"}>
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
