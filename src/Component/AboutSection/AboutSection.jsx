import React from 'react';
import H2 from '../Ui/H2/H2';
import { useTranslation } from 'react-i18next';
import AboutImage from '../../assets/Images/Home/about-img.png';
import style from './AboutSection.module.css';
import { motion } from 'framer-motion'; // Assuming you might add animations later
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; import "swiper/css";

export default function AboutSection() {
    const { t } = useTranslation();


    const clients = [
        { id: 1, src: "/images/clients/logo1.png", alt: "Logo 1" },
        { id: 2, src: "/images/clients/logo2.png", alt: "Logo 2" },
        { id: 3, src: "/images/clients/logo3.png", alt: "Logo 3" },
        { id: 4, src: "/images/clients/logo4.png", alt: "Logo 4" },
        { id: 5, src: "/images/clients/logo5.png", alt: "Logo 5" },
        { id: 6, src: "/images/clients/logo6.png", alt: "Logo 6" },
    ];
    // You can define animation variants here if you decide to add them
    // For now, let's focus on i18n
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const statBoxVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10 } },
    };


    return (
        <section className={style.aboutSection}>
            {/* The H2 component already uses `t("homePage.aboutHomeHeading")` */}
            <H2 text={t("homePage.aboutHomeHeading")} />

            <motion.div
                className={style.container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Animate when 30% of the section is in view
                variants={containerVariants}
            >
                <motion.div className={style.content} variants={containerVariants}> {/* Nested for staggered children */}
                    <motion.h2 className={style.heading} variants={itemVariants}>
                        {t("homePage.aboutSectionTitle")}
                    </motion.h2>
                    <motion.p className={style.description} variants={itemVariants}>
                        {t("homePage.aboutSectionDescription")}
                    </motion.p>
                    <div className={style.features}>
                        <ul>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.itConsulting")}</motion.li>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.appDevelopment")}</motion.li>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.cyberSecurity")}</motion.li>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.itManagement")}</motion.li>
                        </ul>
                        <ul>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.uiUxDesign")}</motion.li>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.dataAnalysis")}</motion.li>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.databaseSecurity")}</motion.li>
                            <motion.li variants={itemVariants}><i className="fa-solid fa-check"></i>{t("homePage.digitalMarketing")}</motion.li>
                        </ul>
                    </div>
                    <motion.div className="my-4"
                        variants={itemVariants}
                    >

                        <Link to={"/services"} className="btn-web btn-web-secondary "
                        >
                            {t("homePage.servicesDetailsButton")}
                        </Link>
                    </motion.div>
                    <div className={style.statistics}>
                        <motion.div className={style.statBox + " row"} variants={statBoxVariants}>
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-diagram-project "></i>
                            </div>
                            <div className="col-8 d-flex flex-column align-items-center justify-content-center">
                                <h4>{t("homePage.projectsCount")}</h4>
                                <p>{t("homePage.projectsLabel")}</p>
                            </div>
                        </motion.div>
                        <motion.div className={style.statBox + " row"} variants={statBoxVariants}>
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className="col-8 d-flex flex-column align-items-center justify-content-center">
                                <h4>{t("homePage.clientsCount")}</h4>
                                <p>{t("homePage.clientsLabel")}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div className={style.imageWrapper} variants={imageVariants}>
                    <img src={AboutImage} alt={t("homePage.aboutImageAlt")} className={style.image} />
                </motion.div>
            </motion.div>

            <div className="OurPartners">

                <H2 text={t("homePage.MoreThanOneHundredBrands")} />

                <div className="container my-5" dir="rtl">
                    <Swiper
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                        modules={[Autoplay]}
                    >
                        {clients.map((client) => (
                            <SwiperSlide key={client.id}>
                                <div className={"client-logo-wrapper mx-auto d-flex justify-content-center align-items-center rounded-circle "+style.logoPartner}>
                                    <img src={client.src} alt={client.alt} className="client-logo" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}