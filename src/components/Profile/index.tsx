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
  const [showDropdown, setShowDropdown] = useState(false);
  const isLarge = size === "large";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(window.localStorage["username"]);
    }
  }, []);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
    if (backendUrl && username) {
      setProfilePicture(`${backendUrl}/user/${username}/profilePicture`);
    }
  }, [username]);

  const handleLogout = () => {
    // Lógica para sair da aplicação (ex: limpar o localStorage e redirecionar)
    window.localStorage.clear();
    window.location.href = "/login"; // Redireciona para a página de login
  };

  return (
    <div
      className={styles.profile}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <Image
        src={profilePicture}
        alt="Profile"
        className={`${styles.profilePicture} ${
          isLarge ? styles.large : styles.small
        }`}
        width={isLarge ? 300 : 50}
        height={isLarge ? 300 : 50}
        unoptimized
      />
      {showDropdown && (
        <div className={styles.dropdownMenu}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair da aplicação
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
