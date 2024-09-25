import React from 'react';

import Title from "@/components/Title";
import DateFields from "./DateFields";
import Coments from "./Coments";
import Animation from "./Animation";
import styles from "./page.module.css";

export default function CreateReview() {
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
