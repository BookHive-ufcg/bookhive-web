"use client";

import styles from "./login.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    window.localStorage["isLoggedIn"] === "true"
  ) {
    router.push("/");
    return null;
  }

  console.log(url);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // TODO: REMOVE THIS
    if (username === "admin" && password === "admin") {
      router.push("/");
      window.localStorage["isLoggedIn"] = true;
      return;
    }
    // -----------------

    const response = await fetch(`${url}/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      setError("User not found");
      setLoading(false);
      return;
    }
    const result = await response.json();

    if (result.username === username && result.password === password) {
      router.push("/");
      window.localStorage["isLoggedIn"] = true;
    } else {
      setError("Password is incorrect");
    }

    setLoading(false);
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContent}>
            <Image
              src="/logo.svg"
              width={300}
              height={200}
              alt="Logo"
              className={styles.logo}
            />
          </div>

          <p className={styles.description}>Join us and find your honeycomb</p>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.rightContent}>
            <h1 className={styles.title}>Sign in to BookHive</h1>
            <p className={styles.subTitle}>Use your username and password</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  label="Username"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  label="Password"
                  required
                />
              </div>

              <a className={styles.forgotPassword} href="#">
                Forgot your password?
              </a>

              <Button type="submit" className={styles.button}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <div className={styles.separator}>
              <span>New Here?</span>
            </div>

            <Link href="/signup">
              <Button className={styles.button} variant="secondary">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
