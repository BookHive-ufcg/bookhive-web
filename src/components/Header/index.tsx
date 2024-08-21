"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import Profile from "../Profile";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.backButtonContainer}>
        {pathname !== "/" && (
          <Link href="/">
            <button className={styles.backButton}>
              <Image src="/arrow.svg" alt="Back" width={20} height={30} />
            </button>
          </Link>
        )}
      </div>
      <Image
        src="/logo.svg"
        width={90}
        height={60}
        alt="Logo"
        className={styles.logo}
      />
      <Profile />
    </header>
  );
};

export default Header;
