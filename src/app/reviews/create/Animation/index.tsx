"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './animation.module.css';
import AbelhaSvg from './abelha.svg';
import AbelhaAmarelaSvg from './abelhaAmarela.svg';

const Animation = () => {
  const [selectedRating, setSelectedRating] = useState('');

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(event.target.value);
  };

  return (
    <div className={styles.columnsComponents}>
      <div className={styles.nameContainer}>
        <h2>Rating</h2>
      </div>
    <div className={styles.radioContainer}>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating}>
          <input
            id={`rating-${rating}`}
            type="radio"
            name="rating"
            value={rating}
            className={styles.radioInput}
            checked={selectedRating === rating.toString()}
            onChange={handleRatingChange}
          />
          <label 
            htmlFor={`rating-${rating}`} 
            className={styles.radioLabel} 
            title={`${rating} stars`}
            onClick={() => {
              setSelectedRating(selectedRating === rating.toString() ? '' : rating.toString());
            }}
          >
            <Image
              src={rating <= Number(selectedRating) ? AbelhaAmarelaSvg : AbelhaSvg}
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
