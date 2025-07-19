import React from 'react'
import img from "../../assets/Images/Home/testimonials.jpg"
import style from "./Testimonials.module.css"
import H2 from '../Ui/H2/H2'
import H3 from '../Ui/H3/H3'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import TestimonialCard from '../TestimonialCard/TestimonialCard'
export default function Testimonials() {
    const { t } = useTranslation();
    const testimonials = [
        {
            image: '/assets/images/users/user1.png',
            name: 'Albert Flores',
            role: 'Medical Assistant',
            rating: 4,
            text: 'Consectetur adipiscing elit. Integer nunc viverra laoreet est the porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo'
        },
        {
            image: '/assets/images/users/user2.png',
            name: 'Darlene Robertson',
            role: 'UI/UX Designer',
            rating: 5,
            text: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat.'
        },
        {
            image: '/assets/images/users/user3.png',
            name: 'Jacob Jones',
            role: 'Network Engineer',
            rating: 3,
            text: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.'
        }, {
            image: '/assets/images/users/user1.png',
            name: 'Albert Flores',
            role: 'Medical Assistant',
            rating: 4,
            text: 'Consectetur adipiscing elit. Integer nunc viverra laoreet est the porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo'
        },
        {
            image: '/assets/images/users/user2.png',
            name: 'Darlene Robertson',
            role: 'UI/UX Designer',
            rating: 5,
            text: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat.'
        },
        {
            image: '/assets/images/users/user3.png',
            name: 'Jacob Jones',
            role: 'Network Engineer',
            rating: 3,
            text: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.'
        }
    ];
    return (
        <div className={"my-2 " + style.Testimonials} style={{
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
                        {testimonials.map((item, idx) => (
                            <SwiperSlide key={idx} >
                                <TestimonialCard {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
