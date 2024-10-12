"use client";

import { useEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./search.module.css";
import GenreInput from "@/components/GenreInput";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

interface Book {
  title: string;
  author: string;
}

export default function Search() {
  const [genres] = useState<string[]>([
    "Ficção",
    "Não Ficção",
    "Romance",
    "Mistério",
    "Suspense",
    "Fantasia",
    "Ficção Científica",
    "Biografia",
    "História",
    "Autoajuda",
    "Infantil",
    "Jovem Adulto",
    "Terror",
    "Aventura",
    "Drama",
    "Poesia",
    "Ação",
  ]);

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };

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
            <GenreInput
              label="Gênero Literário"
              genres={genres}
              onSelect={(genre: any) => setSelectedGenre(genre)}
              placeholder="Gênero Literário"
            />
            <Input
              type="text"
              id="title"
              placeholder="Título do Livro"
              label="Título do Livro"
              value={bookTitle}
              onChange={handleTitleChange}
            />
            <div className={styles.buttonContainer}>
              <Button type="submit">Buscar</Button>
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
      </div>
    </main>
  );
}
