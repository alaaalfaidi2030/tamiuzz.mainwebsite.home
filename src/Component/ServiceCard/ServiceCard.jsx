import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./ServiceCard.module.css";

const ServiceCard = ({ idx = 0, imageUrl, iconUrl, title, path, description }) => {
  const { t } = useTranslation();

  return (
    <Link className={styles.ServiceCard} to={`/services/${path}`}>
      <div className={styles.imageWrapper}>
        <img
          src={iconUrl}
          alt=""
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <span className={styles.link}>
          {t("read more")}
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
