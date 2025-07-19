import React from 'react'
import style from "./WhatWeAreDoing.module.css"
import img from "../../assets/Images/Home/WhatWeAreDoing.jpg"
import H2 from '../Ui/H2/H2'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { phoneAndEmail } from '../../Utilies/data'

export default function WhatWeAreDoing() {
    const { t } = useTranslation()

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const solutions = [
        {
            title: "إدارة خدمة العملاء CRM",
            urlPath: "crm-customer-service",
            shortDescription: "نظام يمكنك من إدارة تفاعلات وبيانات العملاء،",
            imageUrl: "/images/solutions/crm.jpg",
            iconUrl: "/images/icons/headphones.png"
        },
        {
            title: "دردشة أعمال",
            urlPath: "business-chat",
            shortDescription: "نظام اتصال لإجراء واستقبال مكالمات متزامنة",
            imageUrl: "/images/solutions/chat.jpg",
            iconUrl: "/images/icons/chat.png"
        },
        {
            title: "كول سنتر",
            urlPath: "call-center",
            shortDescription: "أول نظام اتصال سحابي لإجراء واستقبال مكالمات",
            imageUrl: "/images/solutions/callcenter.jpg",
            iconUrl: "/images/icons/cloud.png"
        },
        {
            title: "الرقم الموحد والرقم المجاني",
            urlPath: "unified-number",
            shortDescription: "رقم سهل حفظه يبدأ ب 9200 يتيح ربط الفروع",
            imageUrl: "/images/solutions/phone.jpg",
            iconUrl: "/images/icons/phone.png"
        }
    ]

    return (
        <div className={style.WhatWeAreDoing} style={{ backgroundImage: `url(${img})` }}>
            <div className={'container py-5'}>
                <div className="row">
                    <div className="col-12">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <H2 text={t("homePage.what are we doing?")} />
                        </motion.div>
                    </div>
                    <div className="col-md-6 ">
                        <motion.p
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {t("homePage.what are we doing?_desc")}
                        </motion.p>
                    </div>
                </div>

                <div className="row my-5">
                    <SolutionSlider solutions={solutions} />
                </div>

                <motion.div
                    className={"row g-3 " + style.info}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="col-md-3 col-sm-12 d-flex justify-content-center align-items-center ">
                        <h4 className='m-0'>{t("homePage.keep in touch with us")}</h4>
                    </div>
                    {
                        phoneAndEmail.map((item, idx) =>
                            <div key={idx} className="col-md-3 col-sm-6  border-end border-3 border-white d-flex  align-items-center gap-3">
                                <div className="icon text-primary bg-white d-flex justify-content-center align-items-center rounded-circle fs-4" style={{
                                    width: "40px",
                                    height: "40px"
                                }}>
                                    <i className={item.icon}></i>
                                </div>
                                <div className="text d-flex flex-column">
                                    <h5>{t(item.title)}</h5>
                                    <span>{item.text}</span>
                                </div>
                            </div>
                        )
                    }
                    <div className="col-md-2 col-sm-12 d-flex align-items-center justify-content-center">
                        <button className='btn btn-light'>{t("aboutSection.request-quote-button")}</button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}


function SolutionSlider({ solutions }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.5,
                delay: i * 0.15
            }
        })
    }

    return (
        <div className="solution-slider-container">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {solutions.map((solution, idx) => (
                    <SwiperSlide key={idx} className='py-5'>
                        <Link to={`/solutions/${solution.urlPath}`}>
                            <motion.div
                                className={style.card + " m-auto"}
                                custom={idx}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div className={style.imageWrapper}>
                                    <img src={solution.imageUrl} alt={solution.title} className={style.image} />
                                    {solution.iconUrl && (
                                        <div className={style.iconBadge}>
                                            <img src={solution.iconUrl} alt="icon" width={24} height={24} />
                                        </div>
                                    )}
                                </div>
                                <div className={style.content + " mt-3"}>
                                    <h3>{solution.title}</h3>
                                    <p className={style.description}>{solution.shortDescription}</p>
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
