import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import styles from "./LanguageDropdown.module.css";

const LANGUAGES = [
  { code: "ar", label: "العربية", short: "AR" },
  { code: "en", label: "English", short: "EN" },
];

const LanguageDropdown = () => {
  const { t } = useTranslation();
  const currentLang = i18n.resolvedLanguage;

  const handleLanguageChange = useCallback(async (languageCode) => {
    if (currentLang === languageCode) return;
    await i18n.changeLanguage(languageCode);
    window.location.reload();
  }, [currentLang]);

  return (
    <div
      className={styles.toggle}
      role="radiogroup"
      aria-label={t("select language")}
    >
      {LANGUAGES.map((lang) => {
        const isActive = currentLang === lang.code;
        return (
          <button
            key={lang.code}
            className={`${styles.option} ${isActive ? styles.optionActive : ""}`}
            onClick={() => handleLanguageChange(lang.code)}
            role="radio"
            lang={lang.code}
            aria-checked={isActive}
            aria-label={lang.label}
            data-label={lang.label}
            type="button"
          >
            <span className={styles.langCode}>{lang.short}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageDropdown;
