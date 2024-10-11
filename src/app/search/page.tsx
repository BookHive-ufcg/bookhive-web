"use client";

import { useEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./search.module.css";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

interface Book {
  title: string;
  author: string;
}

export default function Search() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([
    "Fiction",
    "Non-Fiction",
    "Romance",
    "Mystery",
    "Thriller",
    "Fantasy",
    "Science Fiction",
    "Biography",
    "History",
    "Self-help",
    "Children's",
    "Young Adult",
    "Horror",
    "Adventure",
    "Drama",
    "Poetry",
  ]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [filteredGenres, setFilteredGenres] = useState<string[]>(genres);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedGenre(value);

    const filtered = genres.filter((genre) =>
      genre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGenres(filtered);

    if (!filtered.includes(value) && value !== "") {
      setFilteredGenres([value, ...filtered]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target as Node | null)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGenre || !bookTitle) {
      setShowModal(true);
      setSelectedBook(
        "Por favor, insira tanto o gênero quanto o título do livro."
      );
      return;
    }

    try {
      const response = await fetch(
        `${url}/recommend/${selectedGenre}/${bookTitle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text();
      console.log("Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        setShowModal(true);
        setSelectedBook(text);
        return;
      }

      if (data.items && data.items.length > 0) {
        setSelectedBook(data.items[0]);
        setShowModal(true);
      } else {
        setShowModal(true);
        setSelectedBook("Nenhum livro encontrado.");
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setShowModal(true);
      setSelectedBook("Ocorreu um erro ao buscar os livros.");
    }
  };

  return (
    <main>
      <div className={styles.searchBarContainer}>
        <h1 className={styles.title}>Search books by genre</h1>
        <div className={styles.genreSearchContainer}>
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              id="genre"
              placeholder="Type your genre"
              label="Genre"
              value={selectedGenre}
              onChange={handleInputChange}
              onFocus={() => setShowOptions(true)}
            />
            <Input
              type="text"
              id="title"
              placeholder="Book title"
              label="Book title"
              value={bookTitle}
              onChange={handleTitleChange}
            />
            <div className={styles.buttonContainer}>
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Resultado da Busca</h2>
              <p>
                {typeof selectedBook === "string"
                  ? selectedBook
                  : `Título: ${selectedBook?.title}, Autor: ${selectedBook?.author}`}
              </p>
              <button onClick={() => setShowModal(false)}>Fechar</button>
            </div>
          </div>
        )}
        <div style={{ padding: "20px" }}>
          <h1>Selecione ou Adicione um Gênero</h1>
          <div ref={inputRef}>
            <input
              type="text"
              placeholder="Digite para filtrar ou adicionar"
              value={selectedGenre}
              onChange={handleInputChange}
              onFocus={() => setShowOptions(true)}
              style={{
                width: "300px",
                padding: "10px",
                fontSize: "16px",
                marginBottom: "10px",
              }}
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
                  width: "300px",
                  zIndex: 10,
                }}
              >
                {filteredGenres.map((genre, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedGenre(genre);
                      setShowOptions(false);
                    }}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedGenre === genre ? "#f0f0f0" : "#fff",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div>
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map((book, index) => (
                <li key={index}>
                  <p>{book.title}</p>
                  <p>{book.author}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
