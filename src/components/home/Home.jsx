import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
// import { post } from "../../../../back-end/routes/auth";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    //fetching all posts from the server
    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      }).catch(err=>console.log({Error:err}))
  };
  
  const unLikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      }).catch(err=>console.log({Error:err}))
  };
  return (
    <div className="home">
      {/* card */}
      {data.map((data) => {
        return (
          <div className="card">
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://cdn.pixabay.com/photo/2023/07/23/14/15/man-8145174_1280.jpg"
                  alt={"JOHN"}
                />
                <h5>{data.postedBy.name}</h5>
              </div>
            </div>
            {/* card post */}
            <div className="card-post">
              <img src={data.photo} alt="post" />
            </div>
            {/* card content */}
            <div className="content">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  likePost(data);
                }}
              >
                favorite
              </span>
              <span
                className="material-symbols-outlined material-symbols-outlined-red"
                onClick={() => {
                  unLikePost(data);
                }}
              >
                favorite
              </span>
              <p>1 like</p>
              <p>This is Amazing</p>
            </div>
            {/* comments */}
            <div className="add-comments">
              <span className="material-symbols-outlined">mood</span>
              <input type="text" placeholder="Add a comment..." />
              <button className="comment">Post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
