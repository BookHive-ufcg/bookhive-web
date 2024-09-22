
import React from "react";
import styles from "./date-fields.module.css";

const DateFields = () => {
  return (
    <div className={styles.dateFieldsContainer}>
      <div className={styles.dateFieldGroup}>
        <label className={styles.dateFieldLabel} htmlFor="startDate">
          Start Date
        </label>
        <input
          required
          id="startDate"
          type="text"
          placeholder="dd/mm/yyyy"
          className={styles.dateFieldInput}
        />
      </div>

      <div className={styles.dateFieldGroup}>
        <label className={styles.dateFieldLabel} htmlFor="endDate">
          End Date
        </label>
        <input
          id="endDate"
          type="text"
          placeholder="dd/mm/yyyy"
          className={styles.dateFieldInput}
        />
      </div>
    </div>
  );
};

export default DateFields;
