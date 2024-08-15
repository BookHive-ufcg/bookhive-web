"use client";

import React from "react";
import styles from "./profile.module.css";

const Profile = () => {
  const profilePicture = "/img/profile-pic.jpg"; 

  return (
    <div className={styles.profile}>
      <img src={profilePicture} alt="Profile" className={styles.profilePicture} />
    </div>
  );
};

export default Profile;
