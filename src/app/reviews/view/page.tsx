"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Title from "@/components/Title";
import { useRouter } from "next/navigation";

export default function Reviews() {
  const [book, setBook] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedBook = localStorage.getItem("selectedBook");
    console.log(storedBook, "meu livro");
    if (storedBook) {
      setBook(JSON.parse(storedBook));
    }
  }, []);

  const handleCreateReview = (type: string) => {
    if (book) {
      localStorage.setItem("bookIdForReview", book.id);
      if (type === "create") {
        router.push("/reviews/create");
      } else {
        router.push("/reviews/all");
      }
    }
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <main>
      <Title titleText="View Book" subTitleText="" />
      <div className={styles.container}>
        <img
          className={styles.image}
          src={
            book.volumeInfo.imageLinks?.thumbnail || "/img/book-placeholder.png"
          }
          alt={book.volumeInfo.title}
          width={300}
          height={400}
        />
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{book.volumeInfo.title}</h1>
          <h2>{book.volumeInfo.authors?.join(", ")}</h2>
          <p className={styles.description}>{book.volumeInfo.description}</p>
        </div>
      </div>
      <div className={styles.rightAlignedContainer}>
        <button
          className={styles.button}
          onClick={() => handleCreateReview("create")}
        >
          Create review
        </button>
        <button
          className={styles.button}
          onClick={() => handleCreateReview("see")}
        >
          See review
        </button>
      </div>
    </main>
  );
}
