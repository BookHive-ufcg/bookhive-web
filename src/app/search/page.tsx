import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";
import Image from "next/image";
import Link from "next/link";

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
        <SearchBar placeholder="Title, author or ISBN" width="100%" />
        <h1 className={styles.title}>Explore popular genres</h1>

        <ul className={styles.genresList}>
          {genres.map((genre) => (
            <li key={genre} className={styles.genreItem}>
              <Link href="#">
                <Image
                  src={`/img/genres/${genre}.png`}
                  alt="Biography"
                  width={165}
                  height={213}
                />
                <p>{genre}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
