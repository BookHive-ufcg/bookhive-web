"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfilePicture from "@/components/Profile";
import Bee from "@/components/Bee";
import styles from "./profile.module.css";
import googleBooksService from "@/services/googleBooksService";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

interface Review {
  rating: number;
  id: string;
  content: string;
  bookIsbn?: {
    isbn: string;
  };
}

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookDetails, setBookDetails] = useState<Record<string, BookDetail>>(
    {},
  );

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

        const bookRequests = result
          .filter((review: Review) => review.bookIsbn?.isbn)
          .map((review: Review) => {
            const isbn = review.bookIsbn?.isbn;
            if (isbn) {
              return googleBooksService.getBookById(isbn);
            }
            return null;
          })
          .filter((request: any) => request !== null);

        const bookResponses = await Promise.all(bookRequests);

        const booksMap: Record<string, BookDetail> = {};
        result.forEach((review: Review, index: number) => {
          const isbn = review.bookIsbn?.isbn;

          if (isbn) {
            const volumeInfo = bookResponses[index]?.volumeInfo || {};
            const { title = "Título não disponível", imageLinks = {} } =
              volumeInfo;
            booksMap[isbn] = {
              title,
              image: imageLinks.thumbnail || "/img/padrao.jpg",
            };
          }
        });

        setBookDetails(booksMap);
      }
    };

    fetchReviews();
  }, [username]);

  return (
    <main>
      <div className={styles.profileContainer}>
        <ProfilePicture size="large" />
        <div className={styles.userName}>
          {user.firstName + " " + user.lastName}
        </div>
        <div className={styles.publications}>{reviews.length} publicações</div>
        <div></div>
        <div className={styles.main}>
          <div className={styles.profileContainer}></div>
          <div className={styles.reviewsContainer}>
            <h2 className={styles.reviewsTitle}>Minhas Resenhas</h2>
            <ul className={styles.reviewsList}>
              {reviews.map((review) => {
                const isbn = review.bookIsbn?.isbn;
                const bookInfo = isbn ? bookDetails[isbn] : undefined;

                const title = bookInfo
                  ? bookInfo.title
                  : "Título não disponível";
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
                        width={150}
                        height={200}
                        priority
                      />
                      <div className={styles.bookDetails}>
                        <p className={styles.bookTitle}>{title}</p>
                        <p className={styles.rating}>
                          <Bee
                            count={review.rating}
                            className={styles.beeIcon}
                          />
                        </p>
                        <p className={styles.commentLabel}>Comentário:</p>
                        <p className={styles.comment}>{review.content}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
