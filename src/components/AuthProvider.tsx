"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const path = window.location.pathname;
  const router = useRouter();
  let isLoggedIn = false;

  if (typeof window !== "undefined") {
    isLoggedIn = window.localStorage["isLoggedIn"] === "true";
  }

  if (!isLoggedIn && path !== "/login" && path !== "/signup") {
    router.push("/login");
  }

  return <>{children}</>;
};

export default AuthProvider;
