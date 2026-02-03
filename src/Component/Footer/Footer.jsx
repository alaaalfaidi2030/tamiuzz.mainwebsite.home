import { useMemo, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { baseURL, getHeaders, phoneAndEmail, socialMedia } from "../../Utilies/data";
import whiteLogo from "/logo-white.svg";
import style from "./Footer.module.css";

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  },
};

const Footer = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(t("errors.Invalid email address"))
          .required(t("errors.Required")),
      }),
    [t]
  );

  const quickLinks = useMemo(
    () => [
      { label: t("home"), to: "/" },
      { label: t("about-us"), to: "/about-us" },
      { label: t("services"), to: "/services" },
      { label: t("solutions"), to: "/solutions" },
    ],
    [t]
  );

  const supportLinks = useMemo(
    () => [
      { label: t("articles"), to: "/articles" },
      { label: t("faq"), to: "/faq" },
      { label: t("support"), to: "/support" },
      { label: t("privacy_policy"), to: "/policy" },
    ],
    [t]
  );

  const handleSubscribe = useCallback(
    async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const { data } = await axios.get(
          `${baseURL}/newsteller/subscribe?email=${values.email}`,
          { headers: getHeaders() }
        );

        if (data.success) {
          Swal.fire({
            title: t("success.Success"),
            text: t("success.successfully subscription"),
            icon: "success",
            confirmButtonText: t("success.OK"),
          });
          resetForm();
        } else {
          Swal.fire({
            title: t("errors.Error"),
            text: t("errors.Something went wrong, please try again later"),
            icon: "error",
            confirmButtonText: t("success.OK"),
          });
        }
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        Swal.fire({
          title: t("errors.Error"),
          text: t("errors.Something went wrong, please try again later"),
          icon: "error",
          confirmButtonText: t("success.OK"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [t]
  );

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleSubscribe,
  });

  return (
    <>
      <footer className={style.footer} role="contentinfo">
        {/* Gradient Orbs */}
        <div className={style.orbsContainer}>
          <motion.div
            className={style.orb1}
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={style.orb2}
            animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 25, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={style.orb3}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Grid Pattern */}
        <div className={style.gridPattern} />

        <div className="container">
          {/* Main Footer Content */}
          <motion.div
            className={style.footerContent}
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Brand Section */}
            <motion.div className={style.brandSection} variants={ANIMATION_VARIANTS.item}>
              <Link to="/" className={style.logo}>
                <img src={whiteLogo} alt={t("company logo")} />
              </Link>
              <p className={style.brandDescription}>{t("company_description")}</p>

              {/* Social Icons */}
              <div className={style.socialIcons}>
                {socialMedia.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    className={`${style.socialLink} ${style[item.className]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.className}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={`fa-brands ${item.icon}`} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Grid - Quick Links & Support */}
            <motion.div className={style.linksGrid} variants={ANIMATION_VARIANTS.item}>
              {/* Quick Links */}
              <details className={style.linksSection} open>
                <summary className={style.sectionTitle}>
                  <span>{t("quick_links")}</span>
                  <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                </summary>
                <ul className={style.linksList}>
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.to} className={style.footerLink}>
                        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Support Links */}
              <details className={style.linksSection} open>
                <summary className={style.sectionTitle}>
                  <span>{t("support")}</span>
                  <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                </summary>
                <ul className={style.linksList}>
                  {supportLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.to} className={style.footerLink}>
                        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div className={style.contactSection} variants={ANIMATION_VARIANTS.item}>
              <h4 className={style.sectionTitle}>{t("contact_us")}</h4>

              {/* Contact Info */}
              <div className={style.contactList}>
                {phoneAndEmail.map((item, idx) => (
                  <a key={idx} href={item.link} className={style.contactItem}>
                    <div className={style.contactIcon}>
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    </div>
                    <span dir="ltr">{item.text}</span>
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className={style.newsletter}>
                <p className={style.newsletterLabel}>{t("email_description")}</p>
                <form onSubmit={formik.handleSubmit} className={style.newsletterForm}>
                  <div className={style.inputWrapper}>
                    <input
                      type="email"
                      name="email"
                      placeholder={t("email_placeholder")}
                      className={style.emailInput}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isSubmitting}
                    />
                    <motion.button
                      type="submit"
                      className={style.submitBtn}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"}`} />
                    </motion.button>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <motion.span
                      className={style.errorText}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formik.errors.email}
                    </motion.span>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div
            className={style.footerBottom}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={style.bottomLeft}>
              <p className={style.copyright}>
                © {currentYear} Tamiuzz. {t("All Copyright", "جميع الحقوق محفوظة")}
              </p>
            </div>
            <div className={style.bottomRight}>
              <Link to="/policy" className={style.bottomLink}>
                {t("privacy_policy")}
              </Link>
              <span className={style.divider}>|</span>
              <a href="#terms" className={style.bottomLink}>
                {t("terms_condition")}
              </a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className={style.backToTop}
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <i className="fa-solid fa-chevron-up" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
