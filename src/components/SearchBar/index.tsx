import { FiSearch } from "react-icons/fi";
import styles from "./search-bar.module.css";

type SearchBarProps = {
  placeholder?: string;
  width?: string;
};

export default function SearchBar({ placeholder, width }: SearchBarProps) {
  return (
    <div style={{ width }} className={styles.searchBar}>
      <FiSearch className={styles.icon} />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
}
