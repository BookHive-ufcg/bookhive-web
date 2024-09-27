import React from "react";
import styles from "./date-fields.module.css";

const DateFields = ({
  setStartDate,
  setEndDate,
}: {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}) => {
  return (
    <div className={styles.dateFieldsContainer}>
      <div className={styles.dateFieldGroup}>
        <label className={styles.dateFieldLabel} htmlFor="startDate">
          Start Date
        </label>
        <input
          required
          id="startDate"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.dateFieldInput}
        />
      </div>

      <div className={styles.dateFieldGroup}>
        <label className={styles.dateFieldLabel} htmlFor="endDate">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.dateFieldInput}
        />
      </div>
    </div>
  );
};

export default DateFields;

