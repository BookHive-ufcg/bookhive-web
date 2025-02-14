"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./page.module.css";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Image from "next/image";
import googleBooksService from "@/services/googleBooksService";

export default function Reviews() {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { bookId } = useParams();
  const router = useRouter();

  const handleCreateReview = (type: string) => {
    if (!book?.id) {
      console.error("ID do livro não encontrado!");
      return;
    }

    if (type === "create") {
      localStorage.setItem("bookIdForReview", book.id);
      router.push("/reviews/create");
    } else {
      router.push(`/reviews/book/${book.id}`);
    }
  };

  useEffect(() => {
    if (!bookId || Array.isArray(bookId)) {
      setError("ID do livro inválido!");
      setLoading(false);
      return;
    }

    googleBooksService
      .getBookById(bookId)
      .then((data) => {
        if (!data) {
          setError("Livro não encontrado.");
          setLoading(false);
          return;
        }
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar detalhes do livro.");
        console.error(err);
        setLoading(false);
      });
  }, [bookId]);

  if (loading) {
    return <p>Carregando detalhes do livro...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
            src={book.volumeInfo.imageLinks?.thumbnail || "/img/padrao.jpg"}
            alt={book.volumeInfo.title}
            width={300}
            height={400}
            className={styles.centerImage}
          />
          <div>
            <Button onClick={() => handleCreateReview("create")}>
              Criar resenha
            </Button>
            <Button onClick={() => handleCreateReview("see")}>
              Ver resenhas
            </Button>

            <ul className={styles.infoList}>
              <li className={styles.listItem}>
                <span>Editora: </span>
                {book.volumeInfo.publisher}
              </li>
              <li className={styles.listItem}>
                <span>Publicação: </span>
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
