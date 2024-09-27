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
  const [selectedRating, setSelectedRating] = useState<number>(0); // Certifique-se que é um número
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedBookId = localStorage.getItem("bookIdForReview");
    if (storedBookId) {
      setBookId(storedBookId);
    } else {
      router.push("/reviews/view");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Verificação de campos obrigatórios
    if (!selectedRating || !startDate || !endDate || !comment || !bookId) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    let username = "";

    if (typeof window !== "undefined") {
      username = window.localStorage["username"];
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

      if (response.ok) {
        router.push("/reviews"); // Redirecionar após sucesso
      } else {
        const result = await response.json();
        setError(result.message || "Failed to submit the review.");
      }
    } catch (err) {
      setError("An error occurred while submitting the review.");
    }

    setLoading(false);
  };

  return (
    <main>
      <Title titleText="Review" subTitleText="Create the best review" />
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Componente de avaliação */}
        <Animation
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />

        {/* Campos de data */}
        <DateFields setStartDate={setStartDate} setEndDate={setEndDate} />

        {/* Campo de comentários */}
        <Coments comment={comment} setComment={setComment} />

        {/* Botão de submissão */}
        <button type="submit" className={styles.submit}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {/* Exibe erros, se houver */}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
