"use client";

import React from "react";
import { usePathname } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Clear localStorage if the user pass more than 1 hour without acess the site
  if (typeof window !== "undefined") {
    const startTime = parseInt(window.localStorage["lastAccess"]) || 0;
    const currTime = Date.now();
    const difference = currTime - startTime;
    const oneHourInMillis = 60 * 60 * 1000;
    if (difference > oneHourInMillis) {
      localStorage.clear();
    }
    window.localStorage["lastAccess"] = Date.now().toString();
  }

  const pathname = usePathname();

  let isLoggedIn = false;

  if (typeof window !== "undefined") {
    isLoggedIn = window.localStorage["isLoggedIn"] === "true";
  }

  if (
    !isLoggedIn &&
    pathname !== "/login" &&
    pathname !== "/signup" &&
    typeof window !== "undefined"
  ) {
    window.location.href = "/login";
  }

  return <>{children}</>;
};

export default AuthProvider;
