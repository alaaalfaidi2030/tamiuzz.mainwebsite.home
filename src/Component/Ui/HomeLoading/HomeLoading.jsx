import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { isThemeModeContext } from "../../../Context/isThemeModeContext";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import style from "./HomeLoading.module.css";

const HomeLoading = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(isThemeModeContext);

  const logoSrc = isDarkMode ? whiteLogo : logo;

  return (
    <div
      className={style.loadingOverlay}
      role="status"
      aria-live="polite"
      aria-label={t("loading")}
    >
      <div className={style.loadingContent}>
        <img
          src={logoSrc}
          alt={t("company logo")}
          className={style.logo}
        />
        <div className={style.loadingDots} aria-hidden="true">
          <span className={style.dot} />
          <span className={style.dot} />
          <span className={style.dot} />
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;
