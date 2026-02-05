import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styles from "./ServiceCard.module.css";

const ServiceCard = ({ idx = 0, iconUrl, title, path, description }) => {
  const { t } = useTranslation();
  const serviceNumber = String(idx + 1).padStart(2, '0');

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.4) }}
    >
      <Link className={styles.cardLink} to={`/services/${path}`}>
        {/* Top Section with Icon */}
        <div className={styles.header}>
          <div className={styles.iconBox}>
            <img
              src={iconUrl}
              alt=""
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              className={styles.icon}
            />
          </div>
          <span className={styles.number}>{serviceNumber}</span>
        </div>

        {/* Accent Line */}
        <div className={styles.accent} />

        {/* Content */}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.ctaText}>
            {t("servicesPage.explore-more", "Explore More")}
          </span>
          <div className={styles.ctaIcon}>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ServiceCard;
