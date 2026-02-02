import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./Breadcrumb.module.css";

/**
 * Breadcrumb Component - Provides visual breadcrumb navigation
 * @param {Array} items - Array of {label, path} objects
 * @param {string} currentPage - The current page label (last item, not clickable)
 */
const Breadcrumb = ({ items = [], currentPage }) => {
  const { t } = useTranslation();

  return (
    <nav className={style.breadcrumb} aria-label={t("breadcrumb", "التنقل")}>
      <ol className={style.breadcrumbList}>
        {/* Home link always first */}
        <li className={style.breadcrumbItem}>
          <Link to="/" className={style.breadcrumbLink}>
            <i className="fa-solid fa-house" aria-hidden="true" />
            <span>{t("home", "الرئيسية")}</span>
          </Link>
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => (
          <li key={index} className={style.breadcrumbItem}>
            <span className={style.separator} aria-hidden="true">
              <i className="fa-solid fa-chevron-left" />
            </span>
            <Link to={item.path} className={style.breadcrumbLink}>
              {item.label}
            </Link>
          </li>
        ))}

        {/* Current page (not clickable) */}
        {currentPage && (
          <li className={style.breadcrumbItem}>
            <span className={style.separator} aria-hidden="true">
              <i className="fa-solid fa-chevron-left" />
            </span>
            <span className={style.breadcrumbCurrent} aria-current="page">
              {currentPage}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
