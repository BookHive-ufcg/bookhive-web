"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaBook, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={pathname === "/" ? styles.active : undefined}>
        <FaHome className={styles.icon} />
      </Link>
      <Link
        href="/reviews"
        className={pathname === "/reviews" ? styles.active : undefined}
      >
        <FaBook className={styles.icon} />
      </Link>
      <Link
        href="/reviews/create"
        className={pathname === "/reviews/create" ? styles.active : undefined}
      >
        <FaPlus className={styles.icon} />
      </Link>
      <Link
        href="/search"
        className={pathname === "/search" ? styles.active : undefined}
      >
        <FaSearch className={styles.icon} />
      </Link>
      <Link
        href="/profile"
        className={pathname === "/profile" ? styles.active : undefined}
      >
        <FaUser className={styles.icon} />
      </Link>
    </nav>
  );
}
