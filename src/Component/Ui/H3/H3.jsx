import styles from './H3.module.css';
import { motion } from 'framer-motion';

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.08
      }
    }
  },
  heading: {
    hidden: { y: 25, opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.8
      }
    }
  },
  underlineContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2 }
    }
  },
  underlineLeft: {
    hidden: { scaleX: 0, originX: 1 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.25
      }
    }
  },
  underlineRight: {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.25
      }
    }
  },
  dot: {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15,
        delay: 0.4
      }
    }
  }
};

export default function H3({ text, id, className = '' }) {
  return (
    <motion.div
      className={`${styles.container} ${className}`}
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h3
        id={id}
        className={styles.heading}
        variants={ANIMATION_VARIANTS.heading}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className={styles.headingText}>{text}</span>
        <span className={styles.headingGlow} aria-hidden="true" />
      </motion.h3>

      <motion.div
        className={styles.underlineContainer}
        variants={ANIMATION_VARIANTS.underlineContainer}
        aria-hidden="true"
      >
        <motion.div
          className={styles.underlineLeft}
          variants={ANIMATION_VARIANTS.underlineLeft}
        />
        <motion.div
          className={styles.dot}
          variants={ANIMATION_VARIANTS.dot}
        />
        <motion.div
          className={styles.underlineRight}
          variants={ANIMATION_VARIANTS.underlineRight}
        />
      </motion.div>
    </motion.div>
  );
}
