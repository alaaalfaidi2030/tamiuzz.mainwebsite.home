import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IsMobileContext } from "../../Context/isMobileContext";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import NavbarTop from "../Ui/NavbarTop/NavbarTop";
import i18n from "../../i18n";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import style from "./MobileNav.module.css";

const SIDEBAR_LINKS = [
  { id: "home", to: "/home" },
  { id: "solutions", to: "/solutions" },
  { id: "services", to: "/services" },
  { id: "articles", to: "/articles" },
  { id: "support", to: "/support" },
  { id: "about-us", to: "/about-us" },
];

const BOTTOM_NAV_LINKS = [
  { id: "solutions", icon: "fa-lightbulb", labelKey: "mobile_solutions", path: "/solutions" },
  { id: "services", icon: "fa-computer", labelKey: "mobile_services", path: "/services" },
  { id: "support", icon: "fa-headset", labelKey: "mobile_support", path: "/support" },
  { id: "home", icon: "fa-house", labelKey: "mobile_main", path: "/home" },
];

const MENU_TRIGGER_ITEMS = ["settings", "articles", "about-us"];

const MobileNav = () => {
  const { t } = useTranslation();
  const { isMobile } = useContext(IsMobileContext);
  const { isDarkMode } = useContext(isThemeModeContext);
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navBarRef = useRef(null);
  const navBarTopRef = useRef(null);

  const sidebarLinks = useMemo(
    () => SIDEBAR_LINKS.map((link) => ({ ...link, label: t(link.id) })),
    [t]
  );

  const bottomNavLinks = useMemo(
    () => BOTTOM_NAV_LINKS.map((link) => ({ ...link, label: t(link.labelKey) })),
    [t]
  );

  const toggleLanguage = useCallback(async () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    await i18n.changeLanguage(newLang);
    window.location.reload();
  }, []);

  const handleNavClick = useCallback((itemId) => {
    setActiveItem(itemId);
  }, []);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
    setActiveItem("settings");
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleSidebarLinkClick = useCallback((itemId) => {
    setActiveItem(itemId);
    setIsSidebarOpen(false);
  }, []);

  // Set active item based on current route
  useEffect(() => {
    const currentPath = location.pathname.substring(1).split("/")[0].toLowerCase();
    const matchedLink = SIDEBAR_LINKS.find((l) => l.id === currentPath);
    if (matchedLink) {
      setActiveItem(matchedLink.id);
    }
  }, [location.pathname]);

  // Handle body padding for fixed navigation
  useEffect(() => {
    if (!isMobile) {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
      return;
    }

    const updatePadding = () => {
      if (navBarRef.current && navBarTopRef.current) {
        document.body.style.paddingBottom = `${navBarRef.current.clientHeight}px`;
        document.body.style.paddingTop = `${navBarTopRef.current.clientHeight}px`;
      }
    };

    updatePadding();

    return () => {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    };
  }, [isMobile]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const logoSrc = isDarkMode ? whiteLogo : logo;
  const isMenuActive = MENU_TRIGGER_ITEMS.includes(activeItem);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className={style.navtop} ref={navBarTopRef}>
        <NavbarTop />
        <div className="container d-flex justify-content-between align-items-center py-2">
          <Link className="navbar-brand" to="/" aria-label={t("home")}>
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              src={logoSrc}
              className={style.logo}
              alt={t("company logo")}
            />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="d-flex gap-2 align-items-center"
          >
            <button
              className={style.langButton}
              onClick={toggleLanguage}
              aria-label={t("change language")}
            >
              {t("Language_nav")}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav
        dir="ltr"
        className={`fixed-bottom w-100`}
        ref={navBarRef}
        role="navigation"
        aria-label={t("bottom navigation")}
      >
        <div className={style.navigation}>
          <ul>
            {/* Menu Toggle Button */}
            <li
              className={`${style.list} ${isMenuActive ? style.active : ""}`}
              onClick={openSidebar}
              role="none"
            >
              <button
                type="button"
                aria-expanded={isSidebarOpen}
                aria-controls="mobile-sidebar"
                aria-label={t("open menu")}
              >
                <span className={style.icon}>
                  <i className="fa-solid fa-bars" aria-hidden="true" />
                </span>
                <span className={style.text}>{t("mobile_navbar")}</span>
              </button>
            </li>

            {/* Navigation Links */}
            {bottomNavLinks.map(({ id, icon, label, path }) => (
              <li
                key={id}
                className={`${style.list} ${activeItem === id ? style.active : ""}`}
                onClick={() => handleNavClick(id)}
                role="none"
              >
                <Link to={path} aria-current={activeItem === id ? "page" : undefined}>
                  <span className={style.icon}>
                    <i className={`fa-solid ${icon}`} aria-hidden="true" />
                  </span>
                  <span className={style.text}>{label}</span>
                </Link>
              </li>
            ))}

            {/* Floating Indicator */}
            <div className={style.indicator} aria-hidden="true" />
          </ul>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.aside
              id="mobile-sidebar"
              className={`${style.sidebar} ${style.active}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label={t("navigation menu")}
            >
              <div className={style.sidebarHeader}>
                <h2 className={style.headmenue}>{t("mobile_navbar")}</h2>
                <button
                  className={style.closeBtn}
                  onClick={closeSidebar}
                  aria-label={t("close menu")}
                >
                  <i className="fa-solid fa-times" aria-hidden="true" />
                </button>
              </div>

              <ul className={style.menuList} role="menu">
                {sidebarLinks.map((item) => (
                  <li key={item.id} className={style.menuItem} role="none">
                    <Link
                      to={item.to}
                      className={`${style.menuLink} ${activeItem === item.id ? style.active : ""}`}
                      onClick={() => handleSidebarLinkClick(item.id)}
                      role="menuitem"
                      aria-current={activeItem === item.id ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.aside>

            {/* Overlay */}
            <motion.div
              className={`${style.overlay} ${style.active}`}
              onClick={closeSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
