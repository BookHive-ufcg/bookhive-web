"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfilePicture from "@/components/Profile";
import styles from "./profile.module.css";
import googleBooksService from "@/services/googleBooksService";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

interface User {
  firstName: string;
  lastName: string;
}

interface BookDetails {
  title: string;
  image: string;
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User>({
    firstName: "User not found",
    lastName: "",
  });
  const [reviews, setReviews] = useState<any[]>([]);
  const [bookDetails, setBookDetails] = useState<{
    [key: string]: BookDetails;
  }>({});

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

        const bookRequests: Promise<any>[] = result
          .filter((review: any) => review.bookIsbn?.isbn)
          .map((review: any) => {
            const isbn = review.bookIsbn.isbn;
            console.log("ISBN being processed:", isbn);
            return googleBooksService.getBookById(isbn);
          });

        const bookResponses = await Promise.all(bookRequests);

        console.log(bookResponses, "Book responses after reviews");

        const booksMap: { [key: string]: BookDetails } = {};
        result.forEach((review: any, index: number) => {
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
            const bookInfo: BookDetails | undefined = bookDetails[isbn || ""];

            return (
              <li key={review.id} className={styles.reviewItem}>
                <div className={styles.bookInfo}>
                  <Image
                    src={bookInfo?.image || "/img/book-placeholder.png"}
                    alt={bookInfo?.title || "Livro sem título"}
                    className={styles.bookImage}
                    width={60}
                    height={90}
                    priority
                  />
                  <div className={styles.bookDetails}>
                    <p className={styles.bookTitle}>
                      {bookInfo?.title || "Título não disponível"}
                    </p>
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
