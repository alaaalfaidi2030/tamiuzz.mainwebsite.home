import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IsMobileContext } from "../../Context/isMobileContext";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import i18n from "../../i18n";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import style from "./MobileNav.module.css";

const SIDEBAR_LINKS = [
  { id: "home", to: "/home", icon: "fa-house" },
  { id: "solutions", to: "/solutions", icon: "fa-lightbulb" },
  { id: "services", to: "/services", icon: "fa-computer" },
  { id: "articles", to: "/articles", icon: "fa-newspaper" },
  { id: "support", to: "/support", icon: "fa-headset" },
  { id: "about-us", to: "/about-us", icon: "fa-users" },
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

  const headerRef = useRef(null);
  const bottomNavRef = useRef(null);

  const sidebarLinks = useMemo(
    () => SIDEBAR_LINKS.map((link) => ({ ...link, label: t(link.id) })),
    [t]
  );

  const bottomNavLinks = useMemo(
    () => BOTTOM_NAV_LINKS.map((link) => ({ ...link, label: t(link.labelKey) })),
    [t]
  );

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
      if (headerRef.current && bottomNavRef.current) {
        document.body.style.paddingTop = `${headerRef.current.offsetHeight + 10}px`;
        document.body.style.paddingBottom = `${bottomNavRef.current.offsetHeight + 12}px`;
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
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
  const isRTL = i18n.dir() === "rtl";
  const sidebarSlideDirection = isRTL ? "100%" : "-100%";

  return (
    <>
      {/* Top Header - Floating Card */}
      <header className={style.topHeader} ref={headerRef}>
        <motion.div
          className={style.headerCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <Link to="/" aria-label={t("home")}>
            <img
              src={logoSrc}
              className={style.logo}
              alt={t("company logo")}
            />
          </Link>

          {/* Actions */}
          <div className={style.headerActions}>
            <LanguageDropdown />
            <a
              href="https://shop.tamiuzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.shopButton}
              aria-label={t("shopping now")}
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </header>

      {/* Bottom Navigation - Floating Card */}
      <nav
        dir="ltr"
        className={style.bottomNav}
        ref={bottomNavRef}
        role="navigation"
        aria-label={t("bottom navigation")}
      >
        <motion.div
          className={style.navCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className={style.navList}>
            {/* Menu Toggle Button */}
            <li
              className={`${style.navItem} ${isMenuActive ? style.navItemActive : ""}`}
              onClick={openSidebar}
              role="none"
            >
              <button
                type="button"
                aria-expanded={isSidebarOpen}
                aria-controls="mobile-sidebar"
                aria-label={t("open menu")}
              >
                <span className={style.navIcon}>
                  <i className="fa-solid fa-bars" aria-hidden="true" />
                </span>
                <span className={style.navLabel}>{t("mobile_navbar")}</span>
              </button>
            </li>

            {/* Navigation Links */}
            {bottomNavLinks.map(({ id, icon, label, path }) => (
              <li
                key={id}
                className={`${style.navItem} ${activeItem === id ? style.navItemActive : ""}`}
                onClick={() => handleNavClick(id)}
                role="none"
              >
                <Link to={path} aria-current={activeItem === id ? "page" : undefined}>
                  <span className={style.navIcon}>
                    <i className={`fa-solid ${icon}`} aria-hidden="true" />
                  </span>
                  <span className={style.navLabel}>{label}</span>
                </Link>
              </li>
            ))}

            {/* Floating Indicator */}
            <div className={style.indicator} aria-hidden="true" />
          </ul>
        </motion.div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={style.overlay}
              onClick={closeSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <motion.aside
              id="mobile-sidebar"
              className={style.sidebar}
              initial={{ x: sidebarSlideDirection, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: sidebarSlideDirection, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label={t("navigation menu")}
            >
              {/* Header */}
              <div className={style.sidebarHeader}>
                <h2 className={style.sidebarTitle}>{t("mobile_navbar")}</h2>
                <button
                  className={style.closeButton}
                  onClick={closeSidebar}
                  aria-label={t("close menu")}
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </div>

              {/* Menu List */}
              <ul className={style.menuList} role="menu">
                {sidebarLinks.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className={style.menuItem}
                    role="none"
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <Link
                      to={item.to}
                      className={`${style.menuLink} ${activeItem === item.id ? style.menuLinkActive : ""}`}
                      onClick={() => handleSidebarLinkClick(item.id)}
                      role="menuitem"
                      aria-current={activeItem === item.id ? "page" : undefined}
                    >
                      <span className={style.menuIcon}>
                        <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                      </span>
                      <span className={style.menuText}>{item.label}</span>
                      <i className={`fa-solid ${isRTL ? "fa-chevron-left" : "fa-chevron-right"} ${style.menuChevron}`} aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Footer */}
              <div className={style.sidebarFooter}>
                <a
                  href="https://shop.tamiuzz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.sidebarShopButton}
                >
                  <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
                  <span>{t("shopping now")}</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
