"use client";

import Input from "@/components/Input";
import styles from "./signup.module.css";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const url = process.env.BACK_END_URL || "http://localhost:8080";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const response = await fetch(url + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Signup successful!");
      router.push("/login");
    } else {
      setError("Signup failed");
    }

    setLoading(false);
  };

  return (
    <main>
      <div className={styles.signup}>
        <div className={styles.presentation}>
          <h1 className={styles.title}>
            Signup,
            <br />
            Bee a BookHiver!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.gridContainer}>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            label="First name"
            required
          />
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            label="Last name"
            required
          />
          <Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Date of birth"
            label="Date of birth"
            required
          />
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            label="Username"
            required
          />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
            required
          />
          <Button type="submit" className={styles.button}>
            {loading ? "Loading" : "Join us"}
          </Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
