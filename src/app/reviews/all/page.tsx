"use client";

import Title from "@/components/Title";
import { useEffect, useState } from "react";
import styles from "./all.module.css";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function ViewAllReviews() {
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBook = localStorage.getItem("selectedBook");

    if (storedBook) {
      const parsedBook = JSON.parse(storedBook);
      setBook(parsedBook);

      const fetchReviews = async () => {
        try {
          const response = await fetch(`${url}/reviews/book/${parsedBook.id}`);
          if (!response.ok) {
            throw new Error("Falha ao recuperar resenhas");
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
    return <p>Carregando detalhes do livro...</p>;
  }

  if (!book) {
    return <p>Nenhum livro selecionado.</p>;
  }

  console.log(reviews);

  return (
    <main>
      <div>
        <Title
          titleText={`Resenhas de ${book.volumeInfo.title}`}
          subTitleText=""
        />
        {reviews.length > 0 ? (
          <ul className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.userData}>
                  <strong className={styles.username}>
                    {review.userNameUser.fullName}
                    <hr />
                  </strong>
                  <br />
                  <p>
                    <strong>Nota: </strong>
                    {review.rating}
                  </p>
                  <p>{review.endDate}</p>
                </div>
                <p className={styles.comment}>{review.content}</p>
              </div>
            ))}
          </ul>
        ) : (
          <p>Este livro ainda não possui resenhas.</p>
        )}
      </div>
    </main>
  );
}
