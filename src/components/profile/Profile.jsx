import React, { useEffect, useState } from "react";
import "./profile.css";
const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((respone) => respone.json())
      .then((res) => setMyPosts(res));
  }, []);
  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            src="https://cdn.pixabay.com/photo/2023/07/23/14/15/man-8145174_1280.jpg"
            alt="profil-pic"
            height={200}
            width={200}
          />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h2 style={{ marginLeft: "5px" }}>John Bhai</h2>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>22 Posts</p>
            <p style={{ marginLeft: "5px" }}>69 followers</p>
            <p style={{ marginLeft: "5px" }}>69 following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
      {/* gallery */}
      <div className="gallery">
        {myPosts && myPosts.length
          ? myPosts.map((Element) => <img  key={Element._id} src={Element.photo} alt="pics" />)
          : <span>Loading...</span>}
      </div>
    </div>
  );
};

export default Profile;
