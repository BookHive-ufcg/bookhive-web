"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  let isLoggedIn = false;

  if (typeof window !== "undefined") {
    isLoggedIn = window.localStorage["isLoggedIn"] === "true";
  }

  useEffect(() => {
    const path = window.location.pathname;
    if (!isLoggedIn && path !== "/login" && path !== "/signup") {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default AuthProvider;
