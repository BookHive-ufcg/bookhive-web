import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";

export default function Search() {
  return (
    <main>
      <div className={styles.searchBarContainer}>
        <SearchBar placeholder="Title, author or ISBN" width="100%" />
      </div>
    </main>
  );
}
