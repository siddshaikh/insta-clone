import React, { useContext } from "react";
import "./nav.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { myContext } from "../../context/LoginContex";
const Nav = () => {
  const { userLogin, setModalOpen } = useContext(myContext);
  const modalHandler = () => {
    setModalOpen(true);
  };

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (userLogin || token) {
      return [
        <>
          <Link to={""}>
            <button
              className="primaryBtn"
              onClick={modalHandler}
              style={{ display: !token && "none" }}
            >
              Log Out
            </button>
          </Link>
          <Link to={"/profile"}>
            <li>Profile</li>
          </Link>
          <Link to={"/createpost"}>
            <li>Create post</li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to={"/signup"}>
            <li>SignUp</li>
          </Link>
          <Link to={"/signin"}>
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };
  return (
    <div className="nav">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div>
        <ul className="nav-list">{loginStatus()}</ul>
      </div>
    </div>
  );
};

export default Nav;
