import React from 'react'
import img from "../../assets/Images/Home/testimonials.jpg"
import style from "./Testimonials.module.css"
import H2 from '../Ui/H2/H2'
import H3 from '../Ui/H3/H3'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import TestimonialCard from '../TestimonialCard/TestimonialCard'

export default function Testimonials({ rates }) {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

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
    };

    return (
        <div className={"mb-2 " + style.Testimonials} style={{
            backgroundImage: `url(${img})`
        }}>
            {/* Premium Dark Overlay */}
            <div className={style.overlay} />

            {/* Floating Decorative Shapes */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -28, 0],
                    x: [0, 22, 0],
                    rotate: [0, 9, 0]
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
                    y: [0, 32, 0],
                    x: [0, -18, 0],
                    scale: [1, 1.12, 1]
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
                    y: [0, -22, 0],
                    rotate: [0, -7, 0]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Decorative Premium Quotes */}
            <motion.span
                className={`${style.bgQuote} ${style.bgQuoteLeft}`}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.08, 0.12, 0.08]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                &ldquo;
            </motion.span>
            <motion.span
                className={`${style.bgQuote} ${style.bgQuoteRight}`}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.08, 0.12, 0.08]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            >
                &rdquo;
            </motion.span>

            <div className={"container " + style.inner}>
                <motion.div
                    className={style.heading + " row"}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={headingVariants}>
                        <H2 text={t("homePage.Testimonials")} />
                        <H3 text={t("homePage.Some of our customer testimonials")} />
                    </motion.div>
                </motion.div>

                <div className={"row " + style.sliderRow}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={28}
                        slidesPerView={1}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation
                        breakpoints={{
                            450: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                    >
                        {rates?.map((item, idx) => (
                            <SwiperSlide key={idx} className='m-auto py-3'>
                                <TestimonialCard idx={idx} {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
