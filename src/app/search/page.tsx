import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";

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
  return (
    <main>
      <div className={styles.searchBarContainer}>
        <SearchBar placeholder="Title, author or ISBN" />
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
      </div>
    </main>
  );
}
