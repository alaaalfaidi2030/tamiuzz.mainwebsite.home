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
      {/* Background Effects */}
      <div className={style.bgEffects} aria-hidden="true">
        <div className={style.bgOrb1} />
        <div className={style.bgOrb2} />
        <div className={style.bgOrb3} />
      </div>

      {/* Main Content */}
      <div className={style.loadingContent}>
        {/* Logo Container with Ring */}
        <div className={style.logoContainer}>
          {/* Outer Ring */}
          <div className={style.logoRing} aria-hidden="true" />

          {/* Progress Arc */}
          <svg className={style.progressArc} viewBox="0 0 100 100" aria-hidden="true">
            <circle
              className={style.arcTrack}
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="2"
            />
            <circle
              className={style.arcProgress}
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Logo */}
          <img
            src={logoSrc}
            alt={t("company logo")}
            className={style.logo}
          />
        </div>

        {/* Loading Text */}
        <div className={style.textContainer}>
          <p className={style.loadingText}>
            {t("loading", "جاري التحميل")}
          </p>

          {/* Animated Dots */}
          <div className={style.loadingDots} aria-hidden="true">
            <span className={style.dot} />
            <span className={style.dot} />
            <span className={style.dot} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className={style.progressBar} aria-hidden="true">
          <div className={style.progressFill} />
        </div>
      </div>

      {/* Decorative Particles */}
      <div className={style.particles} aria-hidden="true">
        <span className={style.particle} />
        <span className={style.particle} />
        <span className={style.particle} />
        <span className={style.particle} />
        <span className={style.particle} />
      </div>
    </div>
  );
};

export default HomeLoading;
