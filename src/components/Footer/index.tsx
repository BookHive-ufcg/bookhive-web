import React from "react";
import { FaHome, FaBook, FaPlus, FaSearch, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <a href="/">
        <FaHome style={styles.icon} />
      </a>
      <FaBook style={styles.icon} />
      <FaPlus style={styles.icon} />
      <a href="/search">
        <FaSearch style={styles.icon} />
      </a>
      <a href="/profile">
        <FaUser style={styles.icon} />
      </a>
    </footer>
  );
}

const styles = {
  footer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: "10px 0",
    position: "fixed" as "fixed", // Tipagem específica para TypeScript
    bottom: 0,
    width: "100%",
  },
  icon: {
    color: "#ffdd4b", // Cor amarela para os ícones
    fontSize: "24px",
  },
};
