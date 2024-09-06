import { FiSearch } from "react-icons/fi";
import styles from "./profile.module.css";

type SearchBarProps = {
  placeholder?: string;
  width?: number;
};

export default function SearchBar({
  placeholder,
  width = 600,
}: SearchBarProps) {
  return (
    <div style={{ width }} className={styles.searchBar}>
      <FiSearch className={styles.icon} />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
}
