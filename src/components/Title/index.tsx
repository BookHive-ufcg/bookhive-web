import React from "react";
import styles from "./title.module.css";

const booksNew = [
  { id: 1, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 2, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 3, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 4, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 5, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 6, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" }
];

const booksSearched = [
  { id: 1, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 2, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 3, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 4, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 5, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 6, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" }
];

interface BookSectionWithTitleProps {
  titleText: string;
  subTitleText: string;
}



const BookSectionWithTitle: React.FC<BookSectionWithTitleProps> = ({ titleText, subTitleText }) => {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleText}>{titleText}</h1>
      <h3 className={styles.subTitleText}>{subTitleText}</h3>

      <div className={styles.bookSection}>
  <h2 className={styles.bookSection}>What is new?</h2>
  <div className={styles.bookList}>
    {booksNew.map((book) => (
      <div key={book.id} className={styles.bookCard}>
        <img src={book.image} alt={book.title} />
      </div>
    ))}
  </div>

  <h2 className={styles.bookSection}>Most searched</h2>
  <div className={styles.bookList}>
    {booksSearched.map((book) => (
      <div key={book.id} className={styles.bookCard}>
        <img src={book.image} alt={book.title} />
      </div>
    ))}
  </div>
    
      </div>
    </div>
  );
};

export default BookSectionWithTitle;
