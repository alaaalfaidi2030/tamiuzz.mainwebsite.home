import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { IsMobileContext } from "../../../Context/isMobileContext";
import { phoneAndEmail, socialMedia } from "../../../Utilies/data";
import style from "./NavbarTop.module.css";

const ANIMATION_VARIANTS = {
  socialLink: {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.08 },
    }),
  },
};

const NavbarTop = () => {
  const navbarTopRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const { isMobile } = useContext(IsMobileContext);

  const handleScroll = useCallback(() => {
    const shouldBeVisible = window.scrollY <= 10;
    setIsVisible(shouldBeVisible);
  }, []);

  useEffect(() => {
    // Set initial container height
    if (containerRef.current && navbarTopRef.current) {
      containerRef.current.style.height = `${navbarTopRef.current.clientHeight}px`;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Update container height when visibility changes
  useEffect(() => {
    if (!containerRef.current || !navbarTopRef.current) return;

    if (isVisible) {
      containerRef.current.style.height = `${navbarTopRef.current.clientHeight}px`;
    } else {
      containerRef.current.style.height = "0px";
    }
  }, [isVisible]);

  return (
    <div className={style.navbarContainer} ref={containerRef}>
      <div
        className={`${style.navbarTop} ${!isVisible ? style.navbarTopHidden : ""}`}
        dir="ltr"
        ref={navbarTopRef}
      >
        {/* Contact Information */}
        <div className={style.contactInfo}>
          {phoneAndEmail.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={style.contactLink}
              aria-label={item.text}
            >
              <i className={item.icon} aria-hidden="true" />
              <span className={style.contactText}>{item.text}</span>
            </a>
          ))}
        </div>

        {/* Social Media Links */}
        {!isMobile && (
          <div className={style.socialLinks}>
            {socialMedia.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={ANIMATION_VARIANTS.socialLink}
                className={`${style.socialLink} ${style[item.className]}`}
                aria-label={item.className}
              >
                <i className={`fa-brands ${item.icon}`} aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarTop;
