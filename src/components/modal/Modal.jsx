import React, { useContext } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { myContext } from "../../context/LoginContex";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const { setModalOpen } = useContext(myContext);
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5>Confirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <RiCloseLine />
          </button>
          {/* modal content */}
          <div className="modalContent">Are you really want to log out?</div>
          <div className="modalActions">
            <div className="actionContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  setModalOpen(false);
                  localStorage.clear();
                  navigate("/signin");
                }}
              >
                Log Out
              </button>
              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
