"use client";

import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import Profile from "../Profile";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  
  const pathname = usePathname();

  const router = useRouter() ?? null;

  if (pathname === "/login") {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.backButtonContainer}>
        {pathname !== "/" && (
          <button onClick={() => router.back()} className={styles.backButton}>
            <Image src="/arrow.svg" alt="Back" width={20} height={30} />
          </button>
        )}
      </div>
      <Image
        src="/logo.svg"
        width={90}
        height={60}
        alt="Logo"
        className={styles.logo}
      />
      {pathname !== "/login" && pathname !== "/signup" && <Profile />}
      {(pathname === "/login" || pathname === "/signup") && <div />}
    </header>
  );
};

export default Header;
