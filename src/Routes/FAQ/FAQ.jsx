import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './FAQ.module.css';
import AboutImage from '../../assets/Images/Home/about-img.png';
import H2 from '../../Component/Ui/H2/H2';
import Heading from '../../Component/Ui/Heading/Heading';
import { motion } from 'framer-motion';
import axios from 'axios';
import { baseURL, getHeaders } from '../../Utilies/data';
import { useEffect } from 'react';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp';
import SEO from '../../Component/SEO/SEO';

const ANIMATION_VARIANTS = {
    fadeInUp: {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            },
        },
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    },
    staggerItem: {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            },
        },
    },
};

function FAQ() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [faq, setFaq] = useState([]);
    const [errorFlag, setErrorFlag] = useState(false)
    const [loading, setLoading] = useState(false)


    const getFaq = async () => {
        try {
            setLoading(true)
            setErrorFlag(false)
            setFaq([]);
            const { data } = await axios.get(baseURL + "/faqs", {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setFaq(data.data);
                setLoading(false)
            } else {
                setFaq([]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setErrorFlag(true)
        }
    };


    const toggleItem = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    useEffect(() => {

        getFaq();
    }, [])

    return (
        <>
            <SEO
                title={t("seo.faq.title", "الأسئلة الشائعة - شركة تميّز | Tamiuzz FAQ")}
                description={t("seo.faq.description", "إجابات على أكثر الأسئلة شيوعاً حول خدمات شركة تميّز للحلول الرقمية والتسويق الإلكتروني.")}
                jsonLd={faq.length > 0 ? {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faq.map(item => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                } : undefined}
            />
            <Heading pageName="faq" />
            <H2 text={t("faq")} />
            {

                (!loading) ?
                    <motion.section
                        className={`${style.faqSection} border-bottom border-5 border-white`}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        {/* Floating Decorative Shapes */}
                        <motion.div
                            className={style.floatingShape1}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 20, 0],
                                rotate: [0, 8, 0]
                            }}
                            transition={{
                                duration: 13,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className={style.floatingShape2}
                            animate={{
                                y: [0, 32, 0],
                                x: [0, -18, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 11,
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
                                duration: 15,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {
                            errorFlag ?
                                <ErrorComp />

                                :
                                <div className="container">
                                    {faq.length == 0 ?
                                        <NoDataFounded />
                                        :
                                        <div className="row">
                                            <div className="col-md-7 d-flex flex-column gap-5">

                                                <>
                                                    <motion.h2
                                                        className={style.heading}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{
                                                            delay: 0.2,
                                                            duration: 0.6,
                                                            type: "spring",
                                                            stiffness: 80,
                                                            damping: 15
                                                        }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {t('faqPage.headline1')}<br />{t('faqPage.headline2')}
                                                    </motion.h2>

                                                    <motion.div
                                                        className={style.accordion}
                                                        variants={ANIMATION_VARIANTS.staggerContainer}
                                                        initial="hidden"
                                                        whileInView="visible"
                                                        viewport={{ once: true, amount: 0.2 }}
                                                    >
                                                        {faq.map((item, index) => (
                                                            <motion.div
                                                                key={index}
                                                                className={`${style.item} ${activeIndex === index ? style.active : ''}`}
                                                                variants={ANIMATION_VARIANTS.staggerItem}
                                                                initial="rest"
                                                                whileHover="hover"
                                                                animate="rest"
                                                            >
                                                                <div className={style.itemGlow} />
                                                                <motion.div
                                                                    className={style.question}
                                                                    onClick={() => toggleItem(index)}
                                                                >
                                                                    <span>{item.question}</span>
                                                                    <motion.i
                                                                        className={`fa-solid ${activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                                                                        animate={{
                                                                            rotate: activeIndex === index ? 180 : 0
                                                                        }}
                                                                        transition={{
                                                                            type: "spring",
                                                                            stiffness: 200,
                                                                            damping: 15
                                                                        }}
                                                                    />
                                                                </motion.div>
                                                                {activeIndex === index && (
                                                                    <motion.div
                                                                        className={style.answer}
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: 'auto' }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        transition={{
                                                                            duration: 0.4,
                                                                            type: "spring",
                                                                            stiffness: 100,
                                                                            damping: 20
                                                                        }}
                                                                    >
                                                                        <strong>{item.question}</strong>
                                                                        <p>{item.answer}</p>
                                                                    </motion.div>
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                </>
                                            </div>
                                            <div className="col-md-5 d-flex justify-content-center align-items-center">
                                                <motion.div
                                                    className={style.imageWrapper}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: 0.3,
                                                        type: "spring",
                                                        stiffness: 80,
                                                        damping: 15
                                                    }}
                                                    viewport={{ once: true }}
                                                >
                                                    <motion.img
                                                        loading='lazy'
                                                        src={AboutImage}
                                                        alt="business team"
                                                        className={style.image}
                                                        whileHover={{
                                                            scale: 1.05,
                                                            transition: {
                                                                type: "spring",
                                                                stiffness: 300
                                                            }
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    }
                                </div>
                        }
                    </motion.section > : <Spinner sectionFlag={true} />
            }
        </>
    );
};

export default FAQ;
