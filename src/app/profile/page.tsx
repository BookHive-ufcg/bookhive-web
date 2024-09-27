"use client";

import ProfilePicture from "@/components/Profile";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";

const books = [
  { id: 1, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 2, title: "1984", image: "/img/crepusculo.jpg" },
  { id: 3, title: "Fahrenheit 451", image: "/img/crepusculo.jpg" },
];

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

export default function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    firstName: "User not found",
    lastName: "",
  });
  const [reviews, setReviews] = useState([]);

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
      }
    };
    fetchReviews();
  }, [username]);

  return (
    <main>
      <div className={styles.profileContainer}>
        <ProfilePicture size="large" />
        <div className={styles.textContainer}>
          <div className={styles.profileDescription}>
            {user.firstName + " " + user.lastName}
          </div>
          <div className={styles.profileText}>{reviews.length} publicações</div>
        </div>
      </div>
      <div className={styles.booksContainer}>
        <h2 className={styles.booksTitle}>My publication</h2>
        <div className={styles.bookList}>
          {books.map((book) => (
            <div key={book.id} className={styles.bookItem}>
              <img
                src={book.image}
                alt={book.title}
                className={styles.bookImage}
              />
              <div className={styles.bookTitle}>{book.title}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
