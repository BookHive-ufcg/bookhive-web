"use client";

import React from "react";
import Image from "next/image";
import styles from "./profile.module.css";

// Definindo um tipo específico para a prop 'size'
type ProfilePictureProps = {
  size: "small" | "large";
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({ size }) => {
  const profilePicture = "/img/profile-pic.jpg";
  const isLarge = size === "large"; // Define o tamanho com base na prop

  return (
    <div className={styles.profile}>
      <Image
        src={profilePicture}
        alt="Profile"
        className={`${styles.profilePicture} ${isLarge ? styles.large : styles.small}`} // Adiciona a classe baseada no tamanho
        width={isLarge ? 300 : 50}  // Largura ajustável
        height={isLarge ? 300 : 50} // Altura ajustável
      />
    </div>
  );
};

export default ProfilePicture;
