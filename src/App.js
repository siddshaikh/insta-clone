import "./App.css";
import Nav from "./components/navbar/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";
import Profile from "./components/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./components/create-post/CreatePost";
import Modal from "./components/modal/Modal";
import { useContext } from "react";
import { myContext } from "./context/LoginContex";
function App() {
  const { modalOpen } = useContext(myContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
        <ToastContainer theme="dark" />
        {modalOpen && <Modal />}
      </BrowserRouter>
    </div>
  );
}

export default App;
