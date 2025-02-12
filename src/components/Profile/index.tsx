"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./profile.module.css";

type ProfilePictureProps = {
  size: "small" | "large";
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({ size }) => {
  const [profilePicture, setProfilePicture] = useState("/img/profile-pic.jpg");
  const [username, setUsername] = useState("");
  const isLarge = size === "large";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(window.localStorage["username"]);
    }
  }, []);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
    if (backendUrl) {
      setProfilePicture(`${backendUrl}/user/${username}/profilePicture`);
    }
  }, [username]);

  return (
    <div className={styles.profile}>
      <Image
        src={profilePicture}
        alt="Profile"
        className={`${styles.profilePicture} ${isLarge ? styles.large : styles.small}`}
        width={isLarge ? 300 : 50}
        height={isLarge ? 300 : 50}
        unoptimized // Adicionado para permitir URLs dinâmicas
      />
    </div>
  );
};

export default ProfilePicture;
