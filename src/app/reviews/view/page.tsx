'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Title from '@/components/Title';

export default function Reviews() {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    // Pega os dados do livro selecionado armazenados no localStorage
    const storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
      setBook(JSON.parse(storedBook));
    }
  }, []);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <main >
        <Title titleText="View Book" />
        <div className={styles.container}>
            <img
                className={styles.image}
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "/img/book-placeholder.png"
                }
                alt={book.volumeInfo.title}
                width={300} 
                height={400} 

            />
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{book.volumeInfo.title}</h1>
                <h2>{book.volumeInfo.authors?.join(', ')}</h2>
                <p className={styles.description}>
                  {book.volumeInfo.description}</p>
            </div>
        </div>
        <div className={styles.rightAlignedContainer}>
            <button className={styles.button}>Create review</button>
            <button className={styles.button}>See review</button>
        </div>

    </main>
);

}
