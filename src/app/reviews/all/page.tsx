"use client";

import Title from "@/components/Title";
import { useEffect, useState } from "react";
import styles from "./all.module.css";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function ViewAllReviews() {
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        const response = await fetch(`${url}/user/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          return;
        }

        const result = await response.json();
        setUsername(result);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const storedBook = localStorage.getItem("selectedBook");

    if (storedBook) {
      const parsedBook = JSON.parse(storedBook);
      setBook(parsedBook);

      const fetchReviews = async () => {
        try {
          const response = await fetch(
            `${url}/reviews/book/${parsedBook.volumeInfo.isbn}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch reviews");
          }
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, []);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>No book selected.</p>;
  }

  return (
    <main>
      <div>
        <Title
          titleText={`Seeing reviews for ${book.volumeInfo.title}`}
          subTitleText=""
        />
        {reviews.length > 0 ? (
          <ul className={styles.reviewsList}>
            {reviews.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <p className={styles.username}>
                  {review.userNameUser.fullName}
                </p>
                <p className={styles.comment}>{review.content}</p>
                <p className={styles.rating}>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews found for this book.</p>
        )}
      </div>
    </main>
  );
}
