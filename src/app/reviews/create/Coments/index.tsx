import React from "react";
import styles from "./coments.module.css";

const Coments = () => {
    return(
    <div className={styles.comentsContainer}>
        <div className={styles.comentsFieldLabel}>
            <label>What did you think about the book?</label>
            <input
            required
            type='text'
            className={styles.comentsFieldInput}>
            </input>
        </div>
    </div>
    )
}


export default Coments;