import { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import NavbarTop from "../Ui/NavbarTop/NavbarTop";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import style from "./Navbar.module.css";

const NAV_LINKS = [
  { id: "home", to: "/home", icon: "fa-home" },
  { id: "solutions", to: "/solutions", icon: "fa-lightbulb" },
  { id: "services", to: "/services", icon: "fa-cogs" },
  { id: "articles", to: "/articles", icon: "fa-newspaper" },
  { id: "support", to: "/support", icon: "fa-headset" },
  { id: "about-us", to: "/about-us", icon: "fa-building" },
];

const ANIMATION_VARIANTS = {
  logo: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },
  navItem: {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05 },
    }),
  },
  rightSection: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } },
  },
  mobileMenu: {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  },
};

const Navbar = () => {
  const [navbarCollapseInstance, setNavbarCollapseInstance] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { isDarkMode } = useContext(isThemeModeContext);
  const navBarRef = useRef(null);

  const links = useMemo(
    () => NAV_LINKS.map((link) => ({ ...link, label: t(link.id) })),
    [t]
  );

  const toggleNavbarCollapse = useCallback(() => {
    navbarCollapseInstance?.toggle();
    setIsMobileMenuOpen((prev) => !prev);
  }, [navbarCollapseInstance]);

  const hideNavbar = useCallback(() => {
    navbarCollapseInstance?.hide();
    setIsMobileMenuOpen(false);
  }, [navbarCollapseInstance]);

  // Initialize Bootstrap collapse
  useEffect(() => {
    const navbarEl = document.getElementById("navbarSupportedContent");
    if (navbarEl) {
      setNavbarCollapseInstance(
        new bootstrap.Collapse(navbarEl, { toggle: false })
      );
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navbar height for body padding
  useEffect(() => {
    const updatePadding = () => {
      if (!navBarRef.current) return;

      const height = `${navBarRef.current.clientHeight}px`;
      document.documentElement.style.setProperty("--navbar-height", height);

      const root = document.getElementById("root");
      if (root) root.style.paddingTop = height;
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
      document.documentElement.style.setProperty("--navbar-height", "0px");
      const root = document.getElementById("root");
      if (root) root.style.paddingTop = "0px";
    };
  }, []);

  // Track active link based on route and scroll
  useEffect(() => {
    const currentPath = location.pathname.substring(1).split("/")[0].toLowerCase();
    const matchedLink = links.find((l) => l.id === currentPath);
    setActiveLink(matchedLink ? matchedLink.id : "home");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, [location.pathname, links]);

  const logoSrc = isDarkMode ? whiteLogo : logo;

  return (
    <nav
      id="navBarMain"
      className={`${style.navbar} ${isScrolled ? style.navbarScrolled : ""}`}
      data-bs-theme={isDarkMode ? "dark" : "light"}
      ref={navBarRef}
      role="navigation"
      aria-label={t("main navigation")}
    >
      {/* Top Bar */}
      <NavbarTop />

      {/* Main Navigation */}
      <div className={style.navbarMain}>
        <div className={style.navbarContainer}>
          {/* Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.logo}
          >
            <Link
              className={style.navbarBrand}
              to="/"
              aria-label={t("home")}
            >
              <img
                src={logoSrc}
                width={110}
                height="auto"
                alt={t("company logo")}
                className={style.logo}
              />
            </Link>
          </motion.div>

          {/* Mobile Toggle Button */}
          <button
            className={`${style.mobileToggle} ${isMobileMenuOpen ? style.mobileToggleOpen : ""}`}
            type="button"
            onClick={toggleNavbarCollapse}
            aria-controls="navbarSupportedContent"
            aria-expanded={isMobileMenuOpen}
            aria-label={t("toggle navigation")}
          >
            <span className={style.toggleBar} />
            <span className={style.toggleBar} />
            <span className={style.toggleBar} />
          </button>

          {/* Desktop Navigation Links */}
          <ul className={style.navLinks}>
            {links.map((linkItem, idx) => (
              <motion.li
                key={linkItem.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={ANIMATION_VARIANTS.navItem}
                className={style.navItem}
              >
                <Link
                  className={`${style.navLink} ${linkItem.id === activeLink ? style.navLinkActive : ""}`}
                  to={linkItem.to}
                  aria-current={linkItem.id === activeLink ? "page" : undefined}
                >
                  <span className={style.navLinkText}>{linkItem.label}</span>
                  <span className={style.navLinkIndicator} />
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Right Section - Actions */}
          <motion.div
            className={style.navActions}
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.rightSection}
          >
            {/* Language Dropdown */}
            <div className={style.langWrapper}>
              <LanguageDropdown />
            </div>

            {/* Shop CTA */}
            <a
              href="http://shop.tamiuzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.shopButton}
              aria-label={`${t("shopping now")} - ${t("opens in new tab")}`}
            >
              <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
              <span className={style.shopButtonText}>{t("shopping now")}</span>
            </a>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`collapse navbar-collapse ${style.mobileMenu}`}
          id="navbarSupportedContent"
        >
          <div className={style.mobileMenuContent}>
            {/* Mobile Navigation Links */}
            <ul className={style.mobileNavLinks}>
              {links.map((linkItem) => (
                <li key={linkItem.id} className={style.mobileNavItem}>
                  <Link
                    className={`${style.mobileNavLink} ${linkItem.id === activeLink ? style.mobileNavLinkActive : ""}`}
                    to={linkItem.to}
                    onClick={hideNavbar}
                    aria-current={linkItem.id === activeLink ? "page" : undefined}
                  >
                    <i className={`fa-solid ${linkItem.icon}`} aria-hidden="true" />
                    <span>{linkItem.label}</span>
                    {linkItem.id === activeLink && (
                      <i className="fa-solid fa-check" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Divider */}
            <div className={style.mobileDivider} />

            {/* Mobile Actions */}
            <div className={style.mobileActions}>
              <div className={style.mobileLangWrapper}>
                <LanguageDropdown />
              </div>

              <a
                href="http://shop.tamiuzz.com"
                target="_blank"
                rel="noopener noreferrer"
                className={style.mobileShopButton}
                aria-label={`${t("shopping now")} - ${t("opens in new tab")}`}
              >
                <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
                <span>{t("shopping now")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
