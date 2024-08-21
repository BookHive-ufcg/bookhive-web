"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import Profile from "../Profile";

const Header = () => {
  const pathname = usePathname();

  const getTitle = () => {
    return <img src="/img/logotipo.png" alt="Logo" className={styles.logo} />;
  };

  return (
    <header className={styles.header}>
      {pathname !== "/" && (
        <Link href="/">
          <button className={styles.backButton}>
            <img
              src="/img/seta-esq.png"
              alt="Back"
              className={styles.backIcon}
            />
          </button>
        </Link>
      )}
      <h1 className={styles.title}>{getTitle()}</h1>
      <Profile />
    </header>
  );
};

export default Header;
