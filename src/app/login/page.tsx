import styles from "./login.module.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
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
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  label="Username"
                />
              </div>
              <div className={styles.formGroup}>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  label="Password"
                />
              </div>

              <a className={styles.forgotPassword} href="#">
                Forgot your password?
              </a>

              <Button className={styles.button}>Login</Button>
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
