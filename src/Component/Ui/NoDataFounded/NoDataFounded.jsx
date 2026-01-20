import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./NoDataFounded.module.css";

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
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
      {/* Decorative Background */}
      <div className={style.decorativeCircles} aria-hidden="true">
        <div className={style.circle1} />
        <div className={style.circle2} />
        <div className={style.circle3} />
      </div>

      {/* Icon */}
      <motion.div className={style.iconWrapper} variants={ANIMATION_VARIANTS.item}>
        <div className={style.iconBg}>
          <i className="fa-solid fa-inbox" aria-hidden="true" />
        </div>
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
            <i className="fa-solid fa-home" aria-hidden="true" />
            <span>{t("noData.goHome")}</span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NoDataFounded;
