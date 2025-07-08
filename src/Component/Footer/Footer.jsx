import React, { useMemo } from 'react';
import style from './Footer.module.css';
import logo from "/logo.svg";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { phoneAndEmail, socialMedia } from '../../Utilies/data';
const Footer = () => {
    // Mock translation function for demonstration
    const { t, i18n } = useTranslation();



    const links = useMemo(
        () => [
            { label: t("services"), id: "services", to: "/services" },
            { label: t("articles"), id: "articles", to: "/articles" },
            { label: t("about-us"), id: "about-us", to: "/about-us" },
            { label: t("faq"), id: "faq", to: "/faq" },
        ],
    );
    return (
        <footer className={style["footer-container"]}>
            <div className="footer-content">
                <div className="container-fluid px-5">
                    <div className="row g-4">
                        {/* Contact Section */}
                        <div className="col-lg-4 col-8">
                            <div>
                                <h4 className={style["footer-title"]}>{t("contact_us")}</h4>
                                <div className={style["contact-info"]}>
                                    {
                                        phoneAndEmail.map((item, idx) => (
                                            <motion.a
                                                key={idx}
                                                href={item.link}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                className={style["contact-item"]}
                                            >
                                                <i className={`fa-solid ${item.icon} ${style["contact-icon"]}`}></i>
                                                <span dir='ltr'>{item.text}</span>
                                            </motion.a>
                                        ))

                                    }
                                    <div className={style["email-subscribe"] + " w-75"}>
                                        <input
                                            type="email"
                                            placeholder={t("email_placeholder")}
                                            className={style["email-input"]}
                                        />
                                        <button className={style["email-submit"]}>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className="email-desc fs-6 fw-light text-white text-muted">
                                        {t("email_description")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className="col-lg-4 col-4  ">
                            <div className={style["quick-links"]}>
                                <h4 className={style["footer-title"]}>{t("quick_links")}</h4>
                                <ul className={style["footer-links"]}>
                                    {links.map((linkItem, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, y: -100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        >
                                            <Link
                                                className={style["footer-link"]}

                                                to={linkItem.to}
                                            >
                                                <span>&gt;&gt;</span>
                                                {linkItem.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Company Info Section */}
                        <div className="col-lg-4 col-12">
                            <div className='d-flex flex-column align-items-center'>
                                <motion.div
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className={style["company-logo"]}>
                                    <img src={logo} alt="logo image" />
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className={style["company-description"]}>
                                    {t("company_description")}
                                </motion.p>
                                {/* Social Media Section */}
                                <div className={style["social-media"]}>
                                    <div className={style["social-icons"]}>
                                        {
                                            socialMedia.map((item, idx) => (
                                                <motion.a
                                                    key={idx}
                                                    href={item.link}
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    className={style["social-link"] + " " + style[item.className]}
                                                >
                                                    <i className={`fa-brands ${item.icon}`}></i>
                                                </motion.a>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Footer Bottom */}
                    <div className={style["footer-bottom"]}>
                        <div className={style["footer-bottom-links"]}>
                            <a href="#terms" >
                                {t("terms_condition")}
                            </a>
                            <a href="#privacy">
                                {t("privacy_policy")}
                            </a>
                        </div>
                        <p className={style["copyright"]}>
                            © {t("copyright")} Tamuizz
                        </p>
                    </div>
                </div>
            </div>

        </footer >
    );
}
export default Footer;