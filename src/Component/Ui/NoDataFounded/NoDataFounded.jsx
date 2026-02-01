import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./NoDataFounded.module.css";

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      },
    },
  },
  float: {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

const NoDataFounded = ({ message, showHomeButton = true }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={style.wrapper}
      role="status"
      aria-live="polite"
      initial="hidden"
      animate="visible"
      variants={ANIMATION_VARIANTS.container}
    >
      {/* Gradient Orbs Background */}
      <div className={style.orbsContainer}>
        <motion.div
          className={style.orb1}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={style.orb2}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={style.orb3}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Glass Card */}
      <motion.div
        className={style.glassCard}
        variants={ANIMATION_VARIANTS.item}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
      >
        {/* Floating Icon Container */}
        <motion.div
          className={style.iconContainer}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Layered 3D Icon */}
          <div className={style.iconLayers}>
            <div className={style.iconLayer3} />
            <div className={style.iconLayer2} />
            <div className={style.iconLayer1}>
              <i className="fa-solid fa-box-open" aria-hidden="true" />
            </div>
          </div>

          {/* Reflection */}
          <div className={style.iconReflection} />
        </motion.div>

        {/* Content */}
        <motion.div className={style.content} variants={ANIMATION_VARIANTS.item}>
          <h3 className={style.title}>{t("noData.title")}</h3>
          <p className={style.message}>{message || t("noData.message")}</p>
        </motion.div>

        {/* Decorative Lines */}
        <div className={style.decorLines}>
          <span />
          <span />
          <span />
        </div>

        {/* Action Button */}
        {showHomeButton && (
          <motion.div className={style.actions} variants={ANIMATION_VARIANTS.item}>
            <Link to="/" className={style.glassButton}>
              <span className={style.buttonGlow} />
              <i className="fa-solid fa-home" aria-hidden="true" />
              <span>{t("noData.goHome")}</span>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Particles */}
      <div className={style.particles}>
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className={style.particle}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NoDataFounded;
