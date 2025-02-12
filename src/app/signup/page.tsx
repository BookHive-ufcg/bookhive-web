"use client";

import Input from "@/components/Input";
import styles from "./signup.module.css";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    window.localStorage["isLoggedIn"] === "true"
  ) {
    router.push("/");
    return null;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Guarda o arquivo para envio posterior
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    // Criar objeto com os dados do usuário
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formData.get("dateOfBirth"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    // Criar novo FormData para envio
    const sendFormData = new FormData();

    // Adicionar os dados do usuário como JSON string
    sendFormData.append("userDTO", JSON.stringify(userData));

    // Adicionar a foto se existir
    if (imageFile) {
      sendFormData.append("profilePicture", imageFile);
    }

    try {
      const response = await fetch(`${url}/user`, {
        method: "POST",
        body: sendFormData, // O Content-Type será automaticamente definido como multipart/form-data
      });

      if (response.ok) {
        alert("Registrado com sucesso!");
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao registrar o usuário");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
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
            placeholder="Data de nascimento"
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

          <div className={styles.profilephoto}>
            {image ? (
              <Image
                src={image}
                alt="Profile"
                width={100}
                height={100}
                className={styles.profileimage}
              />
            ) : (
              <div className={styles.placeholder}>Upload Photo</div>
            )}
            <label htmlFor="profilephoto" className={styles.photolabel}>
              <Input
                type="file"
                id="profilephoto"
                name="profilephoto"
                className={styles.fileinput}
                label=""
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>

          <Button type="submit" className={styles.button}>
            {loading ? "Loading" : "Junte-se a nós"}
          </Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
