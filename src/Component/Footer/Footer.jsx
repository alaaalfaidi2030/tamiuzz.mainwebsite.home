import { useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { baseURL, getHeaders, phoneAndEmail, socialMedia } from "../../Utilies/data";
import whiteLogo from "/logo-white.svg";
import style from "./Footer.module.css";

const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
};

const Footer = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(t("errors.Invalid email address"))
          .required(t("errors.Required")),
      }),
    [t]
  );

  const links = useMemo(
    () => [
      { label: t("services"), id: "services", to: "/services" },
      { label: t("articles"), id: "articles", to: "/articles" },
      { label: t("about-us"), id: "about-us", to: "/about-us" },
      { label: t("faq"), id: "faq", to: "/faq" },
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
    <footer className={style["footer-container"]} role="contentinfo">
      <div className="container-fluid px-md-5">
        <div className="row g-4">
          {/* Contact Section */}
          <div className="col-lg-4 col-md-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.fadeInUp}
            >
              <h4 className={style["footer-title"]}>{t("contact_us")}</h4>
              <address className={style["contact-info"]}>
                {phoneAndEmail.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    className={style["contact-item"]}
                    aria-label={item.text}
                  >
                    <i
                      className={`fa-solid ${item.icon} ${style["contact-icon"]}`}
                      aria-hidden="true"
                    />
                    <span dir="ltr">{item.text}</span>
                  </a>
                ))}

                <form
                  onSubmit={formik.handleSubmit}
                  className={style["email-subscribe"]}
                  aria-label={t("newsletter subscription")}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder={t("email_placeholder")}
                    className={style["email-input"]}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-label={t("email_placeholder")}
                    aria-invalid={formik.touched.email && formik.errors.email ? "true" : "false"}
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className={style["email-submit"]}
                    disabled={isSubmitting}
                    aria-label={t("subscribe")}
                  >
                    <i
                      className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-arrow-right"}`}
                      aria-hidden="true"
                    />
                  </button>
                </form>

                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger mt-1 mb-0" role="alert">
                    {formik.errors.email}
                  </p>
                )}

                <p className={style["email-desc"]}>{t("email_description")}</p>
              </address>
            </motion.div>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-4 col-md-6">
            <motion.nav
              className={style["quick-links"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.fadeInUp}
              aria-label={t("quick_links")}
            >
              <h4 className={style["footer-title"]}>{t("quick_links")}</h4>
              <motion.ul
                className={style["footer-links"]}
                variants={ANIMATION_VARIANTS.staggerContainer}
              >
                {links.map((linkItem) => (
                  <motion.li key={linkItem.id} variants={ANIMATION_VARIANTS.staggerItem}>
                    <Link className={style["footer-link"]} to={linkItem.to}>
                      <span aria-hidden="true">&gt;&gt;</span>
                      {linkItem.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </div>

          {/* Company Info Section */}
          <div className="col-lg-4 col-12">
            <motion.div
              className="d-flex flex-column align-items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.fadeInUp}
            >
              <Link to="/" className={style["company-logo"]} aria-label={t("home")}>
                <img src={whiteLogo} alt={t("company logo")} />
              </Link>

              <p className={style["company-description"]}>{t("company_description")}</p>

              {/* Social Media Section */}
              <div className={style["social-media"]}>
                <motion.div
                  className={style["social-icons"]}
                  variants={ANIMATION_VARIANTS.staggerContainer}
                >
                  {socialMedia.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.link}
                      className={`${style["social-link"]} ${style[item.className]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.className}
                      variants={ANIMATION_VARIANTS.staggerItem}
                    >
                      <i className={`fa-brands ${item.icon}`} aria-hidden="true" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={style["footer-bottom"]}>
          <nav className={style["footer-bottom-links"]} aria-label={t("legal links")}>
            <a href="#terms">{t("terms_condition")}</a>
            <Link to="policy">{t("privacy_policy")}</Link>
          </nav>
          <p className={style["copyright"]}>
            &copy; {t("All Copyright")} {currentYear} {t("by")} Tamuizz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
