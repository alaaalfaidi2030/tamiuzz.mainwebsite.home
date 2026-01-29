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

    const headingVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <div className={"mb-2 " + style.Testimonials} style={{
            backgroundImage: `url(${img})`
        }}>
            {/* Decorative background quotes */}
            <span className={`${style.bgQuote} ${style.bgQuoteLeft}`}>&ldquo;</span>
            <span className={`${style.bgQuote} ${style.bgQuoteRight}`}>&rdquo;</span>

            <div className={"container " + style.inner}>
                <motion.div
                    className={style.heading + " row"}
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <H2 text={t("homePage.Testimonials")} />
                    <H3 text={t("homePage.Some of our customer testimonials")} />
                </motion.div>

                <div className={"row " + style.sliderRow}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                        breakpoints={{
                            450: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        autoplay={{
                            delay: 3000,
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
