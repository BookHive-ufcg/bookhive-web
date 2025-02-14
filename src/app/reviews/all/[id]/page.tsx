"use client";

import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import googleBooksService from "@/services/googleBooksService";
import styles from "./all.module.css";

const url = String(process.env.NEXT_PUBLIC_BACK_END_URL);

interface Review {
  id: string;
  rating: number;
  content: string;
  endDate?: string;
  userNameUser?: {
    fullName: string;
  };
  bookIsbn?: string;
}

interface BookDetail {
  title: string;
  image: string;
}

export default function ViewAllReviews() {
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookDetails, setBookDetails] = useState<Record<string, BookDetail>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  const { bookId } = useParams();

  console.log(bookId, "meu livro");

  useEffect(() => {
    if (!bookId) {
      console.log("Nenhum bookId encontrado.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Iniciando fetch para bookId:", bookId);

        const [bookResponse, reviewsResponse] = await Promise.all([
          fetch(`${url}/books/${bookId}`),
          fetch(`${url}/reviews/book/${bookId}`),
        ]);

        console.log("Respostas recebidas. Status:", {
          bookResponse: bookResponse.status,
          reviewsResponse: reviewsResponse.status,
        });

        const bookData = bookResponse.ok ? await bookResponse.json() : null;
        console.log("Dados do livro recebidos:", bookData);
        setBook(bookData);

        const reviewsData = reviewsResponse.ok
          ? await reviewsResponse.json()
          : [];
        console.log("Dados das resenhas recebidos:", reviewsData);
        setReviews(reviewsData);

        const bookRequests = reviewsData
          .filter((review: any) => review.bookIsbn)
          .map((review: any) =>
            googleBooksService.getBookById(review.bookIsbn!)
          );

        const bookResponses = await Promise.all(bookRequests);
        console.log("Respostas da API do Google Books:", bookResponses);

        const booksMap: Record<string, BookDetail> = {};
        reviewsData.forEach((review: any, index: any) => {
          const isbn = review.bookIsbn;
          if (isbn) {
            const volumeInfo = bookResponses[index]?.volumeInfo || {};
            const { title = "Título não disponível", imageLinks = {} } =
              volumeInfo;
            booksMap[isbn] = {
              title,
              image: imageLinks.thumbnail || "/img/padrao.jpg",
            };
          }
        });

        console.log("Mapa de livros construído:", booksMap);
        setBookDetails(booksMap);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
        console.log("Finalizado o fetch para bookId:", bookId);
      }
    };

    fetchData();
  }, [bookId]);

  if (loading) {
    return <p>Carregando detalhes do livro...</p>;
  }

  return (
    <main>
      <div>
        <Title
          titleText={book?.volumeInfo?.title || "Detalhes do Livro"}
          subTitleText=""
        />
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <ul className={styles.reviewsList}>
            {reviews.map((review) => {
              const isbn = review.bookIsbn;
              const bookInfo = isbn ? bookDetails[isbn] : undefined;
              const title = bookInfo ? bookInfo.title : "Título não disponível";
              const image = bookInfo
                ? bookInfo.image
                : "/img/book-placeholder.png";

              return (
                <li key={review.id} className={styles.reviewItem}>
                  <div className={styles.bookInfo}>
                    <Image
                      src={image}
                      alt={title}
                      className={styles.bookImage}
                      width={150}
                      height={200}
                      priority
                    />
                    <div className={styles.bookDetails}>
                      <p className={styles.bookTitle}>{title}</p>
                      <p>
                        <strong>Nota: </strong>
                        {review.rating || "Sem nota"}
                      </p>
                      <p>
                        <strong>Usuário: </strong>
                        {review?.userNameUser?.fullName ||
                          "Usuário desconhecido"}
                      </p>
                      <p>
                        <strong>Data: </strong>
                        {review.endDate || "Data não disponível"}
                      </p>
                      <p className={styles.comment}>
                        {review.content || "Sem comentário"}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Este livro ainda não possui resenhas.</p>
        )}
      </div>
    </main>
  );
}
