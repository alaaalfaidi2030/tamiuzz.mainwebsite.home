import { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import style from "./Navbar.module.css";

const NAV_LINKS = [
  { id: "home", to: "/home" },
  { id: "solutions", to: "/solutions" },
  { id: "services", to: "/services" },
  { id: "articles", to: "/articles" },
  { id: "support", to: "/support" },
  { id: "about-us", to: "/about-us" },
];

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

  useEffect(() => {
    const navbarEl = document.getElementById("navbarSupportedContent");
    if (navbarEl) {
      setNavbarCollapseInstance(
        new bootstrap.Collapse(navbarEl, { toggle: false })
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const updatePadding = () => {
  //     if (!navBarRef.current) return;
  //     const height = `${navBarRef.current.clientHeight}px`;
  //     document.documentElement.style.setProperty("--navbar-height", height);
  //     const root = document.getElementById("root");
  //     if (root) root.style.paddingTop = height;
  //   };

  //   updatePadding();
  //   window.addEventListener("resize", updatePadding);

  //   return () => {
  //     window.removeEventListener("resize", updatePadding);
  //     document.documentElement.style.setProperty("--navbar-height", "0px");
  //     const root = document.getElementById("root");
  //     if (root) root.style.paddingTop = "0px";
  //   };
  // }, []);

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
      ref={navBarRef}
      role="navigation"
      aria-label={t("main navigation")}
    >
      <div className={style.navbarMain}>
        <div className={style.navbarContainer}>
          {/* Logo */}
          <Link
            className={style.navbarBrand}
            to="/"
            aria-label={t("home")}
          >
            <img
              src={logoSrc}
              alt={t("company logo")}
              className={style.logo}
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className={style.navLinks}>
            {links.map((linkItem) => (
              <li key={linkItem.id} className={style.navItem}>
                <Link
                  className={`${style.navLink} ${linkItem.id === activeLink ? style.navLinkActive : ""}`}
                  to={linkItem.to}
                  aria-current={linkItem.id === activeLink ? "page" : undefined}
                >
                  <span className={style.navLinkText}>{linkItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className={style.navActions}>
            <div className={style.langWrapper}>
              <LanguageDropdown />
            </div>

            <a
              href="https://shop.tamiuzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.shopButton}
              aria-label={`${t("shopping now")} - ${t("opens in new tab")}`}
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
              <span className={style.shopButtonText}>{t("shopping now")}</span>
            </a>
          </div>

          {/* Mobile Toggle */}
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
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`collapse navbar-collapse ${style.mobileMenu}`}
        id="navbarSupportedContent"
      >
        <div className={style.mobileMenuContent}>
          <ul className={style.mobileNavLinks}>
            {links.map((linkItem) => (
              <li key={linkItem.id} className={style.mobileNavItem}>
                <Link
                  className={`${style.mobileNavLink} ${linkItem.id === activeLink ? style.mobileNavLinkActive : ""}`}
                  to={linkItem.to}
                  onClick={hideNavbar}
                  aria-current={linkItem.id === activeLink ? "page" : undefined}
                >
                  <span>{linkItem.label}</span>
                  <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className={style.mobileActions}>
            <div className={style.mobileLangWrapper}>
              <LanguageDropdown />
            </div>

            <a
              href="https://shop.tamiuzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.mobileShopButton}
              aria-label={`${t("shopping now")} - ${t("opens in new tab")}`}
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
              <span>{t("shopping now")}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
