import React from "react";
import "./User.css";
function User() {
  return (
    <div className="user">
      <img
        className="user__avatarIcon"
        src="https://www.lubigelindia.com/files/catalog/About/s3.jpg"
        alt="profile-avatar"
      />
      <p className="user__name">Random User</p>
    </div>
  );
}

export default User;
