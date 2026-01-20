import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import styles from "./LanguageDropdown.module.css";

const LANGUAGES = [
  { code: "ar", label: "اللغة العربية", badge: "ع" },
  { code: "en", label: "English", badge: "E" },
];

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const currentLang = i18n.resolvedLanguage;

  const handleLanguageChange = useCallback(async (languageCode) => {
    if (currentLang === languageCode) return;
    setIsOpen(false);
    await i18n.changeLanguage(languageCode);
    window.location.reload();
  }, [currentLang]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("select language")}
        type="button"
      >
        <i className="fa-solid fa-globe" aria-hidden="true" />
        <span className={styles.triggerText}>{t("nav_lang")}</span>
        <i 
          className={`fa-solid fa-chevron-down ${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} 
          aria-hidden="true" 
        />
      </button>

      {isOpen && (
        <ul 
          className={styles.menu} 
          role="listbox" 
          aria-label={t("available languages")}
        >
          {LANGUAGES.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <li key={lang.code} role="none">
                <button
                  className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                  onClick={() => handleLanguageChange(lang.code)}
                  role="option"
                  lang={lang.code}
                  aria-selected={isActive}
                  disabled={isActive}
                  type="button"
                >
                  <span className={styles.checkArea}>
                    {isActive && <i className="fa-solid fa-check" aria-hidden="true" />}
                  </span>
                  <span className={styles.label}>{lang.label}</span>
                  <span className={`${styles.badge} ${isActive ? styles.badgeActive : ""}`}>
                    {lang.badge}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
