import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
import logo from "/logo.svg";
import whiteLogo from "/logo-white.svg";
import { useTranslation } from "react-i18next";
import style from "./Navbar.module.css";
import i18n from "../../i18n";
import { motion } from "framer-motion";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import NavbarTop from "../Ui/NavbarTop/NavbarTop";

const Navbar = () => {
  const [navbarCollapseInstance, setNavbarCollapseInstance] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const { t } = useTranslation();
  const { isDarkMode } = useContext(isThemeModeContext);
  const navBarRef = useRef(null);

  const links = useMemo(
    () => [
      { label: t("home"), id: "home", to: "/home" },
      { label: t("solutions"), id: "solutions", to: "/solutions" },
      { label: t("services"), id: "services", to: "/services" },
      { label: t("articles"), id: "articles", to: "/articles" },
      { label: t("support"), id: "support", to: "/support" },
      { label: t("about-us"), id: "about-us", to: "/about-us" },
    ],
    [t]
  );

  const toggleNavbarCollapse = useCallback(() => {
    navbarCollapseInstance?.toggle();
  }, [navbarCollapseInstance]);

  const hideNavbar = useCallback(() => {
    navbarCollapseInstance?.hide();
  }, [navbarCollapseInstance]);

  const toggleLanguage = async (lng) => {
    await i18n.changeLanguage(lng);

    window.location.reload();
  };

  useEffect(() => {
    const navbarEl = document.getElementById("navbarSupportedContent");
    if (navbarEl) {
      setNavbarCollapseInstance(
        new bootstrap.Collapse(navbarEl, { toggle: false })
      );
    }
  }, []);

  useEffect(() => {
    const updatePadding = () => {
      if (navBarRef.current) {
        const height = navBarRef.current.clientHeight + "px";

        document.documentElement.style.setProperty("--navbar-height", height);
        const root = document.getElementById("root");
        if (root) root.style.paddingTop = height;
      }
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

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, links, navBarRef?.current?.clientHeight]);

  return (
    <nav
      id="navBarMain"
      className={`navbar lead navbar-expand-lg fixed-top py-0  shadow flex-column ${style.navbar}`}
      data-bs-theme={isDarkMode ? "dark" : "light"}
      ref={navBarRef}
    >
      <div className="w-100">
        <NavbarTop />
      </div>
      <div className="container-fluid d-flex justify-content-between px-5">
        <Link className="navbar-brand py-3 rounded-3" to="/">
          <motion.img
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={isDarkMode ? whiteLogo : logo}
            style={{ width: "110px" }}
            alt="website logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbarCollapse}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse  ${style["list-links"]}`}
          id="navbarSupportedContent"
        >
          <div />
          <ul className={`navbar-nav gap-2   ${style["middle-part"]}`}>
            {links.map((linkItem, idx) => (
              <motion.li
                key={linkItem.id}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="nav-item"
              >
                <Link
                  className={`nav-link ${linkItem.id === activeLink ? style.selected : ""}`}
                  to={linkItem.to}
                  onClick={hideNavbar}
                >
                  {linkItem.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={"navbar-nav gap-2 d-flex " + style["right-part"]}
          >
            <li className="nav-item dropdown">
              <div
                className={`btn-web btn-web-primary ${style.langButton}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-angle-down mx-2"></i>
                {t("nav_lang")}
              </div>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => toggleLanguage("ar")}>
                    <span className="mx-2">اللغة العربية</span>
                    <span className={`rounded-circle fw-bold bg-info text-white text-center ${style["language-icon"]}`}>ع</span>
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => toggleLanguage("en")}>
                    <span className="mx-2">English</span>
                    <span className={`rounded-circle fw-bold bg-info text-white text-center ${style["language-icon"]}`}>E</span>
                  </button>
                </li>
              </ul>
            </li>

            <li className={style.shoppingNow}>
              <a href="http://shop.tamiuzz.com" target="_blank" className="btn-web btn-web-secondary">
                <i className="fa-solid fa-cart-shopping mx-2"></i>
                {t("shopping now")}
              </a>
            </li>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
