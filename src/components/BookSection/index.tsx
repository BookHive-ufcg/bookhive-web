import styles from "./bookSection.module.css";

const booksNew = [
  { id: 1, title: "Admirável Mundo Novo", image: "/admiravel_mundo_novo.jpg" },
  { id: 2, title: "Admirável Mundo Novo", image: "/admiravel_mundo_novo.jpg" },
  { id: 3, title: "Admirável Mundo Novo", image: "/admiravel_mundo_novo.jpg" },
  { id: 4, title: "Admirável Mundo Novo", image: "/admiravel_mundo_novo.jpg" },
];

const booksSearched = [
  { id: 1, title: "Orgulho e Preconceito", image: "/orgulho_preconceito.jpg" },
  { id: 2, title: "Orgulho e Preconceito", image: "/orgulho_preconceito.jpg" },
  { id: 3, title: "Orgulho e Preconceito", image: "/orgulho_preconceito.jpg" },
];

export default function BookSection() {
  return (
    <div className={styles.bookSection}>
      <h2>What is new?</h2>
      <div className={styles.bookList}>
        {booksNew.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <img src={book.image} alt={book.title} />
          </div>
        ))}
      </div>

      <h2>Most searched</h2>
      <div className={styles.bookList}>
        {booksSearched.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <img src={book.image} alt={book.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
