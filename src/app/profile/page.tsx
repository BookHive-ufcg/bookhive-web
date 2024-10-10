"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfilePicture from "@/components/Profile";
import styles from "./profile.module.css";
import googleBooksService from "@/services/googleBooksService";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

// Definindo a interface para o objeto de Review
interface Review {
  id: string;
  content: string;
  bookIsbn?: {
    isbn: string;
  };
}

// Definindo o tipo do objeto de detalhes do livro
interface BookDetail {
  title: string;
  image: string;
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    firstName: "User not found",
    lastName: "",
  });
  const [reviews, setReviews] = useState<Review[]>([]); // Usando a interface Review
  const [bookDetails, setBookDetails] = useState<Record<string, BookDetail>>(
    {}
  ); // Definindo o tipo aqui

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(window.localStorage["username"]);
    }
  }, []);

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
        console.log(result, "User data fetched");
        setUser(result);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (username) {
        const response = await fetch(`${url}/reviews/user/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          return;
        }

        const result = await response.json();
        setReviews(result);
        console.log(result, "Reviews fetched");

        // Filtrar as requisições dos livros
        const bookRequests = result
          .filter((review: Review) => review.bookIsbn?.isbn)
          .map((review: Review) => {
            const isbn = review.bookIsbn?.isbn;
            if (isbn) {
              console.log("ISBN being processed:", isbn);
              return googleBooksService.getBookById(isbn);
            }
            return null; // Retorna null se isbn for undefined
          })
          .filter((request: any) => request !== null); // Remove os nulls

        const bookResponses = await Promise.all(bookRequests);

        console.log(bookResponses, "Book responses after reviews");

        const booksMap: Record<string, BookDetail> = {};
        result.forEach((review: Review, index: number) => {
          const isbn = review.bookIsbn?.isbn;

          if (isbn) {
            const volumeInfo = bookResponses[index]?.volumeInfo || {};
            const { title = "Título não disponível", imageLinks = {} } =
              volumeInfo;
            booksMap[isbn] = {
              title,
              image: imageLinks.thumbnail || "/img/book-placeholder.png",
            };
            console.log(`Book details for ISBN ${isbn}:`, booksMap[isbn]);
          }
        });

        console.log("Books Map:", booksMap);
        setBookDetails(booksMap);
      }
    };

    fetchReviews();
  }, [username]);

  return (
    <main className={styles.main}>
      <div className={styles.profileContainer}>
        <ProfilePicture size="large" />
        <div className={styles.textContainer}>
          <div className={styles.profileDescription}>
            {user.firstName + " " + user.lastName}
          </div>
          <div className={styles.profileText}>{reviews.length} publicações</div>
        </div>
      </div>
      <div className={styles.reviewsContainer}>
        <h2 className={styles.reviewsTitle}>Minhas Resenhas</h2>
        <ul className={styles.reviewsList}>
          {reviews.map((review) => {
            const isbn = review.bookIsbn?.isbn;
            const bookInfo = isbn ? bookDetails[isbn] : undefined; // Aqui definimos bookInfo como undefined se isbn não existir.

            // Use valores padrão para evitar acessar propriedades de um objeto indefinido.
            const title = bookInfo ? bookInfo.title : "Título não disponível";
            const image = bookInfo
              ? bookInfo.image
              : "/img/book-placeholder.png";

            return (
              <li key={review.id} className={styles.reviewItem}>
                <div className={styles.bookInfo}>
                  <Image
                    src={image}
                    alt={title}
                    className={styles.bookImage}
                    width={60}
                    height={90}
                    priority
                  />
                  <div className={styles.bookDetails}>
                    <p className={styles.bookTitle}>{title}</p>
                  </div>
                </div>
                <p className={styles.comment}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
