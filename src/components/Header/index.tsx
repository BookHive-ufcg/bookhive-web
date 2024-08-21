"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import Profile from "../Profile";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  const getTitle = () => {
    return (
      <Image
        src="/logo.svg"
        width={90}
        height={60}
        alt="Logo"
        className={styles.logo}
      />
    );
  };

  return (
    <header className={styles.header}>
      {pathname !== "/" && (
        <Link href="/">
          <button className={styles.backButton}>
            <Image src="/arrow.svg" alt="Back" width={40} height={40} />
          </button>
        </Link>
      )}
      <h1 className={styles.title}>{getTitle()}</h1>
      <Profile />
    </header>
  );
};

export default Header;
