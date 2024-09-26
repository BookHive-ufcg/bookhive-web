"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import googleBooksService from "@/services/googleBooksService";

import BookSection from "@/components/BookSection";
import Title from "@/components/Title";

export default function Home() {
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
      <Title
        titleText="Welcome to Bookhive!"
        subTitleText={"Discover more about book's world"}
      />
      {/* <BookSection></BookSection> */}

      <div className={styles.searchBarContainer}>
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
      </div>
    </main>
  );
}
