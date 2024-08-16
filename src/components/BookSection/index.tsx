import styles from "./booksection.module.css";
import Image from 'next/image';




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


export default function BookSection() {
 return (
   <div className={styles.bookSection}>
   <h2 className={styles.bookSection}>What is new?</h2>
   <div className={styles.bookList}>
     {booksNew.map((book) => (
       <div key={book.id} className={styles.bookCard}>
         <Image src={book.image} alt={book.title} width={200} height={300} />
       </div>
     ))}
   </div>


   <h2 className={styles.bookSection}>Most searched</h2>
   <div className={styles.bookList}>
     {booksSearched.map((book) => (
       <div key={book.id} className={styles.bookCard}>
         <Image src={book.image} alt={book.title} width={200} height={300} />
       </div>
     ))}
   </div>
   </div>
 );
}
