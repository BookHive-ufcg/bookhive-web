"use client";

import Title from "@/components/Title";
import { useEffect, useState } from "react";
import styles from "./all.module.css";

// Aqui vai ser o livro do banco de dados, pode ser capturado com book.id
const bookDB = {
  id: "978-1-56619-909-4",
  reviews: [
    {
      id: "1",
      username: "Lewis Hamilton",
      book_id: "978-1-56619-909-4",
      rating: 5,
      comment:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It",
    },
    {
      id: "2",
      username: "Ayrton Senna",
      book_id: "978-1-56619-909-4",
      rating: 4,
      comment: "I loved it!",
    },
  ],
};

export default function ViewAllReviews() {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const storedBook = localStorage.getItem("selectedBook");
    if (storedBook) {
      setBook(JSON.parse(storedBook));
    }
  }, []);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <main>
      <div>
        <Title
          titleText={`Seeing reviews for ${book.volumeInfo.title}`}
          subTitleText=""
        />
        <ul className={styles.reviewsList}>
          {bookDB.reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              {/* Add link to the user page? */}
              <p className={styles.username}>{review.username}</p>{" "}
              <p className={styles.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
