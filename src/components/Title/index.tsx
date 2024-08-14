import React from "react";

import styles from "./title.module.css";

export default function Title({
  titleText,
  subTitleText,
}: {
  titleText: string;
  subTitleText: string;
}) {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleText}>{titleText}</h1>
      <h3 className={styles.subTitleText}>{subTitleText}</h3>
    </div>
  );
}
