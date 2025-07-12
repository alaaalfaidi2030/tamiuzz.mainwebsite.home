import React from 'react';
import H2 from '../Ui/H2/H2';
import { useTranslation } from 'react-i18next';
import AboutImage from '../../assets/Images/Home/about-img.png';
import style from './AboutSection.module.css';
import { motion } from 'framer-motion'; // Assuming you might add animations later
import { Link } from 'react-router-dom';

export default function AboutSection() {
    const { t } = useTranslation();

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
        </section>
    );
}