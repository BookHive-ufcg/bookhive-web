import { FiSearch } from "react-icons/fi";
import styles from "./search-bar.module.css";
import { useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <FiSearch className={styles.icon} />
      <input
        type="search"
        placeholder={placeholder}
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
