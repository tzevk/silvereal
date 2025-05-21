'use client';
import { useState } from 'react';
import styles from '../styles/blob.module.css';

export default function Blob({ color, position, content }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={`${styles.blob} ${styles[position]}`}
      style={{ background: color }}
      onClick={() => setShowInfo(!showInfo)}
    >
      {showInfo && (
        <div className={styles.info}>
          {content}
        </div>
      )}
    </div>
  );
}