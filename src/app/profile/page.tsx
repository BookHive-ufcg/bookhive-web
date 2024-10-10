"use client";

import ProfilePicture from "@/components/Profile";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import googleBooksService from "@/services/googleBooksService"; // Importar o serviço

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    firstName: "User not found",
    lastName: "",
  });
  const [reviews, setReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState({});

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

        // Mapeia os ISBNs dos livros das resenhas para buscar os detalhes
        const bookRequests = result
          .filter((review) => review.bookIsbn?.isbn)
          .map((review) => {
            const isbn = review.bookIsbn.isbn;
            console.log("ISBN being processed:", isbn);
            return googleBooksService.getBookById(isbn); // Usando a função do serviço
          });

        const bookResponses = await Promise.all(bookRequests);

        console.log(bookResponses, "Book responses after reviews");

        const booksMap = {};
        result.forEach((review, index) => {
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
      {/* User Profile */}
      <div className={styles.profileContainer}>
        <ProfilePicture size="large" />
        <div className={styles.textContainer}>
          <div className={styles.profileDescription}>
            {user.firstName + " " + user.lastName}
          </div>
          <div className={styles.profileText}>{reviews.length} publicações</div>
        </div>
      </div>

      {/* User's Reviews */}
      <div className={styles.reviewsContainer}>
        <h2 className={styles.reviewsTitle}>Minhas Resenhas</h2>
        <ul className={styles.reviewsList}>
          {reviews.map((review) => {
            const isbn = review.bookIsbn?.isbn;
            const bookInfo = bookDetails[isbn] || {};

            console.log(`Rendering review for ISBN: ${isbn}`, bookInfo);

            return (
              <li key={review.id} className={styles.reviewItem}>
                <div className={styles.bookInfo}>
                  <Image
                    src={bookInfo.image || "/img/book-placeholder.png"}
                    alt={bookInfo.title || "Livro sem título"}
                    className={styles.bookImage}
                    width={60}
                    height={90}
                    priority
                  />
                  <div className={styles.bookDetails}>
                    <p className={styles.bookTitle}>
                      {bookInfo.title || "Título não disponível"}
                    </p>
                    <p className={styles.rating}>Rating: {review.rating}</p>
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
