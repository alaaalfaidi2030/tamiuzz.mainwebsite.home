import React from 'react';
import styles from './H2.module.css';
import { motion } from 'framer-motion';

const H2 = ({ text, textColorWhite }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } },
    exit: { opacity: 0, x: -20 }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { scaleX: 0 }
  };

  const headingVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      style={{
        // change value of the main color for the heading
        '--heading-color-H2-component': textColorWhite ? "white" : "var(--primary-color)"
      }}
      initial="hidden"
      whileInView="visible"
      animate="visible"
      viewport={{ once: true, amount: 0.2 }} // Adjust when the animation should trigger
    >
      <motion.span className={styles.arrow} variants={arrowVariants}>&lt;</motion.span>
      <motion.div className={styles.line} variants={lineVariants}></motion.div>
      <motion.h2 className={styles.heading} variants={headingVariants}>{text}</motion.h2>
      <motion.div className={styles.line} variants={lineVariants}></motion.div>
      <motion.span
        className={styles.arrow}
        variants={{
          ...arrowVariants,
          hidden: { opacity: 0, x: 20 },
          exit: { opacity: 0, x: 20 }
        }}
      >&gt;</motion.span>
    </motion.div>
  );
};

export default H2;
