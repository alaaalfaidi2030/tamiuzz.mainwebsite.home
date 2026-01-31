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
        <section className={style.aboutSection}>
            <div className={style.sectionContainer}>
                {/* Floating Decorative Shapes */}
                <motion.div
                    className={style.floatingShape1}
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 20, 0],
                        rotate: [0, 8, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className={style.floatingShape2}
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -15, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className={style.floatingShape3}
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

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

                    {/* Services Grid with Premium Effects */}
                    <motion.div className={style.servicesGrid} variants={itemVariants}>
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                className={style.serviceItem}
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                            >
                                <Link to={`/services/${service.path}`}>
                                    <motion.span
                                        className={style.checkIcon}
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
                                    >
                                        <i className="fa-solid fa-check"></i>
                                    </motion.span>
                                    <motion.span
                                        className={style.serviceTitle}
                                        variants={{
                                            rest: { x: 0 },
                                            hover: {
                                                x: 5,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 300
                                                }
                                            }
                                        }}
                                    >
                                        {service.title}
                                    </motion.span>
                                    <motion.span
                                        className={style.arrow}
                                        variants={{
                                            rest: { opacity: 0, x: -5 },
                                            hover: {
                                                opacity: 1,
                                                x: 0,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 300
                                                }
                                            }
                                        }}
                                    >
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button with Glow */}
                    <motion.div className={style.ctaWrapper} variants={itemVariants}>
                        <Link to={"/services"} className={style.ctaButton}>
                            <div className={style.buttonGlow} />
                            <motion.span
                                className={style.buttonContent}
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

                    {/* Premium Statistics with Count-Up */}
                    <motion.div className={style.statistics} variants={containerVariants}>
                        <PremiumStatCard
                            icon={projects}
                            number={counter.projects}
                            label={t("homePage.projectsLabel")}
                            delay={0.3}
                            gradient="primary"
                        />
                        <PremiumStatCard
                            icon={ourCLients}
                            number={counter.clients}
                            label={t("homePage.clientsLabel")}
                            delay={0.4}
                            gradient="secondary"
                        />
                    </motion.div>
                </motion.div>

                {/* Image Side with Premium Effects */}
                <motion.div className={style.imageWrapper} variants={imageVariants}>
                    <div className={style.imageContainer}>
                        {/* Animated Background Glow */}
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
                        {/* Pulsing Glow Effect */}
                        <motion.div
                            className={style.imageGlow}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <img
                            loading='lazy'
                            src={AboutImage}
                            alt={t("homePage.aboutImageAlt")}
                            width="600"
                            height="800"
                            decoding="async"
                            className={style.image}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Partner Logos Section with Premium Effects */}
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
                                        <div className={style.logoGlow} />
                                        <img
                                            loading='lazy'
                                            src={logo.imageUrl}
                                            alt={`${logo.name} - Partner Logo`}
                                            width="120"
                                            height="60"
                                            decoding="async"
                                        />
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
            </div>
        </section>
    );
}

// Premium Stat Card with Count-Up Animation
function PremiumStatCard({ icon, number, label, delay, gradient }) {
    return (
        <motion.div
            className={`${style.statBox} ${style[`gradient-${gradient}`]}`}
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay
            }}
            whileHover={{
                y: -10,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
            }}
        >
            <div className={style.statCardGlow} />

            <motion.div
                className={style.statIcon}
                whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                }}
                transition={{ duration: 0.5 }}
            >
                <img
                    loading='lazy'
                    src={icon}
                    alt={`${label} Icon`}
                    width="48"
                    height="48"
                    decoding="async"
                />
            </motion.div>

            <div className={style.statContent}>
                <motion.h4
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: delay + 0.2
                    }}
                >
                    <CountUpNumber target={number} delay={delay + 0.3} />
                </motion.h4>
                <p>{label}</p>
            </div>

            {/* Decorative rotating element */}
            <div className={style.statDecoration}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </motion.div>
    );
}

// Count-Up Number Animation
function CountUpNumber({ target, delay }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            let start = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [target, delay]);

    return <>{count}+</>;
}
