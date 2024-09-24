"use client";

import styles from "./login.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    if (result?.ok) {
      router.push("/");
      window.localStorage["isLoggedIn"] = true;
    } else {
      setError("Login failed");
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
