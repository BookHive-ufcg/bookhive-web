"use client";

import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./all.module.css";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function ViewAllReviews() {
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { bookId } = useParams();

  useEffect(() => {
    if (!bookId) {
      setLoading(false); // Mesmo sem ID, o design carrega vazio.
      return;
    }

    const fetchBookAndReviews = async () => {
      try {
        const bookResponse = await fetch(`${url}/books/${bookId}`);
        const bookData = bookResponse.ok ? await bookResponse.json() : null;
        setBook(bookData);

        const reviewsResponse = await fetch(`${url}/reviews/book/${bookId}`);
        const reviewsData = reviewsResponse.ok
          ? await reviewsResponse.json()
          : [];
        setReviews(reviewsData);
      } catch {
        // Falhas serão silenciosas, para não interromper o design.
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndReviews();
  }, [bookId]);

  if (loading) {
    return <p>Carregando detalhes do livro...</p>;
  }

  return (
    <main>
      <div>
        {/* Se os detalhes do livro estiverem ausentes, renderiza um título padrão */}
        <Title
          titleText={book?.volumeInfo?.title || "Detalhes do Livro"}
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
