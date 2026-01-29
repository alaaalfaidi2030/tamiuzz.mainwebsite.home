import React from 'react';
import H2 from '../Ui/H2/H2';
import { useTranslation } from 'react-i18next';
import AboutImage from '../../assets/Images/Home/about-img.png';
import style from './AboutSection.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ourCLients from "../../assets/Images/Home/ourClients.svg"
import projects from "../../assets/Images/Home/projects.svg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function AboutSection({ counter, logos, services }) {
    const { t } = useTranslation();

    // Container orchestration
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Content animations
    const contentVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    // Image with parallax-style reveal
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: 60 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 18,
                delay: 0.3
            }
        }
    };

    // Stat boxes with stagger
    const statBoxVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15
            }
        }
    };

    // Logo animation
    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: i * 0.05
            }
        })
    };

    return (
        <section className={style.aboutSection + " container"}>
            {/* Section Heading */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <H2 text={t("homePage.aboutHomeHeading")} />
            </motion.div>

            {/* Main About Content */}
            <motion.div
                className={style.container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/* Content Side */}
                <motion.div className={style.content} variants={contentVariants}>
                    <motion.div className={style.headingWrapper} variants={itemVariants}>
                        <motion.div
                            className={style.accentLine}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        />
                        <h2 className={style.heading}>
                            {t("homePage.aboutSectionTitle")}
                        </h2>
                    </motion.div>

                    <motion.p className={style.description} variants={itemVariants}>
                        {t("homePage.aboutSectionDescription")}
                    </motion.p>

                    {/* Services Grid */}
                    <motion.div className={style.servicesGrid} variants={itemVariants}>
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                className={style.serviceItem}
                                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                            >
                                <Link to={`/services/${service.path}`}>
                                    <motion.span
                                        className={style.checkIcon}
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <i className="fa-solid fa-check"></i>
                                    </motion.span>
                                    <span className={style.serviceTitle}>{service.title}</span>
                                    <motion.span
                                        className={style.arrow}
                                        initial={{ opacity: 0, x: -5 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                    >
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div className={style.ctaWrapper} variants={itemVariants}>
                        <Link to={"/services"} className={style.ctaButton}>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {t("homePage.servicesDetailsButton")}
                            </motion.span>
                            <motion.span
                                className={style.buttonArrow}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div className={style.statistics} variants={containerVariants}>
                        <motion.div className={style.statBox} variants={statBoxVariants}>
                            <div className={style.statIcon}>
                                <img loading='lazy' src={projects} alt="projects icon" />
                            </div>
                            <div className={style.statContent}>
                                <motion.h4
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                                >
                                    {counter.projects}
                                </motion.h4>
                                <p>{t("homePage.projectsLabel")}</p>
                            </div>
                        </motion.div>

                        <motion.div className={style.statBox} variants={statBoxVariants}>
                            <div className={style.statIcon}>
                                <img loading='lazy' src={ourCLients} alt="clients icon" />
                            </div>
                            <div className={style.statContent}>
                                <motion.h4
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                                >
                                    {counter.clients}
                                </motion.h4>
                                <p>{t("homePage.clientsLabel")}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Image Side */}
                <motion.div className={style.imageWrapper} variants={imageVariants}>
                    <div className={style.imageContainer}>
                        <motion.div
                            className={style.imageBg}
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <img
                            loading='lazy'
                            src={AboutImage}
                            alt={t("homePage.aboutImageAlt")}
                            className={style.image}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Partner Logos Section */}
            <div className={style.partnersSection}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <H2 text={t("homePage.MoreThanOneHundredBrands")} />
                </motion.div>

                <motion.div
                    className={style.logosContainer}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Swiper
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 15 },
                            640: { slidesPerView: 3, spaceBetween: 15 },
                            768: { slidesPerView: 4, spaceBetween: 20 },
                            1024: { slidesPerView: 6, spaceBetween: 20 },
                        }}
                        modules={[Autoplay]}
                    >
                        {logos.map((logo, idx) => (
                            <SwiperSlide key={idx}>
                                <motion.div
                                    className={style.logoWrapper}
                                    custom={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={logoVariants}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className={style.logoInner}>
                                        <img loading='lazy' src={logo.imageUrl} alt={logo.name} />
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
}
