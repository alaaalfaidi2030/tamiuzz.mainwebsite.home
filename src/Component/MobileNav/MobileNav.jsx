import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IsMobileContext } from "../../Context/isMobileContext";
import style from "./MobileNav.module.css";
import logo from "/logo.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import NavbarTop from "../Ui/NavbarTop/NavbarTop";
import whiteLogo from "/logo-white.svg";
import { isThemeModeContext } from "../../Context/isThemeModeContext";

// import SubMenuNavbar from "../Ui/SubMenuNavbar/SubMenuNavbar";
const MobileNav = () => {
  const { t } = useTranslation();
  const { isMobile } = useContext(IsMobileContext);
  const [activeItem, setActiveItem] = useState("home");
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isDarkMode } = useContext(isThemeModeContext);


  const links = useMemo(
    () => [
      { link: t("home"), active: "home", to: "/home" },
      { link: t("solutions"), active: "solutions", to: "/solutions" },
      { link: t("services"), active: "services", to: "/services" },
      { link: t("articles"), active: "articles", to: "/articles" },
      { link: t("support"), active: "support", to: "/support" },
      { link: t("about-us"), active: "about-us", to: "/about-us" },
    ],
    [t]
  );
  const bottomNavbarLinks = useMemo(() =>
    [
      { id: "solutions", icon: "fa-lightbulb", link: "mobile_solutions", path: "/solutions" },
      { id: "services", icon: "fa-computer", link: "mobile_services", path: "/services" },
      { id: "support", icon: "fa-headset", link: "mobile_support", path: "/support" },
      { id: "home", icon: "fa-house", link: "mobile_main", path: "/home" },
    ]
    , [t])
  const toggleLanguage = async () => {
    let languageFlag = i18n.language == "en";
    languageFlag
      ? await i18n.changeLanguage("ar")
      : await i18n.changeLanguage("en");
    window.location.reload();

  };

  const navBar = useRef(null);
  const navBarTop = useRef(null);
  useEffect(() => {
    // Add padding to the body to prevent the content from being hidden behind the navbar when the page is scrolled
    if (isMobile) {
      document.body.style.paddingBottom = `${navBar.current.clientHeight}px`;
      document.body.style.paddingTop = `${navBarTop.current.clientHeight}px`;
    } else {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    }
    return () => {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    };
  }, []);

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div>
      <div className={`${style.navtop} shadow `} ref={navBarTop}>
        <NavbarTop />
        <div className="container d-flex justify-content-between align-items-center py-2">
          <Link className="navbar-brand" to="/">
            <motion.img
              loading='lazy'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src={isDarkMode ? whiteLogo : logo}
              className={`${style.logo} `}
              alt="logo website"
            />
          </Link>

          <motion.ul
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar-nav d-flex flex-row gap-2 align-items-center m-0"
          >
            <li>
              <button
                className={`${style.langButton}`}
                onClick={toggleLanguage}
              >
                {t("Language_nav")}
              </button>
            </li>
          </motion.ul>
        </div>
      </div>
      <div
        dir="ltr"
        className={`${style.navbottom} fixed-bottom w-100 `}
        ref={navBar}
      ><div className={style.navigation}>
          <ul>
            <li
              className={`${style.list} ${["settings", "articles", "about-us"].includes(activeItem) ? style.active : ""}`}
              onClick={() => {
                handleClick("settings");
                setToggleMenu(!toggleMenu);
              }}
            >
              <Link>
                <span className={style.icon}>
                  <i className="fa-solid fa-bars"></i>
                </span>
                <span className={style.text}>{t("mobile_navbar")}</span>
              </Link>
            </li>

            {bottomNavbarLinks.map(({ id, icon, link, path }) => (
              <li
                key={id}
                className={`${style.list} ${activeItem === id ? style.active : ""}`}
                onClick={() => handleClick(id)}
              >
                <Link to={path}>
                  <span className={style.icon}>
                    <i className={`fa-solid ${icon}`}></i>
                  </span>
                  <span className={style.text}>{t(link)}</span>
                </Link>
              </li>
            ))}

            <div className={style.indicator}></div>
          </ul>
        </div>
      </div>

      <div className={`${style.sidebar} ${toggleMenu ? style.active : ""}`}>
        <div className={style.sidebarHeader}>
          <h3 className={`${style.headmenue}`}>{t("mobile_navbar")}</h3>
          <button
            className={style.closeBtn}
            onClick={() => setToggleMenu(false)}
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <ul className={style.menuList}>
          {links.map((item, index) => (
            <li key={index} className={style.menuItem}>
              <Link
                to={item.to}
                className={`${style.menuLink} ${activeItem === item.active ? style.active : ""
                  }`}
                onClick={() => {
                  handleClick(item.active);
                  setToggleMenu(false);
                }}
              >
                {item.link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Add overlay when sidebar is open */}
      {toggleMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => setToggleMenu(false)}
        />
      )}
    </div>
  );
};

export default MobileNav;
