"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Animation from "./Animation";
import DateFields from "./DateFields";
import Coments from "./Coments";
import styles from "./page.module.css";
import Title from "@/components/Title";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function CreateReview() {
  const [loading, setLoading] = useState(false);
  const [bookId, setBookId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedBookId = localStorage.getItem("bookIdForReview");
    const storedUsername = localStorage.getItem("username");

    console.log(storedBookId);

    if (storedBookId) {
      setBookId(storedBookId);
    } else {
      router.push("/reviews/all");
    }

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setError("Usuário não logado");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !selectedRating ||
      !startDate ||
      !endDate ||
      !comment ||
      !bookId ||
      !username
    ) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    const reviewData = {
      bookIsbn: bookId,
      usernameUser: username,
      startDate,
      endDate,
      rating: selectedRating,
      content: comment,
      id: username + Date.now().toString(),
    };

    try {
      const response = await fetch(`${url}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      console.log(reviewData, "shsuhs");

      if (response.ok) {
        alert("Resenha adicionada com sucesso!");
        router.push(`/reviews/all/${bookId}`);
      } else {
        const result = await response.json();
        setError(result.message || "Erro ao submeter a resenha.");
      }
    } catch (err) {
      setError("Um erro ocorreu ao submeter a resenha.");
    }

    setLoading(false);
  };

  return (
    <main>
      <Title titleText="Resenha" subTitleText="Crie a melhor resenha" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <Animation
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
        <DateFields setStartDate={setStartDate} setEndDate={setEndDate} />
        <Coments comment={comment} setComment={setComment} />
        <button type="submit" className={styles.submit}>
          {loading ? "Submetendo..." : "Submeter resenha"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
