"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const router = useRouter();
  let isLoggedIn = false;

  if (typeof window !== "undefined") {
    isLoggedIn = window.localStorage["isLoggedIn"] === "true";
  }

  if (!isLoggedIn && pathname !== "/login" && pathname !== "/signup") {
    router.push("/login");
  }

  return <>{children}</>;
};

export default AuthProvider;
