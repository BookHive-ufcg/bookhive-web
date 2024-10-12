"use client";

import Input from "@/components/Input";
import styles from "./signup.module.css";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function Signup() {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const response = await fetch(`${url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Registrado com sucesso!");
      router.push("/login");
    } else {
      setError("Erro ao registrar o usuário");
    }

    setLoading(false);
  };

  return (
    <main>
      <div className={styles.signup}>
        <div className={styles.presentation}>
          <h1 className={styles.title}>
            Inscreva-se,
            <br />
            Bee a BookHiver!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.gridContainer}>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Primeiro nome"
            label="Primeiro nome"
            required
          />
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Sobrenome"
            label="Sobrenome"
            required
          />
          <Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Data de nasscimento"
            label="Data de nascimento"
            required
          />
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Nome de usuário"
            label="Nome de usuário"
            required
          />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            label="Senha"
            required
          />
          <Button type="submit" className={styles.button}>
            {loading ? "Loading" : "Junte-se a nós"}
          </Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
