import React, { useMemo, useState } from 'react';
import style from './Footer.module.css';
import whiteLogo from "/logo-white.svg";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { baseURL, getHeaders, phoneAndEmail, socialMedia } from '../../Utilies/data';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const Footer = () => {
    // Mock translation function for demonstration
    const { t } = useTranslation();

    const [responseFlag, setResponseFlag] = useState(false)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t("errors.Invalid email address"))
            .required(t("errors.Required")),
    });

    const currentYear = new Date().getFullYear();


    // send message to the server

    const subscribeWithUs = async (values) => {


        setResponseFlag(true);

        try {
            const { data } = await axios.get(baseURL + `/newsteller/subscribe?email=${values.email}`, {
                headers: getHeaders(),
            });

            if (data.success) {
                Swal.fire({
                    title: t("success.Success"),
                    text: t("success.successfully subscription"),
                    icon: "success",
                    confirmButtonText: t("success.OK"),
                });
            } else {
                Swal.fire({
                    title: t("errors.Error"),
                    text: t("errors.Something went wrong, please try again later"),
                    icon: "error",
                    confirmButtonText: t("success.OK"),
                });
            }
        } catch (error) {
            console.error("There was an error sending the message:", error);
            Swal.fire({
                title: t("errors.Error"),
                text: t("errors.Something went wrong, please try again later"),
                icon: "error",
                confirmButtonText: t("success.OK"),
            });
        } finally {
            setResponseFlag(false);
        }
    };
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: subscribeWithUs
    });

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
                <div className="container-fluid px-md-5">
                    <div className="row g-4">
                        {/* Contact Section */}
                        <div className="col-lg-4 col-7">
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
                                    <form onSubmit={formik.handleSubmit} className={style["email-subscribe"]}>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder={t("email_placeholder")}
                                            className={style["email-input"]}
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <button className={style["email-submit"]}>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </form>
                                    {
                                        formik.touched.email && formik.errors.email &&
                                        <div className="text-danger ">
                                            {formik.errors.email}
                                        </div>
                                    }
                                    <p className={style["email-desc"] + " fs-6 fw-light "}>
                                        {t("email_description")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className="col-lg-4 col-5  ">
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
                                    <img loading='lazy' src={whiteLogo} alt="logo image" style={{ width: "165px" }} />
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
                            <Link to="policy">
                                {t("privacy_policy")}
                            </Link>
                        </div>
                        <p className={style["copyright"]}>
                            ©  All Copyright {currentYear} by Tamuizz
                        </p>
                    </div>
                </div>
            </div>

        </footer >
    );
}
export default Footer;