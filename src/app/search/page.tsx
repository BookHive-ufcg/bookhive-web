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
        "Por favor, insira tanto o gênero quanto o título do livro.",
      );
      return;
    }

    try {
      const response = await fetch(
        `${url}/recommend/${selectedGenre}/${bookTitle}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar livros: ${response.status}`);
      }

      const text = await response.text();

      if (text != "") {
        setSelectedBook(text);
        setShowModal(true);
      } else {
        setShowModal(true);
        setSelectedBook("Nenhum livro encontrado.");
      }
    } catch (error) {
      // Tratamento de erro para erros como 400, 404, ou outros
      console.error("Erro ao buscar livros:", error);
      setShowModal(true);
      setSelectedBook(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro desconhecido.",
      );
    }
  };

  return (
    <main>
      <div className={styles.searchBarContainer}>
        <h1 className={styles.title}>Gere uma recomendação</h1>
        <div className={styles.genreSearchContainer}>
          <form onSubmit={handleSearch} className={styles.genreSearchForm}>
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
              <button
                onClick={() => setShowModal(false)}
                className={styles.closeButton}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
