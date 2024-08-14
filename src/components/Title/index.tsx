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
    <div>
      <h1>{titleText}</h1>
      <h3>{subTitleText}</h3>
    </div>
  );
}
