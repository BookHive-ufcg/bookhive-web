import React, { useEffect, useRef, useState, InputHTMLAttributes } from "react";
import styles from "./input.module.css";

type GenreInputProps = {
  label: string;
  genres: string[];
  onSelect: (genre: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const GenreInput = ({ label, genres, onSelect, ...props }: GenreInputProps) => {
  const [filteredGenres, setFilteredGenres] = useState<string[]>(genres);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedGenre(value);

    const filtered = genres.filter((genre) =>
      genre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGenres(filtered);

    setShowOptions(value !== "" && filtered.length > 0);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    onSelect(genre); // Ensure this is called correctly
    setShowOptions(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        value={selectedGenre}
        onChange={handleInputChange}
        onFocus={() => setShowOptions(true)}
        {...props}
      />
      {showOptions && (
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: 0,
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            position: "absolute",
            width: "100%",
            zIndex: 10,
          }}
        >
          {filteredGenres.map((genre, index) => (
            <li
              key={index}
              onClick={() => handleGenreSelect(genre)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: selectedGenre === genre ? "#f0f0f0" : "#fff",
                borderBottom: "1px solid #ccc",
              }}
            >
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenreInput;
