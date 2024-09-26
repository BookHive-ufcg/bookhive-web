'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import Title from "@/components/Title";
import DateFields from "./DateFields";
import Coments from "./Coments";
import Animation from "./Animation";
import styles from "./page.module.css";

export default function CreateReview() {
  const [bookId, setBookId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {

    const storedBookId = localStorage.getItem('bookIdForReview');
    if (storedBookId) {
      setBookId(storedBookId);
    } else {

      router.push('/reviews/view');
    }
  }, [router]);

  const handleReviewSubmit = () => {
    console.log("Creating review for book ID:", bookId);
  };

  if (!bookId) {
    return <p>Loading...</p>;
  }

  return <main>
    <Title titleText="Review" subTitleText="Create the best review" />
    <form>
        <DateFields></DateFields>
        <Animation></Animation>
        <Coments></Coments>
        <input type='submit' value='Submit review' className={styles.submit}></input>
    </form>
        <h1>teste</h1>
  </main>;
}
