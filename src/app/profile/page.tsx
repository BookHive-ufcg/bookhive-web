import ProfilePicture from '@/components/Profile';
import styles from './profile.module.css';

const books = [
  { id: 1, title: "Admirável Mundo Novo", image: "/img/crepusculo.jpg" },
  { id: 2, title: "1984", image: "/img/crepusculo.jpg" },
  { id: 3, title: "Fahrenheit 451", image: "/img/crepusculo.jpg" },
];

export default function Profile() {
  return (
    <main>
      <div className={styles.profileContainer}>
        <ProfilePicture size="large" />
        <div className={styles.textContainer}>
          <div className={styles.profileDescription}>Júlia</div>
          <div className={styles.profileText}>5 publicações</div>
        </div>
      </div>
      <div className={styles.booksContainer}>
        <h2 className={styles.booksTitle}>Minhas Publicações</h2>
        <div className={styles.bookList}>
          {books.map(book => (
            <div key={book.id} className={styles.bookItem}>
              <img src={book.image} alt={book.title} className={styles.bookImage} />
              <div className={styles.bookTitle}>{book.title}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}