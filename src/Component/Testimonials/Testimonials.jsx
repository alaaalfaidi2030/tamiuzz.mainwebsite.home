import React from 'react'
import img from "../../assets/Images/Home/testimonials.jpg"
import style from "./Testimonials.module.css"
import H2 from '../Ui/H2/H2'
import H3 from '../Ui/H3/H3'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import TestimonialCard from '../TestimonialCard/TestimonialCard'
export default function Testimonials({rates}) {
    const { t } = useTranslation();
    
    return (
        <div className={"mb-2 " + style.Testimonials} style={{
            backgroundImage: `url(${img})`
        }}>
            <div className="container py-5 "
            >
                <div className={style.heading + " row"}>

                    <H2 text={t("homePage.Testimonials")} />
                    <H3 text={t("homePage.Some of our customer testimonials")} />
                </div>
                <div className="row py-5">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                        breakpoints={{
                            450: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3}
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                    >
                        {rates?.map((item, idx) => (
                            <SwiperSlide key={idx} className='m-auto' >
                                <TestimonialCard {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
