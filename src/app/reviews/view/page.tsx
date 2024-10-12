"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Title from "@/components/Title";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";

export default function Reviews() {
  const [book, setBook] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedBook = localStorage.getItem("selectedBook");
    // console.log(storedBook);
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
      <div className={styles.container}>
        <Title
          titleText={book.volumeInfo.title}
          subTitleText={"Autor: " + book.volumeInfo.authors?.join(", ")}
        />
        <div className={styles.rowOne}>
          <Image
            src={book.volumeInfo.imageLinks?.medium || "/img/padrao.jpg"}
            alt={book.volumeInfo.title}
            width={300}
            height={400}
          />
          <div>
            <Button onClick={() => handleCreateReview("create")}>
              Create review
            </Button>
            <Button onClick={() => handleCreateReview("see")}>
              See review
            </Button>

            <ul className={styles.infoList}>
              <li className={styles.listItem}>
                <span>Editora: </span>
                {book.volumeInfo.publisher}
              </li>
              <li className={styles.listItem}>
                <span>Publicação: </span>
                {book.volumeInfo.publishedDate}
              </li>
              <li className={styles.listItem}>
                <span>Idioma: </span>
                {book.volumeInfo.language}
              </li>
              <li className={styles.listItem}>
                <span>ISBN: </span>
                {book.volumeInfo.industryIdentifiers?.[1]?.identifier ||
                  book.volumeInfo.industryIdentifiers?.[0]?.identifier}
              </li>
            </ul>
          </div>
        </div>

        {book.volumeInfo.description && (
          <>
            <h2 className={styles.descriptionTitle}>Sinopse</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            />
          </>
        )}
      </div>
    </main>
  );
}
