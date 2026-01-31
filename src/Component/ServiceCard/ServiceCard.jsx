import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styles from "./ServiceCard.module.css";

const ServiceCard = ({ idx = 0, iconUrl, title, path, description }) => {
  const { t } = useTranslation();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
        delay: Math.min(idx * 0.1, 0.5),
      },
    },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.12,
      rotate: -4,
      transition: { type: "spring", stiffness: 300, damping: 12 },
    },
  };

  const glowVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 15 } },
  };

  const lineVariants = {
    rest: { scaleX: 0 },
    hover: { scaleX: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover="hover"
      animate="rest"
    >
      <Link className={styles.ServiceCard} to={`/services/${path}`}>
        {/* Decorative corner accent */}
        <div className={styles.cornerAccent} />

        {/* Icon section */}
        <div className={styles.iconSection}>
          <motion.div className={styles.iconGlow} variants={glowVariants} />
          <motion.div className={styles.iconWrapper} variants={iconVariants}>
            <img
              src={iconUrl}
              alt={`${title} Service Icon`}
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </motion.div>
          <motion.div className={styles.accentLine} variants={lineVariants} />
        </div>

        {/* Content section */}
        <div className={styles.content}>
          <h4 className={styles.title}>{title}</h4>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <span className={styles.link}>
            {t("read more")}
            <motion.span className={styles.linkArrow} variants={arrowVariants}>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
