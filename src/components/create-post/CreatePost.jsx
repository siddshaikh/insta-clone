import React, { useEffect, useState } from "react";
import "./createPost.css";
import {toast} from 'react-toastify'
import {useNavigate} from "react-router-dom"

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    //saving post to mongo
    if (url) {
      fetch("http://localhost:5000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {if(data.error){
          toast.error(data.error)
        }else{
         toast.success("Successfuly posted!")
         navigate("/")
        }})
        .catch((err) => console.log(err));
    }
  }, [url]);
  //posting image to cloudinary
  const postData = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "siddeek");
    fetch("https://api.cloudinary.com/v1_1/siddeek/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };
  const defaultImageURL =
    "https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png";
  const [selectedImage, setSelectedImage] = useState(defaultImageURL);
  const loadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage();
    }
  };

  return (
    <div className="create-post">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create new post</h4>
        <button className="post-btn" onClick={postData}>
          Share
        </button>
      </div>
      {/* image preview */}
      <div className="main-div">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="preview"
            width={200}
            height={200}
            style={{ marginTop: "5px", borderRadius: "5px" }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://cdn.pixabay.com/photo/2023/07/23/14/15/man-8145174_1280.jpg"
              alt="user"
            />
            <h5>John Bhai</h5>
          </div>
        </div>
        <textarea
          type="text"
          placeholder="Write a caption..."
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default CreatePost;
