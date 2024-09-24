"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLoggedIn = (globalThis as unknown as CustomGlobalThis).isLoggedIn;

  useEffect(() => {
    const path = window.location.pathname;
    if (
      !(globalThis as unknown as CustomGlobalThis).isLoggedIn &&
      path !== "/login" &&
      path !== "/signup"
    ) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default AuthProvider;
