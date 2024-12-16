"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import googleBooksService from "@/services/googleBooksService";
import Title from "@/components/Title";
import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    try {
      const data = await googleBooksService.searchBooks(query);
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleBookClick = (bookId: string | undefined) => {
    if (!bookId) {
      console.error("Book ID is undefined.");
      return;
    }
    router.push(`/reviews/view/${bookId}`);
  };

  return (
    <main>
      <div className={styles.container}>
        <Title
          titleText="Bem-vindo ao Bookhive!"
          subTitleText="Descubra mais sobre o mundo dos livros"
        />

        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder="Título, autor ou ISBN"
            onSearch={handleSearch}
          />

          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              <h2 className={styles.searchResultsTitle}>Resultados da Busca</h2>
              <div className={styles.bookGrid}>
                {searchResults.map((book: any) => (
                  <div
                    key={book.id}
                    className={styles.bookCard}
                    onClick={() => handleBookClick(book.id)}
                  >
                    <Image
                      src={
                        book.volumeInfo?.imageLinks?.thumbnail ||
                        "/img/padrao.jpg"
                      }
                      alt={book.volumeInfo?.title || "Capa do livro"}
                      className={styles.bookCover}
                      width={200}
                      height={300}
                    />
                    <div className={styles.bookInfo}>
                      <h3 className={styles.bookTitle}>
                        {book.volumeInfo?.title || "Título indisponível"}
                      </h3>
                      <p className={styles.bookAuthor}>
                        {book.volumeInfo?.authors?.join(", ") ||
                          "Autor desconhecido"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
