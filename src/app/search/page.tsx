"use client";

import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/SearchBar";
import styles from "./search.module.css";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import googleBooksService from "@/services/googleBooksService";

const genres = [
  "biography",
  "classic",
  "detective",
  "fantasy",
  "horror",
  "poems",
  "romance",
  "sciencefiction",
];

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    try {
      const data = await googleBooksService.searchBooks(query);
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const [emotions, setEmotions] = useState([
    "Alegria",
    "Tristeza",
    "Raiva",
    "Medo",
    "Surpresa",
    "Nojo",
    "Ansiedade",
    "Frustração",
    "Esperança",
    "Alívio",
    "Culpa",
    "Vergonha",
    "Gratidão",
    "Orgulho",
    "Solidão",
    "Empatia",
    "Amor",
    "Ciúmes",
    "Confusão",
    "Euforia",
  ]);

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [filteredEmotions, setFilteredEmotions] = useState(emotions);
  const [showOptions, setShowOptions] = useState(false); // Estado para controlar a visibilidade
  const inputRef = useRef<HTMLInputElement>(null);

  // Função para lidar com a mudança no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedEmotion(value);

    const filtered = emotions.filter((emotion) =>
      emotion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmotions(filtered);

    // Adiciona a nova emoção à lista filtrada, se não estiver presente
    if (!filtered.includes(value) && value !== "") {
      setFilteredEmotions([value, ...filtered]);
    }
  };

  // Função para detectar clique fora e fechar as opções
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

  return (
    <main>
      <div className={styles.searchBarContainer}>
        <h1 className={styles.title}>Search books by emotion</h1>
        <div className={styles.emotionSearchContainer}>
          <form>
            <Input
              type="text"
              id="emotion"
              placeholder="Type your emotion"
              label="Emotion"
            />
            <Input
              type="text"
              id="bookTitle"
              placeholder="Book title"
              label="Book title"
            />
            <div className={styles.buttonContainer}>
              <Button>Search</Button>
            </div>
          </form>
        </div>

        <div style={{ padding: "20px" }}>
          <h1>Selecione ou Adicione uma Emoção</h1>
          <div ref={inputRef}>
            <input
              type="text"
              placeholder="Digite para filtrar ou adicionar"
              value={selectedEmotion}
              onChange={handleInputChange}
              onFocus={() => setShowOptions(true)} // Mostrar opções ao focar
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
                {filteredEmotions.map((emotion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedEmotion(emotion);
                      setShowOptions(false);
                    }}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedEmotion === emotion ? "#f0f0f0" : "#fff",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {emotion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
