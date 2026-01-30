import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./NoDataFounded.module.css";

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  },
};

const NoDataFounded = ({ message, showHomeButton = true }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={style.noDataContainer}
      role="status"
      aria-live="polite"
      initial="hidden"
      animate="visible"
      variants={ANIMATION_VARIANTS.container}
    >
      {/* Floating Decorative Shapes */}
      <motion.div
        className={style.floatingShape1}
        animate={{
          y: [0, -25, 0],
          x: [0, 18, 0],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={style.floatingShape2}
        animate={{
          y: [0, 28, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={style.floatingShape3}
        animate={{
          y: [0, -20, 0],
          rotate: [0, -6, 0]
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Icon */}
      <motion.div className={style.iconWrapper} variants={ANIMATION_VARIANTS.item}>
        <motion.div
          className={style.iconBg}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <div className={style.iconGlow} />
          <motion.i
            className="fa-solid fa-inbox"
            aria-hidden="true"
            variants={{
              rest: { scale: 1, rotate: 0 },
              hover: {
                scale: 1.15,
                rotate: 360,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 12
                }
              }
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div className={style.content} variants={ANIMATION_VARIANTS.item}>
        <h3 className={style.title}>{t("noData.title")}</h3>
        <p className={style.message}>{message || t("noData.message")}</p>
      </motion.div>

      {/* Action Button */}
      {showHomeButton && (
        <motion.div className={style.actions} variants={ANIMATION_VARIANTS.item}>
          <Link to="/" className="btn-web btn-web-primary">
            <motion.i
              className="fa-solid fa-home"
              aria-hidden="true"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span>{t("noData.goHome")}</span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NoDataFounded;
