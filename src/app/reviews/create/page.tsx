"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Animation from "./Animation";
import DateFields from "./DateFields";
import Coments from "./Coments";
import styles from "./create-review.module.css";

const url = process.env.BACK_END_URL || "http://localhost:8080";

export default function CreateReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const bookId = localStorage.getItem("bookId"); // Obtendo o bookId do localStorage

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!rating || !startDate || !endDate || !comment || !bookId) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const reviewData = {
      username: "admin",
      bookId, // bookId vindo do localStorage
      startDate,
      endDate,
      rating,
      content: comment,
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
        router.push("/reviews"); // Redirecionar para a página de reviews após sucesso
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
    <div className={styles.container}>
      <h1>Create Review</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
     
        <Animation rating={rating} setRating={setRating} />


        <DateFields setStartDate={setStartDate} setEndDate={setEndDate} />


        <Coments comment={comment} setComment={setComment} />

        <button type="submit" className={styles.submitButton}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
