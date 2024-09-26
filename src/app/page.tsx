'use client';

import { useRouter } from 'next/navigation'; // Certifique-se de estar usando o 'useRouter' correto
import { useState } from 'react';
import googleBooksService from "@/services/googleBooksService";
import Title from '@/components/Title';
import SearchBar from '@/components/SearchBar';
import styles from './search.module.css'


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

  const handleChange = async (id: string) => {
    try {
      // Busca os dados do livro pelo ID
      const book = await googleBooksService.getBookById(id);

      // Armazena os dados do livro no localStorage (opcional, pode usar context ou outros métodos)
      localStorage.setItem('selectedBook', JSON.stringify(book));

      // Redireciona para a página de reviews/view
      router.push('/reviews/view');
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  return (
    <main>
      <Title
        titleText="Welcome to Bookhive!"
        subTitleText={"Discover more about book's world"}
      />

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
                <div
                  key={book.id}
                  className={styles.bookCard}
                  onClick={() => handleChange(book.id)} // Chamando handleChange com o ID do livro
                >
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
