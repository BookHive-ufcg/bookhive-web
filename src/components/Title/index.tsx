import React from "react";
import styles from "./title.module.css";
import BookSection from "../BookSection";

type TitleProps = {
  titleText: string;
  subTitleText: string;
};

export default function Title({ titleText, subTitleText }: TitleProps) {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleText}>{titleText}</h1>
      <h3 className={styles.subTitleText}>{subTitleText}</h3>
    </div>
  );
}
