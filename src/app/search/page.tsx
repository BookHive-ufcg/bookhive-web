"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import googleBooksService from "@/services/googleBooksService";

const genres = [
  "biography",
  "classic",
  "detective",
  "fantasy",
  "horror",
  "poems",
  "romance",
  "sciencefiction",
];

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    try {
      const data = await googleBooksService.searchBooks(query);
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <main>
      <div className={styles.searchBarContainer}>
        <h1 className={styles.title}>Explore popular genres</h1>
        <ul className={styles.genresList}>
          {genres.map((genre) => (
            <li key={genre} className={styles.genreItem}>
              <Link href="#">
                <Image
                  src={`/img/genres/${genre}.png`}
                  alt={genre}
                  width={165}
                  height={213}
                />
                <p className={styles.genreName}>{genre}</p>
              </Link>
            </li>
          ))}
        </ul>

        <SearchBar
          placeholder="Title, author or ISBN"
          onSearch={handleSearch}
        />

        {searchResults.length > 0 && (
          <div className={styles.searchResults}>
            <h2 className={styles.searchResultsTitle}>Search Results</h2>
            <div className={styles.bookGrid}>
              {searchResults.map((book: any) => (
                <div key={book.id} className={styles.bookCard}>
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "/img/book-placeholder.png"
                    }
                    alt={book.volumeInfo.title}
                    className={styles.bookCover}
                  />
                  <div className={styles.bookInfo}>
                    <h3 className={styles.bookTitle}>
                      {book.volumeInfo.title}
                    </h3>
                    <p className={styles.bookAuthor}>
                      {book.volumeInfo.authors?.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*
        <hr />
        <h1 className={styles.title}>Search books by emotion</h1>
        <div className={styles.emotionSearchContainer}>
          <form>
            <Input
              type="text"
              id="emotion"
              placeholder="Type your emotion"
              label="Emotion"
            />
            <Input
              type="text"
              id="bookTitle"
              placeholder="Book title"
              label="Book title"
            />
            <div className={styles.buttonContainer}>
              <Button>Search</Button>
            </div>
          </form>
        </div>
        */}
      </div>
    </main>
  );
}
