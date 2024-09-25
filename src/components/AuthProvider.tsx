"use client";

import React from "react";
import { usePathname } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
