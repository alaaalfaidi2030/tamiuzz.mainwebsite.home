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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      },
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
      {/* Floating Decorative Shapes */}
      <motion.div
        className={style.floatingShape1}
        animate={{
          y: [0, -25, 0],
          x: [0, 18, 0],
          rotate: [0, 7, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={style.floatingShape2}
        animate={{
          y: [0, 28, 0],
          x: [0, -15, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={style.floatingShape3}
        animate={{
          y: [0, -18, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

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
                  <motion.a
                    key={idx}
                    href={item.link}
                    className={style["contact-item"]}
                    aria-label={item.text}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.i
                      className={`fa-solid ${item.icon} ${style["contact-icon"]}`}
                      aria-hidden="true"
                      variants={{
                        rest: { scale: 1, rotate: 0 },
                        hover: {
                          scale: 1.2,
                          rotate: 360,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }
                        }
                      }}
                    />
                    <motion.span
                      dir="ltr"
                      variants={{
                        rest: { x: 0 },
                        hover: {
                          x: 4,
                          transition: {
                            type: "spring",
                            stiffness: 300
                          }
                        }
                      }}
                    >
                      {item.text}
                    </motion.span>
                  </motion.a>
                ))}

                <form
                  onSubmit={formik.handleSubmit}
                  className={style["email-subscribe"]}
                  aria-label={t("newsletter subscription")}
                >
                  <div className={style["subscribe-glow"]} />
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
                  <motion.button
                    type="submit"
                    className={style["email-submit"]}
                    disabled={isSubmitting}
                    aria-label={t("subscribe")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={style["button-glow"]} />
                    <motion.i
                      className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-arrow-right"}`}
                      aria-hidden="true"
                      animate={isSubmitting ? {} : { x: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.button>
                </form>

                {formik.touched.email && formik.errors.email && (
                  <motion.p
                    className="text-danger mt-1 mb-0"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {formik.errors.email}
                  </motion.p>
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
                      <motion.span
                        aria-hidden="true"
                        whileHover={{ x: -3, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        &gt;&gt;
                      </motion.span>
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
                <motion.img
                  src={whiteLogo}
                  alt={t("company logo")}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
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
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      animate="rest"
                    >
                      <div className={style["social-glow"]} />
                      <motion.i
                        className={`fa-brands ${item.icon}`}
                        aria-hidden="true"
                        variants={{
                          rest: { scale: 1, rotate: 0 },
                          hover: {
                            scale: 1.15,
                            rotate: 360,
                            transition: {
                              type: "spring",
                              stiffness: 200,
                              damping: 12
                            }
                          },
                          tap: { scale: 0.9 }
                        }}
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className={style["footer-bottom"]}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.3
          }}
        >
          <nav className={style["footer-bottom-links"]} aria-label={t("legal links")}>
            <motion.a
              href="#terms"
              whileHover={{ scale: 1.05, color: "var(--secondary-400)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("terms_condition")}
            </motion.a>
            <Link to="policy">
              <motion.span
                whileHover={{ scale: 1.05, color: "var(--secondary-400)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t("privacy_policy")}
              </motion.span>
            </Link>
          </nav>
          <p className={style["copyright"]}>
            &copy; {t("All Copyright")} {currentYear} {t("by")} Tamuizz
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
