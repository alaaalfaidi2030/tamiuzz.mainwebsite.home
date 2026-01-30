import React from 'react'
import style from "./WhatWeAreDoing.module.css"
import img from "../../assets/Images/Home/WhatWeAreDoing.jpg"
import H2 from '../Ui/H2/H2'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { phoneAndEmail } from '../../Utilies/data'

export default function WhatWeAreDoing({ solutions }) {
    const { t } = useTranslation()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15
            }
        }
    }

    const headingVariants = {
        hidden: { opacity: 0, y: -30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 15
            }
        }
    }

    const descriptionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: 0.1
            }
        }
    }

    const infoBoxVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 75,
                damping: 16,
                delay: 0.3
            }
        }
    }

    return (
        <div className={style.WhatWeAreDoing} style={{ backgroundImage: `url(${img})` }}>
            {/* Premium dark overlay with gradient */}
            <div className={style.overlay} />

            {/* Floating Decorative Shapes */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 25, 0],
                    rotate: [0, 10, 0]
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
                    y: [0, 25, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.1, 1]
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
                    y: [0, -20, 0],
                    rotate: [0, -8, 0]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className={'container py-5 ' + style.innerContainer}>
                <motion.div
                    className="row"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    <div className="col-12">
                        <motion.div variants={headingVariants}>
                            <H2 text={t("homePage.what are we doing?")} />
                        </motion.div>
                    </div>
                    <div className="col-md-9 col-lg-8 m-auto text-center">
                        <motion.p className={style.description} variants={descriptionVariants}>
                            {t("homePage.what are we doing?_desc")}
                        </motion.p>
                    </div>
                </motion.div>

                <div className="row my-5">
                    <SolutionSlider solutions={solutions} t={t} />
                </div>

                {/* Premium Contact Info Box */}
                <motion.div
                    className={"row g-4 g-lg-2 " + style.info}
                    variants={infoBoxVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className={style.infoGlow} />

                    <motion.div
                        className="col-lg-3 col-md-12 d-flex justify-content-center align-items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h4 className={'m-0 ' + style.infoHeading}>
                            {t("homePage.keep in touch with us")}
                        </h4>
                    </motion.div>

                    {phoneAndEmail.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="col-lg-3 col-6 d-flex align-items-center"
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                        >
                            <motion.div
                                className={style.iconWrapper}
                                variants={{
                                    rest: { rotate: 0, scale: 1 },
                                    hover: {
                                        rotate: 360,
                                        scale: 1.1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 180,
                                            damping: 10
                                        }
                                    }
                                }}
                            >
                                <div className={style.iconGlow} />
                                <i className={item.icon}></i>
                            </motion.div>
                            <motion.div
                                className="text d-flex flex-column"
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
                                <h5 className={style.contactLabel}>{t(item.title)}</h5>
                                <span className={style.contactValue} dir='ltr'>{item.text}</span>
                            </motion.div>
                        </motion.div>
                    ))}

                    <div className="col-lg-2 col-md-12 d-flex align-items-center justify-content-center">
                        <Link to={"/support"} className={style.ctaButton}>
                            <div className={style.buttonGlow} />
                            <motion.span
                                className={style.buttonContent}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {t("aboutSection.request-quote-button")}
                            </motion.span>
                            <motion.span
                                className={style.buttonArrow}
                                whileHover={{ x: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </motion.span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function SolutionSlider({ solutions, t }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 85,
                damping: 14,
                delay: i * 0.08
            }
        })
    }

    const imageVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.12,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    }

    const iconVariants = {
        rest: {
            scale: 1,
            rotate: 0,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%"
        },
        hover: {
            scale: 1.15,
            rotate: 360,
            borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 12
            }
        }
    }

    const contentVariants = {
        rest: { y: 0 },
        hover: {
            y: -6,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    }

    return (
        <div className={style.sliderContainer}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={28}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={750}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 28 }
                }}
            >
                {solutions.map((solution, idx) => (
                    <SwiperSlide key={idx} className={style.slideWrapper}>
                        <Link to={`/solutions/${solution.path}`} className={style.cardLink}>
                            <motion.div
                                className={style.card + " m-auto"}
                                custom={idx}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.25 }}
                                whileHover="hover"
                                animate="rest"
                            >
                                {/* Card Glow Effect */}
                                <div className={style.cardGlow} />

                                <div className={style.imageWrapper}>
                                    <motion.img
                                        loading='lazy'
                                        src={solution.imageUrl}
                                        alt={solution.title}
                                        className={style.image}
                                        variants={imageVariants}
                                    />
                                    <div className={style.imageOverlay} />
                                </div>

                                <motion.div className={style.content} variants={contentVariants}>
                                    {solution.iconUrl && (
                                        <motion.div
                                            className={style.iconBadge}
                                            variants={iconVariants}
                                        >
                                            <div className={style.iconBadgeGlow} />
                                            <img
                                                loading='lazy'
                                                src={solution.iconUrl}
                                                alt="icon"
                                                width={36}
                                                height={36}
                                            />
                                        </motion.div>
                                    )}
                                    <h3>{solution.title}</h3>
                                    <p className={style.cardDescription}>{solution.shortDescription}</p>

                                    <div className={style.readMore}>
                                        <span>{t("common.read_more", "اقرأ المزيد")}</span>
                                        <motion.i
                                            className="fa-solid fa-arrow-left"
                                            whileHover={{ x: -4 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                    </div>
                                </motion.div>

                                {/* Decorative corner */}
                                <div className={style.cardCorner} />
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
