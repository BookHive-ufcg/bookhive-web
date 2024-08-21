"use client";

import React from "react";
import styles from "./profile.module.css";
import Image from "next/image";

const Profile = () => {
  const profilePicture = "/img/profile-pic.jpg";

  return (
    <div className={styles.profile}>
      <Image
        src={profilePicture}
        alt="Profile"
        className={styles.profilePicture}
        width={30}
        height={30}
      />
    </div>
  );
};

export default Profile;
