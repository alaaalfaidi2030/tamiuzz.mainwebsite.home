import styles from './H2.module.css';
import { motion } from 'framer-motion';

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.06
      }
    }
  },
  arrowLeft: {
    hidden: { opacity: 0, x: -30, rotate: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  },
  arrowRight: {
    hidden: { opacity: 0, x: 30, rotate: 15 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  },
  line: {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
    }
  },
  heading: {
    hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.8 }
    }
  },
  glow: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3 }
    }
  }
};

const H2 = ({ text, textColorWhite, id }) => {
  return (
    <motion.div
      className={styles.container}
      variants={ANIMATION_VARIANTS.container}
      style={{
        '--heading-color-H2-component': textColorWhite ? "white" : "var(--primary-color)"
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background glow effect */}
      <motion.div
        className={styles.glowEffect}
        variants={ANIMATION_VARIANTS.glow}
        aria-hidden="true"
      />

      <motion.span
        className={styles.arrow}
        variants={ANIMATION_VARIANTS.arrowLeft}
        whileHover={{ scale: 1.2, x: -5 }}
        transition={{ type: 'spring', stiffness: 400 }}
        aria-hidden="true"
      >
        &lt;
      </motion.span>

      <motion.div className={styles.lineWrapper}>
        <motion.div
          className={styles.line}
          variants={ANIMATION_VARIANTS.line}
          aria-hidden="true"
        />
        <motion.div
          className={styles.lineDot}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          aria-hidden="true"
        />
      </motion.div>

      <motion.h2
        id={id}
        className={styles.heading}
        variants={ANIMATION_VARIANTS.heading}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className={styles.headingText}>{text}</span>
        <span className={styles.headingShimmer} aria-hidden="true" />
      </motion.h2>

      <motion.div className={styles.lineWrapper}>
        <motion.div
          className={styles.lineDot}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          aria-hidden="true"
        />
        <motion.div
          className={styles.line}
          variants={ANIMATION_VARIANTS.line}
          aria-hidden="true"
        />
      </motion.div>

      <motion.span
        className={styles.arrow}
        variants={ANIMATION_VARIANTS.arrowRight}
        whileHover={{ scale: 1.2, x: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
        aria-hidden="true"
      >
        &gt;
      </motion.span>
    </motion.div>
  );
};

export default H2;
