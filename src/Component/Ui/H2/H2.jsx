import React from 'react';
import styles from './H2.module.css';

const H2 = ({ text }) => {
  return (
    <div className={styles.container}>
      <span className={styles.arrow}>&lt;</span>
      <div className={styles.line}></div>
      <h2 className={styles.heading}>{text}</h2>
      <div className={styles.line}></div>
      <span className={styles.arrow}>&gt;</span>
    </div>
  );
};

export default H2;