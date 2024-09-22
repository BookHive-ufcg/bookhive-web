import { FiSearch } from "react-icons/fi";
import styles from "./search-bar.module.css";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <FiSearch className={styles.icon} />
      <input type="search" placeholder={placeholder} className={styles.input} />
    </div>
  );
}
