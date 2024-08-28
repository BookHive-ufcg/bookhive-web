import { FiSearch } from "react-icons/fi";
import styles from "./profile.module.css";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <FiSearch className={styles.icon} />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
}
