import { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import { useSolutions } from "../../Context/solutionsContext";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import style from "./Navbar.module.css";

const NAV_LINKS = [
  { id: "home", to: "/home" },
  { id: "solutions", to: "/solutions", hasDropdown: true },
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const location = useLocation();
  const { t } = useTranslation();
  const { isDarkMode } = useContext(isThemeModeContext);
  const { solutions, isLoading: solutionsLoading } = useSolutions();
  const navBarRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

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
    setMobileDropdownOpen(null);
  }, [navbarCollapseInstance]);

  const handleDropdownEnter = useCallback((linkId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(linkId);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const toggleMobileDropdown = useCallback((linkId) => {
    setMobileDropdownOpen((prev) => (prev === linkId ? null : linkId));
  }, []);

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

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const logoSrc = isDarkMode ? whiteLogo : logo;

  // Render dropdown content for solutions
  const renderDropdownContent = (linkId) => {
    if (linkId === "solutions") {
      if (solutionsLoading) {
        return (
          <div className={style.dropdownLoading}>
            <i className="fa-solid fa-spinner fa-spin" />
          </div>
        );
      }

      if (!solutions || solutions.length === 0) {
        return null;
      }

      return (
        <>
          <div className={style.dropdownGrid}>
            {solutions.slice(0, 6).map((solution) => (
              <Link
                key={solution.id || solution.urlPath}
                to={`/solutions/${solution.urlPath}`}
                className={style.dropdownItem}
                onClick={() => setOpenDropdown(null)}
              >
                {solution.iconUrl && (
                  <img
                    src={solution.iconUrl}
                    alt=""
                    className={style.dropdownItemIcon}
                    loading="lazy"
                  />
                )}
                <span className={style.dropdownItemText}>{solution.title}</span>
              </Link>
            ))}
          </div>

          <div className={style.dropdownFooter}>
            <Link
              to="/solutions"
              className={style.dropdownViewAll}
              onClick={() => setOpenDropdown(null)}
            >
              <span>{t("view all", "View All")}</span>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </Link>
          </div>
        </>
      );
    }
    return null;
  };

  // Render mobile dropdown content
  const renderMobileDropdownContent = (linkId) => {
    if (linkId === "solutions") {
      if (solutionsLoading) {
        return (
          <div className={style.mobileDropdownLoading}>
            <i className="fa-solid fa-spinner fa-spin" />
          </div>
        );
      }

      if (!solutions || solutions.length === 0) {
        return null;
      }

      return (
        <div className={style.mobileDropdownContent}>
          {solutions.slice(0, 6).map((solution) => (
            <Link
              key={solution.id || solution.urlPath}
              to={`/solutions/${solution.urlPath}`}
              className={style.mobileDropdownItem}
              onClick={hideNavbar}
            >
              <span>{solution.title}</span>
            </Link>
          ))}
        </div>
      );
    }
    return null;
  };

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
              <li
                key={linkItem.id}
                className={`${style.navItem} ${linkItem.hasDropdown ? style.navItemDropdown : ""}`}
                onMouseEnter={() => linkItem.hasDropdown && handleDropdownEnter(linkItem.id)}
                onMouseLeave={() => linkItem.hasDropdown && handleDropdownLeave()}
              >
                <Link
                  className={`${style.navLink} ${linkItem.id === activeLink ? style.navLinkActive : ""}`}
                  to={linkItem.to}
                  aria-current={linkItem.id === activeLink ? "page" : undefined}
                  aria-haspopup={linkItem.hasDropdown ? "true" : undefined}
                  aria-expanded={linkItem.hasDropdown ? openDropdown === linkItem.id : undefined}
                >
                  <span className={style.navLinkText}>{linkItem.label}</span>
                  {linkItem.hasDropdown && (
                    <i
                      className={`fa-solid fa-chevron-down ${style.navLinkArrow} ${openDropdown === linkItem.id ? style.navLinkArrowOpen : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {linkItem.hasDropdown && (
                  <div
                    className={`${style.dropdown} ${openDropdown === linkItem.id ? style.dropdownOpen : ""}`}
                    onMouseEnter={() => handleDropdownEnter(linkItem.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className={style.dropdownContent}>
                      {renderDropdownContent(linkItem.id)}
                    </div>
                  </div>
                )}
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
                {linkItem.hasDropdown ? (
                  <>
                    <button
                      className={`${style.mobileNavLink} ${style.mobileNavLinkDropdown} ${linkItem.id === activeLink ? style.mobileNavLinkActive : ""}`}
                      onClick={() => toggleMobileDropdown(linkItem.id)}
                      aria-expanded={mobileDropdownOpen === linkItem.id}
                    >
                      <span>{linkItem.label}</span>
                      <i
                        className={`fa-solid fa-chevron-down ${style.mobileDropdownArrow} ${mobileDropdownOpen === linkItem.id ? style.mobileDropdownArrowOpen : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {mobileDropdownOpen === linkItem.id && renderMobileDropdownContent(linkItem.id)}
                  </>
                ) : (
                  <Link
                    className={`${style.mobileNavLink} ${linkItem.id === activeLink ? style.mobileNavLinkActive : ""}`}
                    to={linkItem.to}
                    onClick={hideNavbar}
                    aria-current={linkItem.id === activeLink ? "page" : undefined}
                  >
                    <span>{linkItem.label}</span>
                  </Link>
                )}
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
