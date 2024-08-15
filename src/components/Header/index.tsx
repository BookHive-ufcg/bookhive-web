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
      <Link href="/">
        <button className={styles.backButton}>
          &#x2190;
        </button>
      </Link>
      <h1 className={styles.title}>{getTitle()}</h1>
      <Profile/>
    </header>
  );
};

export default Header;
