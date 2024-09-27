import React from "react";
import styles from "./coments.module.css";

const Coments = ({
  comment,
  setComment,
}: {
  comment: string;
  setComment: (value: string) => void;
}) => {
  return (
    <div className={styles.comentsContainer}>
      <div className={styles.comentsFieldLabel}>
        <label>What did you think about the book?</label>
        <input
          required
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.comentsFieldInput}
        />
      </div>
    </div>
  );
};

export default Coments;
