import React from "react";
import Image from "next/image";
import AbelhaSvg from "./abelha.svg";
import AbelhaAmarelaSvg from "./abelhaAmarela.svg";
import styles from "./animation.module.css";

const Animation = ({
  selectedRating,
  setSelectedRating,
}: {
  selectedRating: number;
  setSelectedRating: (value: number) => void;
}) => {
  return (
    <div className={styles.columnsComponents}>
      <div className={styles.nameContainer}>
        <h2>Rating</h2>
      </div>
      <div className={styles.radioContainer}>
        {[5, 4, 3, 2, 1].map((r) => (
          <div key={r}>
            <input
              id={`rating-${r}`}
              type="radio"
              name="rating"
              value={r}
              className={styles.radioInput}
              checked={selectedRating === r}
              onChange={() => setSelectedRating(r)} // Atualiza diretamente o selectedRating
            />
            <label
              htmlFor={`rating-${r}`}
              className={styles.radioLabel}
              title={`${r} stars`}
              onClick={() => setSelectedRating(r)} // Alterna entre o valor clicado
            >
              <Image
                src={r <= selectedRating ? AbelhaAmarelaSvg : AbelhaSvg}
                alt="Abelha"
                height={20}
                width={20}
                className={styles.radioLabelImage}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animation;
